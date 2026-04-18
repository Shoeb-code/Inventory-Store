

export const errorHandler = (err,req,res,next)=>{
    console.log(err.status)
    res.status(err.status || 500).
    json({success:false,message: err.message || "Server Error"})
}

