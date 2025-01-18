import React, { useState, useEffect } from 'react';
import Link from 'next/link'; 
import { useRouter } from 'next/router'; 
import Image from 'next/image';
import styles from './Header2.module.css'; 

function Header2() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();


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
    <header className={`${styles.navbarWrapper} ${scrolled ? styles.scrolled : ''}`}>
    <div className={styles.headerContainer}>
    <nav className={` ${styles.mainNavbar} navbar navbar-expand-lg navbar-dark ${styles.navbarCustom}`}>
      <div className={`container ${styles.navbarContainer}`}>
        <Link className="navbar-brand" href="/">
          <Image src="/logo.png" alt="Logo" className={styles.logoImg} width={40} height={40} />
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
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse`} id="navbarSupportedContent">
          <ul className={`navbar-nav ms-auto ${styles.navbarRightContent}`}>
            {[
              { name: 'Home', path: '/' },
              { name: 'Recruitments', path: '/recruitments' },
              { name: 'Events', path: '/events' },
              { name: 'About Us', path: '/about' },
              { name: 'Club Gallery', path: '/gallery' },
              { name: 'Projects', path: '/Projects' },
              { name: 'Blog', path: '/blog' },
              { name: 'Contact', path: '/contact' }
            ].map((item) => (
              <li  className={styles.navItem} key={item.path}>
                <Link style={{textDecoration: 'none'}} className={`${styles.navLink} ${router.pathname === item.path ? styles.active : ''}`} href={item.path}>
                  {item.name}
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