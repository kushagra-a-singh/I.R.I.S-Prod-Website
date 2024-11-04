import React from 'react';
import Link from 'next/link'; // Import Link from next/link
import styles from './Projects1.module.css';

const Projects1 = () => {
  return (
    <div className={styles.Projectpage}>
      <main className="container">
        <div className={styles.content}>
          <h1 className={styles.title}>I.R.I.S Club WEBSITE</h1>

          <div className={styles.Aboutwesbite}>
            <h3>ABOUT OUR WEBSITE</h3>
            <p>
              The I.R.I.S. club website is a dynamic platform designed to unite our community of innovators, learners, and leaders. Acting as a central hub, it provides essential information about events, announcements, and achievements while facilitating communication with members, alumni, and external partners. The site not only showcases our events and podcast episodes but also serves as a vital resource for attracting new members and enhancing our visibility on campus.
            </p>
            <p>
              This website consolidates all details about I.R.I.S. for sponsors, partners, teachers, and participants in our workshops and hackathons. It highlights our collective work, including research, projects, and past events, fostering collaboration and engagement. By promoting events and offering seamless registration, the I.R.I.S. website boosts participation and streamlines operations, while connecting members with external groups. Ultimately, it supports our community by providing information and opportunities for involvement in various activities, such as hackathons, seminars, and podcasts.
            </p>
          </div>

          <section className={styles.Timeline}>
            <h3>Project Timeline</h3>
            <p>Day 1: Planning & Setup</p>
            <p>Days 2-7: Frontend Development</p>
            <p>Days 8-13: Backend Development</p>
            <p>Days 14-18: Final Integration</p>
            <p>Days 19-26: Deployment & Final Project</p>
          </section>

          <section className={"websitefeatures"}>
            <h3>Website Features</h3>
            <ol>
              <li>Event Management: Displays upcoming and past events with registration options.</li>
              <li>Podcasts: Showcases podcasts related to events and industry trends.</li>
              <li>Payment Integration: Razorpay gateway for smooth event registrations.</li>
              <li>Responsive Design: Mobile-friendly with Bootstrap-based layout.</li>
              <li>Dynamic Content: Regular updates to reflect the latest activities and members.</li>
            </ol>
          </section>

          <section className={"webtechnologies"}>
            <h3>TECHNOLOGIES</h3>
            <ol>
              <li>React JS (Frontend Development)</li>
              <li>Bootstrap (Frontend Development)</li>
              <li>Razorpay (Payment Gateway)</li>
              <li>Github (Version Control & Collaboration)</li>
              <li>Supabase SQL (Database)</li>
              <li>Vercel (Frontend and Backend deployment)</li>
            </ol>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Projects1;
