// import React from "react";

// const Navigate = () => {
//   return (
//     <div className="bg-gray-800 bg-opacity-90 h-dvh w-100">
//       <button>Dhasboard</button>
//       <button>chat</button>
//     </div>
//   );
// };

// export default Navigate;

//2
import React from "react";
import { Gauge, MessageSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigate = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: Gauge, link: "/root/dashboard" },
    { name: "Chat", icon: MessageSquare, link: "/root/chats" },
  ];
  const statusItems = [
    {
      label: "AI Status",
      value: "Online",
      color: "text-emerald-400",
      dotClass: "bg-emerald-500",
    },
    {
      label: "Response Time",
      value: "~1.2s",
      color: "text-blue-400",
      dotClass: "bg-blue-500",
    },
    {
      label: "Model Version",
      value: "v2.1",
      color: "text-purple-400",
      dotClass: "bg-purple-500",
    },
  ];

  return (
    <>
      <nav className="p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.link;
          return (
            <Link
              key={item.name}
              to={item.link}
              className={`flex items-center w-full p-2 rounded-xl transition-all duration-300 group border relative overflow-hidden ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/50 shadow-[0_10px_20px_-5px_rgba(6,182,212,0.5)]"
                  : "border-transparent text-slate-400 hover:bg-white hover:text-slate-800 hover:shadow-[0_8px_20px_-5px_rgba(6,182,212,0.4)] hover:-translate-y-1 hover:border-cyan-500/20 mt-3"
              }`}
            >
              <item.icon
                className={`w-5 h-5 mr-3 z-10 transition-colors ${
                  isActive
                    ? "text-cyan-400"
                    : "text-slate-400 group-hover:text-cyan-600"
                }`}
              />
              <span
                className={`text-sm font-medium z-10 ${
                  isActive ? "text-cyan-50" : ""
                }`}
              >
                {item.name}
              </span>

              {/* Optional: subtle shine/gradient overlay for active state */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 pointer-events-none" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* System Status Section */}
      <div className="px-4 mt-8">
        <div className="bg-[#151a2d]/50 p-6 rounded-2xl border border-gray-700/50 relative overflow-hidden">
          {/* Decorative blurred glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-12 -mt-12 pointer-events-none"></div>

          <h5 className="text-xs font-bold text-blue-200/80 uppercase tracking-widest mb-6 relative z-10">
            System Status
          </h5>

          <div className="space-y-5 relative z-10">
            {statusItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center">
                  <div className="relative flex items-center justify-center w-3 h-3 mr-3">
                    <div
                      className={`absolute w-full h-full rounded-full ${item.dotClass} opacity-75 animate-pulse`}
                    ></div>
                    <div
                      className={`relative w-2 h-2 rounded-full ${item.dotClass}`}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                    {item.label}
                  </span>
                </div>

                <span
                  className={`text-xs font-bold ${item.color} font-mono bg-white/5 px-2 py-0.5 rounded text-[10px]`}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigate;
