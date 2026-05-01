import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 🔒 Check header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
  
    
    // 🔒 Verify token
    const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET);

    // ✅ Attach user
    req.user = decoded;
    
   
    // ✅ Move to next middleware
    return next();

  } catch (err) {
    return res.status(401).json({
      msg: "Invalid token",
    });
  }
};