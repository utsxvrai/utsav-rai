import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [ticking, setTicking] = useState(false);

  // Throttle scroll events
  const throttleScroll = (callback) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        callback();
        setTicking(false);
      });
      setTicking(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      throttleScroll(() => {
        const currentScrollY = window.scrollY;
        
        // Determine if scrolled past threshold
        if (currentScrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
          setIsHidden(false); // Always show navbar at the top
        }

        // Determine scroll direction (don't hide when mobile menu is open)
        if (!isMobileMenuOpen) {
          if (currentScrollY > lastScrollY && currentScrollY > 150) {
            // Scrolling down & past threshold
            setIsHidden(true);
          } else if (currentScrollY < lastScrollY) {
            // Scrolling up
            setIsHidden(false);
          }
        }

        setLastScrollY(currentScrollY);
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, ticking, isMobileMenuOpen]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isHidden ? 'hidden' : ''}`}>
      <div className="container navbar-container">
        <div className="logo">
          <a href="#home">
            <span className="logo-text">UR</span>
          </a>
        </div>

        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><a href="#home" onClick={() => scrollToSection('home')}>Home</a></li>
            <li><a href="#about" onClick={() => scrollToSection('about')}>About Me</a></li>
            <li><a href="#skills" onClick={() => scrollToSection('skills')}>Skills</a></li>
            <li><a href="#projects" onClick={() => scrollToSection('projects')}>Projects</a></li>
            <li><a href="#achievements" onClick={() => scrollToSection('achievements')}>Achievements</a></li>
            <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
          </ul>
        </div>

        <div className="social-icons">
          <a href="https://github.com/utsavrai" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/utsav-rai-161671b16" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://leetcode.com/" target="_blank" rel="noopener noreferrer">
            <SiLeetcode />
          </a>
        </div>

        <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <div className={`bar ${isMobileMenuOpen ? 'active' : ''}`}></div>
          <div className={`bar ${isMobileMenuOpen ? 'active' : ''}`}></div>
          <div className={`bar ${isMobileMenuOpen ? 'active' : ''}`}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 