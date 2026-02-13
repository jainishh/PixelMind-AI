import React, { useState, useEffect } from "react";
import ChatNavBar from "./chatNavBar/chatNavBar";
import ChatBody from "./chatBody/chatBody";
import ChatInput from "./chatInput/chatInput";
import ChatHistory from "./chatHistory/chatHistory";
import PhoneTop from "../../components/Phone/PhoneTop";
import { useOutletContext } from "react-router-dom";

const Chats = () => {
  const API_URL = import.meta.env.VITE_APP_API_URL;
  const { openSidebar } = useOutletContext();

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [totalmsg, setTotalMsg] = useState(0);

  const [historyReloadKey, setHistoryReloadKey] = useState(0);

  const token = localStorage.getItem("token");

  const toggleHistory = () => {
    setIsHistoryOpen((prev) => !prev);
  };

  const loadMessages = async (conversationId) => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/api/v1/messages/getMessage/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (data.success) {
        setTotalMsg(data.totalMessageLength);

        const formatted = data.messages.map((msg) => ({
          _id: msg._id,
          sender: msg.sender,
          text: msg.text,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        setMessages(formatted);
      }
    } catch (err) {
      console.error("Failed to load messages", err);
    }
  };

  useEffect(() => {
    loadMessages(activeId);
  }, [activeId]);

  useEffect(() => {
    const loadConversationList = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/v1/conversations/getConversation`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();
        setConversations(data || []);
      } catch (err) {
        console.error("Failed to load conversations", err);
      } finally {
        setLoading(false);
      }
    };

    loadConversationList();
  }, [token, isHistoryOpen, historyReloadKey]);

  const sendMessage = async (text) => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const tempId = Date.now().toString();
    const userMsgObj = { _id: tempId, sender: "user", text, time };

    setMessages((prev) => [...prev, userMsgObj]);
    setIsTyping(true);

    setHistoryReloadKey((prev) => prev + 1);

    const pastUserMessages = messages
      .filter((msg) => msg.sender === "user")
      .map((msg) => msg.text);

    try {
      const res = await fetch(
        `${API_URL}/api/v1/gemini/geminiInput`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: text,
            conversationId: activeId,
            pastUserMessages,
          }),
        },
      );

      const data = await res.json();

      if (data.userMessage && data.aiMessage) {
        setMessages((prev) => {
          const formatMsg = (m) => ({
            _id: m._id,
            sender: m.sender,
            text: m.text,
            time: new Date(m.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });

          return prev.map((m) => (m._id === tempId ? formatMsg(data.userMessage) : m)).concat(formatMsg(data.aiMessage));
        });
      } else {
        setMessages((prev) => [
          ...prev,
          { _id: Date.now().toString(), sender: "ai", text: data.reply || "No reply", time },
        ]);
      }

      if (data.conversationId) {
        setActiveId(data.conversationId);
      }

      setTotalMsg((prev) => prev + 2);
    } catch (err) {
      console.error("Gemini error", err);
    } finally {
      setIsTyping(false);
    }
  };

  const activeConversationTitle =
    conversations.find((c) => c._id === activeId)?.title || "New Chat";

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white relative">
      <div className="md:hidden fixed top-0 left-0 right-0 z-20">
        <PhoneTop openSidebar={openSidebar} />
      </div>

      <div
        className={`md:hidden fixed top-0 left-0 h-full z-30 transition-transform duration-300
          ${isHistoryOpen ? "translate-x-0" : "-translate-x-full"} w-72`}
      >
        <ChatHistory
          conversations={conversations}
          onClose={() => setIsHistoryOpen(false)}
          onSelectConversation={setActiveId}
          activeId={activeId}
          setTotalMsg={setTotalMsg}
          setMessages={setMessages}
          onRefresh={() => setHistoryReloadKey((prev) => prev + 1)}
        />
      </div>

      <div
        className={`hidden md:block transition-all duration-300 ${isHistoryOpen ? "w-80" : "w-0 overflow-hidden"
          }`}
      >
        <ChatHistory
          conversations={conversations}
          onClose={() => setIsHistoryOpen(false)}
          onSelectConversation={setActiveId}
          activeId={activeId}
          setTotalMsg={setTotalMsg}
          setMessages={setMessages}
          onRefresh={() => setHistoryReloadKey((prev) => prev + 1)}
        />
      </div>

      <div className="flex-1 flex flex-col pt-16 md:pt-0">
        <ChatNavBar
          onSelectConversation={setActiveId}
          isHistoryOpen={isHistoryOpen}
          onToggleHistory={toggleHistory}
          title={activeConversationTitle}
          messages={totalmsg}
          setTotalMsg={setTotalMsg}
          setMessages={setMessages}
          setActiveId={setActiveId}
        />

        <div className="flex-1 overflow-y-auto">
          <ChatBody
            messages={messages}
            typing={isTyping}
            conversationsId={activeId}
            setMessages={setMessages}
            setTotalMsg={setTotalMsg}
          />
        </div>

        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
};

export default Chats;
