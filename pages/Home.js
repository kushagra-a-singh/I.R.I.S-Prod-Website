// import React from 'react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';

function Home() {
  const section1 = [
    {
      title: "TARZAN",
      description: "Revolutionizing Autonomous Vehicle Navigation.\nAn innovative system using computer vision to enhance autonomous vehicle control.",
      link: "/blog",
      image: "/systemDiagMATLAB.jpg",
    },
    {
      title: "Security Breach We Overcame",
      description: "Our journey in building a platform for collaboration, hackathon management and seamless user experience.",
      link: "/blog",
      image: "/db.jpg",
    },
  ];

  const section2 = [
    {
      title: "I.R.I.S. Innovation Hackathon 2024",
      description: "Held on: 9/28/2024",
      link: "/events",
      image: "/sephackathon.jpg",
    },
    {
      title: "Innovation Hackathon",
      description: "Held on: 2/15/2024",
      link: "/events",
      image: "/past-innovation-hackathon.jpg",
    },
  ];

  const section3 = [
    {
      title: "Club Website",
      description: "A dynamic platform designed to unite our community of innovators, learners, and leaders.",
      link: "/Projects",
      image: "/website_img.png",
    },
    {
      title: "Autonomous Vehicle",
      description: "Tarzan is an innovative, leading-edge autonomous vehicle control system integrating the application of computer vision into vehicular communications.",
      link: "/Projects",
      image: "public/simulation.jpg",
    },
  ];

  const [SectionIndex1, setSectionIndex1] = useState(0);
  const [SectionIndex2, setSectionIndex2] = useState(0);
  const [SectionIndex3, setSectionIndex3] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSectionIndex1((prevIndex) => (prevIndex + 1) % section1.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [section1.length]);
  useEffect(() => {
    const interval = setInterval(() => {
      setSectionIndex2((prevIndex) =>
        (prevIndex + 1) % section2.length
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [section2.length]);
  useEffect(() => {
    const interval = setInterval(() => {
      setSectionIndex3((prevIndex) => (prevIndex + 1) % section3.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [section3.length]);



  const handlePrev1 = () => {
    setSectionIndex1((prevIndex) =>
      prevIndex === 0 ? section1.length - 1 : prevIndex - 1
    );
  };
  const handleNext1 = () => {
    setSectionIndex1((prevIndex) => (prevIndex + 1) % section1.length);
  };

  const handlePrev2 = () => {
    setSectionIndex2((prevIndex) =>
      prevIndex === 0 ? section2.length - 1 : prevIndex - 1
    );
  };
  const handleNext2 = () => {
    setSectionIndex2((prevIndex) =>
      (prevIndex + 1) % section2.length
    );
  };

  const handlePrev3 = () => {
    setSectionIndex3((prevIndex) =>
      prevIndex === 0 ? section3.length - 1 : prevIndex - 1
    );
  };
  const handleNext3 = () => {
    setSectionIndex3((prevIndex) =>
      (prevIndex + 1) % section3.length
    );
  };


  return (
    <div className={styles.home}>
      <video className={styles.backgroundVideo} autoPlay muted loop>
        <source
          src="https://rkvbuqdjkilvqlywzjsi.supabase.co/storage/v1/object/sign/AboutPhotos/Videos/vid2.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBYm91dFBob3Rvcy9WaWRlb3MvdmlkMi5tcDQiLCJpYXQiOjE3MzA5MDA1MDcsImV4cCI6MTc2MjQzNjUwN30.qMfRi7Uxvtpz4rRnaN6bTSQzEE_AtxrRQMBp2qR5YEI&t=2024-11-06T13%3A41%3A48.487Z"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className={styles.overlay}>
        <main className="flex-grow-1">
          {/* Hero Section */}
          <div
            className={`${styles.hero} text-white d-flex align-items-center`}
            style={{ borderRadius: '20px' }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 text-center text-lg-start">
                  <h1
                    className={`${styles.arial} display-3 fw-bold`}
                    style={{ letterSpacing: '0.1em' }}
                  >
                    I.R.I.S.
                  </h1>
                  <h2 className="lead">
                    Innovation Research & Intelligence Support
                  </h2>
                  <p className="mb-4">
                    Empowering innovation and fostering technological
                    advancements.
                  </p>
                </div>
                <div className="col-lg-6 text-center">
                  <video className={styles.heroVideo} autoPlay loop muted>
                    <source
                      src="https://rkvbuqdjkilvqlywzjsi.supabase.co/storage/v1/object/sign/AboutPhotos/Videos/vid1.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBYm91dFBob3Rvcy9WaWRlb3MvdmlkMS5tcDQiLCJpYXQiOjE3MzA4OTk4MjMsImV4cCI6MTc2MjQzNTgyM30.C_yjMhQfYEszRhFBj9DrlK3rUF4-ugkIRdR7t4vkXkU&t=2024-11-06T13%3A30%3A24.685Z"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>

          {/* Journey Section */}
          <div
            className={`${styles.journey} py-5 text-center text-light`}
          >
            <div className="container">
              <h3 className={styles.journeyTitle}>
                Join us on the I.R.I.S. Journey
              </h3>
              <div className="row g-4">
                <div className="col-md-4">
                  <div className={`${styles.step} p-4 shadow-sm h-100`}>
                    <h4>Bring Your Idea</h4>
                    <p>
                      Transform your concepts into reality with our supportive
                      community.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={`${styles.step} p-4 shadow-sm h-100`}>
                    <h4>Collaborate and Develop</h4>
                    <p>
                      Work with like-minded individuals to refine and expand
                      your projects.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={`${styles.step} p-4 shadow-sm h-100`}>
                    <h4>Achieve and Launch</h4>
                    <p>
                      Bring your innovations to life and make a lasting impact
                      in the tech world.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sliding section 1 */}
          <h3 className={`${styles.journeyTitle} ${styles.projectsTitle}`}>
            Projects
          </h3>
          <div
            className={`${styles.newSectionContainer} d-flex align-items-center`}
            style={{
              margin: '30px 0',
              borderRadius: '20px',
              background: 'linear-gradient(to right, rgba(23, 37, 90, 0.8), rgba(201, 64, 101, 0.8))',
              position: 'relative',
              color: '#fff',
              padding: '20px',
            }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 text-center text-lg-start">
                  <h2 className="display-4 fw-bold">
                    {section3[SectionIndex3].title}
                  </h2>
                  <p className="mb-4">
                    {section3[SectionIndex3].description}
                  </p>
                  <Link
                    href={section3[SectionIndex3].link}
                    className={styles.knowMoreBtn}
                  >
                    Know More
                  </Link>
                </div>
                <div className="col-lg-6 text-center">
                  <img
                    src={section3[SectionIndex3].image}
                    alt={section3[SectionIndex3].title}
                    className={styles.newSectionImage}
                  />
                </div>
              </div>
            </div>

            {/* Arrows 1 */}
            <button
              onClick={handlePrev3}
              className={`${styles.arrow} ${styles.leftArrow}`}
            >
              &#8249;
            </button>
            <button
              onClick={handleNext3}
              className={`${styles.arrow} ${styles.rightArrow}`}
            >
              &#8250;
            </button>
          </div>

          {/* Sliding section 2 */}
          <h3 className={`${styles.journeyTitle} ${styles.eventsTitle}`}>
            Events
          </h3>
          <div
            className={`${styles.newSectionContainer} d-flex align-items-center`}
            style={{
              margin: '30px 0',
              borderRadius: '20px',
              background: 'linear-gradient(to right, rgba(23, 37, 90, 0.8), rgba(201, 64, 101, 0.8))',
              position: 'relative',
              color: '#fff',
              padding: '20px',
            }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 text-center text-lg-start">
                  <h2 className="display-4 fw-bold">
                    {section2[SectionIndex2].title}
                  </h2>
                  <p className="mb-4">
                    {section2[SectionIndex2].description}
                  </p>
                  <Link
                    href={section2[SectionIndex2].link}
                    className={styles.knowMoreBtn}
                  >
                    Know More
                  </Link>
                </div>
                <div className="col-lg-6 text-center">
                  <img
                    src={section2[SectionIndex2].image}
                    alt={section2[SectionIndex2].title}
                    className={styles.newSectionImage}
                  />
                </div>
              </div>
            </div>

            {/* Arrows 2*/}
            <button
              onClick={handlePrev2}
              className={`${styles.arrow} ${styles.leftArrow}`}
            >
              &#8249;
            </button>
            <button
              onClick={handleNext2}
              className={`${styles.arrow} ${styles.rightArrow}`}
            >
              &#8250;
            </button>
          </div>

          {/* Sliding section 3 */}
          <h3 className={`${styles.journeyTitle} ${styles.blogsTitle}`}>
            Blogs
          </h3>
          <div
            className={`${styles.newSectionContainer} d-flex align-items-center`}
            style={{
              margin: '30px 0',
              borderRadius: '20px',
              background: 'linear-gradient(to right, rgba(23, 37, 90, 0.8), rgba(201, 64, 101, 0.8))',
              position: 'relative',
              color: '#fff',
              padding: '20px',
            }}
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 text-center text-lg-start">
                  <h2 className="display-4 fw-bold">
                    {section1[SectionIndex1].title}
                  </h2>
                  <p className="mb-4">
                    {section1[SectionIndex1].description}
                  </p>
                  <Link
                    href={section1[SectionIndex1].link}
                    className={styles.knowMoreBtn}
                  >
                    Know More
                  </Link>
                </div>
                <div className="col-lg-6 text-center">
                  <img
                    src={section1[SectionIndex1].image}
                    alt={section1[SectionIndex1].title}
                    className={styles.newSectionImage}
                  />
                </div>
              </div>
            </div>

            {/* Arrows 3*/}
            <button
              onClick={handlePrev1}
              className={`${styles.arrow} ${styles.leftArrow}`}
            >
              &#8249;
            </button>
            <button
              onClick={handleNext1}
              className={`${styles.arrow} ${styles.rightArrow}`}
            >
              &#8250;
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}

export default Home;
