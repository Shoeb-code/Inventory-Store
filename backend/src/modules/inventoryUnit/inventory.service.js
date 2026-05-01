import Inventory from "./inventory.model.js";
import InventoryUnit from "../inventoryUnit/inventoryUnit.model.js";

export const createInventory = async (payload) => {
  const inventory = await Inventory.create(payload);

  // 🔥 AUTO CREATE UNITS
  const units = [];

  for (let i = 0; i < payload.stock; i++) {
    units.push({
      inventoryId: inventory._id,
    });
  }

  await InventoryUnit.insertMany(units);

  return inventory;
};