import React, { useState } from "react";
import StatsOverview from "../components/admin/StatsOverview";
import UserManagement from "../components/admin/UserManagement";
import ContentManagement from "../components/admin/ContentManagement";
import SystemSettings from "../components/admin/SystemSettings";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("stats");
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();

  const menuItems = [
    { id: "stats", label: "Stats Overview", icon: <LayoutDashboard className="size-5" /> },
    { id: "users", label: "User Management", icon: <Users className="size-5" /> },
    { id: "content", label: "Content Moderation", icon: <MessageSquare className="size-5" /> },
    { id: "settings", label: "System Settings", icon: <Settings className="size-5" /> },
  ];

  return (
    <div className="flex h-[calc(100vh-2rem)] w-full max-w-7xl bg-slate-950/40 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative z-10">
      {/* SIDEBAR */}
      <div className="w-64 border-r border-slate-800 flex flex-col bg-slate-950/60 p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="size-10 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <ShieldCheck className="size-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white text-lg leading-tight">Admin</h1>
            <p className="text-slate-500 text-[10px] font-medium tracking-widest uppercase">Console v1.0</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.id 
                  ? "bg-slate-800 text-white shadow-lg" 
                  : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              {activeTab === item.id && <ChevronRight className="size-4 text-cyan-500" />}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-4 pt-6 border-t border-slate-800/50">
          <div className="flex items-center gap-3 px-2">
            <div className="size-8 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                {authUser?.profilePic ? (
                    <img src={authUser.profilePic} alt="admin" className="size-full object-cover" />
                ) : (
                    <div className="size-full flex items-center justify-center text-xs">{authUser?.fullName?.[0]}</div>
                )}
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-xs font-semibold text-white truncate">{authUser?.fullName}</p>
               <p className="text-[10px] text-cyan-500 font-medium">Administrator</p>
            </div>
          </div>
          
          <button 
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <LogOut className="size-5 rotate-180" />
            <span>Back to App</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-950/20">
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-950/40">
           <h2 className="text-xl font-bold text-white">
             {menuItems.find(m => m.id === activeTab)?.label}
           </h2>
           <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                    <div key={i} className="size-7 rounded-full bg-slate-800 border-2 border-slate-900" />
                 ))}
                 <div className="size-7 rounded-full bg-slate-900 border-2 border-slate-900 flex items-center justify-center text-[10px] text-slate-500">+12</div>
              </div>
           </div>
        </header>

        <main className="flex-1 overflow-y-auto custom-scrollbar">
          {activeTab === "stats" && <StatsOverview />}
          {activeTab === "users" && <UserManagement />}
          {activeTab === "content" && <ContentManagement />}
          {activeTab === "settings" && <SystemSettings />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
