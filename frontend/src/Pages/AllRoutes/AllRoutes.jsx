// import React from "react";
// import SideBar from "../../components/sideBar/sideBar";
// import Dashboard from "../Dashboard/Dashboard";
// import Chats from "../Chats/Chats";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// const Root = () => {
//   return (
//     <div className="flex h-screen w-full overflow-hidden bg-[#0D1424]">
//       {/* Sidebar - Fixed Width */}
//       <div className="w-64 flex-shrink-0 h-full">
//         <SideBar />
//       </div>

//       {/* Main Content - Takes remaining space */}
//       <div className="flex-1 h-full overflow-y-auto relative customscrollbar">
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/chats" element={<Chats />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default Root;

import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Chats from "../Chats/Chats";
import Login from "../LoginAndSignup/Login";
import Signup from "../LoginAndSignup/Signup";
import LoginSignupRoot from "../LoginAndSignup/LoginSignupRoot";
import Root from "../Root/Root";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginSignupRoot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/root" element={<Root />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="chats" element={<Chats />} />
        </Route>
      </Routes>
    </>
  );
};

export default AllRoutes;
