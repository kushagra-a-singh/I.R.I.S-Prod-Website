import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './Blog.module.css';
// import './Blog.scss';
import supabase  from '../../src/utils/supabase';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import Image from 'next/image';

function Blog() {
  const blogPosts = [
    // {
    //   id: 3,
    //   title: 'The Impact of Mobiles and Screen Time on Children and Younger Generations',
    //   subtitle: 'A Study on the Effects of Digital Appliances on Young Minds',
    //   description: 'Exploring the dual-edged nature of the digital revolution and its impact on the younger generation.',
    //   author: 'Aaryan Kumbhare',
    //   date: 'December 11, 2024',
    //   image: '/mobile_screen_time.jpg',
    //   content: (
    //     <div className='content-container'>
    //       <div className='content-section'>
    //         <h2>Introduction: The Digital Revolution and Its Impact</h2>
    //         <p>
    //           In today&apos;s modern world, digital appliances have become an inseparable part of our lives. One such appliance is the mobile phone, which has become like an extra limb - always in our hands, whether we are talking, texting, scrolling, or just pretending to look busy!
    //         </p>
    //         <p>
    //           But do you ever wonder how mobile phones and increasing screen time are shaping the minds of the younger ones? Studies show that kids in ages 8-12 spend 5-6 hours on screens, and an average teenager has 7-8 hours of screen time. Let us explore the dual-edged nature of the digital revolution!
    //         </p>
    //       </div>
    //       <div className='content-section'>
    //         <h2>The Benefits of Digital Devices</h2>
    //         <p>
    //           Digital devices such as mobile phones and laptops, when used judiciously, have tons of benefits.
    //         </p>
    //         <p>
    //           The digital revolution has been significantly helpful for students as it gives them unlimited access to study material and resources. There are multiple platforms for studying different languages, coding, and upskilling in areas of our interest.
    //         </p>
    //         <p>
    //           Exposure to the internet encourages digital literacy and being familiarized with technologies, something which is quite important in the modern job market as well!
    //         </p>
    //         <p>
    //           The internet gives us access to multiple resources to know about what is going on around in the world while also offering us insights about our history. This helps us to stay in touch with our cultures and roots, despite the world being so fast-paced.
    //         </p>
    //       </div>
    //       <div className='content-section'>
    //         <h2>The Dark Side of Digital Devices</h2>
    //         <p>
    //           A large portion of a teenager&apos;s screen time is devoted to social media.
    //         </p>
    //         <p>
    //           Social media platforms help in boosting their creativity. Social media helps to maintain long-distance friendships and family relations as well.
    //         </p>
    //         <p>
    //           Social media has also turned out to be a platform for the youth to raise their voice. This has multiple positive impacts on the societies, such as the engagement and participation in meaningful conversations to raise awareness and fundraisers. Social media platforms have emerged as some amazing platforms for support and building communities.
    //         </p>
    //         <p>
    //           Also, the rise of social media has helped to create multiple career opportunities to look forward to. We can already see multiple teens building their own brands on social media platforms!
    //         </p>
    //       </div>
    //       <div className='content-section'>
    //         <h2>The Challenges of Digital Devices</h2>
    //         <p>
    //           Every coin has two sides, and the internet and social media are no exception for the same! While they open up infinite doors for the youth, there is no denial that there are several challenges that need to be resolved.
    //         </p>
    //         <p>
    //           Excessive screen time might lead to mobile addiction. This addiction might have a direct impact on physical health in their growing age.
    //         </p>
    //         <p>
    //           The popularity of short format video content has significantly contributed to the reduction of attention span of not just the teens, but also the adults. This has direct implications on our focus and productivity.
    //         </p>
    //         <p>
    //           Many kids and teens might be victims of cyberbullying and online harassment, negatively affecting their mental health. Also, social media platforms might trigger the insecurities of the teenagers because of the unrealistic beauty and success standards which the influencers might set.
    //         </p>
    //         <p>
    //           The lack of real-world interactions might have an impact on their social skills.
    //         </p>
    //       </div>
    //       <div className='content-section'>
    //         <h2>Conclusion: Finding a Balance</h2>
    //         <p>
    //           Now the question is how can the problems be resolved?
    //         </p>
    //         <p>
    //           It is important for the parents to monitor the children and their screen time, without compromising their privacy.
    //         </p>
    //         <p>
    //           There are multiple things which can be done to maintain a healthy relationship with technology!
    //         </p>
    //         <p>
    //           Setting up a screen time limit can aid in monitoring the usage. Promotion of outdoor activities such as playing sports, hiking, etc. can turn out to be crucial for the youngsters.
    //         </p>
    //         <p>
    //           Engaging in non-digital hobbies such as music and art can also be beneficial for those who are struggling with mobile addictions and high screen time. A family together can also engage in multiple activities together. Organising real-time meets and activities time-to-time with friends can also help in developing social and interpersonal skills.
    //         </p>
    //         <p>
    //           We can also see some initiatives being taken by governments across the globe. Just a few days back, Australia became the first nation to ban social media for kids below the age of 16.
    //         </p>
    //         <p>
    //           Let&apos;s sum it all up! The world is growing at a fast pace, and the way people interact, find entertainment is changing. Young children and teenagers are the generation of the internet and social media. There are numerous advantages of technology and the social media platform. Social media has turned out to be a way for youth not just to find entertainment, but also to explore different interests, careers and be more vocal about the world. But there are several drawbacks of the digital world as well. Be it physical, mental, or social impacts, they carry the potential to hinder the growth of a young individual. Setting up boundaries and taking steps to promote more offline activities can help us to be in balance with the real and digital world, and help the youth to grow and live their lives to the fullest!
    //         </p>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      id: 2,
      title: 'Almost a Data Loss: The Security Breach We Overcame',
      subtitle: 'An Inside Look at the Security Flaw That Nearly Wiped Our Data',
      description: 'Our journey in building a platform for collaboration, hackathon management and seamless user experience.',
      author: 'Aaryan Kumbhare',
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
      author: 'Aaryan Kumbhare',
      date: 'November 10, 2024',
      image: '/simulation.jpg',
      imageWidth: 500,
      imageHeight: 300,
    }
  ];

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
                <span>
                  By <a href="https://www.linkedin.com/in/aaryan-kumbhare-07428032a/" target="_blank" rel="noopener noreferrer" className={styles.authorLink}>{post.author}</a>
                </span> | <span>{post.date}</span>
                <div style={{ marginTop: '5px' }}>
                  Guided by mentors <a href="https://scholar.google.com/citations?user=IUUENAMAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className={styles.authorLink}>Dr. Shamla Mantri</a> & <br></br><a href="https://scholar.google.com/citations?user=9GsTeoQAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className={styles.authorLink}>Dr. Yogesh Kulkarni</a>
                </div>
              </div>
                  <button
                    className={styles.readMoreButton}
                  >
                    Read More
                  </button>
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
