import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../CONTEXT/StoreContext";

const Users = () => {
  const [users, setUsers] = useState([]);
  const Navigate = useNavigate();
  const { user: currentUser } = useStore();
  
  const fetchUsers = async () => {
    const res = await axios.get("/admin/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleBlock = async (user) => {
    try {
      await axios.patch(`/admin/users/${user._id}/toggle-block`);
      fetchUsers();
    } catch (err) {
      console.error("Failed to toggle block status", err);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">User Management</h2>
          <p className="text-slate-500 mt-1">Manage user access, roles, and permissions</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 text-sm font-medium text-slate-600">
          <i className="fas fa-users mr-2 text-blue-500"></i> {users.length} Total Users
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-5 gap-4 bg-slate-50/80 backdrop-blur-md px-6 py-4 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <span className="col-span-2">User Details</span>
          <span>Role</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-slate-100">
          {users.map((user) => (
            <div
              key={user._id}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center px-6 py-5 hover:bg-slate-50/50 transition-colors duration-200"
            >
              <div className="col-span-2 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-inner ${
                  user.role === 'admin' ? 'bg-gradient-to-br from-purple-100 to-fuchsia-100 text-purple-600' : 'bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600'
                }`}>
                  {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p 
                    onClick={() => Navigate(`/admin/users/${user._id}`)} 
                    className="font-bold text-slate-800 hover:text-blue-600 cursor-pointer transition-colors"
                  >
                    {user.name || user.email.split('@')[0]}
                  </p>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{user.email}</p>
                </div>
              </div>

              <div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full ${
                  user.role === "admin"
                    ? "bg-purple-100 text-purple-700 ring-1 ring-purple-200"
                    : "bg-blue-100 text-blue-700 ring-1 ring-blue-200"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${user.role === "admin" ? "bg-purple-500" : "bg-blue-500"}`}></span>
                  <span className="capitalize">{user.role}</span>
                </span>
              </div>

              <div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full ${
                  user.isBlock
                    ? "bg-red-50 text-red-600 ring-1 ring-red-200"
                    : "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${user.isBlock ? "bg-red-500" : "bg-emerald-500"}`}></span>
                  {user.isBlock ? "Blocked" : "Active"}
                </span>
              </div>

              <div className="flex justify-end">
                {currentUser?.email !== user.email && (
                  <button
                    onClick={() => toggleBlock(user)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all duration-200 ${
                      user.isBlock
                        ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200"
                        : "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                    }`}
                  >
                    <i className={`fas ${user.isBlock ? "fa-unlock" : "fa-lock"}`}></i>
                    {user.isBlock ? "Unblock" : "Block"}
                  </button>
                )}
                {currentUser?.email === user.email && (
                  <span className="text-xs font-bold text-slate-400 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                    You
                  </span>
                )}
              </div>
            </div>
          ))}
          
          {users.length === 0 && (
            <div className="px-6 py-12 text-center text-slate-500">
              <i className="fas fa-inbox text-4xl mb-3 text-slate-300"></i>
              <p>No users found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
