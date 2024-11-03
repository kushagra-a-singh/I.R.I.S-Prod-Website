// pages/api/home.js
import { corsMiddleware } from '../../lib/corsMiddleware';

const handler = (req, res) => {
  res.status(200).json({ message: 'Welcome to the home page!' });
};

export default corsMiddleware(handler);
