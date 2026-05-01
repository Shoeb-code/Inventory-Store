import InventoryUnit from "./inventoryUnit.model.js";


export const getUnitsByInventory = async (req, res, next) => {
    try {
      const { inventoryId } = req.params;
  
      const units = await InventoryUnit.find({ inventoryId });
       
  
      res.status(200).json({
        success: true,
        count: units.length,
        data: units,
      });
    } catch (err) {
      console.error("GET UNITS ERROR:", err.message);
      next(err);
    }
  };

export const updateUnitDetails = async (req,res) => {
  try {
    const { id } = req.params;
     console.log("id;->",id);
    const unit = await InventoryUnit.findById(id);

    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    Object.assign(unit, req.body);

    await unit.save();

    res.json({
      success: true,
      data: unit,
    });

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
};

export const sellUnit = async (req, res) => {
    try {
      const { id } = req.params;
      const { sellingPrice, costPrice } = req.body;
  
      const unit = await InventoryUnit.findById(id);
  
      if (!unit) {
        return res.status(404).json({ message: "Unit not found" });
      }
  
      if (unit.status === "SOLD") {
        return res.status(400).json({ message: "Already sold" });
      }
  
      // 🔥 SALE LOGIC
      unit.status = "SOLD";
      unit.sellingPrice = Number(sellingPrice);
      unit.costPrice = Number(costPrice);
      unit.profit = unit.sellingPrice - unit.costPrice;
      unit.soldAt = new Date();
  
      await unit.save();
  
      res.json({
        success: true,
        data: unit,
      });
  
    } catch (err) {
        console.log(err);
      res.status(500).json({ message: err.message });
    }
  };