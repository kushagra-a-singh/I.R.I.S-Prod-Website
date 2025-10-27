import pickle

import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

# 1. Your knowledge base data
data = [
    # KUSHAGRA SINGH - TECHNICAL PROFILE (PRIORITY ENTRY)
    "Kushagra Singh is the Technical Head of IRIS at MIT WPU, leading technical initiatives and research projects. With expertise spanning AI/ML, software development, autonomous systems, and distributed computing, he bridges the gap between academic research and practical applications. His work focuses on developing scalable, production-ready solutions using cutting-edge technologies.",
    # KUSHAGRA (FIRST NAME ONLY) - TECHNICAL PROFILE
    "Kushagra is the Technical Head of IRIS at MIT WPU, leading technical initiatives and research projects. With expertise spanning AI/ML, software development, autonomous systems, and distributed computing, he bridges the gap between academic research and practical applications. His work focuses on developing scalable, production-ready solutions using cutting-edge technologies.",
    # KUSHAGRA'S TECHNICAL EXPERTISE
    "Kushagra's technical expertise is extensive and diverse. He is proficient in Python, C/C++, Java, and JavaScript, with deep knowledge of machine learning frameworks like PyTorch and TensorFlow. His computer vision skills include OpenCV and YOLOv8, while his web development stack features Next.js, React, and Node.js. He's also skilled in cloud technologies (AWS, Kubernetes, Docker), big data (Apache Spark, Kafka), and embedded systems (Arduino, STM32, ESP32). His work demonstrates strong capabilities in both research and practical implementation.",
    # KUSHAGRA'S PROJECTS
    "Kushagra has led multiple high-impact technical projects: 1) IRIS Club RAG Chatbot - A domain-specific AI assistant using LLaMA-3 70B and LangChain, achieving 0.92 BERTScore, 2) Tarzan - An autonomous vehicle module for non-ADAS cars using YOLOv8 and STM32 microcontrollers, 3) PlantWise - An Ayurvedic AI companion that was a Top 25 Finalist at SIH 2024, 4) Airfield Wildlife Risk Classification - A real-time bird detection system for airport safety using computer vision, 5) IRIS Club Website - Full-stack platform with payment integration handling 200+ registrations, 6) SynapTrack - Parkinson's Disease detection using EEG analysis, 7) Data Orchestrate - Distributed file sync system with Java and Kubernetes, and 8) ForVis - Formula 1 analytics platform with PyQt5 and Apache Spark.",
    # KUSHAGRA'S RESEARCH PAPER - CONCISE VERSION
    "Kushagra Singh's research paper 'Domain-Specific Conversational AI for IRIS MITWPU' was published in IEEE ICICCT 2025. It compares RAG and fine-tuned transformers for educational chatbots, achieving 0.92 BERTScore. Co-authors: Brandon Cerejo, Samanyu Bhate, Taksh Dhabalia. IEEE Xplore: https://ieeexplore.ieee.org/document/11052088",
    # KUSHAGRA'S RESEARCH PAPER - FIRST NAME ONLY
    "Kushagra's research paper 'Domain-Specific Conversational AI for IRIS MITWPU' was published in IEEE ICICCT 2025. It compares RAG and fine-tuned transformers for educational chatbots, achieving 0.92 BERTScore. Co-authors: Brandon Cerejo, Samanyu Bhate, Taksh Dhabalia. IEEE Xplore: https://ieeexplore.ieee.org/document/11052088",
    # RESEARCH PAPER - TECHNICAL DETAILS
    "Kushagra Singh's research implements a RAG system with LLaMA-3 70B and FAISS for educational chatbots. Published in IEEE ICICCT 2025. Key achievement: 0.92 BERTScore. Paper link: https://ieeexplore.ieee.org/document/11052088",
    # RESEARCH PAPER - FIRST NAME ONLY TECHNICAL DETAILS
    "Kushagra's research implements a RAG system with LLaMA-3 70B and FAISS for educational chatbots. Published in IEEE ICICCT 2025. Key achievement: 0.92 BERTScore. Paper link: https://ieeexplore.ieee.org/document/11052088",
    # RESEARCH PAPER - CITATION STYLE
    "K. Singh, B. Cerejo, S. Bhate, and T. Dhabalia, 'Domain-Specific Conversational AI for IRIS MITWPU,' 2025 IEEE ICICCT, pp. 1-8, doi: 10.1109/ICICCT00000.2025.00000.",
    # RESEARCH PAPER - SIMPLE QUERY MATCH
    "Kushagra Singh research paper IEEE Xplore: 'Domain-Specific Conversational AI for IRIS MITWPU' (2025). Uses LLaMA-3 and FAISS. Link: https://ieeexplore.ieee.org/document/11052088",
    # RESEARCH PAPER - FIRST NAME ONLY QUERY MATCH
    "Kushagra research paper IEEE Xplore: 'Domain-Specific Conversational AI for IRIS MITWPU' (2025). Uses LLaMA-3 and FAISS. Link: https://ieeexplore.ieee.org/document/11052088",
    # RESEARCH PAPER - KEYWORDS
    "AI chatbot research paper by Kushagra Singh. Published in IEEE ICICCT 2025. Topic: Educational chatbots using RAG and transformers. 0.92 BERTScore. IEEE Xplore ID: 11052088",
    # RESEARCH PAPER - FIRST NAME ONLY KEYWORDS
    "AI chatbot research paper by Kushagra. Published in IEEE ICICCT 2025. Topic: Educational chatbots using RAG and transformers. 0.92 BERTScore. IEEE Xplore ID: 11052088",
    # RESEARCH PAPER - QUICK FACTS
    "Quick facts about Kushagra Singh's research: Title: Domain-Specific Conversational AI. Conference: IEEE ICICCT 2025. Score: 0.92 BERTScore. Tech: LLaMA-3, FAISS. Link: https://ieeexplore.ieee.org/document/11052088",
    # RESEARCH PAPER - FIRST NAME ONLY QUICK FACTS
    "Quick facts about Kushagra's research: Title: Domain-Specific Conversational AI. Conference: IEEE ICICCT 2025. Score: 0.92 BERTScore. Tech: LLaMA-3, FAISS. Link: https://ieeexplore.ieee.org/document/11052088",
    # RESEARCH PAPER - KEY CONTRIBUTIONS
    "Kushagra Singh's research paper key contributions: 1) RAG pipeline with LLaMA-3 70B, 2) Fine-tuned DistilBERT model, 3) 0.92 BERTScore accuracy. Published in IEEE Xplore: https://ieeexplore.ieee.org/document/11052088",
    # RESEARCH PAPER - FIRST NAME ONLY KEY CONTRIBUTIONS
    "Kushagra's research paper key contributions: 1) RAG pipeline with LLaMA-3 70B, 2) Fine-tuned DistilBERT model, 3) 0.92 BERTScore accuracy. Published in IEEE Xplore: https://ieeexplore.ieee.org/document/11052088",
    # KUSHAGRA'S PROFESSIONAL EXPERIENCE
    "Professional Experience:\n1) Technical Head at IRIS, MIT WPU (Aug 2024 - Present): Leads website development and technical projects, mentors team members, and oversees the club's technical direction. Successfully deployed the IRIS website for live hackathon registrations with Razorpay integration.\n2) ML Research Associate at IIMT University (Jan 2025 - Mar 2025): Led AI-driven research for Cardiovascular Disease risk prediction, developing ensemble ML models and interactive visualization dashboards.\n3) ML Project Intern at Infosys Springboard (Oct 2024 - Dec 2024): Developed a handwritten digit recognition application using neural networks, achieving 98.95% accuracy with CNN models.",
    # KUSHAGRA'S ACHIEVEMENTS & RECOGNITION
    "Kushagra has received several notable recognitions: 1) Top 4 Finalist at Bosch BOROSA Hackathon 2025 for building an intelligent traffic safety system using YOLOv8 (95-98% accuracy), 2) Top 25 Finalist at Smart India Hackathon 2024 for developing PlantWise, an LLM-powered Ayurvedic health companion, 3) Finalist at HackMITWPU'24 Ideathon for proposing DermDetect, an AI tool for dermatological diagnosis, 4) Successfully published research in IEEE ICICCT 2025 on domain-specific conversational AI, 5) Led the development of multiple production-grade applications used by hundreds of users.",
    # PROJECTS & RESEARCH (PRIORITY ENTRY)
    "To learn about all current and past projects and research at IRIS, please visit our official Projects page (https://iris-club.in/Projects) and Research page (https://iris-club.in/research). These pages contain detailed information about the innovative work our club is doing in fields such as AI, robotics, IoT, and more. You can find project descriptions, outcomes, and how to get involved. For guidance, our official club mentors are Dr. Shamla Mantri (AI and ML) and Dr. Yogesh Kulkarni (Data Science & Analytics). Other faculty are project mentors and guides. If you have a specific idea, reach out to us via the contact form on our website.",
    "I am the IRIS Assistant! IRIS is the Innovation, Research, and Intelligence Support team at MIT WPU. We focus on research, innovation, and entrepreneurship.",
    "You can find our contact information on the Contact page. We have various team members you can reach out to for different inquiries.",
    "We host various events throughout the year including hackathons, workshops, and tech talks. Check our Events page for the latest information.",
    "IRIS works on various innovative projects in fields like AI, robotics, and more. You can explore our Projects page to learn about our current and past projects.",
    "Our blog features articles on various tech topics, research findings, and event recaps. Visit the Blog section to read our latest posts.",
    "Our team consists of students, faculty, and industry experts. You can learn more about our members on the About page.",
    # About IRIS
    "I.R.I.S (Innovation Research & Intelligence Support) is the official tech club of MIT-WPU focused on research, innovation and entrepreneurship.",
    "Our mission is to provide a platform for tech enthusiasts to collaborate, learn and innovate through hands-on projects and events.",
    "The vision of IRIS is to be the leading tech community that drives technological advancements at MIT-WPU.",
    "Contact IRIS at iris@mitwpu.edu.in or +91 7715958053 at our address in MIT World Peace University, Pune.",
    "Current projects under I.R.I.S include the TARZAN project and our club website development/maintenance. The Tarzan Project is an advanced autonomous vehicle control system that integrates computer vision and CAN bus communication. Whereas under the club website development & maintenance team we look into ways to improve our existing website ",
    # Faculty Mentors
    "Dr. Shamla Mantri is an Associate Professor and faculty mentor for IRIS with expertise in AI and machine learning. LinkedIn: https://scholar.google.com/citations?user=IUUENAMAAAAJ&hl=en",
    "Dr. Yogesh Kulkarni is an Assistant Professor and faculty mentor for IRIS specializing in data science and analytics. LinkedIn: https://scholar.google.com/citations?user=9GsTeoQAAAAJ&hl=en",
    "Dr. Pratvina Talele serves as a project mentor for IRIS with research interests in computer vision and IoT. LinkedIn: https://scholar.google.com/citations?hl=en&user=_sFHQ8UAAAAJ",
    "Dr. Sumedha Sirsikar is a project mentor for IRIS focusing on cybersecurity and network systems. LinkedIn: https://scholar.google.com/citations?user=26-mdWgAAAAJ&hl=en",
    # Core Team Members
    "Durgesh Deore is a Founder of IRIS and leads strategic initiatives for the club. LinkedIn: https://www.linkedin.com/in/durgesh-deore-74a75a281/",
    "Kavish Jain is a Founder of IRIS and oversees technical project development. LinkedIn: https://www.linkedin.com/in/kavish-jain-38b812247/",
    "Chinmay Huddar is a Founder of IRIS managing operations and partnerships. LinkedIn: https://www.linkedin.com/in/chinmay-huddar-3536761ab/",
    "Dhyey Ladani is a Founder of IRIS focusing on research projects and innovations. LinkedIn: https://www.linkedin.com/in/dhyey-ladani/",
    "Taksh Dhabalia serves as President of IRIS, leading club operations and strategy. LinkedIn: https://www.linkedin.com/in/taksh-dhabalia-2b6969202/",
    "Namra Doshi is Vice President of IRIS managing events and member engagement. LinkedIn: https://www.linkedin.com/in/namra-doshi-445976249/",
    "Kushagra Singh is Technical Head at IRIS overseeing all technical projects and workshops. LinkedIn: https://www.linkedin.com/in/kushagra-anit-singh/",
    "Brandon Cerejo serves as Treasurer of IRIS managing finances and sponsorships. LinkedIn: https://www.linkedin.com/in/brandon-cerejo-921275247/",
    "Samanyu Bhate is Technical Head at IRIS leading development of club projects. LinkedIn: https://www.linkedin.com/in/samanyu-bhate-17136b1ab/",
    "Grishma Shinde is General Secretary managing administration and communications. LinkedIn: https://www.linkedin.com/in/grishma-shinde-835343294/",
    # Department Heads
    "Kaustubha M leads Marketing for IRIS promoting events and initiatives. LinkedIn: https://www.linkedin.com/in/kawas-nandan/",
    "Surendra Rajawat heads Content Management creating technical documentation. LinkedIn: https://www.linkedin.com/in/surendra-rajawat-b16807322/",
    "Riya Kondawar manages Social Media presence and digital marketing. LinkedIn: https://www.linkedin.com/in/riyakondawar/",
    "Richa Shukla leads Event Operations planning hackathons and workshops. LinkedIn: https://www.linkedin.com/in/richa-shukla-026516258/",
    "Manasee Ambhore heads Sponsorship securing partnerships and funding. LinkedIn: https://www.linkedin.com/in/manasee-ambhore-87ab65287/",
    "Rochana Deshpande manages Content creation including blogs and articles. LinkedIn: https://www.linkedin.com/in/rochana-deshpande-79a40a2b2/",
    "Aaryan Joshi leads Research initiatives and technical publications. LinkedIn: https://www.linkedin.com/in/aaryanjoshi/",
    # Website Team
    "Purva Rana develops and maintains the IRIS website and web applications. LinkedIn: https://www.linkedin.com/in/purva-rana/",
    "Divyansh Pathak works on frontend development for IRIS digital platforms. LinkedIn: https://www.linkedin.com/in/divyansh-pathak/",
    "Siya Shaha contributes to website development and user experience design. LinkedIn: https://www.linkedin.com/in/siya-shaha-5bb3822b4/",
    "Ayushi Kadam assists with web development and content management systems. LinkedIn: https://www.linkedin.com/in/ayushi-kadam-8a404a2b2/",
    "Anchal Munot supports website maintenance and feature development. LinkedIn: https://www.linkedin.com/in/anchal-munot-1264662b2/",
    # Additional Team
    "Lakshman Gopal handles graphic design and visual content creation for IRIS. LinkedIn: https://www.linkedin.com/in/lakshman-k-gopal/",
    "Parth Ware is a Founder supporting technical infrastructure and systems. LinkedIn: https://www.linkedin.com/in/parth-ware-48993324a/",
    "Raghunandan Veer is a Founder assisting with project coordination. LinkedIn: https://www.linkedin.com/in/raghunandan-veer-31b724266/",
    "Sarthak Patil is a Founder helping with community outreach and events. LinkedIn: https://www.linkedin.com/in/sarthak-patil-aa453a219/",
    #  Team Member: Brandon Cerejo
    "Brandon Cerejo is the Treasurer of IRIS and a member of the technical team at MIT-WPU. LinkedIn: https://www.linkedin.com/in/brandon-cerejo-921275247/",
    "As IRIS Treasurer, Brandon manages club finances, coordinates budgets with college authorities, and ensures efficient resource allocation for events.",
    "Brandon contributes to the IRIS website development, focusing on frontend design and user experience. GitHub: https://github.com/BrandonCerejo",
    "Brandon's technical skills include Python, C/C++, Machine Learning (TensorFlow, Scikit-Learn), and Web Development (Next.js, React, Node.js).",
    "Notable projects by Brandon include ForVis (Formula 1 analytics system) and Magic Board (handwritten equation recognition using CNN).",
    "Brandon developed a Driver Drowsiness Detection System using Raspberry Pi and DLib with 95% accuracy in detecting fatigue symptoms.",
    "Brandon holds certifications in Data Science and Machine Learning from Udemy and IIT Kharagpur's AI4ICPS program.",
    "Brandon's ForVis project integrates Apache Spark, HDFS and machine learning for Formula 1 race strategy optimization with 86% accuracy.",
    "As part of IRIS tech team, Brandon helped develop the club website using MERN stack with continuous deployment on Vercel.",
    "Brandon's academic focus at MIT-WPU includes practical applications of AI, IoT, and data science for real-world problem solving.",
    # Team Member: Kushagra Singh
    "Kushagra Singh is the Technical Head of IRIS and a Computer Science student at MIT-WPU. LinkedIn: https://www.linkedin.com/in/kushagra-anit-singh/",
    "As IRIS Technical Head, Kushagra leads website development and technical projects, including the club's official website with payment integration.",
    "Kushagra's technical skills span Machine Learning (PyTorch, TensorFlow), Web Development (Next.js, MERN stack), and Embedded Systems (Arduino, STM32). GitHub: https://github.com/kushagra-a-singh",
    "Notable projects by Kushagra include Tarzan (autonomous vehicle module) and ForVis (Formula 1 analytics platform).",
    "Kushagra completed an ML internship at Infosys Springboard, developing handwritten digit recognition models using neural networks.",
    "Kushagra's Tarzan project develops an autonomous vehicle module using YOLOv8 for non-ADAS cars with real-time decision making.",
    "As Technical Head, Kushagra deployed the IRIS website for live hackathon registrations handling 200+ participants with payment processing.",
    "Kushagra was a finalist in Smart India Hackathon 2024 and HackMITWPU'24 Ideathon with AI-powered healthcare solutions.",
    "Kushagra's Driver Safety Monitoring System integrates multiple sensors with Arduino for real-time driver behavior monitoring.",
    "Kushagra focuses on practical applications of AI, IoT and web technologies to solve real-world problems through club projects.",
    # Team Member: Taksh Dhabalia
    "Taksh Dhabalia is the President of IRIS and a Computer Science student at MIT-WPU. LinkedIn: https://www.linkedin.com/in/taksh-dhabalia-2b6969202",
    "As IRIS President, Taksh leads the club's strategic direction and oversees all technical and operational activities.",
    "Taksh's technical expertise includes Embedded Systems (STM32, Arduino), IoT Protocols (MQTT, LoRaWAN), and Computer Vision (OpenCV, YOLOv8). GitHub: https://github.com/TakshDhabalia",
    "Notable projects by Taksh include Tarzan (autonomous vehicle module) and a Real-Time Parking Management System using OpenCV.",
    "Taksh completed an internship at IIIT-Delhi developing a water management system with STM32 microcontrollers and Flutter app.",
    "As Vice-Lead of Team Bolt, Taksh helped achieve All India Rank 4 in FMAE Moto Student India electric superbike competition.",
    "Taksh's Doom on Web project implements ray-casting algorithms with performance optimizations for web platforms.",
    "Taksh developed Music_Gen, an LSTM-based music generation system using German song datasets.",
    "Taksh focuses on microcontroller architecture, distributed systems, and computer vision applications.",
    "Under Taksh's leadership, IRIS has expanded its technical projects and community impact at MIT-WPU.",
    # Team Member: Samanyu Bhate
    "Samanyu Bhate is the Technical Head of IRIS and a Computer Science student at MIT-WPU. LinkedIn: https://www.linkedin.com/in/samanyu-bhate-17136b1ab",
    "As IRIS Technical Head, Samanyu leads project development and oversees technical implementations for club initiatives.",
    "Samanyu's technical expertise includes Data Science (TensorFlow, PyTorch), Computer Vision (OpenCV), and Big Data technologies (Spark, Hadoop). GitHub: https://github.com/Scient025",
    "Notable projects by Samanyu include Magic Board (handwritten equation recognition) and ForVis (Formula 1 analytics platform).",
    "Samanyu completed a Data Science internship at AlgoAnalytics, developing image classification models using AnoGANs and CNNs.",
    "Samanyu's Magic Board project achieves high accuracy in recognizing handwritten mathematical equations with SciPy integration.",
    "As Technical Head, Samanyu contributed to the IRIS website development with Razorpay payment integration and Supabase backend.",
    "Samanyu was a finalist in Smart India Hackathon 2024 with a radar-based drone detection system project.",
    "Samanyu's River Cleaner Project uses computer vision and robotics for automated waste collection in water bodies.",
    "Samanyu focuses on applying machine learning and computer vision to solve real-world environmental and analytical problems.",
    # Project 1: I.R.I.S. Club Website
    "The I.R.I.S. Club Website is a dynamic platform designed to unite our community of innovators, learners, and leaders.",
    "The website acts as a central hub for information about events, announcements, and achievements, and facilitates communication with members, alumni, and external partners.",
    "The I.R.I.S. website features event management, podcasts, payment integration using Razorpay, responsive design, and dynamic content updates.",
    "The website was developed using React JS, Bootstrap, Razorpay, GitHub, and Supabase SQL, and is deployed on Vercel.",
    "The I.R.I.S. website consolidates details for sponsors, partners, teachers, and participants, and promotes events while offering seamless registration.",
    "You can find the GitHub repository for the I.R.I.S. Club Website at https://github.com/IRIS-MITWPU/I.R.I.S-Prod-Website",
    # Project 2: Tarzan Project
    "The Tarzan Project is an advanced autonomous vehicle control system that integrates computer vision and CAN bus communication.",
    "Tarzan uses YOLOv8 for real-time object detection and processes video feeds from mobile cameras to detect road conditions, obstacles, and threats.",
    "The system communicates with vehicle control systems through STM32 microcontrollers and the OBD-II interface.",
    "Tarzan is designed for both temporary actuator-based testing and long-term implementation with custom PCB boards.",
    "The vision system in Tarzan leverages YOLOv8 architecture, achieving 30+ FPS performance with sub-100ms latency.",
    "Tarzan can detect road obstacles, lane markings, traffic signs, and dynamic obstacles like vehicles and pedestrians.",
    "The system includes frame pre-processing, multi-scale detection algorithms, custom post-processing filters, and real-time data streaming protocols.",
    "You can find the GitHub repository for the Tarzan Project at https://github.com/IRIS-MITWPU/Tarzan",
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
    # Blog 5: Smart Grids and Renewable Energy
    "The blog titled 'Smart Grids and Renewable Energy: How Tech Is Enabling Efficient Energy Distribution' was published on March 24, 2025, by Shreya More.",
    "The blog discusses how rising fuel prices and overreliance on fossil fuels have led to a global energy crisis, creating an urgent need for renewable energy and efficient distribution systems.",
    "A smart grid is described as a digitalized electrical system that enables two-way communication, optimizing production, distribution, and consumption of electricity.",
    "Unlike traditional grids, smart grids integrate renewable energy sources, IoT, and real-time monitoring, allowing automated issue detection and self-healing capabilities.",
    "The blog explains how smart grids manage renewable energy fluctuations through large-scale battery storage systems and Vehicle-to-Grid (V2G) technology.",
    "A case study highlights Thailand's $1.8 billion agreement with Gorilla Technology Group to implement an AI-driven smart grid initiative over 15 years.",
    "Key benefits of smart grids include improved efficiency, reliability, and resilience of power systems while enabling seamless incorporation of renewable energy sources.",
    "The blog emphasizes how smart grid technology helps balance supply and demand, reduces energy waste, and ensures steady power supply even with intermittent renewable generation.",
    "Examples include integration of solar panels, wind turbines, battery storage systems, and electric vehicles with smart grid infrastructure.",
    "The blog concludes that smart grids are crucial for overcoming energy crisis challenges and transitioning to a sustainable energy future.",
    # Blog 6: Quantum Computing
    "The blog titled 'Introduction to Quantum Computing' was published on February 12, 2025, by Aaryan Kumbhare.",
    "Quantum computing utilizes quantum-mechanical phenomena like superposition and entanglement to perform operations on data, offering advantages over classical computing.",
    "Unlike classical bits (0 or 1), quantum bits (qubits) can exist in multiple states simultaneously through superposition, enabling parallel processing.",
    "Key quantum principles include superposition (multiple states at once), entanglement (strong correlations between qubits), and interference (manipulating quantum states).",
    "The history of quantum computing dates to the 1980s with contributions from Paul Benioff, Richard Feynman, and David Deutsch who laid theoretical foundations.",
    "Major milestones include the first 2-qubit quantum computer (1998), Shor's algorithm implementation (2001), and D-Wave's commercial quantum annealer (2007).",
    "Modern quantum computers include Google's 53-qubit Sycamore (2019), IBM's Eagle (2021) and Condor (2023), and Atom Computing's 1225-qubit Phoenix (2024).",
    "Industry leaders advancing quantum computing include Google, IBM, Microsoft, Quantinuum, and D-Wave with specialized quantum processors and algorithms.",
    "Recent breakthroughs include Google's Willow processor completing in minutes what would take classical supercomputers 10 septillion years.",
    "Microsoft's Majorana 1 chip (2025) uses topological qubits based on Majorana particles for improved stability and scalability.",
    "Quantum computing promises to revolutionize fields requiring massive computational power like cryptography, drug discovery, and complex system modeling.",
    # Blog 7: Next-Generation Space Probes
    "The blog titled 'Next-Generation Space Probes: Autonomous Robots Exploring the Outer Solar System' was published on March 24, 2025, by Aakanksha Pansare and Nishtha Mandaliya.",
    "Next-generation space probes will incorporate AI and autonomous decision-making to overcome challenges of traditional space exploration methods.",
    "Autonomous space probes solve key limitations like communication delays (hours-long signal transmission) and harsh environments (extreme cold, radiation).",
    "Current advanced probes include Voyager 1/2 (interstellar space), New Horizons (Kuiper Belt), and Parker Solar Probe (close solar approach).",
    "Key advancements include AI-based navigation (real-time terrain mapping), autonomous sample collection, and self-repair mechanisms for extended missions.",
    "Upcoming missions feature Europa Clipper (Jupiter's moon Europa), JUICE (Jupiter's icy moons), and Dragonfly (Titan's drone exploration).",
    "These probes use advanced propulsion systems like plasma rockets and nuclear propulsion for faster, more efficient space travel.",
    "Future probes will operate completely independently - navigating, analyzing samples, and conducting repairs without Earth intervention.",
    "The technology enables exploration of previously inaccessible areas like subsurface oceans on icy moons and deep space environments.",
    "NASA and ESA are leading development of these autonomous systems through missions planned through 2035.",
    "This revolution in space robotics will help uncover solar system mysteries and search for extraterrestrial life.",
    # Contact Form
    "The Contact Form on the I.R.I.S. website allows users to reach out to the team with inquiries, ideas, or collaboration proposals.",
    "The form requires users to provide their name, email, phone number, subject, and a detailed message.",
    "The form is designed to help users share innovative projects, research ideas, or scalable projects with the IRIS team.",
    "Once submitted, the form data is stored securely in the I.R.I.S. database for follow-up.",
    "You can access the Contact Form at https://www.iris-club.in/contact",
    # Recruitment Form
    "The Recruitment Form on the I.R.I.S. website allows students to apply to join the IRIS team.",
    "The form requires applicants to provide their name, PRN, email, phone number, school, branch, current year, and areas of interest.",
    "Applicants can also upload a resume or CV and provide details about their past experiences and how they can contribute to IRIS.",
    "The form includes options for selecting domains of interest, such as Tech (e.g., TARZAN project, website development) and Non-Tech (e.g., content writing, graphic design, event management).",
    "Once submitted, the form data is stored securely in the I.R.I.S. database for review by the recruitment team.",
    "You can access the Recruitment Form at https://www.iris-club.in/recruitments ,",
]

# 2. Compute embeddings
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
embeddings = model.encode(data, show_progress_bar=True)

import os

script_dir = os.path.dirname(os.path.abspath(__file__))

# 3. Save texts and embeddings
embeddings_path = os.path.join(script_dir, "embeddings.pkl")
with open(embeddings_path, "wb") as f:
    pickle.dump({"texts": data, "embeddings": embeddings}, f)

# 4. Build and save FAISS index
dim = embeddings.shape[1]
index = faiss.IndexFlatL2(dim)
index.add(np.array(embeddings).astype("float32"))
faiss_index_path = os.path.join(script_dir, "faiss.index")
faiss.write_index(index, faiss_index_path)

print(f"Precomputed embeddings saved to: {embeddings_path}")
print(f"FAISS index saved to: {faiss_index_path}")
