import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from './data-loss.module.css';
import supabase from '../../src/utils/supabase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Blog2() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [commenterName, setCommenterName] = useState('');
    const [deviceId, setDeviceId] = useState(null);
    const [vote, setVote] = useState(null);
    const [voteCounts, setVoteCounts] = useState({ upvotes: 0, downvotes: 0 });

    const postId = 2;

    const fetchVoteStatus = useCallback(async () => {
        if (!deviceId) return;
        
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
    }, [deviceId, postId]);

    const fetchComments = useCallback(async () => {
        if (!deviceId) return;
        
        try {
            const { data, error } = await supabase
                .from('blog_comments')
                .select('*')
                .eq('post_id', postId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setComments(data || []);
        } catch (error) {
            console.error('Error fetching comments:', error);
            toast.error('Failed to load comments');
        }
    }, [deviceId, postId]);

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
    }, [deviceId, fetchComments, fetchVoteStatus]);

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
                    <h1 className={styles.pageTitle}>Almost a Data Loss: The Security Breach We Overcame</h1>
                    <p className={styles.pageSubtitle}>An Inside Look at the Security Flaw That Nearly Wiped Our Data</p>
                    <p className={styles.pageauthor}>
                        By <a className={styles.authorLink} href="https://www.linkedin.com/in/aaryan-kumbhare-07428032a" target="_blank" rel="noopener noreferrer">Aaryan Kumbhare</a> | February 12, 2025
                    </p>

                    {/* Blog Content */}
                    <div className={styles.blogDescription}>
                        <div className={styles.blogCard}>
                            <h2><strong>Overview about I.R.I.S. Website.</strong></h2>
                            <p>
                                In today&apos;s dynamic and rapidly-evolving digital ecosystem, it is important for an organisation to set up their online presence, so that they can meet the growing demands of their audience and help in increasing the scale of their services. Deployment of a muscular and scalable website acts as a hub for the operations of an organisation, real-time updates about the work of the organisation, showcasing their services and a portal for communication with their customers. This helps in enhancing the user engagement, quality of services; eventually leading to the overall growth of the organisation.
                                <br />
                                <br />
                                I.R.I.S. website acts as a crucial platform for showcasing and promoting the club, engaging potential members and boosting club’s visibility on our campus. Our website serves as a hub for all our activities, events, announcements and important details, while also talking about the past events, activities and showcasing club’s achievements. It also serves as a networking portal for connecting with the members, mentors and the alumni, while enhancing the communication through engaging podcasts.
                                <br />
                                <br />
                                The website also serves as a platform for all our event registrations and online payments, something which we would be discussing in depth in the upcoming sections!
                            </p>
                        </div>
                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <h2><strong>Let’s start with the main point:</strong></h2>
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
                                    Let&apos;s take a deep dive into the same!!
                                </p>
                            </div>
                        </div>
                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <h2><strong>What caused the issue?</strong></h2>
                                <p>
                                    Our team created and deployed the I.R.I.S. website for registrations and payments of our upcoming event in September, the I.R.I.S. Innovation Hackathon.
                                    So as discussed above, our website used Supabase SQL in the backend for storage of user data and payment details.
                                    To prevent unauthorised access, Supabase SQL uses Row Level Security (RLS) features, which were initially enabled by our team.
                                    RLS features in SQL allows users to control which user or roles can access specific data in a table. RLS works by filtering rows based on the execution context of the query, rather than the current user access rights.
                                    However, with RLS enabled, data wasn&apos;t being saved, so the team decided to disable it temporarily, assuming that they could bypass security for a college-level event and address the same after the registration phase.
                                    And yes, you must have guessed it by now!
                                    This decision left our database unintentionally vulnerable, potentially allowing anyone to add, edit or delete data entries from our database!
                                </p>
                                <h3>How we identified the issue and our story&apos;s white hat:</h3>
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
                        </div>
                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <h2><strong>Conclusion</strong></h2>
                                <p>
                                    To sum it up, even a small mistake can also offer you a lot of lessons. As we read in the quote a few sections above, mistakes and problems are an opportunity for improvement and growth, which goes along pretty well with our example! The incident helped the team to emphasise more on security and building a more robust and reliable website for our users.
                                    <br />
                                    Thanks to our peer&apos;s timely alert, we were able to identify the vulnerability, and make the changes accordingly.
                                    This also teaches us about the necessity of networking and reaching out to people who may be facing issues they are unaware of.
                                    <br />
                                    <br />
                                    <span style={{ textDecoration: 'underline' }}>You never know when your contributions might have a greater impact, solving problems with huge potential risks for a greater good!!</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Voting Section */}
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

                    {/* Comments Section */}
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
