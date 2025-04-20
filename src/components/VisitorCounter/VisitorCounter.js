import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import './VisitorCounter.css';

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch visitor count
    const fetchVisitorCount = async () => {
      try {
        // First, try to get the count from localStorage to avoid unnecessary API calls
        const storedCount = localStorage.getItem('portfolio_visitor_count');
        const lastUpdate = localStorage.getItem('portfolio_last_update');
        const now = new Date().getTime();
        
        // If we have a stored count and it was updated in the last 24 hours, use it
        if (storedCount && lastUpdate && (now - parseInt(lastUpdate)) < 24 * 60 * 60 * 1000) {
          setVisitorCount(parseInt(storedCount));
          setLoading(false);
          return;
        }
        
        // Otherwise, get a fresh count
        // For simplicity, we'll simulate a count for now
        // In a real implementation, you'd call your backend API
        
        let count;
        
        // In production, this would be an API call to your backend
        // Example: const response = await fetch('https://your-api.com/visitor-count');
        // const data = await response.json();
        // count = data.count;
        
        // For demo purposes, we'll simulate an API call by retrieving and incrementing 
        // a value from localStorage as our simple persistence
        const persistedCount = localStorage.getItem('portfolio_visitor_total') || '0';
        count = parseInt(persistedCount) + 1;
        localStorage.setItem('portfolio_visitor_total', count.toString());
        
        // Update state and cache
        setVisitorCount(count);
        localStorage.setItem('portfolio_visitor_count', count.toString());
        localStorage.setItem('portfolio_last_update', now.toString());
        
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        // Use a fallback value if there's an error
        setVisitorCount(942); // Fallback to a reasonable number
      } finally {
        setLoading(false);
      }
    };

    fetchVisitorCount();
    
    // Register page view (increment counter)
    // This would typically be an API call to your backend
    const registerPageView = async () => {
      try {
        // In a real implementation, you'd call your backend API
        // Example: await fetch('https://your-api.com/register-visit', { method: 'POST' });
        
        // For demo purposes, we'll simulate by increasing the count after a delay
        setTimeout(() => {
          const currentCount = parseInt(localStorage.getItem('portfolio_visitor_count') || '0');
          const newCount = currentCount + 1;
          localStorage.setItem('portfolio_visitor_count', newCount.toString());
          setVisitorCount(newCount);
        }, 3000); // Delay to simulate API call
      } catch (error) {
        console.error('Error registering page view:', error);
      }
    };
    
    // Only register a page view if this is a new session
    const lastVisit = sessionStorage.getItem('portfolio_last_visit');
    if (!lastVisit) {
      registerPageView();
      sessionStorage.setItem('portfolio_last_visit', new Date().toISOString());
    }
    
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