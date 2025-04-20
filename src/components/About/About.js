import React from 'react';
import './About.css';
import { FaGithub, FaLinkedin, FaCode, FaServer, FaDatabase, FaNodeJs, FaCloud, FaAws } from 'react-icons/fa';
import { SiExpress, SiMongodb, SiPostgresql, SiDocker, SiGraphql, SiRedis, SiNginx, SiJavascript, SiGo, SiSocketdotio, SiRabbitmq, SiMicrosoftazure } from 'react-icons/si';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container about-container">
        <div className="section-title">
          <h2>About <span>Me</span></h2>
        </div>

        <div className="about-content">
          <div className="about-header">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-button red"></div>
                <div className="terminal-button yellow"></div>
                <div className="terminal-button green"></div>
                <div className="terminal-title">utsav@developer:~</div>
              </div>
              <div className="terminal-body">
                <div className="line">
                  <span className="prompt">$</span> whoami
                </div>
                <div className="line">
                  <span className="response">Utsav Rai - Backend Developer & Problem Solver</span>
                </div>
                <div className="line">
                  <span className="prompt">$</span> cat about_me.txt
                </div>
                <div className="line">
                  <span className="response">I'm a third-year Computer Science and Engineering student at Jaypee University of Engineering and Technology (GPA: 8.6/10), hailing from Gopalganj, Bihar.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about-text">
            <div className="about-me-card">
              <div className="card-header">
                <FaDatabase className="backend-icon" />
                <h3>Backend Expertise</h3>
              </div>
              <p>
                By day, I'm coding scalable systems or crushing it in competitive programming. I specialize in building robust server-side architectures and efficient database solutions that power modern web applications.
              </p>
            </div>

            <div className="about-me-card">
              <div className="card-header">
                <FaNodeJs className="backend-icon" />
                <h3>Development Approach</h3>
              </div>
              <p>
                I focus on creating clean, maintainable code with performance and security in mind. My approach combines thorough planning with agile development practices to deliver high-quality solutions that meet real-world needs.
              </p>
            </div>

            <div className="about-me-card">
              <div className="card-header">
                <FaCloud className="backend-icon" />
                <h3>Beyond Coding</h3>
              </div>
              <p>
                When I'm not immersed in code, you'll find me on the cricket field or cheering for my favorite football team. I'm all about blending my love for tech and sports to tackle challenges with energy and creativity.
              </p>
            </div>
          </div>

          <div className="backend-architecture">
            <div className="architecture-title">My Backend Stack</div>
            <div className="architecture-diagram">
              <div className="arch-layer client-layer">
                <div className="arch-label">Client Layer</div>
                <div className="arch-node">
                <FaServer /> RESTful Services
                  
                </div>
                <div className="arch-node">
                <SiGraphql /> GraphQL APIs
                </div>
                <div className="arch-node">
                <FaCode /> API Gateway
                  
                </div>
                <div className="arch-node">
                <SiSocketdotio /> WebSockets
                </div>
              </div>

              <div className="arch-layer server-layer">
                <div className="arch-label">Application Layer</div>
                <div className="arch-node">
                  <FaNodeJs /> Node.js
                </div>
                <div className="arch-node">
                  <SiExpress /> Express.js
                </div>
                <div className="arch-node">
                  <SiJavascript /> Javascript
                </div>
                <div className="arch-node">
                  <SiGo /> GoLang
                </div>
              </div>

              <div className="arch-layer data-layer">
                <div className="arch-label">Data Layer</div>
                <div className="arch-node">
                  <SiMongodb /> MongoDB
                </div>
                <div className="arch-node">
                  <SiPostgresql /> PostgreSQL
                </div>
                <div className="arch-node">
                  <SiRedis /> Redis Cache
                </div>
                <div className="arch-node">
                  <SiRabbitmq /> Message Queues
                </div>
              </div>

              <div className="arch-layer infrastructure-layer">
                <div className="arch-label">DevOps & Cloud</div>
                <div className="arch-node">
                  <SiDocker /> Docker
                </div>
                <div className="arch-node">
                  <FaAws /> AWS
                </div>
                <div className="arch-node">
                  <SiMicrosoftazure /> Azure
                </div>
                <div className="arch-node">
                  <SiNginx /> Nginx
                </div>
              </div>
            </div>
          </div>

          <div className="about-social">
            <a href="https://github.com/utsavrai" target="_blank" rel="noopener noreferrer" className="social-btn">
              <FaGithub /> GitHub
            </a>
            <a href="https://linkedin.com/in/utsav-rai-161671b16" target="_blank" rel="noopener noreferrer" className="social-btn">
              <FaLinkedin /> LinkedIn
            </a>
            <a href="https://utsav-rai-blog.vercel.app" target="_blank" rel="noopener noreferrer" className="social-btn">
              <FaCode /> Blog
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;