import express from 'express';
import { createTodo } from '../controllers/todoController.js';
import { protect } from '../middleware/auth.js';

const todoRoute = express.Router();

todoRoute.post('/create', protect, createTodo);

export default todoRoute;
