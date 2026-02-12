import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: hashed });
  res.json({ message: "Registered successfully" });
};

export const login = async (req, res) => {
  const { email, password, secretCode } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json("Wrong password");

  let role = "user";
  if (email === process.env.ADMIN_EMAIL && secretCode === process.env.ADMIN_SECRET) {
    role = "admin";
  }

  const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
  res.json({ token, role });
};
