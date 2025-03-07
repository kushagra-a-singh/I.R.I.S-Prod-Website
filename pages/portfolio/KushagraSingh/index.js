import React, { useState } from 'react';
import styles from './KushagraSingh.module.css';
import Image from 'next/image'; 

const camelCaseToWords = (text) => {
  return text.replace(/([a-z])([A-Z])/g, '$1 $2');
};

const skills = {
  languages: [
    { name: 'Python', logo: '/images/python.png' },
    { name: 'C', logo: '/images/C.png' },
    { name: 'C++', logo: '/images/C++.png' }
  ],
  packages: [
    { name: 'Torch', logo: '/images/pytorch.jpeg' },
    { name: 'OpenCV', logo: '/images/opencv.png' },
    { name: 'Pandas', logo: '/images/pandas.png' },
    { name: 'NumPy', logo: '/images/numpy.png' },
    { name: 'TensorFlow', logo: '/images/tensorflow.png' },
    { name: 'Seaborn', logo: '/images/seaborn.png' },
    { name: 'Scikit-Learn', logo: '/images/scikit.png' },
    { name: 'Tkinter', logo: '/images/tkinter.png' },
    { name: 'StreamLit', logo: '/images/stramlit.png' }
  ],
  electronics: [
    { name: 'Arduino', logo: '/images/arduino.png' },
    { name: 'Raspberry Pi', logo: '/images/raspberry.jpg' },
    { name: 'STM32', logo: '/images/stm.png' }
  ],
  webDevelopment: [
    { name: 'Next.js', logo: '/images/next.png' },
    { name: 'React', logo: '/images/reacg.png' },
    { name: 'Node.js', logo: '/images/node.jpeg' },
    { name: 'Express.js', logo: '/images/express.png' },
    { name: 'HTML', logo: '/images/html.png' },
    { name: 'CSS', logo: '/images/css.png' },
    { name: 'JavaScript', logo: '/images/js.png' },
    { name: 'Bootstrap', logo: '/images/bootstrap.png' }
  ],
  bigDataTechnologies: [
    { name: 'Cloudera', logo: '/images/cloudera.webp' },
    { name: 'HDFS', logo: '/images/hdfs.png' },
    { name: 'Apache Pig', logo: '/images/pig.png' },
    { name: 'Hive', logo: '/images/hive.png' },
    { name: 'HBase', logo: '/images/hbase.png' },
    { name: 'Apache Spark', logo: '/images/spark.png' }
  ],
  databases: [
    { name: 'MySQL', logo: '/images/mysql.png' },
    { name: 'MongoDB', logo: '/images/mongodb.svg' },
    { name: 'PostgreSQL', logo: '/images/prostgresql.png' }
  ],
  visualizationTools: [
    { name: 'Tableau', logo: '/images/tableau.png' }
  ],
  softwares: [
    { name: 'AutoCAD', logo: '/images/autocad.png' },
    { name: 'TinkerCAD', logo: '/images/Tinkercad.png' }
  ]
};

const projects = [
  {
    title: 'Tarzan [Ongoing]',
    points: [
      'Developing an autonomous vehicle portable module for non-ADAS enabled cars.',
      'Uses an app to input images and run custom deep learning models (YOLOv8) to make decisions for car steering angle, acceleration, and braking values.',
      'Takes surroundings like other cars, potholes, barricades, etc., to make its decisions.'
    ],
    link: 'https://github.com/kushagra-a-singh/Tarzan-I.R.I.S.',
    image: '/simulation.jpg'
  },
  {
    title: 'IRIS Website',
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
    title: 'ForVis - Formula 1 Analytics',
    points: [
      'Developed a dynamic GUI using PyQt5 to visualize Formula 1 race telemetry with real-time and historical data analysis.',
      'Integrated FastF1 APIs and stored telemetry in HDFS, achieving a 30% reduction in processing time using Apache Spark.',
      'Implemented Random Forest Classification and Linear Regression models for pit stop predictions and race strategy optimization with an 86% accuracy rate.',
      'Enabled multi-driver comparison, lap time analysis & tyre strategy insights via interactive dashboards.',
      'Currently trying to integrate a Kafka-based pipeline to handle real-time telemetry and analytics.'
    ],
    link: 'https://github.com/kushagra-a-singh/ForVis',
    image: '/KushagraProj1.png'
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
  },
];

