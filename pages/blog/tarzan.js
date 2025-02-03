import React from 'react';
import Link from 'next/link';
import styles from './Blog.module.css'; // Adjust path if needed

function Blog1() {
  return (
    <div className={styles.blogPage}>
      <main className={`${styles.mainContent} container`}>
        <h1 className={styles.headerTitle}>TARZAN: Revolutionizing Autonomous Vehicle Navigation</h1>
        <p className={styles.subtitle}>Advanced Pothole Detection System</p>

        <img src="/simulation.jpg" alt="Blog Image" className={styles.blogImage} />

        <p className={styles.blogText}>
          This innovative system uses computer vision and deep learning techniques to enhance autonomous vehicle control.
          The system detects potholes in real-time, ensuring safer and smoother driving experiences.
        </p>

        <Link href="/blogs" className="btn btn-primary">Back to Blogs</Link>
      </main>
    </div>
  );
}

export default Blog1;
