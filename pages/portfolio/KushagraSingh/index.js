import React, { useState, useEffect } from 'react';
import styles from './KushagraSingh.module.css';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

const camelCaseToWords = (text) => {
  return text.replace(/([a-z])([A-Z])/g, '$1 $2');
};

const skills = {
  languages: [
    { name: 'Python', logo: '/images/python.png' },
    { name: 'C', logo: '/images/C.png' },
    { name: 'C++', logo: '/images/C++.png' },
    { name: 'Java', logo: '/images/java.jpg' },
    { name: 'JavaScript', logo: '/images/js.png' }
  ],
  databases: [
    { name: 'MySQL', logo: '/images/mysql.png' },
    { name: 'MongoDB', logo: '/images/mongodb.svg' },
    { name: 'PostgreSQL', logo: '/images/prostgresql.png' },
    { name: 'MongoDB Atlas', logo: '/images/mongodb.svg' }
  ],
  cloudDevOps: [
    { name: 'AWS', logo: '/images/aws.png' },
    { name: 'Kubernetes', logo: '/images/k8.jpeg' },
    { name: 'Docker', logo: '/images/docker.svg' },
    { name: 'CI/CD Pipelines', logo: '/images/cicd.jpg' },
    { name: 'Minikube', logo: '/images/minikube.png' }
  ],
  libraries: [
    { name: 'PyTorch', logo: '/images/pytorch.jpeg' },
    { name: 'OpenCV', logo: '/images/opencv.png' },
    { name: 'Pandas', logo: '/images/pandas.png' },
    { name: 'NumPy', logo: '/images/numpy.png' },
    { name: 'TensorFlow', logo: '/images/tensorflow.png' },
    { name: 'Scikit-Learn', logo: '/images/scikit.png' },
    { name: 'Tkinter', logo: '/images/tkinter.png' },
    { name: 'StreamLit', logo: '/images/stramlit.png' },
    { name: 'PyQt5', logo: '/images/pyqt5.jpg' },
    { name: 'NLTK', logo: '/images/nltk.png' },
    { name: 'spaCy', logo: '/images/spacy.webp' },
    { name: 'LangChain', logo: '/images/langchain.webp' },
    { name: 'HuggingFace', logo: '/images/huggingface.png' }
  ],
  bigDataTechnologies: [
    { name: 'Cloudera', logo: '/images/cloudera.webp' },
    { name: 'HDFS', logo: '/images/hdfs.png' },
    { name: 'Apache Pig', logo: '/images/pig.png' },
    { name: 'Hive', logo: '/images/hive.png' },
    { name: 'HBase', logo: '/images/hbase.png' },
    { name: 'Apache Spark', logo: '/images/spark.png' },
    { name: 'Kafka', logo: '/images/kafka.jpg' }
  ],
  webDevelopment: [
    { name: 'Next.js', logo: '/images/next.png' },
    { name: 'React', logo: '/images/reacg.png' },
    { name: 'Node.js', logo: '/images/node.jpeg' },
    { name: 'Express.js', logo: '/images/express.png' },
    { name: 'Spring Boot', logo: '/images/springboot.jpeg' },
    { name: 'FastAPI', logo: '/images/fastapi.png' },
    { name: 'HTML', logo: '/images/html.png' },
    { name: 'CSS', logo: '/images/css.png' },
    { name: 'Bootstrap', logo: '/images/bootstrap.png' },
    { name: 'WebSockets', logo: '/images/websockets.png' }
  ],
  visualizationTools: [
    { name: 'Tableau', logo: '/images/tableau.png' },
    { name: 'Matplotlib', logo: '/images/matplotlib.png' },
    { name: 'Seaborn', logo: '/images/seaborn.png' }
  ],
  softwares: [
    { name: 'AutoCAD', logo: '/images/autocad.png' },
    { name: 'TinkerCAD', logo: '/images/Tinkercad.png' },
    { name: 'Jupyter', logo: '/images/jupyter.png' },
    { name: 'Linux', logo: '/images/linux.png' },
    { name: 'Selenium', logo: '/images/selenium.jpg' }
  ],
  electronics: [
    { name: 'Arduino', logo: '/images/arduino.png' },
    { name: 'Raspberry Pi', logo: '/images/raspberry.jpg' },
    { name: 'STM32', logo: '/images/stm.png' },
    { name: 'ESP32', logo: '/images/esp.png' },
    { name: 'Ultrasonic Sensors', logo: '/images/ultrasonic.webp' }
  ],
  generativeAI: [
    { name: 'LLaMA-3', logo: '/images/llama3.jpg' },
    { name: 'Retrieval-Augmented Generation', logo: '/images/rag.jpg' }
  ]
};

