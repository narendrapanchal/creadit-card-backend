const jwt  = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization').split(" ")[1];
    if (!token) return res.status(401).send({message:'Access denied. No token provided.'});
    try {
      const decoded = jwt.verify(token, 'secretKey');
      req.user = decoded;
      next(); 
    } catch (error) {
      res.status(400).send({message:'Invalid token please login again.'});
    }
  };
  module.exports = verifyToken
  