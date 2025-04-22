import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import './VisitorCounter.css';

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Get the API URL dynamically based on environment
  const getApiUrl = () => {
    if (process.env.NODE_ENV === 'production') {
      // In production, use the deployed URL
      return 'https://your-vercel-deployment-url.vercel.app/api/visitor-count';
    } else {
      // In development, use localhost
      return 'http://localhost:3000/api/visitor-count';
    }
  };

  useEffect(() => {
    // Function to fetch visitor count from MongoDB
    const fetchVisitorCount = async () => {
      try {
        // Always get the count from the API
        const response = await fetch(getApiUrl());
        const data = await response.json();
        setVisitorCount(data.count);
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        // Use a fallback value if there's an error
        const fallbackCount = parseInt(localStorage.getItem('portfolio_visitor_total') || '942');
        setVisitorCount(fallbackCount);
      } finally {
        setLoading(false);
      }
    };

    // Function to register a new visit
    const registerPageView = async () => {
      try {
        // Check if this session has already been counted
        if (sessionStorage.getItem('portfolio_visited')) {
          return; // Already counted this session
        }

        // Get the last visit day from localStorage
        const lastVisitDay = localStorage.getItem('portfolio_last_visit_day');
        const today = new Date().toDateString();

        // Only count as a new visit if it's a new day or first visit
        if (lastVisitDay !== today) {
          // Make API call to increment counter
          const response = await fetch(getApiUrl(), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          const data = await response.json();
          setVisitorCount(data.count);
          
          // Mark this session as visited and save the day
          sessionStorage.setItem('portfolio_visited', 'true');
          localStorage.setItem('portfolio_last_visit_day', today);
          
          // Also save to localStorage as a fallback
          localStorage.setItem('portfolio_visitor_total', data.count.toString());
        }
      } catch (error) {
        console.error('Error registering visit:', error);
      }
    };

    // First fetch the current count
    fetchVisitorCount();
    
    // Then register the new visit after a short delay
    const timerId = setTimeout(() => {
      registerPageView();
    }, 1500);
    
    return () => clearTimeout(timerId);
  }, []);

  return (
    <div className="visitor-counter">
      <FaEye className="eye-icon" />
      {loading ? (
        <span className="counter-loading">...</span>
      ) : (
        <>
          <span className="counter-number">{visitorCount.toLocaleString()}</span>
          <span className="counter-label">VISITORS</span>
        </>
      )}
    </div>
  );
};

export default VisitorCounter; 