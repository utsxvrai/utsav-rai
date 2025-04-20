// Simple script to test Twitter API credentials
const fetch = require('node-fetch');

// Twitter API credentials - copy from your .env file
const TWITTER_API_KEY = '1ToWyBJLQcn0EDyLYXL9ZQqfd';
const TWITTER_API_SECRET = 'aDTBT2mG4UrNhZ8PuVKjvuQsPQsFde9BBxCtHFCcr1mEM';
const TWITTER_BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAEz80gEAAAAAucqR6SyTQsxrspTjGn8TkAGGNvs%3DBWfPXo0BvoYcGuQ2pQnfJQwbSmUJWJm71AAXtsOTxEU7GrY4So';

// Method 1: Using direct Bearer Token
async function testDirectBearer() {
  console.log('\n--- Testing with direct Bearer Token ---');
  try {
    console.log('Bearer Token (first 10 chars):', TWITTER_BEARER_TOKEN.substring(0, 10) + '...');
    
    const response = await fetch('https://api.twitter.com/2/users/by/username/elonmusk', {
      headers: {
        'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`
      }
    });
    
    console.log('Response status:', response.status, response.statusText);
    
    const data = await response.json();
    console.log('Response data:', JSON.stringify(data, null, 2));
    
    if (data.data && data.data.id) {
      console.log('SUCCESS: Direct Bearer Token works!');
      return true;
    } else {
      console.log('FAILED: Could not fetch user data with direct Bearer Token');
      return false;
    }
  } catch (err) {
    console.error('ERROR with direct Bearer Token:', err.message);
    return false;
  }
}

// Method 2: Getting a token with API key and secret
async function testTokenGeneration() {
  console.log('\n--- Testing token generation with API key and secret ---');
  try {
    console.log('API Key (first 5 chars):', TWITTER_API_KEY.substring(0, 5) + '...');
    console.log('API Secret (first 5 chars):', TWITTER_API_SECRET.substring(0, 5) + '...');
    
    // Create base64 credentials
    const credentials = Buffer.from(`${TWITTER_API_KEY}:${TWITTER_API_SECRET}`).toString('base64');
    console.log('Base64 credentials created, length:', credentials.length);
    
    // Request token
    const tokenResponse = await fetch('https://api.twitter.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: 'grant_type=client_credentials'
    });
    
    console.log('Token response status:', tokenResponse.status, tokenResponse.statusText);
    
    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Token request failed:', errorText);
      return false;
    }
    
    const tokenData = await tokenResponse.json();
    console.log('Token response:', JSON.stringify(tokenData, null, 2));
    
    if (tokenData.access_token) {
      console.log('SUCCESS: Got access token!');
      
      // Test the generated token
      console.log('\nTesting generated token...');
      const testResponse = await fetch('https://api.twitter.com/2/users/by/username/elonmusk', {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`
        }
      });
      
      const testData = await testResponse.json();
      console.log('Test response data:', JSON.stringify(testData, null, 2));
      
      if (testData.data && testData.data.id) {
        console.log('SUCCESS: Generated token works!');
        return true;
      } else {
        console.log('FAILED: Generated token does not work properly');
        return false;
      }
    } else {
      console.log('FAILED: No access token in response');
      return false;
    }
  } catch (err) {
    console.error('ERROR with token generation:', err.message);
    return false;
  }
}

// Run both tests
async function runTests() {
  console.log('=== TWITTER API CREDENTIALS TEST ===');
  
  const directResult = await testDirectBearer();
  const generatedResult = await testTokenGeneration();
  
  console.log('\n=== TEST SUMMARY ===');
  console.log('Direct Bearer Token test:', directResult ? '✅ PASSED' : '❌ FAILED');
  console.log('Token generation test:', generatedResult ? '✅ PASSED' : '❌ FAILED');
  
  console.log('\nRecommendation:');
  if (directResult) {
    console.log('Use the direct Bearer Token in your app - it works!');
  } else if (generatedResult) {
    console.log('Use API Key and Secret for token generation - it works!');
  } else {
    console.log('Both methods failed. Check your Twitter Developer account and credentials.');
  }
}

// Run the tests
runTests().catch(err => {
  console.error('Test script error:', err);
}); 