import React, { useState, useRef, useEffect } from 'react';
import { supabase } from './supabase';
import { BrowserRouter as Router } from 'react-router-dom';
import styles from './pages/Contact.module.css';
import backgroundVideo from './pages/vid2.mp4';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRouter from './Router.js';
import Projects from './pages/Projects'; // Adjust the path as necessary

//import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <AppRouter />
        <Footer />
        {/* <Analytics /> */}
      </div>
    </Router>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [showNotification, setShowNotification] = useState(false);
  const [contacts, setContacts] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        console.log('Fetched data:', data);
        setContacts(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithTimestamp = {
        ...formData,
        created_at: new Date().toISOString(),
      };

      // Insert form data into Supabase
      const { data, error } = await supabase
        .from('contacts')
        .insert(formDataWithTimestamp);

      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log('Data inserted');
        setShowNotification(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        fetchData();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleOkayButton = () => {
    setShowNotification(false);
  };

  return (
    <div className={styles.contact}>
      <div className={styles.videoBackground}>
        <video autoPlay muted loop>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className={styles.overlay}></div>
      <Header />
      <main className={styles.content}>
        <h1 className={styles.contactUsTitle}>Contact Us</h1>
        <p className={styles.titleDesc}>
          If you have a new and innovative scalable project, unique idea, or research you'd like to pursue, fill out the form below. We're here to help guide and support you!
        </p>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number*</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="subject">Subject*</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Description*</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <button type="submit">Send Message</button>
          </div>
        </form>
        {showNotification && (
          <div className={styles.notificationPopup}>
            <div className={styles.notificationContent}>
              <h2>Message sent successfully!</h2>
              <p>Your message has been sent. Thank you for reaching out!</p>
              <button onClick={handleOkayButton}>Okay</button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export { App, Contact }