import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import AuthRoutes from "./Routes/AuthRoutes.js";
import geminiRoutes from "./Routes/geminiRoutes.js";
import conversationRoute from "./Routes/conversationRoute.js";
import messageRoute from "./Routes/messageRoute.js";

const app = express();

app.use(cors({
  origin: "*", 
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/gemini", geminiRoutes);
app.use("/api/v1/conversations", conversationRoute);
app.use("/api/v1/messages", messageRoute);
// app.use('api/v1/dashboard',)

export default app;
