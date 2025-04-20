import React, { useState, useEffect } from 'react';
import { FaBell, FaTimes, FaExclamationCircle, FaSync, FaGithub, FaTwitter, FaCode } from 'react-icons/fa';
import './Notification.css';

// Twitter API credentials (would be stored in environment variables in production)
const TWITTER_BEARER_TOKEN = process.env.REACT_APP_TWITTER_BEARER_TOKEN;
const TWITTER_USERNAME = process.env.REACT_APP_TWITTER_USERNAME || 'utsxvrai';

// Debug mode flag
const DEBUG_MODE = true;

// Log credentials for debugging (first few characters only for security)
if (DEBUG_MODE) {
  console.log('Twitter API Credentials Check:');
  console.log('- Bearer Token length:', TWITTER_BEARER_TOKEN?.length || 0, 'Preview:', TWITTER_BEARER_TOKEN?.substring(0, 10) + '...');
  console.log('- Has Bearer Token?', !!TWITTER_BEARER_TOKEN);
  console.log('- Twitter Username:', TWITTER_USERNAME);
}

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
  const [debugInfo, setDebugInfo] = useState(null);
  
  // Fetch Twitter tweets - Using v2 API
  const fetchTwitterTweets = async () => {
    if (!TWITTER_BEARER_TOKEN) {
      console.error('No Twitter Bearer Token available');
      return [];
    }
    
    try {
      if (DEBUG_MODE) console.log('Fetching Twitter user data...');
      console.log('Using username:', TWITTER_USERNAME);
      
      // First attempt - get user by username
      let response = await fetch(
        `https://api.twitter.com/2/users/by/username/${TWITTER_USERNAME}?user.fields=created_at`, 
        {
          headers: {
            'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`
          }
        }
      );
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Twitter API error (${response.status}): ${errorText}`);
        
        // If we can't find the user, fallback to sample tweets
        return createSampleTweets();
      }
      
      const userData = await response.json();
      if (DEBUG_MODE) console.log('Twitter user data:', userData);
      
      const userId = userData.data?.id;
      
      if (!userId) {
        console.warn('Could not find Twitter user ID');
        return createSampleTweets();
      }
      
      if (DEBUG_MODE) console.log(`Fetching tweets for user ID: ${userId}`);
      // Fetch user's tweets
      const tweetsResponse = await fetch(
        `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=created_at`, 
        {
          headers: {
            'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`
          }
        }
      );
      
      if (!tweetsResponse.ok) {
        const errorText = await tweetsResponse.text();
        console.error(`Twitter API error (${tweetsResponse.status}): ${errorText}`);
        return createSampleTweets();
      }
      
      const tweetsData = await tweetsResponse.json();
      if (DEBUG_MODE) console.log('Tweets data:', tweetsData);
      
      setDebugInfo({
        userId,
        tweetsCount: tweetsData.data?.length || 0,
        timestamp: new Date().toISOString()
      });
      
      // Check if we actually got tweets
      if (!tweetsData.data || tweetsData.data.length === 0) {
        console.warn('No tweets found for user');
        return createSampleTweets();
      }
      
      return tweetsData.data?.map(tweet => ({
        id: `twitter-${tweet.id}`,
        type: 'twitter',
        message: tweet.text,
        time: formatTimeAgo(new Date(tweet.created_at))
      })) || [];
    } catch (err) {
      console.error('Error fetching Twitter data:', err);
      setDebugInfo({
        error: err.message,
        timestamp: new Date().toISOString()
      });
      return createSampleTweets();
    }
  };
  
  // Create sample tweets when Twitter API fails
  const createSampleTweets = () => {
    return [
      {
        id: 'twitter-sample-1',
        type: 'twitter',
        message: 'Just released a new React component for my portfolio website! #WebDevelopment #React',
        time: '2 hours ago'
      },
      {
        id: 'twitter-sample-2',
        type: 'twitter',
        message: 'Working on an exciting new open-source project. Stay tuned for updates! #OpenSource #Coding',
        time: '1 day ago'
      }
    ];
  };
  
  // Test Twitter API connection - Direct Bearer Token Only
  const testTwitterConnection = async () => {
    setLoading(true);
    setError(null);
    setDebugInfo(null);
    
    try {
      console.log('Testing Twitter API connection...');
      console.log('- Bearer Token present:', !!TWITTER_BEARER_TOKEN);
      
      if (!TWITTER_BEARER_TOKEN) {
        throw new Error('No Twitter Bearer Token available');
      }
      
      // Try to fetch user data for a popular account (Twitter's own account)
      const response = await fetch(
        'https://api.twitter.com/2/users/by/username/Twitter',
        {
          headers: {
            'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`
          }
        }
      );
      
      const data = await response.json();
      console.log('Test API response:', data);
      
      if (!response.ok || !data.data) {
        throw new Error(`Twitter API test failed: ${data.title || data.detail || JSON.stringify(data)}`);
      }
      
      // If that worked, try to get actual tweets
      const tweets = await fetchTwitterTweets();
      console.log('Tweets fetched:', tweets.length);
      console.log('Test completed successfully!');
      
      setDebugInfo({
        testSuccess: true,
        tweetsFetched: tweets.length,
        timestamp: new Date().toISOString()
      });
      
      // Update notifications with the test results
      const testNotification = {
        id: 'test-' + Date.now(),
        type: 'twitter',
        message: `Twitter API test successful! ${tweets.some(t => t.id.includes('sample')) ? '(Using sample tweets)' : `Fetched ${tweets.length} tweets.`}`,
        time: 'just now'
      };
      
      setNotifications(prev => [testNotification, ...prev]);
    } catch (err) {
      console.error('Test failed:', err);
      setError(`Twitter API test failed: ${err.message}`);
      setDebugInfo({
        testSuccess: false,
        errorMessage: err.message,
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch latest GitHub actions and Twitter tweets
  useEffect(() => {
    const fetchLatestActivity = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch GitHub actions
        const githubResponse = await fetch('https://api.github.com/users/utsavrai/events');
        
        let githubNotifications = [];
        if (githubResponse.ok) {
          const githubData = await githubResponse.json();
          githubNotifications = githubData
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
        } else {
          console.warn('Failed to fetch GitHub activity');
          // Add some fallback GitHub notifications
          githubNotifications = [
            { 
              id: 'github-fallback-1', 
              type: 'github', 
              message: 'Pushed to utsavrai/portfolio', 
              time: '3 hours ago' 
            }
          ];
        }
        
        // Fetch Twitter tweets
        let twitterNotifications = [];
        
        if (TWITTER_BEARER_TOKEN) {
          twitterNotifications = await fetchTwitterTweets();
        } else {
          // Fallback if no token available
          twitterNotifications = createSampleTweets();
        }
        
        // Combine notifications and sort by time (newest first)
        const allNotifications = [...githubNotifications, ...twitterNotifications];
        const sortedNotifications = allNotifications.sort((a, b) => {
          // Convert relative times to approximate timestamps for sorting
          const timeA = a.time.includes('just now') ? new Date() : 
                     a.time.includes('min') ? new Date(Date.now() - parseInt(a.time) * 60000) :
                     a.time.includes('hour') ? new Date(Date.now() - parseInt(a.time) * 3600000) :
                     a.time.includes('day') ? new Date(Date.now() - parseInt(a.time) * 86400000) :
                     new Date(0);
          
          const timeB = b.time.includes('just now') ? new Date() : 
                     b.time.includes('min') ? new Date(Date.now() - parseInt(b.time) * 60000) :
                     b.time.includes('hour') ? new Date(Date.now() - parseInt(b.time) * 3600000) :
                     b.time.includes('day') ? new Date(Date.now() - parseInt(b.time) * 86400000) :
                     new Date(0);
                     
          return timeB - timeA;
        });
        
        setNotifications(sortedNotifications);
      } catch (err) {
        console.error('Error fetching activity:', err);
        setError('Failed to load recent activity');
        
        // Fallback notifications
        setNotifications([
          { id: 'g1', type: 'github', message: 'Pushed to utsavrai/portfolio', time: '2 hours ago' },
          ...createSampleTweets()
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
          
          let githubNotifications = [];
          if (githubResponse.ok) {
            const githubData = await githubResponse.json();
            githubNotifications = githubData
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
          } else {
            // Add fallback GitHub notifications if API fails
            githubNotifications = [
              { 
                id: 'github-fallback-1', 
                type: 'github', 
                message: 'Pushed to utsavrai/portfolio', 
                time: '3 hours ago' 
              }
            ];
          }
          
          // Fetch Twitter tweets
          let twitterNotifications = [];
          if (TWITTER_BEARER_TOKEN) {
            twitterNotifications = await fetchTwitterTweets();
          } else {
            twitterNotifications = createSampleTweets();
          }
          
          // Combine notifications
          const allNotifications = [...githubNotifications, ...twitterNotifications];
          const sortedNotifications = allNotifications.sort((a, b) => {
            // Convert relative times to approximate timestamps for sorting
            const timeA = a.time.includes('just now') ? new Date() : 
                      a.time.includes('min') ? new Date(Date.now() - parseInt(a.time) * 60000) :
                      a.time.includes('hour') ? new Date(Date.now() - parseInt(a.time) * 3600000) :
                      a.time.includes('day') ? new Date(Date.now() - parseInt(a.time) * 86400000) :
                      new Date(0);
            
            const timeB = b.time.includes('just now') ? new Date() : 
                      b.time.includes('min') ? new Date(Date.now() - parseInt(b.time) * 60000) :
                      b.time.includes('hour') ? new Date(Date.now() - parseInt(b.time) * 3600000) :
                      b.time.includes('day') ? new Date(Date.now() - parseInt(b.time) * 86400000) :
                      new Date(0);
                      
            return timeB - timeA;
          });
          
          setNotifications(sortedNotifications);
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
          <div className="error-actions">
            <button className="refresh-btn" onClick={handleRefresh}>
              <FaSync /> Retry
            </button>
          </div>
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
          <div className="notification-actions">
            <button className="refresh-btn small" onClick={handleRefresh}>
              <FaSync /> Refresh
            </button>
            {DEBUG_MODE && (
              <button className="test-btn small" onClick={testTwitterConnection}>
                <FaCode /> Test API
              </button>
            )}
          </div>
          <button className="view-all-btn">View All</button>
        </div>
        
        {DEBUG_MODE && debugInfo && (
          <div className="debug-info">
            <h4>Debug Info</h4>
            <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
          </div>
        )}
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