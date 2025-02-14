import React from 'react';
import styles from './Blog.module.css';
import Image from 'next/image';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

function Blog() {
  const blogPosts = [
    {
      id: 5,
      title: 'CRISPR: Revolutionizing Genetics',
      subtitle: 'Revolutionizing Genetics with Precision and Possibility',
      description: 'CRISPR technology is revolutionizing genetics by enabling precise gene editing, unlocking new possibilities in medicine, agriculture, and biotechnology.',
      author: (
        <>
          <a
            href="https://in.linkedin.com/in/aakanksha-pansare-43744a350"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.authorLink}
          > 
            Aakanksha Pansare
          </a> {' '} &
          <span className={styles.authorLink}> Nishtha</span> {/* Use plain text if no link */}
        </>
      ),
      date: 'February 16, 2025',
      image: '/crispr-img.png',
      imageWidth: 500,
      imageHeight: 300,
    },
    {
      id: 3,
      title: 'Application of Nanotechnology in Defence Sector ',
      subtitle: 'Revolutionizing Defense: The Power of Nanotechnology in Military Advancements',
      description: 'Nanotechnology is revolutionizing defense with advanced armor, medical care, and stealth technology.',
      author: (
        <a
          href="https://www.linkedin.com/in/shreya-more-284869321/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.authorLink}
        >
          Shreya More
        </a>
      ),
      date: 'February 15, 2025',
      image: '/nanotech3.png',
      imageWidth: 500,
      imageHeight: 300,
    },
    {
      id: 4,
      title: 'Traditional Algorithms vs. Machine Learning',
      subtitle: 'A comprehensive dive into the definition, use cases, efficiency, positives and negatives',
      description: 'A comprehensive dive into the definition, use cases, efficiency, positives and negatives',
      author: (
        <a
          href="https://www.linkedin.com/in/aaryan-kumbhare-07428032a"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.authorLink}
        >
          Aaryan Kumbhare
        </a>
      ),
      date: 'February 12, 2025',
      image: '/ai.png',
      imageWidth: 400,
      imageHeight: 300,
    },
    {
      id: 2,
      title: 'Almost a Data Loss: The Security Breach We Overcame',
      subtitle: 'An Inside Look at the Security Flaw That Nearly Wiped Our Data',
      description: 'Our journey in building a platform for collaboration, hackathon management and seamless user experience.',
      author: (
        <a
          href="https://www.linkedin.com/in/aaryan-kumbhare-07428032a"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.authorLink}
        >
          Aaryan Kumbhare
        </a>
      ),
      date: 'November 18, 2024',
      image: '/db.jpg',
      imageWidth: 500,
      imageHeight: 300,
    },
    {
      id: 1,
      title: 'TARZAN: Revolutionizing Autonomous Vehicle Navigation',
      subtitle: 'Advanced Pothole Detection System',
      description: 'An innovative system using computer vision to enhance autonomous vehicle control.',
      author: (
        <a
          href="https://www.linkedin.com/in/aaryan-kumbhare-07428032a"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.authorLink}
        >
          Aaryan Kumbhare
        </a>
      ),
      date: 'November 10, 2024',
      image: '/simulation.jpg',
      imageWidth: 500,
      imageHeight: 300,
    },
  ];

  const postLinks = {
    1: "tarzan",
    2: "data-loss",
    3: "nanotech-application",
    4: "traditional-algo",
    5: "crispr",
  };

  return (
    <div className={styles.blogPage}>
      <div className="container py-5">
        <h1 className={styles.pageTitle}>Our Blog</h1>
        <p className={styles.pageSubtitle}>
          I.R.I.S. recent developments and ongoing projects.
        </p>
        <div style={{ justifyContent: 'center' }} className="row py-5">
          {blogPosts.map((post) => (
            <div key={post.id} className="col-md-4">
              <div className={styles.blogCard}>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={post.imageWidth}
                  height={post.imageHeight}
                  className={styles.blogImage}
                />
                <div className={styles.blogContent}>
                  <h3 className={styles.blogTitle}>{post.title}</h3>
                  <p className={styles.blogDescription}>{post.description}</p>
                  <div className={styles.blogMeta}>
                    <span>By {post.author}</span> | <span>{post.date}</span>
                    <div style={{ marginTop: '5px' }}>
                      Guided by mentors{' '}
                      <a
                        href="https://scholar.google.com/citations?user=IUUENAMAAAAJ&hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.authorLink}
                      >
                        Dr. Shamla Mantri
                      </a>{' '}
                      & <br />
                      <a
                        href="https://scholar.google.com/citations?user=9GsTeoQAAAAJ&hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.authorLink}
                      >
                        Dr. Yogesh Kulkarni
                      </a>
                    </div>
                  </div>
                  <Link href={`/blog/${postLinks[post.id] || "default-blog"}`} passHref legacyBehavior>
                    <button className={styles.readMoreButton} style={{ width: "100%", textAlign: "center" }}>
                        Read More
                    </button>
                  </Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
