import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: 'Access Denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1]; 

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access Denied. Invalid token format.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // { id: ... }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
