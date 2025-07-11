import React, { useState } from 'react';
import './Projects.css';
import { FaStar, FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaCode } from 'react-icons/fa';

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const projectsPerPageDesktop = 3;
  const projectsPerPageMobile = 1;

  const projects = [
    {
      id: 1,
      name: 'JUET Play',
      image: 'https://i.ibb.co/5XF8SGs9/juetplay.png',
      description: [
        'Developed a comprehensive application for hosting and managing sports matches, including real-time scoring.',
        'Features include user registration, match creation, score updates, and historical match viewing.',
        'Utilized modern web technologies to ensure a responsive and interactive user experience.'
      ],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Docker', 'Kubernetes', 'AWS', 'Redis'],
      demoLink: 'https://juet-play.vercel.app/'
    },
    {
      id: 2,
      name: 'Online Complaint Portal',
      image: 'https://i.ibb.co/j9tk51zq/ocp.png',
      description: [
        'Developed a full-stack online complaint portal enabling users to submit, track, and manage complaints.',
        'Implemented user authentication and authorization with JWT for secure access.',
        'Designed and integrated a robust database schema using MongoDB for efficient data storage.'
      ],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
      demoLink: 'https://ocp-india.vercel.app/'
    },
    {
      id: 3,
      name: 'UdaanServices',
      image: '/assets/projects/udaanservices.jpg',
      description: [
        'Developed a scalable microservices-based backend for flight management, handling booking, pricing, and authentication.',
        'Implemented RESTful APIs with Node.js and Express.js, using Sequelize ORM for MySQL interactions.',
        'Deployed with Docker and Kubernetes for containerization and seamless scalability.'
      ],
      technologies: ['Node.js', 'Express', 'MySQL', 'Docker', 'Kubernetes'],
      githubLink: 'https://github.com/utsxvrai/Flight-Service'
    },
    {
      id: 4,
      name: 'Twixer',
      image: 'https://i.ibb.co/Dr1n1d2/twixer.png', // Placeholder image
      status: 'development',
      description: [
        'Developed a Twitter clone focusing on real-time features using Redis Pub/Sub and Socket.IO.',
        'Implemented scalable architecture with Docker and AWS for deployment.',
        'Explored microservices patterns and asynchronous communication for a responsive user experience.'
      ],
      technologies: ['Node.js', 'Express', 'Redis', 'Socket.IO', 'AWS', 'Docker', 'Kubernetes'],
      githubLink: '#' // Placeholder for GitHub link
    }
  ];

  const nextProject = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const getProjectsToDisplay = () => {
    const isMobile = window.innerWidth < 768;
    const projectsToRenderCount = isMobile ? projectsPerPageMobile : projectsPerPageDesktop;

    if (projects.length <= projectsToRenderCount) {
      return projects.map((p, idx) => ({...p, _carouselIndex: idx}));
    }

    const displayedProjects = [];
    for (let i = 0; i < projectsToRenderCount; i++) {
      displayedProjects.push({
        ...projects[(activeIndex + i) % projects.length],
        _carouselIndex: (activeIndex + i) % projects.length
      });
    }
    return displayedProjects;
  };

  const shouldShowNavigation = projects.length > (window.innerWidth < 768 ? projectsPerPageMobile : projectsPerPageDesktop);

  // For pagination dots
  const isActiveDot = (idx) => idx === activeIndex;

  return (
    <section id="projects" className="projects">
      <div className="container projects-container">
        <div className="section-title">
          <h2>Featured <span>Projects</span></h2>
          <p>A showcase of my recent work and technical expertise</p>
        </div>
        
        <div className="projects-content">
          {shouldShowNavigation && (
            <div className="project-navigation">
              <button className="nav-btn prev" onClick={prevProject}>
                <FaChevronLeft />
              </button>
              <button className="nav-btn next" onClick={nextProject}>
                <FaChevronRight />
              </button>
            </div>
          )}
          <div className="projects-carousel-container">
            <div className="projects-grid">
              {getProjectsToDisplay().map((project, idx) => {
                // Center card is active
                const isActive = idx === Math.floor(getProjectsToDisplay().length / 2);
                return (
                  <div key={project.id} className={`project-card${isActive ? ' active' : ' inactive'}`}>
                    <div className="project-image">
                      <img src={project.image} alt={project.name} />
                      {project.status === 'development' && (
                        <div className="project-status development">
                          <FaCode />
                          <span>Under Development</span>
                        </div>
                      )}
                      <div className="project-overlay">
                        <h3>{project.name}</h3>
                        <div className="project-links">
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link github">
                            <FaGithub /> Code
                          </a>
                          {project.demoLink && (
                            <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="project-link demo">
                              <FaExternalLinkAlt /> Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="project-info">
                      <h3 className="project-name">
                        {project.name}
                        {project.status === 'development' && (
                          <span className="status-badge development">Under Development</span>
                        )}
                      </h3>
                      <div className="project-tech">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                      <ul className="project-features">
                        {project.description.map((feature, index) => (
                          <li key={index}>
                            <FaStar className="feature-icon" /> {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="project-pagination">
              {projects.map((_, idx) => (
                <span
                  key={idx}
                  className={`project-dot${isActiveDot(idx) ? ' active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects; 