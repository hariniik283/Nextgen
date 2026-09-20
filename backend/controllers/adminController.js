import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@nextgenacademy.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ message: 'Invalid admin credentials.' });
  }

  const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET || 'nextgen-academy-secret-key', { expiresIn: '7d' });
  return res.json({ success: true, token, message: 'Login successful.' });
};

export const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@nextgenacademy.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const existing = await Admin.findOne({ email: adminEmail });

  if (!existing) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await Admin.create({ email: adminEmail, password: hashedPassword });
  }
};
