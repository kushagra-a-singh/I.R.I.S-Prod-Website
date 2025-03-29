import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { query } = req.body;

    try {
      // Replace this URL with your deployed Python backend URL (if deployed)
      const response = await fetch('http://localhost:5800/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching from Python backend:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}