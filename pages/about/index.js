import React, { useEffect, useState } from "react";
import styles from "./About.module.css";
import Image from "next/image";
import { ChevronDownIcon } from "lucide-react";

function About() {
  const [isPastMembersExpanded, setIsPastMembersExpanded] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const backgroundVideo = "/bgVid.webm";

  // Past members data
  const pastMembers = [

    {
      name: "Lakshman Gopal",
      role: "Design Team Member",
      imgSrc: "/lakshman.jpg",
      linkedIn: "https://www.linkedin.com/in/lakshman-k-gopal/",
    },
    {
      name: "Grishma Shinde",
      role: "General Secretary",
      imgSrc: "/grishma.jpg",
      linkedIn:
        "https://www.linkedin.com/in/grishma-shinde-835343294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Namra Doshi",
      role: "Vice President",
      imgSrc: "/namra.jpeg",
      linkedIn:
        "https://www.linkedin.com/in/namra-doshi-445976249/",
    },
    {
      name: "Raghunandan Veer",
      role: "Founder",
      imgSrc: "/logo2.png",
      linkedIn:
        "https://www.linkedin.com/in/raghunandan-veer-31b724266/",
    },
    {
      name: "Durgesh Deore",
      role: "Founder",
      imgSrc: "/durgesh.jpg",
      linkedIn:
        "https://www.linkedin.com/in/durgesh-deore-74a75a281/",
    },
    {
      name: "Kavish Jain",
      role: "Founder",
      imgSrc: "/kavish.jpeg",
      linkedIn:
        "https://www.linkedin.com/in/kavish-jain-38b812247/",
    },
    {
      name: "Chinmay Huddar",
      role: "Founder",
      imgSrc: "/chinmay.jpg",
      linkedIn:
        "https://www.linkedin.com/in/chinmay-huddar-3536761ab/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Dhyey Ladani",
      role: "Founder",
      imgSrc: "/dhyey.jpg",
      linkedIn: "https://www.linkedin.com/in/dhyey-ladani/",
    },
    {
      name: "Brandon Cerejo",
      role: "Treasurer",
      imgSrc: "/Brandon.jpg",
      linkedIn:
        "https://www.linkedin.com/in/brandon-cerejo-921275247/",
    },
    {
      name: "Surendra Rajawat",
      role: "Content Management Head",
      imgSrc: "/surendra.jpg",
      linkedIn:
        "https://www.linkedin.com/in/surendra-rajawat-b16807322/",
    },
    {
      name: "Richa Shukla",
      role: "Event Operation Head",
      imgSrc: "/Richa.jpg",
      linkedIn:
        "https://www.linkedin.com/in/richa-shukla-026516258/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Manasee Ambhore",
      role: "Sponsorship Head",
      imgSrc: "/manasee.jpg",
      linkedIn:
        "https://www.linkedin.com/in/manasee-ambhore-87ab65287/",
    },
    {
      name: "Aaryan Joshi",
      role: "Research Head",
      imgSrc: "/aaryan.jpg",
      linkedIn: "https://www.linkedin.com/in/aaryanjoshi/",
    },
    {
      name: "Parth Ware",
      role: "Founder",
      imgSrc: "/Parth.jpg",
      linkedIn:
        "https://www.linkedin.com/in/parth-ware-48993324a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Sarthak Patil",
      role: "Founder",
      imgSrc: "/sarthak.jpeg",
      linkedIn:
        "https://www.linkedin.com/in/sarthak-patil-aa453a219/",
    }, 
    
  ];

  return (
    <div className={styles.aboutUs}>
      <div className={styles.videoBackground}>
        <video autoPlay muted loop className={styles.video}>
          <source src={backgroundVideo} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className={styles.overlay}></div>

      <main className={`${styles.content} py-5`}>
        <div className="container">
          <h1 className={styles.title} style={{ textAlign: "center" }}>
            About I.R.I.S
          </h1>
          <p className={styles.titleDesc}>
            I.R.I.S (Innovation Research & Intelligence Support) is a tech club
            dedicated to fostering innovation and supporting research in the
            field of technology.
          </p>
          <div className="row">
            <div className="col-md-6">
              <div className={`${styles.contactInfo} p-4`}>
                <h2>Contact Information</h2>
                <p>Email: iris@mitwpu.edu.in</p>
                <p>Phone: +91 7715958053</p>
                <p>
                  Address: MIT World Peace University, Survey No. 124, Paud Rd,
                  Kothrud, Pune, Maharashtra 411038
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className={`${styles.mission} p-4`}>
                <h2>Our Mission</h2>
                <h4>To provide a platform for tech enthusiasts to:</h4>
                <ul>
                  <li>Collaborate</li>
                  <li>Learn</li>
                  <li>Innovate</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={`${styles.vision} p-4`}>
            <h2>Our Vision</h2>
            <p>
              To be the leading tech community that drives technological
              advancements and shapes the future of innovation.
            </p>
          </div>

          <div className="row">
            <h2>Faculty Mentors</h2>
            <div className="col-6">
              <div className={styles.mentor}>
                <Image
                  src="/shamlaMaam.jpeg"
                  alt="Dr. Shamla Mantri"
                  className={styles.mentorImage}
                  width={150}
                  height={150}
                />
                <div className={styles.mentorInfo}>
                  <h3>Dr. Shamla Mantri</h3>
                  <p>Associate Professor</p>
                  <a
                    href="https://scholar.google.com/citations?user=IUUENAMAAAAJ&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className={styles.mentor}>
                <Image
                  src="/yogeshSir.jpg"
                  alt="Dr. Yogesh Kulkarni"
                  className={styles.mentorImage}
                  width={150}
                  height={150}
                />
                <div className={styles.mentorInfo}>
                  <h3>Dr. Yogesh Kulkarni</h3>
                  <p>Assistant Professor</p>
                  <a
                    href="https://scholar.google.com/citations?user=9GsTeoQAAAAJ&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </div>
            <div className="col-6">
              {/* Faculty Mentor 3 */}
              <div className={styles.mentor}>
                <Image
                  src="/Pratvina_mam.png"
                  alt="Pratvina Talele"
                  className={styles.mentorImage}
                  width={150}
                  height={150}
                />
                <div className={styles.mentorInfo}>
                  <h3>Dr. Pratvina Talele</h3>
                  <p>Project Mentor</p>
                  <a
                    href="https://scholar.google.com/citations?hl=en&user=_sFHQ8UAAAAJ"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </div>
            <div className="col-6">
              {/* Faculty Mentor 3 */}
              <div className={styles.mentor}>
                <Image
                  src="/sumedha.png"
                  alt="Sumedha Sirsikar"
                  className={styles.mentorImage}
                  width={150}
                  height={150}
                />
                <div className={styles.mentorInfo}>
                  <h3>Dr. Sumedha Sirsikar</h3>
                  <p>Project Mentor</p>
                  <a
                    href="https://scholar.google.com/citations?user=26-mdWgAAAAJ&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div id="team-members" className={`${styles.teamMembers} py-4`}>
            <h2>Team Members</h2>
            <div className="row gx-2 gy-3">
              {[

                {
                  name: "Riya Kondawar",
                  role: "President",
                  imgSrc: "/Riya.jpg",
                  linkedIn: "https://www.linkedin.com/in/riyakondawar/",
                },

                {
                  name: "Kaustubha M",
                  role: "Vice President",
                  imgSrc: "/kawas.jpeg",
                  linkedIn: "https://www.linkedin.com/in/kawas-nandan/",
                },

                {
                  name: "Arya Kale",
                  role: "Secretary",
                  imgSrc: "/logo2.png",
                  linkedIn: "https://www.linkedin.com/in/arya-kale-13129732a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                },

                {
                  name: "Soham Mhatre",
                  role: "Treasurer",
                  imgSrc: "/soham.jpg",
                  linkedIn:
                    "https://www.linkedin.com/in/soham-mhatre-125700373?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                },
               
                {
                  name: "Kushagra Singh",
                  role: "Technical Head",
                  imgSrc: "/Kush.jpg",
                  linkedIn: "https://www.linkedin.com/in/kushagra-anit-singh/",
                },
                {
                  name: "Taksh Dhabalia",
                  role: "Technical Head",
                  imgSrc: "/taksh.jpeg",
                  linkedIn:
                    "https://www.linkedin.com/in/taksh-dhabalia-2b6969202/",
                },
               
                {
                  name: "Samanyu Bhate",
                  role: "Technical Head",
                  imgSrc: "/samanyu.jpg",
                  linkedIn:
                    "https://www.linkedin.com/in/samanyu-bhate-17136b1ab/",
                },

                {
                  name: "Divyansh Pathak",
                  role: "Project Head",
                  imgSrc: "/divyansh.jpg",
                  linkedIn: "https://www.linkedin.com/in/divyansh-pathak/",
                },

                {
                  name: "Namrata Mankar",
                  role: "Media Head",
                  imgSrc: "/logo2.png",
                  linkedIn: "#",
                },
                {
                  name: "Aakanksha Pansare",
                  role: "Events-Ops Head",
                  imgSrc: "/aakanksha1.jpg",
                  linkedIn: "#",
                },
                /*{
                  name: "Natasha Chavan",
                  role: " Marketing Lead",
                  imgSrc: "/logo2.png",
                  linkedIn: "#",
                },*/
                {
                  name: "Archana Sonakul",
                  role: "Design Head",
                  imgSrc: "/Archana Sonakul.jpg",
                  linkedIn:
                    "https://in.linkedin.com/in/archana-sonakul-588794305",
                },

                {
                  name: "Bhavya Rana",
                  role: "Marketing Head",
                  imgSrc: "/logo2.png",
                  linkedIn: "#",
                },
                {
                  name: "Parag Bhat",
                  role: "Research Head",
                  imgSrc: "/parag.jpg",
                  linkedIn: "https://www.linkedin.com/in/parag-bhat-1b92ab330/",
                },
                {
                  name: "Nishtha M",
                  role: "Content Head",
                  imgSrc: "/nishtha.jpg",
                  linkedIn:
                    "https://www.linkedin.com/in/nishtha-pharma?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                },

                {
                  name: "Purva Rana",
                  role: "Technical Advisor",
                  imgSrc: "/Purva.jpg",
                  linkedIn: "https://www.linkedin.com/in/purva-rana/",
                },
                
                {
                  name: "Shourya Gurjar",
                  role: "Website Team Member",
                  imgSrc: "/logo2.png",
                  linkedIn: "https://www.linkedin.com/in/shourya-gurjar-1b5317305?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
                },
          
                {
                  name: "Aditya",
                  role: "Website Team Member",
                  imgSrc: "/Aditya_M.jpg",
                  linkedIn: "https://www.linkedin.com/in/adityamahamuni/",
                },
                {
                  name: "Siya Shaha",
                  role: "Website Team Member",
                  imgSrc: "/siya.jpg",
                  linkedIn: "https://www.linkedin.com/in/siya-shaha-5bb3822b4/",
                },          


              ].map((member, index) => (
                <div key={index} className="col-6 col-sm-6 col-lg-4">
                  <div className={styles.card}>
                    <div className={styles.topCard}>
                      <Image
                        src={member.imgSrc}
                        alt={`${member.name} image`}
                        width={190}
                        height={160}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderTopLeftRadius: "20px",
                          borderTopRightRadius: "20px",
                        }}
                      />
                    </div>
                    <div className={styles.bottomCard}>
                      <div className={styles.cardContent}>
                        <span className={styles.cardTitle}>{member.name}</span>
                        <p className={styles.cardTxt}>{member.role}</p>
                        <a
                          href={member.linkedIn}
                          className={styles.cardBtn}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          linkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Members Collapsible Section */}
          <div className={`${styles.teamMembers} py-4`}>
            <div className={styles.pastMembersHeader}>
              <h2>Past Members</h2>
              <button
                className={styles.toggleButton}
                onClick={() => setIsPastMembersExpanded(!isPastMembersExpanded)}
                aria-expanded={isPastMembersExpanded}
              >
                <span className={styles.toggleText}>
                  {isPastMembersExpanded ? "Hide Past Members" : "Show Past Members"}
                </span>
                <span className={`${styles.arrow} ${isPastMembersExpanded ? styles.arrowUp : styles.arrowDown}`}>
                  <ChevronDownIcon />
                </span>
              </button>
            </div>
            
            <div className={`${styles.pastMembersContent} ${isPastMembersExpanded ? styles.expanded : styles.collapsed}`}>
              <div className="row gx-2 gy-3">
                {pastMembers.map((member, index) => (
                  <div key={index} className="col-6 col-sm-6 col-lg-4">
                    <div className={styles.card}>
                      <div className={styles.topCard}>
                        <Image
                          src={member.imgSrc}
                          alt={`${member.name} image`}
                          width={190}
                          height={160}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderTopLeftRadius: "20px",
                            borderTopRightRadius: "20px",
                          }}
                        />
                      </div>
                      <div className={styles.bottomCard}>
                        <div className={styles.cardContent}>
                          <span className={styles.cardTitle}>{member.name}</span>
                          <p className={styles.cardTxt}>{member.role}</p>
                          <a
                            href={member.linkedIn}
                            className={styles.cardBtn}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            linkedIn
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default About;
