const jwt  = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied. No token provided.');
    try {
      const decoded = jwt.verify(token, 'secretKey');
      req.user = decoded;
      next(); 
    } catch (error) {
      res.status(400).send('Invalid token.');
    }
  };
  module.exports = verifyToken
  