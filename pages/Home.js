import React from 'react';
import Link from 'next/link'; // Import from next/link
import styles from './Home.module.css';
import videoSource from './roboVid.mp4';
import smallPhoto from './sephackathon.jpg';

function Home() {
  const backgroundVideo = '/bgVid.mp4';

  return (
    <div className={styles.home}>
      <video className={styles.backgroundVideo} autoPlay muted loop>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className={styles.overlay}>
        <main className="flex-grow-1">
          {/* Registration Section */}
          {/* Uncomment this section if needed */}
          {/* <div className={`${styles.registration} d-flex align-items-center justify-content-center`}>
            <div className="container text-center">
              <div className="row align-items-center">
                <h2 className={`${styles.registrationTitle} display-4`}>Innovation Hackathon</h2>
                <div className="col-lg-6 text-center text-lg-start">
                  <h2 className={`${styles.registrationDate} display-4`}>September 27-28 2024</h2>
                  <div className={styles.transparentBox}>
                    <Link
                      href="/IRIS Hackathon GUIDELINES for participants.pdf"
                      download="IRIS Hackathon GUIDELINES.pdf"
                      className={`${styles.downloadLink} me-2`}
                    >
                      Innovation Hackathon GUIDELINES
                    </Link>
                    <Link
                      href="/IRIS-ppt-template-for-participants.pptx"
                      download="InnovationHackathon_PPT_Template.pptx"
                      className={styles.downloadLink}
                    >
                      Innovation Hackathon PPT Template
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6 text-center">
                  <img src={smallPhoto} alt="Join Now" className={styles.registrationPhoto} />
                  <Link href="/events/2" className={styles.registerBtn}>
                    Click to Know More
                  </Link>
                  <div className={styles.imageWrapper}>
                    <img
                      src="/bharatgo.png"
                      alt="BharatGo"
                      className={styles.bharatGoImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Hero Section */}
          <div className={`${styles.hero} text-white d-flex align-items-center`} style={{ borderRadius: '10px' }}>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 text-center text-lg-start">
                  <h1 className={`${styles.arial} display-3 fw-bold`} style={{ letterSpacing: '0.1em' }}>I.R.I.S.</h1>
                  <h2 className="lead">Innovation Research & Intelligence Support</h2>
                  <p className="mb-4">Empowering innovation and fostering technological advancements.</p>
                </div>
                <div className="col-lg-6 text-center">
                  <video className={styles.heroVideo} autoPlay loop muted>
                    <source src={videoSource} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.journey} py-5 text-center text-light`}>
            <div className="container">
              <h3 className={styles.journeyTitle}>Join us on the I.R.I.S Journey</h3>
              <div className="row g-4">
                <div className="col-md-4">
                  <div className={`${styles.step} p-4 shadow-sm h-100`}>
                    <h4>Bring Your Idea</h4>
                    <p>Transform your concepts into reality with our supportive community.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={`${styles.step} p-4 shadow-sm h-100`}>
                    <h4>Collaborate and Develop</h4>
                    <p>Work with like-minded individuals to refine and expand your projects.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={`${styles.step} p-4 shadow-sm h-100`}>
                    <h4>Achieve and Launch</h4>
                    <p>Bring your innovations to life and make a lasting impact in the tech world.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
