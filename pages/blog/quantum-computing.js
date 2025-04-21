import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from './trad.module.css';
import supabase from '../../src/utils/supabase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

function Blog7() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [commenterName, setCommenterName] = useState('');
    const [deviceId, setDeviceId] = useState(null);
    const [vote, setVote] = useState(null);
    const [voteCounts, setVoteCounts] = useState({ upvotes: 0, downvotes: 0 });

    const postId = 7;

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
                    <h1 className={styles.pageTitle}>Introduction to Quantum Computing</h1>
                    <p className={styles.pageauthor}>
                        By <a className={styles.authorLink} href="https://www.linkedin.com/in/aaryan-kumbhare-07428032a" target="_blank" rel="noopener noreferrer">Aaryan Kumbhare</a> | February 12, 2025
                    </p>
                    {/* Blog Content */}
                    <div className={styles.blogDescription}>
                        <div className={styles.blogCard}>
                            <h2><strong>Introduction:</strong></h2>
                            <p>
                                Technology has become an inevitable part of our lives. It is an industry which has kept evolving and keeps evolving. From the very beginning, the aim of technology was to make our lives easier. <br />One thing led to another and here we are today! One such creation of the human mind was the computer. The primary purpose of early computers was to perform complex calculations and process large amounts of data more quickly than what we humans could. We have all sorts of computers today, from personal computers to supercomputers. <br />But as time is progressing, we are somewhere approaching the limits of classical computing. Some extreme problems today require immense computational power, something where the classical computers struggle. This is where Quantum Computing comes into the picture. <br />Being the 1st part in our series of Quantum Computing, in the later sections, we are going to take a dive into what quantum computing is, its history, modern state, industry leaders, and other things we need to know while getting into it!
                            </p>
                        </div>
                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <h2><strong>What is quantum computing?</strong></h2>
                                <p>
                                    The widely accepted definition of quantum computing is, &quot;Quantum computing is a type of computation that utilizes quantum-mechanical phenomena, such as superposition and entanglement, to perform operations on data&quot;.
                                    <br />
                                    <br />
                                    The major difference between classical computing and quantum computing lies in the architecture, in the low level. Unlike classical computers, which rely on bits (0s and 1s), quantum computers rely on quantum bits or qubits, which have the ability to exist in multiple states simultaneously. This allows quantum computers to perform complex computations faster than traditional computers.
                                    <br />
                                    <br />

                                    Quantum computing relies on several principles from quantum mechanics, such as superposition, entanglement, decoherence, inference, etc. Understanding these is a necessary prerequisite before getting into quantum computers.
                                    <br />
                                    <br />

                                    A Qubit is a fascinating concept in itself.                                     <br />
                                    A qubit is the basic unit of information in quantum computing. As said above, qubits can exist in multiple states simultaneously, this is known as superposition. One simple example to get an idea about its immense power is:
                                    As classical bits can either be 0 or 1 at an instant. 4 such bits can be in one of 2^4 different configurations at a time, i.e., 1 from the 16 possible configurations. But, when we consider 4 qubits in superposition, it can be in all of those 16 possible combinations at once, allowing quantum computers to parallelly process multiple calculations at a larger scale.
                                    <br />
                                    <br />

                                    Just like superposition, entanglement is another key quantum principle which is important for the working of quantum computers. Entanglement enables stronger correlations between qubits, allowing faster computations and increased parallelism.
                                    <br />
                                    <br />

                                    Decoherence is when the quantum state collapses into a non quantum state, allowing the quantum computers to interact with the classical computers.
                                    <br />

                                    Interference is one more important concept required to understand the foundations. It refers to manipulating quantum states to perform calculations, amplify correct solutions, and suppress the incorrect ones, resulting in better computations and efficiency.

                                </p>
                            </div>
                        </div>
                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <h2><strong>History of quantum computers.</strong></h2>
                                <p>
                                    The history of quantum computing dates back to the 1980s, although the years before, which included the development of quantum mechanics, and tons of different scientists and their contributions, can be considered as the pre-history of quantum computing!
                                    <br /><br />
                                    Here, we will discuss the various scientists, companies, and the research breakthroughs which have shaped how we look at quantum computing today.
                                    <br /><br />
                                </p>
                                    <Image src="/qm3.jpg" alt="Quantum Computing Summary" width={500} height={300} className={styles.blogImage} />
                                <p>
                                    <br /><br />
                                    Paul Benioff, an American physicist, proposed a quantum mechanical model of the Turing Machine.
                                    <br />
                                    Richard Feynman, an American theoretical physicist, popularized the idea of &quot;quantum computing&quot;, in 1981.
                                    <br />
                                    David Deutsch, a British physicist, in 1985, published a groundbreaking research paper, talking about the concept of &quot;universal quantum computer&quot;. He wrote about how quantum computers could operate, and demonstrated that they have the capability to perform any computation. His work laid the foundation for the developments of quantum algorithms.
                                    <br />
                                    The next decade from here onwards, included the development of various algorithms, such as Deutsch–Jozsa algorithm (1992), Shor&apos;s algorithm (1994), Simon&apos;s algorithm (1994), Grover&apos;s algorithm (1996).
                                    <br />
                                    In the year of 1998, the 1st two-qubit quantum computer was demonstrated by a team led by Isaac Chuang at Los Alamos National Laboratory, MIT and UC Berkeley.
                                    <br />
                                    In 2000, researchers at MIT and Los Alamos National Laboratory demonstrated a 7-bit quantum computer using nuclear magnetic resonance (NMR) techniques.
                                    <br />
                                    In 2001, IBM and Stanford successfully implemented the Shor&apos;s algorithm on a 7-bit quantum computer.
                                    <br />
                                    In 2007, D-Wave claimed to have built the first commercial quantum annealer, D-Wave One. They sold their first quantum computer to Lockheed Martin in 2011.
                                    <br /><br />
                                    There have been multiple other advancements that we can talk about, but we will keep it till here, as these cover up the majority of the history.
                                </p>
                            </div>
                        </div>
                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <h2><strong>Modern day quantum computers and industry leaders</strong></h2>
                                <p>
                                    Talking about the major modern day quantum computers and processors, these include:
                                    <br /><br />
                                </p>
                                    <Image src="/qm2.jpg" alt="Quantum Computing Summary" width={500} height={300} className={styles.blogImage} />
                                <p>
                                    <br /><br />
                                    Google Sycamore (2019), a 53 qubit quantum computer, that achieved quantum supremacy.
                                    <br />
                                    Jiuzhang (2020), the first photonic quantum computer to claim quantum supremacy.
                                    <br />
                                    IBM Eagle (2021).
                                    <br />
                                    IBM Condor (2023).
                                    <br />
                                    QuEra Aquila (2023), a 256-qubit neutral atom quantum computer.
                                    <br />
                                    Atom Computing&apos;s Phoenix (2024, 1225-qubits).
                                    <br /><br />
                                    Some of the major players in this industry today are: Google, Microsoft, IBM, Quantinuum, D-Wave, Atom Computing, etc.
                                    <br /><br />
                                    Some of the astonishing and mind-boggling advancements and developments in the recent time include:
                                    <br />
                                    Google&apos;s Willow (2024). This is one of the fastest quantum processors as of today. According to its benchmark scores, it performed a computation in less than 5 minutes, which would take today&apos;s fastest supercomputers over 10 Septillion years to compute! This also somewhere gives evidence to the idea of us living in a multiverse, first proposed by David Deutsch, that the quantum computations occur in parallel universes!
                                    <br />
                                    Microsoft&apos;s Majorana 1 chip (2025): this chip utilizes topological qubits based on Majorana particles, helping in increasing stability of qubits and scalability.
                                </p>
                            </div>
                        </div>
                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <h2><strong>Conclusion</strong></h2>
                                <p>
                                    Being an introductory article, we have just covered about the basics of quantum computing, the various scientists, researchers and industry leaders involved with the development of the foundations and the modern day quantum computing. There are a lot of things which we will be covering in the upcoming parts in this series, so make sure to stay around!
                                </p>
                            </div>
                        </div>
                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <h2><strong>Summary</strong></h2>
                                <p>
                                    Quantum computing is revolutionizing the tech world by leveraging quantum-mechanical phenomena like superposition and entanglement to perform complex computations far faster than classical computers. Key milestones in quantum computing&apos;s history include the development of algorithms and the first demonstrations of quantum computers in the 1990s. Major players like Google, IBM, and Microsoft are pushing the boundaries of quantum computing with groundbreaking technologies, such as Google&apos;s Willow and Microsoft&apos;s Majorana 1 chip, promising unimaginable computational power for the future.
                                </p>
                                <Image src="/qm1.jpg" alt="Quantum Computing Summary" width={500} height={300} className={styles.blogImage} />
                            </div>
                        </div>
                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <h2><strong>Resources to study more!</strong></h2>
                                <ul>
                                    <li><a href="https://www.ibm.com/quantum" target="_blank" rel="noopener noreferrer">Quantum Computing - IBM</a></li>
                                    <li><a href="https://en.wikipedia.org/wiki/Quantum_computing" target="_blank" rel="noopener noreferrer">History of Quantum Computing</a></li>
                                    <li><a href="https://en.wikipedia.org/wiki/Quantum_superposition" target="_blank" rel="noopener noreferrer">Quantum Superposition</a></li>
                                    <li><a href="https://royalsocietypublishing.org/doi/10.1098/rspa.1985.0070" target="_blank" rel="noopener noreferrer">David Deutsch - 1985</a></li>
                                    <li><a href="https://blog.google/technology/ai/google-quantum-ai-willow-qpu/" target="_blank" rel="noopener noreferrer">Google&apos;s Willow</a></li>
                                    <li><a href="https://www.microsoft.com/en-us/research/blog/majorana-zero-modes-enhance-coherence-times-in-superconducting-quantum-devices/" target="_blank" rel="noopener noreferrer">Microsoft&apos;s Majorana 1 Chip</a></li>
                                    <li><a href="https://skillsbuild.org/students/quantum" target="_blank" rel="noopener noreferrer">IBM SkillsBuild</a></li>
                                </ul>
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

export default Blog7;
