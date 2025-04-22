import React, { useState } from 'react';
import './Projects.css';
import { FaStar, FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaCode } from 'react-icons/fa';

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = [
    {
      id: 1,
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
      id: 2,
      name: 'Cron-Socket-Notifier',
      image: '/assets/projects/cron-socket.jpg',
      status: 'development',
      description: [
        'Built a task tracking system using Node.js to monitor daily tasks like LeetCode problems with completion status.',
        'Implemented cron jobs to reset tasks at midnight and check for incomplete tasks at 10 PM.',
        'Integrated Socket.IO for real-time notifications to connected clients.'
      ],
      technologies: ['Node.js', 'Socket.IO', 'Cron', 'JavaScript'],
      githubLink: 'https://github.com/utsxvrai/cron-socket-notifier'
    },
    
  ];

  const nextProject = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const visibleProjects = () => {
    const mobileView = window.innerWidth < 768;
    if (mobileView) {
      return [projects[activeIndex]];
    } else {
      return projects;
    }
  };

  return (
    <section id="projects" className="projects">
      <div className="container projects-container">
        <div className="section-title">
          <h2>Featured <span>Projects</span></h2>
          <p>A showcase of my recent work and technical expertise</p>
        </div>
        
        <div className="projects-content">
          {window.innerWidth < 768 && (
            <div className="project-navigation">
              <button className="nav-btn prev" onClick={prevProject}>
                <FaChevronLeft />
              </button>
              <span className="project-counter">{activeIndex + 1}/{projects.length}</span>
              <button className="nav-btn next" onClick={nextProject}>
                <FaChevronRight />
              </button>
            </div>
          )}
          
          <div className="projects-grid">
            {visibleProjects().map((project) => (
              <div key={project.id} className="project-card">
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects; 