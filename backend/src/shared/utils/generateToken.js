import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { config } from "../config/env.js";

// 🔐 ACCESS TOKEN
export const signAccessToken = (payload) => {
  return jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    expiresIn: config.ACCESS_TOKEN_EXPIRES,
  });
};

// 🔄 REFRESH TOKEN
export const signRefreshToken = (payload) => {
  return jwt.sign(payload, config.JWT_REFRESH_SECRET, {
    expiresIn: config.REFRESH_TOKEN_EXPIRES,
  });
};

// 🔐 RANDOM TOKEN
export const randomToken = () => {
  return crypto.randomBytes(40).toString("hex");
};

// 🔐 HASH TOKEN
export const hashToken = async (token) => {
  return bcrypt.hash(token, 10);
};

// 🔐 COMPARE TOKEN
export const compareToken = async (token, hash) => {
  return bcrypt.compare(token, hash);
};