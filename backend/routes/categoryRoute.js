import express from 'express';
import { createCategory, getCategories } from '../controllers/categoryController.js';
import { protect } from '../middleware/auth.js';

const categoryRoute = express.Router();

categoryRoute.post('/create', protect, createCategory);  // Protected
categoryRoute.get('/', protect, getCategories);  // Protected

export default categoryRoute;
