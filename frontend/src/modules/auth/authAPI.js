import API from "../../utils/axiosInstance";

// 🆕 Register
export const registerUser = (data) =>
  API.post("/auth/register", data);

// 🔐 Login
export const loginUser = (data) =>
  API.post("/auth/login", data);

// 🔢 Verify OTP
export const verifyOtp = (data) =>
  API.post("/auth/verify-otp", data);

// 📩 Forgot Password (send reset link / OTP)
export const forgotPassword = (data) =>
  API.post("/auth/forgot-password", data);

// 🔑 Reset Password (with token or OTP)
export const resetPassword = (data) =>
  API.post("/auth/reset-password", data);