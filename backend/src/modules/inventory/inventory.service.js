// modules/inventory/inventory.service.js

import InventoryUnit from "../inventoryUnit/inventoryUnit.model.js";
import Inventory from "./inventory.model.js";


// ✅ CREATE
export const createInventory = async (payload) => {

  const { stock } = payload;

  if (!stock || stock <= 0) {
    throw new Error("Stock must be greater than 0");
  }

  // 1️⃣ Create inventory
  const inventory = await Inventory.create(payload);

  // 2️⃣ Create units (VERY IMPORTANT)
  const units = [];

  for (let i = 0; i < stock; i++) {
    units.push({
      inventoryId:inventory._id,
    });
  }

  await InventoryUnit.insertMany(units);

  return inventory;
};

// ✅ GET
export const getInventory = async (storeId) => {
  return await Inventory.find({ storeId }).sort({ createdAt: -1 });
};


// ✅ ADD SERIALS
export const addSerialNumbers = async (id, serialNumbers) => {
  const item = await Inventory.findById(id);

  if (!item) throw new Error("Inventory not found");

  // 🔥 CHECK LIMIT
  if (item.serialNumbers.length + serialNumbers.length > item.quantity) {
    throw new Error("Serial numbers exceed total quantity");
  }

  // 🔥 REMOVE DUPLICATES (IMPORTANT)
  const uniqueSerials = [
    ...new Set([...item.serialNumbers, ...serialNumbers]),
  ];

  item.serialNumbers = uniqueSerials;

  await item.save();

  return item;
};


// ✅ UPDATE
export const updateInventory = async (id, payload) => {
  const item = await Inventory.findById(id);

  if (!item) throw new Error("Inventory not found");

  Object.assign(item, payload);

  await item.save();

  return item;
};


// ✅ DELETE
export const deleteInventory = async (id) => {
  const item = await Inventory.findById(id);

  if (!item) throw new Error("Inventory not found");

  await item.deleteOne();
};