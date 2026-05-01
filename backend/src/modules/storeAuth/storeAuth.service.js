import Store from "../store/store.model.js";

export const loginStore = async (storeId, password) => {

  const store = await Store.findOne({ storeId }).select("+password");

  if (!store) throw new Error("Store not found");

  if (store.isLocked) {
    throw new Error("Account locked. Try later");
  }

  const isMatch = await store.comparePassword(password);

  if (!isMatch) {
    store.loginAttempts += 1;

    if (store.loginAttempts >= 5) {
      store.lockUntil = Date.now() + 15 * 60 * 1000; // 15 min
    }

    await store.save();
    throw new Error("Invalid credentials");
  }

  // ✅ reset attempts
  store.loginAttempts = 0;
  store.lockUntil = undefined;
  store.lastLogin = new Date();
  store.isOnline = true;

  await store.save();

  return store;
};