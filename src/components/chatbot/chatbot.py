import numbers
import os
import pickle
import re
import sys
import threading
import time
import traceback
from collections import defaultdict
from datetime import datetime
from pathlib import Path

import faiss
import numpy as np
import pytz
import requests
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from langchain.chains import RetrievalQA
from langchain.embeddings.base import Embeddings
from langchain.prompts import PromptTemplate
from langchain.schema import Document
from langchain_community.docstore.in_memory import InMemoryDocstore
from langchain_community.vectorstores import FAISS
from langchain_groq import ChatGroq
from langchain_huggingface.embeddings import HuggingFaceEmbeddings
from langchain_huggingface.llms import HuggingFacePipeline
from supabase import Client, create_client

if sys.platform.startswith("win"):
    import codecs

    sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())
    sys.stderr = codecs.getwriter("utf-8")(sys.stderr.detach())


def safe_print(text):
    """Safely print text that may contain Unicode characters"""
    try:
        print(text)
    except UnicodeEncodeError:
        safe_text = text.encode("ascii", "replace").decode("ascii")
        print(safe_text)


env_path = Path(__file__).resolve().parents[3] / ".env.local"
load_dotenv(dotenv_path=env_path)

app = Flask(__name__)
CORS(
    app,
    origins=[
        "https://iris-dummy-nextjs.vercel.app",
        "https://iris-dummy-nextjs.vercel.app/",
        "https://www.iris-club.in",
        "https://www.iris-club.in/",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:5800",
    ],
    supports_credentials=True,
    allow_headers="*",
    methods=["GET", "POST", "OPTIONS"],
)


# Rate limiting
class RateLimiter:
    def __init__(self, max_requests=60, window_seconds=60):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = defaultdict(list)

    def is_allowed(self, client_ip):
        now = time.time()
        # Clean old requests
        self.requests[client_ip] = [
            req_time
            for req_time in self.requests[client_ip]
            if now - req_time < self.window_seconds
        ]

        # Check if under limit
        if len(self.requests[client_ip]) < self.max_requests:
            self.requests[client_ip].append(now)
            return True
        return False


rate_limiter = RateLimiter(max_requests=30, window_seconds=60)  # 30 requests per minute


def make_links_clickable(text):
    """
    Convert plain text URLs to HTML anchor tags while properly handling trailing punctuation, especially unbalanced closing parenthesis.
    """
    url_pattern = re.compile(r'(https?://[^\s<>"]+?)(?=[.,!?:;\)]?(?:\s|$))')

    def replace_match(match):
        url = match.group(1)
        if url.endswith(")") and url.count("(") < url.count(")"):
            url = url[:-1]
        return f'<a href="{url}">{url}</a>'

    text = url_pattern.sub(replace_match, text)
    return text


import os

script_dir = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(script_dir, "embeddings.pkl"), "rb") as f:
    data = pickle.load(f)
texts = data["texts"]
index = faiss.read_index(os.path.join(script_dir, "faiss.index"))

HF_API_URL = os.getenv("HF_API_URL")
HF_API_TOKEN = os.getenv("HF_API_TOKEN")

if not HF_API_URL or not HF_API_TOKEN:
    raise ValueError("HF_API_URL and HF_API_TOKEN must be set in environment variables")

query_embedding_cache = {}


def embed_query(query):
    if query in query_embedding_cache:
        return query_embedding_cache[query]

    # Add retry logic for API calls
    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = requests.post(
                HF_API_URL,
                headers={"Authorization": f"Bearer {HF_API_TOKEN}"},
                json={"inputs": query},
                timeout=30,
            )
            print("HF API status:", response.status_code)
            print("HF API response:", response.text)

            if response.status_code == 429:  # Rate limited
                if attempt < max_retries - 1:
                    wait_time = (2**attempt) * 2  # Exponential backoff
                    print(
                        f"Rate limited, waiting {wait_time} seconds before retry {attempt + 1}"
                    )
                    time.sleep(wait_time)
                    continue
                else:
                    raise RuntimeError(
                        "HuggingFace API rate limit exceeded after retries"
                    )

            if response.status_code != 200:
                raise RuntimeError(
                    f"HuggingFace API error: {response.status_code} {response.text}"
                )

            embedding_json = response.json()
            print("HF API embedding_json:", embedding_json)
            if not embedding_json or not isinstance(embedding_json, list):
                raise ValueError("HuggingFace API returned empty embedding.")
            if isinstance(embedding_json[0], list):
                embedding = np.array(embedding_json[0])
            else:
                embedding = np.array(embedding_json)
            embedding = embedding.astype("float32")
            query_embedding_cache[query] = embedding
            return embedding

        except requests.exceptions.Timeout:
            if attempt < max_retries - 1:
                print(f"Timeout on attempt {attempt + 1}, retrying...")
                time.sleep(2)
                continue
            else:
                raise RuntimeError("HuggingFace API timeout after retries")
        except Exception as e:
            if attempt < max_retries - 1:
                print(f"Error on attempt {attempt + 1}: {str(e)}, retrying...")
                time.sleep(2)
                continue
            else:
                raise e


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
    try:
        now_ist = datetime.now(INDIA_TZ)
        supabase.table("chatbot_logs").insert(
            {"query": query, "response": response, "created_at": now_ist.isoformat()}
        ).execute()
    except Exception as e:
        print(f"Failed to log chatbot interaction: {str(e)}")


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
    index_to_docstore_id={i: i for i in range(len(faiss_docs))},
)
retriever = faiss_db.as_retriever(search_type="similarity", search_kwargs={"k": 8})

