import * as dashboardService
from "./dashboard.service.js";

// SUPER ADMIN DASHBOARD
export const superDashboard = async (req, res, next) => {
try { 
  const { filter = "day", } = req.query;
  const data = await dashboardService.getSuperDashboard(filter);
  res.json({  success: true,data,});
} catch (e) {
    next(e);
  }
};