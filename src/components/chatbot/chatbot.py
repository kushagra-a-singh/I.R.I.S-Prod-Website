from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_huggingface.embeddings import HuggingFaceEmbeddings
from langchain.chains import RetrievalQA
from langchain_huggingface.llms import HuggingFacePipeline
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os
import re
from pathlib import Path
import pickle
import faiss
import numpy as np
import requests
from supabase import create_client, Client
from datetime import datetime
import pytz
from langchain_community.vectorstores import FAISS
from langchain.embeddings.base import Embeddings
from langchain.schema import Document
from langchain_community.docstore.in_memory import InMemoryDocstore
import traceback
import numbers

env_path = Path(__file__).resolve().parents[3] / ".env.local"
load_dotenv(dotenv_path=env_path)

app = Flask(__name__)
CORS(app,
     origins=[
         "https://iris-dummy-nextjs.vercel.app",
         "https://iris-dummy-nextjs.vercel.app/",
         "https://www.iris-club.in",
         "https://www.iris-club.in/",
         "http://localhost:3000",
         "http://localhost:3001",
         "http://localhost:5800"
     ],
     supports_credentials=True,
     allow_headers="*",
     methods=["GET", "POST", "OPTIONS"]
)

def make_links_clickable(text):
    """
    Convert plain text URLs to HTML anchor tags while properly handling trailing punctuation, especially unbalanced closing parenthesis.
    """
    url_pattern = re.compile(
        r'(https?://[^\s<>"]+?)(?=[.,!?:;\)]?(?:\s|$))'  
    )

    def replace_match(match):
        url = match.group(1)
        if url.endswith(')') and url.count('(') < url.count(')'):
            url = url[:-1]
        return f'<a href="{url}">{url}</a>'

    text = url_pattern.sub(replace_match, text)
    return text

import os
script_dir = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(script_dir, 'embeddings.pkl'), 'rb') as f:
    data = pickle.load(f)
texts = data['texts']
index = faiss.read_index(os.path.join(script_dir, 'faiss.index'))

HF_API_URL = os.getenv("HF_API_URL")
HF_API_TOKEN = os.getenv("HF_API_TOKEN")

if not HF_API_URL or not HF_API_TOKEN:
    raise ValueError("HF_API_URL and HF_API_TOKEN must be set in environment variables")

query_embedding_cache = {}

def embed_query(query):
    if query in query_embedding_cache:
        return query_embedding_cache[query]
    response = requests.post(
        HF_API_URL,
        headers={"Authorization": f"Bearer {HF_API_TOKEN}"},
        json={"inputs": query}
    )
    print("HF API status:", response.status_code)
    print("HF API response:", response.text)
    if response.status_code != 200:
        raise RuntimeError(f"HuggingFace API error: {response.status_code} {response.text}")
    embedding_json = response.json()
    print("HF API embedding_json:", embedding_json)
    if not embedding_json or not isinstance(embedding_json, list):
        raise ValueError("HuggingFace API returned empty embedding.")
    if isinstance(embedding_json[0], list):
        embedding = np.array(embedding_json[0])
    else:
        embedding = np.array(embedding_json)
    embedding = embedding.astype('float32')
    query_embedding_cache[query] = embedding
    return embedding

groq_api_key = os.getenv("GROQ_API_KEY")

llm = ChatGroq(
    temperature=0,  
    groq_api_key=groq_api_key,
    model_name="llama-3.3-70b-versatile",  
    request_timeout=120, 
)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

INDIA_TZ = pytz.timezone("Asia/Kolkata")

def log_chatbot_interaction(query, response):
    now_ist = datetime.now(INDIA_TZ)
    supabase.table("chatbot_logs").insert({
        "query": query,
        "response": response,
        "created_at": now_ist.isoformat()
    }).execute()

# Build FAISS retriever
class HuggingFaceEmbeddings(Embeddings):
    def embed_query(self, text):
        return embed_query(text)
    def embed_documents(self, texts):
        return [embed_query(t) for t in texts]

embedding_model = HuggingFaceEmbeddings()

