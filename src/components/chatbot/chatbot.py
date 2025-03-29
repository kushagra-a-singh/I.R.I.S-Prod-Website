from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain_huggingface.llms import HuggingFacePipeline
from langchain.prompts import PromptTemplate
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os

load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app) 

data = [
    "I am the IRIS Assistant! IRIS is the Innovation, Research, Incubation, and Startup team at MIT WPU. We focus on research, innovation, and entrepreneurship.",
    "You can find our contact information on the Contact page. We have various team members you can reach out to for different inquiries.",
    "We host various events throughout the year including hackathons, workshops, and tech talks. Check our Events page for the latest information.",
    "IRIS works on various innovative projects in fields like AI, robotics, and more. You can explore our Projects page to learn about our current and past projects.",
    "Our blog features articles on various tech topics, research findings, and event recaps. Visit the Blog section to read our latest posts.",
    "Our team consists of students, faculty, and industry experts. You can learn more about our members on the About page.",
    # Project 1: I.R.I.S. Club Website
    "The I.R.I.S. Club Website is a dynamic platform designed to unite our community of innovators, learners, and leaders.",
    "The website acts as a central hub for information about events, announcements, and achievements, and facilitates communication with members, alumni, and external partners.",
    "The I.R.I.S. website features event management, podcasts, payment integration using Razorpay, responsive design, and dynamic content updates.",
    "The website was developed using React JS, Bootstrap, Razorpay, GitHub, and Supabase SQL, and is deployed on Vercel.",
    "The I.R.I.S. website consolidates details for sponsors, partners, teachers, and participants, and promotes events while offering seamless registration.",
    "You can find the GitHub repository for the I.R.I.S. Club Website at https://github.com/IRIS-MITWPU/I.R.I.S-Prod-Website.",
    # Project 2: Tarzan Project
    "The Tarzan Project is an advanced autonomous vehicle control system that integrates computer vision and CAN bus communication.",
    "Tarzan uses YOLOv8 for real-time object detection and processes video feeds from mobile cameras to detect road conditions, obstacles, and threats.",
    "The system communicates with vehicle control systems through STM32 microcontrollers and the OBD-II interface.",
    "Tarzan is designed for both temporary actuator-based testing and long-term implementation with custom PCB boards.",
    "The vision system in Tarzan leverages YOLOv8 architecture, achieving 30+ FPS performance with sub-100ms latency.",
    "Tarzan can detect road obstacles, lane markings, traffic signs, and dynamic obstacles like vehicles and pedestrians.",
    "The system includes frame pre-processing, multi-scale detection algorithms, custom post-processing filters, and real-time data streaming protocols.",
    "You can find the GitHub repository for the Tarzan Project at https://github.com/IRIS-MITWPU/Tarzan.",
    # Event 1: Inter-Campus Innovation Hackathon
    "The Inter-Campus Open Innovation Hackathon was held on 16th February 2024 at the MIT-WPU Campus.",
    "The hackathon was hosted by MIT-TBI in collaboration with ASPIRE, Engineer's Cradle, and I.R.I.S.",
    "The event brought together the brightest minds from Pune campuses to tackle real-world challenges through creativity and innovation.",
    "Teams formed across universities, and the event culminated in a 12-hour grand finale at MIT-WPU Pune.",
    "Highlights of the hackathon included teamwork, mentorship from faculty and industry experts, prototyping, and final presentations to a panel of judges.",
    "Prizes included ₹10,000 for the 1st place, ₹6,000 for the 2nd place, and ₹4,000 for the 3rd place, along with mentorship and incubation opportunities.",
    "The top 10 teams received certificates and ongoing technical and research support from Engineer's Cradle and MIT-TBI.",
    "The hackathon emphasized creativity, technical complexity, problem-solving effectiveness, and potential impact in its judging criteria.",
    # Event 2: IRIS Innovation Hackathon
    "The IRIS Innovation Hackathon was held on 27th-28th September 2024 at the MIT-WPU Campus.",
    "The hackathon was hosted by IRIS in collaboration with BharatGo.",
    "The event brought together participants from MIT to tackle real-world challenges with creativity and technical expertise.",
    "Highlights of the hackathon included expert mentorship, prototyping, and final presentations to a panel of judges.",
    "Prizes included ₹10,000 for the 1st place, ₹6,000 for the 2nd place, and ₹4,000 for the 3rd place, along with continued support and growth opportunities.",
    "The winning teams were Team Turtle (1st place), Neuro Guardian (2nd place), and Hydrosols (3rd place).",
    "Mentors included Dr. Shamla Mantri, Dr. Yogesh Kulkarni, Dr. Mangesh Bedekar, Dr. Balaji M Patil, and special guests Mr. Pravin Adik (BharatGo CEO) and Mr. Saurabh Kane.",
    "The hackathon fostered collaboration and innovation, providing participants with enriched perspectives and connections for future innovations.",
    # Event 3: IRIS Ice Breaker 2025
    "The IRIS Ice Breaker 2025 was held on 24th January 2025 at the MIT-WPU Campus.",
    "The event was hosted by IRIS to welcome and familiarize new recruits with the IRIS team.",
    "The Ice Breaker included interactive activities, team introductions, and discussions on upcoming events.",
    "Highlights of the event included strengthened relationships among members, increased enthusiasm from recruits, and valuable ideas for future events.",
    "The event concluded with a group photo and set a positive tone for the year ahead.",
    "The IRIS Ice Breaker successfully achieved its objectives of building team spirit and fostering a collaborative environment.",
    # Blog 1: CRISPR
    "The blog titled 'CRISPR: Revolutionizing Genetics with Precision and Possibility' was published on February 16, 2025, by Aakanksha Pansare and Nishtha.",
    "CRISPR is a revolutionary gene-editing technology that allows precise modifications to DNA, with applications in medicine, agriculture, and biotechnology.",
    "The blog explains how CRISPR works, its discovery, and its potential to transform fields like genetic engineering and disease treatment.",
    "Key topics include the CRISPR-Cas9 system, its mechanism, and its applications in biological research and therapeutic engineering.",
    "The blog also highlights the ethical considerations and future implications of CRISPR technology.",
    # Blog 2: Almost a Data Loss
    "The blog titled 'Almost a Data Loss: The Security Breach We Overcame' was published on February 12, 2025, by Aaryan Kumbhare.",
    "The blog discusses a security vulnerability in the I.R.I.S. website that was identified and resolved during the hackathon registration phase.",
    "The issue arose due to the temporary disabling of Row Level Security (RLS) in Supabase SQL, which exposed the database to unauthorized access.",
    "A college peer identified the vulnerability and alerted the team, leading to the implementation of a custom RLS script to secure the database.",
    "The blog emphasizes the importance of prioritizing security measures and learning from mistakes.",
    # Blog 3: Traditional Algorithms vs. Machine Learning
    "The blog titled 'Traditional Algorithms vs. Machine Learning' was published on February 12, 2025, by Aaryan Kumbhare.",
    "The blog compares traditional algorithms and machine learning, highlighting their similarities, differences, and use cases.",
    "Traditional algorithms follow predefined rules, while machine learning algorithms learn from data and improve over time.",
    "The blog uses Google's PageRank algorithm (traditional) and RankBrain/BERT algorithms (machine learning) as examples to illustrate the differences.",
    "Key topics include efficiency, adaptability, and the role of mathematics in both paradigms.",
    # Blog 4: Nanotechnology in Defense
    "The blog titled 'Application of Nanotechnology in Defense Sector' was published on February 15, 2025, by Shreya More.",
    "The blog explores how nanotechnology is revolutionizing the defense sector, with applications in materials, weapons, communication, and healthcare.",
    "Key topics include improved body armor, radar and sonar invisibility, and the use of nanomaterials in military technologies.",
    "The blog also discusses the ethical and security concerns associated with the use of nanotechnology in defense.",
    "Examples include the Anālakṣhya Metamaterial Surface Cloaking System (MSCS) developed by IIT Kanpur for stealth technology.",
    # Contact Form
    "The Contact Form on the I.R.I.S. website allows users to reach out to the team with inquiries, ideas, or collaboration proposals.",
    "The form requires users to provide their name, email, phone number, subject, and a detailed message.",
    "The form is designed to help users share innovative projects, research ideas, or scalable projects with the IRIS team.",
    "Once submitted, the form data is stored securely in the I.R.I.S. database for follow-up.",
    "You can access the Contact Form at https://www.iris-club.in/contact.",
    # Recruitment Form
    "The Recruitment Form on the I.R.I.S. website allows students to apply to join the IRIS team.",
    "The form requires applicants to provide their name, PRN, email, phone number, school, branch, current year, and areas of interest.",
    "Applicants can also upload a resume or CV and provide details about their past experiences and how they can contribute to IRIS.",
    "The form includes options for selecting domains of interest, such as Tech (e.g., TARZAN project, website development) and Non-Tech (e.g., content writing, graphic design, event management).",
    "Once submitted, the form data is stored securely in the I.R.I.S. database for review by the recruitment team.",
    "You can access the Recruitment Form at https://www.iris-club.in/recruitments.",
]

