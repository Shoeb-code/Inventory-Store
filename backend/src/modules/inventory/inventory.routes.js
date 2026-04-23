import express from "express";
import { addBulk } from "./inventory.controller.js";
import { protect } from "../../shared/middleware/auth.middleware.js";

const router = express.Router();

router.post("/bulk", protect, addBulk);

export default router;