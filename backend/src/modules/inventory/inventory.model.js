import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    // 🔹 PRODUCT INFO
    brand: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Gaming","Office","Student","Premium","Business",
        "Ultrabook","Workstation","2-in-1 / Convertible",
        "Creator / Design","Thin & Light","Budget","Enterprise",
      ],
      required: true,
    },

    // 🔹 SPECIFICATIONS
    processor: { type: String, required: true },
    ram: { 
      type: String,
       required: true 
      },
    storage: { 
      type: String, 
      required: true
     },
      graphics: String,

    // 🔹 PRICING (REFERENCE ONLY)
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // 🔥 STOCK
    stock: {
      type: Number,
      required: true,
      min: 1,
    },

    // 🔹 STORE
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },

    // 🔹 ANALYTICS
    soldCount: {
      type: Number,
      default: 0,
    },

    // 🔹 MEDIA
    image: String,
  },
  { timestamps: true }
);


// 🔥 INDEXES
inventorySchema.index({ storeId: 1 });
inventorySchema.index({ brand: 1, model: 1 });

export default mongoose.model("Inventory", inventorySchema);