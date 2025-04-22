import React from 'react';
import './Skills.css';
import { FaCode, FaDatabase, FaServer, FaCloud, FaJava } from 'react-icons/fa';
import { SiJavascript, SiPython, SiCplusplus, SiReact, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiMysql, SiRedis, SiDocker, SiKubernetes, SiAmazonaws, SiGooglecloud, SiMicrosoftazure, SiGit, SiLinux, SiHtml5, SiCss3, SiGraphql, SiGo } from 'react-icons/si';

const Skills = () => {
  // Skill data with icon, name, and proficiency
  const skills = [
    // Programming Languages
    { icon: <SiJavascript />, name: 'JavaScript', proficiency: 100, color: '#F7DF1E', category: 'language' },
    // { icon: <SiTypescript />, name: 'TypeScript', proficiency: 75, color: '#3178C6', category: 'language' },
    { icon: <SiPython />, name: 'Python', proficiency: 75, color: '#3776AB', category: 'language' },
    { icon: <SiCplusplus />, name: 'C++', proficiency: 80, color: '#00599C', category: 'language' },
    { icon: <FaJava />, name: 'Java', proficiency: 75, color: '#007396', category: 'language' },
    { icon: <SiHtml5 />, name: 'HTML5', proficiency: 75, color: '#E34F26', category: 'language' },
    { icon: <SiCss3 />, name: 'CSS3', proficiency: 70, color: '#1572B6', category: 'language' },
    { icon: <SiGo />, name: 'GoLang', proficiency: 70, color: '#00ADD8', category: 'language' },

    // Frameworks & Libraries
    { icon: <SiNodedotjs />, name: 'Node.js', proficiency: 90, color: '#339933', category: 'framework' },
    { icon: <SiExpress />, name: 'Express', proficiency: 88, color: '#000000', category: 'framework' },
    { icon: <SiReact />, name: 'React', proficiency: 75, color: '#61DAFB', category: 'framework' },
    { icon: <SiGraphql />, name: 'GraphQL', proficiency: 80, color: '#E10098', category: 'framework' },
    // { icon: <SiFlask />, name: 'Flask', proficiency: 75, color: '#000000', category: 'framework' },
    // { icon: <SiDjango />, name: 'Django', proficiency: 70, color: '#092E20', category: 'framework' },
    // { icon: <SiSpringboot />, name: 'Spring Boot', proficiency: 65, color: '#6DB33F', category: 'framework' },
    
    // Databases
    { icon: <SiMongodb />, name: 'MongoDB', proficiency: 90, color: '#47A248', category: 'database' },
    { icon: <SiPostgresql />, name: 'PostgreSQL', proficiency: 85, color: '#336791', category: 'database' },
    { icon: <SiMysql />, name: 'MySQL', proficiency: 85, color: '#4479A1', category: 'database' },
    { icon: <SiRedis />, name: 'Redis', proficiency: 80, color: '#DC382D', category: 'database' },
    // { icon: <SiFirebase />, name: 'Firebase', proficiency: 75, color: '#FFCA28', category: 'database' },
    
    // DevOps & Cloud
    { icon: <SiDocker />, name: 'Docker', proficiency: 80, color: '#2496ED', category: 'devops' },
    { icon: <SiKubernetes />, name: 'Kubernetes', proficiency: 75, color: '#326CE5', category: 'devops' },
    { icon: <SiAmazonaws />, name: 'AWS', proficiency: 80, color: '#FF9900', category: 'devops' },
    { icon: <SiGooglecloud />, name: 'GCP', proficiency: 70, color: '#4285F4', category: 'devops' },
    { icon: <SiMicrosoftazure />, name: 'Azure', proficiency: 70, color: '#0078D4', category: 'devops' },
    { icon: <SiGit />, name: 'Git', proficiency: 90, color: '#F05032', category: 'devops' },
    { icon: <SiLinux />, name: 'Linux', proficiency: 85, color: '#FCC624', category: 'devops' },
  ];

  // Filter skills by category for the spotlight section
  const spotlightSkills = skills.filter(skill => skill.proficiency >= 85).slice(0, 6);
  
  return (
    <section id="skills" className="skills">
      <div className="container skills-container">
        <div className="section-title">
          <h2>Technical <span>Skills</span></h2>
          <p>My professional toolkit and technology expertise</p>
        </div>
        
        <div className="skills-content">
          {/* Spotlight Skills */}
          <div className="skills-spotlight">
            <h3>Key Expertise</h3>
            <div className="spotlight-skills">
              {spotlightSkills.map((skill, index) => (
                <div key={index} className="spotlight-skill">
                  <div className="skill-icon-container" style={{ backgroundColor: `${skill.color}20`, borderColor: skill.color }}>
                    <span className="skill-icon" style={{ color: skill.color }}>{skill.icon}</span>
                  </div>
                  <h4>{skill.name}</h4>
                  <div className="skill-bar-container">
                    <div 
                      className="skill-bar" 
                      style={{ 
                        width: `${skill.proficiency}%`,
                        backgroundColor: skill.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Skills */}
          <div className="skills-all">
            <div className="skills-category">
              <div className="category-header">
                <FaCode />
                <h3>Programming Languages</h3>
              </div>
              <div className="skills-grid">
                {skills.filter(skill => skill.category === 'language').map((skill, index) => (
                  <div key={index} className="skill-item" style={{ borderColor: skill.color }}>
                    <div className="skill-icon" style={{ color: skill.color }}>{skill.icon}</div>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="skills-category">
              <div className="category-header">
                <FaServer />
                <h3>Frameworks & Libraries</h3>
              </div>
              <div className="skills-grid">
                {skills.filter(skill => skill.category === 'framework').map((skill, index) => (
                  <div key={index} className="skill-item" style={{ borderColor: skill.color }}>
                    <div className="skill-icon" style={{ color: skill.color }}>{skill.icon}</div>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="skills-category">
              <div className="category-header">
                <FaDatabase />
                <h3>Databases</h3>
              </div>
              <div className="skills-grid">
                {skills.filter(skill => skill.category === 'database').map((skill, index) => (
                  <div key={index} className="skill-item" style={{ borderColor: skill.color }}>
                    <div className="skill-icon" style={{ color: skill.color }}>{skill.icon}</div>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="skills-category">
              <div className="category-header">
                <FaCloud />
                <h3>DevOps & Cloud</h3>
              </div>
              <div className="skills-grid">
                {skills.filter(skill => skill.category === 'devops').map((skill, index) => (
                  <div key={index} className="skill-item" style={{ borderColor: skill.color }}>
                    <div className="skill-icon" style={{ color: skill.color }}>{skill.icon}</div>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 