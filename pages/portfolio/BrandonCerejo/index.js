import React, { useState } from 'react';
import styles from './BrandonCerejo.module.css';
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
    { name: 'Seaborn', logo: '/images/seaborn.png'},
    { name: 'Scikit-Learn', logo: '/images/scikit.png'},
    { name: 'Tkinter', logo: '/images/tkinter.png'},
  ],
  electronics: [
    { name: 'Raspberry Pi', logo: '/images/raspberry.jpg' },
    { name: 'Arduino', logo: '/images/arduino.png'},
  ],
  webDevelopment: [
    { name: 'Next.js', logo: '/images/next.png' },
    { name: 'React', logo: '/images/reacg.png' },
    { name: 'Node.js', logo: '/images/node.jpeg' },
    { name: 'Express.js', logo: '/images/express.png' },
    { name: 'HTML', logo: '/images/html.png'},
    { name: 'CSS', logo: '/images/css.png'},
    { name: 'JavaScript', logo: '/images/js.png'},
    { name: 'Bootstrap', logo: '/images/bootstrap.png'}
  ],
  bigDataTechnology: [
    { name: 'Cloudera', logo: '/images/cloudera.webp' },
    { name: 'HDFS', logo: '/images/hdfs.png' },
    { name: 'Apache Pig', logo: '/images/pig.png' },
    { name: 'Hive', logo: '/images/hive.png' },
    { name: 'HBase', logo: '/images/hbase.png'},
    { name: 'Apache Spark', logo: '/images/spark.png'}
  ],
  databases: [
    { name: 'MySQL', logo: '/images/mysql.png' },
    { name: 'MongoDB', logo: '/images/mongodb.svg' }
  ],
  visualizationTools: [
    { name: 'Tableau', logo: '/images/tableau.png' },
    { name: 'PowerBI', logo: '/images/poerbi.jpeg' }
  ]
};

const projects = [
  {
    title: 'ForVis - Formula 1 Analytics',
    points: [
      'Tools used: Apache Spark, HDFS, Machine Learning Models, Scikit-Learn, PyQt5, Dash',
      'Developed a dynamic GUI using PyQt5 to visualize Formula 1 race telemetry with real-time and historical data analysis.',
      'Multi-driver comparison, lap time analysis & tire strategy insights via interactive dashboards.',
      'Integrated FastF1 APIs and stored telemetry in HDFS, achieving a 30% reduction in processing time using Apache Spark.',
      'Implemented Random Forest Classification and Linear Regression models for pit stop predictions and optimization of race strategy with an accuracy rate of 86%.',
      'Currently, a Kafka-based pipeline is being tested to handle real-time telemetry and analytics.'
    ],
    link: 'https://github.com/BrandonCerejo/ForVis-Formula1-Data-Visualization-and-ML-Models',
    image: '/KushagraProj1.png'
  },
  {
    title: 'IRIS Website',
    points: [
      'Tools used: MERN Stack',
      'Helped in developing an official website for the club to provide a centralized platform to share IRIS updates, event details, recruitments and resources.',
      'Utilized continuous deployment on Vercel with GitHub CI/CD integration.'
    ],
    link: 'https://github.com/BrandonCerejo/I.R.I.S-PROD',
    image: '/website_img.png'
  },
  {
    title: 'Magic Board- Mathematical Equation Recognition and Calculation',
    points: [
      'Tools used: OCR, ML Models, SciPy, Sympy, Scikit-Learn, MatPlotLib',
      'Developed a Convolutional Neural Network (CNN) model to accurately detect handwritten numbers and basic mathematical operators, trained on a dataset of over 10,000 images.',
      'Achieved 98% recognition accuracy for handwritten mathematical equations.',
      'Utilized SciPy to compute the solutions for the recognized mathematical equations, enabling real-time calculations.',
      'Integrated Matplotlib to visualize the equations as graphs.'
    ],
    link: 'https://github.com/BrandonCerejo/Magic-board/tree/third',
    image: '/BrandonProj1.jpg'
  },
  {
    title: 'Driver Drowsiness Detection and Alert System',
    points: [
      'Tools Used: Python, DLib, Raspberry PI',
      'Developed a real-time driver drowsiness detection system using the Dlib library, integrated with a Raspberry Pi and a connected camera.',
      'Implemented facial landmark detection using Haar cascades and Dlib&apos;s pre-trained model to monitor eye aspect ratio (EAR) for prolonged eye closure and lip distance for yawning detection.',
      'Achieved over 95% accuracy in detecting drowsiness using advanced facial landmark detection algorithms.',
      'Implemented real-time alerts for drowsiness through audio signals and notifications to enhance driver safety.'
    ],
    link: 'https://github.com/BrandonCerejo/Driver-Drowsiness-Detection-And-Alert-System',
    image: '/images/brandonproj1.jpg'
  },
];

