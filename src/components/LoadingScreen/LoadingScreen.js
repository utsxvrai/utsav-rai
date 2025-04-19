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
    
    // Slow down the animation while keeping 4 seconds total duration
    const totalDuration = 5000; // 5 seconds total (a bit slower)
    const lineDisplayTimes = [
      totalDuration * 0.15, // 750ms for first line
      totalDuration * 0.15, // 750ms for second line
      totalDuration * 0.25, // 1250ms for third line (longer text)
      totalDuration * 0.15, // 750ms for fourth line
      totalDuration * 0.15, // 750ms for fifth line
      totalDuration * 0.15  // 750ms for sixth line
    ];
    
    // Add pauses between lines
    const pauseBetweenLines = 200; // 200ms pause between lines
    
    let timeoutIds = [];
    
    const typeNextLine = (lineIndex, startTime) => {
      const line = lines[lineIndex];
      const displayTime = lineDisplayTimes[lineIndex];
      
      // Slow down typing by using smaller chunks
      // For longer lines, type more characters at 
      const charsPerStep = Math.ceil(line.length / (displayTime / 50)) - 1;
      const minCharsPerStep = 1;
      const actualCharsPerStep = Math.max(minCharsPerStep, charsPerStep);
      
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < line.length) {
          setText(line.substring(0, Math.min(line.length, currentIndex + actualCharsPerStep)));
          currentIndex += actualCharsPerStep;
        } else {
          clearInterval(typingInterval);
          
          if (lineIndex < lines.length - 1) {
            // Add pause between lines for readability
            const nextLineTimeout = setTimeout(() => {
              setText('');
              setCurrentLine(lineIndex + 1);
              typeNextLine(lineIndex + 1, Date.now());
            }, pauseBetweenLines);
            timeoutIds.push(nextLineTimeout);
          } else {
            // After all lines are complete, longer pause on final line
            const fadeTimeout = setTimeout(() => {
              setFadeOut(true);
              const completeTimeout = setTimeout(() => {
                onComplete();
              }, 400);
              timeoutIds.push(completeTimeout);
            }, 500);
            timeoutIds.push(fadeTimeout);
          }
        }
      }, 50); // Slower typing speed (50ms between typing actions)
      
      return () => {
        clearInterval(typingInterval);
        timeoutIds.forEach(id => clearTimeout(id));
      };
    };
    
    // Start typing the first line
    const cleanup = typeNextLine(0, Date.now());
    
    return cleanup;
  }, [onComplete]);
  
  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="terminal">
        <div className="terminal-header">
          <div className="terminal-button red"></div>
          <div className="terminal-button yellow"></div>
          <div className="terminal-button green"></div>
          <div className="terminal-title">utsav@developer:~</div>
        </div>
        <div className="terminal-content">
          {Array.from({ length: currentLine }).map((_, index) => (
            <div key={index} className="command-line previous-line">
              <span className="prompt">$</span>
              <span className="command">{index === 0 ? 'npm -init' : 
                index === 1 ? 'Initializing my portfolio...' :
                index === 2 ? 'Installing dependencies: about me, projects, skills...' :
                index === 3 ? 'Dev server started on port 2004' :
                index === 4 ? 'Engineering connection successful' : ''}</span>
            </div>
          ))}
          <div className="command-line">
            <span className="prompt">$</span>
            <span className="command">{text}</span>
            <span className={`cursor ${cursorVisible ? 'visible' : ''}`}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 