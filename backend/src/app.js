import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// Routes
import  authRoutes from './modules/auth/auth.routes.js'


// MiddleWare
import { errorHandler } from './shared/middleware/error.middleware.js';

const app=express()
app.use(
  cors({
    origin: "*", // allow all (for dev)
    credentials: true
  })
);
app.use(express.json())
app.use(cookieParser()); 

app.get("/", (req, res) => {
  console.log("ROOT HIT");
  res.send("API Running 🚀");
});

  app.use("/api/auth", authRoutes);

  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });
  
// Error middleware (last)
app.use(errorHandler);

export default app
