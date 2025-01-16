import React, { useEffect } from 'react';
import styles from './About.module.css';
import Image from 'next/image'; 

function About() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const backgroundVideo = '/bgVid.mp4';

  return (
    <div className={styles.aboutUs}>
      <div className={styles.videoBackground}>
        <video autoPlay muted loop>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className={styles.overlay}></div>

      <main className={`${styles.content} py-5`}>
        <div className="container">
          <h1 className={styles.title}>About I.R.I.S</h1>
          <p className={styles.titleDesc}>
            I.R.I.S (Innovation Research & Intelligence Support) is a tech club dedicated to fostering innovation and supporting research in the field of technology.
          </p>
          <div className="row">
            <div className="col-md-6">
              <div className={`${styles.contactInfo} p-4`}>
                <h2>Contact Information</h2>
                <p>Email: iris@mitwpu.edu.in</p>
                <p>Phone: +91 7715958053</p>
                <p>Address: MIT World Peace University, Survey No. 124, Paud Rd, Kothrud, Pune, Maharashtra 411038</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className={`${styles.mission} p-4`}>
                <h2>Our Mission</h2>
                <h4>To provide a platform for tech enthusiasts to:</h4>
                <ul>
                  <li>Collaborate</li>
                  <li>Learn</li>
                  <li>Innovate</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={`${styles.vision} p-4`}>
            <h2>Our Vision</h2>
            <p>To be the leading tech community that drives technological advancements and shapes the future of innovation.</p>
          </div>

          <div className="row">
            <h2>Faculty Mentors</h2>
            <div className="col-md-6">
              <div className={styles.mentor}>
                <Image
                  src="/shamlaMaam.jpeg"
                  alt="Dr. Shamla Mantri"
                  className={styles.mentorImage}
                  width={150}
                  height={150}
                />
                <div className={styles.mentorInfo}>
                  <h3>Dr. Shamla Mantri</h3>
                  <p>Associate Professor</p>
                  <a href="https://scholar.google.com/citations?user=IUUENAMAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
                    View Profile
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className={styles.mentor}>
                <Image
                  src="/yogeshSir.jpg"
                  alt="Dr. Yogesh Kulkarni"
                  className={styles.mentorImage}
                  width={150}
                  height={150}
                />
                <div className={styles.mentorInfo}>
                  <h3>Dr. Yogesh Kulkarni</h3>
                  <p>Assistant Professor</p>
                  <a href="https://scholar.google.com/citations?user=9GsTeoQAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div id="team-members" className={`${styles.teamMembers} p-4`}>
            <h2>Team Members</h2>
            <div className="row">
              {[ 
                { name: "Durgesh Deore", role: "Founder", imgSrc: "/durgesh.jpg", linkedIn: "https://www.linkedin.com/in/durgesh-deore-74a75a281/" },
                { name: "Kavish Jain", role: "Founder", imgSrc: "/kavish.jpeg", linkedIn: "https://www.linkedin.com/in/kavish-jain-38b812247/" },
                { name: "Chinmay Huddar", role: "Founder", imgSrc: "/chinmay.jpg", linkedIn: "https://www.linkedin.com/in/chinmay-huddar-3536761ab/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
                { name: "Raghunandan", role: "Founder", imgSrc: "/logo2.png", linkedIn: "" },
                { name: "Taksh Dhabalia", role: "President", imgSrc: "/taksh.jpeg", linkedIn: "https://www.linkedin.com/in/taksh-dhabalia-2b6969202/" },
                { name: "Samanyu Bhate", role: "Vice President", imgSrc: "/samanyu.jpg", linkedIn: "https://www.linkedin.com/in/samanyu-bhate-17136b1ab/" },
                { name: "Brandon Cerejo", role: "Treasurer", imgSrc: "/Brandon.jpg", linkedIn: "https://www.linkedin.com/in/brandon-cerejo-921275247/" },
                { name: "Grishma Shinde", role: "General Secretary", imgSrc: "/grishma.jpg", linkedIn: "https://www.linkedin.com/in/grishma-shinde-835343294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
                { name: "Kushagra Singh", role: "Technical Head", imgSrc: "/Kush.jpg", linkedIn: "https://www.linkedin.com/in/kushagra-anit-singh/" },
                { name: "Gaganjot Kaur", role: "Tech Project Head", imgSrc: "/gagan.jpg", linkedIn: "https://www.linkedin.com/in/gaganjot-kaur-badwal-4017062a7/" },
                { name: "Purva Rana", role: "Developer", imgSrc: "/Purva.png", linkedIn: "https://www.linkedin.com/in/purva-rana-b231a0253/" },
                { name: "Nishad Dhodapkar", role: "Research Head", imgSrc: "/nishad.jpg", linkedIn: "https://www.linkedin.com/in/nishad-dhodapkar/" },
                { name: "Kaustubha M", role: "Marketing Head", imgSrc: "/kawas.jpeg", linkedIn: "https://www.linkedin.com/in/kawas-nandan/" },
                { name: "Riya Kondawar", role: "Social Media Head", imgSrc: "/Riya.jpg", linkedIn: "https://www.linkedin.com/in/riyakondawar/" },
                { name: "Richa Shukla", role: "Event Operation Head", imgSrc: "/Richa.jpg", linkedIn: "https://www.linkedin.com/in/richa-shukla-026516258/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
                { name: "Parth Ware", role: "Founder", imgSrc: "/Parth.jpg", linkedIn: "https://www.linkedin.com/in/parth-ware-48993324a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
                { name: "Dhyey Ladani", role: "Founder", imgSrc: "/dhyey.jpg", linkedIn: "https://www.linkedin.com/in/dhyey-ladani/" },
                { name: "Sarthak Patil", role: "Founder", imgSrc: "/sarthak.jpeg", linkedIn: "https://www.linkedin.com/in/sarthak-patil-aa453a219/" },
                { name: "Divyansh Pathak", role: "", imgSrc: "/divyansh.jpg", linkedIn: "https://www.linkedin.com/in/divyansh-pathak/" },
                { name: "Siya Shah", role: "", imgSrc: "/sarthak.jpeg", linkedIn: "https://www.linkedin.com/in/sarthak-patil-aa453a219/" },
                { name: "Ayushi", role: "", imgSrc: "/sarthak.jpeg", linkedIn: "https://www.linkedin.com/in/sarthak-patil-aa453a219/" },
                { name: "Anchal", role: "", imgSrc: "/sarthak.jpeg", linkedIn: "https://www.linkedin.com/in/sarthak-patil-aa453a219/" }
              ].map((member, index) => (
                <div key={index} className="col-md-4">
                  <div className={styles.card}>
                    <Image
                      src={member.imgSrc}
                      alt={`${member.name} image`}
                      width={300}
                      height={300}
                    />
                    <div className={styles.cardContent}>
                      <h3>{member.name}</h3>
                      <p>{member.role}</p>
                      <a href={member.linkedIn} className={styles.button} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default About;
