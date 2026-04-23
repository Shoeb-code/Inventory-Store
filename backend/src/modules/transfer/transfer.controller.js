import * as transferService from "./transfer.service.js";

// 🔄 Transfer Stock
export const transferStock = async (req, res, next) => {
  try {
    const { inventoryId, toStoreId } = req.body;

    // Basic validation
    if (!inventoryId || !toStoreId) {
      return res.status(400).json({
        success: false,
        message: "inventoryId and toStoreId are required"
      });
    }

    const result = await transferService.transferStock({
      inventoryId,
      toStoreId,
      user: req.user
    });

    res.status(200).json({
      success: true,
      message: "Stock transferred successfully",
      data: result
    });

  } catch (e) {
    next(e);
  }
};