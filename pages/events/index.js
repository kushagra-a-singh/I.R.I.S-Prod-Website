import React, { useEffect } from 'react';
import Link from 'next/link'; 
import Image from 'next/image'; 
import styles from './Events.module.css';

function Events() {
  const pastEvents = [
    {
      id: 3,
      title: "I.R.I.S. Ice Breaker 2025",
      image: "/icebreaker.jpeg",
      date: "2025-01-24",
      description: "The IRIS Ice Breaker 2025 brought together over 25 members, including new recruits, existing members, and the core team, for a session filled with introductions, interactive games, and team-building activities. A brainstorming discussion encouraged valuable ideas for future events, while fostering enthusiasm and collaboration among participants. The event successfully strengthened relationships, boosted team spirit, and set a positive tone for the year ahead.",
    },
    {
      id: 2,
      title: "I.R.I.S. Innovation Hackathon 2024",
      description: "We hope you enjoyed the exhilarating event organized by the I.R.I.S. Club!",
      image: "/sephackathon.jpg",
      date: "9/28/2024",
      highlights: [
        "The I.R.I.S. Innovation Hackathon gathered enthusiastic participants competing for exciting prizes, including ₹36,000 in BharatGo vouchers for the top three teams.",
        "The event offered valuable networking opportunities, allowing attendees to connect with industry leaders and fellow innovators.",
        "This collaborative environment fostered teamwork and creativity, leading to innovative solutions to real-world challenges.",
      ],
      conclusion: "Thank you for joining us and contributing to a dynamic event that fuels creativity and innovation!",
    },
    {
      id: 1,
      title: "Innovation Hackathon",
      description: "The Inter-Campus Open Innovation Hackathon, organized by ASPIRE with Engineer's Cradle, I.R.I.S. and MIT-TBI, gathered Pune students. Teams of up to two registered online and competed at their colleges. The top three teams advanced to the finals at MIT-WPU, where they built prototypes, received mentorship, and pitched to experts. Exciting prizes included cash rewards and funding opportunities.",
      image: "/past-innovation-hackathon.jpg",
      date: "2024-02-15",
    },
  ];
  pastEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

  const podcast = {
    id: 1,
    title: "I.R.I.S. Podcast",
    description: "Our latest podcast episode",
    image: "/podcast1.jpg",
    date: "2024-03-14",
    length: "Length: 21 mins 02 secs",
  };

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
    <div className={styles?.events}>
      <main className={styles?.mainContent} style={{ paddingTop: '8rem' }}>
        <h1 className={styles?.title} style={{ textAlign: "center", fontWeight: 'bolder', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }} >Events</h1>

        <section className={styles?.upcomingEvents}>
          <h2 className={styles?.upcoming}>Upcoming Events</h2>
          <p className={styles?.text}>Stay tuned for more upcoming exciting events!</p>
        </section>

        <section className={styles?.pastEvents}>
          <h2 className={styles?.past}>Past Events</h2>
          <div className={styles?.eventList}>
            {pastEvents.map((event) => (
              <div key={event.id} className={styles?.eventCard}>
                <Image
                  className={styles?.eventImage}
                  src={event.image}
                  alt={event.title}
                  width={600} // Adjust width as needed
                  height={400} // Adjust height as needed
                  layout="responsive"
                />
                <div className={styles?.eventDetails}>
                  <h2>{event.title}</h2>
                  <p className={styles?.date}>Held on: {new Date(event.date).toLocaleDateString('en-GB')}</p>
                  <p className={styles?.description}>{event.description}</p>
                  {event.highlights && (
                    <ul className={styles?.highlightsList}>
                      {event.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                  {event.conclusion && <p className={styles?.conclusion}>{event.conclusion}</p>}
                  <Link href={`/events/${event.id}`} className={styles?.btn}>
                    Click to know more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="podcasts" className={styles?.podcasts} style={{ marginBottom: '4rem' }}>
          <h2 className={styles?.podcastTitle}>Podcasts</h2>
          <div className={styles?.eventList}>
            <div key={podcast.id} className={styles?.eventCard}>
              <Image
                className={styles?.eventImage}
                src={podcast.image}
                alt={podcast.title}
                width={700}
                height={500}
                layout="responsive"
              />
              <div className={styles?.eventDetails}>
                <h2>{podcast.title}</h2>
                <p className={styles?.description}>{podcast.description}</p>
                <p className={styles?.date}>
                  <span>{podcast.date}</span>
                  <span> | {podcast.length}</span>
                </p>
                <a
                  href="https://www.youtube.com/watch?v=sFbYHID_w2c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles?.btn}
                >
                  Listen now
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Events;
