
import bcrypt from 'bcrypt'

export const generateOtp =()=>{
    return  Math.floor(Math.random()*900000 + 100000).toString();
}

export const hashOtp= async(otp)=>{
    return bcrypt.hash(otp,10);
}

export const compareOTP = async (otp, hash) => {
    return bcrypt.compare(otp, hash);
  };