const projects = [
  {
    title: 'IRIS Club RAG Chatbot',
    category: 'Conversational AI & NLP',
    tags: ['LLaMA-3 70B', 'LangChain', 'FAISS', 'HuggingFace', 'Next.js', 'Groq API', 'DistilBERT'],
    points: [
      'Engineered a RAG chatbot using LLaMA-3 70B, FAISS-based semantic search, and LangChain for club info retrieval.',
      'Optimized for 10ms query latency and 200+ daily queries.',
      'Benchmarked against fine-tuned DistilBERT (0.92 BERTScore).',
      'Developed a hybrid RAG-finetune architecture for improved contextual accuracy.'
    ],
    link: 'https://github.com/kushagra-a-singh/I.R.I.S-Prod-Website',
    liveDemo: 'https://www.iris-club.in/',
    image: '/rag-chatbot.png'
  },
  {
    title: 'DocsVerse - Document Research & Theme Identification Chatbot',
    category: 'Document Intelligence & RAG',
    tags: ['React', 'FastAPI', 'ChromaDB', 'SQLAlchemy', 'TypeScript', 'Material UI', 'LLM Integration', 'OCR'],
    points: [
      'Developed interactive web application for document upload, AI-powered chat with citations, and theme identification across document sets.',
      'Built FastAPI backend with SQLAlchemy ORM, ChromaDB vector database for semantic search, and integration with external LLM services.',
      'Created React.js frontend with Material UI, React Query for state management, and drag-and-drop document upload functionality.',
      'Implemented document processing pipeline with OCR support, chunking, embedding generation, and theme analysis capabilities.'
    ],
    link: 'https://github.com/kushagra-a-singh/DocsVerse',
    image: '/docsverse.jpg'
  },
  {
    title: 'LangGraph Researcher',
    category: 'Multi-Agent Systems & Research Automation',
    tags: ['LangChain', 'LangGraph', 'Tavily API', 'Ollama', 'Python', 'Streamlit', 'Multi-Agent System'],
    points: [
      'Implemented dual-agent system for deep research using Tavily, LangChain, and LangGraph with Research Agent for web crawling and Answer Drafter Agent for synthesis.',
      'Built modular agent architecture with LangGraph workflow orchestration, supporting multiple LLM backends (Ollama, phi3, llama3, mistral).',
      'Developed clean Streamlit web UI for interactive research queries with real-time results display and source citations.',
      'Created extensible system architecture allowing easy addition of new agents (fact-checker, summarizer) and integration with different LLM providers.'
    ],
    link: 'https://github.com/kushagra-a-singh/LangGraph-Researcher',
    image: '/langgraph-researcher.jpg'
  },
  {
    title: 'SynapTrack - Parkinson\'s Disease Detection using EEG',
    category: 'Healthcare & Biomedical ML',
    tags: ['Python', 'PyTorch', 'EEG Analysis', 'Random Forest', 'SVM', 'CNN', 'RNN', 'SHAP', 'LIME', 'Streamlit'],
    points: [
      'Developed an advanced machine learning-based EEG analysis platform combining signal processing and AI for brain activity pattern decoding.',
      'Implemented ensemble of state-of-the-art classifiers (Random Forest, SVM, KNN, LDA, CNN, RNN, ANN) with optimized hyperparameters.',
      'Built comprehensive feature engineering pipeline with SHAP values, LIME explanations, and statistical significance testing.',
      'Created interactive Streamlit dashboard for real-time EEG visualization, model performance metrics and feature importance analysis.'
    ],
    link: 'https://github.com/kushagra-a-singh/SynapTrack',
    image: '/synaptrack.jpg'
  },
  {
    title: 'Data Orchestrate - Distributed File Sync',
    category: 'Distributed Systems & Cloud Infrastructure',
    tags: ['Java', 'Spring Boot', 'Kubernetes', 'Docker', 'Apache Kafka', 'MongoDB Atlas', 'Minikube', 'CI/CD'],
    points: [
      'Built a cloud-native, microservices-based file sync system in Java (Spring Boot) with Docker/Kubernetes deployment.',
      'Integrated Kafka for real-time cross-device replication and MongoDB Atlas for metadata storage.',
      'Automated infra provisioning (Kubernetes manifests, Docker Compose), health checks and PDF text extraction.',
      'Achieved 99.9% uptime in Minikube.'
    ],
    link: 'https://github.com/kushagra-a-singh/Data-Orchestrate',
    image: '/distributed-sync.png'
  },
  {
    title: 'Airfield Wildlife Risk Classification',
    category: 'Computer Vision & Real-time Detection',
    tags: ['YOLOv8', 'OpenCV', 'Flask', 'Python', 'TensorFlow', 'Real-time Detection', 'Risk Assessment'],
    points: [
      'Built comprehensive real-time bird detection and classification system for airport bird strike prevention using multi-model ensemble detection.',
      'Implemented species classification for 207 bird species (200 CUB + 7 Airport Birds) with size, behavior, altitude, and speed estimation.',
      'Developed comprehensive risk assessment model (0-10 scale) with collision probability calculation and real-time alert system.',
      'Created interactive Flask dashboard with live video streaming, risk trend analysis, and RESTful API endpoints for integration.'
    ],
    link: 'https://github.com/kushagra-a-singh/Airfield-Wildlife-Risk-Classification',
    image: '/wildlife-risk.jpg'
  },
  {
    title: 'ForVis - Formula 1 Analytics',
    category: 'Sports Analytics & Big Data',
    tags: ['Python', 'PyQt5', 'Apache Spark', 'HDFS', 'FastF1 API', 'Random Forest', 'Linear Regression', 'Data Visualization'],
    points: [
      'Developed a dynamic PyQt5 GUI for real-time and historical Formula 1 telemetry analysis.',
      'Integrated FastF1 APIs, Apache Spark, and HDFS to reduce processing time by 30%.',
      'Implemented Random Forest and Linear Regression for pit stop prediction and strategy optimization (86% accuracy).',
      'Added multi-driver comparison, lap time analysis, and tyre strategy dashboards.'
    ],
    link: 'https://github.com/kushagra-a-singh/ForVis',
    image: '/KushagraProj1.png'
  },
  {
    title: 'Cardiovascular Diseases Prediction',
    category: 'Predictive Healthcare & Ensemble Machine Learning',
    tags: ['Python', 'Streamlit', 'XGBoost', 'LightGBM', 'CatBoost', 'SHAP', 'Multi-Output ML', 'ROC Analysis'],
    points: [
      'Built comprehensive machine learning pipeline for cardiovascular disease risk prediction using ensemble models (Logistic Regression, SVM, KNN, Random Forest, XGBoost, LightGBM, CatBoost).',
      'Developed custom multi-output Random Forest model to predict multiple disease types simultaneously with feature engineering and polynomial features.',
      'Created interactive Streamlit web application with risk assessment, SHAP value visualizations, and emergency warning system for critical conditions.',
      'Implemented comprehensive model evaluation with ROC curves, confusion matrices, learning curves, and feature correlation analysis.'
    ],
    link: 'https://github.com/kushagra-a-singh/Cardiovascular-Diseases-Prediction',
    image: '/cardiovascular-prediction.png'
  },
  {
    title: 'Tarzan - Autonomous Vehicle Module',
    category: 'Autonomous Systems & Sensor Fusion',
    tags: ['YOLOv8', 'MATLAB', 'C++', 'Arduino', 'LiDAR', 'Pure-Pursuit Algorithm', 'Sensor Fusion', 'Deep Learning'],
    points: [
      'Developing an autonomous vehicle portable module for non-ADAS-enabled cars using custom deep learning models (YOLOv8).',
      'Implements vision-based real-time obstacle detection, path planning using pure-pursuit algorithm in MATLAB.',
      'Designing multi-modal sensor fusion combining camera, LiDAR, and ultrasonic sensors for robust perception.',
      'App-based image input for decision making like steering, acceleration, braking.',
      'Simulates real-world scenarios (cars, potholes, barricades, etc.) for safe navigation.'
    ],
    link: 'https://github.com/kushagra-a-singh/Tarzan-I.R.I.S.',
    image: '/simulation.jpg'
  },
  {
    title: 'IRIS Club Website',
    category: 'Full-Stack Web Development',
    tags: ['Next.js', 'Supabase', 'Razorpay', 'Vercel', 'TypeScript', 'Real-time Payments', 'Blogging System'],
    points: [
      'Developed an official website for the club to provide a centralized platform to share IRIS updates, event details, recruitments and resources.',
      'Handling multiple concurrent real-time payments and updating entries for events.',
      'Features include event registrations with a payment gateway, dynamic blogging with a voting system and comment section, club project highlights, recruitment and contact forms.',
      'Utilized Razorpay SDK, Supabase Database, and continuous deployment on Vercel with GitHub CI/CD integration.'
    ],
    link: 'https://github.com/kushagra-a-singh/I.R.I.S-Prod-Website',
    image: '/website_img.png'
  },
  {
    title: 'PlantWise - Ayurvedic AI Companion',
    category: 'Healthcare AI & Natural Language Processing',
    tags: ['Python', 'Cohere API', 'PyQt', 'RAG Pipeline', 'NLP', 'Ayurvedic Medicine', 'Disease Prediction'],
    points: [
      'Built an AI-driven health assistant using LLMs (Cohere API) for disease prediction and Ayurvedic remedy recommendation.',
      'Implemented RAG pipeline with PyQt GUI for dynamic responses.',
      'Top 25 Finalist at Smart India Hackathon 2024.',
      'Achieved 89% user satisfaction across 500+ curated mappings.'
    ],
    link: 'https://github.com/kushagra-a-singh/PlantWise-SIH',
    image: '/plantwise1.jpg'
  },
  {
    title: 'Driver Safety Monitoring System',
    category: 'IoT & Real-time Monitoring',
    tags: ['Arduino', 'C++', 'MQ3 Sensor', 'GPS Module', 'GSM Module', 'Accelerometer', 'Real-time Monitoring'],
    points: [
      'Integrated MQ3 alcohol sensor, accelerometer/gyroscope, GPS module, LED screen, GSM module and buzzer into a vehicle\'s onboard system using C++ and Arduino.',
      'Developed a comprehensive system to monitor driver behavior, detect alcohol presence, and deliver real-time alerts to promote safe driving practices.',
      'Enabled timely feedback for enhanced driver safety, utilizing sensors for real-time monitoring and instant notifications.'
    ],
    link: 'https://github.com/kushagra-a-singh/Embedded-Arduino-System-for-Car-Road-Safety',
    image: '/KushagraProj2-1.jpg'
  }
];

