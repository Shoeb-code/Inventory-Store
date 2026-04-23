import * as storeAuthService from "./storeAuth.service.js";

// 🔐 LOGIN
export const login = async (req, res, next) => {
    try {
      const data = await storeAuthService.loginStore(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  };

// 🚪 LOGOUT
export const logout = async (req, res, next) => {
  try {
    const data = await storeAuthService.logoutStore(req.user.storeId);
    res.json(data);
  } catch (e) {
    next(e);
  }
};