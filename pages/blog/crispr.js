import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from './data-loss.module.css';
import supabase from '../../src/utils/supabase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

function Blog5() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [commenterName, setCommenterName] = useState('');
    const [deviceId, setDeviceId] = useState(null);
    const [vote, setVote] = useState(null);
    const [voteCounts, setVoteCounts] = useState({ upvotes: 0, downvotes: 0 });

    const postId = 5;

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
                    <h1 className={styles.pageTitle}>CRISPR</h1>
                    <p className={styles.pageSubtitle}>Revolutionizing Genetics with Precision and Possibility</p>
                    <p className={styles.pageauthor}>
                        By <a className={styles.authorLink} href="https://in.linkedin.com/in/aakanksha-pansare-43744a350" target="_blank" rel="noopener noreferrer">Aakanksha Pansare</a>{' '} &
                        <span className={styles.authorLink}> Nishtha</span>  | February 16, 2025
                    </p>
                    <div className={styles.blogDescription}>
                    <div className='content-section'>
                        <div className={styles.blogCard}>
                            <p>
                                <h4>&ldquo;Imagine having the power to edit the DNA of living organisms&mdash;Welcome to the world of CRISPR, where science fiction is becoming science fact!&rdquo;</h4>
                            </p>
                        </div>
                    </div>
                        <div className={styles.blogCard}>
                            <p>
                                The world of genetics has been completely transformed by a game changing
                                breakthrough - CRISPR GENE EDITING. The 2012 revolution with CRISPR Shifed the ballooning
                                world of genetics forever. Its applications in agriculture and medicine are nothing less than
                                astounding. Because of the palindromic traits of CRISPR, it has taken Precison Focused
                                Molecular Biology and other industries by storm as its capability to edit genes, manipulate and
                                cut specific strands of DNA is unmatched. This makes me question, what does this mean for the
                                future of science? I am sure you wish to know as well, so buckle up. Out of all technologies
                                available, CRISPR is the most exciting considering the unimaginable results that gene editing can
                                produce.
                            </p>

                        </div>

                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <p>
                                    What&apos;s more astounding is the way it was discovered! The discovery of these clustered
                                    DNA sequences occurred independently in three different parts of the world. The first discovery was in
                                    1987 by Yoshizumi, a researcher at Osaka University. It was serendipity—they
                                    accidentally cloned part of a CRISPR sequence together with the &quot;iap&quot; gene of *Escherichia coli* (a
                                    bacterium).

                                    The second discovery occurred in 1993. Two researchers studying *Mycobacterium tuberculosis* in the Netherlands
                                    observed diversity in its DNA sequences.

                                    The third discovery was by Francisco Mojica at the University of Alicante in Spain. He studied the function
                                    of repeats in the archaeal species *Haloferax* and *Haloarcula*. Transcription of these interrupted
                                    repeats led to the first full characterization of CRISPR.
                                </p>
                            </div>
                        </div>
                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <p>
                                    Do you know that Cas9 (or also known as &quot;CRISPR-associated protein 9&quot;) is an enzyme that
                                    opens up specific strands of DNA that are complementary to the CRISPR sequence. For this, it
                                    uses the CRISPER sequence as a guide.
                                    <br></br>
                                    <br></br>
                                    Cas9 and CRISPR sequences is the basis of a  CRISPR-Cas9 that is used to edit genes within living
                                    organisms. The applications  include biological research, development of biotechnological
                                    products and treatment of diseases.
                                    <br></br>
                                    The CRISPR-Cas9 system consists of two key molecules that cause mutations into the DNA.
                                    These are:
                                </p>
                                <ul>

                                    <li>An enzyme called Cas9, also known as a pair of &apos;molecular scissors&apos; that can cut the two
                                        strands of DNA at a specific location. </li>
                                    <li>A piece of RNA called guide RNA (gRNA) which consists of a small piece of pre-designed RNA
                                        sequence (about 20 bases long) within a longer RNA scaffold. This sequence guides the Cas 9 to
                                        right part for the scaffold to  bind to the DNA.</li>
                                    <li>The Cas9 follows the guide RNA to the same location in the DNA sequence and makes a double
                                        stranded cut across both strands of the DNA. </li>
                                    <li>At this stage the cell recognizes that the DNA is damaged and tries to repair it.</li>
                                </ul>


                            </div>
                        </div>
                        <div className='content-section'>
                            <div className={styles.blogCard}>
                                <p>
                                    Therefore, the CRISPER Cas9 system works on the principle of homologous recombination,
                                    where two homologous chromosomes combine. The target sequence (complementary to the
                                    sgRNA sequence) is followed by two cytosine nucleotides because the sgRNA binds best when
                                    the opposite DNA strand is comprised of any nucleotide followed by two guanines (-NGG). This
                                    sequence is called a Protospacer Adjacent Motif (PAM) sequence.
                                    <br></br>
                                    <br></br>
                                    In Conclusion, the development of this new tool was only possible due to the pioneering work of researching about the 2D structural and functional properties of Leptospira genomics.
                                    <br></br>
                                    <br></br>
                                    The birth of &quot;molecular scissors&quot; Cas9 and the system of guide RNA would soon enable
                                    biologists to make extremely precise alterations in the DNA strand of an organism. The
                                    introduction of genetic transformation and planting changed everything for humanity,
                                    agriculture, and medicine as areas previously defined by boundaries of science fiction were
                                    newly opened. Simulations of Cas9 have undoubtedly changed the notions tethering the future
                                    of genetic and therapeutic engineering.
                                </p>
                            </div>
                        </div>

                    <div className='content-section'>
                        <div className={styles.blogCard}>
                            <h2>Summary</h2>
                            <p>
                                CRISPER is no doubt one of the most successful inventions for gene editing, which is itself a
                                heroic cure for many uncurable diseases. What&apos;s more interesting is its discovery and its
                                working!
                            </p>
                            <p>
                                The invention of CRISPR, which now encompasses clustered DNA sequences, was nothing short
                                of revolutionary for genetic studies in the world. The amazing finding of CRISPR-Cas9 stemmed
                                from researchers working independently in Spain, Japan, and the Netherlands in the late 1980s
                                and early 1990s.
                            </p>
                            <p>
                                The invention of CRISPR, which now encompasses clustered DNA sequences, was nothing short
                                of revolutionary for genetic studies in the world. The amazing finding of CRISPR-Cas9 stemmed
                                from researchers working independently in Spain, Japan, and the Netherlands in the late 1980s
                                and early 1990s.
                            </p>
                            <div className={styles.imageGallery}>
                                <Image src="/crispr.jpeg" alt="crispr" width={500} height={300} className={styles.blogImage} />
                            </div>
                        </div>
                    </div>

                    <div className='content-section'>
                        <div className={styles.blogCard}>
                            <h2>References</h2>
                            <ul>
                                <li>
                                    <a href="https://en.wikipedia.org/wiki/CRISPR"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        CRISPR-Wikipedia
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.yourgenome.org/theme/what-is-crispr-cas9/#:~:text=CRISPR%2DCas9%20is%20a%20unique,buzz%20in%20the%20science%20world"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        Methods and Technology
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.genoway.com/technologies/crispr-cas9-gene-editing#:~:text=CRISPR/Cas9%20creates%20specific%20double%2Dstrand%20breaks%20at%20the,joining%20and%20Knockins%20(KI)%20through%20homologous%20recombination"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        CRISPR/Cas9 gene editing
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='content-section'>
                        <div className={styles.blogCard}>
                            <h2>Free Resources</h2>
                            <ul>
                                <li>
                                    <a href="https://www.idtdna.com/pages/tools/rhampseq-crispr-analysis-tool?utm_source=google&utm_medium=cpc&utm_campaign=00586_1d_03&utm_content=search&gad_source=1&gclid=CjwKCAiAnpy9BhAkEiwA-P8N4nzXJTq_gkINbSe5aIMhiHJ1JORaZtnqJtoAp1LQxg2QiNfVCYov1xoCdMsQAvD_BwE"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        rhAmpSeq™ CRISPR Data Analysis Tool
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.sciencedirect.com/book/9780128181409/genome-engineering-via-crispr-cas9-system"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        Genome Engineering
                                    </a>
                                </li>
                                <li>
                                    <a href="https://link.springer.com/book/9783031737336"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        Introduction to CRISPR-Cas9 Techniques
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

export default Blog5;