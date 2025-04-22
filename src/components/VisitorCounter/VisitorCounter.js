import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import { getViewCount } from '../../utils/analyticsService';
import './VisitorCounter.css';

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to get and update the visitor count
    const updateVisitorCount = () => {
      try {
        const count = getViewCount();
        setVisitorCount(count);
        setLoading(false);
      } catch (error) {
        console.error('Error updating visitor count:', error);
        setLoading(false);
      }
    };

    // Update count immediately
    updateVisitorCount();
    
    // Set up a timer to periodically refresh the count (every 30 seconds)
    const intervalId = setInterval(updateVisitorCount, 30000);
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="visitor-counter">
      <FaEye className="eye-icon" />
      {loading ? (
        <span className="counter-loading">...</span>
      ) : (
        <>
          <span className="counter-number">{visitorCount.toLocaleString()}</span>
          <span className="counter-label">VIEWS</span>
        </>
      )}
    </div>
  );
};

export default VisitorCounter; 