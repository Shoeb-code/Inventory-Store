import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routes
import authRoutes from "./modules/auth/auth.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import inventoryRoutes from "./modules/inventory/inventory.routes.js";
import transferRoutes from "./modules/transfer/transfer.routes.js";
import storeRoutes from "./modules/store/store.routes.js";
import storeAuthRoutes from "./modules/storeAuth/storeAuth.routes.js";

// Middleware
import { errorHandler } from "./shared/middleware/error.middleware.js";

const app = express();

// ✅ CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());

// Root
app.get("/", (req, res) => {
  console.log("ROOT HIT");
  res.send("API Running 🚀");
});

// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/transfer", transferRoutes);
app.use("/api/stores", storeRoutes);


app.use("/api/store-auth", storeAuthRoutes);
// 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use(errorHandler);

export default app;