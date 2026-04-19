
import  rateLimit from 'express-rate-limit'

// Generic limiter
export const apiLimiter = rateLimit({
    windowMs:15*60*1000,
    max:100,
    message: "Too many requests, try again later"
})

//Otp limiter strict 
export const otpLimiter=rateLimit({
    windowMs:5*60*1000,
    max:3,
    message:"Too many OTP requests, please wait"
})

export const loginLimiter= rateLimit({
    windowMs:10*60*1000,
    max:5,
    message: "Too many login attempts"
})