const publications = [
  {
    title: 'Domain-Specific Conversational AI for IRIS MITWPU: From Research Paper to Production',
    authors: 'Kushagra Singh, Brandon Cerejo, Samanyu Bhate, Taksh Dhabalia',
    conference: 'IEEE International Conference on Information, Communication and Computing Technology (ICoICC) 2025',
    description: [
      'Developed and compared Retrieval-Augmented Generation (RAG) and Fine-Tuned Transformer approaches for domain-specific chatbot implementation.',
      'Implemented RAG pipeline using LangChain, HuggingFace embeddings, FAISS, and LLaMA-3 70B model via Groq API.',
      'Built fine-tuned DistilBERT model optimized for question-answering tasks with comprehensive evaluation metrics.',
      'Successfully deployed hybrid approach on official IRIS MIT-WPU website, handling real queries with 0.92 BERTScore accuracy.'
    ],
    link: 'https://ieeexplore.ieee.org/document/11052088',
    image: '/ieee-paper.jpeg'
  }
];

const experiences = [
  {
    logo: '/images/info.png',
    company: 'Infosys Springboard',
    role: 'ML Project Intern',
    location: 'Remote',
    date: 'Oct 2024 – Dec 2024',
    description: [
      'Designed and implemented a handwritten digit recognition application using neural networks (MLP, CNN, LeNet5) for MNIST dataset classification.',
      'Developed custom PyTorch models with dropout, activation functions, and convolutional layers for efficient feature extraction and classification.',
      'Built an interactive web application using Streamlit to predict digits from uploaded images,     with support for model selection and real-time predictions. Achieved 90.04%, 98.93% & 98.95% accuracies respectively for each model on the test dataset.',
      'Utilized image preprocessing (grayscale conversion, normalization, resizing) and dataset augmentation for robust model performance.',
      'Created a digit visualization tool to save and display images from the MNIST dataset using Matplotlib.',
      'Deployed models with pre-trained weights and integrated custom UI design for a seamless user experience during prediction.',
    ],
  },
  {
    logo: '/images/iimt.jpeg',
    company: 'IIMT University',
    role: 'Machine Learning Research Associate',
    location: 'Remote',
    date: 'Jan 2025 – Mar 2025',
    description: [
      'Led an AI-driven machine learning research project for Cardiovascular Disease risk prediction, contributing to a PhD study in healthcare analytics.',
      'Developed a predictive pipeline utilizing ensemble ML models (Logistic Regression, SVM, KNN, Random Forest, XGBoost, LightGBM, CatBoost) for multi-disease risk assessment.',
      'Built and deployed an interactive Streamlit-based web application with SHAP value visualizations and model performance comparisons.',
      'Implemented a multi-output Random Forest model to predict multiple disease types simultaneously, optimizing feature engineering for higher accuracy.',
      'Delivered a fully functional ML solution tailored to healthcare research objectives.'
    ]
  },
  {
    logo: '/logo2.png',
    company: 'IRIS, MIT WPU',
    role: 'Technical Head',
    location: 'Pune',
    date: 'Aug 2024 – Present',
    description: [
      'Spearheaded the development of the official I.R.I.S. club website, taking the lead in designing, coding, and deploying it for live hackathon event registrations for 200+ people, integrated with Razorpay payment gateway to enable seamless fee collection.',
      'Currently leading and managing the tech team to oversee website updates, changes, & new feature implementations. Provide mentorship and technical guidance while also directly contributing to challenging tasks, such as backend development for the blogging system, voting system authentication, & comment section functionality.',
      'Collaborate with faculty and peers to identify and initiate new tech-based projects, fostering innovation within the club.',
      'Led the website’s successful deployment during live events, ensuring smooth operation and scalability for real-time registrations and payments.',
      'Also developing an autonomous vehicle module for non-ADAS cars using YOLOv8 deep learning models and sensor-based simulations for decision-making and steering control',
    ],
  },
];

