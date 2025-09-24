import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import styles from './Projects.module.css'; 

function Projects() {
  const ongoingTechnicalProject = {
    id: 1,
    title: "Club Website",
    description: "Our website for club related updates and more information",
  };
  
  const ongoingTechnicalProject2 = {
    id: 2,
    title: "Autonomous Vehicle",
    description:"Advanced Autonomous Vehicle Control System using YOLO Detection and CAN Bus",
  };

  const ongoingtechnicalproject3 = {
    id: 3,
    title: "Project Soteria",
    description: "An Autonomous Drone Designed for Modular Usage & Tracking",
  };

  /*const ongoingResearch2 = {
    id: 4,
    title: "Research",
    description: "info about research project",
  };*/

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className={styles.projects}>
      <main className={`${styles.mainContent} container`}>
        <h1 className={styles.headerTitle}>Projects</h1>

        {/* Technical Projects Section */}
        <h2 className={styles.title}>Ongoing Technical Projects</h2>
        <div className="row">
          {[ongoingTechnicalProject].map((project) => (
            <div className="col-md-6 d-flex justify-content-center" key={project.id}>
              <div className={`${styles.projectCard} card`}>
                <div className="card-body">
                  <h3 className="card-title">{project.title}</h3> {/* Title above the card body */}
                  <Image
                    src="/website_img.png"
                    alt="Project logo"
                    className="card-img-top"
                    width={500}  
                    height={300} 
                  />
                  <p className="card-text">{project.description}</p>
                  <Link href={`/projects/${project.id}`} className="btn btn-primary">
                    Click to Know More!
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {[ongoingTechnicalProject2].map((project) => (
            <div className="col-md-6 d-flex justify-content-center" key={project.id}>
              <div className={`${styles.projectCard} card`}>
                <div className="card-body">
                  <h3 className="card-title">{project.title}</h3> {/* Title above the card body */}
                  <Image
                    src="/simulation.jpg"
                    alt="Project logo"
                    className="card-img-top"
                    width={500}  
                    height={300} 
                  />
                  <p className="card-text">{project.description}</p>
                  <Link href={`/projects/${project.id}`} className="btn btn-primary">
                    Click to Know More!
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="row">
          {[ongoingtechnicalproject3].map((project) => (
            <div className="col-md-6 d-flex justify-content-center" key={project.id}>
              <div className={`${styles.projectCard} card`}>
                <div className="card-body">
                  <h3 className="card-title">{project.title}</h3> {/* Title above the card body */}
                  <Image
                    src="/soteria.png"
                    alt="Project logo"
                    className="card-img-top"
                    width={500}  
                    height={300} 
                  />
                  <p className="card-text">{project.description}</p>
                  <Link href={`/projects/${project.id}`} className="btn btn-primary">
                    Click to Know More!
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Research Section */}
        {/*
        <h2 className={styles.title}>Ongoing Research</h2>
        <div className="row">
          {[ongoingResearch, ongoingResearch2].map((research) => (
            <div className="col-md-6 d-flex justify-content-center" key={research.id}>
              <div className={`${styles.projectCard} card`}>
                <div className="card-body">
                  <h3 className="card-title">{research.title}</h3> 
                  <img src="logo2.png" className="card-img-top" alt="Research logo" />
                  <p className="card-text">{research.description}</p>
                  <Link href={`/projects/${research.id}`} className="btn btn-primary">
                    Click to Know More!
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        */}
      </main>
    </div>
  );
}

export default Projects;