# Prepare documents from precomputed texts
faiss_docs = [Document(page_content=t) for t in texts]
faiss_db = FAISS(
    embedding_function=embedding_model,
    index=index,
    docstore=InMemoryDocstore({i: doc for i, doc in enumerate(faiss_docs)}),
    index_to_docstore_id={i: i for i in range(len(faiss_docs))}
)
retriever = faiss_db.as_retriever(search_type="similarity", search_kwargs={"k": 5})

prompt_template = """
You are an AI assistant for the IRIS club at MIT WPU. Answer the question using the context provided below.
If the answer is not explicitly in the context, try to infer it based on the available information.
If the context contains any URLs (such as LinkedIn, project pages, or other links), always include them in your answer.
If the question is about projects or research, always start your answer by mentioning the official IRIS Projects page (https://iris-club.in/Projects) and Research page (https://iris-club.in/research), describing what users will find there. Only after that, mention that Dr. Shamla Mantri and Dr. Yogesh Kulkarni are the club mentors, and other faculty are project mentors if relevant.
If you still can't find the answer, say \"Please try again asking anything related to I.R.I.S.\"

Context: {context}

Question: {question}

Answer:
"""

prompt = PromptTemplate(
    input_variables=["context", "question"],
    template=prompt_template,
)

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    return_source_documents=False,
    chain_type_kwargs={"prompt": prompt}
)

# Step 5: Create an API endpoint
@app.route("/chat", methods=["POST", "OPTIONS"])
def chat():
    if request.method == "OPTIONS":
        # Handle preflight request
        return '', 200
    query = request.json.get("query")
    try:
        query_embedding = embed_query(query)
        print("Query embedding:", query_embedding)
        print("Type of query_embedding:", type(query_embedding))
        if (
            query_embedding is None or
            (isinstance(query_embedding, (list, tuple)) and len(query_embedding) == 0) or
            (isinstance(query_embedding, np.ndarray) and (query_embedding.size == 0 or query_embedding.shape == ())) or
            isinstance(query_embedding, numbers.Number)
        ):
            print("Query embedding is empty, scalar, or None.")
            return jsonify({"error": "Failed to embed query (empty or invalid embedding)."}), 500
        query_vec = np.asarray(query_embedding, dtype='float32')
        print("query_vec (after asarray):", query_vec)
        print("query_vec.ndim:", query_vec.ndim)
        if query_vec.ndim == 0 or query_vec.size == 0:
            print("query_vec is empty or scalar.")
            return jsonify({"error": "Failed to embed query (invalid embedding shape)."}), 500
        if query_vec.ndim == 1:
            query_vec = np.expand_dims(query_vec, axis=0)
        print("query_vec shape after expand_dims (if applied):", query_vec.shape)
        print("index.d:", getattr(index, 'd', 'N/A'))
        D, I = index.search(query_vec, 5)
        print("D shape:", D.shape)
        print("I shape:", I.shape)
        print("I:", I)
        if I.shape[0] == 0 or I.shape[1] == 0:
            print("No results from FAISS index. Check embedding and index dimensions.")
            return jsonify({"error": "No results from FAISS index. Check embedding and index dimensions."}), 500
        top_contexts = [texts[i] for i in I[0]]
        context = "\n".join(top_contexts)
        response = qa_chain.invoke({"query": query, "context": context})
        answer = response["result"].split("Answer:")[-1].strip()    
        import re
        # Clean unwanted escape characters and code artifacts
        answer_clean = answer
        # Remove \n, \t, \r, and all escape sequences
        answer_clean = re.sub(r"\\[ntr]", " ", answer_clean)
        answer_clean = answer_clean.replace("\n", " ").replace("\t", " ").replace("\r", " ")
        # Remove stray backslashes
        answer_clean = answer_clean.replace("\\", " ")
        # Remove markdown/code block artifacts
        answer_clean = re.sub(r"[`*_>{}<~#=\[\]|]", "", answer_clean)
        # Replace multiple spaces with a single space
        answer_clean = re.sub(r"\s+", " ", answer_clean).strip()
        # Use make_links_clickable to wrap URLs in anchor tags
        answer_with_links = make_links_clickable(answer_clean)
        contains_html = '<a href=' in answer_with_links
        log_chatbot_interaction(query, answer_with_links)
        return jsonify({
            "response": answer_with_links,
            "contains_html": contains_html
        })
    except RuntimeError as e:
        # Handle HuggingFace API errors gracefully
        error_message = str(e)
        if "HuggingFace API error" in error_message:
            return jsonify({
                "response": "Sorry, I'm having trouble accessing the I.R.I.S. services right now. Please try again later.",
                "contains_html": False
            }), 200
        print("RuntimeError occurred:", error_message)
        return jsonify({"error": error_message}), 500
    except Exception as e:
        print("Exception occurred:", str(e))
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route("/health")
def health():
    """Health check endpoint with detailed logging"""
    try:
        #get client IP and user agent for logging
        client_ip = request.headers.get('X-Forwarded-For', request.remote_addr)
        user_agent = request.headers.get('User-Agent', 'unknown')
        
        #prepare response data
        response_data = {
            "status": "OK",
            "timestamp": datetime.now(pytz.utc).isoformat(),
            "service": "iris-chatbot",
            "server_time": datetime.now(pytz.utc).strftime('%Y-%m-%d %H:%M:%S UTC'),
            "version": "1.0.0"
        }
        
        #log the health check
        print(f"🔍 Health check from {client_ip} - {user_agent}")
        print(f"✅ Health check successful at {datetime.now(pytz.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}")
        
        return jsonify(response_data), 200
        
    except Exception as e:
        error_msg = f"❌ Health check failed: {str(e)}"
        print(error_msg)
        return jsonify({
            "status": "error",
            "error": str(e),
            "timestamp": datetime.now(pytz.utc).isoformat()
        }), 503

