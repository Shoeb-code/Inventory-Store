import InventoryUnit from "../inventoryUnit/inventoryUnit.model.js";
import Inventory from "../inventory/inventory.model.js";
import Store from "../store/store.model.js";

export const getSuperDashboard = async (filter) => {

  let groupId = {};

  // FILTERS
  if (filter === "day") {
    groupId = {
      year: { $year: "$soldAt" },
      month: { $month: "$soldAt" },
      day: { $dayOfMonth: "$soldAt" },
    };
  }

  else if (filter === "week") {
    groupId = {
      year: { $year: "$soldAt" },
      week: { $week: "$soldAt" },
    };
  }

  else if (filter === "month") {
    groupId = {
      year: { $year: "$soldAt" },
      month: { $month: "$soldAt" },
    };
  }

  // DEFAULT
  else {
    groupId = {
      year: { $year: "$soldAt" },
      month: { $month: "$soldAt" },
      day: { $dayOfMonth: "$soldAt" },
    };
  }

  // =========================================
  // SALES ANALYTICS
  // =========================================

  const salesAnalytics = await InventoryUnit.aggregate([
    {
      $match: {
        status: "SOLD",
      },
    },
    {
      $group: {
        _id: groupId,
        revenue: {
          $sum: "$sellingPrice",
        },

        profit: {
          $sum: "$profit",
        },

        unitsSold: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        "_id.year": 1,
      },
    },
  ]);

  // =========================================
  // TOTALS
  // =========================================

  const totals = await InventoryUnit.aggregate([

    {
      $match: {
        status: "SOLD",
      },
    },

    {
      $group: {
        _id: null,

        totalRevenue: {
          $sum: "$sellingPrice",
        },

        totalProfit: {
          $sum: "$profit",
        },

        totalUnits: {
          $sum: 1,
        },
      },
    },
  ]);

  // =========================================
  // STORE RANKING
  // =========================================

  const storeRanking = await InventoryUnit.aggregate([

    // ONLY SOLD ITEMS
    {
      $match: {
        status: "SOLD",
      },
    },

    // JOIN INVENTORY
    {
      $lookup: {
        from: "inventories",
        localField: "inventoryId",
        foreignField: "_id",
        as: "inventory",
      },
    },

    // ARRAY -> OBJECT
    {
      $unwind: "$inventory",
    },

    // JOIN STORE
    {
      $lookup: {
        from: "stores",
        localField: "inventory.storeId",
        foreignField: "_id",
        as: "store",
      },
    },

    // ARRAY -> OBJECT
    {
      $unwind: "$store",
    },

    // GROUP BY STORE
    {
      $group: {
        _id: "$store._id",

        storeName: {
          $first: "$store.name",
        },

        revenue: {
          $sum: "$sellingPrice",
        },

        profit: {
          $sum: "$profit",
        },

        unitsSold: {
          $sum: 1,
        },
      },
    },

    // SORT BY REVENUE
    {
      $sort: {
        revenue: -1,
      },
    },
  ]);

  // =========================================
  // SALES HEATMAP
  // =========================================

  const heatmap = await InventoryUnit.aggregate([

    {
      $match: {
        status: "SOLD",
      },
    },

    {
      $group: {
        _id: {

          // 1 = Sunday
          // 2 = Monday
          day: {
            $dayOfWeek: "$soldAt",
          },

          // 0-23
          hour: {
            $hour: "$soldAt",
          },
        },

        sales: {
          $sum: "$sellingPrice",
        },
      },
    },
  ]);

  // =========================================
  // LOW STOCK PRODUCTS
  // =========================================

  const lowStock = await Inventory.find({

    $expr: {
      $lte: ["$stock", "$minStock"],
    },

  });

  // =========================================
  // RETURN FINAL DASHBOARD DATA
  // =========================================

  return {

    salesAnalytics,

    totals: totals[0] || {
      totalRevenue: 0,
      totalProfit: 0,
      totalUnits: 0,
    },

    storeRanking,

    heatmap,

    lowStock,
  };
};