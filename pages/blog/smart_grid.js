import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from './data-loss.module.css';
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

    const postId = 6;

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
                .from('blog_votes')
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
                .from('blog_votes')
                .select('*')
                .eq('post_id', postId)
                .eq('vote_type', 'upvote');

            const { data: downvoteData, error: downvoteError } = await supabase
                .from('blog_votes')
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
            .from('blog_comments')
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
                .from('blog_votes')
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
                        .from('blog_votes')
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
                    .from('blog_votes')
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
            .from('blog_comments')
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
                    <h1 className={styles.pageTitle}>Smart Grids and Renewable Energy</h1>
                    <p className={styles.pageSubtitle}>How Tech Is Enabling Efficient Energy Distribution                    </p>
                    <p className={styles.pageauthor}>
                        By <a className={styles.authorLink} href="https://www.linkedin.com/in/shreya-more-284869321/" target="_blank" rel="noopener noreferrer">Shreya More </a>
                         | March 24, 2025
                    </p>
                    <div className={styles.blogDescription}>
                        
                        <div className={styles.blogCard}>
                            <p>
                            Rising fuel prices and overreliance on fossil fuels have led to a global energy crisis, straining supply and demand while impacting economies and the environment. This crisis underscores the urgent need for renewable energy and efficient energy distribution to meet growing demand and technological advancements. One key innovation that is emerging as a game-changer in this crisis is smart grid technology.
                            A smart grid is a digitalized electrical system that enables two-way communication, optimizing production, distribution, and consumption of electricity. Unlike traditional grids, it integrates renewable energy sources , IoT, and real-time monitoring, allowing automated issue detection and self-healing, reducing outages and enhancing efficiency.
                            </p>
                            

                        </div>

                        <div className='content-section'>
                            <div className={styles.blogCard}>
                            <div className={styles.imageGallery}>
                                    <Image src="/smartgrid.jpg" alt="Smart grid" width={500} height={300} className={styles.blogImage} />
                            </div>
                                <p>
                                The above picture illustrates the integration of smart grid and renewable energy sources which helps in balancing the supply and demand of energy .Solar panels and wind turbines generate electricity from renewable sources, reducing reliance on fossil fuels.The energy produced is fed into the smart grid, either directly supplying power to consumers or being stored for later use.  Since renewables are intermittent , the smart grid balances supply and demand by integrating storage systems and real-time adjustments. Large-scale battery storage systems store excess energy generated from renewables. When supply is higher than demand, surplus energy is stored. When demand increases, stored energy is released into the grid.  This reduces energy waste and ensures a steady power supply even when renewable generation is low. The image shows an electric car and a bus plugged into the grid, indicating V2G technology, where electric vehicles can draw power or return excess power to the grid. This helps stabilize the grid and encourages sustainable transportation.   The power plant represents conventional energy generation, still essential for ensuring grid stability. The grid distributes electricity from both renewable and conventional sources, ensuring a stable power supply. By integrating renewables with traditional power, the smart grid optimizes energy use, reducing costs and emissions. Data flows between power sources, storage, EVs, and consumers, enabling automated balancing and outage detection. The system dynamically adjusts energy flow, preventing overloads and minimizing downtime.
                                </p>
                            </div>
                        </div>

                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <p>
                                    The Government of Thailand has announced a USD1.8 billion agreement with Gorilla Technology Group to implement an AI-driven smart grid initiative over 15 years. Gorilla’s predictive grid management system will improve energy flow and response times, while AI-based cybersecurity will provide real-time threat monitoring and encrypted communications.
                                    As the world moves toward a more sustainable future, the integration of renewable energy and smart grid technology is crucial in overcoming the challenges of the energy crisis. Smart grids not only improve the efficiency, reliability, and resilience of power systems but also enable the seamless incorporation of renewable energy sources, which are essential for reducing our carbon footprint and  to safeguard the mother earth .

                                </p>
                                <div className={styles.imageGallery}>
                                    <Image src="/smart grid.jpg" alt="Smart grid" width={500} height={300} className={styles.blogImage} />
                            </div>
                            </div>
                        </div>

                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <h2>Summary</h2>
                                <p>
                                The world is facing an energy crisis driven by rising fuel prices and environmental concerns. The transition to renewable energy and improved energy distribution is critical, with smart grids offering a key solution. Smart grids use digital technology to optimize electricity production and distribution, enabling real-time adjustments and better integration of renewable energy.
                                By managing renewable energy fluctuations, smart grids reduce reliance on storage solutions and improve efficiency. Thailand's USD1.8 billion smart grid initiative with Gorilla Technology highlights global efforts to enhance energy flow and security using AI. In the face of the energy crisis, integrating smart grids with renewable energy is essential for a sustainable, efficient future.

                                </p>
                            </div>
                        </div>

                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <h2>References</h2>
                                <ul>
                                    <li>
                                        <a href="https://www.renewableinstitute.org/training-courses/#:~:text=Hydrogen%20Energy,Study"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            Renewable Energy Management & Finance 
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.coursera.org/courses?query=renewable%20energy"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            Best renewable energy courses and certificates 
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

                <Link href="/blog" className={styles.backtoblog}>
                    Back to Blogs
                </Link>
            </div>
        </div>

    );
}

export default Blog6;