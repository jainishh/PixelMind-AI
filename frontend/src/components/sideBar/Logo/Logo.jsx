import React from "react";
import { Sparkles } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center p-4 w-full">
      <div className="flex items-center gap-3">
        {/* Logo Icon */}
        <div className="p-2 rounded-xl bg-violet-600/20 border border-violet-500/30 relative flex-shrink-0">
          <Sparkles className="w-6 h-6 text-violet-400" />

          {/* Status Dot */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-slate-900"></div>
        </div>

        {/* Text */}
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-tight text-white">
            PixelMind AI
          </span>
          <span className="text-xs text-slate-400 font-medium">
            Powered by advanced AI
          </span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
