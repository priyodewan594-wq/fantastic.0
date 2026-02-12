import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { chat, generateImage } from "../controllers/aiController.js";

const router = express.Router();
router.post("/chat", verifyToken, chat);
router.post("/image", verifyToken, generateImage);

export default router;
