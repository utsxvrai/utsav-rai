import React, { useState, useEffect } from 'react';
import { FaBell, FaTimes, FaExclamationCircle, FaSync, FaGithub, FaTwitter } from 'react-icons/fa';
import './Notification.css';

const Notification = ({ 
  notifications: propNotifications = [], 
  loading: propLoading, 
  error: propError, 
  onRefresh, 
  onClose 
}) => {
  const [notifications, setNotifications] = useState(propNotifications);
  const [loading, setLoading] = useState(propLoading || false);
  const [error, setError] = useState(propError || null);
  
  // Fetch latest GitHub actions and Twitter tweets
  useEffect(() => {
    const fetchLatestActivity = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch GitHub actions
        const githubResponse = await fetch('https://api.github.com/users/utsavrai/events');
        
        if (!githubResponse.ok) {
          throw new Error('Failed to fetch GitHub activity');
        }
        
        const githubData = await githubResponse.json();
        const githubNotifications = githubData
          .filter(event => event.type === 'PushEvent' || event.type === 'CreateEvent')
          .slice(0, 3)
          .map(event => ({
            id: event.id,
            type: 'github',
            message: event.type === 'PushEvent' 
              ? `Pushed to ${event.repo.name}` 
              : `Created ${event.payload.ref_type} in ${event.repo.name}`,
            time: formatTimeAgo(new Date(event.created_at))
          }));
        
        // Fetch Twitter tweets (would normally use Twitter API)
        // For demo purposes, using placeholder data
        const twitterNotifications = [
          {
            id: 't1',
            type: 'twitter',
            message: 'Just shared a new blog post about backend development',
            time: 'just now'
          }
        ];
        
        // Combine notifications
        setNotifications([...githubNotifications, ...twitterNotifications]);
      } catch (err) {
        console.error('Error fetching activity:', err);
        setError('Failed to load recent activity');
        
        // Fallback notifications
        setNotifications([
          { id: 'g1', type: 'github', message: 'Pushed to utsavrai/portfolio', time: '2 hours ago' },
          { id: 't1', type: 'twitter', message: 'Just shared a new blog post about backend development', time: '4 hours ago' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLatestActivity();
  }, []);
  
  // Format time to relative format (e.g., "2 hours ago")
  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} years ago`;
    
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;
    
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
    
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
    
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    
    return seconds <= 10 ? 'just now' : `${seconds} seconds ago`;
  };

  const handleRefresh = () => {
    // Use provided refresh function or internal refresh
    if (onRefresh) {
      onRefresh();
    } else {
      // Component's internal refresh logic
      const fetchLatestActivity = async () => {
        setLoading(true);
        setError(null);
        
        try {
          // Fetch GitHub actions
          const githubResponse = await fetch('https://api.github.com/users/utsavrai/events');
          
          if (!githubResponse.ok) {
            throw new Error('Failed to fetch GitHub activity');
          }
          
          const githubData = await githubResponse.json();
          const githubNotifications = githubData
            .filter(event => event.type === 'PushEvent' || event.type === 'CreateEvent')
            .slice(0, 3)
            .map(event => ({
              id: event.id,
              type: 'github',
              message: event.type === 'PushEvent' 
                ? `Pushed to ${event.repo.name}` 
                : `Created ${event.payload.ref_type} in ${event.repo.name}`,
              time: formatTimeAgo(new Date(event.created_at))
            }));
          
          // Combine notifications
          setNotifications(githubNotifications);
        } catch (err) {
          console.error('Error fetching activity:', err);
          setError('Failed to load recent activity');
        } finally {
          setLoading(false);
        }
      };
      
      fetchLatestActivity();
    }
  };

  const renderNotificationContent = () => {
    if (loading) {
      return (
        <div className="notification-loading">
          <div className="spinner"></div>
          <p>Loading activity...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="notification-error">
          <FaExclamationCircle size={24} />
          <p>{error}</p>
          <button className="refresh-btn" onClick={handleRefresh}>
            <FaSync /> Retry
          </button>
        </div>
      );
    }
    
    if (!notifications.length) {
      return (
        <div className="notification-empty">
          <p>No recent activity found</p>
        </div>
      );
    }
    
    return (
      <>
        <div className="notification-list">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`notification-item ${notification.type}`}
            >
              <div className="notification-icon">
                {notification.type === 'github' ? <FaGithub /> : <FaTwitter />}
              </div>
              <div className="notification-content">
                <p>{notification.message}</p>
                <div className="notification-time">{notification.time}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="notification-footer">
          <button className="refresh-btn small" onClick={handleRefresh}>
            <FaSync /> Refresh
          </button>
          <button className="view-all-btn">View All</button>
        </div>
      </>
    );
  };

  return (
    <div className="notification-dropdown">
      <div className="notification-header">
        <h3>Recent Activity</h3>
        <div className="notification-actions">
          {!loading && notifications.length > 0 && (
            <div className="notification-count">{notifications.length}</div>
          )}
          <button className="close-notification" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
      </div>
      
      {renderNotificationContent()}
    </div>
  );
};

export default Notification; 