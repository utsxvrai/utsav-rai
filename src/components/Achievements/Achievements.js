import React, { useState } from 'react';
import './Achievements.css';
import { FaTrophy, FaCode, FaLaptopCode, FaGithub, FaExternalLinkAlt, FaAngleRight, FaMedal, FaAward, FaCertificate } from 'react-icons/fa';
import { SiPostman, SiLeetcode, SiCodechef, SiCodeforces, SiHackerrank } from 'react-icons/si';

const Achievements = () => {
  const [activeAchievement, setActiveAchievement] = useState(0);

  const achievements = [
    { 
      icon: <FaTrophy />, 
      title: "3x Winner - Kodethon",
      color: "#FFD700",
      subtitle: "College Coding Competition",
      text: "Demonstrated problem-solving and coding skills by winning Kodethon three times, competing against 100+ skilled programmers.",
      link: "#" 
    },
    { 
      icon: <FaCode />, 
      title: "Competitive Programming",
      color: "#3498db",
      subtitle: "Multiple Platforms",
      text: "Achieved significant ratings on major competitive programming platforms:",
      stats: [
        { name: "LeetCode", icon: <SiLeetcode />, value: "Knight 1856", link: "https://leetcode.com/Kalki07/" },
        { name: "Codeforces", icon: <SiCodeforces />, value: "Pupil 1304", link: "https://codeforces.com/profile/cr7bit" },
        { name: "CodeChef", icon: <SiCodechef />, value: "3★ 1782", link: "https://www.codechef.com/users/cr7bit" },
        { name: "HackerRank", icon: <SiHackerrank />, value: "5★ Algorithm", link: "#" }
      ]
    },
    { 
      icon: <FaLaptopCode />, 
      title: "Freshmen Hacks Hackathon",
      color: "#9b59b6",
      subtitle: "1st Place",
      text: "Led a 4-member team to develop the project Present Sir, securing 1st place for innovation and technical proficiency.",
      link: "https://devfolio.co/projects/present-sir-75e9" 
    },
    {
      icon: <SiPostman />,
      title: "Postman API Expert",
      color: "#FF6C37",
      subtitle: "Professional Certification",
      text: "Awarded for demonstrating proficiency with APIs and Postman by completing foundational tasks and passing all tests with a submitted Postman Collection.",
      link: "https://badgr.com/public/assertions/CiujQeB7R9SpP9fYdEiK-w"
    },
    {
      icon: <FaGithub />,
      title: "Hacktoberfest Contributor",
      color: "#21262d",
      subtitle: "Open Source Contribution",
      text: "Participated in Hacktoberfest 2023, contributing to open source projects and promoting collaborative development.",
      link: "https://www.holopin.io/@utsxvrai#"
    }
  ];

  return (
    <section id="achievements" className="achievements">
      <div className="container achievements-container">
        <div className="section-title">
          <h2>My <span>Achievements</span></h2>
          <p>Recognition and milestones in my professional journey</p>
        </div>
        
        <div className="achievements-content">
          <div className="achievements-showcase">
            <div className="achievement-tabs">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className={`achievement-tab ${activeAchievement === index ? 'active' : ''}`}
                  onClick={() => setActiveAchievement(index)}
                  style={{'--tab-color': achievement.color}}
                >
                  <div className="tab-icon">{achievement.icon}</div>
                  <div className="tab-info">
                    <h3>{achievement.title}</h3>
                    <p>{achievement.subtitle}</p>
                  </div>
                  <FaAngleRight className="tab-arrow" />
                </div>
              ))}
            </div>
            
            <div className="achievement-display">
              <div className="achievement-card" style={{'--highlight-color': achievements[activeAchievement].color}}>
                <div className="achievement-header">
                  <div className="achievement-icon-large">
                    {achievements[activeAchievement].icon}
                  </div>
                  <div className="achievement-title-group">
                    <h2>{achievements[activeAchievement].title}</h2>
                    <span className="achievement-subtitle">{achievements[activeAchievement].subtitle}</span>
                  </div>
                </div>
                
                <div className="achievement-description">
                  <p>{achievements[activeAchievement].text}</p>
                  
                  {achievements[activeAchievement].stats && (
                    <div className="achievement-stats">
                      {achievements[activeAchievement].stats.map((stat, index) => (
                        <a 
                          href={stat.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          key={index} 
                          className="stat-item"
                        >
                          <div className="stat-icon">{stat.icon}</div>
                          <div className="stat-details">
                            <span className="stat-name">{stat.name}</span>
                            <span className="stat-value">{stat.value}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                
                {achievements[activeAchievement].link && (
                  <a 
                    href={achievements[activeAchievement].link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="achievement-link"
                  >
                    <span>View Details</span>
                    <FaExternalLinkAlt />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="achievements-badges">
            <h3 className="badges-title">Additional Recognitions</h3>
            <div className="badges-container">
              <div className="badge">
                <div className="badge-icon"><FaMedal /></div>
                <h4>Top 5% in DSA</h4>
                <p>LeetCode Assessment</p>
              </div>
              <div className="badge">
                <div className="badge-icon"><FaAward /></div>
                <h4>Performance Award</h4>
                <p>College Department</p>
              </div>
              <div className="badge">
                <div className="badge-icon"><FaCertificate /></div>
                <h4>API Security</h4>
                <p>Certificate of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements; 