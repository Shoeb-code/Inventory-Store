import express from 'express'
import cors from 'cors'
import { errorHandler } from './shared/middleware/error.middleware.js';

const app=express()
app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
    res.send("API Running 🚀");
  });
  
// Error middleware (last)
app.use(errorHandler);

export default app
