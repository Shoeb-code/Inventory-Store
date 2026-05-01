// modules/admin/storeAPI.js

import API from "../../utils/axiosInstance";

// 🔥 CREATE STORE
export const createStoreAPI = async (data) => {
  try {
     console.log({data});
    const res = await API.post("/store/create", data);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Something went wrong" };
  }
};

// 🔥 GET ALL STORES
export const getAllStoresAPI = async () => {
  try {
    const res = await API.get("/store");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch stores" };
  }
};

// 🔥 GET SINGLE STORE
export const getStoreByIdAPI = async (id) => {
  try {
    const res = await API.get(`/store/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Store not found" };
  }
};

// 🔥 DELETE STORE
export const deleteStoreAPI = async (id) => {
  try {
    const res = await API.delete(`/store/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Delete failed" };
  }
};