text_splitter = RecursiveCharacterTextSplitter(chunk_size=300, chunk_overlap=50)
chunks = text_splitter.split_text("\n".join(data))


embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")
vector_store = FAISS.from_texts(chunks, embeddings)


groq_api_key = os.getenv("GROQ_API_KEY")

llm = ChatGroq(
    temperature=0,  
    groq_api_key=groq_api_key,
    model_name="llama-3.3-70b-versatile",  # Use the desired Groq model
    request_timeout=120, # Increase timeout for API calls
)

# Create a text generation pipeline
# Step 4: Build the RAG Pipeline
retriever = vector_store.as_retriever(search_kwargs={"k": 5})

# Define a custom prompt template
prompt_template = """
You are an AI assistant for the IRIS club at MIT WPU. Answer the question using the context provided below. 
If the answer is not explicitly in the context, try to infer it based on the available information. If you still can't find the answer, say "I don't know."

Context: {context}

Question: {question}

Answer:
"""

prompt = PromptTemplate(
    input_variables=["context", "question"],
    template=prompt_template,
)

# Update the RetrievalQA chain
qa_chain = RetrievalQA.from_chain_type(
    llm,
    retriever=retriever,
    chain_type="stuff",  # Use "stuff" for simple QA
    chain_type_kwargs={"prompt": prompt},
)

# Step 5: Create an API endpoint
@app.route("/chat", methods=["POST"])
def chat():
    query = request.json.get("query")
    response = qa_chain({"query": query})
    
    # Extract only the answer part from the response
    answer = response["result"].split("Answer:")[-1].strip()
    
    return jsonify({"response": answer})

# Add a root route for testing
@app.route("/")
def home():
    return "Chatbot API is running! Use the /chat endpoint to interact with the chatbot."

# Run the Flask app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5800)