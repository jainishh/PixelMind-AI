import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from "../../components/sideBar/sideBar";
import Dashboard from "../Dashboard/Dashboard";
import Chats from "../Chats/Chats";
import { Outlet } from "react-router-dom";

const Root = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0D1424] relative">
      {/* ⭐ Sidebar responsive */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 flex-shrink-0 transition-transform duration-300 z-50
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <SideBar close={() => setSidebarOpen(false)} />
      </div>

      {/* Dark overlay on phone when sidebar open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 h-full overflow-y-auto customscrollbar relative">
        <Outlet context={{ openSidebar: () => setSidebarOpen(true) }} />{" "}
        {/* Loads Dashboard or Chats here */}
      </div>
    </div>
  );
};

export default Root;
