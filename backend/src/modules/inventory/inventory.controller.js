import * as inventoryService from "./inventory.service.js";

export const addBulk = async (req, res, next) => {
  try {
    const data = await inventoryService.addBulkInventory(req.body);

    res.status(201).json({
      success: true,
      count: data.length,
      data
    });

  } catch (e) {
    next(e);
  }
};