import mongoose from "mongoose";

const inventoryUnitSchema = new mongoose.Schema(
  {
    inventoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
      required: true,
    },

    serialNumber: String,
    imei: String,

    status: {
      type: String,
      enum: ["AVAILABLE", "SOLD"],
      default: "AVAILABLE",
    },

    sellingPrice: Number,
    costPrice: Number,
    profit: Number,

    soldAt: Date,
  },
  { timestamps: true }
);

// 🔥 INDEX
inventoryUnitSchema.index({ inventoryId: 1 });

// 🔥 AUTO PROFIT
inventoryUnitSchema.pre("save", async function () {
  if (this.sellingPrice && this.costPrice) {
    this.profit = this.sellingPrice - this.costPrice;
  }
  
});

export default mongoose.model("InventoryUnit", inventoryUnitSchema);