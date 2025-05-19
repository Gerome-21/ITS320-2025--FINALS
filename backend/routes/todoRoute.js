import express from 'express';
import { createTodo, getTodosByCategory } from '../controllers/todoController.js';
import { protect } from '../middleware/auth.js';

const todoRoute = express.Router();

todoRoute.post('/create', protect, createTodo);

todoRoute.get('/category/:categoryId', protect, getTodosByCategory);

export default todoRoute;
