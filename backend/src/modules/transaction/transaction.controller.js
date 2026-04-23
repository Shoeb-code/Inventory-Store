import * as transactionService from "./transaction.service.js";

export const sell = async (req, res, next) => {
  try {
    const data = await transactionService.sellProduct(req.body);
    res.status(201).json(data);
  } catch (e) {
    next(e);
  }
};

export const buy = async (req, res, next) => {
  try {
    const data = await transactionService.buyProduct(req.body);
    res.status(201).json(data);
  } catch (e) {
    next(e);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const data = await transactionService.getTransactions(
      req.user.storeId
    );
    res.json(data);
  } catch (e) {
    next(e);
  }
};