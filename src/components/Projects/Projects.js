import React from 'react';
import './Projects.css';
import { FaStar, FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';

const Projects = () => {
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
      demoLink: 'https://juet-play.vercel.app/',
      githubLink: '#' // Keeping existing placeholder or link if known
    },
    {
      id: 2,
      name: 'CacheFlow',
      image: 'https://i.ibb.co/cjsfhdg/Screenshot-2025-12-05-034958.png', 
      description: [
        'Simple and powerful caching for Node.js with local memory and Redis support.',
        'Features automatic failover, auto-reconnect, and health checks for production readiness.',
        '3 lines to get started with in-memory Map-based caching and easy scaling to Redis.'
      ],
      technologies: ['Node.js', 'Redis', 'TypeScript', 'Docker', 'NPM'],
      demoLink: 'https://cache-flow.vercel.app/',
      githubLink: 'https://github.com/cr7bit/cacheflow'
    },
    {
      id: 3,
      name: 'GrindTech',
      image: 'https://i.ibb.co/7NCB2sVz/Screenshot-2025-12-05-035033.png', // Placeholder
      description: [
        'AI-powered SaaS platform for technical interview preparation with instant evaluation.',
        'Features voice answering using Faster-Whisper STT and LLM-based feedback.',
        'Built with modular architecture, Redis caching, and structured level-based learning.'
      ],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Faster-Whisper', 'LLM'],
      demoLink: 'https://grindtech.vercel.app/',
      githubLink: '#'
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container projects-container">
        <div className="section-title">
          <h2>Featured <span>Projects</span></h2>
          <p>A showcase of my recent work and technical expertise</p>
        </div>
        
        <div className="projects-content">
          <div className="projects-grid">
            {projects.map((project) => (
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
                      {project.githubLink && project.githubLink !== '#' && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link github">
                          <FaGithub /> Code
                        </a>
                      )}
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