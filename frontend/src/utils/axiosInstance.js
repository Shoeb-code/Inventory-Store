import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // for refresh token cookie
  headers: {
    "Content-Type": "application/json"
  }
});


// 🔐 REQUEST INTERCEPTOR (Attach Access Token)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// 🔄 RESPONSE INTERCEPTOR (Auto Refresh Token)
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "http://localhost:8000/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;

        // save new token
        localStorage.setItem("accessToken", newAccessToken);

        // retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);

      } catch (err) {
        // logout user if refresh fails
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;