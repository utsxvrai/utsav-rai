import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://<your-username>:<your-password>@<your-cluster-url>/portfolio?retryWrites=true&w=majority';
const MONGODB_DB = process.env.MONGODB_DB || 'portfolio';

// Connect to MongoDB
async function connectToDatabase() {
  const client = await MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return {
    client,
    db: client.db(MONGODB_DB),
  };
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS method for preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { client, db } = await connectToDatabase();
    const collection = db.collection('visitorStats');

    if (req.method === 'GET') {
      // Get current visitor count
      const stats = await collection.findOne({ _id: 'visitor_count' });
      
      // Return the count, or 0 if no document exists yet
      res.status(200).json({ count: stats ? stats.count : 0 });
    } 
    else if (req.method === 'POST') {
      // Increment the visitor count
      const result = await collection.findOneAndUpdate(
        { _id: 'visitor_count' },
        { $inc: { count: 1 } },
        { upsert: true, returnOriginal: false }
      );
      
      // Return the updated count
      const newCount = result.value ? result.value.count : 1;
      res.status(200).json({ count: newCount });
    } 
    else {
      // Method not allowed
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    // Close the MongoDB connection
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to connect to database' });
  }
} 