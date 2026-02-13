// models/Conversation.js
import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },

    title: {
      type: String,
      default: "New Chat"
    },

    lastMessage: {
      type: String
    },

    lastSender: {
      type: String,
      enum: ["user", "ai"]
    },                    

    lastMessageAt: {
      type: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);
