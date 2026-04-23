import Store from "../store/store.model.js";
import bcrypt from "bcrypt";
import { signAccessToken } from "../../shared/utils/generateToken.js";

export const loginStore = async ({ storeCode, password }) => {
    
  const store = await Store.findOne({ storeCode });
  if (!store) throw new Error("Store not found");

  if (!store.isActive) {
    throw new Error("Store is disabled");
  }

  const isMatch = await bcrypt.compare(password, store.password);
  if (!isMatch) throw new Error("Invalid credentials");

  // ✅ Mark online
  store.isOnline = true;
  store.lastLogin = new Date();
  await store.save();

  const payload = {
    id: store._id,
    role: "STORE_ADMIN",
    storeId: store._id
  };

  const accessToken = signAccessToken(payload);

  return {
    accessToken,
    store: {
      id: store._id,
      name: store.name,
      storeCode: store.storeCode
    }
  };
};