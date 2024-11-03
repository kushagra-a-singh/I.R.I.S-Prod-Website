import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './Blog.module.css';

function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: 'Technical',
      subtitle: 'I.R.I.S. Website Development',
      description: "Building a robust website for our club's latest initiatives.",
      author: 'Technical Team',
      date: 'September 1, 2024',
      image: 'website.jpg',
      content: 'The I.R.I.S. website aims to create a centralized portal for all activities and events. It includes features like event tracking, project updates, and member contributions.The I.R.I.S. website aims to create a centralized portal for all activities and events. It includes features like event tracking, project updates, and member contributions.The I.R.I.S. website aims to create a centralized portal for all activities and events. It includes features like event tracking, project updates, and member contributions.The I.R.I.S. website aims to create a centralized portal for all activities and events. It includes features like event tracking, project updates, and member contributions.The I.R.I.S. website aims to create a centralized portal for all activities and events. It includes features like event tracking, project updates, and member contributions.The I.R.I.S. website aims to create a centralized portal for all activities and events. It includes features like event tracking, project updates, and member contributions.The I.R.I.S. website aims to create a centralized portal for all activities and events. It includes features like event tracking, project updates, and member contributions.The I.R.I.S. website aims to create a centralized portal for all activities and events. It includes features like event tracking, project updates, and member contributions.The I.R.I.S. website aims to create a centralized portal for all activities and events. It includes features like event tracking, project updates, and member contributions.The I.R.I.S. website aims to create a centralized portal for all activities and events. It includes features like event tracking, project updates, and member contributions.The I.R.I.S. website aims to create a centralized portal for all activities and events. It includes features like event tracking, project updates, and member contributions.vThe I.R.I.S. website aims to create a centralized portal for all activities and events. It includes features like event tracking, project updates, and member contributions.vvThe I.R.I.S. website aims to create a centralized portal for all activities and events. It includes features like event tracking, project updates, and member contributions.',
      additionalImages: ['website-feature1.jpg', 'website-feature2.jpg'],
    },
    {
      id: 2,
      title: 'Research Project',
      subtitle: 'Ongoing Research on AI in Robotics',
      description: 'Our team is working on a new research paper.',
      author: 'Research Team',
      date: 'September 10, 2024',
      image: 'research.jpg',
      content: 'This project focuses on the intersection of AI and robotics, exploring machine learning techniques for autonomous behavior.',
    },
    {
      id: 3,
      title: 'Automated Vehicle',
      subtitle: 'Advances in Automated Vehicle Prototyping',
      description: 'Latest developments in our vehicle prototype.',
      author: 'Mechanical Team',
      date: 'September 10, 2024',
      image: 'vehicle.jpg',
      content: 'Our mechanical engineering team is actively building an automated vehicle, integrating sensors and AI for self-navigation.',
    },
  ];

  const openModal = (post) => setSelectedPost(post);
  const closeModal = () => setSelectedPost(null);

  return (
    <div className={styles.blogPage}>
      <div className="container py-5">
        <h1 className={styles.pageTitle}>Our Blog</h1>
        <p className={styles.pageSubtitle}>
          I.R.I.S. recent developments and ongoing projects.
        </p>
        <div className="row">
          {blogPosts.map((post) => (
            <div key={post.id} className="col-md-4">
              <div className={styles.blogCard}>
                <img
                  src={post.image}
                  alt={post.title}
                  className={styles.blogImage}
                />
                <div className={styles.blogContent}>
                  <h3 className={styles.blogTitle}>{post.title}</h3>
                  <p className={styles.blogDescription}>{post.description}</p>
                  <div className={styles.blogMeta}>
                    <span>By {post.author}</span> | <span>{post.date}</span>
                  </div>
                  <button
                    onClick={() => openModal(post)}
                    className={styles.readMoreButton}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedPost && (
          <Modal
            isOpen={!!selectedPost}
            onRequestClose={closeModal}
            className={styles.modal}
            overlayClassName={styles.overlay}
            ariaHideApp={false}
          >
            <div className={styles.modalContent}>
              <button className={styles.closeButton} onClick={closeModal}>
                &times;
              </button>
              <h2 className={styles.modalTitle}>{selectedPost.title}</h2>
              <h4 className={styles.modalSubtitle}>{selectedPost.subtitle}</h4>
              <div className={styles.modalMeta}>
                <span>By {selectedPost.author}</span> |{' '}
                <span>{selectedPost.date}</span>
              </div>
              <p className={styles.modalText}>{selectedPost.content}</p>
              {selectedPost.additionalImages?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Additional ${index + 1}`}
                  className={styles.modalImage}
                />
              ))}
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default Blog;
