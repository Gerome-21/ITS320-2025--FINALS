import express from 'express'
import { connectDB } from './config/db.js';
import cors from 'cors';
import 'dotenv/config';
import authRoutes from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import todoRoute from './routes/todoRoute.js';

const app = express();
const port = process.env.PORT || 3002;


app.use(cors());
app.use(express.json());

connectDB();

//Routes
app.use('/auth', authRoutes);
app.use('/api/categories', categoryRoute);
app.use('/api/todos', todoRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
