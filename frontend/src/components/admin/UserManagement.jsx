import React, { useEffect, useState } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { Search, UserCheck, Trash2, ShieldCheck, ShieldAlert, UserPlus, Key, X, Loader2 } from "lucide-react";

const UserManagement = () => {
  const { users, getAllUsers, updateUserRole, deleteUser, createUser, resetPassword } = useAdminStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ fullName: "", email: "", password: "", role: "user" });
  const [resettingId, setResettingId] = useState(null);
  const [newPass, setNewPass] = useState("");

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    const success = await createUser(newUser);
    if (success) {
      setShowAddModal(false);
      setNewUser({ fullName: "", email: "", password: "", role: "user" });
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    await resetPassword(resettingId, newPass);
    setResettingId(null);
    setNewPass("");
  };

  const handleDeleteUser = (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete user ${userName}? This action cannot be undone.`)) {
      deleteUser(userId);
    }
  };

  const handleRoleToggle = (userId, currentRole) => {
    updateUserRole(userId, currentRole === "admin" ? "user" : "admin");
  };

  return (
    <div className="p-6 relative">
      {/* ADD USER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-8 shadow-2xl relative">
            <button onClick={() => setShowAddModal(false)} className="absolute right-6 top-6 text-slate-500 hover:text-white">
              <X className="size-5" />
            </button>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <UserPlus className="size-5 text-cyan-500" />
              Create New User
            </h3>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                  value={newUser.fullName}
                  onChange={(e) => setNewUser({...newUser, fullName: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Password</label>
                <input
                  type="password"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                />
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-cyan-900/20">
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RESET PASSWORD MODAL */}
      {resettingId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
           <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-8 shadow-2xl relative">
            <button onClick={() => setResettingId(null)} className="absolute right-6 top-6 text-slate-500 hover:text-white">
              <X className="size-5" />
            </button>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Key className="size-5 text-yellow-500" />
              Reset Password
            </h3>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">New Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 rounded-xl transition-all">
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <p className="text-slate-400 text-sm">Manage user access and roles across the platform</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="bg-slate-900/50 border border-slate-800 rounded-xl py-2 px-10 focus:outline-none focus:border-cyan-500 text-sm"
            />
            <Search className="absolute left-3 top-2.5 size-4 text-slate-500" />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-slate-100 hover:bg-white text-slate-950 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg"
          >
            <UserPlus className="size-4" />
            Add User
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-slate-950/50 border border-slate-800 rounded-2xl">
        <table className="w-full text-left">
          <thead className="border-b border-slate-800 bg-slate-900/30">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Joined At</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-slate-900/40 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full overflow-hidden bg-slate-800 flex items-center justify-center border-2 border-slate-700">
                      {user.profilePic ? (
                        <img src={user.profilePic} alt={user.fullName} className="size-full object-cover" />
                      ) : (
                        <span className="text-sm font-medium">{user.fullName[0]}</span>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{user.fullName}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {user.role === "admin" ? (
                      <ShieldCheck className="size-4 text-cyan-500" />
                    ) : (
                      <ShieldAlert className="size-4 text-slate-500" />
                    )}
                    <span className={`text-xs font-medium ${user.role === "admin" ? "text-cyan-400" : "text-slate-400"}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setResettingId(user._id)}
                      className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-yellow-500 transition-colors"
                      title="Reset Password"
                    >
                      <Key className="size-4" />
                    </button>
                    <button
                      onClick={() => handleRoleToggle(user._id, user.role)}
                      className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors"
                      title={user.role === "admin" ? "Demote to User" : "Promote to Admin"}
                    >
                      <UserCheck className="size-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id, user.fullName)}
                      className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                      title="Delete User"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
