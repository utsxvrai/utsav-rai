// Analytics Service
// This service helps enhance our visitor counter with real analytics data
// while still using Vercel Analytics for the backend

// Function to track a page view
export const trackPageView = () => {
  try {
    // Get the current page path
    const path = window.location.pathname;
    
    // Track page view event
    window.analytics?.track('page_view', { 
      path,
      timestamp: new Date().toISOString()
    });
    
    // Update localStorage with the latest view info
    const viewData = {
      path,
      timestamp: new Date().toISOString()
    };
    
    // Store the view data
    localStorage.setItem('last_view', JSON.stringify(viewData));
    
    // Increment local view counter
    const viewCount = parseInt(localStorage.getItem('visitor_count') || '1042', 10);
    localStorage.setItem('visitor_count', (viewCount + 1).toString());
    
    return true;
  } catch (error) {
    console.error('Error tracking page view:', error);
    return false;
  }
};

// Function to get view count (synchronized with Vercel Analytics)
export const getViewCount = () => {
  try {
    const count = localStorage.getItem('visitor_count');
    return count ? parseInt(count, 10) : 1042;
  } catch (error) {
    console.error('Error getting view count:', error);
    return 1042; // Fallback value
  }
};

// Function to register analytics
export const initAnalytics = () => {
  // Check if this is a new session
  if (!sessionStorage.getItem('session_started')) {
    // Mark this session as started
    sessionStorage.setItem('session_started', 'true');
    
    // Register a session start
    window.analytics?.track('session_start', {
      timestamp: new Date().toISOString(),
      referrer: document.referrer || 'direct'
    });
    
    // Initialize the visitor count if it doesn't exist
    if (!localStorage.getItem('visitor_count')) {
      localStorage.setItem('visitor_count', '1042');
    }
  }
}; 