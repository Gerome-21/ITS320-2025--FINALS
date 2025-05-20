import express from 'express';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controllers/categoryController.js';
import { protect } from '../middleware/auth.js';

const categoryRoute = express.Router();

categoryRoute.post('/create', protect, createCategory); 
categoryRoute.get('/', protect, getCategories); 
categoryRoute.put('/:categoryId', protect, updateCategory);
categoryRoute.delete('/:categoryId', protect, deleteCategory);

export default categoryRoute;
