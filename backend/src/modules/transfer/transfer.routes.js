import express from "express";
import { transferStock } from "./transfer.controller.js";
import { protect } from "../../shared/middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, transferStock);

export default router;   // ✅ VERY IMPORTANT