const roles = [
  {
    image: '/logo2.png',
    role: 'IRIS [Student Club, MIT-WPU] – Technical Head',
    date: 'Aug 2024 – Present',
  },
  {
    image: '/images/info.png',
    role: 'Infosys Springboard [Remote] – ML Intern',
    date: 'Oct 2024 – Dec 2024',
  },
  {
    image: '/images/iimt.jpeg',
    role: 'IIMT University [Remote] – ML Research Associate',
    date: 'Jan 2025 – Mar 2025',
  }
];

const achievements = [
  {
    logo: '/images/mufg.png',
    text: 'Mitsubishi UFJ Financial Group (MUFG) Hackathon 2025 – Winner: Led development of an AI-powered financial assistant for personalized retirement planning using XGBoost, KMeans, and Google Gemini. Enabled voice-first interaction via Azure Speech Services and real-time insights with NewsAPI + Gemini. Deployed with Docker on AWS App Runner and frontend on Vercel.'
  },
  {
    logo: '/images/adobe.png',
    text: 'Adobe India Hackathon 2025 – Top 100 out of 2.6L+ participants: Built a containerized AI pipeline for PDF understanding, including multilingual outline extraction (PyMuPDF, K-Means), persona-driven content ranking (Ollama), and a semantic insight platform with PDF.js integration and Azure TTS-based multi-voice podcasting.'
  },
  {
    logo: '/images/bosch.jpg',
    text: 'Bosch BOROSA Hackathon 2025 – Top 4 Finalist: Built an intelligent traffic safety system using YOLOv8 for real-time signal & crosswalk detection (95–98% accuracy). Integrated ESP32S3 and MQTT for edge automation and decision logic.'
  },
  {
    logo: '/images/sih.webp',
    text: 'Smart India Hackathon (SIH) 2024 – Top 25 Finalist: Developed PlantWise, an LLM-powered Ayurvedic health companion for disease prediction and natural remedies.'
  },
  {
    logo: '/images/hackmitwpu.jpeg',
    text: 'HackMITWPU’24 Ideathon – Finalist: Proposed DermDetect, an AI-powered tool for preliminary dermatological diagnosis using image processing for remote consultations and personalized skincare solutions.'
  }
];

