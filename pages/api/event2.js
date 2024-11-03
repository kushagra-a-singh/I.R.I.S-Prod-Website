// pages/api/event2.js
import db from './db';  // Import the database connection
import { corsMiddleware } from '../../lib/corsMiddleware';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const {
        team_name,
        leader_name,
        leader_phone,
        leader_email,
        leader_prn,
        leader_branch,
        member2_name,
        member2_phone,
        member2_email,
        member2_prn,
        member2_branch,
        member3_name,
        member3_phone,
        member3_email,
        member3_prn,
        member3_branch,
        member4_name,
        member4_phone,
        member4_email,
        member4_prn,
        member4_branch,
      } = req.body;

      const query = `
        INSERT INTO event2_registrations (
          team_name,
          leader_name,
          leader_phone,
          leader_email,
          leader_prn,
          leader_branch,
          member2_name,
          member2_phone,
          member2_email,
          member2_prn,
          member2_branch,
          member3_name,
          member3_phone,
          member3_email,
          member3_prn,
          member3_branch,
          member4_name,
          member4_phone,
          member4_email,
          member4_prn,
          member4_branch
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      db.query(query, [
        team_name,
        leader_name,
        leader_phone,
        leader_email,
        leader_prn,
        leader_branch,
        member2_name,
        member2_phone,
        member2_email,
        member2_prn,
        member2_branch,
        member3_name,
        member3_phone,
        member3_email,
        member3_prn,
        member3_branch,
        member4_name,
        member4_phone,
        member4_email,
        member4_prn,
        member4_branch,
      ], (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
          res.status(500).json({ success: false, error: 'Database error' });
        } else {
          res.status(201).json({ success: true, message: 'Registration successful' });
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
};

export default corsMiddleware(handler);
