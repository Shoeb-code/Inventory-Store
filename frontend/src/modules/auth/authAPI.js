import API from "../../utils/axiosInstance";

// ✅ MUST be like this
export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

export const verifyOtp = (data) =>
    API.post("/auth/verify-otp", data);