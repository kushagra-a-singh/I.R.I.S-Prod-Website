import React from 'react';
import Link from 'next/link';
import styles from './Blog.module.css'; // Adjust path if needed

function Blog2() {
  return (
    <div className={styles.blogPage}>
      <main className={`${styles.mainContent} container`}>
        <h1 className={styles.headerTitle}>Almost a Data Loss: The Security Breach We Overcame</h1>
        <p className={styles.subtitle}>An Inside Look at the Security Flaw That Nearly Wiped Our Data</p>

        <img src="/db.jpg" alt="Database Security" className={styles.blogImage} />

        <p className={styles.blogText}>
          Our journey in building a platform for collaboration, hackathon management, and seamless user experience while overcoming a near-catastrophic security breach.
        </p>

        <Link href="/blogs" className="btn btn-primary">Back to Blogs</Link>
      </main>
    </div>
  );
}

export default Blog2;
