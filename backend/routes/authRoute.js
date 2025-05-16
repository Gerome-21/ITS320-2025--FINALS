import express from "express";
import { signup, login, logout, getProfile } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const authRoutes = express.Router();

authRoutes.post('/signup', signup);
authRoutes.post('/login', login);
authRoutes.post('/logout', logout);

authRoutes.get('/profile', protect, getProfile);

export default authRoutes;