const experiences = [
  {
    logo: '/images/info.png',
    company: 'Infosys Springboard',
    role: 'ML Project Intern',
    location: 'Remote',
    date: 'Oct - Nov 2024',
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
    logo: '/logo2.png',
    company: 'IRIS',
    role: 'Technical Head',
    location: 'Pune',
    date: 'Aug 2024 - Present',
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
    role: 'IRIS [Student Club, MIT-WPU] - Technical Head',
    date: 'Aug 2024 - Present',
  },
  {
    image: '/images/info.png',
    role: 'Infosys Springboard [Remote] - ML Intern',
    date: 'Oct 2024 - Dec 2024',
  },
];

const achievements = [
  'Smart India Hackathon (SIH) 2024 - Top 25 Finalist : Collaborated with a multidisciplinary team to qualify as one of the top 25 teams in the internal round of SIH 2024. Designed and developed PlantWise, an AI-powered Ayurvedic health companion for disease prediction and natural remedies.',
  'HackMITWPU’24 Ideathon - Finalist : Proposed DermDetect, an AI-powered tool for preliminary dermatological diagnosis using image processing for remote consultations and personalized skincare solutions for underserved regions, enhancing early detection and skin condition management.',
];

function KushagraSingh() {
  const [link, setLink] = useState("/bgVid.webm")
  
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
        <div className={styles.herocontent}>
          <Image
            src="/Kushagra.jpeg"
            alt="Kushagra Singh"
            className={styles.heroimage}
            width={200}
            height={200}
          />
          <div className={styles.herotext}>
            <h2>Hi, I&apos;m Kushagra Singh</h2>
            <p>I’m a Third Year Computer Science Engineering student at MIT WPU, Pune, with hands-on experience in Machine Learning, Web Development and Embedded Systems & IoT. I’ve interned at Infosys Springboard, and as the Technical Head of the IRIS Tech Club, I lead a team focused on building tech solutions and managing live projects. I’m driven by challenges and always looking for new ways to solve real-world problems with a focus on creating practical and user-centric applications.</p>
            <div className={styles.sociallinks}>
              <a href="https://www.linkedin.com/in/kushagra-anit-singh/" target="_blank" rel="noopener noreferrer">
                <Image src="/images/linkedin.png" alt="LinkedIn" width={24} height={24} className={styles.icon} />
                LinkedIn
              </a>
              <a href="https://github.com/kushagra-a-singh" target="_blank" rel="noopener noreferrer">
                <Image src="/images/github.png" alt="GitHub" width={24} height={24} className={styles.icon} />
                GitHub
              </a>
              <a target="_blank" rel="noopener noreferrer">
                <Image src="/images/gmail.webp" alt="Gmail" width={24} height={24} className={styles.gmailicon} />
                kushagraa.n@gmail.com
              </a>
            </div>
            <div className={styles.sectionlinks}>
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
      </section>

      {/* Projects Section */}
      <section id="projects">
        <h2 className={styles.heading2}>Projects</h2>
        <div className={styles.projectsgrid}>
          {projects.map((project, index) => (
            <div className={styles.projectcard} key={index}>
              <Image
                src={project.image}
                alt={project.title}
                className={styles.projectimage}
                width={300}
                height={200}
              />
              <div className={styles.projectdetails}>
                <p className={styles.projecttitle}><strong>{project.title}</strong></p>
                <ul className={styles.projectpoints}>
                  {project.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
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
      </section>

      {/* Skills Section */}
      <section id="skills">
        <h2 className={styles.heading2}>Skills</h2>
        <div className={styles.skillscontainer}>
          {Object.keys(skills).map((category) => (
            <div className={styles.skillscategory} key={category}>
              <h3>{camelCaseToWords(category.charAt(0).toUpperCase()) + camelCaseToWords(category.slice(1))}</h3>
              <div className={styles.skillslist}>
                {skills[category].map((skill) => (
                  <div className={styles.skillbox} key={skill.name}>
                    <Image src={skill.logo} alt={`${skill.name} Logo`} width={50} height={50} />
                    <p>{skill.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roles and Achievements Section */}
      <section id="rolesachievements">
        <h2 className={styles.heading2}>Roles and Achievements</h2>
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
                  <p>{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default KushagraSingh;