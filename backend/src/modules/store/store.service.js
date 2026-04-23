import Store from "./store.model.js";
import bcrypt from "bcrypt";

export const createStore = async (data, user) => {
  if (user.role !== "SUPER_ADMIN") {
    throw new Error("Only super admin can create store");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await Store.create({
    name: data.name,
    storeCode: data.storeCode, // 👈 manual or generated
    password: hashedPassword,
    createdBy: user.id
  });
};