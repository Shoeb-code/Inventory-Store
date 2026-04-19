
import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["SUPER_ADMIN", "STORE_ADMIN"],
        default:"STORE_ADMIN"
    },
    storeID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Store",
        default: null 
        },

        isVerified:
        {   type: Boolean, 
            default: false
         },

    otpHash: String,
    otpExpiry: Date

    
},{ timestamps :true});

const User =mongoose.model("User",userSchema);
export default User;
