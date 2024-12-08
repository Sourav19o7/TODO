const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

function verifyToken(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ error: 'You are not authorized' });
  }

  const token = authorizationHeader.split(' ')[1];

  jwt.verify(token, secretKey, (err, authData) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    req.authData = authData;
    next();
  });
}

module.exports = verifyToken;
