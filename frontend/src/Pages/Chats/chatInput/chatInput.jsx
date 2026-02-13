import React, { useState } from "react";
import { Send } from "lucide-react";

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    console.log(message);
    onSend?.(message);
    setMessage("");
  };

  return (
    <div className="border-t border-slate-800 px-5 py-3 bg-gray-900/70 backdrop-blur-sm fixed bottom-0 left-0 right-0 md:static">
      <div className="flex items-center gap-3 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3">
        <input
          className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-500"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="p-2 rounded-lg bg-gradient-to-r from-sky-500 to-purple-500 hover:opacity-90 transition text-white shadow-lg shadow-cyan-500/25"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
