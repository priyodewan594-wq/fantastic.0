import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, default: "user" },
  subscription: { type: String, default: "free" },
  monthlyMessages: { type: Number, default: 0 },
  dailyMessages: { type: Number, default: 0 },
});

export default mongoose.model("User", userSchema);
