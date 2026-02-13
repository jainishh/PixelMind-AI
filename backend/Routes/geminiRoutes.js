import express from "express";
const router = express.Router();
import verifyToken from "../Middleware/AuthMiddleware.js"
import { getGeminiResponse, regenerateResponse } from "../Controllers/geminiController.js";
router.post("/geminiInput",  verifyToken,   getGeminiResponse);
router.post("/regenerate", verifyToken, regenerateResponse);
export default router;