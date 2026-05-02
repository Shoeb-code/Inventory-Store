// modules/inventory/inventory.routes.js

import express from "express";
import {
  createInventory,
  getInventory,
  addSerialNumbers,
  updateInventory,
  deleteInventory,
  getSummary,
  getTrend,
  getRecentSales,
  getSales,
  
} from "./inventory.controller.js";

import {protect }from "../../shared/middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createInventory);

router.get("/summary", protect, getSummary);
router.get("/trend", protect, getTrend);
router.get("/sales", protect, getSales); 
router.get("/recent-sales", protect, getRecentSales);

router.get("/get", protect, getInventory);   // 👈 LAST

router.patch("/:id/serials", protect, addSerialNumbers);
router.put("/:id", protect, updateInventory);
router.delete("/:id", protect, deleteInventory);


export default router;