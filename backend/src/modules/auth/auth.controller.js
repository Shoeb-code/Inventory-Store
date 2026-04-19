
import * as authService from './auth.service.js'

export const register = async(req,res,next)=>{
    try { 
         console.log(req.body);
        const user = await authService.register(req.body)
         res.status(201).json(user)
    } catch (e) {
         next(e);
    }
}

export const verifyOTP = async (req, res, next) => {
    try {
      const data = await authService.verifyOtp(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  };

  export const resendOtp = async ()=>{
    try {
         const data= authService.resendOtp(req.body.email);
         res.json(data);
    } catch (e) {
      next(e);
    }
  }

export const forgotPassword = async (req, res, next) => {
    try {
      const data = await authService.forgotPassword(req.body.email);
      res.json(data);
    } catch (e) {
      next(e);
    }
  };

export const resetPassword = async (req, res, next) => {
    try {
      const data = await authService.resetPassword(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  };

export const login = async (req,res,next)=>{
    try {
         const {accessToken,refreshToken,user}= await authService.login({
            ...req.body,
            ip:req.ip
         })
         // store refresh token in httpOnly cookie 
         res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            secure:false,
            sameSite:'strict'
         })
         res.json({accessToken,user})
    } catch (e) {
        next(e);
    }
}

export const refresh = async(req,res,next)=>{
    try {
            const token= req.cookies.refreshToken;
            const data= await authService.refresh(token);

            res.cookie('refreshToken',data.refreshToken,{
                httpOnly:true,
                secure:false,
                sameSite:'strict'
            })
            res.json({ accessToken: data.accessToken });
    } catch (e) {
        next(e); 
    }
}


export const logout = async (req, res, next) => {
    try {
      const token = req.cookies.refreshToken;
      await authService.logout(token);
  
      res.clearCookie("refreshToken");
      res.json({ msg: "Logged out" });
    } catch (e) {
      next(e);
    }
  };

