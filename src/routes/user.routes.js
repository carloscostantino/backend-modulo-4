const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const {
  getProfile,
  updateUser,
  deleteUser
} = require("../controllers/user.controller");

// Todas estas rutas están protegidas
router.get("/me", authMiddleware, getProfile);
router.put("/me", authMiddleware, updateUser);
router.delete("/me", authMiddleware, deleteUser);

module.exports = router;
