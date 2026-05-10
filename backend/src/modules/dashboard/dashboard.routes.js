import express from "express";
import {

  superDashboard
} from "./dashboard.controller.js";

import { protect } from "../../shared/middleware/auth.middleware.js";
import { authorize } from "../../shared/middleware/role.middleware.js";

const router = express.Router();



router.get("/super-admin", protect, authorize("SUPER_ADMIN"), superDashboard);

export default  router;