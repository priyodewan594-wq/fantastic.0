import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import aiRoutes from "./routes/ai.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => console.log("MongoDB connected"));

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

app.listen(process.env.PORT || 5000, () => console.log("Server running"));
