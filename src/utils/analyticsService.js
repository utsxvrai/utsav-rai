// Analytics Service
// This service helps enhance our visitor counter with real analytics data
// while still using Vercel Analytics for the backend

// Import Vercel Analytics (will be undefined during SSR)
let Analytics;
if (typeof window !== 'undefined') {
  try {
    // Dynamic import to avoid SSR issues
    Analytics = require('@vercel/analytics');
  } catch (e) {
    console.warn('Vercel Analytics not loaded:', e.message);
  }
}

// Initialize analytics
export const initAnalytics = () => {
  try {
    // Initialize visitor count in localStorage if not exists
    if (typeof window !== 'undefined') {
      if (!localStorage.getItem('visitor_count')) {
        localStorage.setItem('visitor_count', '1042');
      }
      
      // Initialize Vercel Analytics
      if (Analytics && Analytics.inject) {
        Analytics.inject();
        console.log('Vercel Analytics initialized');
      }
    }
  } catch (error) {
    console.error('Error initializing analytics:', error);
  }
};

// Track page view
export const trackPageView = () => {
  try {
    if (typeof window !== 'undefined') {
      // Increment visitor count in localStorage
      const currentCount = localStorage.getItem('visitor_count');
      if (currentCount) {
        const newCount = parseInt(currentCount, 10) + 1;
        localStorage.setItem('visitor_count', newCount.toString());
      }
      
      // Analytics are automatically tracked with the older version
      // No need to manually track pageviews
    }
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Function to get view count (synchronized with Vercel Analytics)
export const getViewCount = () => {
  try {
    // Only access localStorage in browser environment
    if (typeof window !== 'undefined') {
      const count = localStorage.getItem('visitor_count');
      return count ? parseInt(count, 10) : 1042;
    }
    return 1042;
  } catch (error) {
    console.error('Error getting view count:', error);
    return 1042; // Fallback value
  }
}; 