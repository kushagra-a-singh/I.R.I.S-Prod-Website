import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from './trad.module.css';
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

    const postId = 9;

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
    }, [postId, deviceId]);

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
    }, [postId, deviceId]);

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
                    <h1 className={styles.pageTitle}>Quantum Computing Part-2</h1>
                    <p className={styles.pageauthor}>
                        By <a className={styles.authorLink} href="https://www.linkedin.com/in/aaryan-kumbhare-07428032a" target="_blank" rel="noopener noreferrer">Aaryan Kumbhare</a> | 2025
                    </p>
                    {/* Blog Content */}
                    <div className={styles.blogDescription}>
                        <div className={styles.blogCard}>
                            <h2><strong>Introduction:</strong></h2>
                            <p>
                                In the previous blog, we talked about what is quantum computing on a basic level, what are the various terms from quantum mechanics involved, the pioneers of the technology and the leaders in the industry. <br/> In this blog, we will be digging into HOW exactly it works along with the various applications of the same in various non-technical areas!
                            </p>
                        </div>
                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <h2><strong>Recap of our previous blog</strong></h2>
                                <p>
                                    So let us take a recap of what we read in the previous segment. We learnt about:
                                    <br />
                                    <br />
                                    1. Qubits, the core of quantum computers. Classical computing relies on bits, i.e., 0s and 1s. Quantum Computing relies on qubits, because they have the capabilities to exist in multiple states simultaneously.
                                    <br />
                                    <br />

                                    2. Quantum mechanics prerequisites: concepts such as superposition, entanglement, decoherence and interference.
                                    <br />
                                    <br />
                                    <Image src="/qb.jpg" alt="Quantum Computing Summary" width={500} height={300} className={styles.blogImage} />
                                </p>
                            </div>
                        </div>
                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <h2><strong>Diving into the quantum mechanics behind quantum<br/>computing and how they work together</strong></h2>
                                <p>
                                    Firstly, we will be diving deeper into how the 4 of the concepts mentioned above are related to each other and form the functioning of a quantum computer.
                                    <br /><br />
                                    Superposition is the principle which allows qubits to exist in multiple states simultaneously. This basically helps in increasing the number of calculations per unit time, i.e., a higher computational capacity. A fun hypothetical example can be taking a pair of dice into consideration. When rolling the both at the same time, you will only get a single output on the both, i.e., only a single pair out of the 36 possibilities. But, suppose you roll the pair and get all the 36 possible outputs, imagine that! That is exactly how quantum bits work!
                                    <br /><br />
                                    The second principle is entanglement. As the name suggests, it has something to do with qubits intertwining together!
                                    <br /><br />
                                    It is basically a phenomenon in which 2 or more qubits are strongly linked together. In other words, we can also say that it&apos;s  a state when qubits share a single quantum state. This is why, if we measure the state of one entangled qubit, we directly know the state of the others correlated to it.
                                    <br /><br />
                                    Suppose if there are many quantum bits entangled together in a complex solution space, it is this phenomenon which helps this flock to work together and break down the problem and narrow down to an optimal solution.
                                    <br /><br />
                                </p>
                                    <Image src="/inf.jpg" alt="Quantum Computing Summary" width={500} height={300} className={styles.blogImage} />
                                <p>
                                    <br /><br />
                                    Moving on to the next concept, Interference. If you are a science student, you must have studied about a similar concept with the same name in optics and sound waves! But to keep it simple, we can think of quantum interference as the ability of different coexisting quantum states to cancel out each other, reinforce the right solution and cut off the wrong ones. We can say that it is the amplification of the correct response. This is how quantum computers reach more efficient solutions, by allowing the responses to guide each other!
                                    <br /><br/>
                                </p>
                                    <Image src="/coh.jpg" alt="Quantum Computing Summary" width={500} height={300} className={styles.blogImage} />
                                <p>
                                    Decoherence is the last of the 4 concepts. It is basically when the quantum system loses its quantum state, and behaves more like a classical system. This somewhere ruins the computations. This happens when the systems interact with their environments. This can be a major problem and quantum systems being sensitive, its important to prevent it from happening.
                                    <br /><br/>
                                </p>
                            </div>
                        </div>
                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <h2><strong>Quantum Gates, Algorithms and Speedup</strong></h2>
                                <p>
                                    Now, let us move onto the next concepts, i.e., quantum logic gates and algorithms.
                                    <br /><br />
                                </p>
                                    <Image src="/vec.jpg" alt="Quantum Computing Summary" width={500} height={300} className={styles.blogImage} />
                                <p>
                                    <br /><br />
                                    Quantum logic gates (quantum gates in short) are the building blocks of the quantum circuits, just like how logic gates are the fundamentals of classical computers. The quantum bits are useless if there are no calculations going on! The quantum gates allow/manipulate quantum qubits to perform the fundamental operations like superposition and entanglement.
                                    <br /><br/>
                                    Mathematically speaking, quantum gates are represented as unitary matrices (a complex square matrix whose inverse is equal to its transpose).
                                    <br /><br/>
                                    There are different types of quantum gates.They are classified upon how many qubits they are acting upon.
                                    <br /><br/>
                                    There are single qubit gates which act on a single qubit at a time. By rotating a qubit on the Bloch sphere (shown in the above figure), they bring about a change in its state, i.e., superposition. On the other hand there are two-qubit gates, which act upon two qubits at a time creating entanglement. 
                                    <br /><br/>
                                    Some of the most common quantum gates are as follows:<br/>1. The Pauli Gates (act along the axes on Bloch sphere).<br/>2. Hadamard Gate (create superposition).<br/>3. Phase Gates (responsible for phase shifts).<br/>4. Controlled - NOT Gate.<br/>5. Toffoli Gate.<br/>6. Swap Gate.<br/>7. Rotation Gates (rotate the qubits in their respective axes).
                                    <br /><br/>
                                    Moving on to quantum algorithms.
                                    <br />
                                    These are the algorithms which are designed for quantum gates and qubits to solve problems more efficiently then classical computers.
                                    <br />
                                    Some of the most popular quantum algorithms are the ones which built the foundations and were significant moments in the history of this technology, which we also covered in our previous segment. Some of these are: 
                                    <br />
                                    1. Deutsch-Jozsa Algorithm.<br/>2. Shor&apos;s Algorithm.<br/>3. Grover&apos;s Algorithm.<br/>4. Quantum Walk Algorithms.<br/>5. Bernstein-Vazirani Algorithm.
                                    <br /><br/>
                                    <Image src="/qbt.jpg" alt="Quantum Computing Summary" width={500} height={300} className={styles.blogImage} />
                                    <br/><br/>
                                    Quantum Speedup: This is our last technical concept for this segment. Speedup refers to the phenomenon by which quantum computers can solve problems much faster than the classical ones. The speedup can be polynomial or can even be exponential. Example of polynomial speedup is the Grover’s algorithm which allows you to search through an unsorted database in O(√N) time rather than the classical approach of linear time O(N). This could also impact various other fields such as cryptography, where quantum computers can breaks the existing security algorithms, considered to be secure as of today.
                                    <br/><br/>
                                    Now, we will move on to a bit of a non-technical aspect of quantum computing in the next part!<br/><br/>
                                </p>
                            </div>
                        </div>
                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <h2><strong>Quantum Computing in various non tech fields:</strong></h2>
                                <p>
                                    Quantum computing may have its origins in physics and computer science, but it has great potential to spread its benefits to various non-technical fields! You&apos;re not of course not yet underestimating the power of quantum, are you?<br/>And as you have expected, quantum has already revolutionized fields as diverse as finance, healthcare and logistics.
                                    <br/><br/>
                                    1. <b>Finance</b>: in finance, Quantum has done a phenomenal job of optimizing portfolios by identifying the best investment strategies. It does this by analyzing massive amounts of market data and risk factors. Sounds amazing, right? It would be, since this analysis is done by simulating complex financial models, which makes investing much easier than the traditional way.
                                    <br/>
                                    2. <b>Healthcare and drug discovery</b>: It simulates  the molecular interactions between drugs and biological targets more accurately than classical computation, which relies on approximations. This allows scientists to develop better therapies with ease, as it makes the process of understanding drug efficacy, patient genomic data, and clinical data quite clear. Another aspect that quantum computing elaborates on is &quot;personalized medicine.&quot; Once the complex biological data can be interpreted much easier and faster, personalized medicine can no longer remain a dream!
                                    <br/>
                                    <Image src="/qbt.jpg" alt="Quantum Computing Summary" width={500} height={300} className={styles.blogImage} />
                                    <br/>
                                    3. <b>Materials Science</b>: Quantum simulations can help scientists design and discover new complex materials whose properties cannot be captured by classical computers (for example, superposition and entanglement of particles). Even heat-related properties such as thermal conductivity can be predicted. What&apos;s more! Quantum also promises to optimize the battery design and its performance. This allows the batteries to last long with efficient energy storage solutions.
                                    <br/>
                                    4.<b>Logistics and Supply Chains</b>: Quantum algorithms is a win- win situation for the logistics and supply chains as it optimizes complex logistical routes and schedules, which is an ongoing problem in many industries. It even identifies demand, thereby reducing costs and increasing efficiency. With this, companies will no longer have to worry about slow deliveries!
                                    <br/><br/>                            
                                </p>
                            </div>
                        </div>
                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <h2><strong>Free Resources:</strong></h2>
                                <ul>
                                    <li><a href="https://learning.quantum.ibm.com/" target="_blank" rel="noopener noreferrer">IBM Quantum Computing Course</a></li>
                                    <li><a href="https://quantum.cern/introduction-quantum-computing" target="_blank" rel="noopener noreferrer">CERN: A practical introduction to quantum computing</a></li>
                                    <li><a href="https://profmcruz.wordpress.com/wp-content/uploads/2017/08/quantum-computation-and-quantum-information-nielsen-chuang.pdf" target="_blank" rel="noopener noreferrer">Nielsen-Chuang&apos;s: Quantum Computation and Quantum Information</a></li>
                                    <li><a href="https://www.amazon.in/Introduction-Quantum-Computing-Phillip-Kaye/dp/019857049X" target="_blank" rel="noopener noreferrer">Kaye-Laflamme-Mosca&apos;s: &quot;An introduction to Quantum Computing&quot;</a></li>
                                    <li><a href="https://www.classiq.io/insights/shors-algorithm-explained" target="_blank" rel="noopener noreferrer">Quantum Cryptography - Shor&apos;s Algorithm Explained</a></li>
                                    <li><a href="https://learning.quantum.ibm.com/tutorial/grovers-algorithm" target="_blank" rel="noopener noreferrer">IBM: Grover&apos;s Algorithm</a></li>
                                    <li><a href="https://www.mckinsey.com/industries/life-sciences/our-insights/pharmas-digital-rx-quantum-computing-in-drug-research-and-development" target="_blank" rel="noopener noreferrer">Pharma&apos;s digital Rx: Quantum computing in drug research and development</a></li>
                                    <li><a href="https://www.ibm.com/thought-leadership/institute-business-value/en-us/report/exploring-quantum-financial" target="_blank" rel="noopener noreferrer">Quantum Computing and Finance</a></li>
                                    <li><a href="https://www.unisys.com/blog-post/ecs/from-qubits-to-cubic-feet-quantum-logistics-explained/" target="_blank" rel="noopener noreferrer">Quantum Computing and Logistics</a></li>
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

export default Blog9;