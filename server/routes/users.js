import express from 'express';
import { updateProfile } from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.put('/profile', verifyToken, upload.single('profilePic'), updateProfile);

export default router;
