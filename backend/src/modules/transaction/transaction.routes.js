import express from "express";
import { sell, buy, getAll } from "./transaction.controller.js";
import { protect } from "../../shared/middleware/auth.middleware.js";

const router = express.Router();

router.post("/sell", protect, sell);
router.post("/buy", protect, buy);
router.get("/", protect, getAll);

export default router;