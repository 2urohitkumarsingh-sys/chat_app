import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Megaphone, X } from "lucide-react";

const GlobalBanner = () => {
  const { publicSettings } = useAuthStore();
  const announcement = publicSettings?.site_announcement;

  if (!announcement || announcement.trim() === "") return null;

  return (
    <div className="bg-gradient-to-r from-cyan-600 to-blue-700 py-2.5 px-4 relative overflow-hidden group">
      {/* Decorative pulse effect */}
      <div className="absolute inset-0 bg-white/5 animate-pulse" />
      
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 relative z-10">
        <div className="p-1 bg-white/20 rounded-lg">
          <Megaphone className="size-4 text-white" />
        </div>
        
        <p className="text-sm font-bold text-white tracking-wide">
          <span className="hidden sm:inline opacity-80 mr-2 uppercase text-[10px]">Announcement:</span>
          {announcement}
        </p>
      </div>

      {/* Optional: Dismiss button (UI only for now) */}
      <button className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white/50 hover:text-white transition-colors opacity-0 group-hover:opacity-100 hidden sm:block">
        <X className="size-4" />
      </button>
    </div>
  );
};

export default GlobalBanner;
