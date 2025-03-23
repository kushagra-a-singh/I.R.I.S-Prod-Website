import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './research.module.css';
import Image from 'next/image';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Code, Shield, Server, Cloud, GraduationCap } from 'lucide-react';
import supabase from '../../src/utils/supabase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [comments, setComments] = useState({});
  const [formData, setFormData] = useState({});
  const [deviceId, setDeviceId] = useState(null);
  const [vote, setVote] = useState(null);
  const [voteCounts, setVoteCounts] = useState({ upvotes: 0, downvotes: 0 });

  const getCurrentProjectId = () => selectedProject?.id;
  // var postId = selectedProject ? selectedProject.id : 1;

  const collabProjects = [
    {
      id: 1,
      title: 'DIGITAL FORENSICS',
      //subtitle: 'A Full-Fledge Digital Forensic Tool for Malcious activites',
      description: 'A Full-Fledge Digital Forensic Tool for Malcious activites',
      //domain: 'Artificial Intelligence',
      branchYear: 'FY BTech CSE (CSF)',
      status: 'Ongoing',
      //guides: ['Dr. Shamla Mantri'],
      //owners: 'Parag Bhat',
      owners: (
        <a href="https://www.linkedin.com/in/parag-bhat-1b92ab330/" target="_blank" rel="noopener noreferrer" className={styles.contributorLink}>
          Parag Bhat
        </a>
      ),
      mentor: (
        <a href="https://in.linkedin.com/in/dr-shamla-mantri-2180201b1" target="_blank" rel="noopener noreferrer" className={styles.contributorLink}>
          Dr. Shamla Mantri
        </a>
      ),
      //githubLink: "https://github.com/example1/opensource-ai",
      //date: 'March 10, 2025',
      image: '/digital forensics.jpeg',
      imageWidth: 500,
      imageHeight: 300,
    },
    {
      id: 2,
      title: 'Biochemistry & Human Health',
      //subtitle: 'A Full-Fledge Digital Forensic Tool for Malcious activites',
      description: 'Short Chained Fatty Acids and their effect on Human Health',
      //domain: 'Artificial Intelligence',
      branchYear: 'SY Integrated M.Sc. Biotechnology',
      status: 'Ongoing',
      //guides: ['Dr. Shamla Mantri'],
      //owners: 'Parag Bhat',
      owners: (
        <a href="https://www.linkedin.com/in/aadyaa-saran/" target="_blank" rel="noopener noreferrer" className={styles.contributorLink}>
          Aadyaa Saran
        </a>
      ),
      mentor: (
        <a href="https://in.linkedin.com/in/neha-bokey-7819b814a" target="_blank" rel="noopener noreferrer" className={styles.contributorLink}>
         Dr. Neha Bokey
        </a>
      ),
      //githubLink: "https://github.com/example1/opensource-ai",
      //date: 'March 10, 2025',
      image: '/biochemistry.jpg',
      imageWidth: 500,
      imageHeight: 300,
    },
    {
      id: 3,
      title: 'Pharmacology',
      //subtitle: 'A Full-Fledge Digital Forensic Tool for Malcious activites',
      description: 'The presence of food can alter drug absorption, affecting its effectiveness and bioavailability.',
      //domain: 'Artificial Intelligence',
      branchYear: 'SY B Pharm',
      status: 'Ongoing',
      //guides: ['Dr. Shamla Mantri'],
      //owners: 'Parag Bhat',
      owners: (
        <a href="https://www.linkedin.com/in/aadyaa-saran/" target="_blank" rel="noopener noreferrer" className={styles.contributorLink}>
          Nishtha Mandaliya
        </a>
      ),
      mentor: (
        <a href="https://in.linkedin.com/in/dr-aarti-shastri-ba5043109" target="_blank" rel="noopener noreferrer" className={styles.contributorLink}>
       	Dr. Aarti Shastri
        </a>
      ),
      //githubLink: "https://github.com/example1/opensource-ai",
      //date: 'March 10, 2025',
      image: '/pharmacology.jpg',
      imageWidth: 500,
      imageHeight: 300,
    },
    /*{
      id: 4,
      title: 'IoT-based Smart Agriculture',
      subtitle: 'Automating Farming with IoT',
      description: 'Developing IoT-enabled sensors and AI models for smart farming and water management.',
      domain: 'IoT & Embedded Systems',
      branchYear: 'TY BTech ECE',
      status: 'Ongoing',
      guides: ['Dr. Shamla Mantri', 'Dr. Yogesh Kulkarni'],
      owners: 'Jane Doe',
      contributors: (
        <a href="https://linkedin.com/in/example4" target="_blank" rel="noopener noreferrer" className={styles.contributorLink}>Sarah Patel</a>
      ),
      githubLink: "https://github.com/example4/smart-agriculture",
      date: 'May 15, 2025',
      image: '/ai.png',
      imageWidth: 500,
      imageHeight: 300,
    }*/
  ];

  const handleShow = (project) => {
    setSelectedProject(project);
    if (!formData[project.id]) {
      setFormData(prev => ({
        ...prev,
        [project.id]: { commenterName: '', newComment: '' }
      }));
    }
  };

  const handleClose = () => setSelectedProject(null);

  /*useEffect(() => {
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
    if (deviceId && selectedProject) {
      console.log('Current Device ID:', deviceId);
      fetchComments(selectedProject.id);
      fetchVoteStatus(selectedProject.id);
    }
  }, [deviceId, selectedProject]);
*/
  /*const fetchVoteStatus = async (projectId) => {
    try {
      const { data: voteData, error: voteError } = await supabase
        .from('collab_votes')
        .select('vote_type')
        .eq('device_id', deviceId)
        .eq('post_id', projectId)
        .single();

      if (voteError && voteError.code !== 'PGRST116') {
        console.error('Error fetching vote status:', voteError);
      } else {
        setVote(voteData?.vote_type || null);
      }

      const { data: upvoteData, error: upvoteError } = await supabase
        .from('collab_votes')
        .select('*')
        .eq('post_id', projectId)
        .eq('vote_type', 'upvote');

      const { data: downvoteData, error: downvoteError } = await supabase
        .from('collab_votes')
        .select('*')
        .eq('post_id', projectId)
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

  const fetchComments = async (projectId) => {
    const { data, error } = await supabase
      .from('collab_comments')
      .select('*')
      .eq('post_id', projectId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      setComments(prev => ({
        ...prev,
        [projectId]: data || []
      }));
    }
  };

  const handleVote = async (voteType) => {
    const projectId = getCurrentProjectId();
    if (!projectId) return;

    try {
      if (!deviceId) {
        toast.error('Unable to vote at this time');
        return;
      }

      const { data: existingVote, error: fetchError } = await supabase
        .from('collab_votes')
        .select('*')
        .eq('post_id', projectId)
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
            .from('collab_votes')
            .update({ vote_type: voteType })
            .eq('post_id', projectId)
            .eq('device_id', deviceId);

          if (updateError) {
            console.error('Error updating vote:', updateError);
            return;
          }

          setVote(voteType);
          toast.success(`Vote changed to ${voteType}!`);
        }
      } else {
        const { error: insertError } = await supabase
          .from('collab_votes')
          .insert({
            post_id: projectId,
            vote_type: voteType,
            device_id: deviceId
          });

        if (insertError) {
          console.error('Error inserting vote:', insertError);
          return;
        }

        setVote(voteType);
        toast.success(`Successfully ${voteType}d!`);
      }

      await fetchVoteStatus(projectId);
    } catch (error) {
      console.error('Error in handleVote:', error);
      toast.error('Error processing vote');
    }
  };

  const handleCommentSubmit = async () => {
    const projectId = getCurrentProjectId();
    if (!projectId) return;

    const currentFormData = formData[projectId] || { commenterName: '', newComment: '' };

    if (!currentFormData.newComment || !currentFormData.commenterName) {
      toast.error('Please enter your name and comment!');
      return;
    }

    const { error } = await supabase
      .from('collab_comments')
      .insert({
        post_id: projectId,
        username: currentFormData.commenterName,
        comment: currentFormData.newComment,
        device_id: deviceId,
      });

    if (error) {
      console.error('Error submitting comment:', error);
      toast.error('Failed to submit comment!');
    } else {
      // Reset form data for this project only
      setFormData(prev => ({
        ...prev,
        [projectId]: { commenterName: '', newComment: '' }
      }));
      fetchComments(projectId);
      toast.success('Comment added successfully!');
    }
  };

  const handleFormChange = (projectId, field, value) => {
    setFormData(prev => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        [field]: value
      }
    }));
  };*/

  return (
    <div className={styles.collaborationPage}>
      <div className="container py-5">
        <h1 className={styles.pageTitle}>Our Research Initiatives</h1>
        <p className={styles.pageSubtitle}>Discover our latest collaborative research initiatives.</p>
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
                    {/*<span>{domainIcons[project.domain]} <strong>Domain:</strong> {project.domain}</span><br />*/}
                    <span><GraduationCap size={16} className={styles.icon} /> <strong>Project Head:</strong> {project.branchYear}</span><br />
                    <span><strong>Status:</strong> <span className={`badge ${statusClasses[project.status]}`}>{project.status}</span></span><br />
                    <span><strong>Researcher:</strong> {project.owners}</span><br/>
                    {/*<span><strong>Contributors:</strong> {project.contributors}</span> | <span>{project.date}</span>*/}
                    <span><strong>Mentor:</strong> {project.mentor}</span>

                    
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
            <p><strong>Researcher:</strong> {selectedProject.owners}</p>
            {/*<p><strong>Domain:</strong> {selectedProject.domain}</p>*/}
            <p><strong>Status:</strong>
              <span className={`${styles.statusBadge} ${statusClasses[selectedProject.status]}`}>
                {selectedProject.status}
              </span>
            </p>
            <p><strong>Mentor:</strong> {selectedProject.mentor}</p>

           
            {/*<div className={styles.voteSection}>

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
                {!comments[selectedProject?.id] || comments[selectedProject?.id].length === 0 ? (
                  <p>No comments added yet.</p>
                ) : (
                  comments[selectedProject?.id].map((comment) => (
                    <div key={comment.id} className={styles.comment}>
                      <p><strong>{comment.username}</strong>: {comment.comment}</p>
                    </div>
                  ))
                )}
              </div>

              <h3 className={styles.commentTitle}>Add your Comment</h3>
              <input
                type="text"
                placeholder="Your Name"
                value={formData[selectedProject?.id]?.commenterName || ''}
                onChange={(e) => handleFormChange(selectedProject?.id, 'commenterName', e.target.value)}
                className={styles.commentInput}
              />
              <textarea
                placeholder="Write a comment..."
                value={formData[selectedProject?.id]?.newComment || ''}
                onChange={(e) => handleFormChange(selectedProject?.id, 'newComment', e.target.value)}
                className={styles.commentInput}
              />
              <button onClick={handleCommentSubmit} className={styles.commentSubmitButton}>
                Submit Comment
              </button>
            </div>
            */}
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="dark" />
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
