import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row">
          <div className="col-md-3 px-5">
            <h5 className="py-2">About</h5>
            <ul className="list-unstyled">
              <li><Link href="/about" className="text-light">Club</Link></li>
              <li><Link href="/about#team-members" className="text-light">Our Team</Link></li>
              <li><Link href="/gallery" className="text-light">Club Gallery</Link></li>
            </ul>
          </div>
          <div className="col-md-3 px-5">
            <h5 className="py-2">Events</h5>
            <ul className="list-unstyled">
              <li><Link href="/events" className="text-light">Hackathons</Link></li>
              <li><Link href="/events#podcasts" className="text-light">Podcasts</Link></li>
            </ul>
          </div>
          <div className="col-md-3 px-5">
            <h5 className="py-2">Follow Us</h5>
            <ul className="list-unstyled">
              <li><Link href="https://www.instagram.com/iris_mitwpu/" className="text-light" target="_blank" rel="noopener noreferrer">Instagram</Link></li>
              <li><Link href="https://github.com/IRIS-MITWPU" className="text-light" target="_blank" rel="noopener noreferrer">GitHub</Link></li>
              <li><Link href="https://www.youtube.com/@IRIS-MITWPU" className="text-light" target="_blank" rel="noopener noreferrer">YouTube</Link></li>
              <li><Link href="https://chat.whatsapp.com/Lnu3YpiEM4WDmwCjwDCY6n" className="text-light" target="_blank" rel="noopener noreferrer">WhatsApp Community</Link></li>
            </ul>
          </div>
          <div className="col-md-3 px-5">
            <h5 className="py-2">Policies</h5>
            <ul className="list-unstyled">
              <li><Link href="/policy" className="text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-white">Terms & Conditions</Link></li>
              <li><Link href="/refund" className="text-white">Refund Policy</Link></li>
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
