// modules/inventory/inventory.controller.js

import InventoryUnit from "../inventoryUnit/inventoryUnit.model.js";
import Inventory from "./inventory.model.js";
import * as inventoryService from "./inventory.service.js";


// ✅ CREATE BULK INVENTORY
export const createInventory = async (req, res, next) => {
  try {
    const storeId = req.user?.id;
    
    if (!storeId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

     

    const data = await inventoryService.createInventory({
      ...req.body,
      storeId,
    });

    return res.status(201).json({
      success: true,
      message: "Inventory created successfully",
      data,
    });

  } catch (err) {
    console.error("CREATE INVENTORY ERROR:", err.message);
    return next(err);
  }
};


// ✅ GET ALL INVENTORY (STORE-WISE)
export const getInventory = async (req, res, next) => {
  try {
    const storeId = req.user.id;
    console.log("storeId->",storeId)
    const data = await inventoryService.getInventory(storeId);
    
    
    res.status(200).json({
      success:true,
      count: data.length,
      data,
    });

  } catch (err) {
    next(err);
  }
};


// ✅ ADD SERIAL NUMBERS (IMPORTANT FEATURE)
export const addSerialNumbers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { serialNumbers } = req.body;

    if (!Array.isArray(serialNumbers) || serialNumbers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Serial numbers must be a non-empty array",
      });
    }

    const data = await inventoryService.addSerialNumbers(id, serialNumbers);

    res.status(200).json({
      success: true,
      message: "Serial numbers added successfully",
      data,
    });

  } catch (err) {
    next(err);
  }
};

// ✅ UPDATE INVENTORY
export const updateInventory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await inventoryService.updateInventory(id, req.body);

    res.status(200).json({
      success: true,
      data,
    });

  } catch (err) {
    next(err);
  }
};


// ✅ DELETE INVENTORY
export const deleteInventory = async (req, res, next) => {
  try {
    const { id } = req.params;

    await inventoryService.deleteInventory(id);

    res.status(200).json({
      success: true,
      message: "Inventory deleted successfully",
    });

  } catch (err) {
    next(err);
  }
};



export const getSummary = async (req, res) => {
  try {

    const storeId = req.user.id;
    console.log("StoreID --->", storeId);
    // FIND STORE INVENTORIES
    const inventories = await Inventory.find({
      storeId: storeId,
    });

    // EXTRACT INVENTORY IDS
    const inventoryIds = inventories.map(inv => inv._id);

    // FIND SOLD UNITS
    const soldUnits = await InventoryUnit.find({ inventoryId: {$in: inventoryIds,},
      status: "SOLD",
    });

    // TOTAL REVENUE
    const revenue = soldUnits.reduce((acc, u) => acc + (u.sellingPrice || 0),0);
    // TOTAL PROFIT
    const profit = soldUnits.reduce((acc, u) => acc + (u.profit || 0), 0);

    // TOTAL SALES
    const sales = soldUnits.length;

    // AVAILABLE STOCK
    const stock = await InventoryUnit.countDocuments({
      inventoryId: {
        $in: inventoryIds,
      },
      status: "AVAILABLE",
    });

    // TEMP
    const topProduct = "Dell G15";

    res.json({
      revenue,
      profit,
      sales,
      stock,
      topProduct,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};




export const getTrend = async (req, res) => {
  try {
    const { range } = req.query;

    let groupFormat = "%Y-%m-%d";

    if (range === "week") groupFormat = "%Y-%U";
    if (range === "month") groupFormat = "%Y-%m";

    const data = await InventoryUnit.aggregate([
      { $match: { status: "SOLD" } },
      {
        $group: {
          _id: {
            $dateToString: { format: groupFormat, date: "$updatedAt" },
          },
          revenue: { $sum: "$sellingPrice" },
          profit: { $sum: "$profit" },
        },
      },
      {
        $project: {
          date: "$_id",
          revenue: 1,
          profit: 1,
          _id: 0,
        },
      },
      { $sort: { date: 1 } },
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getRecentSales = async (req, res) => {
  try {

    const storeId = req.user.id;

    // FIND INVENTORIES OF STORE
    const inventories = await Inventory.find({
      storeId: storeId,
    });

    // EXTRACT INVENTORY IDS
    const inventoryIds = inventories.map(inv => inv._id);

    // FIND RECENT SOLD UNITS
    const sales = await InventoryUnit.find({

      inventoryId: {
        $in: inventoryIds,
      },

      status: "SOLD",

    })

      .populate("inventoryId", "brand model")

      .sort({
        soldAt: -1,
      })

      .limit(5);

    // FORMAT RESPONSE
    const formatted = sales.map((s) => ({

      productName:
        `${s.inventoryId?.brand || ""} ${s.inventoryId?.model || ""}`.trim()
        || "Product",

      brand: s.inventoryId?.brand || "N/A",

      model: s.inventoryId?.model || "N/A",

      amount: s.sellingPrice || 0,

      profit: s.profit || 0,

      soldAt: s.soldAt,

    }));

    res.json(formatted);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};


// Sales record
export const getSales = async (req, res) => {
  try {

    // LOGGED-IN STORE ID
    const storeId = req.user.id;

    // FIND STORE INVENTORIES
    const inventories = await Inventory.find({
      storeId: storeId,
    });

    // EXTRACT INVENTORY IDS
    const inventoryIds = inventories.map(inv => inv._id);

    // FIND SOLD UNITS OF STORE
    const sales = await InventoryUnit.find({

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
    const result = sales.map((s) => ({

      id: s._id,

      // PRODUCT DETAILS
      product: {

        id: s.inventoryId?._id,

        brand: s.inventoryId?.brand || "-",

        model: s.inventoryId?.model || "-",

        category: s.inventoryId?.category || "-",

        processor: s.inventoryId?.processor || "-",

        ram: s.inventoryId?.ram || "-",

        storage: s.inventoryId?.storage || "-",

        basePrice: s.inventoryId?.price || 0,
      },

      // UNIT DETAILS
      unit: {

        serialNumber: s.serialNumber || "-",

        imei: s.imei || "-",
      },

      // SALE DETAILS
      sale: {

        sellingPrice: s.sellingPrice || 0,

        costPrice: s.costPrice || 0,

        profit:
          s.profit ??
          ((s.sellingPrice || 0) - (s.costPrice || 0)),

        date: s.soldAt || s.updatedAt,
      },

    }));

    // CLEAN DEBUG
    console.log("First Sale:", result[0]);

    res.json(result);

  } catch (err) {

    console.error("SALES ERROR:", err);

    res.status(500).json({
      message: err.message,
    });

  }
};