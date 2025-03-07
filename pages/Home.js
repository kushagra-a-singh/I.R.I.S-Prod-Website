// import React from 'react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

function Home() {
  // Create separate refs and inView flags for each container
  const {
    ref: refProjects,
    inView: inViewProjects
  } = useInView({ triggerOnce: true, threshold: 0.5 });

  const {
    ref: refEvents,
    inView: inViewEvents
  } = useInView({ triggerOnce: true, threshold: 0.5 });

  const {
    ref: refBlogs,
    inView: inViewBlogs
  } = useInView({ triggerOnce: true, threshold: 0.5 });``

  // Remove the scroll listener that queried all elements at once.
  // Each container now has its own Intersection Observer reference.

  const section1 = [
    {
      title: "TARZAN",
      description: "Revolutionizing Autonomous Vehicle Navigation.\nAn innovative system using computer vision to enhance autonomous vehicle control.",
      link: "/blog",
      image: "/simulation.jpg",
    },
    {
      title: "Security Breach We Overcame",
      description: "Our journey in building a platform for collaboration, hackathon management and seamless user experience.",
      link: "/blog",
      image: "/db.jpg",
    },
    {
      title: "CRISPR: Revolutionizing Genetics",
      description: "CRISPR technology is revolutionizing genetics by enabling precise gene editing, unlocking new possibilities in medicine, agriculture, and biotechnology.",
      link: "/blog",
      image: "/crispr-img.png",
    },
    {
      title: "Application of Nanotechnology in Defence Sector",
      description: "Revolutionizing Defense: The Power of Nanotechnology in Military Advancements.",
      link: "/blog",
      image: "/nanotech3.png",
    },
    {
      title: "Traditional Algorithms vs. Machine Learning",
      description: "A comprehensive dive into the definition, use cases, efficiency, positives and negatives.",
      link: "/blog",
      image: "/ai.png",
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
    {
      title: "I.R.I.S. Ice Breaker 2025",
      description: "Held on: 1/24/2025",
      link: "/events",
      image: "/icebreaker.jpeg",
    }
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
      image: "/simulation.jpg",
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
      setSectionIndex2((prevIndex) => (prevIndex + 1) % section2.length);
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
    setSectionIndex2((prevIndex) => (prevIndex + 1) % section2.length);
  };

  const handlePrev3 = () => {
    setSectionIndex3((prevIndex) =>
      prevIndex === 0 ? section3.length - 1 : prevIndex - 1
    );
  };
  const handleNext3 = () => {
    setSectionIndex3((prevIndex) => (prevIndex + 1) % section3.length);
  };

  return (
    <div className={styles.home}>
      <video className={styles.backgroundVideo} autoPlay muted loop>
        <source src="/bgVid.webm" type="video/webm" />
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
              <div className="row align-items-center ">
                <div className="col-lg-6 text-center text-lg-start">
                  <h1
                    className={`${styles.arial} display-3 fw-bold`}
                    style={{ letterSpacing: '0.1em', textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
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
                      src="/roboVid.webm"
                      type="video/webm"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>

          {/* Journey Section */}
          <div className={`${styles.journey} py-5 text-center text-light`}>
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

          {/* Sliding section 1 (Projects) */}
          <h3 className={`${styles.journeyTitle} ${styles.projectsTitle}`}>
            Projects
          </h3>
          <div
            className={`
              ${styles.newSectionContainer} 
              d-flex 
              align-items-center 
              ${inViewProjects ? styles.animate : ''}
            `}
            style={{
              margin: '30px 0',
              borderRadius: '20px',
              background: 'linear-gradient(to right, rgba(23, 37, 90, 0.8), rgba(201, 64, 101, 0.8))',
              position: 'relative',
              color: '#fff',
              padding: '20px',
            }}
            ref={refProjects} // Use the 'refProjects' for Projects
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
                  <Image
                    src={section3[SectionIndex3].image}
                    alt={section3[SectionIndex3].title}
                    width={400}
                    height={300}
                    className={styles.newSectionImage}
                  />
                </div>
              </div>
            </div>
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

          {/* Sliding section 2 (Events) */}
          <h3 className={`${styles.journeyTitle} ${styles.eventsTitle}`}>
            Events
          </h3>
          <div
            className={`
              ${styles.newSectionContainer} 
              d-flex 
              align-items-center 
              ${inViewEvents ? styles.animate : ''}
            `}
            style={{
              margin: '30px 0',
              borderRadius: '20px',
              background: 'linear-gradient(to right, rgba(23, 37, 90, 0.8), rgba(201, 64, 101, 0.8))',
              position: 'relative',
              color: '#fff',
              padding: '20px',
            }}
            ref={refEvents} // Use the 'refEvents' for Events
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
                  <Image
                    src={section2[SectionIndex2].image}
                    alt={section2[SectionIndex2].title}
                    width={400}
                    height={300}
                    className={styles.newSectionImage}
                  />
                </div>
              </div>
            </div>
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

          {/* Sliding section 3 (Blogs) */}
          <h3 className={`${styles.journeyTitle} ${styles.blogsTitle}`}>
            Blogs
          </h3>
          <div
            className={`
              ${styles.newSectionContainer} 
              d-flex 
              align-items-center 
              ${inViewBlogs ? styles.animate : ''}
            `}
            style={{
              margin: '30px 0',
              borderRadius: '20px',
              background: 'linear-gradient(to right, rgba(23, 37, 90, 0.8), rgba(201, 64, 101, 0.8))',
              position: 'relative',
              color: '#fff',
              padding: '20px',
            }}
            ref={refBlogs} // Use the 'refBlogs' for Blogs
          >
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 text-center text-lg-start">
                  <h2 className="display-4 fw-bold" style={{fontSize: '2rem'}}>
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
                  <Image
                    src={section1[SectionIndex1].image}
                    alt={section1[SectionIndex1].title}
                    width={400}
                    height={300}
                    className={styles.newSectionImage}
                  />
                </div>
              </div>
            </div>
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