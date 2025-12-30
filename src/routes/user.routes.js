import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getProfile,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = Router();

// Todas estas rutas están protegidas
router.get("/me", authMiddleware, getProfile);
router.put("/me", authMiddleware, updateUser);
router.delete("/me", authMiddleware, deleteUser);

export default router;

