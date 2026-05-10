import express from "express";
import { createStoreController, getAllStores, getStoreInventoryById, getStoreSalesById, getStoreSummaryById } from "./store.controller.js";
import { protect } from "../../shared/middleware/auth.middleware.js";
import  { authorize }  from "../../shared/middleware/role.middleware.js";

const router = express.Router();

// 🔥 CREATE STORE (ONLY SUPER ADMIN)
router.post("/create", protect,authorize("SUPER_ADMIN"),createStoreController);
router.get("/:id/sales", protect,authorize("SUPER_ADMIN"),getStoreSalesById);
router.get("/:id/inventory", protect,authorize("SUPER_ADMIN"),getStoreInventoryById);
router.get("/:id/summary", protect,authorize("SUPER_ADMIN"),getStoreSummaryById);

// all stores
router.get("/", protect, authorize("SUPER_ADMIN"), getAllStores);

export default router;