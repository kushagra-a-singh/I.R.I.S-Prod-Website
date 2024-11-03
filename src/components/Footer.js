import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="bg-dark text-light py-3">
        <div className="container">
            <div className="row">
              <div className="col-md-3 px-5">
                <h5 className="py-2">About</h5>
                <ul className="list-unstyled">
                  <li><Link to="/about" className="text-light">Club</Link></li>
                  <li><Link to="/about#team-members" className="text-light">Our Team</Link></li>
                  <li><Link to="/gallery" className="text-light">Club Gallery</Link></li>
                  {/* <li><Link to="/blog" className="text-light">Blog</Link></li> */}
                </ul>
              </div>
              <div className="col-md-3 px-5">
                <h5 className="py-2">Events</h5>
                <ul className="list-unstyled">
                  <li><Link to="/events" className="text-light">Hackathons</Link></li>
                  <li><Link to="/events#podcasts" className="text-light">Podcasts</Link></li>
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
                <li><Link to="/policy" className="text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-white">Terms & Conditions</Link></li>
                <li><Link to="/refund" className="text-white">Refund Policy</Link></li>
                </ul>
              </div>
            </div>
            <hr className="mx-0"></hr>
            <div className="text-center mt-4">
              <p>&copy; 2024 I.R.I.S. All rights reserved</p>
            </div>
        </div>
    </footer>
  );
}

export default Footer;
