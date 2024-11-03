// lib/corsMiddleware.js

export const corsMiddleware = (handler) => {
    return async (req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      if (req.method === 'OPTIONS') {
        return res.status(200).end(); // Preflight request
      }
  
      return handler(req, res);
    };
  };
  