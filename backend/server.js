import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import chatRoutes from './routes/chatRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { seedAdmin } from './controllers/adminController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/chat', chatRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/admin', adminRoutes);

const startServer = async () => {
  const dbConnected = await connectDB();

  if (dbConnected) {
    try {
      await seedAdmin();
    } catch (error) {
      console.warn('Admin seed skipped in demo mode.', error.message);
    }
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}${dbConnected ? '' : ' in demo mode'}.`);
  });
};

startServer();
export default app;
