import React from 'react';
import Link from 'next/link';
import styles from './Projects1.module.css';

const Projects1 = () => {
  return (
    <div className={styles.projects1}>
      <main className="container">
        <div className={styles.content}>
          <h1 className={styles.title}>I.R.I.S. Club Website</h1>

          <div className={styles.aboutwebsite}>
            <h3>ABOUT OUR WEBSITE</h3>
            <p>
              The I.R.I.S. club website is a dynamic platform designed to unite our community of innovators, learners, and leaders. Acting as a central hub, it provides essential information about events, announcements, and achievements while facilitating communication with members, alumni, and external partners. The site not only showcases our events and podcast episodes but also serves as a vital resource for attracting new members and enhancing our visibility on campus.
            </p>
            <p>
              This website consolidates all details about I.R.I.S. for sponsors, partners, teachers, and participants in our workshops and hackathons. It highlights our collective work, including research, projects, and past events, fostering collaboration and engagement. By promoting events and offering seamless registration, the I.R.I.S. website boosts participation and streamlines operations, while connecting members with external groups. Ultimately, it supports our community by providing information and opportunities for involvement in various activities, such as hackathons, seminars, and podcasts.
            </p>
          </div>

          <section className={styles.websitefeatures}>
            <h3>WEBSITE FEATURES</h3>
            <ol>
              <li>Event Management: Displays upcoming and past events with registration options.</li>
              <li>Podcasts: Showcases podcasts related to events and industry trends.</li>
              <li>Payment Integration: Razorpay gateway for smooth event registrations.</li>
              <li>Responsive Design: Mobile-friendly with Bootstrap-based layout.</li>
              <li>Dynamic Content: Regular updates to reflect the latest activities and members.</li>
            </ol>
          </section>

          <section className={styles.webtechnologies}>
            <h3>PLAN & RESEARCH</h3>

            <p>Our team planned intensively in order to make sure a smooth development process for the website. Our team held multiple meetings spanned across a few weeks to finalize the plan and to research.</p>

            <h3>DEVELOPMENT</h3>
            <p>The development was done by using multiple technologies which were:</p>
            <ol>
              <li>React JS: React JS is the library on which I.R.I.S’s website is made. </li>
              <li>Bootstrap: Bootstrap is a very popular CSS framework that we used to make I.R.I.S Website more responsive in multiple types of screens and displays.
              </li>
              <li>Razorpay: Razorpay is a payment gateway API which is used to handle online payments for the hackathon and our future ventures and events.
              </li>
              <li>Github: Github is an industry standard service used for version controlling and collaboration. Our team used github throughout the production phase to collaborate with everyone</li>
              <li>Supabase SQL: Supabase SQL is a powerful database which is highly scalable & secure. We use it to store the data of our users securely.
              </li>
            </ol>

            <h3>DEPLOYMENT</h3>
            <p>We have used Vercel to deploy frontend because of their easy deployment and seamless integration with github.
            </p>
          </section>
          <section className={styles.projectRegistration}>
            <h3>Stay Connected 📩</h3>
            <p>If you&apos;re interested in participating in this project or have any questions, feel free to reach out to us!</p>
            <Link href="/recruitments" className={styles.registerBtn}>
              Recruitment form
            </Link>

          </section>
          <section className={styles.githublink}>
          <h2> Project Github Link</h2>
          <a href= "https://github.com/IRIS-MITWPU/I.R.I.S-Prod-Website" > Project Repository</a>
            
          </section>

        </div>
      </main>
    </div>
  );
};

export default Projects1;
