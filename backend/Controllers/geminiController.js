import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

import MessageModel from "../Model/MessageModel.js";
import ConversationModel from "../Model/ConversationModel.js";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const getGeminiResponse = async (req, res) => {
  try {
    const { message, conversationId, pastUserMessages } = req.body;
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "user id missing" });
    }
    if (!message) {
      return res.status(400).json({ message: "Input is required" });
    }

    if (!GEMINI_API_KEY) {
      return res.status(400).json({
        message: "GEMINI_API_KEY is missing",
      });
    }

    let conversation;
    if (!conversationId) {
      conversation = await ConversationModel.create({
        userId,
        title: message.slice(0, 15),
        firstMessage: message,
        lastMessage: message,
        lastSender: "user",
        lastMessageAt: new Date(),
      });
    } else {
      conversation = await ConversationModel.findById(conversationId);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }
    }

    const userMsg = await MessageModel.create({
      conversationId: conversation._id,
      sender: "user",
      text: message,
    });

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    let contextStr = "";
    if (
      pastUserMessages &&
      Array.isArray(pastUserMessages) &&
      pastUserMessages.length > 0
    ) {
      contextStr = `PREVIOUS USER MESSAGES REQUESTS FOR CONTEXT:\n${pastUserMessages.join(
        "\n",
      )}\n\n`;
    }

    const emojiInstruction =
      "Use relevant emojis occasionally. Keep formatting clean.";

    const fullMsg = `${contextStr}CURRENT USER MESSAGE:\n${message}\n\nSYSTEM INSTRUCTION: ${emojiInstruction}`;

    const startTime = Date.now();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullMsg,
    });
    const endTime = Date.now();
    const responseTime = (endTime - startTime) / 1000;

    const aiText = response.text;

    const aiMsg = await MessageModel.create({
      conversationId: conversation._id,
      sender: "ai",
      text: aiText,
      responseTime: responseTime,
      replyTo: userMsg._id,
    });

    conversation.lastMessage = aiText;
    conversation.lastSender = "ai";
    conversation.lastMessageAt = new Date();
    await conversation.save();

    return res.status(200).json({
      conversationId: conversation._id,
      reply: aiText,
      userMessage: userMsg,
      aiMessage: aiMsg,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const regenerateResponse = async (req, res) => {
  try {
    const { messageId, pastUserMessages } = req.body;

    if (!messageId) {
      return res.status(400).json({ message: "Message ID is required" });
    }

    const userMessage = await MessageModel.findById(messageId);
    if (!userMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    if (userMessage.sender !== "user") {
      return res.status(400).json({ message: "Can only regenerate for user messages" });
    }

    const conversation = await ConversationModel.findById(userMessage.conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    let contextStr = "";
    if (pastUserMessages && Array.isArray(pastUserMessages) && pastUserMessages.length > 0) {
      contextStr = `PREVIOUS USER MESSAGES REQUESTS FOR CONTEXT:\n${pastUserMessages.join("\n")}\n\n`;
    }
    const emojiInstruction = "Use relevant emojis occasionally. Keep formatting clean.";
    const fullMsg = `${contextStr}CURRENT USER MESSAGE:\n${userMessage.text}\n\nSYSTEM INSTRUCTION: ${emojiInstruction}`;

    const startTime = Date.now();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullMsg,
    });
    const endTime = Date.now();
    const responseTime = (endTime - startTime) / 1000;
    const aiText = response.text;

    const newAiMessage = await MessageModel.create({
      conversationId: conversation._id,
      sender: "ai",
      text: aiText,
      responseTime: responseTime,
      replyTo: userMessage._id,
    });

    conversation.lastMessage = aiText;
    conversation.lastSender = "ai";
    conversation.lastMessageAt = new Date();
    await conversation.save();

    return res.status(200).json({
      success: true,
      reply: aiText,
      message: newAiMessage 
    });

  } catch (error) {
    console.error("Regeneration error:", error);
    return res.status(500).json({
      message: "Regeneration failed",
      error: error.message,
    });
  }
};

export { getGeminiResponse, regenerateResponse };
