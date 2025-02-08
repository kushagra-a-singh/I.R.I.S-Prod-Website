import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './data-loss.module.css';
import supabase from '../../src/utils/supabase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

function Blog2() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [commenterName, setCommenterName] = useState('');
    const [deviceId, setDeviceId] = useState(null);
    const [vote, setVote] = useState(null);
    const [voteCounts, setVoteCounts] = useState({ upvotes: 0, downvotes: 0 });

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
        fetchComments();
        fetchVoteStatus();
    }, [deviceId]);

    const fetchComments = async () => {
        const { data, error } = await supabase.from('comments').select('*').order('created_at', { ascending: false });
        if (error) console.error('Error fetching comments:', error);
        else setComments(data);
    };

    const fetchVoteStatus = async () => {
        const { data, error } = await supabase
            .from('votes')
            .select('vote_type')
            .eq('device_id', deviceId)
            .limit(1);

        if (!error && data.length > 0) setVote(data[0].vote_type);

        const { data: upvotes } = await supabase.from('votes').select('*').eq('vote_type', 'upvote');
        const { data: downvotes } = await supabase.from('votes').select('*').eq('vote_type', 'downvote');
        setVoteCounts({ upvotes: upvotes.length, downvotes: downvotes.length });
    };

    const handleVote = async (voteType) => {
        if (vote === voteType) {
            toast.error(`You have already ${voteType}d this blog.`);
            return;
        }

        await supabase.from('votes').upsert({ device_id: deviceId, vote_type: voteType });
        setVote(voteType);
        fetchVoteStatus();
    };

    const handleCommentSubmit = async () => {
        if (!newComment || !commenterName) {
            toast.error('Please enter your name and comment!');
            return;
        }

        const { error } = await supabase.from('comments').insert({ username: commenterName, comment: newComment });
        if (error) {
            console.error('Error adding comment:', error);
            toast.error('Failed to add comment.');
        } else {
            setNewComment('');
            setCommenterName('');
            fetchComments();
            toast.success('Comment added successfully!');
        }
    };

    return (
        <div className={styles.blogPage}>
            <div className={styles.blogContent}>
                <main className={styles.mainContent}>
                    <h1 className={styles.pageTitle}>TARZAN: Revolutionizing Autonomous Vehicle Navigation</h1>
                    <p className={styles.pageSubtitle}>Advanced Pothole Detection System</p>
                    <p className={styles.pageauthor}>By Aaryan Kumbhare | November 10, 2024</p>
          
          <div className={styles.blogDescription}>
          <div className={styles.blogCard}>
          <h2>The Future of Intelligent Transportation</h2>
          <p>
                            In the rapidly evolving landscape of automotive technology, autonomous vehicles represent more than just a technological marvel—they are a transformative solution to transportation challenges. The I.R.I.S. club&apos;s TARZAN project emerges as a groundbreaking initiative that pushes the boundaries of what&apos;s possible in autonomous vehicle navigation, particularly in challenging road conditions.
                            </p>

              </div>
              <div className='content-section'>
              <div className={styles.blogCard}>
                <h2>The Context of Autonomous Driving</h2>
                <p>
                The journey of autonomous vehicles has been fascinating. From Google&apos;s Self-Driving Car Project in 2009 to Tesla&apos;s Autopilot in 2015, the automotive industry has witnessed exponential growth. However, most existing solutions are limited to high-end vehicles with Advanced Driver Assistance Systems (ADAS).

                </p>
                <p>
                TARZAN challenges this paradigm. Our project aims to democratize autonomous navigation technology, making it accessible to vehicles across different technological spectrums.
              </p>

              </div>
              </div>
              <div className='content-section'>
              <div className={styles.blogCard}>
                <h2>Understanding Autonomous Driving Levels</h2>
                <p>
                Before diving into TARZAN&apos;s specifics, let&apos;s understand the autonomous driving spectrum:
              </p>
              <ul>
                <li><strong>Level 0 (No Automation)</strong>: Traditional vehicles where the driver controls everything</li>
                <li><strong>Level 1 (Driver Assistance)</strong>: Basic features like adaptive cruise control</li>
                <li><strong>Level 2 (Partial Automation)</strong>: Simultaneous steering and acceleration/braking assistance</li>
                <li><strong>Level 3 (Conditional Automation)</strong>: Vehicle can manage most driving tasks, with driver ready to intervene</li>
              </ul>

                
              </div>
              </div>
              <div className='content-section'>
              <div className={styles.blogCard}>
                <h2>The TARZAN Approach: Intelligent Road Intelligent System</h2>
                <h3>Core Technologies</h3>
              <p>
                TARZAN integrates multiple cutting-edge technologies:
              </p>
              <ol className={styles.List}>
                <li><strong>Computer Vision</strong>: Utilizing YOLOv8 for real-time object detection</li>
                <li><strong>Machine Learning</strong>: Adaptive algorithms for intelligent decision-making</li>
                <li><strong>Sensor Fusion</strong>: Combining multiple input streams for comprehensive environmental understanding</li>
              </ol>

              </div>
              </div>
          </div>
          <div className='content-section'>
              <div className={styles.blogCard}>
                <h2>Pothole Detection Mechanism</h2>
                <p>
                The heart of TARZAN is its sophisticated pothole detection system:
              </p>
              <ul>
                <li><strong>Real-time Processing</strong>: 30 frames per second video analysis</li>
                <li><strong>Intelligent Classification</strong>: Categorizing potholes by severity</li>
                <ul className={styles.List}>
                  <li><strong>Green</strong>: Small potholes (&lt; 15,000 pixels)</li>
                  <li><strong>Yellow</strong>: Medium potholes (15,000 - 30,000 pixels)</li>
                  <li><strong>Red</strong>: Large potholes (&gt; 30,000 pixels)</li>
                </ul>
              </ul>
              <h3 className={styles.sectionTitle}>Navigation and Obstacle Avoidance</h3>
              <p>
                TARZAN employs an advanced A* pathfinding algorithm on a 30x30 grid, enabling:
              </p>
              <ul className={styles.List}>
                <li>Dynamic route recalculation</li>
                <li>Immediate obstacle response</li>
                <li>Optimal path selection considering road surface quality</li>
              </ul>
            </div>


              </div>
              <div className='content-section'>
              <div className={styles.blogCard}>
                <h2>Performance Metrics: Proving the Concept</h2>
                <p>
                Our experimental results are compelling:
              </p>
              <ul className={styles.List}>
                <li><strong>Path Tracking Accuracy</strong>: Less than 0.5 meters deviation</li>
                <li><strong>Obstacle Response Time</strong>: Under 200 milliseconds</li>
                <li><strong>Detection Accuracy</strong>:
                  <ul className={styles.List}>
                    <li>Precision: 91%</li>
                    <li>Recall: 89%</li>
                  </ul>
                </li>
                <li><strong>Speed Adaptation</strong>: Seamless control between 0-60 km/h</li>
              </ul>

              </div>
              </div>

              <div className='content-section'>
              <div className={styles.blogCard}>
                <h2>Technical Deep Dive: How TARZAN Works</h2>
                <h3>Data Processing Pipeline</h3>
            
                <ol className={styles.List}>
                <li><strong>Input Capture</strong>: Video stream at 30 fps</li>
                <li><strong>Frame Sampling</strong>: Process every fifth frame for efficiency</li>
                <li><strong>Pothole Detection</strong>: YOLOv8 generates bounding boxes</li>
                <li><strong>Severity Assessment</strong>: Area-based classification</li>
                <li><strong>Navigation Adjustment</strong>: Immediate path recalculation</li>
              </ol>
              <h3 className={styles.sectionTitle}>Simulation Framework</h3>
              <p>
                Our Pure Pursuit Controller enables:
              </p>
              <ul className={styles.List}>
                <li>Precise waypoint tracking</li>
                <li>Dynamic velocity management</li>
                <li>Smooth trajectory following</li>
              </ul>
              </div>
              </div>

              <div className='content-section'>
              <div className={styles.blogCard}>
                <h2>Beyond Technology: The Vision</h2>
                <p>
                TARZAN isn&apos;t just a technical project—it&apos;s a vision of making roads safer, more accessible, and intelligent. By extending autonomous capabilities to vehicles without ADAS, we&apos;re democratizing advanced transportation technology.
              </p>
              </div>
              </div>
              <div className='content-section'>
              <div className={styles.blogCard}>
                <h2>Conclusion: The Road Ahead</h2>
                <p>
                As we continue refining TARZAN, we&apos;re not just developing a system—we&apos;re shaping the future of intelligent transportation. Our project demonstrates that with creativity, advanced algorithms, and a commitment to innovation, we can transform how we navigate our world.
              </p>
              <p><strong>Stay tuned for more updates from the I.R.I.S. Research Team!</strong></p>
              <h3 className={styles.sectionTitle}>Visual Insights of TARZAN&apos;s System</h3>

                       
                        <div className={styles.imageGallery}>
                            <h4>MATLAB System Diagram</h4>
                            <Image src="/systemDiagMATLAB.jpg" alt="TARZAN Simulation" width={500} height={300} className={styles.blogImage} />
                            <h4>Chassis Design</h4>
                            <Image src="/chassis.jpg" alt="TARZAN Chassis" width={500} height={300} className={styles.blogImage} />
                            </div>
              </div>
              </div>
          

          
          

        <div className={styles.voteSection}>
        <button 
        onClick={() => handleVote('upvote')} 
        className={`${styles.voteButton} ${vote === 'upvote' ? styles.active : ''}`}
    >
        ▲ Upvote ({voteCounts.upvotes})
        </button>

         <button 
        onClick={() => handleVote('downvote')} 
        className={`${styles.voteButton} ${vote === 'downvote' ? styles.active : ''}`}
    >
        ▼ Downvote ({voteCounts.downvotes})
        </button>
     </div>
                    
                <div className={styles.commentSection}>
                <h3 className={styles.commentTitle}>Comments</h3>
                <div className={styles.commentList}>
                    {comments.map((comment) => (
                    <div key={comment.id} className={styles.comment}>
                    <p><strong>{comment.username}</strong>: {comment.comment}</p>
                    </div>
                ))}
                </div>
                <h3 className={styles.commentTitle}>Add your Comment</h3>

                <div>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={commenterName}
                    onChange={(e) => setCommenterName(e.target.value)}
                    className={styles.commentInput}
                />
                <textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className={styles.commentInput}
                />
                <button onClick={handleCommentSubmit} className={styles.commentSubmitButton}>
                    Submit Comment
                </button>
                </div>
                </div>
                </main>
            </div>
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="dark" />
        <div className={styles.centerContainer}>
                <Link href="/blog" className={styles.backtoblog}>
                    Back to Blogs
                </Link>
            </div>
      </div>
      
    );
}

export default Blog2;