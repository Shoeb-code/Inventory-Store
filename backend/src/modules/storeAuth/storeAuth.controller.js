import { loginStore } from "./storeAuth.service.js";
import {
  signAccessToken,
  signRefreshToken,
} from "../../shared/utils/generateToken.js";

export const storeLogin = async (req, res) => {
  try {
    const { storeId,password } = req.body;
       console.log(req.body);
    if (!storeId || !password) {
      return res.status(400).json({
        success: false,
        message: "Store ID and password required",
      });
    }
      console.log('hello')
      const store = await loginStore(storeId, password);
      console.log('hello2')
    // 🔥 PAYLOAD
    const payload = {
      id: store._id,
      role:"STORE_ADMIN",
      storeId: store.storeId,
    };

    // 🔥 TOKENS
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    res.status(200).json({
      success: true,
      message:"Login successful",
      accessToken,
      refreshToken,
      user: payload,
    });

  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};