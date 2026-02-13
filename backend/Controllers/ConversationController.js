import ConversationModel from "../Model/ConversationModel.js";
import MessageModel from "../Model/MessageModel.js";
import mongoose from "mongoose";

const getConversation = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res.status(401).json({ message: "User ID missing" });
  }
  try {
    const conversations = await ConversationModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "messages",
          localField: "_id",
          foreignField: "conversationId",
          as: "messages",
        },
      },
      { $addFields: { messageCount: { $size: "$messages" } } },
      { $project: { messages: 0 } },
      { $sort: { lastMessageAt: -1 } },
    ]);
    return res.status(200).json(conversations);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const renameConversation = async (req, res) => {
  const { conversationId } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const updatedConversation = await ConversationModel.findOneAndUpdate(
      { _id: conversationId, userId: req.user._id },
      { title },
      { new: true }
    );

    if (!updatedConversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    return res.status(200).json({ success: true, conversation: updatedConversation });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteConversation = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const deletedConversation = await ConversationModel.findOneAndDelete({
      _id: conversationId,
      userId: req.user._id,
    });

    if (!deletedConversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    await MessageModel.deleteMany({ conversationId: new mongoose.Types.ObjectId(conversationId) });

    return res.status(200).json({ success: true, message: "Conversation and messages deleted" });
  } catch (err) {
    console.error("Delete conversation error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export { getConversation, renameConversation, deleteConversation };
