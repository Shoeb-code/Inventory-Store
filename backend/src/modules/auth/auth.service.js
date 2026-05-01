import Otp from "./otp.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../user/user.model.js";
import RefreshToken from "./auth.model.js";

import {
  signAccessToken,
  signRefreshToken,
  hashToken,
  compareToken
} from "../../shared/utils/generateToken.js";

import { config } from "../../shared/config/env.js";
import { compareOTP, generateOtp, hashOtp } from "../../shared/utils/otp.js";
import { sendOTP } from "../../shared/services/email.service.js";

// ================= HELPER =================
const getRefreshExpiryDate = () => {
  const now = new Date();
  now.setDate(now.getDate() + 7);
  return now;
};

// ================= REGISTER =================
export const register = async ({ name, email, password, role, storeId }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error("Email already registered");

  const hashedPassword = await bcrypt.hash(password, 10);

  const otp = generateOtp();
  const otpHash = await hashOtp(otp);

  // ✅ storeId saved in OTP
  await Otp.create({
    email,
    otpHash,
    otpExpiry: Date.now() + 5 * 60 * 1000,
    data: {
      name,
      password: hashedPassword,
      role,
      storeId
    }
  });

  await sendOTP(email, otp);

  return { msg: "OTP sent to email" };
};

// reset password
export const resetPassword = async ({ email, newPassword }) => {
  // 1. Validate input
  if (!email || !newPassword) {
    throw new Error("Email and new password are required");
  }

  if (newPassword.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  // 2. Check user
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  // 3. Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // 4. Update password
  user.password = hashedPassword;
  await user.save();

  return {
    msg: "Password reset successful"
  };
};

// ================= VERIFY OTP =================
export const verifyOtp = async ({ email, otp }) => {

  const record = await Otp.findOne({ email });

  if (!record) throw new Error("OTP not found");

  if (record.otpExpiry < Date.now()) {
    throw new Error("OTP expired");
  }

  const isMatch = await compareOTP(otp, record.otpHash);
    console.log( "Otp both->",otp,record.otpHash);
  if (!isMatch) throw new Error("Invalid OTP");

  // 🔥 CASE 1: REGISTER FLOW
  if (record.data?.name) {
    const user = await User.create({
      name: record.data.name,
      email,
      password: record.data.password,
      role: record.data.role,
      storeId: record.data.storeId,
      isVerified: true
    });

    await Otp.deleteOne({ _id: record._id });

    return {
      msg: "Account created successfully",
      user
    };
  }

  // 🔥 CASE 2: FORGOT PASSWORD FLOW
  await Otp.deleteOne({ _id: record._id });

  return {
    msg: "OTP verified",
    resetAllowed: true // 👈 important
  };
};

// forgot-password
export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const otp = generateOtp();
  const otpHash = await hashOtp(otp);

  const otpExpire = new Date(Date.now() + 5 * 60 * 1000);

  await Otp.deleteMany({ email });

  await Otp.create({
    email,
    otpHash,
    otpExpiry: otpExpire,
    data: {} // no data needed
  });

  await sendOTP(email, otp);

  return { msg: "OTP sent successfully" };
};
 
// ================= RESEND OTP =================
export const resendOtp = async (email) => {

  const record = await Otp.findOne({ email });

  if (!record) throw new Error("No pending registration");

  if (record.otpExpiry > Date.now() - 60000) {
    throw new Error("Wait before requesting again");
  }

  const otp = generateOtp();
  const otpHash = await hashOtp(otp);

  record.otpHash = otpHash;
  record.otpExpiry = Date.now() + 5 * 60 * 1000;

  await record.save();
  await sendOTP(email, otp);

  return { msg: "OTP resent" };
};

// ================= LOGIN =================
export const login = async ({ email, password, ip }) => {
  const user = await User.findOne({ email });

  if (!user || !user.isVerified) {
    throw new Error("Invalid credentials");
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error("Invalid credentials");

  // ✅ FIXED payload
  const payload = {
    id: user._id,
    role: user.role,
    storeId: user.storeId
  };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken({ id: user._id });

  const tokenHash = await hashToken(refreshToken);

  await RefreshToken.create({
    userId: user._id,
    tokenHash,
    expiresAt: getRefreshExpiryDate(),
    createdByIp: ip
  });

  const safeUser = {
    id: user._id,
    email: user.email,
    role: user.role,
    storeId: user.storeId
  };

  return { accessToken, refreshToken, user: safeUser };
};

// ================= REFRESH =================
export const refresh = async (oldRefreshToken) => {
  let decoded;

  try {
    decoded = jwt.verify(oldRefreshToken, config.JWT_REFRESH_SECRET);
  } catch {
    throw new Error("Invalid refresh token");
  }

  const userId = decoded.id;
  const tokens = await RefreshToken.find({ userId, isRevoked: false });

  let currentTokenDoc = null;

  for (const t of tokens) {
    const match = await compareToken(oldRefreshToken, t.tokenHash);
    if (match) {
      currentTokenDoc = t;
      break;
    }
  }

  if (!currentTokenDoc) throw new Error("Refresh token not found");

  currentTokenDoc.isRevoked = true;

  const newRefreshToken = signRefreshToken({ id: userId });
  const newHash = await hashToken(newRefreshToken);

  currentTokenDoc.replacedByTokenHash = newHash;
  await currentTokenDoc.save();

  await RefreshToken.create({
    userId,
    tokenHash: newHash,
    expiresAt: getRefreshExpiryDate()
  });

  const user = await User.findById(userId);

  const accessToken = signAccessToken({
    id: user._id,
    role: user.role,
    storeId: user.storeId
  });

  return { accessToken, refreshToken: newRefreshToken };
};

// ================= LOGOUT =================
export const logout = async (refreshToken) => {
  const tokens = await RefreshToken.find({ isRevoked: false });

  for (const t of tokens) {
    const match = await compareToken(refreshToken, t.tokenHash);
    if (match) {
      t.isRevoked = true;
      await t.save();
      break;
    }
  }
};