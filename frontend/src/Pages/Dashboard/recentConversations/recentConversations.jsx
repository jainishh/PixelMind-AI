import React from "react";

const RecentConversations = ({ allConversations = [] }) => {
  const ConversationItem = ({ title, date, messages }) => (
    <div className=" group bg-gray-800/60 p-4 rounded-xl border border-white/5 hover:bg-gray-700/30 hover:border-cyan-500/30 transition-all duration-300">
      <p className="text-lg font-medium text-gray-100 truncate transition-all duration-300 group-hover:text-cyan-300 ">
        {title || "Untitled Chat"}
      </p>

      <div className="text-gray-400 text-xs mt-1 flex justify-between ">
        <span className="transition-all duration-300 text-gray-400 group-hover:text-cyan-300 ">
          {date}
        </span>

        <span className="bg-slate-800 text-gray-300 px-2 py-0.5 rounded-full text-[11px] transition-all duration-300 group-hover:text-cyan-300">
          {messages} messages
        </span>
      </div>
    </div>
  );

  return (
    <div
      className="
        card p-0 rounded-xl bg-gray-800/60 border border-white/5
        flex flex-col 
        max-h-[450px] md:max-h-[500px]
        overflow-y-auto customscrollbar shadow-lg shadow-cyan-500/10
      "
    >
     
      <h2
        className="sticky top-0 z-10 bg-gray-800 pt-4 pb-3 px-6
        text-xl font-semibold text-white border-b border-slate-800"
      >
        Recent Conversations
      </h2>

      {/* Conversation List */}
      <div className="flex flex-col gap-4 p-6 pt-4">
        {allConversations.length === 0 ? (
          <p className="text-gray-400 text-sm text-center">
            No conversations yet
          </p>
        ) : (
          allConversations.map((conv) => (
            <ConversationItem
              key={conv._id}
              title={conv.title}
              date={new Date(
                conv.lastMessageAt || conv.createdAt
              ).toLocaleString([], {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
              messages={conv.messageCount || 0}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RecentConversations;
