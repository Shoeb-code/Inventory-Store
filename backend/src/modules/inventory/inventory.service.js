import Inventory from "./inventory.model.js";

// 🔥 BULK ADD WITH DUPLICATION
export const addBulkInventory = async (data) => {
  const {
    productName,
    brand,
    model,
    price,
    costPrice,
    storeId,
    serialNumbers // array
  } = data;

  // create multiple items
  const items = serialNumbers.map((serial) => ({
    productName,
    brand,
    model,
    price,
    costPrice,
    storeId,
    serialNumber: serial
  }));

  return await Inventory.insertMany(items);
};

export const getStoreInventory = async (storeId) => {
    return await Inventory.find({
      storeId,
      status: "IN_STOCK"
    });
  };