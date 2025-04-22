import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';
import { FaDownload, FaRss, FaBlog, FaBriefcase, FaInfoCircle, FaTools, FaCode } from 'react-icons/fa';

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('info');
  const [notificationIcon, setNotificationIcon] = useState(null);
  const heroImagePath = "/assets/WhatsApp Image 2025-03-17 at 16.57.16_e3b09e99 (1).jpg";
  const imageRef = useRef(null);
  const particlesRef = useRef(null);
  const notificationTimeoutRef = useRef(null);

  // Function to show notification
  const showCustomNotification = (message, type = 'info', icon = <FaInfoCircle />) => {
    // Clear any existing timeout
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    
    setNotificationMessage(message);
    setNotificationType(type);
    setNotificationIcon(icon);
    setShowNotification(true);
    
    // Hide notification after 3 seconds
    notificationTimeoutRef.current = setTimeout(() => {
      // Add the hide class for exit animation
      const notification = document.querySelector('.notification');
      if (notification) {
        notification.classList.add('hide');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
          setShowNotification(false);
        }, 300);
      } else {
        setShowNotification(false);
      }
    }, 3000);
  };

  // Cleanup notification timeout on component unmount
  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  // Handle Download CV click
  const handleDownloadClick = (e) => {
    e.preventDefault(); // Prevent default download behavior
    showCustomNotification('CV is currently under revision. Will be available soon!', 'warning', <FaTools />);
  };

  // Handle Blog click 
  const handleBlogClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    showCustomNotification('Blog application is currently under development. Stay tuned!', 'info', <FaCode />);
  };

  // Handle Work Together click
  const handleWorkTogetherClick = (e) => {
    showCustomNotification('Scrolling to contact section...', 'success');
    // Let the default anchor behavior continue
  };

  // Preload the hero image with a forced delay to show loading animation
  useEffect(() => {
    const img = new Image();
    img.src = heroImagePath;
    
    img.onload = () => {
      // Add a minimum delay to ensure loading animation is visible
      setTimeout(() => {
        setImageLoaded(true);
      }, 1500); // 1.5 second delay
    };
    
    // Set a timeout in case the image loads from cache immediately
    setTimeout(() => {
      if (!imageLoaded) {
        img.src = heroImagePath + '?t=' + new Date().getTime();
      }
    }, 100);
  }, []);

  // Handle the 3D tilt effect
  useEffect(() => {
    if (!imageRef.current) return;

    const handleMouseMove = (e) => {
      const containerRect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - containerRect.left;
      const y = e.clientY - containerRect.top;
      
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;
      
      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;
      
      setMousePosition({ x: percentX, y: percentY });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
    };

    imageRef.current.addEventListener('mousemove', handleMouseMove);
    imageRef.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener('mousemove', handleMouseMove);
        imageRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Create and animate particles
  useEffect(() => {
    if (!particlesRef.current) return;
    
    const canvas = particlesRef.current;
    const ctx = canvas.getContext('2d');
    
    const particles = [];
    const particleCount = 50;
    
    // Set canvas size
    const setCanvasSize = () => {
      if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    };
    
    // Create particles
    const createParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.random() * 0.6 + 0.2})`,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5
        });
      }
    };
    
    // Animate particles
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary checks
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
      });
      
      requestAnimationFrame(animateParticles);
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    createParticles();
    animateParticles();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [imageLoaded]);

  return (
    <section id="hero" className="hero">
      {/* Notification container */}
      {showNotification && (
        <div className="notification-container">
          <div className={`notification ${notificationType}`}>
            <div className="notification-content">
              <span className="notification-icon">{notificationIcon}</span>
              <p>{notificationMessage}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-intro">
            <p className="hero-subtitle">Hello, It's Me</p>
            <h1 className="hero-title">Utsav Rai</h1>
            
            {/* Available for work indicator */}
            <div className="availability-indicator">
              <div className="availability-dot"></div>
              <span className="availability-text">Available for Work & Freelance</span>
            </div>
          </div>
          
          <div className="hero-text">
            <p className="hero-role">
              <span className="highlight">Backend Developer and Problem Solver</span>
            </p>
            <p className="hero-tagline">
              <span>"Innovate, Code, Succeed – I'm Your Asset!"</span>
            </p>
          </div>
          
          <div className="hero-cta">
            <a 
              href="#" 
              className="btn download-btn" 
              onClick={handleDownloadClick}
            >
              <FaDownload className="download-icon" /> Download CV
            </a>
            <a 
              href="#" 
              className="btn blog-btn"
              onClick={handleBlogClick}
            >
              <FaBlog className="blog-icon" /> Visit My Blog
            </a>
          </div>
          
          {/* Hire Me Button */}
          <div className="hire-me-container">
            <a 
              href="#contact" 
              className="hire-me-btn"
              onClick={handleWorkTogetherClick}
            >
              <FaBriefcase className="hire-me-icon" />
              <span>Let's Work Together</span>
            </a>
          </div>
        </div>
        
        <div className="hero-image-wrapper">
          <canvas ref={particlesRef} className="particles-canvas"></canvas>
          <div 
            ref={imageRef}
            className={`hero-image-frame ${imageLoaded ? 'loaded' : ''}`}
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 15}deg) rotateX(${mousePosition.y * -15}deg)`,
              transition: mousePosition.x === 0 && mousePosition.y === 0 ? 'transform 0.5s ease' : 'none'
            }}
          >
            {/* Placeholder while image loads */}
            {!imageLoaded && (
              <div className="image-placeholder">
                <div className="placeholder-spinner"></div>
                <div className="loading-text">
                  <span>L</span>
                  <span>O</span>
                  <span>A</span>
                  <span>D</span>
                  <span>I</span>
                  <span>N</span>
                  <span>G</span>
                </div>
                <div className="loading-progress-container">
                  <div className="loading-progress-bar"></div>
                </div>
                <div className="data-scan">
                  <div className="scan-line"></div>
                  <div className="scan-text">Scanning profile data...</div>
                </div>
              </div>
            )}
            <div className="image-glow"></div>
            <div className="image-effects">
              <div className="corner-effect top-left"></div>
              <div className="corner-effect top-right"></div>
              <div className="corner-effect bottom-left"></div>
              <div className="corner-effect bottom-right"></div>
            </div>
            <img 
              src={heroImagePath} 
              alt="Utsav Rai" 
              className={`hero-image ${imageLoaded ? 'visible' : ''}`}
              onLoad={() => setImageLoaded(true)}
              loading="eager"
              fetchpriority="high"
            />
            <div className="image-overlay"></div>
          </div>
          <div className="tech-indicators">
            <div className="tech-dot"></div>
            <div className="tech-dot"></div>
            <div className="tech-dot"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 