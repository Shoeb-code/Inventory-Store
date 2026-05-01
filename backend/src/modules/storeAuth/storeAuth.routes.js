import express from "express";
import { storeLogin } from "./storeAuth.controller.js";

const router = express.Router();

// 🔐 Store Admin Login
router.post("/login", storeLogin);

export default router;