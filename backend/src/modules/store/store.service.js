import InventoryUnit from "../inventoryUnit/inventoryUnit.model.js";
import Store from "./store.model.js";
import Inventory from '../inventory/inventory.model.js'

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


export const getStoreSalesByIdService =
  async (storeId) => {

    const inventories =
      await Inventory.find({
        storeId,
      });

    const inventoryIds =
      inventories.map((i) => i._id);

    const sales =
      await InventoryUnit.find({

        inventoryId: {
          $in: inventoryIds,
        },

        status: "SOLD",
      })

      .populate(
        "inventoryId",
        "brand model category processor ram storage price"
      )

      .sort({
        soldAt: -1,
      });

    // FORMAT RESPONSE
    return sales.map((s) => ({

      id: s._id,

      product: {

        id: s.inventoryId?._id,

        brand: s.inventoryId?.brand || "-",

        model: s.inventoryId?.model || "-",

        category:
          s.inventoryId?.category || "-",

        processor:
          s.inventoryId?.processor || "-",

        ram:
          s.inventoryId?.ram || "-",

        storage:
          s.inventoryId?.storage || "-",

        basePrice:
          s.inventoryId?.price || 0,
      },

      unit: {

        serialNumber:
          s.serialNumber || "-",

        imei:
          s.imei || "-",
      },

      sale: {

        sellingPrice:
          s.sellingPrice || 0,

        costPrice:
          s.costPrice || 0,

        profit:
          s.profit ??
          (
            (s.sellingPrice || 0) -
            (s.costPrice || 0)
          ),

        date:
          s.soldAt || s.updatedAt,
      },
    }));
};

export const getStoreInventoryByIdService =
  async (storeId) => {

    const inventory =
      await Inventory.find({
        storeId: storeId,
      })

      .sort({
        createdAt: -1,
      });

    return inventory;
};


export const getStoreSummaryByIdService =async (storeId) => {
    // FIND STORE INVENTORIES
    const inventories = await Inventory.find({storeId:storeId,});

    // EXTRACT INVENTORY IDS
    const inventoryIds = inventories.map((inv) => inv._id);

    // FIND SOLD UNITS
    const soldUnits = await InventoryUnit.find({
        inventoryId: {$in:inventoryIds,},
        status: "SOLD",
      });

    // REVENUE
    const revenue =soldUnits.reduce((acc, unit) => acc + (unit.sellingPrice || 0),0);
    // PROFIT
    const profit =soldUnits.reduce((acc, unit) =>acc + (unit.profit || 0),0);

    // SALES COUNT
    const sales =soldUnits.length;

    // AVAILABLE STOCK
    const stock = await InventoryUnit.countDocuments({
      inventoryId: { $in: inventoryIds,},status: "AVAILABLE",});

    // TOP PRODUCT
    let topProduct = "N/A";
    if (inventories.length > 0) {
      const topInventory = inventories.sort((a, b) =>
            (b.stock || 0) -
            (a.stock || 0)
        )[0];

      topProduct =
        `${topInventory.brand || ""} ${topInventory.model || ""}`.trim();
    }
    return {
      revenue,profit,sales,stock,topProduct,
    };
};