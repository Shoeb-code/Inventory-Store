import * as dashboardService from "./dashboard.service.js";

// STORE ADMIN
export const storeDashboard = async (req, res, next) => {
  try {
      console.log(req.body)
    const data = await dashboardService.getStoreDashboard(req.user);
    res.json(data);
  } catch (e) {
    next(e);
  }
};

// SUPER ADMIN
export const superDashboard = async (req, res, next) => {
  try {
    const data = await dashboardService.getSuperDashboard();
    res.json(data);
  } catch (e) {
    next(e);
  }
};