import React, { useState, useEffect } from 'react';
import './Hero.css';
import { FaDownload, FaRss, FaBlog } from 'react-icons/fa';

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const heroImagePath = "/assets/WhatsApp Image 2025-03-17 at 16.57.16_e3b09e99 (1).jpg";

  // Preload the hero image
  useEffect(() => {
    const img = new Image();
    img.src = heroImagePath;
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-intro">
            <p className="hero-subtitle">Hello, It's Me</p>
            <h1 className="hero-title">Utsav Rai</h1>
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
            <a href="/assets/cv/UtsavRaiCVV3.pdf" className="btn download-btn" download>
              <FaDownload className="download-icon" /> Download CV
            </a>
            <a href="https://utsav-rai-blog.vercel.app" target="_blank" rel="noopener noreferrer" className="btn blog-btn">
              <FaBlog className="blog-icon" /> Visit My Blog
            </a>
          </div>
        </div>
        
        <div className="hero-image-wrapper">
          <div className={`hero-image-frame ${imageLoaded ? 'loaded' : ''}`}>
            {/* Placeholder while image loads */}
            {!imageLoaded && (
              <div className="image-placeholder">
                <div className="placeholder-spinner"></div>
              </div>
            )}
            <img 
              src={heroImagePath} 
              alt="Utsav Rai" 
              className={`hero-image ${imageLoaded ? 'visible' : ''}`}
              onLoad={() => setImageLoaded(true)}
              loading="eager"
              fetchpriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 