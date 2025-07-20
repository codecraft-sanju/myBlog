import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/users.js';
// import rateLimit from 'express-rate-limit';
import { testImagekitConnection } from './controllers/userController.js';

dotenv.config();

const app = express();

// Security headers
app.use(helmet());

// // Rate limit (100 reqs per 15 min per IP)
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
// });
// app.use(limiter);
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(' MongoDB Connected');
    app.listen(PORT, () =>
      console.log(` Server running at http://localhost:${PORT}`),
    );
     testImagekitConnection();
  })
  .catch((err) => console.error(' MongoDB connection error:', err));
