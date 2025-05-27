import express from 'express';
import { 
  createTodo, 
  deleteTodo, 
  getTodosByCategory, 
  updateTodo,
  getCompletedTodos   // <-- add this import
} from '../controllers/todoController.js';
import { protect } from '../middleware/auth.js';

const todoRoute = express.Router();

todoRoute.post('/create', protect, createTodo);
todoRoute.get('/category/:categoryId', protect, getTodosByCategory);
todoRoute.get('/status/completed', protect, getCompletedTodos);  // <-- add this route
todoRoute.put('/:todoId', protect, updateTodo);
todoRoute.delete('/:todoId', protect, deleteTodo);

export default todoRoute;
