import Transaction from "./transaction.model.js";

// 💰 SELL PRODUCT
export const sellProduct = async (data) => {
  return await Transaction.create({
    ...data,
    type: "SELL"
  });
};

// 📦 BUY PRODUCT
export const buyProduct = async (data) => {
  return await Transaction.create({
    ...data,
    type: "BUY"
  });
};

// 📊 GET ALL
export const getTransactions = async (storeId) => {
  return await Transaction.find({ storeId });
};