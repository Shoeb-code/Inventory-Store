import jwt from 'jsonwebtoken'
import {config} from '../config/env.js'

export const protect= async()=>{

    const token = req.headers.authorization?.split(" ")[1];
          if(!token){
            return res.status(401).json({ msg: "No token" });
        }

   try {
          
     const decoded= jwt.verify(token,config.JWT_ACCESS_SECRET);
     req.user = decoded;
     next();
   } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
   }
}