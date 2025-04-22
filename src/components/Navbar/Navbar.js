import React, { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaBell, FaTwitter } from 'react-icons/fa';
import Notification from '../Notification/Notification';
import VisitorCounter from '../VisitorCounter/VisitorCounter';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [ticking, setTicking] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showNotifications, setShowNotifications] = useState(false);
  
  const navbarRef = useRef(null);
  const notificationsRef = useRef(null);

  // Handle notification bell click
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle scroll events and active section detection
  useEffect(() => {
    let prevScrollY = window.scrollY;
    
    // Throttle scroll events - moved inside useEffect
    const throttleScroll = (callback) => {
      if (!ticking) {
        setTicking(true);
        window.requestAnimationFrame(() => {
          callback();
          setTicking(false);
        });
      }
    };
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled past threshold for styling
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setIsHidden(false); // Always show navbar at the top
      }

      // Hide/show based on scroll direction
      if (!isMobileMenuOpen) {
        // Only hide when we've scrolled down a significant amount
        if (currentScrollY > prevScrollY && currentScrollY > 150) {
          setIsHidden(true);
        } else if (currentScrollY < prevScrollY) {
          setIsHidden(false);
        }
      }
      
      // Update prev scroll position
      prevScrollY = currentScrollY;
      
      // Find active section with throttling to improve performance
      throttleScroll(() => {
        const sections = ['home', 'about', 'skills', 'projects', 'achievements', 'contact'];
        let currentActive = 'home';
        
        sections.forEach(sectionId => {
          const section = document.getElementById(sectionId);
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              currentActive = sectionId;
            }
          }
        });
        
        setActiveSection(currentActive);
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobileMenuOpen, ticking]);

  // Update useEffect to handle body class for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId) => {
    // Handle both "home" and "hero" sections as the same
    let targetId = sectionId;
    if (sectionId === 'home') {
      // First try to find a section with id "home"
      const homeSection = document.getElementById('home');
      // If not found, try to find "hero" section
      if (!homeSection) {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
          targetId = 'hero';
        }
      }
    }
    
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav 
      ref={navbarRef}
      className={`navbar ${isScrolled ? 'scrolled' : ''} ${isHidden ? 'hidden' : ''}`}
    >
      <div className="container navbar-container">
        <div className="logo">
          <a href="#hero" onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}>
            <span className="logo-text">UR</span>
            <span className="logo-indicator"></span>
          </a>
        </div>

        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul>
            <li className={activeSection === 'home' ? 'active' : ''}>
              <a href="#hero" onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}>Home</a>
            </li>
            <li className={activeSection === 'about' ? 'active' : ''}>
              <a href="#about" onClick={() => scrollToSection('about')}>About Me</a>
            </li>
            <li className={activeSection === 'skills' ? 'active' : ''}>
              <a href="#skills" onClick={() => scrollToSection('skills')}>Skills</a>
            </li>
            <li className={activeSection === 'projects' ? 'active' : ''}>
              <a href="#projects" onClick={() => scrollToSection('projects')}>Projects</a>
            </li>
            <li className={activeSection === 'achievements' ? 'active' : ''}>
              <a href="#achievements" onClick={() => scrollToSection('achievements')}>Achievements</a>
            </li>
            <li className={activeSection === 'contact' ? 'active' : ''}>
              <a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a>
            </li>
          </ul>
          
          <div className="mobile-icons">
            <VisitorCounter />
            <div className="mobile-social-icons">
              <a href="https://github.com/utsavrai" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/utsav-rai-161671b16" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com/utsxvrai" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className="nav-actions">
          {/* Visitor Counter */}
          <VisitorCounter />
          
          {/* Notification Bell */}
          <div className="notification-wrapper" ref={notificationsRef}>
            <button 
              className="notification-bell" 
              onClick={handleNotificationClick}
              aria-label="Notifications"
            >
              <FaBell />
            </button>
            
            {showNotifications && (
              <Notification onClose={() => setShowNotifications(false)} />
            )}
          </div>
          
          <div className="social-icons">
            <a href="https://github.com/utsxvrai" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/utsav-rai-161671b16" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com/utsxvrai" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
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