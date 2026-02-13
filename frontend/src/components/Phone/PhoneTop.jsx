import React from "react";
import { Menu } from "lucide-react"; // (optional icon lib — you can replace)

const PhoneTop = ({ openSidebar }) => {
  return (
    <div className="md:hidden w-full h-14 flex items-center gap-3 px-4 bg-[#0B1320] border-b border-slate-800 shadow-lg">
      {/* Hamburger Button */}
      <button
        onClick={openSidebar}
        className="text-gray-300 active:scale-95 transition"
      >
        <Menu size={22} /> {/* OR replace with normal icon: ☰ */}
      </button>

      {/* Title */}
      <span className="text-lg font-bold">
        <span className="bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
          AI
        </span>{" "}
        <span className="text-white">Chatbot</span>
      </span>
    </div>
  );
};

export default PhoneTop;
