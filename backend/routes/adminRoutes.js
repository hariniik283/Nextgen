import express from 'express';
import { loginAdmin } from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { getLeads, updateLeadStatus } from '../controllers/leadController.js';

const router = express.Router();
router.post('/login', loginAdmin);
router.get('/leads', authMiddleware, getLeads);
router.patch('/leads/:id', authMiddleware, updateLeadStatus);

export default router;
