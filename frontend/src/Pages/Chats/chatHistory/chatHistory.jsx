import React, { useEffect, useState, useRef } from "react";
import { Sparkles, Search, Plus, X, EllipsisVertical } from "lucide-react";
import { useDialog } from "../../../utils/CustomDialog";

const ChatHistory = ({
  onClose,
  onSelectConversation,
  conversations = [],
  activeId,
  setTotalMsg,
  setMessages,

  setActiveId,
  onRefresh,
}) => {
  const API_URL = import.meta.env.VITE_APP_API_URL;
  const [loading] = useState(false);
  const [isChatOptionOn, setIsChatOptionOn] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const [selectedChat, setSelectedChat] = useState(null);
  const containerRef = useRef(null);
  const dialog = useDialog();

  const handleSelect = (chat) => {
    if (onSelectConversation) {
      console.log(chat._id);
      onSelectConversation(chat._id);
    }

    if (window.innerWidth < 768 && onClose) {
      onClose();
    }
  };

  const handleRename = async () => {
    if (!selectedChat) return;

    const newName = await dialog.prompt(`Enter new name for chat "${selectedChat.title}"`, selectedChat.title, "Rename Chat");
    if (!newName || newName === selectedChat.title) return;

    try {
      const res = await fetch(`${API_URL}/api/v1/conversations/rename/${selectedChat._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title: newName }),
      });
      if (res.ok) {
        if (onRefresh) onRefresh();
        setIsChatOptionOn(false);
      }
    } catch (err) {
      console.error("Rename failed", err);
    }
  };

  const handleDelete = async () => {
    if (!selectedChat) return;

    const confirmed = await dialog.confirm("Are you sure you want to delete this chat?\nThis action cannot be undone.", "Delete Conversation");
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_URL}/api/v1/conversations/delete/${selectedChat._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        if (activeId === selectedChat._id) {
          if (onSelectConversation) onSelectConversation(null);
        }
        if (onRefresh) onRefresh();
        setIsChatOptionOn(false);

        if (onSelectConversation) onSelectConversation(null);
        if (setTotalMsg) setTotalMsg(0);
        if (setMessages) setMessages([]);
        if (setActiveId) setActiveId(null);
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleChatOption = (e, chat) => {
    e.stopPropagation();
    const buttonRect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    setMenuPos({
      top: buttonRect.top - containerRect.top + 20,
      left: buttonRect.left - containerRect.left - 120,
    });
    setSelectedChat(chat);
    setIsChatOptionOn(true);
  };

  return (
    <div
      ref={containerRef}
      className="w-72 md:w-80 h-full bg-gray-900/70 backdrop-blur-sm border-r border-gray-800 flex flex-col p-4 relative"
    >
      <button
        onClick={onClose}
        className="md:hidden absolute top-4 right-4 p-2 rounded-lg bg-slate-800/80 text-gray-300 hover:text-white hover:bg-slate-700 transition shadow"
      >
        <X size={20} />
      </button>

      <div className="flex items-center gap-2 mb-6 mt-2">
        <div className="p-1.5 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg shadow-lg shadow-cyan-500/25">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-white font-semibold text-md">Chat History</h2>
      </div>

      <button
        className="w-full bg-gradient-to-br from-cyan-500 to-purple-600 text-white rounded-lg p-3 flex items-center justify-center gap-2 mb-4 hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/25"
        onClick={() => {
          if (onSelectConversation) onSelectConversation(null);
          if (setTotalMsg) setTotalMsg(0);
          if (setMessages) setMessages([]);
          if (setActiveId) setActiveId(null);
        }}
      >
        <Plus className="w-4 h-4" />
        <span className="text-sm font-medium">New Conversation</span>
      </button>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-gray-800/40 border border-gray-800 text-gray-300 text-sm focus:outline-none focus:border-white/50"
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 customscrollbar pr-1">
        {loading && (
          <p className="text-gray-500 text-sm text-center mt-4">
            Loading chats...
          </p>
        )}

        {!loading && conversations.length === 0 && (
          <p className="text-gray-500 text-sm text-center mt-4">
            No conversations yet
          </p>
        )}

        {conversations.map((chat) => (
          <div
            key={chat._id}
            onClick={() => handleSelect(chat)}
            className={`rounded-xl p-4 cursor-pointer transition-all border flex justify-between items-center ${activeId === chat._id
              ? "bg-gradient-to-br from-blue-50 to-purple-50 border-transparent shadow"
              : "bg-gray-800/40 border-gray-600/30 hover:bg-gray-700/60 hover:border-gray-500/50 "
              }`}
          >
            <div>
              <h3
                className={`text-sm font-semibold truncate ${activeId === chat._id ? "text-slate-800" : "text-gray-200"
                  }`}
              >
                {chat.title || "New Chat"}
              </h3>

              <p
                className={`text-[10px] mt-1 ${activeId === chat._id ? "text-slate-500" : "text-gray-500"
                  }`}
              >
                {chat.lastMessageAt
                  ? new Date(chat.lastMessageAt).toLocaleString()
                  : ""}
              </p>
            </div>
            <EllipsisVertical className={`w-4 h-4 ${activeId === chat._id ? "text-slate-800" : "text-gray-200"}`} onClick={(e) => handleChatOption(e, chat)} />
          </div>
        ))}
      </div>

      {isChatOptionOn && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsChatOptionOn(false)}
          ></div>
          <div
            className="absolute z-20 w-32 bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            style={{ top: menuPos.top, left: menuPos.left }}
          >
            <div className="flex flex-col py-1">
              <button
                onClick={handleRename}
                className="text-left px-4 py-2 text-xs text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                Rename
              </button>
              <button
                onClick={handleDelete}
                className="text-left px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatHistory;
