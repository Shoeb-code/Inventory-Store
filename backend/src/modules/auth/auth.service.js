
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import User from '../user/user.model.js'
import RefreshToken  from './auth.model.js'

import { signAccessToken,signRefreshToken,hashToken,compareToken } from "../../shared/utils/generateToken.js";

import { config } from "../../shared/config/env.js";

const getRefreshExpiryDate=()=>{
     const now=new Date();
     now.setDate(now.getDate()+7);
     return now;
}

export const register= async({name,email,password,role,storeID})=>{

    const exists =await User.findOne({email});
    if(exists){
        throw new Error("Email Already registered");
    }

    const hashed =await bcrypt.hash(password,10)
    const user =await User.create({name,email,password:hashed,role,storeID});
    return user
}

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