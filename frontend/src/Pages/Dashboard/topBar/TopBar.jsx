import React from "react";
import { useNavigate } from "react-router-dom";

const TopBar = ({ onNewChat }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
          PixelMind AI Dashboard
        </h1>
        <p className="text-gray-400 mt-1">
          Welcome back! Ready to explore AI conversations?
        </p>
      </div>

      <button
        onClick={() => navigate("/root/chats")}
        className="bg-gradient-to-r from-sky-500 to-purple-500 hover:opacity-90 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 flex items-center space-x-2 self-start md:self-auto cursor-pointer"
      >
        <i className="fas fa-plus text-sm"></i>
        <span>New Chat</span>
      </button>
    </div>
  );
};

export default TopBar;
