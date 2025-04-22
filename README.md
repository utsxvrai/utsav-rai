# Personal Portfolio Website

A modern portfolio website built with React, featuring a dark theme with blue accent colors. The website showcases personal information, skills, and projects.

## Features

- Responsive design for mobile and desktop
- Smooth scrolling navigation
- Beautiful UI with blue glow effects
- Project showcase section
- Skills section with icons
- Download CV button
- Social media links (GitHub, LinkedIn)
- Real-time GitHub activity and Twitter integration
- Persistent visitor counter with MongoDB

## Technologies Used

- React
- JavaScript
- CSS
- React Icons
- GitHub API
- Twitter API v2

## Getting Started

### Prerequisites

- Node.js and npm installed
- Twitter Developer Account (for Twitter API integration)

### Installation

1. Clone the repository

   ```
   git clone https://github.com/yourusername/portfolio.git
   ```

2. Navigate to the project directory

   ```
   cd portfolio
   ```

3. Install dependencies

   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your Twitter API credentials:

   ```
   REACT_APP_TWITTER_API_KEY=your_twitter_api_key
   REACT_APP_TWITTER_API_SECRET=your_twitter_api_secret
   REACT_APP_TWITTER_BEARER_TOKEN=your_twitter_bearer_token
   ```

   Note: You can get these credentials by creating a project in the [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard).

5. Start the development server

   ```
   npm start
   ```

6. Open your browser and visit `http://localhost:3000`

## Twitter API Setup

1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Create a new project and app
3. Navigate to the "Keys and tokens" tab
4. Generate "Consumer Keys" (API Key and Secret)
5. Generate "Bearer Token" if not already available
6. Add these credentials to your `.env` file
7. Make sure your app has the appropriate permissions:
   - Read-only access is sufficient for fetching tweets
   - If you need more functionality, adjust permissions as needed

## MongoDB Visitor Counter Setup

The portfolio includes a visitor counter that uses MongoDB to track visits. For detailed setup instructions, see [MONGODB_SETUP.md](MONGODB_SETUP.md).

Quick setup:

1. Create a MongoDB Atlas account and cluster
2. Set up database access and network access
3. Get your connection string
4. Add the following environment variables:

   ```
   MONGODB_URI=your_mongodb_connection_string
   MONGODB_DB=portfolio
   ```

5. Deploy to Vercel (make sure to add the environment variables in Vercel dashboard)

The visitor counter will increment once per day per unique visitor, ensuring accurate visitor statistics.

## Customization

- Update your personal information in the components
- Replace project images in `public/assets/projects/`
- Add your resume in `public/assets/Utsav_Rai_Resume.pdf`
- Modify colors in `src/App.css` (look for the `:root` variables)
- Add or remove skills in the Skills component

## Deployment

You can deploy this website on platforms like Vercel, Netlify, or GitHub Pages.

```
npm run build
```

This will create a production-ready build in the `build` folder.

### Environment Variables in Production

When deploying to platforms like Vercel or Netlify, make sure to add the environment variables in their respective dashboard settings.

## License

MIT
