import MessageModel from "../Model/MessageModel.js";
import ConversationModel from "../Model/ConversationModel.js";
import DashboardModel from "../Model/DashboardModel.js";

const getMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user._id;

    const conversation = await ConversationModel.findOne({
      _id: conversationId,
      userId: userId,
    });

    if (!conversation) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to access this conversation",
      });
    }

    const messages = await MessageModel.find({ conversationId }).sort({
      createdAt: 1,
    });

    const totalMessageLength = messages.length;

    res.status(200).json({
      success: true,
      messages,
      totalMessageLength,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await ConversationModel.find({ userId });
    const conversationIds = conversations.map((c) => c._id);

    const usermsg = await MessageModel.find({
      conversationId: { $in: conversationIds },
      sender: "user",
    }).sort({ createdAt: 1 });

    const AImsg = await MessageModel.find({
      conversationId: { $in: conversationIds },
      sender: "ai",
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      usermsgCount: usermsg.length,
      AImsgCount: AImsg.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch message length",
    });
  }
};

const getMessageLength = async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await ConversationModel.find({ userId });
    const conversationIds = conversations.map((c) => c._id);

    const totalMessages = await MessageModel.countDocuments({
      conversationId: { $in: conversationIds },
    });

    res.status(200).json({
      success: true,
      totalMessages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch message length",
    });
  }
};

const getMessagesByTime = async (req, res) => {
  try {
    const userId = req.user._id;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const startOfYesterday = new Date(yesterday);
    startOfYesterday.setHours(0, 0, 0, 0);

    const endOfYesterday = new Date(yesterday);
    endOfYesterday.setHours(23, 59, 59, 999);

    const conversations = await ConversationModel.find({ userId });
    const conversationIds = conversations.map((c) => c._id);

    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date();

    const todayMessages = await MessageModel.countDocuments({
      conversationId: { $in: conversationIds },
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    const yesterdayMessages = await MessageModel.countDocuments({
      conversationId: { $in: conversationIds },
      createdAt: { $gte: startOfYesterday, $lte: endOfYesterday },
    });

    const weekMessages = await MessageModel.countDocuments({
      conversationId: { $in: conversationIds },
      createdAt: { $gte: startOfWeek, $lte: endOfWeek },
    });

    res
      .status(200)
      .json({ success: true, todayMessages, yesterdayMessages, weekMessages });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch today's messages" });
  }
};

const getAverageResponseTime = async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await ConversationModel.find({ userId });
    const conversationIds = conversations.map((c) => c._id);

    const result = await MessageModel.aggregate([
      {
        $match: {
          conversationId: { $in: conversationIds },
          sender: "ai",
          responseTime: { $ne: null },
        },
      },
      { $group: { _id: null, avgResponseTime: { $avg: "$responseTime" } } },
    ]);

    const avgResponseTime = result.length > 0 ? result[0].avgResponseTime : 0;

    res.status(200).json({ success: true, avgResponseTime });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch average response time",
    });
  }
};

const editMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Text is required",
      });
    }

    const message = await MessageModel.findById(messageId);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    if (message.sender !== "user") {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own messages",
      });
    }

    const conversation = await ConversationModel.findOne({
      _id: message.conversationId,
      userId: userId,
    });

    if (!conversation) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this message",
      });
    }

    message.text = text;
    await message.save();
    const linkedAiMessage = await MessageModel.findOne({
      replyTo: message._id,
    });

    if (linkedAiMessage) {
      await MessageModel.findByIdAndDelete(linkedAiMessage._id);
    }

    res.status(200).json({
      success: true,
      data: message,
      message: "Message updated and previous AI response deleted (if any)",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to edit message",
    });
  }
};


const deleteMessage = async (req, res) => {
  try {
    const mesaageId = req.params.messageId;
    const userId = req.user._id;

    const userMessage = await MessageModel.findById(mesaageId);

    if (!userMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    const aiMessage = await MessageModel.findOne({
      replyTo: userMessage._id,
    });

    if (aiMessage) {
      await MessageModel.findByIdAndDelete(aiMessage._id);
    }
    
    await MessageModel.findByIdAndDelete(userMessage._id);

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete message",
    });
  }
};


const getMessageByUserText = async (req, res) => {
  try {

    const userId = req.user._id;
   
    const {text, conversationsId} = req.body;

    const messages = await MessageModel.find({
      text: { $regex: text, $options: "i" },
      conversationId: conversationsId
    });

    res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages by user text",
    });
  }
};

export {
  getMessage,
  getMessageLength,
  getMessagesByTime,
  getAverageResponseTime,
  getAllMessages,
  editMessage,
  getMessageByUserText,
  deleteMessage,
};
