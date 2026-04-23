import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    productName: String,
    brand: String,
    model: String,

    price: Number,
    costPrice: Number,

    serialNumber: {
      type: String,
      unique: true
    },

    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true
    },

    status: {
      type: String,
      enum: ["IN_STOCK", "SOLD", "TRANSFERRED"],
      default: "IN_STOCK"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Inventory", inventorySchema);