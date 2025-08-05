import dotenv from 'dotenv';
import connectDB from './config/db';
import express from 'express';
import cors from 'cors';
import announcementRoutes from './routes/announcementsRoutes';
import quizRoutes from './routes/quizzesRoutes'

dotenv.config();
connectDB();

export const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/announcements', announcementRoutes);
app.use('/api/quizzes', quizRoutes);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.listen(5000, '0.0.0.0',() => {
  console.log('Server is running on port 5000');
});