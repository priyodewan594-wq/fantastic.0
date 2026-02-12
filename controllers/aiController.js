import OpenAI from "openai";
import User from "../models/User.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export const chat = async (req, res) => {
  const user = await User.findById(req.user.id);

  // Free user limit
  if (user.role !== "admin" && user.monthlyMessages >= 200) {
    return res.status(403).json("Monthly limit reached");
  }

  const { message } = req.body;
  const model = user.role === "admin" ? "gpt-4o" : "gpt-4o-mini";

  const completion = await openai.chat.completions.create({
    model,
    messages: [{ role: "user", content: message }],
  });

  if(user.role !== "admin"){
    user.monthlyMessages += 1;
    user.dailyMessages += 1;
    await user.save();
  }

  res.json(completion.choices[0].message);
};

export const generateImage = async (req, res) => {
  const { prompt } = req.body;
  const image = await openai.images.generate({
    model: "gpt-image-1",
    prompt,
    size: "1024x1024",
  });
  res.json(image.data[0].url);
};