prompt_template = """
You are an AI assistant for the IRIS club at MIT WPU. Answer the question using the context provided below.

INSTRUCTIONS:
1. For RESEARCH PAPER questions:
   - If the context contains details about a research paper, provide a detailed response including:
     * Paper title in quotes
     * List of all authors
     * Publication venue/conference
     * Year of publication
     * Key findings or contributions
     * Link to the paper if available
   - Do not mention IRIS Projects/Research pages for paper-specific queries
   - If multiple papers are found, list them all

2. For QUESTIONS ABOUT KUSHAGRA SINGH or KUSHAGRA:
   - Recognize that "Kushagra" and "Kushagra Singh" refer to the same person
   - If asking about his research, follow the research paper instructions above
   - For other aspects (projects, role, skills), provide a concise summary
   - Include relevant links when available
   - Always provide the full name "Kushagra Singh" in responses for clarity

3. For other PROJECTS or GENERAL questions:
   - Start by mentioning the official IRIS Projects page (https://iris-club.in/Projects) and Research page (https://iris-club.in/research)
   - Include that Dr. Shamla Mantri and Dr. Yogesh Kulkarni are the club mentors
   - Include any relevant links from the context

4. If the answer is not in the context, say "I couldn't find specific information about that. Could you try rephrasing your question?"

IMPORTANT: Be direct and specific in your answers. If the context contains detailed information, include it in your response. Don't be vague.

CONTEXT:
{context}

QUESTION: {question}

ANSWER:
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
    chain_type_kwargs={"prompt": prompt},
)


# Step 5: Create an API endpoint
@app.route("/chat", methods=["POST", "OPTIONS"])
def chat():
    if request.method == "OPTIONS":
        # Handle preflight request
        return "", 200

    # Rate limiting check
    client_ip = request.headers.get("X-Forwarded-For", request.remote_addr)
    if not rate_limiter.is_allowed(client_ip):
        return (
            jsonify(
                {
                    "error": "Too many requests. Please wait a moment before trying again.",
                    "retry_after": 60,
                }
            ),
            429,
        )

    query = request.json.get("query")
    if not query:
        return jsonify({"error": "No query provided"}), 400

    try:
        query_embedding = embed_query(query)
        print("Query embedding:", query_embedding)
        print("Type of query_embedding:", type(query_embedding))
        if (
            query_embedding is None
            or (
                isinstance(query_embedding, (list, tuple)) and len(query_embedding) == 0
            )
            or (
                isinstance(query_embedding, np.ndarray)
                and (query_embedding.size == 0 or query_embedding.shape == ())
            )
            or isinstance(query_embedding, numbers.Number)
        ):
            print("Query embedding is empty, scalar, or None.")
            return (
                jsonify(
                    {"error": "Failed to embed query (empty or invalid embedding)."}
                ),
                500,
            )
        query_vec = np.asarray(query_embedding, dtype="float32")
        print("query_vec (after asarray):", query_vec)
        print("query_vec.ndim:", query_vec.ndim)
        if query_vec.ndim == 0 or query_vec.size == 0:
            print("query_vec is empty or scalar.")
            return (
                jsonify({"error": "Failed to embed query (invalid embedding shape)."}),
                500,
            )
        if query_vec.ndim == 1:
            query_vec = np.expand_dims(query_vec, axis=0)
        print("query_vec shape after expand_dims (if applied):", query_vec.shape)
        print("index.d:", getattr(index, "d", "N/A"))
        num_results = 10  
        D, I = index.search(query_vec, num_results)

        print(f"\n=== SEARCH QUERY ===\n{query}")
        print(f"\n=== SEARCH RESULTS (Top {num_results}) ===")
        print(f"D shape: {D.shape}, I shape: {I.shape}")

        if I.shape[0] == 0 or I.shape[1] == 0:
            print(
                "ERROR: No results from FAISS index. Check embedding and index dimensions."
            )
            return (
                jsonify(
                    {
                        "error": "No results from FAISS index. Check embedding and index dimensions."
                    }
                ),
                500,
            )

        print("\n--- SEARCH RESULT DETAILS ---")
        for i, (idx, score) in enumerate(zip(I[0], D[0]), 1):
            similarity = 1 - score  
            text_preview = texts[idx][:200].replace("\n", " ")
            if len(texts[idx]) > 200:
                text_preview += "..."

            is_research = (
                "paper" in texts[idx].lower() or "research" in texts[idx].lower()
            )

            if is_research:
                safe_print(
                    f"[RESEARCH] Result {i:2d}: Index={idx:4d}, Similarity={similarity:.4f}"
                )
            else:
                safe_print(
                    f"          Result {i:2d}: Index={idx:4d}, Similarity={similarity:.4f}"
                )

            safe_print(f"   Preview: {text_preview}")

        top_contexts = [texts[i] for i in I[0]]

        research_contexts = [
            texts[i]
            for i in I[0]
            if "paper" in texts[i].lower() or "research" in texts[i].lower()
        ]
        if research_contexts:
            safe_print("\n[INFO] Found research paper entries in results")
            
            top_contexts = research_contexts + top_contexts
            top_contexts = list(
                dict.fromkeys(top_contexts)
            )  
        context = "\n".join(top_contexts)
        response = qa_chain.invoke({"query": query, "context": context})
        answer = response["result"].split("Answer:")[-1].strip()
        import re

        # Clean unwanted escape characters and code artifacts
        answer_clean = answer
        # Remove \n, \t, \r, and all escape sequences
        answer_clean = re.sub(r"\\[ntr]", " ", answer_clean)
        answer_clean = (
            answer_clean.replace("\n", " ").replace("\t", " ").replace("\r", " ")
        )
        # Remove stray backslashes
        answer_clean = answer_clean.replace("\\", " ")
        # Remove markdown/code block artifacts
        answer_clean = re.sub(r"[`*_>{}<~#=\[\]|]", "", answer_clean)
        # Replace multiple spaces with a single space
        answer_clean = re.sub(r"\s+", " ", answer_clean).strip()
        # Use make_links_clickable to wrap URLs in anchor tags
        answer_with_links = make_links_clickable(answer_clean)
        contains_html = "<a href=" in answer_with_links
        log_chatbot_interaction(query, answer_with_links)
        return jsonify({"response": answer_with_links, "contains_html": contains_html})
    except RuntimeError as e:
        # Handle HuggingFace API errors gracefully
        error_message = str(e)
        if "HuggingFace API error" in error_message:
            return (
                jsonify(
                    {
                        "response": "Sorry, I'm having trouble accessing the I.R.I.S. services right now. Please try again later.",
                        "contains_html": False,
                    }
                ),
                200,
            )
        safe_print("RuntimeError occurred:", error_message)
        return jsonify({"error": error_message}), 500
    except Exception as e:
        safe_print("Exception occurred:", str(e))
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route("/health")
def health():
    """Health check endpoint with detailed logging"""
    try:
        # get client IP and user agent for logging
        client_ip = request.headers.get("X-Forwarded-For", request.remote_addr)
        user_agent = request.headers.get("User-Agent", "unknown")

        # prepare response data
        response_data = {
            "status": "OK",
            "timestamp": datetime.now(pytz.utc).isoformat(),
            "service": "iris-chatbot",
            "server_time": datetime.now(pytz.utc).strftime("%Y-%m-%d %H:%M:%S UTC"),
            "version": "1.0.0",
        }

        # log the health check
        safe_print(f"🔍 Health check from {client_ip} - {user_agent}")
        safe_print(
            f"✅ Health check successful at {datetime.now(pytz.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}"
        )

        return jsonify(response_data), 200

    except Exception as e:
        error_msg = f"❌ Health check failed: {str(e)}"
        safe_print(error_msg)
        return (
            jsonify(
                {
                    "status": "error",
                    "error": str(e),
                    "timestamp": datetime.now(pytz.utc).isoformat(),
                }
            ),
            503,
        )


def self_ping():
    """
    Enhanced ping mechanism to keep the server alive with multiple strategies
    """
    import json
    import random
    import threading
    import time

    import requests

    def get_status_emoji(status_code):
        if 200 <= status_code < 300:
            return "✅"
        elif 400 <= status_code < 500:
            return "⚠️"
        else:
            return "❌"

    def ping_with_retry(base_url, max_retries=3):
        """Ping with exponential backoff and retry logic"""
        for attempt in range(max_retries):
            try:
                start_time = time.time()
                response = requests.get(
                    f"{base_url}/health",
                    timeout=15,
                    headers={"User-Agent": "IRIS-Self-Ping/1.0"},
                )
                end_time = time.time()
                response_time = (end_time - start_time) * 1000

                if response.status_code == 200:
                    return response.status_code, response_time, None
                elif response.status_code == 429:  # Rate limited
                    if attempt < max_retries - 1:
                        wait_time = (2**attempt) * 5 + random.uniform(1, 5)
                        print(
                            f"Rate limited, waiting {wait_time:.1f}s before retry {attempt + 1}"
                        )
                        time.sleep(wait_time)
                        continue
                    else:
                        return (
                            response.status_code,
                            response_time,
                            "Rate limit exceeded",
                        )
                else:
                    return (
                        response.status_code,
                        response_time,
                        f"HTTP {response.status_code}",
                    )

            except requests.exceptions.Timeout:
                if attempt < max_retries - 1:
                    wait_time = (2**attempt) * 2
                    print(
                        f"Timeout on attempt {attempt + 1}, waiting {wait_time}s before retry"
                    )
                    time.sleep(wait_time)
                    continue
                else:
                    return None, 0, "Timeout after retries"
            except Exception as e:
                if attempt < max_retries - 1:
                    wait_time = (2**attempt) * 2
                    print(
                        f"Error on attempt {attempt + 1}: {str(e)}, waiting {wait_time}s before retry"
                    )
                    time.sleep(wait_time)
                    continue
                else:
                    return None, 0, str(e)

        return None, 0, "Max retries exceeded"

    def ping():
        ping_count = 0
        consecutive_failures = 0
        max_consecutive_failures = 5

        while True:
            ping_count += 1
            try:
                # Determine the base URL based on environment
                if os.getenv("RENDER") == "true":
                    base_url = "https://i-r-i-s-prod-website.onrender.com"
                    env = "PRODUCTION"
                else:
                    base_url = "http://localhost:5800"
                    env = "DEVELOPMENT"

                # Perform ping with retry logic
                status_code, response_time, error = ping_with_retry(base_url)

                if status_code == 200:
                    consecutive_failures = 0
                    status_emoji = get_status_emoji(status_code)
                    log_msg = (
                        f"{status_emoji} Ping #{ping_count} [{env}] - "
                        f"Status: {status_code} - "
                        f"Time: {response_time:.2f}ms - "
                        f"At: {time.strftime('%Y-%m-%d %H:%M:%S')}"
                    )
                    print(log_msg)

                    # If successful, use longer interval
                    sleep_time = 240  # 4 minutes
                else:
                    consecutive_failures += 1
                    status_emoji = (
                        get_status_emoji(status_code) if status_code else "❌"
                    )
                    log_msg = (
                        f"{status_emoji} Ping #{ping_count} [{env}] - "
                        f"Status: {status_code or 'ERROR'} - "
                        f"Time: {response_time:.2f}ms - "
                        f"Error: {error} - "
                        f"At: {time.strftime('%Y-%m-%d %H:%M:%S')}"
                    )
                    print(log_msg)

                    # If failing, use shorter interval to keep server alive
                    sleep_time = min(
                        60 + (consecutive_failures * 30), 180
                    )  # 1-3 minutes

                # If too many consecutive failures, try more aggressive pinging
                if consecutive_failures >= max_consecutive_failures:
                    print(
                        f"⚠️ {consecutive_failures} consecutive failures, using aggressive ping strategy"
                    )
                    sleep_time = 30  # 30 seconds

            except Exception as e:
                consecutive_failures += 1
                print(
                    f"❌ Ping #{ping_count} [CRITICAL] - "
                    f"Unexpected error: {str(e)} - "
                    f"At: {time.strftime('%Y-%m-%d %H:%M:%S')}"
                )
                sleep_time = 60  # 1 minute on critical errors

            # Add some randomness to prevent synchronized requests
            sleep_time += random.uniform(-10, 10)
            sleep_time = max(sleep_time, 20)  # Minimum 20 seconds

            print(f"⏰ Next ping in {sleep_time:.1f} seconds")
            time.sleep(sleep_time)

    print("🚀 Starting enhanced self-ping service...")
    print(f"🔄 Will ping with adaptive intervals to prevent server sleep")
    print(f"📊 Will use shorter intervals on failures to keep server alive")
    thread = threading.Thread(target=ping, daemon=True)
    thread.start()


# Start self-ping in production environment
if os.getenv("RENDER") == "true":
    self_ping()
    print("🌐 Running in production mode with enhanced self-ping enabled")


@app.route("/")
def home():
    return (
        "Chatbot API is running! Use the /chat endpoint to interact with the chatbot."
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5800)
