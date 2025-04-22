import React, { useState, useEffect } from 'react';
import { FaChevronUp, FaRocket } from 'react-icons/fa';
import './ScrollToTop.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <div 
          onClick={scrollToTop} 
          className={`scroll-to-top ${isMobile ? 'mobile' : ''}`}
          aria-label="Scroll to top"
          title="Back to top"
        >
          {isMobile ? <FaRocket className="scroll-icon" /> : <FaChevronUp className="scroll-icon" />}
          <span className="scroll-effect"></span>
        </div>
      )}
    </>
  );
};

export default ScrollToTop; 