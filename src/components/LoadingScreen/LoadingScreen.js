import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  
  useEffect(() => {
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const lines = [
      'npm -init',
      'Initializing my portfolio...',
      'Installing dependencies: about me, projects, skills...',
      'Dev server started on port 2004',
      'Engineering connection successful',
      'Welcome to Utsav\'s Portfolio!'
    ];
    
    const typeNextLine = (lineIndex) => {
      const line = lines[lineIndex];
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex < line.length) {
          setText(prev => line.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          
          if (lineIndex < lines.length - 1) {
            // Move to next line after a delay
            setTimeout(() => {
              setText('');
              setCurrentLine(lineIndex + 1);
              typeNextLine(lineIndex + 1);
            }, 800);
          } else {
            // After all lines are complete, wait and then fade out
            setTimeout(() => {
              setFadeOut(true);
              // Show website after fadeout animation starts
              setTimeout(() => {
                onComplete();
              }, 500);
            }, 1000);
          }
        }
      }, lineIndex === 0 ? 100 : 30); // Type first line slower, rest faster
      
      return () => clearInterval(typingInterval);
    };
    
    // Start typing the first line
    typeNextLine(0);
  }, [onComplete]);

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="terminal">
        <div className="terminal-header">
          <div className="terminal-button red"></div>
          <div className="terminal-button yellow"></div>
          <div className="terminal-button green"></div>
          <div className="terminal-title">terminal</div>
        </div>
        <div className="terminal-content">
          {Array.from({ length: currentLine }).map((_, index) => (
            <div key={index} className="command-line previous-line">
              <span className="prompt">$ </span>
              <span className="command">{index === 0 ? 'npm -init' : 
                index === 1 ? 'Initializing my portfolio...' :
                index === 2 ?  'Installing dependencies: about me, projects, skills...' :
                index === 3 ? 'Dev server started on port 2004' :
                index === 4 ? 'Engineering connection successful' : ''}</span>
            </div>
          ))}
          <div className="command-line">
            <span className="prompt">$ </span>
            <span className="command">{text}</span>
            <span className={`cursor ${cursorVisible ? 'visible' : ''}`}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 