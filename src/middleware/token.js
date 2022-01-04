import jwt from 'jsonwebtoken';

import { secretKey } from '../settings';

export const checkToken = (req, res, next) => {
  const token = req.header('token');
  if (!token) return res.status(500).json({ message: 'Token is unavailable' });
  jwt.verify(token, secretKey, (err, data) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token is expired' });
      } else if (err.name === 'NotBeforeError') {
        return res.status(401).json({ message: 'Token is not active' });
      } else {
        return res.status(401).json({ message: 'Invalid Token' });
      }
    }
    req.id = data.user;
    next();
  });
};
