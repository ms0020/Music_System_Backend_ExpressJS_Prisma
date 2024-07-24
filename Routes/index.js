import { Router } from "express";

import UserRoutes from './userRoutes.js';
import SongsRoutes from './songsRoutes.js';
import AuthRoutes from './authRoutes.js';




const router = Router();

// User Routes
router.use("/api/user", UserRoutes);


// Songs Routes
router.use("/api/songs", SongsRoutes);

// Auth Routes
router.use("/api/auth", AuthRoutes)


export default router;