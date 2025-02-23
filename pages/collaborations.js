import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './collaborations.module.css';
import Image from 'next/image';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Code, Shield, Server, Cloud, GraduationCap } from 'lucide-react';

const domainIcons = {
  "Artificial Intelligence": <Code size={16} className={styles.icon} />,
  "Cybersecurity": <Shield size={16} className={styles.icon} />,
  "Blockchain": <Server size={16} className={styles.icon} />,
  "IoT & Embedded Systems": <Cloud size={16} className={styles.icon} />,
};

const statusClasses = {
  "Ongoing": "bg-success",
  "Completed": "bg-primary",
  "In Review": "bg-warning",
};

const borderColors = {
  "Artificial Intelligence": "#9c27b0",
  "Blockchain": "#007bff",
  "Cybersecurity": "#ff9800",
  "IoT & Embedded Systems": "#4CAF50",
};

function Collaboration() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commenterName, setCommenterName] = useState('');
  const [deviceId, setDeviceId] = useState(null);
  const [vote, setVote] = useState(null);
  const [voteCounts, setVoteCounts] = useState({ upvotes: 0, downvotes: 0 });

  var postId = 1;


  const collabProjects = [
    {
      id: 1,
      title: 'Open Source AI Models',
      subtitle: 'Contributing to the Future of AI',
      description: 'An initiative to develop and refine AI models for diverse applications.',
      domain: 'Artificial Intelligence',
      branchYear: 'TY BTech CSE',
      status: 'Ongoing',
      guides: ['Dr. Shamla Mantri', 'Dr. Yogesh Kulkarni'],
      contributors: (
        <>
          <a href="https://linkedin.com/in/example1" target="_blank" rel="noopener noreferrer" className={styles.contributorLink}>John Doe</a>
          {' '} & <span className={styles.contributorLink}> Jane Smith</span>
        </>
      ),
      githubLink: "https://github.com/example1/opensource-ai",
      date: 'March 10, 2025',
      image: '/ai.png',
      imageWidth: 500,
      imageHeight: 300,
    },
    {
      id: 2,
      title: 'Secure Transactions',
      subtitle: 'Enhancing Security and Transparency',
      description: 'A project leveraging blockchain to ensure secure and transparent transactions.',
      domain: 'Blockchain',
      branchYear: 'TY BTech IT',
      status: 'Completed',
      guides: ['Dr. Shamla Mantri', 'Dr. Yogesh Kulkarni'],
      contributors: (
        <a href="https://linkedin.com/in/example2" target="_blank" rel="noopener noreferrer" className={styles.contributorLink}>Alice Johnson</a>
      ),
      githubLink: "https://github.com/example2/secure-transactions",
      date: 'February 20, 2025',
      image: '/ai.png',
      imageWidth: 500,
      imageHeight: 300,
    },
    {
      id: 3,
      title: 'Cybersecurity Threat Analysis',
      subtitle: 'Detecting and Preventing Cyber Threats',
      description: 'A research project focused on identifying and mitigating cybersecurity threats using AI.',
      domain: 'Cybersecurity',
      branchYear: 'TY BTech CSE',
      status: 'In Review',
      guides: ['Dr. Shamla Mantri', 'Dr. Yogesh Kulkarni'],
      contributors: (
        <a href="https://linkedin.com/in/example3" target="_blank" rel="noopener noreferrer" className={styles.contributorLink}>Michael Lee</a>
      ),
      githubLink: "https://github.com/example3/cybersecurity-analysis",
      date: 'April 5, 2025',
      image: '/ai.png',
      imageWidth: 500,
      imageHeight: 300,
    },
    {
      id: 4,
      title: 'IoT-based Smart Agriculture',
      subtitle: 'Automating Farming with IoT',
      description: 'Developing IoT-enabled sensors and AI models for smart farming and water management.',
      domain: 'IoT & Embedded Systems',
      branchYear: 'TY BTech ECE',
      status: 'Ongoing',
      guides: ['Dr. Shamla Mantri', 'Dr. Yogesh Kulkarni'],
      contributors: (
        <a href="https://linkedin.com/in/example4" target="_blank" rel="noopener noreferrer" className={styles.contributorLink}>Sarah Patel</a>
      ),
      githubLink: "https://github.com/example4/smart-agriculture",
      date: 'May 15, 2025',
      image: '/ai.png',
      imageWidth: 500,
      imageHeight: 300,
    },
  ];

  const handleShow = (project) => setSelectedProject(project);
  const handleClose = () => setSelectedProject(null);

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
    <div className={styles.collaborationPage}>
      <div className="container py-5">
        <h1 className={styles.pageTitle}>Collaboration Projects</h1>
        <p className={styles.pageSubtitle}>Discover our latest collaborative research and development initiatives.</p>
        <div className="row py-2" style={{ justifyContent: 'center' }}>
          {collabProjects.map((project) => (
            <div key={project.id} className="col-md-6 col-lg-4 d-flex align-items-stretch">
              <div className={styles.collabCard} style={{ borderLeft: `5px solid ${borderColors[project.domain]}` }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={500}
                  height={300}
                  className={styles.collabImage}
                />
                <div className={styles.collabContent}>
                  <h3 className={styles.collabTitle}>{project.title}</h3>
                  <p className={styles.collabDescription}>{project.description}</p>
                  <div className={styles.collabMeta}>
                    <span>{domainIcons[project.domain]} <strong>Domain:</strong> {project.domain}</span><br />
                    <span><GraduationCap size={16} className={styles.icon} /> <strong>Project Head:</strong> {project.branchYear}</span><br />
                    <span><strong>Status:</strong> <span className={`badge ${statusClasses[project.status]}`}>{project.status}</span></span><br />
                    <span><strong>Contributors:</strong> {project.contributors}</span> | <span>{project.date}</span>
                    <div style={{ marginTop: '5px' }}>
                      Guided by {' '}
                      <a
                        href="https://scholar.google.com/citations?user=IUUENAMAAAAJ&hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.authorLink}
                      >
                        Dr. Shamla Mantri
                      </a>{' '}
                      & {' '}
                      <a
                        href="https://scholar.google.com/citations?user=9GsTeoQAAAAJ&hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.authorLink}
                      >
                        Dr. Yogesh Kulkarni
                      </a>
                    </div>
                  </div> <br />
                  <Button className={styles.viewMoreButton} onClick={() => handleShow(project)} style={{ width: "100%", textAlign: "center" }}>View More</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <Modal show={true} onHide={handleClose} size="lg" centered contentClassName={styles.modalContainer}>
          <Modal.Header closeButton className={styles.modalHeader}>
            <Modal.Title>{selectedProject.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <h5 className={styles.modalSubtitle}>{selectedProject.subtitle}</h5>
            <p className={styles.modalDescription}>{selectedProject.description}</p>
            <Image
              src={selectedProject.image}
              alt={selectedProject.title}
              width={600}
              height={400}
              className={styles.modalImage}
            />
            <p><strong>Contributors:</strong> {selectedProject.contributors}</p>
            <p><strong>Domain:</strong> {selectedProject.domain}</p>
            <p><strong>Status:</strong>
              <span className={`${styles.statusBadge} ${statusClasses[selectedProject.status]}`}>
                {selectedProject.status}
              </span>
            </p>
            <p>
              <strong>GitHub Repository:</strong>
              <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
                {selectedProject.githubLink}
              </a>
            </p>
            <div className={styles.guides}>
              Guided by {' '}
              <a href="https://scholar.google.com/citations?user=IUUENAMAAAAJ&hl=en"
                target="_blank" rel="noopener noreferrer" className={styles.authorLink}>
                Dr. Shamla Mantri
              </a> {' '}
              & {' '}
              <a href="https://scholar.google.com/citations?user=9GsTeoQAAAAJ&hl=en"
                target="_blank" rel="noopener noreferrer" className={styles.authorLink}>
                Dr. Yogesh Kulkarni
              </a>
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
          </Modal.Body>
          <Modal.Footer className={styles.modalFooter}>
            <Button variant="secondary" onClick={handleClose} className={styles.closeButton}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

    </div>
  );
}

export default Collaboration;
