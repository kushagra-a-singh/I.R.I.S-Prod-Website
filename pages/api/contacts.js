import db from '../../src/utils/db';
import { corsMiddleware } from '../../lib/corsMiddleware';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { name, email, phone, subject, message } = req.body;
      const query = 'INSERT INTO contacts (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)';
      db.query(query, [name, email, phone, subject, message], (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
          res.status(500).json({ success: false, error: 'Database error' });
        } else {
          res.status(201).json({ success: true, message: 'Message received' });
        }
      });
    } catch (err) {
      console.error('Error handling request:', err);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default corsMiddleware(handler);