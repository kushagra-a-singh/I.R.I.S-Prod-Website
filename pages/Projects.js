import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import styles from './Projects.module.css'; 

export function Projects() {
  const ongoingTechnicalProjects = [
    {
      id: 1,
      title: "Club Website",
      description: "Some info about website",
    },
    {
      id: 2,
      title: "Autonomous Vehicle",
      description: "Info about autonomous vehicle",
    },
  ];

  const ongoingResearchProjects = [
    // {
    //   id: 3,
    //   title: "Research",
    //   description: "Info about research project",
    // },
    // {
    //   id: 4,
    //   title: "Research",
    //   description: "Info about research project",
    // },
  ];

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
        <h1 className={styles.title}>Projects</h1>

        {/* Technical Projects Section */}
        <h2 className={styles.title}>Ongoing Technical Projects</h2>
        <div className="row">
          {ongoingTechnicalProjects.map((project) => (
            <div className="col-md-6 d-flex justify-content-center" key={project.id}>
              <div className={`${styles.projectCard} card`}>
                <div className="card-body">
                  <h3 className="card-title">{project.title}</h3>
                  <Image 
                    src="/logo2.png" 
                    className="card-img-top" 
                    alt="Project logo" 
                    width={300} 
                    height={200} 
                  />
                  <p className="card-text">{project.description}</p>
                  <Link href={`/projects/${project.id}`} passHref>
                    Click to Know More!
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Research Section */}
        {/* <h2 className={styles.title}>Ongoing Research</h2> */}
        <div className="row">
          {ongoingResearchProjects.map((research) => (
            <div className="col-md-6 d-flex justify-content-center" key={research.id}>
              <div className={`${styles.projectCard} card`}>
                <div className="card-body">
                  <h3 className="card-title">{research.title}</h3>
                  <Image 
                    src="/logo2.png" 
                    className="card-img-top" 
                    alt="Research logo" 
                    width={300} 
                    height={200} 
                  />
                  <p className="card-text">{research.description}</p>
                  <Link href={`/projects/${research.id}`} passHref>
                    Click to Know More!
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Projects;
