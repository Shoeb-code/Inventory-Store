import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    // 🔑 LOGIN ID
    storeCode: {
      type: String,
      required: true,
      unique: true   // e.g. STORE001
    },

    password: {
      type: String,
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    },

    isOnline: {
      type: Boolean,
      default: false
    },

    lastLogin: Date,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Store", storeSchema);