import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models';

const UserController = {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        throw new Error('You must provide a username, email, and password');
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

      user.token = token;
      await user.save();

      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        throw new Error('Invalid email or password');
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

      user.token = token;
      await user.save();

      res.json({ user, token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },
};

export default UserController;