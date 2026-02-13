import express from "express";
const router = express.Router();
import verifyToken from "../Middleware/AuthMiddleware.js";

import {
  getMessage,
  getMessageLength,
  getMessagesByTime,
  getAverageResponseTime,
  getAllMessages,
  editMessage,
  deleteMessage,
  getMessageByUserText,
} from "../Controllers/MessageController.js";

router.get("/getMessage/:conversationId", verifyToken, getMessage);
router.get("/getMessageLength", verifyToken, getMessageLength);
router.get("/getMessagesByTime", verifyToken, getMessagesByTime);
router.get("/getAverageResponseTime", verifyToken, getAverageResponseTime);
router.get("/getAllMessages", verifyToken, getAllMessages);
router.put("/edit/:messageId", verifyToken, editMessage);
router.delete("/delete/:messageId", verifyToken, deleteMessage);
router.put("/getMessageByUserText", verifyToken, getMessageByUserText);
export default router;
