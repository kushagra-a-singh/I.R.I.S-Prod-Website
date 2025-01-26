import React from 'react';
import Link from 'next/link';
import styles from './Projects2.module.css';

function Projects2() {
  return (
    <div className={styles['tarzan-page-container']}>
      <div className={styles['tarzan-page-heading-container']}>
        <h1>Tarzan Project</h1>
        <p>
          Advanced Autonomous Vehicle Control System using YOLO Detection and CAN Bus
        </p>
      </div>

      <div className={`${styles['tarzan-page-section-1-container']} ${styles['content-section']}`}>
        Tarzan is an innovative, leading-edge autonomous vehicle control system integrating the application of computer vision into vehicular communications. Under the system, it works based on object detection provided by running YOLOv8 on a streaming set up from mobile-to-laptop, processing video feeds directly from cameras. This processes real-time views for detection of road condition, obstacle, and threat. This visual intelligence is married to a highly developed CAN bus communication system, built around STM32 microcontrollers, allowing interaction directly with vehicle control systems through the OBD-II interface. What sets this device apart is its hybrid approach - combining temporary actuator-based testing capabilities and long-term vision of the implementation of custom PCB boards in production environments. Whether in its current development with mobile camera inputs and actuator-based control or at its intended maturity level of fully integrated CAN bus messaging, Tarzan is an important advance toward making the technology available and deployable for autonomous vehicles in all vehicle platform types.
      </div>

      <div className={`${styles['tarzan-page-section-2-container']} ${styles['content-section']}`}>
        <h2>Vision System Architecture</h2>
        <p>The vision system leverages advanced YOLOv8 architecture optimized for automotive applications. Our implementation processes real-time camera feeds from mobile devices through an innovative IP Webcam setup, achieving consistent 30+ FPS performance with sub-100ms latency. The system excels in detecting road hazards, obstacles, and navigation markers under varying environmental conditions, thanks to extensive custom training and sophisticated post-processing algorithms.</p>
        <div className={`${styles['content-listing']} ${styles['content-section']}`}>
          <span className={styles['listing-heading']}>Key Capabilities:</span>
          <ul>
            <li>Real-time object detection and tracking</li>
            <li>Advanced image stabilization</li>
            <li>Adaptive quality control</li>
            <li>Multi-object classification</li>
          </ul>
        </div>
      </div>

      <div className={`${styles['tarzan-page-section-3-container']} ${styles['content-section']}`}>
        <h2>Technical Specifications</h2>
        <div className={`${styles['content-listing']} ${styles['content-section']}`}>
          <span className={styles['listing-heading']}>The system is meticulously designed to identify key elements essential for safe and efficient navigation. Its advanced detection capabilities include recognizing road obstacles and potential hazards that could disrupt a vehicle&apos;s path. Additionally, it accurately detects lane markings and boundaries, ensuring the vehicle remains within safe limits. The system is also equipped to identify traffic signs and signals, allowing it to respond promptly to regulatory changes on the road. Furthermore, the technology can detect dynamic obstacles, such as other vehicles and pedestrians, enhancing situational awareness and promoting a safer driving environment.</span>
          <ul>
            <li>Road obstacles and hazards</li>
            <li>Lane markings and boundaries</li>
            <li>Traffic signs and signals</li>
            <li>Dynamic obstacles and pedestrians</li>
          </ul>
        </div>
        <div className={`${styles['content-listing']} ${styles['content-section']}`}>
          <span className={styles['listing-heading']}>Our optimized processing pipeline supports the system&apos;s real-time operational requirements with precision and speed. It begins with a frame pre-processing and normalization phase, which prepares visual data for consistent interpretation across various lighting and environmental conditions. Multi-scale detection algorithms are then applied, enabling the system to recognize objects at different sizes and distances accurately. Custom post-processing filters refine these detections, minimizing false positives and enhancing overall reliability. Finally, real-time data streaming protocols are implemented to facilitate immediate data transfer, ensuring the system remains responsive and efficient in all operational contexts.</span>
          <ul>
            <li>Frame pre-processing and normalization</li>
            <li>Multi-scale detection algorithms</li>
            <li>Custom post-processing filters</li>
            <li>Real-time data streaming protocols</li>
          </ul>
        </div>
      </div>

      <div className={styles['projectRegistration']}>
        <h3>Stay Connected 📩</h3>
        <p>If you&apos;re interested in participating in this project or have any questions, feel free to reach out to us!</p>
        <Link href="/recruitments" className={styles['registerBtn']}>
          Recruitment form
        </Link>
      </div>
      <div className={styles.githublink}>
          <h2> Project GitHub Link</h2>
          <a href= "https://github.com/IRIS-MITWPU/Tarzan" > Github Repository</a>
            
      </div>s
    </div>
  );
};

export default Projects2;