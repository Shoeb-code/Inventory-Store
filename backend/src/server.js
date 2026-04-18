

import app from "./app.js";

import { connectDB } from "./shared/config/db.js";
import { config } from "./shared/config/env.js";

const startServer =async()=>{
  await connectDB()

  app.listen(config.PORT,()=>{
    console.log(`🚀 Server running on port ${config.PORT}`);
  })
}
startServer();

