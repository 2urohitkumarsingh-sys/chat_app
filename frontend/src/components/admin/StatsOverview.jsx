import React, { useEffect } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { Users, MessageSquare, UserPlus, Zap, History, User, Activity } from "lucide-react";

const StatsOverview = () => {
  const { stats, getStats, logs, getLogs, isLoading } = useAdminStore();

  useEffect(() => {
    getStats();
    getLogs();
  }, [getStats, getLogs]);

  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: <Users className="size-6 text-blue-500" />,
      description: "Registered heartbeat users",
    },
    {
      title: "Total Messages",
      value: stats?.totalMessages || 0,
      icon: <MessageSquare className="size-6 text-green-500" />,
      description: "Total conversations held",
    },
    {
      title: "New Users (24h)",
      value: stats?.newUsersLast24h || 0,
      icon: <UserPlus className="size-6 text-purple-500" />,
      description: "Recent signups",
    },
    {
      title: "Messages (24h)",
      value: stats?.messagesLast24h || 0,
      icon: <Zap className="size-6 text-yellow-500" />,
      description: "Activity in last 24h",
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm transition-all hover:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-slate-800 rounded-xl">{card.icon}</div>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">{card.title}</h3>
            <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            <p className="text-slate-500 text-xs mt-2">{card.description}</p>
          </div>
        ))}
      </div>

      {/* RECENT ACTIVITY FEED */}
      <div className="bg-slate-950/50 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="px-8 py-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-lg">
              <History className="size-5 text-cyan-500" />
            </div>
            <h3 className="font-bold text-white text-lg">Recent System Activity</h3>
          </div>
          <span className="text-xs text-slate-500 font-medium bg-slate-800 px-3 py-1 rounded-full uppercase tracking-wider">Live Logs</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800/50">
                <th className="px-8 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                <th className="px-8 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
                <th className="px-8 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Details</th>
                <th className="px-8 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {logs.length === 0 ? (
                 <tr>
                    <td colSpan="4" className="px-8 py-20 text-center text-slate-500">
                        <div className="flex flex-col items-center gap-3">
                           <Activity className="size-8 text-slate-700" />
                           <p>No system activity recorded yet.</p>
                        </div>
                    </td>
                 </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-900/30 transition-colors">
                    <td className="px-8 py-4">
                      {log.userId ? (
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                            {log.userId.profilePic ? (
                              <img src={log.userId.profilePic} alt="" className="size-full object-cover" />
                            ) : (
                              <User className="size-3 text-slate-500 m-auto mt-1" />
                            )}
                          </div>
                          <span className="text-sm text-slate-300 font-medium">{log.userId.fullName}</span>
                        </div>
                      ) : (
                        <span className="text-xs italic text-slate-500">System</span>
                      )}
                    </td>
                    <td className="px-8 py-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        log.action.startsWith("ADMIN") || log.action.endsWith("UPDATED") || log.action.endsWith("RESET") || log.action.endsWith("DELETED")
                          ? "bg-cyan-500/10 text-cyan-500 border-cyan-500/20" 
                          : "bg-slate-800 text-slate-400 border-slate-700"
                      }`}>
                        {log.action.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <p className="text-xs text-slate-400 max-w-md truncate">{log.details}</p>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(log.createdAt).toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
