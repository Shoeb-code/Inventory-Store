import API from "../../utils/axiosInstance";

// Transfer stock
export const transferStock = (data) =>
  API.post("/transfer", data);

// Transfer history
export const getTransfers = () =>
  API.get("/transfer");