import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './Header2.module.css';

function Header2() {
  const [scrolled, setScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
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

  const handleNavLinkClick = () => {
    setIsNavOpen(false);

    try {
      const navbarCollapse = document.getElementById('navbarSupportedContent');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        
        if (typeof window !== 'undefined' && window.bootstrap) {
          const bsCollapse =
            window.bootstrap.Collapse.getInstance(navbarCollapse) ||
            new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
          bsCollapse.hide();
        } else {
          navbarCollapse.classList.remove('show');
        }
      }
    } catch (error) {
      const navbarCollapse = document.getElementById('navbarSupportedContent');
      if (navbarCollapse) {
        navbarCollapse.classList.remove('show');
      }
    }
  };

  useEffect(() => {
    setIsNavOpen(false);
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    if (navbarCollapse) {
      navbarCollapse.classList.remove('show');
    }
  }, [router.pathname]);

  return (
    <header className={`${styles.navbarWrapper} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContainer}>
        <nav
          className={` ${styles.mainNavbar} border-blue-600 navbar navbar-expand-lg navbar-dark ${styles.navbarCustom}`}
        >
          <div className={`container ${styles.navbarContainer}`}>
            <Link className="navbar-brand" href="/" passHref>
              <div onClick={handleNavLinkClick} style={{ cursor: 'pointer' }}>
                <Image
                  src="/logo3.gif"
                  alt="Logo"
                  className={styles.logoImg}
                  width={40}
                  height={40}
                  unoptimized
                />
              </div>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded={isNavOpen}
              aria-label="Toggle navigation"
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={`collapse ${styles.navbarCollapse} navbar-collapse ${isNavOpen ? 'show' : ''}`}
              id="navbarSupportedContent"
            >
              <ul className={`navbar-nav ms-auto   ${styles.navbarRightContent}`}>
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Recruitments', path: '/recruitments' },
                  { name: 'Events', path: '/events' },
                  { name: 'About Us', path: '/about' },
                  { name: 'Club Gallery', path: '/gallery' },
                  { name: 'Projects', path: '/Projects' },
                  { name: 'Research', path: '/research' },
                  { name: 'CrossThink', path: '/crossthink' },
                  { name: 'Blog', path: '/blog' },
                  { name: 'Contact', path: '/contact' },
                ].map((item) => (
                  <li className={styles.navItem} key={item.path}>
                    <Link
                      style={{ textDecoration: 'none' }}
                      className={`${styles.navLink} ${router.pathname === item.path ? styles.active : ''
                        }`}
                      href={item.path}
                      passHref>
                      <span onClick={handleNavLinkClick} style={{ cursor: 'pointer' }}>
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header2;
