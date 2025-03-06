import React, { useState } from 'react';
import styles from './SamanyuBhate.module.css';
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
    { name: 'OpenCV', logo: '/images/opencv.png' },
    { name: 'Pandas', logo: '/images/pandas.png' },
    { name: 'NumPy', logo: '/images/numpy.png' },
    { name: 'TensorFlow', logo: '/images/tensorflow.png' },
  ],
  electronics: [
    { name: 'Arduino', logo: '/images/arduino.png' },
    { name: 'Raspberry Pi', logo: '/images/raspberry.jpg' },
    { name: 'STM32', logo: '/images/stm.png' },
    { name: 'ESP', logo: '/images/esp.png' }
  ],
  bigDataTechnologies: [
    { name: 'Cloudera', logo: '/images/cloudera.webp' },
    { name: 'HDFS', logo: '/images/hdfs.png' },
    { name: 'Apache Pig', logo: '/images/pig.png' },
    { name: 'Hive', logo: '/images/hive.png' },
    { name: 'HBase', logo: '/images/hbase.png' },
    { name: 'Apache Spark', logo: '/images/spark.png' }
  ],
  softwares: [
    { name: 'MATLAB', logo: '/images/matlab.jpg' },
    { name: 'SolidWorks', logo: '/images/solidworks.webp' }
  ]
};

const projects = [
  {
    title: 'Magic Board',
    points: [
      'Developed a model trained on a comprehensive dataset of over 10,000 handwritten mathematical equations.',
      'Achieved 98% recognition accuracy for handwritten mathematical equations.',
      'Utilized SciPy to calculate values from the extracted text of equations.',
      'Integrated graphing capabilities to visualize equations using SciPy.'
    ],
    link: 'https://github.com/Scient025/Magic-board',
    image: '/BrandonProj1.jpg'
  },
  {
    title: 'IRIS Website',
    points: [
      'Developed an official website for the club to provide a centralized platform to share IRIS updates, event details, recruitments and resources.',
      'Utilized Razorpay, Supabase Database, and Vercel for deployment.'
    ],
    link: 'https://github.com/IRIS-MITWPU/I.R.I.S-Prod-Website',
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
    link: 'https://github.com/Scient025/ForVis',
    image: '/KushagraProj1.png'
  },
  {
    title: 'Real-Time Parking Management System',
    points: [
      'Developed a system that takes in a live video feed and allocates parking based on availability.',
      'Uses OpenCV and Threading with YOLOv8 for real-time allocation, speeding up the process by 40%.',
      'Implemented using CCTV cameras and Raspberry Pi.'
    ],
    link: 'https://github.com/TakshDhabalia/Driving_Optimization',
    image: '/TakshProj1.jpg'
  },
  {
    title: 'River Cleaner Project',
    points: [
      'Created a live feed via MJPG streamer using a camera interfaced to a Raspberry Pi.',
      'Processed images through Roboflow with an object detection model to identify plastic bags and bottles',
      'Developed a system to update object counts and activate sensors for river condition data collection.',
      'Implemented a conveyor belt to collect floating garbage using a makeshift bin.',
      'Completed MQTT publisher and broker setup, camera, and yolov8 integration.'
    ],
    link: '',
    image: ''
  },
];

const experiences = [
  {
    logo: '/images/algo.png',
    company: 'AlgoAnalytics',
    role: 'Data Science Intern',
    location: 'Remote',
    date: 'December 2024 - April 2025',
    description: [
      'Developed an image classification model using AnoGANs and CNN-based approaches, reducing false positives and improving defect detection.',
      'Implemented data augmentation techniques to handle multiple edge cases and enhance model robustness.',
      'Worked on model training and report generation to evaluate performance and provide insights.',
    ],
  }
];

const roles = [
    {
    image: '/images/algo.png',
    role: 'AlgoAnalytics - Data Science Intern',
    date: 'December 2024 - April 2025',
      },
    {
    image: '/logo2.png',
    role: 'IRIS [Student Club, MIT-WPU] - Project Head',
    date: 'Aug 2024 - Present',
    },
];

const achievements = [
  'Smart India Hackathon (SIH) 2024- Top 25 Finalist : Collaborated with a multidisciplinary team to qualify as one of the top 25 teams in the internal round of SIH 2024. Designed and developed DopplerEcho, a Radar Based drone detection system to identify and classify drones.'
];

function SamanyuBhate() {
  const [link, setLink] = useState("/bgVid.webm")
  
  return (
    <div>
      <div className={styles.videoBackground}>
        <video autoPlay muted loop>
          <source src={link} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.herocontent}>
          <Image
            src="/images/bhate.jpg"
            alt="Samanyu Bhate"
            className={styles.heroimage}
            width={200}
            height={200}
          />
          <div className={styles.herotext}>
            <h2>Hi, I&apos;m Samanyu Bhate</h2>
            <p>I’m a Third Year Computer Science Engineering student at MIT WPU, Pune. I am currently a Data Science Intern at Algo Analytics and The Techincal Head of the tech club IRIS. My current interests are in: Machine Learning, Computer Vision, Deep Learning.</p>
            <div className={styles.sociallinks}>
              <a href="https://in.linkedin.com/in/samanyu-bhate-17136b1ab" target="_blank" rel="noopener noreferrer">
                <Image src="/images/linkedin.png" alt="LinkedIn" width={24} height={24} className={styles.icon} />
                LinkedIn
              </a>
              <a href="https://github.com/Scient025" target="_blank" rel="noopener noreferrer">
                <Image src="/images/github.png" alt="GitHub" width={24} height={24} className={styles.icon} />
                GitHub
              </a>
              <a target="_blank" rel="noopener noreferrer">
                <Image src="/images/gmail.webp" alt="Gmail" width={24} height={24} className={styles.gmailicon} />
                bhatesamanyu@gmail.com
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

export default SamanyuBhate;