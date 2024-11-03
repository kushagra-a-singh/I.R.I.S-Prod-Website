import React, { useEffect } from 'react';
import styles from './About.module.css';
import backgroundVideo from './vid2.mp4';

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

  return (
    <div className={styles.aboutUs}>
      <div className={styles.videoBackground}>
        <video autoPlay muted loop>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className={styles.overlay}></div>

      <main className={styles.content + ' py-5'}>
        <div className="container">
          <h1 className={styles.title}>About I.R.I.S</h1>
          <p className={styles.titleDesc}>I.R.I.S (Innovation Research & Intelligence Support) is a tech club dedicated to fostering innovation and supporting research in the field of technology.</p>
          <div className="row">
            <div className="col-md-6">
              <div className={styles.contactInfo + ' p-4'}>
                <h2>Contact Information</h2>
                <p>Email: iris@mitwpu.edu.in</p>
                <p>Phone: +91 7715958053</p>
                <p>Address: MIT World Peace University Survey No, 124, Paud Rd, Kothrud, Pune, Maharashtra 411038</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className={styles.mission + ' p-4'}>
                <h2>Our Mission</h2>
                <h4>To provide a platform for tech enthusiasts to:</h4>
                <h5>* Collaborate</h5>
                <h5>* Learn</h5>
                <h5>* Innovate</h5>
              </div>
            </div>
          </div>
          <div className={styles.vision + ' p-4'}>
            <h2>Our Vision</h2>
            <p>To be the leading tech community that drives technological advancements and shapes the future of innovation.</p>
          </div>
          <div className="row">
          <h2>Faculty Mentors</h2>
            <div className="col-md-6">
              {/* Faculty Mentor 1 */}
              <div className={styles.mentor}>
                <img src="shamlaMaam.jpeg" alt="Shamla Mantri" className={styles.mentorImage} />
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
              {/* Faculty Mentor 2 */}
              <div className={styles.mentor}>
                <img src="yogeshSir.jpg" alt="Dr.Yogesh Kulkarni" className={styles.mentorImage} />
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
          <div id="team-members" className={styles.teamMembers + ' p-4'}>
            <h2>Team Members</h2>
            <div className="row">

              {/* FOUNDING MEMBER */}
              <div className="col-md-4">
                <div className={styles.card}>
                  <img src="durgesh.jpg" alt="Team Member 3" />
                  <div className={styles.cardContent}>
                    <h3>Durgesh Deore</h3>
                    <p>Founder</p>
                    <a href="https://www.linkedin.com/in/durgesh-deore-74a75a281/" className={styles.button} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                </div>
              </div>
              {/* FOUNDING MEMBER */}
              <div className="col-md-4">
                <div className={styles.card}>
                  <img src="kavish.jpeg" alt="Team Member 3" />
                  <div className={styles.cardContent}>
                    <h3>Kavish Jain</h3>
                    <p>Founder</p>
                    <a href="https://www.linkedin.com/in/kavish-jain-38b812247/" className={styles.button} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                </div>
              </div>
              {/* FOUNDING MEMBER */}
              <div className="col-md-4">
                <div className={styles.card}>
                  <img src="chinmay.jpg" alt="Team Member 3" />
                  <div className={styles.cardContent}>
                    <h3>Chinmay Huddar</h3>
                    <p>Founder</p>
                    <a href="https://www.linkedin.com/in/chinmay-huddar-3536761ab/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className={styles.button} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                </div>
              </div>
              {/* FOUNDING MEMBER */}
              <div className="col-md-4">
                <div className={styles.card}>
                  <img src="logo2.png" alt="Team Member 3" />
                  <div className={styles.cardContent}>
                    <h3>Raghunandan</h3>
                    <p>Founder</p>
                    <a href="" className={styles.button} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                </div>
              </div>
              {/* President */}
              <div className="col-md-4">
                <div className={styles.card}>
                  <img src="taksh.jpeg" alt="Team Member 1" />
                  <div className={styles.cardContent}>
                    <h3>Taksh Dhabalia</h3>
                    <p>President</p>
                    <a href="https://www.linkedin.com/in/taksh-dhabalia-2b6969202/" className={styles.button} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                </div>
              </div>
              {/* Vice President */}
              <div className="col-md-4">
                <div className={styles.card}>
                  <img src="samanyu.jpg" alt="Team Member 2" />
                  <div className={styles.cardContent}>
                    <h3>Samanyu Bhate</h3>
                    <p>Vice President </p>
                    <a href="https://www.linkedin.com/in/samanyu-bhate-17136b1ab/" className={styles.button} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                </div>
              </div>
              {/* TREASURER */}
              <div className="col-md-4">
                <div className={styles.card}>
                  <img src="Brandon.jpg" alt="Team Member 3" />
                  <div className={styles.cardContent}>
                    <h3>Brandon Cerejo</h3>
                    <p>Treasurer</p>
                    <a href="https://www.linkedin.com/in/brandon-cerejo-921275247/" className={styles.button} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                </div>
              </div>
              {/* GS */}
              <div className="col-md-4">
                <div className={styles.card}>
                  <img src="grishma.jpg" alt="Team Member 4" />
                  <div className={styles.cardContent}>
                    <h3>Grishma Shinde</h3>
                    <p>General Secretary</p>
                    <a href="https://www.linkedin.com/in/grishma-shinde-835343294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className={styles.button} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                </div>
              </div>
              {/* TECH TEAM */}
              <div className="col-md-4">
                <div className={styles.card}>
                  <img src="Kush.jpg" alt="Team Member 5" />
                  <div className={styles.cardContent}>
                    <h3>Kushagra Singh</h3>
                    <p>Technical Head</p>
                    <a href="https://www.linkedin.com/in/kushagra-anit-singh/" className={styles.button} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                </div>
              </div>
              {/* TECH TEAM */}
              <div className="col-md-4">
                <div className={styles.card}>
                  <img src="gagan.jpg" alt="Team Member 5" />
                  <div className={styles.cardContent}>
                    <h3>Gaganjot Kaur</h3>
                    <p>Tech Project Head</p>
                    <a href="https://www.linkedin.com/in/gaganjot-kaur-badwal-4017062a7/" className={styles.button} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                </div>
              </div>
              {/*  TECH TEAM  */}
              <div className="col-md-4">
                <div className={styles.card}>
                  <img src="Purva.png" alt="Team Member 5" />
                  <div className={styles.cardContent}>
                    <h3>Purva Rana</h3>
                    <p>Developer</p>
                    <a href="https://www.linkedin.com/in/purva-rana-b231a0253/" className={styles.button} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                </div>
              </div>
              {/*  RESEARCH HEAD  */}
              <div className="col-md-4">
                <div className={styles.card}>
                  <img src="nishad.jpg" alt="Team Member 5" />
                  <div className={styles.cardContent}>
                    <h3>Nishad Dhodapkar</h3>
                    <p>Research Head</p>
                    <a href="https://www.linkedin.com/in/nishad-dhodapkar/" className={styles.button} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                </div>
              </div>
              {/* NON-TECH HEAD  */}
              <div className="col-md-4">
                <div className={styles.card}>
                  <img src="kawas.jpeg" alt="Team Member 5" />
                  <div className={styles.cardContent}>
                    <h3> Kaustubha M</h3>
                    <p>Marketing Head</p>
                    <a href="https://www.linkedin.com/in/kawas-nandan/" className={styles.button} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                </div>
              </div>
              {/* NON-TECH HEAD  */}
              <div className="col-md-4">
                <div className={styles.card}>
                  <img src="Riya.jpg" alt="Team Member 5" />
                  <div className={styles.cardContent}>
                    <h3>Riya Kondawar</h3>
                    <p>Social Media Head</p>
                    <a href="https://www.linkedin.com/in/riyakondawar/" className={styles.button} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                </div>
              </div>
              {/* NON-TECH HEAD  */}
              <div className="col-md-4">
                <div className={styles.card}>
                  <img src="Richa.jpg" alt="Team Member 5" />
                  <div className={styles.cardContent}>
                    <h3>Richa Shukla</h3>
                    <p>Event Operation Head</p>
                    <a href="https://www.linkedin.com/in/richa-shukla-026516258/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className={styles.button} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                </div>
              </div>
              {/* FOUNDING MEMBER */}
              <div className="col-md-4">
                <div className={styles.card}>
                  <img src="Parth.jpg" alt="Team Member 6" />
                  <div className={styles.cardContent}>
                    <h3>Parth Ware</h3>
                    <p>Founder</p>
                    <a href="https://www.linkedin.com/in/parth-ware-48993324a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className={styles.button} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                </div>
              </div>
              {/* FOUNDING MEMBER */}
              <div className="col-md-4">
                <div className={styles.card}>
                  <img src="dhyey.jpg" alt="Team Member 7" />
                  <div className={styles.cardContent}>
                    <h3>Dhyey Ladani</h3>
                    <p>Founder</p>
                    <a href="https://www.linkedin.com/in/dhyey-ladani/" className={styles.button} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                </div>
              </div>
              {/* FOUNDING MEMBER */}
              <div className="col-md-4">
                <div className={styles.card}>
                  <img src="sarthak.jpeg" alt="Team Member 8" />
                  <div className={styles.cardContent}>
                    <h3>Sarthak Patil</h3>
                    <p>Founder</p>
                    <a href="https://www.linkedin.com/in/sarthak-patil-aa453a219/" className={styles.button} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}

export default About;
