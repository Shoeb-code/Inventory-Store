import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    productName: String,

    type: {
      type: String,
      enum: ["BUY", "SELL"],
      required: true
    },

    price: Number,        // selling price
    costPrice: Number,    // buying price

    quantity: {
      type: Number,
      default: 1
    },

    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true
    }
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;