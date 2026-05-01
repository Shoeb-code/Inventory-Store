import Store from "./store.model.js";
import { createStore } from "./store.service.js";

export const createStoreController = async (req, res) => {
  try {
    console.log(" Store Data ->",req.body);
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