import React from 'react';
import Link from 'next/link';
import styles from './Projects3.module.css';

function Projects3() {
  return (
    <div className={styles['soteria-page-container']}>
      <div className={styles['soteria-page-heading-container']}>
        <h1>Project Soteria</h1>
        <p>
          An Autonomous Drone Designed for Modular Usage & Tracking
        </p>
      </div>

      <div className={`${styles['soteria-page-section-1-container']} ${styles['content-section']}`}>
        Project Soteria is an autonomous drone initiative aimed at developing a versatile aerial platform capable of modular usage, real-time tracking, and integration with advanced control and communication systems      </div>

      <div className={`${styles['soteria-page-section-2-container']} ${styles['content-section']}`}>
        <h2>Core Components</h2>
        <p>The drone is designed with a robust architecture combining power efficiency, autonomous control, and intelligent onboard systems. Its power system ensures long-lasting operation with redundancy for safety, while the flight control system leverages Pixhawk/SpeedyBee controllers, STM32 subsystems, and integrated sensors (IMU, GPS) for precise autonomous navigation. A lightweight yet durable propulsion system with high-efficiency motors and balanced propellers provides stable lift and maneuverability. For communication, the drone supports FS-i6S radio control, long-range telemetry, and ELRS transmitters, enabling reliable, low-latency control and monitoring. Advanced onboard processing with ESP32 allows expansion into machine vision, with FPV and modular cameras offering real-time video, situational awareness, and object-tracking capabilities.</p>
        <div className={`${styles['content-listing']} ${styles['content-section']}`}>
          <span className={styles['listing-heading']}>Key Capabilities:</span>
          <ul>
            <li>Autonomous Flight Control- Pixhawk/SpeedyBee with STM32 and integrated sensors for precision navigation.</li>
            <li>Reliable Power & Safety-High-capacity battery with redundant safety measures.</li>
            <li>Stable Propulsion-High-efficiency motors, optimized propellers, and durable frame design.</li>
            <li>Robust Communication-FS-i6S radio, telemetry, and ELRS integration for long-range, low-latency connectivity.</li>
            <li>Intelligent Vision & Processing-ESP32-based onboard computing with FPV and modular cameras for real-time tracking and object detection.</li>
          </ul>
        </div>
      </div>

      <div className={`${styles['soteria-page-section-3-container']} ${styles['content-section']}`}>
        <h2>Vision</h2>
        <div className={`${styles['content-listing']} ${styles['content-section']}`}>
          <span className={styles['listing-heading']}>Project Soteria aims to serve as a testbed for autonomous aerial technologies, bridging practical drone applications with modular expandability. The long-term vision is to evolve the platform into a scalable ecosystem supporting diverse applications such as:
</span>
          <ul>
            <li>Environmental monitoring</li>
            <li>Logistics and delivery</li>
            <li>Research and academic projects</li>
            <li>Search and rescue missions</li>
          </ul>
        </div>
        <h2>Collaboration with TARZAN</h2>
        <div className={`${styles['content-listing']} ${styles['content-section']}`}>
          <span className={styles['listing-heading']}>Project Soteria is being developed in parallel with TARZAN, our autonomous car project. Both platforms share a common vision of modular autonomy and real-time tracking. The current phase of development involves exploring cross-integration, where TARZAN’s ground-based navigation and decision-making systems will be tested in tandem with Soteria’s aerial capabilities.</span>
        
        <span className={styles['listing-heading']}>By combining aerial and ground perspectives, we aim to create a coordinated autonomous ecosystem where Soteria provides aerial reconnaissance and mapping, while TARZAN executes precise ground-level maneuvers. This synergy is expected to strengthen both projects, expand their real-world applications, and set the foundation for multi-agent autonomous systems.</span>
        
        </div>
      </div>

      <div className={styles['projectRegistration']}>
        <h3>Stay Connected 📩</h3>
        <p>If you&apos;re interested in participating in this project or have any questions, feel free to reach out to us!</p>
        <Link href="/recruitments" className={styles['registerBtn']}>
          Recruitment form
        </Link>
      </div>
      
      
    </div>
  );
};

export default Projects3;