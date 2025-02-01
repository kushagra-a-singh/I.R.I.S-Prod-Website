import React from 'react';
import styles from './KushagraSingh.module.css';

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
      'Implemented facial landmark detection using Haar cascades and Dlib’s pre-trained model to monitor eye aspect ratio (EAR) for prolonged eye closure and lip distance for yawning detection.',
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
  'Data Sciecnce and Machine Learning Bootcamp with R- Udemy. Completed on: December 2024',
];

function BrandonCerejo() {
  return (
    <div>
      <video className="background-video" autoPlay muted loop>
        <source
          src="https://rkvbuqdjkilvqlywzjsi.supabase.co/storage/v1/object/sign/AboutPhotos/Videos/vid2.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBYm91dFBob3Rvcy9WaWRlb3MvdmlkMi5tcDQiLCJpYXQiOjE3MzA5MDA1MDcsImV4cCI6MTc2MjQzNjUwN30.qMfRi7Uxvtpz4rRnaN6bTSQzEE_AtxrRQMBp2qR5YEI&t=2024-11-06T13%3A41%3A48.487Z"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <img
            src="/images/brandon.jpeg"
            className="hero-image"
          />
          <div className="hero-text">
            <h2>Hi, I'm Brandon Cerejo</h2>
            <p>I am a third-year Computer Science Engineering student at MIT-WPU, Pune, with practical experience in Machine Learning, Data Science, Iot, and Web Development. Currently, I serve as the Treasurer of IRIS, a student club at MIT-WPU, where I also contribute as a member of the development team for the IRIS website. I am highly motivated by challenges, eager to learn and developing practical, user-friendly solutions</p>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/brandon-cerejo-921275247/?originalSubdomain=in" target="_blank" rel="noopener noreferrer"><img src="/images/linkedin.png" alt="LinkedIN" className="icon"></img>LinkedIn</a>
              <a href="https://github.com/BrandonCerejo" target="_blank" rel="noopener noreferrer"><img src="/images/github.png" alt="GitHub" className="icon"></img>GitHub</a>
              <a target="_blank" rel="noopener noreferrer"><img src="/images/gmail.webp" alt="Gmail" className="gmail-icon"></img>brandoncerejo39@gmail.com</a>
            </div>
            <div className="section-links">
              <a href="#experience">Experience</a>
              <a href="#projects">Projects</a>
              <a href="#skills">Skills</a>
              <a href="#roles-achievements">Roles & Certifications</a>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience">
        <h2>Experience</h2>
        <div className="experience-container">
          {experiences.map((exp, index) => (
            <div className="experience-card" key={index}>
              <img src={exp.logo} alt={`${exp.company} Logo`} className="experience-logo" />
              <div className="experience-details">
                <div className="experience-header">
                  <h3 className="experience-company">{exp.company}</h3>
                  <span className="experience-date">{exp.date}</span>
                </div>
                <div className="experience-subheader">
                  <p className="experience-role">{exp.role}</p>
                  <p className="experience-location">{exp.location}</p>
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
        <h2>Projects</h2>
        <div className="projects-grid">
            {projects.map((project, index) => (
            <div className="project-card" key={index}>
                <img
                src={project.image}
                alt={project.title}
                className="project-image"
                />
                <div className="project-details">
                <p className="project-title"><strong>{project.title}</strong></p>
                <ul className="project-points">
                    {project.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                    ))}
                </ul>
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-button"
                >
                    View on GitHub
                </a>
                </div>
            </div>
            ))}
        </div>
        </section>


      <section id="skills">
        <h2>Skills</h2>
        <div className="skills-container">
          {Object.keys(skills).map((category) => (
            <div className="skills-category" key={category}>
              <h3>{camelCaseToWords(category.charAt(0).toUpperCase()) + camelCaseToWords(category.slice(1))}</h3>
              <div className="skills-list">
                {skills[category].map((skill) => (
                  <div className="skill-box" key={skill.name}>
                    <img src={skill.logo} alt={`${skill.name} Logo`} />
                    <p>{skill.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    <section id="roles-achievements">
      <h2>Roles and Certifications</h2>
      <div className="roles-achievements-container">
        {/* Roles Box */}
        <div className="roles-box">
          <h3>Roles</h3>
          <div className="roles-list">
            {roles.map((roleData, index) => (
              <div className="role-item" key={index}>
                <div className="role-left">
                <img
                    src={roleData.image}
                    alt={`${roleData.role} logo`}
                    className="role-image"
                  />
                  <p>{roleData.role}</p>
                </div>
                <div className="role-right">
                  <span className="role-date">{roleData.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Achievements Box */}
        <div className="achievements-box">
          <h3>Certifications</h3>
          <div className="achievements-list">
            {achievements.map((achievement, index) => (
              <div className="achievement-item" key={index}>
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
