import React, { useState } from 'react';
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
    points: [
      'Engineered a RAG chatbot using LLaMA-3 70B, FAISS-based semantic search, and LangChain for club info retrieval.',
      'Optimized for 10ms query latency and 200+ daily queries.',
      'Benchmarked against fine-tuned DistilBERT (0.92 BERTScore).',
      'Developed a hybrid RAG-finetune architecture for improved contextual accuracy.'
    ],
    link: 'https://github.com/kushagra-a-singh/IRIS-Club-RAG-Chatbot',
    image: '/rag-chatbot.png'
  },
  {
    title: 'Data Orchestrate – Distributed File Sync',
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
    title: 'ForVis – Formula 1 Analytics',
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
    title: 'Tarzan – Autonomous Vehicle Module',
    points: [
      'Developing an autonomous vehicle portable module for non-ADAS-enabled cars using custom deep learning models (YOLOv8).',
      'Implements vision-based real-time obstacle detection, path planning using pure-pursuit algorithm in MATLAB.',
      'Designing multi-modal sensor fusion combining camera, LiDAR, and ultrasonic sensors for robust perception.',
      'App-based image input for decision making – steering, acceleration, braking.',
      'Simulates real-world scenarios (cars, potholes, barricades, etc.) for safe navigation.'
    ],
    link: 'https://github.com/kushagra-a-singh/Tarzan-I.R.I.S.',
    image: '/simulation.jpg'
  },
  {
    title: 'IRIS Club Website',
    points: [
      'Developed an official website for the club to provide a centralized platform to share IRIS updates, event details, recruitments and resources.',
      'Handling multiple concurrent real-time payments and updating entries for events.',
      'Features include event registrations with a payment gateway, dynamic blogging with a voting system and comment section, club project highlights, recruitment and contact forms.',
      'Utilized Razorpay SDK, Supabase Database, and continuous deployment on Vercel with GitHub CI/CD integration.'
    ],
    link: 'https://github.com/kushagra-a-singh/I.R.I.S-PROD',
    image: '/website_img.png'
  },
  {
    title: 'PlantWise – Ayurvedic AI Companion',
    points: [
      'Built an AI-driven health assistant using LLMs (Cohere API) for disease prediction and Ayurvedic remedy recommendation.',
      'Implemented RAG pipeline with PyQt GUI for dynamic responses.',
      'Top 25 Finalist at Smart India Hackathon 2024.',
      'Achieved 89% user satisfaction across 500+ curated mappings.'
    ],
    link: 'https://github.com/kushagra-a-singh/PlantWise',
    image: '/plantwise.png'
  },
  {
    title: 'Driver Safety Monitoring System',
    points: [
      'Integrated MQ3 alcohol sensor, accelerometer/gyroscope, GPS module, LED screen, GSM module and buzzer into a vehicle’s onboard system using C++ and Arduino.',
      'Developed a comprehensive system to monitor driver behavior, detect alcohol presence, and deliver real-time alerts to promote safe driving practices.',
      'Enabled timely feedback for enhanced driver safety, utilizing sensors for real-time monitoring and instant notifications.'
    ],
    link: 'https://github.com/kushagra-a-singh/Embedded-Arduino-System-for-Car-Road-Safety',
    image: '/KushagraProj2.jpg'
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
    logo: '/images/bosch.jpg',
    text: 'Bosch BOROSA Hackathon 2025 – Top 18 Finalist: Built an intelligent traffic safety system using YOLOv8 for real-time signal & crosswalk detection (95–98% accuracy). Integrated ESP32S3 and MQTT for edge automation and GenAI-based decision logic.'
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

function KushagraSingh() {
  const [link, setLink] = useState("/bgVid.webm")
  
  const { ref: refExperience, inView: inViewExperience } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: refProjects, inView: inViewProjects } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: refSkills, inView: inViewSkills } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: refRoles, inView: inViewRoles } = useInView({ triggerOnce: true, threshold: 0.2 });

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
              I am a Third Year Computer Science Engineering student at MIT World Peace University, Pune, passionate about building impactful tech solutions at the intersection of Artificial Intelligence, Machine Learning, Web Development and Embedded Systems.<br /><br />
              As the Technical Head of the IRIS Tech Club, I lead a team of developers to deliver innovative projects, including the club's official website and autonomous vehicle modules.<br /><br />
              I have hands-on experience as a Machine Learning Research Associate at IIMT University, contributing to PhD-level healthcare analytics with advanced ML models and interactive web applications. My internship at Infosys Springboard deepened my expertise in deep learning and computer vision, where I developed high-accuracy neural networks and user-friendly applications.<br /><br />
              I thrive in collaborative, fast-paced environments, demonstrated by my achievements as a Top 25 Finalist in the Smart India Hackathon 2024 and a Top 18 Finalist in the Bosch BOROSA Hackathon 2025. My technical toolkit spans Python, Java, C++, PyTorch, TensorFlow, Next.js, Spring Boot, AWS, Docker and more.<br /><br />
              Driven by curiosity and a commitment to real-world impact, I enjoy tackling complex challenges, whether it's developing autonomous driving systems, AI-powered healthcare tools, or scalable cloud-native applications. I'm always eager to connect, collaborate and create solutions that make a difference.
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
              <a href="https://linktr.ee/kushagra_singh" target="_blank" rel="noopener noreferrer">
                <Image src="/images/linktree.png" alt="Linktree" width={24} height={24} className={styles.icon} />
                Linktree
              </a>
              <span className={styles.emailDisplay}>
                <Image src="/images/gmail.png" alt="Gmail" width={24} height={24} className={styles.icon} />
                kushagraa.n@gmail.com
              </span>
            </div>
            <div className={styles.sectionLinks}>
              <a href="#experience">Experience</a>
              <a href="#projects">Projects</a>
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
        <div
          ref={refProjects}
          className={`${styles.newSectionContainer} ${inViewProjects ? styles.animate : ''}`}
        >
          <div className={styles.projectsgrid}>
            {projects.map((project, idx) => (
              <div className={styles.projectcard} key={idx}>
                <div className={styles.projectimageWrapper}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className={styles.projectimage}
                    width={350}
                    height={170}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className={styles.projectdetails}>
                  <p className={styles.projecttitle}><strong>{project.title}</strong></p>
                  <ul className={styles.projectpoints}>
                    {project.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectbutton}
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills">
        <h2 className={styles.heading2}>Skills</h2>
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
                    <img src={achievement.logo} alt="Achievement Logo" className={styles.achievementlogo} />
                    {achievement.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default KushagraSingh;