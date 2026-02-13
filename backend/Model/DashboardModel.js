// models/Message.js
import mongoose from "mongoose";

const dashboardModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    todayMsg: {
      type: Number,
      default: 0,
    },

    totalMsg: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("dashboardModel", dashboardModel);
