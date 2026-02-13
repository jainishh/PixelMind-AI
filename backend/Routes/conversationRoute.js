import express from "express";
const router = express.Router();
import verifyToken from "../Middleware/AuthMiddleware.js"

import { getConversation, renameConversation, deleteConversation } from "../Controllers/ConversationController.js";
router.get("/getConversation",  verifyToken, getConversation);
router.put("/rename/:conversationId", verifyToken, renameConversation);
router.delete("/delete/:conversationId", verifyToken, deleteConversation);
// router.post("/create", verifyToken, createConversation);

export default router;