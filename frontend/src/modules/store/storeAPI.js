import API from "../../utils/axiosInstance";

// Get all stores
export const getStores = () =>
  API.get("/stores");

// Add new store
export const addStore = (data) =>
  API.post("/stores", data);