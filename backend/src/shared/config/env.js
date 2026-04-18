

import dotenv from 'dotenv'
dotenv.config();

export const config ={
    PORT:process.env.PORT || 5000,
    MONGO_URI:process.env.MONGO_URI ,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_ACCESS_SECRET:process.env.ACCESS_TOKEN_EXPIRES,
    JWT_REFRESH_SECRET:process.env.JWT_REFRESH_SECRET,

    ACCESS_TOKEN_EXPIRES:process.env.ACCESS_TOKEN_EXPIRES,
    REFRESH_TOKEN_EXPIRES:process.env.REFRESH_TOKEN_EXPIRES,
}
