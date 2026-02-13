import React from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    navigate("/login");
  };
  return (
    <div className="w-full p-4 mt-auto">
      <div className="flex items-center justify-between p-3 rounded-2xl bg-[#151a2d]/80 backdrop-blur-md border border-gray-700/50 hover:border-gray-600 shadow-xl transition-all duration-300 group cursor-pointer hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-0.5">
        <div className="flex items-center space-x-3 min-w-0">
          {/* 1. Avatar */}
          <div className="flex-shrink-0 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-violet-600 rounded-full blur opacity-40 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-white text-sm font-bold shadow-inner border border-white/10">
              {name.charAt(0).toUpperCase()}
            </div>
            <div className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 border-2 border-[#151a2d] rounded-full"></div>
          </div>

          {/* 2. User Information */}
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-gray-200 truncate group-hover:text-white transition-colors tracking-wide">
              {name}
            </span>
            <span className="text-[10px] text-gray-400 truncate group-hover:text-gray-300 transition-colors font-medium">
              {email}
            </span>
          </div>
        </div>

        {/* 3. Action Icon */}
        <div
          onClick={handleLogout}
          className="bg-gray-800/50 p-1.5 rounded-lg group-hover:bg-gray-800 group-hover:text-white transition-colors text-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Account;
