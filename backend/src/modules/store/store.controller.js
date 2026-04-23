import * as storeService from "./store.service.js";

// ➕ Add store
export const addStore = async (req, res, next) => {
  try {
    const store = await storeService.createStore(req.body);
    res.status(201).json(store);
  } catch (e) {
    next(e);
  }
};

// 📥 Get all stores
export const getAllStores = async (req, res, next) => {
  try {
    const stores = await storeService.getStores();
    res.json(stores);
  } catch (e) {
    next(e);
  }
};