def self_ping():
    """
    Ping the health endpoint to keep the server alive
    Logs detailed information about each ping attempt
    """
    import threading
    import time
    import requests
    import json
    
    def get_status_emoji(status_code):
        if 200 <= status_code < 300:
            return "✅"
        elif 400 <= status_code < 500:
            return "⚠️"
        else:
            return "❌"
    
    def ping():
        ping_count = 0
        while True:
            ping_count += 1
            try:
                #determine the base URL based on environment
                if os.getenv('RENDER') == 'true':
                    base_url = 'https://i-r-i-s-prod-website.onrender.com'
                    env = 'PRODUCTION'
                else:
                    base_url = 'http://localhost:5800'
                    env = 'DEVELOPMENT'
                
                #make the request with timing
                start_time = time.time()
                response = requests.get(
                    f"{base_url}/health",
                    timeout=10,
                    headers={'User-Agent': 'IRIS-Self-Ping/1.0'}
                )
                end_time = time.time()
                response_time = (end_time - start_time) * 1000 
                
                status_emoji = get_status_emoji(response.status_code)
                log_msg = (
                    f"{status_emoji} Ping #{ping_count} [{env}] - "
                    f"Status: {response.status_code} - "
                    f"Time: {response_time:.2f}ms - "
                    f"At: {time.strftime('%Y-%m-%d %H:%M:%S')}"
                )
                
                #log additional info for non-200 responses
                if response.status_code != 200:
                    try:
                        error_data = response.json()
                        log_msg += f"\n   Error: {json.dumps(error_data, indent=2)}"
                    except:
                        log_msg += f"\n   Response: {response.text[:200]}..."
                
                print(log_msg)
                
            except requests.exceptions.RequestException as e:
                error_type = e.__class__.__name__
                print(
                    f"❌ Ping #{ping_count} [ERROR] - "
                    f"{error_type}: {str(e)} - "
                    f"At: {time.strftime('%Y-%m-%d %H:%M:%S')}"
                )
            except Exception as e:
                print(
                    f"❌ Ping #{ping_count} [CRITICAL] - "
                    f"Unexpected error: {str(e)} - "
                    f"At: {time.strftime('%Y-%m-%d %H:%M:%S')}"
                )
            
            time.sleep(240)  #ping every 4 minutes
    
    print("🚀 Starting self-ping service...")
    print(f"🔄 Will ping every 4 minutes to prevent server sleep")
    thread = threading.Thread(target=ping, daemon=True)
    thread.start()

#start self-ping in production environment
if os.getenv('RENDER') == 'true':
    self_ping()
    print("🌐 Running in production mode with self-ping enabled")

@app.route("/")
def home():
    return "Chatbot API is running! Use the /chat endpoint to interact with the chatbot."

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5800)
    