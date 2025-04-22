# MongoDB Setup for Portfolio Visitor Counter

This guide will help you set up MongoDB Atlas for your visitor counter feature.

## Step 1: Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account.
2. Create a new project for your portfolio.

## Step 2: Create a Cluster

1. Create a new cluster (the free tier is sufficient for this purpose).
2. Choose a cloud provider and region closest to your target audience.
3. Click "Create Cluster" and wait for the cluster to be provisioned (this may take a few minutes).

## Step 3: Set Up Database Access

1. In the left sidebar, click on "Database Access" under "Security".
2. Click "Add New Database User".
3. Create a new user with a secure password.
4. Give this user "Read and Write to Any Database" permissions.
5. Click "Add User".

## Step 4: Set Up Network Access

1. In the left sidebar, click on "Network Access" under "Security".
2. Click "Add IP Address".
3. For development, you can use your current IP address.
4. For production on Vercel, select "Allow Access from Anywhere" (or add Vercel's IP ranges if you prefer).
5. Click "Confirm".

## Step 5: Get Your Connection String

1. On your cluster's dashboard, click "Connect".
2. Select "Connect your application".
3. Copy the connection string provided.
4. Replace `<username>`, `<password>`, and `<dbname>` with your actual username, password, and database name.

## Step 6: Set Up Environment Variables

Create a `.env.local` file at the root of your project with the following:

```
MONGODB_URI=your_connection_string_from_step_5
MONGODB_DB=portfolio
```

## Step 7: Configure Vercel

When deploying to Vercel, add the environment variables:

1. In your Vercel project dashboard, go to "Settings" > "Environment Variables".
2. Add the same variables from your `.env.local` file.
3. Deploy your application.

## Testing the Connection

After deployment, your visitor counter should now be working with MongoDB Atlas. The count will be shared among all visitors to your site and will persist through deployments.
