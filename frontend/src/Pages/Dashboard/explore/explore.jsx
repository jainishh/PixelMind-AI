import React from "react";
import { useNavigate } from "react-router-dom";
const Explore = () => {
  const navigate = useNavigate();
  return (
    <div className="col-span-12 mt-4">
      <div
        className="
          p-6 rounded-xl shadow-2xl border border-white/20 
          flex flex-col md:flex-row md:justify-between md:items-center gap-6
          text-center md:text-left
        "
        style={{
          background: "linear-gradient(to right, #4C65EF, #8B5CF6, #EC4899)",
        }}
      >
        
        <div className="flex flex-col gap-1 md:gap-2">
          <h2 className="text-2xl font-bold text-white">
            Ready to explore AI conversations?
          </h2>
          <p className="text-gray-100 text-sm md:text-base leading-relaxed">
            Start a new chat session and experience the power of advanced AI
            assistance.
          </p>
        </div>

        {/* Button Section */}
        <button
          className="
            bg-indigo-900/50 hover:bg-indigo-900/70 text-white font-semibold
            py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center gap-2
            border border-white/20 mx-auto md:mx-0 w-full md:w-auto cursor-pointer
          "
          onClick={() => navigate("/root/chats")}
        >
          Start Chatting
          <i className="fas fa-arrow-right text-sm"></i>
        </button>
      </div>
    </div>
  );
};

export default Explore;
