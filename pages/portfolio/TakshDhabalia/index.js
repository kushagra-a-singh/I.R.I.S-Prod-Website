import React, { useState } from 'react';
import styles from './TakshDhabalia.module.css';
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
    { name: 'LoRaWAN', logo: '/images/lora.png' },
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
    image: '/music.jpeg'
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
            src="/images/taksh.jpeg"
            alt="Taksh"
            className={styles.heroimage}
            width={200}
            height={200}
          />
          <div className={styles.herotext}>
            <h2>Hi, I&apos;m Taksh Dhabalia</h2>
            <p>A third year student at MIT WPU, Pune. I have worked as an intern at IIIT-D and am the current President of the tech club IRIS. I have also been the vice-lead for innovations and electronics at Team Bolt where we have secured AIR 4 in MOTO STUDENT INDIA - superbike manufacturing and design competition. My current interests are Microcontrollers, Electronics & electrical, Distributed Systems and ML & DL in computer vision.</p>
            <div className={styles.sociallinks}>
              <a href="https://in.linkedin.com/in/taksh-dhabalia-2b6969202" target="_blank" rel="noopener noreferrer">
                <Image src="/images/linkedin.png" alt="LinkedIn" width={24} height={24} className={styles.icon} />
                LinkedIn
              </a>
              <a href="https://github.com/TakshDhabalia" target="_blank" rel="noopener noreferrer">
                <Image src="/images/github.png" alt="GitHub" width={24} height={24} className={styles.icon} />
                GitHub
              </a>
              <a target="_blank" rel="noopener noreferrer">
                <Image src="/images/gmail.png" alt="Gmail" width={24} height={24} className={styles.gmailicon} />
                taksh.dhabalia@gmail.com
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
                {exp.company === 'Team Bolt' && (
                  <div className={styles.extraImages}>
                    <Image
                      src="/bolt1.jpg"
                      alt="Team Bolt Work 1"
                      width={200}
                      height={150}
                      className={styles.extraImage}
                    />
                    <Image
                      src="/bolt2.jpg"
                      alt="Team Bolt Work 2"
                      width={200}
                      height={150}
                      className={styles.extraImage}
                    />
                    <Image
                      src="/bolt3.jpg"
                      alt="Team Bolt Work 3"
                      width={200}
                      height={150}
                      className={styles.extraImage}
                    />
                    <Image
                      src="/bolt4.jpg"
                      alt="Team Bolt Work 4"
                      width={200}
                      height={150}
                      className={styles.extraImage}
                    />
                    {/* Add more images as needed */}
                  </div>
                )}
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

export default TakshDhabalia;