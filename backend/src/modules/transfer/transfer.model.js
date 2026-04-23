import mongoose from "mongoose";

const transferSchema = new mongoose.Schema(
  {
    inventoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Inventory" },
    fromStore: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
    toStore: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
    transferredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("Transfer", transferSchema);