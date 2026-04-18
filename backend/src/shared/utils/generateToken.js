
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'

import {config} from '../config/env.js'

export const signAccessToken =(payload)=>{

    return jwt.sign(payload,config.JWT_ACCESS_SECRET,{expiresIn:config.ACCESS_TOKEN_EXPIRES});
};

export const signRefreshToken=(payload)=>{
     return jwt.sign(payload,config.JWT_REFRESH_SECRET,{expiresIn:config.REFRESH_TOKEN_EXPIRES});
};

// create a random token string (for extra security if needed)

export const  randomToken =()=>{
    crypto.randomBytes(40).toString("hex")
}

// hash Refresh token before saving 

export const hashToken =async(token)=>{
    return bcrypt.hash(token,10)
}

export const compareToken =async(token,hash)=>{
    return bcrypt.compare(token,hash)
}
