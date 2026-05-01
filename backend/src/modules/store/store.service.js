import Store from "./store.model.js";

export const createStore = async (data, userId) => {

  const { name, storeId, password } = data;

  // 🔍 Check duplicate storeCode
  const existing = await Store.findOne({ storeId });

  if (existing) {
    throw new Error("Store ID already exists");
  }

  const store = await Store.create({
    name,
    storeId,
    password,
    createdBy:userId,
  });

  return store;
};