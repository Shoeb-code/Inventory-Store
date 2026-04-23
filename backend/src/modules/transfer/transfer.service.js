import Inventory from "../inventory/inventory.model.js";
import Transfer from "./transfer.model.js";

export const transferStock = async ({
  inventoryId,
  toStoreId,
  user
}) => {

  const item = await Inventory.findById(inventoryId);

  if (!item) {
    throw new Error("Inventory item not found");
  }

  // ❌ Prevent transferring sold items
  if (item.status === "SOLD") {
    throw new Error("Cannot transfer sold item");
  }

  // 🔐 STORE ADMIN restriction
  if (
    user.role === "STORE_ADMIN" &&
    item.storeId.toString() !== user.storeId.toString()
  ) {
    throw new Error("You can only transfer your own store items");
  }

  // ❌ Same store transfer
  if (item.storeId.toString() === toStoreId) {
    throw new Error("Item already in this store");
  }

  // ✅ SAVE OLD STORE BEFORE UPDATE
  const fromStore = item.storeId;

  // 🔄 Update store
  item.storeId = toStoreId;
  item.status = "TRANSFERRED";

  await item.save();

  // ✅ CREATE TRANSFER LOG (AFTER SAVE)
  await Transfer.create({
    inventoryId,
    fromStore,
    toStore: toStoreId,
    transferredBy: user.id
  });

  return item;
};