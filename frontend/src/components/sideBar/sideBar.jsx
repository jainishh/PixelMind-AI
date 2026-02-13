// import { Link } from "react-router-dom";
// import Logo from "./Logo/Logo";
// import Navigate from "./Navigate/Navigate";
// import Account from "./Account/Account";

// const SideBar = () => {
//   return (
//     <>
//       <Logo />
//       <Navigate />
//       <Account />
//     </>
//   );
// };

// export default SideBar;

import React from "react";
import Logo from "./Logo/Logo";
import Navigate from "./Navigate/Navigate";
import Account from "./Account/Account";
import { X } from "lucide-react";

const SideBar = ({ close }) => {
  return (
    <div className="w-full h-full bg-[#202837] flex flex-col border-r border-gray-800/50 relative shadow-2xl">
      {/* ⭐ Close button for phones */}
      <button
        onClick={close}
        className="absolute top-3 right-3 bg-slate-700 p-2 rounded-lg md:hidden text-white hover:bg-slate-600 transition"
      >
        <X size={15} strokeWidth={2} />
      </button>

      <div className="flex-shrink-0">
        <Logo />
      </div>

      <div className="flex-grow overflow-y-auto custom-scrollbar">
        <Navigate />
      </div>

      <div className="flex-shrink-0 border-t border-slate-800">
        <Account />
      </div>
    </div>
  );
};

export default SideBar;
