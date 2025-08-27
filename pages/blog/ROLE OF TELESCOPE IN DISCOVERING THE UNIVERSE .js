import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from './data-loss.module.css';
import supabase from '../../src/utils/supabase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

function Blog9() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [commenterName, setCommenterName] = useState('');
    const [deviceId, setDeviceId] = useState(null);
    const [vote, setVote] = useState(null);
    const [voteCounts, setVoteCounts] = useState({ upvotes: 0, downvotes: 0 });

    const postId = 6;

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
                    <h1 className={styles.pageTitle}>ROLE OF TELESCOPE IN DISCOVERING THE UNIVERSE </h1>
                    <p className={styles.pageSubtitle}>The Telescope: Humanity’s Window to the Universe                  </p>
                    <p className={styles.pageauthor}>
                        By <a className={styles.authorLink} href="https://www.linkedin.com/in/shreya-more-284869321/" target="_blank" rel="noopener noreferrer">Shreya More </a>
                        | March 24, 2025
                    </p>
                    <div className={styles.blogDescription}>

                        <div className={styles.blogCard}>
                            <p>
                                Have you ever stared into the night sky and wondered what lies beyond those shimmering stars?
                                What if I told you that with the right lens, we could unlock time itself, glimpse the birth of galaxies, and witness the dance of planets hundreds of light-years away?
                                Stars shine like forgotten memories, etched across the dark canvas of the night sky. They’re billions of years old, glittering from distances our minds can hardly comprehend. The universe they belong to is so vast and intricate, it often feels out of reach. But then comes the telescope—our quiet companion in exploration—bringing the distant closer and turning points of light into portals of discovery.
                                Welcome to the world of telescopes—where science meets wonder, and curiosity becomes a cosmic adventure. The telescope isn’t just a tool. It’s humanity’s gateway to the great unknown.

                                
                            </p>
                        </div>

                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <h2>The Birth of a New Perspective</h2>
                                <p>
                                    Back in 1609, Galileo Galilei aimed a modest telescope at the sky. What he saw changed everything. He observed craters on the Moon, moons orbiting Jupiter, and countless stars packed into the Milky Way—revealing that the universe was not static or perfect, but dynamic and alive.
                                    Galileo’s telescope cracked open the door to a new era. One where curiosity and science began to replace superstition, and where humans started to seek truth in the stars.
                                </p>
                                <div className={styles.imageGallery}>
                                    <Image src="telescope.jpg" alt="Telscope" width={500} height={300} className={styles.blogImage} />
                                </div>
                            </div>
                        </div>
                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <h2>An Evolution of Vision</h2>
                                <p>
                                    Since then, telescopes have evolved beyond what Galileo could have imagined. Today, they’re not just confined to observatories. Some orbit Earth, like the iconic Hubble Space Telescope. Others, like the massive Keck Observatory in Hawaii, sit atop mountains. And now, with the James Webb Space Telescope, we’re peering deeper than ever—seeing light from galaxies that formed shortly after the Big Bang.
                                    Modern telescopes don’t just rely on visible light. They capture X-rays, infrared waves, and even radio signals—each revealing a different layer of the cosmos. It’s like peeling back the universe one wavelength at a time.

                                </p>
                                
                            </div>
                        </div>
                         <div className='content-section'>
                            <div className={styles.blogCard}>
                                <h2>A Cosmic Storyteller</h2>
                                <p>
                                    Every telescope tells a story. Some show clouds of gas where stars are born, while others reveal the fiery deaths of suns. They track gravity bending light, confirming Einstein’s predictions, and scan the skies for exoplanets—worlds that might one day host life.
                                </p>
                                <div className={styles.imageGallery}>
                                    <Image src="telescope2.jpg" alt="Telscope" width={500} height={300} className={styles.blogImage} />
                                </div>
                                <p>
                                    These discoveries reshape how we see the universe—and ourselves. They remind us how small we are, yet how powerful our questions can be.
                                </p>
                            </div>
                        </div>
                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <h2>Inspiration Through a Lens</h2>
                                <p>
                                    We believe telescopes don’t just stretch our view outward—they stretch our thinking inward. Looking at Saturn’s rings or the glow of a faraway galaxy isn’t just science—it’s wonder.
                                    Whether you’re a student, a scientist, or a dreamer, the telescope stands as a symbol of what’s possible. It whispers to us: there’s always more to discover, always another mystery waiting in the stars.


                                </p>
                                
                            </div>
                        </div>
                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <h2>SUMMARY</h2>
                                <p>
                                   Telescopes have revolutionized our understanding of the universe, unveiling distant galaxies, stars, and cosmic events. From Galileo’s first lens to the James Webb Space Telescope, they’ve expanded our vision and curiosity, making the invisible visible. They are more than tools—they’re storytellers of the cosmos and gateways to infinite discovery.

                                </p>
                                
                            </div>
                        </div>


                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <h2>References</h2>
                                <ul>
                                    <li>
                                        <a href="https://www.nasa.gov"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            •	NASA (2024). Hubble Space Telescope Mission Overview. Retrieved from 
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.cfa.harvard.edu"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            •	Harvard-Smithsonian Center for Astrophysics. (2024). Exploring the Universe. 
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://webb.nasa.gov"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            •	James Webb Space Telescope – NASA Official Site
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <h2>BOOKS FOR REFRENCES </h2>
                                <p>
                                    •	Greene, B. (2004). The Fabric of the Cosmos. Vintage Books.
                                    •	Sagan, C. (1980). Cosmos. Random House.
                                    •	Richard Dunn. The Telescope: A Short History


                                </p>
                                
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

export default Blog9;