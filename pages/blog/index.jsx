import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './Blog.module.css';
// import './Blog.scss';
import supabase  from '../../src/utils/supabase';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import Image from 'next/image';

function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commenterName, setCommenterName] = useState('');
  const [deviceId, setDeviceId] = useState(null);
  const [vote, setVote] = useState(null);
  const [voteCounts, setVoteCounts] = useState({ upvotes: 0, downvotes: 0 });

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
    //           In today’s modern world, digital appliances have become an inseparable part of our lives. One such appliance is the mobile phone, which has become like an extra limb - always in our hands, whether we are talking, texting, scrolling, or just pretending to look busy!
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
    //           A large portion of a teenager&apo;s screen time is devoted to social media.
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
    //           Let’s sum it all up! The world is growing at a fast pace, and the way people interact, find entertainment is changing. Young children and teenagers are the generation of the internet and social media. There are numerous advantages of technology and the social media platform. Social media has turned out to be a way for youth not just to find entertainment, but also to explore different interests, careers and be more vocal about the world. But there are several drawbacks of the digital world as well. Be it physical, mental, or social impacts, they carry the potential to hinder the growth of a young individual. Setting up boundaries and taking steps to promote more offline activities can help us to be in balance with the real and digital world, and help the youth to grow and live their lives to the fullest!
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
      content: (
        <>
          <div className='content-container'>
            <div className='content-section'>
              <h2>Overview about I.R.I.S. Website.</h2>
              <p>
                In today&apo;s dynamic and rapidly-evolving digital ecosystem, it is important for an organisation to set up their online presence, so that they can meet the growing demands of their audience and help in increasing the scale of their services. Deployment of a muscular and scalable website acts as a hub for the operations of an organisation, real-time updates about the work of the organisation, showcasing their services and a portal for communication with their customers. This helps in enhancing the user engagement, quality of services; eventually leading to the overall growth of the organisation.
                <br />
                <br />
                I.R.I.S. website acts as a crucial platform for showcasing and promoting the club, engaging potential members and boosting club’s visibility on our campus. Our website serves as a hub for all our activities, events, announcements and important details, while also talking about the past events, activities and showcasing club’s achievements. It also serves as a networking portal for connecting with the members, mentors and the alumni, while enhancing the communication through engaging podcasts. 
                <br />     
                <br />     
                The website also serves as a platform for all our event registrations and online payments, something which we would be discussing in depth in the upcoming sections!
              </p>
            </div>
            <div className='content-section'>
              <h2>Let’s start with the main point:</h2>
              <p>
                Now, I’m sure that you are aware about the importance of our website. 
                We will now start with some technicalities and components of our website.
                <br />
                <br />
                The frontend of our website is written in a popular Javascript library, React.JS. To make the website more responsive and enhance the user experience, we have used Bootstrap, a very popular CSS framework. 
                Data storage and management is an important aspect for an organisation. Similarly, for our backend, we have used Supabase SQL, a powerful database powered by PostgresDB, as our database, for keeping the data of our users secure.
                <br />
                <br />
                For registrations and payments, we need a payment gateway. For this purpose, we have used Razorpay as our payment gateway API for facilitating our online payments for events such as hackathons. 
                For frontend deployment, we have used Vercel as our web hosting service and for backend deployment, we use Vercel Serverless Edge Functions.
                Also, GitHub is used for our version control and collaboration. 
                Additionally, our github repository was integrated with vercel to consistently make seamless updates to our website.
                <br />
                <br />
                But, there is a quote which I read once, “In every problem lies an opportunity for growth and a lesson to be learned.” 
                <br />
                In the year of 2019, a popular American bank holding company, Capital One, faced a massive security breach, which exposed the data of over 100 million customers! But, there’s a catch here. The problem was not identified by any employee at the organisation’s security team, but rather, by one individual white hat hacker, who noticed the leaked data on GitHub! The hacker did report the problem immediately to the organisation and helped in preventing further exploitation of the vulnerability. 
                The issue was related to misconfigured AWS cloud storage permissions, that allowed unauthorised access to sensitive data. This helped Capital One to get to know about the problems related to their cloud security practices. However, the organisation did face some consequences because of the breach, leading to regulatory fines and loss in customer trust. 
                The hacker received a financial reward as a part of Capital One’s Bug Bounty Program.
                <br />
                <br />
                But wait, hold on for a moment! You must be wondering why we discussed this? What has it to do with our website? 
                <br />
                This is because our website did face a similar problem a couple of months back during the initial days of our hackathon registrations. 
                <br />
                Let&apo;s take a deep dive into the same!!
              </p>
            </div>
            <div className='content-section'>
              <h2>What caused the issue?</h2>
              <p>
                Our team created and deployed the I.R.I.S. website for registrations and payments of our upcoming event in September, the I.R.I.S. Innovation Hackathon. 
                So as discussed above, our website used Supabase SQL in the backend for storage of user data and payment details. 
                To prevent unauthorised access, Supabase SQL uses Row Level Security (RLS) features, which were initially enabled by our team. 
                RLS features in SQL allows users to control which user or roles can access specific data in a table. RLS works by filtering rows based on the execution context of the query, rather than the current user access rights. 
                However, with RLS enabled, data wasn't being saved, so the team decided to disable it temporarily, assuming that they could bypass security for a college-level event and address the same after the registration phase. 
                And yes, you must have guessed it by now!
                This decision left our database unintentionally vulnerable, potentially allowing anyone to add, edit or delete data entries from our database!
              </p>
              <h3>How we identified the issue and our story&apo;s white hat:</h3>
              <p>
                The technical team deployed the website and initially, everything appeared to be running smoothly. The teams were able to submit their details and complete the transactions successfully. 
                But later, while the team was reviewing the database, they noticed an empty row that didn’t align with any of our expected data entries. Uncertain about the cause, they decided to leave it as is. But now, our white hat, a college peer who identified himself as a participant in our event, reached out to our team! He specifically pointed out a critical issue which was related to our backend. He highlighted that the database was publicly accessible and vulnerable to CRUD operations, allowing anyone to make the changes due to the disabled RLS and an exposed key in the network tab. Moreover, the empty row which our team noticed while reviewing the database, was our peer’s way for testing the vulnerability. 
              </p>
              <h3>How we corrected it:</h3>
              <p>
                The actions taken by our peer exposed our technical team to the full severity of the issue, emphasising the critical security vulnerabilities in our platform. The technical team quickly created a custom RLS script to secure the database and allow only the data entries for the team details and payments. After making the changes, the team first tested the script on a dummy site, replicating the functionalities of our live environment, to avoid any kind of disruptions on our production system. Subsequently, the team confirmed with the peer whether he could access or modify the dummy database using the updated script. The response was positive, indicating that the script was successfully executed! The script was later successfully deployed to the live system. 
              </p>
              <h3>Key takeaways:</h3>
              <p>
                This experience highlighted the importance of not delaying security measures, even for seemingly minor projects. 
              </p>
            </div>
            <div className='content-section'>
              <h2>Conclusion</h2>
              <p>
                To sum it up, even a small mistake can also offer you a lot of lessons. As we read in the quote a few sections above, mistakes and problems are an opportunity for improvement and growth, which goes along pretty well with our example! The incident helped the team to emphasise more on security and building a more robust and reliable website for our users. 
                <br />
                Thanks to our peer&apo;s timely alert, we were able to identify the vulnerability, and make the changes accordingly. 
                This also teaches us about the necessity of networking and reaching out to people who may be facing issues they are unaware of. 
                <br />
                <br />
                <span style={{textDecoration: 'underline'}}>You never know when your contributions might have a greater impact, solving problems with huge potential risks for a greater good!!</span>
              </p>
            </div>
          </div>
        </>
      ),
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
      content: (
        <>
          <div className='content-container'>
            <div className='content-section'>
              <h2>Introduction: The Future of Intelligent Transportation</h2>
              <p>
                In the rapidly evolving landscape of automotive technology, autonomous vehicles represent more than just a technological marvel—they are a transformative solution to transportation challenges. The I.R.I.S. club&apo;s TARZAN project emerges as a groundbreaking initiative that pushes the boundaries of what&apo;s possible in autonomous vehicle navigation, particularly in challenging road conditions.
              </p>
              <h3>The Context of Autonomous Driving</h3>
              <p>
                The journey of autonomous vehicles has been fascinating. From Google&apo;s Self-Driving Car Project in 2009 to Tesla&apo;s Autopilot in 2015, the automotive industry has witnessed exponential growth. However, most existing solutions are limited to high-end vehicles with Advanced Driver Assistance Systems (ADAS).
              </p>
              <p>
                TARZAN challenges this paradigm. Our project aims to democratize autonomous navigation technology, making it accessible to vehicles across different technological spectrums.
              </p>
            </div>
            <div className='content-section'>
              <h2>Understanding Autonomous Driving Levels</h2>
              <p>
                Before diving into TARZAN&apo;s specifics, let&apo;s understand the autonomous driving spectrum:
              </p>
              <ul>
                <li><strong>Level 0 (No Automation)</strong>: Traditional vehicles where the driver controls everything</li>
                <li><strong>Level 1 (Driver Assistance)</strong>: Basic features like adaptive cruise control</li>
                <li><strong>Level 2 (Partial Automation)</strong>: Simultaneous steering and acceleration/braking assistance</li>
                <li><strong>Level 3 (Conditional Automation)</strong>: Vehicle can manage most driving tasks, with driver ready to intervene</li>
              </ul>
            </div>
            <div className='content-section'>
              <h2>The TARZAN Approach: Intelligent Road Intelligent System</h2>
              <h3>Core Technologies</h3>
              <p>
                TARZAN integrates multiple cutting-edge technologies:
              </p>
              <ol>
                <li><strong>Computer Vision</strong>: Utilizing YOLOv8 for real-time object detection</li>
                <li><strong>Machine Learning</strong>: Adaptive algorithms for intelligent decision-making</li>
                <li><strong>Sensor Fusion</strong>: Combining multiple input streams for comprehensive environmental understanding</li>
              </ol>
            </div>
            <div className='content-section'>
              <h3>Pothole Detection Mechanism</h3>
              <p>
                The heart of TARZAN is its sophisticated pothole detection system:
              </p>
              <ul>
                <li><strong>Real-time Processing</strong>: 30 frames per second video analysis</li>
                <li><strong>Intelligent Classification</strong>: Categorizing potholes by severity</li>
                <ul>
                  <li><strong>Green</strong>: Small potholes (&lt; 15,000 pixels)</li>
                  <li><strong>Yellow</strong>: Medium potholes (15,000 - 30,000 pixels)</li>
                  <li><strong>Red</strong>: Large potholes (&gt; 30,000 pixels)</li>
                </ul>
              </ul>
              <h3>Navigation and Obstacle Avoidance</h3>
              <p>
                TARZAN employs an advanced A* pathfinding algorithm on a 30x30 grid, enabling:
              </p>
              <ul>
                <li>Dynamic route recalculation</li>
                <li>Immediate obstacle response</li>
                < li>Optimal path selection considering road surface quality</li>
              </ul>
            </div>
            <div className='content-section'>
              <h2>Performance Metrics: Proving the Concept</h2>
              <p>
                Our experimental results are compelling:
              </p>
              <ul>
                <li><strong>Path Tracking Accuracy</strong>: Less than 0.5 meters deviation</li>
                <li><strong>Obstacle Response Time</strong>: Under 200 milliseconds</li>
                <li><strong>Detection Accuracy</strong>:
                  <ul>
                    <li>Precision: 91%</li>
                    <li>Recall: 89%</li>
                  </ul>
                </li>
                <li><strong>Speed Adaptation</strong>: Seamless control between 0-60 km/h</li>
              </ul>
            </div>
            <div className='content-section'>
              <h2>Technical Deep Dive: How TARZAN Works</h2>
              <h3>Data Processing Pipeline</h3>
              <ol>
                <li><strong>Input Capture</strong>: Video stream at 30 fps</li>
                <li><strong>Frame Sampling</strong>: Process every fifth frame for efficiency</li>
                <li><strong>Pothole Detection</strong>: YOLOv8 generates bounding boxes</li>
                <li><strong>Severity Assessment</strong>: Area-based classification</li>
                <li><strong>Navigation Adjustment</strong>: Immediate path recalculation</li>
              </ol>
              <h3>Simulation Framework</h3>
              <p>
                Our Pure Pursuit Controller enables:
              </p>
              <ul>
                <li>Precise waypoint tracking</li>
                <li>Dynamic velocity management</li>
                <li>Smooth trajectory following</li>
              </ul>
            </div>
            <div className='content-section'>
              <h2>Beyond Technology: The Vision</h2>
              <p>
                TARZAN isn't just a technical project—it&apo;s a vision of making roads safer, more accessible, and intelligent. By extending autonomous capabilities to vehicles without ADAS, we&apo;re democratizing advanced transportation technology.
              </p>
            </div>
            <div className='content-section'>
              <h2>Conclusion: The Road Ahead</h2>
              <p>
                As we continue refining TARZAN, we&apo;re not just developing a system—we&apo;re shaping the future of intelligent transportation. Our project demonstrates that with creativity, advanced algorithms, and a commitment to innovation, we can transform how we navigate our world.
              </p>
              <p><strong>Stay tuned for more updates from the I.R.I.S. Research Team!</strong></p>
              <h3>Visual Insights of TARZAN&apo;s System</h3>
              <div className={styles.imageGallery}>
                <h4>MATLAB System Diagram</h4>
                <Image
                  src="/systemDiagMATLAB.jpg"
                  alt="TARZAN Simulation"
                  width={500}
                  height={300}
                  className={styles.blogImage}
                />
                <h4>Chassis Design</h4>
                <Image
                  src="/chassis.jpg"
                  alt="TARZAN Chassis"
                  width={500}
                  height={300}
                  className={styles.blogImage}
                />
              </div>
            </div>
          </div>
        </>
      ),
    },
  ];

  useEffect(() => { 
    const storedDeviceId = localStorage.getItem('deviceId');
    if (!storedDeviceId) {
      const newDeviceId = 'device-' + Math.random().toString(36).substring(2);
      localStorage.setItem('deviceId', newDeviceId);
      setDeviceId(newDeviceId);
    } else {
      setDeviceId(storedDeviceId);
    }
  }, []);

  useEffect(() => {
    const handleBackGesture = (event) => {
      if (selectedPost) {
        closeModal();
        event.preventDefault();
      }
    };

    window.addEventListener('popstate', handleBackGesture);

    return () => {
      window.removeEventListener('popstate', handleBackGesture);
    };
  }, [selectedPost]);

  const fetchComments = async (postId) => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      setComments(data);
    }
  };

  const fetchVoteStatus = async (postId) => {
    const { data, error } = await supabase
      .from('votes')
      .select('vote_type')
      .eq('post_id', postId)
      .eq('device_id', deviceId)
      .limit(1);

    if (error) {
      console.error('Error fetching vote status:', error);
    } else {
      setVote(data.length > 0 ? data[0].vote_type : null);
    }

    const { data: upvoteData, error: upvoteError } = await supabase
      .from('votes')
      .select('*')
      .eq('post_id', postId)
      .eq('vote_type', 'upvote');

    const { data: downvoteData, error: downvoteError } = await supabase
      .from('votes')
      .select('*')
      .eq('post_id', postId)
      .eq('vote_type', 'downvote');

    if (upvoteError || downvoteError) {
      console.error('Error fetching vote counts:', upvoteError || downvoteError);
    } else {
      const upvotes = upvoteData.length;
      const downvotes = downvoteData.length;
      setVoteCounts({ upvotes, downvotes });
    }
  };

  const handleVote = async (postId, voteType) => {
    try {
      const { data: existingVote, error: fetchError } = await supabase
        .from('votes')
        .select('*')
        .eq('post_id', postId)
        .eq('device_id', deviceId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error fetching existing vote:', fetchError);
        return;
      }

      if (existingVote) {
        if (existingVote.vote_type === voteType) {
          toast.error(`You have already ${voteType === 'upvote' ? 'upvoted' : 'downvoted'} this blog.`);
          return;
        }

        const { error: updateError } = await supabase
          .from('votes')
          .update({ vote_type: voteType })
          .eq('post_id', postId)
          .eq('device_id', deviceId);

        if (updateError) {
          console.error('Error updating vote:', updateError);
          return;
        }

        toast.success(`Your vote has been changed to ${voteType === 'upvote' ? 'Upvote' : 'Downvote'}`);
      } else {
        const { error: insertError } = await supabase
          .from('votes')
          .insert({
            post_id: postId,
            vote_type: voteType,
            device_id: deviceId,
          });

        if (insertError) {
          console.error('Error inserting vote:', insertError);
          return;
        }

        toast.success(`You have successfully ${voteType === 'upvote' ? 'upvoted' : 'downvoted'} this blog!`);
      }

      setVote(voteType);
      fetchVoteStatus(postId);
    } catch (error) {
      console.error('Unexpected error in handleVote:', error);
    }
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '' || commenterName.trim() === '') {
      toast.error('Please fill in both name and comment fields!');
      return;
    }

    const { data, error } = await supabase
      .from('comments')
      .insert([{
        post_id: selectedPost.id,
        username: commenterName, 
        comment: newComment,
        device_id: deviceId,
      }]);

    if (error) {
      console.error('Error submitting comment:', error);
      toast.error('Failed to submit comment!');
    } else {
      setNewComment('');
      setCommenterName('');
      fetchComments(selectedPost.id);
      toast.success('Comment added successfully!');
    }
  };

  const openModal = (post) => {
    setSelectedPost(post);
    fetchComments(post.id);
    fetchVoteStatus(post.id);
    window.history.pushState({ modalOpen: true }, '');
  };

  const closeModal = () => {
    setSelectedPost(null);
    setVote(null);
    window.history.back();
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
                <span>
                  By <a href="https://www.linkedin.com/in/aaryan-kumbhare-07428032a/" target="_blank" rel="noopener noreferrer" className={styles.authorLink}>{post.author}</a>
                </span> | <span>{post.date}</span>
                <div style={{ marginTop: '5px' }}>
                  Guided by mentors <a href="https://scholar.google.com/citations?user=IUUENAMAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className={styles.authorLink}>Dr. Shamla Mantri</a> & <br></br><a href="https://scholar.google.com/citations?user=9GsTeoQAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className={styles.authorLink}>Dr. Yogesh Kulkarni</a>
                </div>
              </div>
                  <button
                    onClick={() => openModal(post)}
                    className={styles.readMoreButton}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedPost && (
          <Modal
            isOpen={!!selectedPost}
            onRequestClose={closeModal}
            className={styles.modal}
            overlayClassName={styles.overlay}
            ariaHideApp={false}
          >
            <div className={styles.modalContent}>
              <button className={styles.closeButton} onClick={closeModal}>
                &times;
              </button>
              <h2 className={styles.modalTitle}>{selectedPost.title}</h2>
              <h4 className={styles.modalSubtitle}>{selectedPost.subtitle}</h4>
              <div className={styles.modalMeta}>
                <span>By {selectedPost.author}</span> |{' '}
                <span>{selectedPost.date}</span>
              </div>
              <div className={styles.modalBreaker} />
              <div className={styles.modalText}>{selectedPost.content}</div>

              <div className={styles.voteSection}>
                <button
                  onClick={() => handleVote(selectedPost.id, 'upvote')}
                  className={`${styles.voteButton} ${vote === 'upvote' ? styles.active : ''}`}
                >
                  ▲ Upvote
                </button>
                <span className={styles.voteCount}>{voteCounts.upvotes}</span>
                <button
                  onClick={() => handleVote(selectedPost.id, 'downvote')}
                  className={`${styles.voteButton} ${vote === 'downvote' ? styles.active : ''}`}
                >
                  ▼ Downvote
                </button>
                <span className={styles.voteCount}>{voteCounts.downvotes}</span>
              </div>

              <div className={styles.commentSection}>
                <h3 className={styles.commentTitle}>Comments</h3>
                <div className={styles.commentList}>
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <div key={comment.id} className={styles.comment}>
                        <p><strong>{comment.username}</strong></p>
                        <p>{comment.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p>No comments added yet.</p>
                  )}
                </div>
                
                <h5 className={styles.commentHeader}>Add your comment:</h5>
                <input
                  type="text"
                  value={commenterName}
                  onChange={(e) => setCommenterName(e.target.value)}
                  placeholder="Your Name"
                  className={styles.commentInput}
                />

                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className={styles.commentInput}
                />
                <button
                  onClick={handleCommentSubmit}
                  className={styles.commentSubmitButton}
                >
                  Submit Comment
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>

      <ToastContainer 
        position="bottom-right"
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={true}     
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
export default Blog;
