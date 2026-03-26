import React, { useEffect } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { Trash2, MessageCircle, User, Clock, AlertTriangle } from "lucide-react";

const ContentManagement = () => {
  const { messages, getAllMessages, deleteMessage, isLoading } = useAdminStore();

  useEffect(() => {
    getAllMessages();
  }, [getAllMessages]);

  const handleDeleteMessage = (messageId) => {
    if (window.confirm("Are you sure you want to delete this message? This action cannot be undone.")) {
      deleteMessage(messageId);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Content Moderation</h2>
          <p className="text-slate-400 text-sm">Review activity across the platform and moderate content</p>
        </div>
      </div>

      <div className="bg-slate-950/50 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/30 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Sender</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Message</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {messages.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-20 text-center text-slate-500">
                    <div className="flex flex-col items-center gap-2">
                       <AlertTriangle className="size-10 text-slate-700 mb-2" />
                       <p className="text-lg font-medium">No messages found</p>
                       <p className="text-sm">Activity logs are currently empty</p>
                    </div>
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg._id} className="hover:bg-slate-900/40 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                          {msg.senderId?.profilePic ? (
                            <img src={msg.senderId.profilePic} alt={msg.senderId.fullName} className="size-full rounded-full object-cover" />
                          ) : (
                            <User className="size-4 text-slate-500" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-slate-200">{msg.senderId?.fullName || "Unknown"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-md">
                        <p className="text-sm text-slate-300 break-words">{msg.text || "[Image/File]"}</p>
                        {msg.image && (
                          <div className="mt-2 relative group-msg-img">
                              <img src={msg.image} alt="content attachment" className="h-12 w-12 rounded-lg object-cover border border-slate-700 opacity-60 hover:opacity-100 transition-opacity cursor-zoom-in" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                         <Clock className="size-3" />
                         <span>{new Date(msg.createdAt).toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteMessage(msg._id)}
                        className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete Message"
                      >
                        <Trash2 className="size-4" />
                      </button>
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

export default ContentManagement;
