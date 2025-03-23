import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from './nanotech.module.css';
import supabase from '../../src/utils/supabase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

function Blog6() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [commenterName, setCommenterName] = useState('');
    const [deviceId, setDeviceId] = useState(null);
    const [vote, setVote] = useState(null);
    const [voteCounts, setVoteCounts] = useState({ upvotes: 0, downvotes: 0 });

    const postId = 4;

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
        if (deviceId) {
            console.log('Current Device ID:', deviceId);
            fetchComments();
            fetchVoteStatus();
        }
    }, [deviceId]);

    const fetchVoteStatus = async () => {
        try {
            const { data: voteData, error: voteError } = await supabase
                .from('votes')
                .select('vote_type')
                .eq('device_id', deviceId)
                .eq('post_id', postId)
                .single();

            if (voteError && voteError.code !== 'PGRST116') {
                console.error('Error fetching vote status:', voteError);
            } else {
                setVote(voteData?.vote_type || null);
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
                setVoteCounts({
                    upvotes: upvoteData?.length || 0,
                    downvotes: downvoteData?.length || 0
                });
            }
        } catch (error) {
            console.error('Error in fetchVoteStatus:', error);
        }
    };

    const fetchComments = async () => {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('post_id', postId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching comments:', error);
        } else {
            setComments(data || []);
        }
    };

    const handleVote = async (voteType) => {
        try {
            if (!deviceId) {
                toast.error('Unable to vote at this time');
                return;
            }

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
                    toast.info('You have already voted!');
                    return;
                } else {
                    const { error: updateError } = await supabase
                        .from('votes')
                        .update({ vote_type: voteType })
                        .eq('post_id', postId)
                        .eq('device_id', deviceId);

                    if (updateError) {
                        console.error('Error updating vote:', updateError);
                        return;
                    }

                    toast.success(`Vote changed to ${voteType}!`);
                    setVote(voteType);
                }
            } else {
                const { error: insertError } = await supabase
                    .from('votes')
                    .insert({
                        post_id: postId,
                        vote_type: voteType,
                        device_id: deviceId
                    });

                if (insertError) {
                    console.error('Error inserting vote:', insertError);
                    return;
                }

                toast.success(`Successfully ${voteType}d!`);
                setVote(voteType);
            }

            await fetchVoteStatus();
        } catch (error) {
            console.error('Error in handleVote:', error);
            toast.error('Error processing vote');
        }
    };

    const handleCommentSubmit = async () => {
        if (!newComment || !commenterName) {
            toast.error('Please enter your name and comment!');
            return;
        }

        const { error } = await supabase
            .from('comments')
            .insert({
                post_id: postId,
                username: commenterName,
                comment: newComment,
                device_id: deviceId,
            });

        if (error) {
            console.error('Error submitting comment:', error);
            toast.error('Failed to submit comment!');
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
                    <h1 className={styles.pageTitle}>Next-Generation Space Probes: Autonomous Robots Exploring the Outer Solar System</h1>
                    {/* <p className={styles.pageSubtitle}>Revolutionizing Defense: The Power of Nanotechnology in Military Advancements</p> */}
                    <p className={styles.pageauthor}>
                        By <a className={styles.authorLink}>Aakanksha Pansare & Nishtha Mandaliya</a> | March 24, 2025
                </p>
          
                    <div className={styles.blogDescription}>
                        <div className={styles.blogCard}>
                            <h4>&ldquo;Imagine a fleet of intelligent robots, soaring through space, navigating icy moons around shiny stars, and diving into alien oceans filled with meteors of various sizes. Do you think it's the story line of a science fiction movie? Then let me dive you through the future of cosmic universe&rdquo;</h4>
                            {/* <h4> — Bill Gates</h4> */}
                        </div>

                        <div className={styles.blogCard}>
                            <h2>Advantages of Next gen space probes over traditional methods:</h2>
                            <p>
                            The exploration of the outer solar system has always been a major challenge due to vast distances, harsh environments, and communication delays. Traditional space probes rely on commands from Earth, which can take hours to transmit. However, the next generation of space probes will incorporate artificial intelligence (AI) and autonomous decision-making, allowing them to navigate, analyze, and adapt to their surroundings on their own.                         
                            </p>
                        </div>
                        <div className={styles.blogCard}>
                            <p>
                            Current few space probes are also working with the help of advanced technologies like advanced propulsion systems (like plasma rockets or nuclear propulsion) for faster transit and more efficient space travel. 
                            A few notable disadvantages of traditional methods that are overcome by AI space probes are:
                            </p>
                        </div>

                        <div className={styles.blogCard}>
                            <h3>Communication Delays</h3>
                            <p>
                            Real-time control becomes unfeasible as signals take hours to travel between Earth and the probe.                              </p>
                        </div>
                        <div className={styles.blogCard}>
                            <h3>Harsh Environments</h3>
                            <p>
                            Probes and landers are at risk because of severe cold, vigorous radiation, and harsh landscapes.
                            </p>
                        </div>
                        <div className={styles.blogCard}>
                            <h3>Limited Energy Sources</h3>
                            <p>
                            Effecient energy budgetting is absolutely imperative, as solar energy is deficient in the out regions of the solar system.
                            </p>
                        </div>
                        <div className={styles.blogCard}>
                        <div className={styles.imageGallery}>
                                <Image src="/space-probes1.png" alt="Space Probes" width={500} height={300} className={styles.blogImage} />
                            </div>
                        </div>
                        {/* <div className={styles.blogCard}>
                            <p>
                                In conclusion, nanotechnology in defense offers groundbreaking advancements in materials, weapons, communication, and healthcare. Its applications, from enhanced armor to improved medical care, are transformative. However, ethical and security concerns must be addressed to ensure responsible deployment.
                            </p>
                            <div className={styles.imageGallery}>
                                <Image src="/nanotech1.png" alt="TARZAN Simulation" width={500} height={300} className={styles.blogImage} />
                                <Image src="/nanotech2.png" alt="TARZAN Chassis" width={500} height={300} className={styles.blogImage} />
                            </div>
                        </div> */}
                        <div className={styles.blogCard}>
                            <h3>Examples of Current and Future Probes:</h3>
                            <p>
                            1.	Interstellar Probe:
                             they are designed to enter the interstellar space which is beyond the heliosphere (the region where the sun's magnetic field dominates).
                            <br />
                            2.	Voyager 1 and 2: 
                            they are already launched and are considered as the pioneer of interstellar probes as it has already entered interstellar space.
                            <br />
                            3.	New Horizons:
                            It was launched in 2006, and it is still  exploring the Kuiper belt on outer reached of solar system. 
                            <br />
                            4.	4. Parker Solar Probe:
                            It was launched in 2018. This spacecraft is gravitationally driven even closer to the sun with the help of seven flybys of Venus.

                            </p>
                        </div>
                        <div className={styles.blogCard}>
                            <h3>Key advancements in Autonomous robots are as follows:</h3>
                            <p>
                            AI-Based Navigation : Autonomous probes will use machine learning to map unknown terrain and avoid obstacles in real time (NASA, 2023).  
                            <br />
                            <br />
                            Autonomous Sample Collection : Robotic explorers will independently select and analyze samples, prioritizing important discoveries (ESA, 2022).  
                            <br />
                            <br />                            
                            Self-Repair and Adaptability :Probes will be equipped with diagnostics and self-repair mechanisms to extend their lifespan in harsh environments (National Academies of Sciences, 2021).  
                            </p>
                        </div>
                        <div className={styles.blogCard}>
                            <h3>Upcoming Missions and Future Prospects</h3>
                            <p>
                            Several upcoming missions are pushing the boundaries of autonomous exploration:  
                            <br />
                            <br />
                            Europa Clipper (NASA, 2024–2030): Aims to study Jupiter’s moon Europa, searching for potential habitability and subsurface oceans.  
                            <br />
                            JUICE (ESA, 2023–2034): The Jupiter Icy Moons Explorer will explore Ganymede, Callisto, and Europa with advanced autonomous systems.
                            <br />
                            Dragonfly (NASA, 2027–2035): A drone-like lander set to explore Titan’s complex chemistry and potential for life.  
                            <br />
                            <br />

                             space exploration is improving with modern advancements within AI and autonomous robotics. Future probes will be more efficient and self sufficient because they will be able to navigate, analyze, and conduct repairs without the need for human input.
                             As technology progresses further, there will be a greater reliance on autonomous systems to help us solve the enigmas of our solar system and beyond.
                            </p>
                            <Image src="/space-probes2.jpg" alt="Space Probes" width={500} height={300} className={styles.blogImage} />
                        </div>
                        <div className={styles.blogCard}>
                            <h2>Summary</h2>
                            <p>
                            Are you ready to explore cosmosic universe filled with robots that can make their own decision? This ain't any imagination! It's a reality that is breaking all boundaries and revealing the secrets to the most complex mysteries ever known!
                            Traditional probes in use are complex and tedious for deep space missions because they need constant inputs from Earth; which is nearly impossible due to the harsh environment, communication delays and limited power resources. 
                            The future of space exploration will be defined by intelligent, autonomous robots which are capable of making decisions without human assistance.
                            </p>
                        </div>

                        <div className={styles.blogCard}>
                            <h2>References</h2>
                            <ul>
                                <li>
                                    <a href="https://www.nasa.gov"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        NASA. (2023). Artificial Intelligence in Space Exploration. Retrieved from 
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.esa.int"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        ESA. (2022). JUICE Mission Overview. Retrieved from 
                                    </a>
                                </li>
                                <li>
                                    <a>
                                    National Academies of Sciences. (2021). Autonomous Systems in Space Exploration: A Future Perspective. Washington, DC: The National Academies Press.                                      </a>
                                </li>
                            </ul>
                        </div>

                    <div className='content-section'>
                        <div className={styles.blogCard}>
                            <h2>Free Resources</h2>
                            <ul>
                                <li>
                                    <a href="https://www.slideshare.net/slideshow/nanotechnology-in-defence-applications/16066727"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        Nanotechnology in Defence applications
                                    </a>
                                </li>
                                <li>
                                    <a href="https://ftp.idu.ac.id/wp-content/uploads/ebook/tdg/MILITARY%20PLATFORM%20DESIGN/Military%20Nanotechnology.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        Military Nanotechnology
                                    </a>
                                </li>
                            </ul>
                        </div>
                        </div>
                    </div>

                    <div className={styles.voteSection}>
                        <button onClick={() => handleVote('upvote')} className={`${styles.voteButton} ${vote === 'upvote' ? styles.active : ''}`}>
                            ▲ Upvote ({voteCounts.upvotes})
                        </button>

                        <button onClick={() => handleVote('downvote')} className={`${styles.voteButton} ${vote === 'downvote' ? styles.active : ''}`}>
                            ▼ Downvote ({voteCounts.downvotes})
                        </button>
                    </div>

                    <div className={styles.commentSection}>
                        <h3 className={styles.commentTitle}>Comments</h3>
                        <div className={styles.commentList}>
                            {comments.length === 0 ? (
                                <p>No comments added yet.</p>
                            ) : (
                                comments.map((comment) => (
                                    <div key={comment.id} className={styles.comment}>
                                        <p><strong>{comment.username}</strong>: {comment.comment}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        <h3 className={styles.commentTitle}>Add your Comment</h3>
                        <input type="text" placeholder="Your Name" value={commenterName} onChange={(e) => setCommenterName(e.target.value)} className={styles.commentInput} />
                        <textarea placeholder="Write a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} className={styles.commentInput} />
                        <button onClick={handleCommentSubmit} className={styles.commentSubmitButton}>Submit Comment</button>
                    </div>
                </main>
            </div>
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="dark" />
            <div className={styles.centerContainer}>
                <Link href="/blog" className={styles.backtoblog}>Back to Blogs</Link>
            </div>
        </div>
    );
}

export default Blog6;
