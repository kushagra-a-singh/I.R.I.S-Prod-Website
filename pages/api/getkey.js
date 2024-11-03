// pages/api/getkey.js
import { corsMiddleware } from '../../lib/corsMiddleware';

const handler = (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
};

export default corsMiddleware(handler);
