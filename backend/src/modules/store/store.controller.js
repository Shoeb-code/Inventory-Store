import Store from "./store.model.js";
import { createStore } from "./store.service.js";
import * as storeService from './store.service.js'

export const createStoreController = async (req, res) => {
  try {

    const store = await createStore(req.body,req.user.id);
    res.status(201).json({
      success: true,
      message: "Store created successfully",
      data: {
        id: store._id,
        name: store.name,
        storeId: store.storeId,
      },
    });

  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      
      message: err.message,
    });
  }
};

export const getAllStores = async (req, res) => {
  const stores = await Store.find().select("-password");

  res.status(200).json({
    success: true,
    data: stores,
  });
};


export const getStoreSalesById = async (req,res,next) => {
  try {
    const { id } = req.params;
    const data = await storeService.getStoreSalesByIdService(id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getStoreInventoryById = async (
  req,
  res,
  next
) => {

  try {

    const { id } = req.params;

    const data =
      await storeService.getStoreInventoryByIdService(id);

    res.json(data);

  } catch (err) {

    next(err);

  }
};


export const getStoreSummaryById = async (
  req,
  res,
  next
) => {

  try {

    const { id } = req.params;

    const data =
      await storeService.getStoreSummaryByIdService(id);

    res.json(data);

  } catch (err) {

    next(err);

  }
};