function getMobileThreshold() {
  if (typeof window !== 'undefined') {
    return window.innerWidth <= 768 ? 0.05 : 0.1;
  }
  return 0.1;
}

function getRootMargin() {
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return '-100px 0px -150px 0px';
  }
  return '-50px 0px -50px 0px';
}

function KushagraSingh() {
  // Hide header and footer on portfolio page
  useEffect(() => {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    
    if (header) header.style.display = 'none';
    if (footer) footer.style.display = 'none';
    
    // Cleanup function to restore header and footer when component unmounts
    return () => {
      if (header) header.style.display = '';
      if (footer) footer.style.display = '';
    };
  }, []);
  const [link, setLink] = useState("/bgVid.webm");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  const threshold = getMobileThreshold();
  const rootMargin = getRootMargin();

  const observerOptions = {
    rootMargin: rootMargin,
    triggerOnce: true,
    threshold: threshold
  };
  
  const projectsObserverOptions = {
    rootMargin: isMobile ? '-50px 0px -50px 0px' : '0px 0px 0px 0px',
    triggerOnce: true, 
    threshold: 0.01 
  };
  
  const { ref: refExperience, inView: inViewExperience } = useInView(observerOptions);
  const { ref: refProjects, inView: inViewProjects } = useInView(projectsObserverOptions);
  const { ref: refPublications, inView: inViewPublications } = useInView(observerOptions);
  const { ref: refSkills, inView: inViewSkills } = useInView(observerOptions);
  const { ref: refRoles, inView: inViewRoles } = useInView(observerOptions);

  useEffect(() => {
    if (inViewProjects) {
      setHasAnimated(true);
    }
  }, [inViewProjects]);

  const handleImageLoad = (imageSrc) => {
    setLoadedImages(prev => new Set([...prev, imageSrc]));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <div className={styles.videoBackground}>
        <video autoPlay muted loop>
          <source src={link} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContentVertical}>
          <div className={styles.heroImageWrapper}>
            <Image
              src="/Kushagra.jpg"
              alt="Kushagra Singh"
              className={styles.heroImage}
              width={220}
              height={220}
              unoptimized
            />
          </div>
          <div className={styles.heroTextCard}>
            <h1 className={styles.heroTitle}>Hi, I am Kushagra Singh</h1>
            <p className={styles.heroDescription}>
              I am a Final Year Computer Science Engineering student at MIT World Peace University, Pune, passionate about building impactful tech solutions at the intersection of Artificial Intelligence, Machine Learning, Web Development and Embedded Systems.<br /><br />
              As the Technical Head of the IRIS Tech Club, I lead a team of developers to deliver innovative projects, including the club&apos;s official website and autonomous vehicle modules.<br /><br />
              I have hands-on experience as a Machine Learning Research Associate at IIMT University, contributing to PhD-level healthcare analytics with advanced ML models and interactive web applications. My internship at Infosys Springboard deepened my expertise in deep learning and computer vision, where I developed high-accuracy neural networks and user-friendly applications.<br /><br />
              I thrive in collaborative, fast-paced environments, demonstrated by my achievements as a Top 25 Finalist in the Smart India Hackathon 2024 and a Top 4 Finalist in the Bosch BOROSA Hackathon 2025. My technical toolkit spans Python, Java, C++, PyTorch, TensorFlow, Next.js, Spring Boot, AWS, Docker and more.<br /><br />
              Driven by curiosity and a commitment to real-world impact, I enjoy tackling complex challenges, whether it&apos;s developing autonomous driving systems, AI-powered healthcare tools, or scalable cloud-native applications. I&apos;m always eager to connect, collaborate and create solutions that make a difference.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://www.linkedin.com/in/kushagra-anit-singh/" target="_blank" rel="noopener noreferrer">
                <Image src="/images/linkedin.png" alt="LinkedIn" width={24} height={24} className={styles.icon} />
                LinkedIn
              </a>
              <a href="https://github.com/kushagra-a-singh" target="_blank" rel="noopener noreferrer">
                <Image src="/images/github.png" alt="GitHub" width={24} height={24} className={styles.icon} />
                GitHub
              </a>
              <span className={styles.emailDisplay}>
                <Image src="/gmail.webp" alt="Gmail" width={24} height={24} className={styles.icon} />
                kushagraa.n@gmail.com
              </span>
              <a href="https://linktr.ee/kushagra_singh" target="_blank" rel="noopener noreferrer">
                <Image src="/images/linktree.png" alt="Linktree" width={24} height={24} className={styles.icon} />
                Linktree
              </a>
              <a href="https://scholar.google.com/citations?user=upUymaUAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
                <Image src="/gscholar.png" alt="Google Scholar" width={24} height={24} className={styles.icon} />
                Google Scholar
              </a>
            </div>

            {/* Mobile-only social links with Gmail at the end */}
            <div className={styles.socialLinksMobile}>
              <a href="https://www.linkedin.com/in/kushagra-anit-singh/" target="_blank" rel="noopener noreferrer">
                <Image src="/images/linkedin.png" alt="LinkedIn" width={24} height={24} className={styles.icon} />
                LinkedIn
              </a>
              <a href="https://github.com/kushagra-a-singh" target="_blank" rel="noopener noreferrer">
                <Image src="/images/github.png" alt="GitHub" width={24} height={24} className={styles.icon} />
                GitHub
              </a>
              <a href="https://linktr.ee/kushagra_singh" target="_blank" rel="noopener noreferrer">
                <Image src="/images/linktree.png" alt="Linktree" width={24} height={24} className={styles.icon} />
                Linktree
              </a>
              <a href="https://scholar.google.com/citations?user=upUymaUAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
                <Image src="/gscholar.png" alt="Google Scholar" width={24} height={24} className={styles.icon} />
                Google Scholar
              </a>
              <span className={styles.emailDisplay}>
                <Image src="/gmail.webp" alt="Gmail" width={24} height={24} className={styles.icon} />
                kushagraa.n@gmail.com
              </span>
            </div>
            <div className={styles.sectionLinks}>
              <div className={styles.navigationLabel}>Visit Section:</div>
              <a href="#experience">Experience</a>
              <a href="#projects">Projects</a>
              <a href="#publications">Publications</a>
              <a href="#skills">Skills</a>
              <a href="#rolesachievements">Roles & Achievements</a>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience">
        <h2 className={styles.heading2}>Experience</h2>
        <div
          ref={refExperience}
          className={`${styles.newSectionContainer} ${inViewExperience ? styles.animate : ''}`}
        >
          <div className={styles.experiencecontainer}>
            {experiences.map((exp, index) => (
              <div className={styles.experiencecard} key={index}>
                <Image src={exp.logo} alt={`${exp.company} Logo`} width={50} height={50} className={styles.experiencelogo} />
                <div className={styles.experiencedetails}>
                  <div className={styles.experienceheader}>
                    <h3 className={styles.experiencecompany}>{exp.company}</h3>
                    <span className={styles.experiencedate}>{exp.date}</span>
                  </div>
                  <div className={styles.experiencesubheader}>
                    <p className={styles.experiencerole}>{exp.role}</p>
                    <p className={styles.experiencelocation}>{exp.location}</p>
                  </div>
                  <ul>
                    {exp.description.map((desc, idx) => (
                      <li key={idx}>{desc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <h2 className={styles.heading2}>Projects</h2>
        <div style={{ width: '100%', padding: '16px 0' }}>
          <div
            ref={refProjects}
            className={`${styles.newSectionContainer} ${(inViewProjects || hasAnimated) ? styles.animate : ''}`}
          >
            <div className={styles.projectsgrid}>
              {projects.map((project, idx) => (
                <div className={styles.projectcard} key={idx}>
                  <div className={`${styles.projectimageWrapper} ${loadedImages.has(project.image) ? styles.loaded : ''}`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      className={styles.projectimage}
                      width={350}
                      height={200}
                      onLoad={() => handleImageLoad(project.image)}
                      quality={90}
                      priority={idx < 4}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>
                  <div className={styles.projectdetails}>
                    <div className={styles.projectheader}>
                      <p className={styles.projecttitle}><strong>{project.title}</strong></p>
                      <span className={styles.projectcategory}>{project.category}</span>
                    </div>
                    <div className={styles.projecttags}>
                      {project.tags.map((tag, tagIdx) => (
                        <span key={tagIdx} className={styles.projecttag}>{tag}</span>
                      ))}
                    </div>
                    <ul className={styles.projectpoints}>
                      {project.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                    <div className={styles.projectbuttons}>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.projectbutton}
                        >
                          View on GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications">
        <h2 className={styles.heading2}>Publications</h2>
        <div style={{ width: '100%', padding: '16px 0' }}>
          <div
            ref={refPublications}
            className={`${styles.newSectionContainer} ${inViewPublications ? styles.animate : ''}`}
          >
            <div className={styles.publicationscontainer}>
              {publications.map((publication, index) => (
                <div className={styles.publicationcard} key={index}>
                  <div className={styles.publicationimageWrapper}>
                    <Image
                      src={publication.image}
                      alt={publication.title}
                      className={styles.publicationimage}
                      width={350}
                      height={170}
                      style={{ objectFit: 'contain' }}
                      quality={90}
                      priority={index === 0}
                    />
                  </div>
                  <div className={styles.publicationdetails}>
                    <p className={styles.publicationtitle}><strong>{publication.title}</strong></p>
                    <p className={styles.publicationauthors}>{publication.authors}</p>
                    <p className={styles.publicationconference}>{publication.conference}</p>
                    <p className={styles.publicationdescription}>{publication.description.join(' ')}</p>
                    <a
                      href={publication.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.publicationbutton}
                    >
                      View on IEEE Xplore
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills">
        <h2 className={styles.heading2}>Skills</h2>
        <div style={{ width: '100%', padding: '16px 0' }}>
          <div
            ref={refSkills}
            className={`${styles.newSectionContainer} ${inViewSkills ? styles.animate : ''}`}
          >
            <div className={styles.skillscontainer}>
              {Object.keys(skills).map((category, categoryIdx) => (
                skills[category] && Array.isArray(skills[category]) && skills[category].length > 0 ? (
                  <div className={styles.skillscategory} key={category}>
                    <h3>{camelCaseToWords(category.charAt(0).toUpperCase()) + camelCaseToWords(category.slice(1))}</h3>
                    <div className={styles.skillslist}>
                      {skills[category].map((skill, skillIdx) => (
                        <div className={styles.skillbox} key={skill.name}>
                          <Image src={skill.logo} alt={`${skill.name} Logo`} width={50} height={50} />
                          <p>{skill.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roles and Achievements Section */}
      <section id="rolesachievements">
        <h2 className={styles.heading2}>Roles and Achievements</h2>
        <div
          ref={refRoles}
          className={`${styles.newSectionContainer} ${inViewRoles ? styles.animate : ''}`}
        >
          <div className={styles.rolesachievementscontainer}>
            {/* Roles Box */}
            <div className={styles.rolesbox}>
              <h3>Roles</h3>
              <div className={styles.roleslist}>
                {roles.map((roleData, index) => (
                  <div className={styles.roleitem} key={index}>
                    <div className={styles.roleleft}>
                      <Image
                        src={roleData.image}
                        alt={`${roleData.role} logo`}
                        width={50}
                        height={50}
                        className={styles.roleimage}
                      />
                      <p>{roleData.role}</p>
                    </div>
                    <div className={styles.roleright}>
                      <span className={styles.roledate}>{roleData.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Achievements Box */}
            <div className={styles.achievementsbox}>
              <h3>Achievements</h3>
              <div className={styles.achievementslist}>
                {achievements.map((achievement, index) => (
                  <div className={styles.achievementitem} key={index}>
                    <Image
                      src={achievement.logo}
                      alt="Achievement Logo"
                      className={styles.achievementlogo}
                      width={38}
                      height={38}
                      quality={90}
                    />
                    {achievement.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          className={styles.scrollToTop}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
          <span>Top</span>
        </button>
      )}
    </div>
  );
}

export default KushagraSingh;