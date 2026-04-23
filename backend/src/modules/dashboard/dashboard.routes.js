import express from "express";
import {
  storeDashboard,
  superDashboard
} from "./dashboard.controller.js";

import { protect } from "../../shared/middleware/auth.middleware.js";
import { authorize } from "../../shared/middleware/role.middleware.js";

const router = express.Router();

router.get("/store", protect, authorize("STORE_ADMIN"), storeDashboard);

router.get("/super", protect, authorize("SUPER_ADMIN"), superDashboard);

export default router;