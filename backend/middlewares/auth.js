const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

  try {
    // Remove "Bearer " from the token if present
    const verifiedToken = token.startsWith('Bearer ')
      ? token.split(' ')[1]
      : token;

    // Verify the token
    const verified = jwt.verify(verifiedToken, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};
