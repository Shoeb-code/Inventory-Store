import API from "../../utils/axiosInstance";

// Store Dashboard
export const getStoreDashboard = () =>
  API.get("/dashboard/store");

// Super Admin Dashboard
export const getSuperDashboard = () =>
  API.get("/dashboard/super");