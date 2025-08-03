import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './Header.module.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    if (navbarCollapse) {
      navbarCollapse.classList.remove('show');
    }
  }, [router.pathname]);


  const handleNavLinkClick = () => {
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      try {
        if (typeof window !== 'undefined' && window.bootstrap) {
          const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, {
            toggle: false,
          });
          bsCollapse.hide();
        } else {
          navbarCollapse.classList.remove('show');
        }
      } catch (error) {
        navbarCollapse.classList.remove('show');
      }
    }
  };

  return (
    <header className={`fixed-top ${scrolled ? 'scrolled' : ''}`}>
      <nav className={`navbar navbar-expand-lg navbar-dark ${scrolled ? 'navbar-dark-scrolled' : ''}`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} >
        <div className="container" style={{
          background: 'linear-gradient(90deg, rgb(0, 0, 0) 0%, rgb(75, 1, 64) 50%, rgb(54, 1, 75) 100%)',
          transition: 'all 0.3s ease',
          borderRadius: '0 0 15px 15px',
          padding: '0.5rem 1rem'
        }}>
          <Link className="navbar-brand" href="/" passHref>
            <div onClick={handleNavLinkClick} style={{ cursor: 'pointer' }}>
              <Image src="/logo.png" alt="Logo" className="logo-img" width={40} height={40} />
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg data-wf-icon="Menu24Icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M19 7H5V6H19V7ZM19 12H5V11H19V12ZM19 17H5V16H19V17Z" fill="currentColor"></path>
            </svg>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${router.pathname === '/' ? 'active' : ''}`} href="/" passHref>
                  <span onClick={handleNavLinkClick} style={{ cursor: 'pointer' }}>Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${router.pathname === '/recruitments' ? 'active' : ''}`} href="/recruitments" passHref>
                  <span onClick={handleNavLinkClick} style={{ cursor: 'pointer' }}>Recruitments</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${router.pathname === '/events' ? 'active' : ''}`} href="/events" passHref>
                  <span onClick={handleNavLinkClick} style={{ cursor: 'pointer' }}>Events</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${router.pathname === '/about' ? 'active' : ''}`} href="/about" passHref>
                  <span onClick={handleNavLinkClick} style={{ cursor: 'pointer' }}>About Us</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${router.pathname === '/gallery' ? 'active' : ''}`} href="/gallery" passHref>
                  <span onClick={handleNavLinkClick} style={{ cursor: 'pointer' }}>Club Gallery</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${router.pathname === '/Projects' ? 'active' : ''}`} href="/Projects" passHref>
                  <span onClick={handleNavLinkClick} style={{ cursor: 'pointer' }}>Projects</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${router.pathname === '/blog' ? 'active' : ''}`} href="/blog" passHref>
                  <span onClick={handleNavLinkClick} style={{ cursor: 'pointer' }}>Blog</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${router.pathname === '/contact' ? 'active' : ''}`} href="/contact" passHref>
                  <span onClick={handleNavLinkClick} style={{ cursor: 'pointer' }}>Contact</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}


export default Header;