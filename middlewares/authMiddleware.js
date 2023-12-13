import jwt from 'jsonwebtoken';
import { User } from '../models';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findOne({ where: { id: decoded.id, token } });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication required' });
  }
};

export default authMiddleware;
