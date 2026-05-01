import express from "express";
import { createStoreController, getAllStores } from "./store.controller.js";
import { protect } from "../../shared/middleware/auth.middleware.js";
import  { authorize }  from "../../shared/middleware/role.middleware.js";

const router = express.Router();

// 🔥 CREATE STORE (ONLY SUPER ADMIN)
router.post("/create", protect,authorize("SUPER_ADMIN"),createStoreController);

// all stores
router.get("/", protect, authorize("SUPER_ADMIN"), getAllStores);

export default router;