const experiences = [
  {
    logo: '/logo2.png',
    company: 'IRIS',
    role: 'Treasurer and Tech team member',
    location: 'Pune',
    date: 'Aug 2024 - Present',
    description: [
      'Successfully managing the financial operations of the I.R.I.S. club, overseeing budgeting, expense tracking, and fund allocation to ensure smooth execution of club activities and events.',
      'Coordinating with higher college authorities to get event budgets approved, presenting comprehensive financial plans and justifications for fund utilization.',
      'Collaborating with the technical and non-technical teams to ensure efficient resource allocation, facilitating seamless event organization and execution.',
      'Actively engaging with the leadership team to identify new opportunities for club growth and innovation, ensuring financial feasibility and strategic alignment.',
      'Worked with a team to develop a website for the club. My main role was focusing on the frontend aspects to ensure an intuitive and user-friendly design.'
    ],
  },
];

const roles = [
  {
    image: '/logo2.png',
    role: 'IRIS [Student Club, MIT-WPU] - Treasurer',
    date: 'Aug 2024 - Present',
  },
  {
    image: '/logo2.png',
    role: 'IRIS [Student Club, MIT-WPU] - Tech Team Member',
    date: 'Jan 2024 - Current',
  },
];

const achievements = [
  'Hands-on approach to AI for Real-World Applications- Organized by IIT Kharagpur AI4ICPS I HUB Foundation and TCS iON. Completed on: December 6th 2023',
  'Data Science and Machine Learning Bootcamp with R- Udemy. Completed on: December 2024',
];

function BrandonCerejo() {
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
            src="/images/brandon.jpeg"
            alt="Kushagra Singh"
            className={styles.heroimage}
            width={200}
            height={200}
          />
          <div className={styles.herotext}>
            <h2>Hi, I&apos;m Brandon Cerejo</h2>
            <p>I am a third-year Computer Science Engineering student at MIT-WPU, Pune, with practical experience in Machine Learning, Data Science, IoT, and Web Development. Currently, I serve as the Treasurer of IRIS, a student club at MIT-WPU, where I also contribute as a member of the development team for the IRIS website. I am highly motivated by challenges, eager to learn and developing practical, user-friendly solutions.</p>
            <div className={styles.sociallinks}>
              <a href="https://www.linkedin.com/in/brandon-cerejo-921275247/?originalSubdomain=in" target="_blank" rel="noopener noreferrer">
                <Image src="/images/linkedin.png" alt="LinkedIn" width={24} height={24} className={styles.icon} />
                LinkedIn
              </a>
              <a href="https://github.com/BrandonCerejo" target="_blank" rel="noopener noreferrer">
                <Image src="/images/github.png" alt="GitHub" width={24} height={24} className={styles.icon} />
                GitHub
              </a>
              <a target="_blank" rel="noopener noreferrer">
                <Image src="/images/gmail.webp" alt="Gmail" width={24} height={24} className={styles.gmailicon} />
                brandoncerejo39@gmail.com
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
        <h2 className={styles.heading2}>Roles and Certifications</h2>
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
            <h3>Certifications</h3>
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

export default BrandonCerejo;