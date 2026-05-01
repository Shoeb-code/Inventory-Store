import API from "../../../utils/axiosInstance";

// ✅ CREATE INVENTORY
export const createInventoryAPI = async (data) => {
  const res = await API.post("/inventory/create", data);
  return res.data;
};

export const getInventoryAPI = async () => {
  const res = await API.get("/inventory/get");
  return res.data;
};