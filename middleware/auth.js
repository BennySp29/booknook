const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'book_nook_jwt_secret_dev_key_2026';

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token format' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, email, name }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
}

// Optional auth for public feeds where we also want to know if current user liked a post
function optionalAuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      req.user = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      req.user = null;
    }
  }
  next();
}

module.exports = {
  authMiddleware,
  optionalAuthMiddleware,
  JWT_SECRET
};
