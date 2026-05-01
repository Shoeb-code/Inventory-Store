// modules/store/store.model.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // 🔑 STORE LOGIN ID
    storeId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // 🔥 hidden by default
    },

    // 🔐 STATUS
    isActive: {
      type: Boolean,
      default: true,
    },

    isOnline: {
      type: Boolean,
      default: false,
    },

    lastLogin: {
      type: Date,
    },

    // 🔐 SECURITY
    loginAttempts: {
      type: Number,
      default: 0,
    },

    lockUntil: {
      type: Date,
    },

    // 👤 SUPER ADMIN
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // 📊 ANALYTICS (optional)
    totalRevenue: {
      type: Number,
      default: 0,
    },

    totalSales: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);


// 🔥 SINGLE CLEAN HOOK (NO next, NO ERROR)
storeSchema.pre("save", async function () {

  // normalize storeCode
  if (this.storeId) {
    this.storeId = this.storeId.toUpperCase();
  }

  // hash password only if changed
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});


// 🔥 PASSWORD CHECK
storeSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};


// 🔥 ACCOUNT LOCK CHECK
storeSchema.virtual("isLocked").get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});


export default mongoose.model("Store", storeSchema);