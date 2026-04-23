import express from "express";
import { login, logout } from "./storeAuth.controller.js";
import { protect } from "../../shared/middleware/auth.middleware.js";

const router = express.Router();

// 🔐 Store Login
router.post("/login", login);

// 🚪 Store Logout
router.post("/logout", protect, logout);

export default router;