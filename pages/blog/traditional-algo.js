import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from './trad.module.css';
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

    const fetchVoteStatus = useCallback(async () => {
        if (!deviceId) return;

        const { data, error } = await supabase
            .from('votes')
            .select('vote_type')
            .eq('device_id', deviceId)
            .eq('post_id', 4)
            .limit(1);

            if (error) {
                console.error("Error fetching vote status:", error);
                return;
            }
        
            if (data.length > 0) setVote(data[0].vote_type);

const { data: upvotes } = await supabase
    .from('votes')
    .select('*')
    .eq('vote_type', 'upvote')
    .eq('post_id', 4);

const { data: downvotes } = await supabase
    .from('votes')
    .select('*')
    .eq('vote_type', 'downvote')
    .eq('post_id', 4);


        setVoteCounts({ upvotes: upvotes.length, downvotes: downvotes.length });
    }, [deviceId]);

    useEffect(() => {
        fetchComments();
        fetchVoteStatus();
    }, [deviceId, fetchVoteStatus]);

    const fetchComments = async (id) => {
        const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', 4)
        .order('created_at', { ascending: false });
        console.log(data);
        if (error) console.error('Error fetching comments:', error);
        else setComments(data);
    };


    const handleVote = async (voteType) => {
        if (vote === voteType) {
            toast.error(`You have already ${voteType}d this blog.`);
            return;
        }

        await supabase.from('votes').upsert({
            device_id: deviceId,
            vote_type: voteType,
            post_id: 4,  
        });
                setVote(voteType);
        fetchVoteStatus();
    };

    const handleCommentSubmit = async () => {
        if (!newComment || !commenterName) {
            toast.error('Please enter your name and comment!');
            return;
        }
    
        const { data, error } = await supabase
            .from('comments')
            .insert({
                username: commenterName,
                comment: newComment,
                post_id: 4,
                device_id: deviceId,
            });
    
        if (error) {
            console.error('Error adding comment:', error.message); // Log the error message
            toast.error(`Failed to add comment: ${error.message}`);
        } else {
            setNewComment('');
            setCommenterName('');
            fetchComments(4);
            toast.success('Comment added successfully!');
        }
    };
    

    return (
        <div className={styles.blogPage}>
            <div className={styles.blogContent}>
                <main className={styles.mainContent}>
                    <h1 className={styles.pageTitle}>Traditional Algorithms vs. Machine Learning</h1>
                    <p className={styles.pageSubtitle}>A comprehensive dive into the definition, use cases, efficiency, positives and negatives</p>
                    <p className={styles.pageauthor}>
                        By <a className={styles.authorLink} href="https://www.linkedin.com/in/aaryan-kumbhare-07428032a" target="_blank" rel="noopener noreferrer">Aaryan Kumbhare</a> | February 12, 2025
                </p>

          
          <div className={styles.blogDescription}>
          <div className={styles.blogCard}>
          <h2>Introduction</h2>
                <p>
                In the modern world, we humans heavily rely on computer systems for various tasks, such as data processing, decision making, and automating various tasks. Ever wondered how the 	page ranking algorithms on search engines or facial recognition on our mobile phones work?
Well, the answer lies somewhere in the different paradigms of traditional algorithms and machine learning! In the upcoming sections, we will be diving deep into the world of computing with traditional algorithms and complex, yet beautiful domain of machine learning.
                </p>       
              </div>
              <div className='content-section'>
              <div className={styles.blogCard}>
                <h2>What are traditional algorithms?</h2>
                <p>
                Traditional algorithms lay the foundation of computing. These are the algorithms which follow predefined rules to perform tasks and solve problems with precision. There won&apos;t be any harm in saying that the majority of modern computing, which we are about to discuss ahead, is somewhere built on top of traditional algos!
                </p>
                <h3>What is machine learning?</h3> 
                <p>
                In the modern world of computer science, there are tons of buzz words out there… AI, AGI, ASI, machine learning, neural networks, deep learning, reinforcement learning, blah, blah! But to get a clear understanding of these, it is important to know what builds the foundation of some of those “buzz-words” mentioned above…
                <br/><br/>                   
Machine learning is the domain of artificial intelligence, which deals with allowing computers to learn from data and improve with time. Concepts like neural networks, deep learning, NLP, etc. as mentioned above, actually are subsets of machine learning itself!
                </p>  
                <div className={styles.imageGallery}>
                <Image src="/ai.png" alt="TARZAN Simulation" width={500} height={300} className={styles.blogImage} />
                </div>
              </div>
              </div>
              <div className='content-section'>
              <div className={styles.blogCard}>
                <h2>Similarities between traditional algorithms and machine learning algorithms </h2>
                <p>
                Traditional algorithms marked the beginning of computing, whereas AI and ML are the present and give us an idea of what can be achieved in the upcoming years for computing.
                BUT! There is one major similarity between the both. 
                Maths.<br/><br/>
                Both traditional algorithms and ML algos heavily rely on mathematical foundations. Concepts such as linear algebra, graph theory, statistics, probability, and whatnot!<br/><br/>
                When you enter a prompt on our favourite chatbot, you are getting the desired answer, but at the core, the backend, there are countless no. of matrices multiplying with each other for that desired answer!!</p>
                <div className={styles.imageGallery}>
                                    <Image src="/machine.png" alt="TARZAN Simulation" width={500} height={300} className={styles.blogImage} />
                </div>
                <br/>
                <h3>A detailed comparison of differences between traditional algos and ML algos with the example of search engines:</h3>
                <p>
                    A century back, the main collection of data was available in books, present in libraries. Today&apos;s library is the internet. The internet is huge. As of January 2025, there are about 1.2 billion websites on the internet, but there&apos;s a catch! Only about 200 million of these are active.
                    <br/><br/>
                    So, have you ever wondered, when you search for something, say on Google&apos;s search engine, how is it able to select the desired websites for you?
                    <br/><br/>
                This is where the interesting part starts and will also help us understand the differences between the 2 paradigms of this blog!
                </p>
                <h3>Google&apos;s PageRank Algorithm:</h3> 
                <p>This is our example for traditional, rule-based algorithms. 
                PageRank (PR) algorithm was developed by Larry Page and Sergey Brin in the year of 1996, at Stanford University. 
                This algorithm is a way of measuring the importance of web pages.
                <br/><br/>
                According to Google: PageRank works by counting the number and quality of links to a page to determine a rough estimate of how important the website is. The underlying assumption is that more important websites are likely to receive more links from other websites.
                <br/><br/>
                The math behind this: the algorithm outputs a probability distribution used to represent the likelihood that a person randomly clicking on links will arrive at any particular page.
                </p>
                <h3>Google&apos;s RankBrain and BERT algorithm:</h3> 
                <p>PageRank was a revolutionary algorithm. But, with the advancements in technology, Google Search also kept evolving. This came in the form of integration of ML, Neural Networks and Natural Language Processing with page ranking. 
                <br/><br/>
                RankBrain, launched in 2015 was Google&apos;s 1st AI powered algorithm. This algorithm incorporated the concepts of machine learning for better analysis and understanding of search requests, helping to curate results more dynamically. Unlike PR, which is rule based, RankBrain is an adaptive algorithm. 
                <br/><br/>
                BERT, abbreviation for Bidirectional Encoder Representations from Transformers, launched in 2018, is another ML based model, helps Google search to understand the context of words in a query, improving NLP. In simple terms, NLP is the area of AI which deals with computers understanding the human language and improving upon the interactions. 
                <br/><br/>
                Both the above mentioned algorithms are significant enhancements in Google Search. This also gives us an idea of how trained models differ from rule-based algorithms. 
                <br/><br/>
                So basically, to sum it up, PageRank focuses on the keywords mentioned in a search request, and ranking pages on the basis of backlinks. Whereas, with the help of NLP, the newer models such as RankBrain, BERT are trying to understand the CONTEXT of what you are asking for.
               </p>                     
              </div>
              </div>
              <div className='content-section'>
              <div className={styles.blogCard}>
                <h2>Efficiency, Pros and Cons</h2>
                <p>
                Traditional algorithms, being predefined, work efficiently with specific tasks and structured data. The traditional algorithms have well-defined time and space complexities. 
These algorithms do not require cutting edge hardware to train upon, i.e., lesser RAM + GPU power is required.
However, these might fail while working with larger, unstructured datasets. 
<br/><br/>
                Talking about ML algorithms, they are shaping the future of computing. They work efficiently with unstructured data and large datasets. Being dynamic as compared to traditional algorithms, ML excels in tasks such as image recognition. But to power those developments, there is a need for better hardware. For training ML models, there is a requirement of stronger GPUs, TPUs (Tensor Processing Units) for parallel processing, this means more capital and investments are required for optimizing those systems.
                <br/><br/>
                The major difference between the two is about adaptability. As we have seen in the above example, ML models are reliant on the real-time data / large datasets, traditional algos lack the adaptive nature, and often fail in various tasks            
                </p>
              </div>
            </div>
             <div className='content-section'>
              <div className={styles.blogCard}>
                <h2>Conclusion</h2>
                <p>
                From the above sections, we have got to understand the difference between traditional algos and ML. This also answers the question asked in the 1st paragraph. Page ranking works on the basis of traditional algorithms, and in the modern world, it incorporates the modern technologies like ML and NLP for better results. Our mobile phones use computer vision, another domain of ML, to analyze an image, helping the system to know that the person in front of the camera is you!
                <br/><br/>
                So, to conclude, both the traditional algorithms and ML have their own strengths and use cases. One laid the foundation, the other is helping us create a better future for computing and technologies. 
                <br/><br/>
                The future lies in creating technologies which make human life better and technologies that supersede what we have today!
                </p>
              </div>
                </div>
                <div className='content-section'>
              <div className={styles.blogCard}>
                <h2>Summary for Newsletter</h2>
                <p>
                In the modern world, most of us rely on computers and mobiles for various tasks. But have you ever wondered, what goes on in the backend of those tasks? Suppose you search for your favourite food&apos;s recipe, how is Google able to bring in all the answers so quickly? Or how is your phone able to unlock just by looking at our face? 
This article dives into the forever evolving world of computing, its foundation laid by traditional algorithms and how machine learning is changing the landscape for the future. Also, we will find the answers to the questions mentioned above!
                </p>  
              </div>
             </div>
             <div className='content-section'>
              <div className={styles.blogCard}>
                <h2>Free Resources</h2>
                <ol className={styles.List}>
                <li><strong>PageRank</strong>: <a href="https://www.geeksforgeeks.org/page-rank-algorithm-implementation/" target="_blank" 
       rel="noopener noreferrer" >https://www.geeksforgeeks.org/page-rank-algorithm-implementation/</a></li>
                <li><strong>More about PageRank</strong>: <a href="https://pi.math.cornell.edu/~mec/Winter2009/RalucaRemus/Lecture3/lecture3.html" target="_blank" 
       rel="noopener noreferrer">https://pi.math.cornell.edu/~mec/Winter2009/RalucaRemus/Lecture3/lecture3.html</a></li>
                <li><strong>BERT</strong>: <a href="https://blog.google/products/search/search-language-understanding-bert/" target="_blank" 
       rel="noopener noreferrer">https://blog.google/products/search/search-language-understanding-bert/</a></li>
                <li><strong>Google ML Crash Course</strong>: <a href="https://developers.google.com/machine-learning/crash-course" target="_blank" 
       rel="noopener noreferrer">https://developers.google.com/machine-learning/crash-course</a></li>
                <li><strong>Reddit Community for ML</strong>: <a href="https://www.reddit.com/r/learnmachinelearning" target="_blank" 
       rel="noopener noreferrer">https://www.reddit.com/r/learnmachinelearning</a></li>
                <li><strong>ML book</strong>: <a href ="https://sebastianraschka.com/blog/2022/ml-pytorch-book.html" target="_blank" 
       rel="noopener noreferrer">https://sebastianraschka.com/blog/2022/ml-pytorch-book.html</a></li>
                <li><strong>ML notes(Stanford official)</strong>: <a href="https://cs229.stanford.edu/notes2022fall/main_notes.pdf" target="_blank" 
       rel="noopener noreferrer">https://cs229.stanford.edu/notes2022fall/main_notes.pdf</a></li>                     
              </ol>          
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