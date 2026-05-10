import API from "../../utils/axiosInstance";


// CREATE STORE


export const createStoreAPI = async (data) => {
  try {
    const res = await API.post("/store/create",data);
    return res.data;
  } catch (err) {
    throw ( err.response?.data || { message: "Something went wrong",} );
  }
};
// GET ALL STORES
export const getAllStoresAPI = async () => {
  try {
    const res = await API.get("/store");
    return res.data;
  } catch (err) {
    throw (
      err.response?.data || {
        message: "Failed to fetch stores",
      }
    );
  }
};
// GET SINGLE STORE
export const getStoreByIdAPI = async (id) => {
  try {
    const res = await API.get(`/store/${id}`);
    return res.data;
  } catch (err) {
    throw (
      err.response?.data || {
        message: "Store not found",
      }
    );
  }
};
// DELETE STORE
export const deleteStoreAPI = async (id) => {
  try {
    const res = await API.delete(`/store/${id}`);
    return res.data;
  } catch (err) {
    throw (
      err.response?.data || {
        message: "Delete failed",
      }
    );
  }
};
// SUPER ADMIN DASHBOARD
export const getSuperDashboardAPI =
  async (filter = "day") => {
    try {
      const res = await API.get(`/dashboard/super-admin?filter=${filter}`);
      return res.data;
    } catch (err) {
      throw (
        err.response?.data || {
          message: "Failed to fetch dashboard",
        }
      );
    }
  };
// STORE SUMMARY
export const getStoreSummaryAPI = async (id) => {
  try {
    const url = id ?`/store/${id}/summary`:"/store/summary";
    const res = await API.get(url);
    return res.data;
  } catch (err) {
    throw (
      err.response?.data || {
        message: "Failed to fetch summary",
      }
    );
  }
};
// STORE SALES
export const getStoreSalesAPI = async (id) => {
  try {
    const url =id?`/store/${id}/sales`: "/store/sales";
    const res = await API.get(url);
    return res.data;
  } catch (err) {
    throw (
      err.response?.data || {
        message: "Failed to fetch sales",
      }
    );
  }
};
// STORE RECENT SALES
export const getRecentSalesAPI = async () => {
  try {
    const res = await API.get("/store/recent-sales");
    return res.data;
  } catch (err) {
    throw (
      err.response?.data || {
        message: "Failed to fetch recent sales",
      }
    );
  }
};
// STORE INVENTORY
export const getStoreInventoryAPI = async (id) => {
  try {
    const url = id ? `/store/${id}/inventory`: "/store/inventory";
    const res = await API.get(url);
    return res.data;
  } catch (err) {
    throw (
      err.response?.data || {
        message: "Failed to fetch inventory",
      }
    );
  }
};