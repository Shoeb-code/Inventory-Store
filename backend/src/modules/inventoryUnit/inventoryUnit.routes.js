import express from "express";
import {
  updateUnitDetails,
  sellUnit,
  getUnitsByInventory,
} from "./inventoryUnit.controller.js";

import { protect } from "../../shared/middleware/auth.middleware.js";

const router = express.Router();

router.get("/:inventoryId", protect, getUnitsByInventory); 
router.put("/:id", protect, updateUnitDetails);   // add serial, imei
router.post("/:id/sell", protect, sellUnit);      // sell unit

export default router;