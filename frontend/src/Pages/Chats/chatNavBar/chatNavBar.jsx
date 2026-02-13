import React from "react";
import { ArrowLeft, ArrowRight, Sparkles, Plus } from "lucide-react";

const ChatNavBar = ({
  isHistoryOpen,
  onToggleHistory,
  onSelectConversation,
  title,
  messages,
  setTotalMsg,
  setMessages,
  
}) => {
  return (
    <div className="w-full px-4 md:px-8 py-4 border-b border-gray-700/50 bg-gray-900/70 backdrop-blur-sm flex items-center justify-between">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
       
        <button
          onClick={onToggleHistory}
          className="text-gray-300 hover:text-white transition cursor-pointer"
        >
          {isHistoryOpen ? (
            <ArrowLeft size={22} /> // when sidebar is open show >
          ) : (
            <ArrowRight size={22} /> // when sidebar is closed show <
          )}
        </button>

    
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
          <Sparkles size={20} className="text-white" />
        </div>

      
        <div className="flex flex-col">
          <h3 className="text-white font-semibold text-lg leading-tight capitalize">
            {title}
          </h3>
          <span className="text-sm text-gray-400">{messages} messages</span>
        </div>
      </div>

      
      <button
        onClick={() => {
          if (onSelectConversation) onSelectConversation(null);
          if (setTotalMsg) setTotalMsg(0);
          if(setMessages) setMessages([]);
        }}
        className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold px-5 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-cyan-500/25"
      >
        <Plus size={18} />
        New Chat
      </button>
    </div>
  );
};

export default ChatNavBar;
