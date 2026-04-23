import API from "../../utils/axiosInstance";

// Bulk Add Inventory
export const addBulkInventory = (data) =>
  API.post("/inventory/bulk", data);

// Get Inventory
export const getInventory = () =>
  API.get("/inventory");

// Delete item (optional)
export const deleteInventory = (id) =>
  API.delete(`/inventory/${id}`);