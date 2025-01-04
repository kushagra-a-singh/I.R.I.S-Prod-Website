import React, { useState, useEffect } from 'react';
import Link from 'next/link'; 
import { useRouter } from 'next/router'; 
import Image from 'next/image';
import styles from './Header.module.css'; 

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]); 

  const topscrollFunction = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavLinkClick = () => {
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    if (navbarCollapse.classList.contains('show')) {
      const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, {
        toggle: false,
      });
      bsCollapse.hide();
    }
  };

  return (
    <header className={`fixed-top ${scrolled ? 'scrolled' : ''}`}>
    <nav className={`navbar navbar-expand-lg navbar-dark ${scrolled ? 'navbar-dark-scrolled' : ''}`}>
      <div className="container">
        <Link className="navbar-brand" href="/">
          <Image src="/logo.png" alt="Logo" className="logo-img" width={70} height={70} />
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
              <Link className={`nav-link ${router.pathname === '/' ? 'active' : ''}`} href="/" onClick={handleNavLinkClick}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${router.pathname === '/events' ? 'active' : ''}`} href="/events" onClick={handleNavLinkClick}>
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${router.pathname === '/about' ? 'active' : ''}`} href="/about" onClick={handleNavLinkClick}>
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${router.pathname === '/Gallery' ? 'active' : ''}`} href="/gallery" onClick={handleNavLinkClick}>
                Club Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${router.pathname === '/Projects' ? 'active' : ''}`} href="/Projects" onClick={handleNavLinkClick}>
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${router.pathname === '/blog' ? 'active' : ''}`} href="/blog" onClick={handleNavLinkClick}>
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${router.pathname === '/contact' ? 'active' : ''}`} href="/contact" onClick={handleNavLinkClick}>
                Contact
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
