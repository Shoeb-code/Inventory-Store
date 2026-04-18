
import mongoose from "mongoose";

const refreshTokenSchema =new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        index: true 
    },
    tokenHash:{
        type:String,
        required:true,
    },
    expiresAt:{
        type:Date,
        required: true 
    },
    isRevoked: {
         type: Boolean, 
         default: false },

     replacedByTokenHash: 
     {   type: String,
         default: null
         },
    createdByIp: String

}, { timestamps: true })

// auto-delete expired tokens
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export default mongoose.model("RefreshToken", refreshTokenSchema);