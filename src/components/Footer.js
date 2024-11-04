import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css'; // Import the CSS Module

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row">
          <div className="col-md-3 px-5">
            <h5 className="py-2">About</h5>
            <ul className="list-unstyled">
              <li><Link href="/about"><a className="text-light">Club</a></Link></li>
              <li><Link href="/about#team-members"><a className="text-light">Our Team</a></Link></li>
              <li><Link href="/gallery"><a className="text-light">Club Gallery</a></Link></li>
            </ul>
          </div>
          <div className="col-md-3 px-5">
            <h5 className="py-2">Events</h5>
            <ul className="list-unstyled">
              <li><Link href="/events"><a className="text-light">Hackathons</a></Link></li>
              <li><Link href="/events#podcasts"><a className="text-light">Podcasts</a></Link></li>
            </ul>
          </div>
          <div className="col-md-3 px-5">
            <h5 className="py-2">Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="https://www.instagram.com/iris_mitwpu/" className="text-light" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://github.com/IRIS-MITWPU" className="text-light" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://www.youtube.com/@IRIS-MITWPU" className="text-light" target="_blank" rel="noopener noreferrer">YouTube</a></li>
              <li><a href="https://chat.whatsapp.com/Lnu3YpiEM4WDmwCjwDCY6n" className="text-light" target="_blank" rel="noopener noreferrer">WhatsApp Community</a></li>
            </ul>
          </div>
          <div className="col-md-3 px-5">
            <h5 className="py-2">Policies</h5>
            <ul className="list-unstyled">
              <li><Link href="/policy"><a className="text-white">Privacy Policy</a></Link></li>
              <li><Link href="/terms"><a className="text-white">Terms & Conditions</a></Link></li>
              <li><Link href="/refund"><a className="text-white">Refund Policy</a></Link></li>
            </ul>
          </div>
        </div>
        <hr className="mx-0" />
        <div className="text-center mt-4">
          <p>&copy; 2024 I.R.I.S. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
