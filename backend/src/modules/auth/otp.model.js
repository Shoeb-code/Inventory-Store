
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: { 
         type: String,
         required: true 
        },

    otpHash: { 
        type: String,
         required: true 
        },

    otpExpiry: { 
        type: Date,
         required: true
         },

    data: {
      name: String,
      password: String,
      role: String,
      storeId: mongoose.Schema.Types.ObjectId
    }
  },
  { timestamps: true }
);

// auto delete after expiry
otpSchema.index({ otpExpiry: 1 }, { expireAfterSeconds: 0 });

  const Otp =  mongoose.model("Otp",otpSchema)
  
  export default Otp;