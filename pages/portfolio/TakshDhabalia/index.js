import React from 'react';
import styles from './TakshDhabalia.module.css';

const skills = {
  languages: [
    { name: 'Python', logo: '/images/python.png' },
    { name: 'C', logo: '/images/C.png' },
    { name: 'C++', logo: '/images/C++.png' }
  ],
  packages: [
    { name: 'Music21', logo: '/images/music21.png' },
    { name: 'OpenCV', logo: '/images/opencv.png' },
    { name: 'Pandas', logo: '/images/pandas.png' },
    { name: 'NumPy', logo: '/images/numpy.png' },
    { name: 'TensorFlow', logo: '/images/tensorflow.png' },
    { name: 'PyGame', logo: '/images/pygame.png' }
  ],
  electronics: [
    { name: 'Raspberry Pi', logo: '/images/raspberry.jpg' },
    { name: 'Arduino', logo: '/images/arduino.png'},
    { name: 'STM32', logo: '/images/stm.png'},
    { name: 'Node-RED', logo: '/images/nodered.png' },
    { name: 'ESP', logo: '/images/esp.png' }
  ],
  protocols: [
    { name: 'MQTT', logo: '/images/mqtt.png' },
    { name: 'LoRaWAN', logo: '/images/lorawan.png' },
    { name: 'ESP-Now', logo: '/images/espnow.png' },
    { name: 'Cellular', logo: '/images/cellular.png' },
    { name: 'NB-IoT', logo: '/images/nbiot.png' }
  ]
};

const projects = [
  {
    title: 'Tarzan',
    points: [
      'Developing an autonomous vehicle portable module for non-ADAS enabled cars.',
      'Uses an app to input images and run custom deep learning models (YOLOv8) to make decisions for car steering angle, acceleration, and braking values.',
      'Takes surroundings like other cars, potholes, barricades, etc., to make its decisions.',
      'Worked on making simulations using MATLAB with pure-pursuit modeling.'
    ],
    link: 'https://github.com/TakshDhabalia/TarzanIRIS',
    image: '/images/tarzan.jpg'
  },
  {
    title: 'IRIS Website',
    points: [
      'Developed an official site for the club, handling multiple concurrent real-time payments and updating entries for events.',
      'Utilized Razorpay, Supabase Database, and Vercel for deployment.'
    ],
    link: 'https://github.com/kushagra-a-singh/I.R.I.S-PROD',
    image: '/website_img.png'
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
    title: 'Doom on Web',
    points: [
      'Achieved a 30% performance improvement in FPS and a 10% improvement on web platforms by implementing core algorithms natively.',
      'Leverages Ray-Casting for its core engine algorithm and uses BFS and DFS for NPC algorithms.',
      'Developing multiplayer and squad-up features (WIP).'
    ],
    link: 'https://github.com/TakshDhabalia/Doom',
    image: '/TakshProj2.jpg'
  },
  {
    title: 'Music_Gen',
    points: [
      'Produced music from input using LSTMs in real-time.',
      'Utilized open-source KERN datasets for German songs to generate unique melodies based on the input provided, giving continuations of them as a result.'
    ],
    link: 'https://github.com/TakshDhabalia/Research-and-MusicGeneration',
    image: 'https://via.placeholder.com/300?text=Music_Gen'
  }
];

const experiences = [
  {
    logo: '/images/iiitd.png',
    company: 'IIIT-Delhi',
    role: 'System Design and Embedded Software Developer Intern',
    location: 'Delhi',
    date: 'Jan - Aug 2024',
    description: [
      'Designed and implemented a water management system with an app and cloud integration.',
      'Developed the overall hardware and cloud architecture, deployed on STM32 micro controllers.',
      'Developed the entire app for the project written in Dart using the Flutter framework. Used Firebase for the backend.',
      'Demonstrated skills in micro-controller architecture, low-level embedded systems programming, system design and architecture, PCB designing, and Flutter development.',
    ],
  },
  {
    logo: '/images/bolt.jpeg',
    company: 'Team Bolt',
    role: 'Vice Lead, Electronics',
    location: 'Pune',
    date: 'June 2023 - Jan 2024',
    description: [
      'Secured All India Rank 4 in FMAE Moto Student India - Electric Superbike Building Competition and overall rank 2 in cost report and endurance test.',
      'Led the innovations and electronics department, developing 4 new innovations including GPS tracking and SOS impact sensors.',
      'Contributed to wiring and circuitry for GLVS and HVS systems.',
    ],
  },
];

const roles = [
  {
    image: '/logo2.png',
    role: 'IRIS [Student Club, MIT-WPU] - President',
    date: 'June 2024-Current',
  },
  {
    image: '/images/bolt.jpeg',
    role: 'Team Bolt [Student Club, MIT-WPU] - Vice-Lead for Innovations and Electronics',
    date: '2022-2024',
  },
];

const achievements = [
  'All India Rank 4 in FMAE Moto Student India.',
  'Rank 2 in Cost report and Endurance test in FMAE Moto Student India',
];

function TakshDhabalia() {
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
            src="/images/taksh.jpeg"
            alt="Taksh Dhabalia"
            className="hero-image"
          />
          <div className="hero-text">
            <h2>Hi, I'm Taksh Dhabalia</h2>
            <p>A third year student at MIT WPU, Pune. I have worked as an intern at IIIT-D and am the current President of the tech club IRIS. I have also been the vice-lead for innovations and electronics at Team Bolt where we have secured AIR 4 in MOTO STUDENT INDIA - superbike manufacturing and design competition. My current interests are Microcontrollers, Electronics & electrical, Distributed Systems and ML & DL in computer vision.</p>
            <div className="social-links">
              <a href="https://in.linkedin.com/in/taksh-dhabalia-2b6969202" target="_blank" rel="noopener noreferrer"><img src="/images/linkedin.png" alt="LinkedIN" className="icon"></img>LinkedIn</a>
              <a href="https://github.com/TakshDhabalia" target="_blank" rel="noopener noreferrer"><img src="/images/github.png" alt="GitHub" className="icon"></img>GitHub</a>
              <a target="_blank" rel="noopener noreferrer"><img src="/images/gmail.webp" alt="Gmail" className="gmail-icon"></img>taksh.dhabalia@gmail.com</a>
            </div>
            <div className="section-links">
              <a href="#experience">Experience</a>
              <a href="#projects">Projects</a>
              <a href="#skills">Skills</a>
              <a href="#roles-achievements">Roles & Achievements</a>
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
                <p><strong>{project.title}</strong></p>
                <ul>
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
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
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
      <h2>Roles and Achievements</h2>
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
          <h3>Achievements</h3>
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

export default TakshDhabalia;
