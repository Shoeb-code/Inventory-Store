import Otp from "./otp.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import User from '../user/user.model.js'
import RefreshToken  from './auth.model.js'

import { signAccessToken,signRefreshToken,hashToken,compareToken } from "../../shared/utils/generateToken.js";

import { config } from "../../shared/config/env.js";
import { compareOTP, generateOtp, hashOtp } from "../../shared/utils/otp.js";
import { sendOTP } from "../../shared/services/email.service.js";



const getRefreshExpiryDate=()=>{
     const now=new Date();
     now.setDate(now.getDate()+7);
     return now;
}

export const register= async({name,email,password,role,storeID})=>{
    
      console.log(name,role)
      const exists =await User.findOne({email});

    if(exists){
        throw new Error("Email Already registered");
    }

     const hashedPassword =await bcrypt.hash(password,10)
     const otp= generateOtp();
     const otpHash = await hashOtp(otp);
     
      await Otp.create({
         email, otpHash,otpExpiry: Date.now() + 5 * 60 * 1000,
         data: {
          name,
          password: hashedPassword,
          role
        }
      })

    await sendOTP(email, otp);
    return { msg: "OTP sent to email" };
}

export const verifyOtp = async ({ email, otp }) => {
  const record = await Otp.findOne({ email });

  if (!record) throw new Error("OTP not found");

  if (record.otpExpiry < Date.now()) {
    throw new Error("OTP expired");
  }

  const isMatch = await compareOTP(otp, record.otpHash);
  if (!isMatch) throw new Error("Invalid OTP");

  // 🔥 Create user NOW
  const user = await User.create({
    name: record.data.name,
    email,
    password: record.data.password,
    role: record.data.role,
    isVerified: true
  });

  // delete OTP record
  await Otp.deleteOne({ _id: record._id });

  return { msg: "Account created successfully", user };
}; 

// resend Otp

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

export const forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
  
    const otp = generateOtp();
    const otpHash = await hashOtp(otp);
  
    user.otpHash = otpHash;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
  
    await user.save();
  
    await sendOTP(email, otp);
  
    return { msg: "OTP sent for password reset" };
  };

  export const resetPassword = async ({ email, otp, newPassword }) => {
    const user = await User.findOne({ email });
  
    if (!user) throw new Error("User not found");
  
    if (user.otpExpiry < Date.now()) {
      throw new Error("OTP expired");
    }
  
    const isMatch = await compareOTP(otp, user.otpHash);
    if (!isMatch) throw new Error("Invalid OTP");
  
    user.password = await bcrypt.hash(newPassword, 10);
    user.otpHash = null;
    user.otpExpiry = null;
  
    await user.save();
  
    return { msg: "Password reset successful" };
  };

export const login =async({email,password,ip})=>{
    const user = await User.findOne({email});
    if(!user || !user.isActive){
      throw new Error("Invalid credentials")
    }

    const ok = await bcrypt.compare(password,user.password)
    if (!ok) throw new Error("Invalid credentials");

    const payload ={id:user._id, role:user.role, storeID:user.storeID}

    const accessToken =signAccessToken(payload);
    const refreshToken =signRefreshToken({ id: user._id });

    const tokenHash= await hashToken(refreshToken)

    await RefreshToken.create({
        userId:user._id,
        tokenHash,
        expiresAt: getRefreshExpiryDate(),
        createdByIp: ip
    })
    return { accessToken, refreshToken, user };
}

export const refresh =async(oldRefreshToken) =>{
    let decoded;
    try {
           decoded=jwt.verify(oldRefreshToken,config.JWT_REFRESH_SECRET);

    } catch (error) {
        throw new Error("Invalid refresh token");
    }
    const userId = decoded.id;
    const tokens= await RefreshToken.find({userId,isRevoked:false});

    // match hash
    let currentTokenDoc=null;
    for(const t of tokens){
       const match = await compareToken(oldRefreshToken, t.tokenHash);
       if (match) {
        currentTokenDoc = t;
        break;
      }
    }

    if (!currentTokenDoc) throw new Error("Refresh token not found");
    if (currentTokenDoc.isRevoked) throw new Error("Token revoked");
  
    // rotate token
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
}

export const logout =async (refreshToken) =>{
     const tokens= await RefreshToken.find({isRevoked:false})

     for( const t of tokens){
        const match = await compareToken(refreshToken,t.tokenHash);
         if(match){
            t.isRevoked = true;
            await t.save();
            break;
         }

     }
}