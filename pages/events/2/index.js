import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './event2.module.css';

const Event2 = () => {
  return (
    <>
      <div className={styles.eventPage}>
        <div className={styles.overlay}></div>
        <main className="container">
          <div className={styles.content}>
            <div className={styles.eventImageContainer}>
              <Image
                src="/sephackathon.jpg"
                alt="IRIS Innovation Hackathon 2024"
                className={styles.eventImage}
                width={800}
                height={500} 
              />
            </div>
            <h1 className={styles.title}>🚀 IRIS Innovation Hackathon Recap 🚀</h1>
            <h2 className={styles.subtitle}>Empowering Ideas &amp; Sparking Innovation</h2>

            <div className={styles.eventDetails}>
              <p>Date: 27th-28th September 2024</p>
              <p>Venue: MIT-WPU Campus</p>
              <p>Host: IRIS in collaboration with BharatGo</p>
            </div>

            <section className={styles.eventIntro}>
              <p>The IRIS Innovation Hackathon brought together the brightest minds from across MIT, inspiring participants to tackle real-world challenges with creativity and technical expertise in a high-energy environment.</p>
              <div className={styles.sectionDivider}></div>
            </section>

            <section className={styles.eventJourney}>
              <h3>How It Happened 🔥</h3>
              <p>Participants from MIT collaborated in diverse teams, creating innovative solutions with real-world impact. Guided by mentors, they refined their projects, culminating in a day of intense presentations to an expert panel.</p>
              <div className={styles.sectionDivider}></div>
            </section>

            <section className={styles.eventHighlights}>
              <h3>Event Highlights 🌟</h3>
              <ul>
                <li>Expert Mentorship: Guidance from faculty and industry mentors enriched each team&apos;s approach.</li>
                <li>Prototyping &amp; Presentation: Teams showcased promising prototypes with impressive final presentations.</li>
                <li>Celebrating Innovation: Top teams were celebrated for their creativity, technical execution, and potential impact.</li>
              </ul>
              <div className={styles.sectionDivider}></div>
            </section>

            <section className={styles.eventRewards}>
              <h3>Prizes &amp; Recognition 💰</h3>
              <ul>
                <li>🥇 1st Place: ₹10,000 Cash</li>
                <li>🥈 2nd Place: ₹6,000 + Continued Support 💼</li>
                <li>🥉 3rd Place: ₹4,000 + Growth Prospects 🌱</li>
              </ul>
              <p>Top teams received the opportunity for further incubation and technical support from BharatGo, creating a path to transform ideas into impactful solutions with future funding opportunities.</p>
              <div className={styles.sectionDivider}></div>
            </section>

            <section className={styles.eventWinningTeams}>
              <h3>Hackathon Winning Teams 🏆</h3>
              <ul>
                <li>🥇 Winner: Team Turtle</li>
                <li>🥈 Runner-Up: Neuro Guardian</li>
                <li>🥉 2nd Runner-Up: Hydrosols</li>
              </ul>
              <div className={styles.sectionDivider}></div>
            </section>

            <section className={styles.eventMentors}>
              <h3>Mentors &amp; Guests 🎓</h3>
              <p>We extend our heartfelt thanks to our mentors, including Dr. Shamla Mantri, Dr. Yogesh Kulkarni, Dr. Mangesh Bedekar, Dr. Balaji M Patil, and special guests Mr. Pravin Adik (BharatGo CEO) and Mr. Saurabh Kane, whose expertise and support were invaluable to the participants.</p>
              <div className={styles.sectionDivider}></div>
            </section>

            <section className={styles.eventSignificance}>
              <h3>Why It Mattered 🌍</h3>
              <p>This hackathon was a unique platform for collaboration, fostering the creativity needed to drive tech-driven solutions for a better future. Participants left with enriched perspectives and connections that will fuel future innovations.</p>
              <div className={styles.sectionDivider}></div>
            </section>

            <section className={styles.eventRegistration}>
              <h3>Stay Connected 📩</h3>
              <p>If you&apos;re interested in participating in future events or have any questions, feel free to reach out to us!</p>
              <Link href="/contact" className={styles.registerBtn}>
              Contact Us
              </Link>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default Event2;
