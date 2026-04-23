import express from "express";
import { addStore, getAllStores } from "./store.controller.js";
import { authorize } from "../../shared/middleware/role.middleware.js";
import { protect } from "../../shared/middleware/auth.middleware.js";

const router = express.Router();

// SUPER ADMIN ONLY
router.post("/", protect, authorize("SUPER_ADMIN"), addStore);
router.get("/", protect, authorize("SUPER_ADMIN"), getAllStores);

export default router;