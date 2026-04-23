import Store from "../store/store.model.js";
import Inventory from "../inventory/inventory.model.js";
import Transaction from "../transaction/transaction.model.js";

// 🏪 STORE DASHBOARD
export const getStoreDashboard = async (user) => {

  if (!user.storeId) {
    throw new Error("User has no store assigned");
  }

  const storeId = user.storeId;

  const totalStock = await Inventory.countDocuments({ storeId });

  const sales = await Transaction.find({
    storeId,
    type: "SELL"
  }) || [];

  const totalSales = sales.reduce(
    (acc, s) => acc + (s.price || 0),
    0
  );

  const totalProfit = sales.reduce(
    (acc, s) => acc + ((s.price || 0) - (s.costPrice || 0)),
    0
  );

  return {
    totalStock,
    totalSales,
    totalProfit,
    recentSales: sales.slice(-5),
    salesChart: []
  };
};

// 👑 SUPER ADMIN DASHBOARD
export const getSuperDashboard = async () => {

  const stores = await Store.find();
  const totalStores = stores.length;

  const totalStock = await Inventory.countDocuments();

  const sales = await Transaction.find({ type: "SELL" }) || [];

  const totalSales = sales.reduce(
    (acc, s) => acc + (s.price || 0),
    0
  );

  return {
    totalStores,
    totalStock,
    totalSales,
    stores
  };
};