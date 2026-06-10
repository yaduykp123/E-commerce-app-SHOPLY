import { Outlet, NavLink } from "react-router-dom";
import { useStore } from "../../CONTEXT/StoreContext";

const AdminLayout = () => {
  const { logout, user } = useStore();

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 font-sans flex">
      
      {/* SIDEBAR */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out">
        
        {/* LOGO & ADMIN INFO */}
        <div className="p-6 bg-slate-950/50 border-b border-slate-800 flex items-center justify-center">
          <h2 className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center gap-3">
            <i className="fas fa-crown text-blue-400"></i> ADMIN
          </h2>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30"
                  : "hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <i className="fas fa-chart-pie w-5 text-center"></i> 
            <span className="font-medium tracking-wide">Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/30"
                  : "hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <i className="fas fa-box-open w-5 text-center"></i> 
            <span className="font-medium tracking-wide">Products</span>
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                  : "hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <i className="fas fa-users w-5 text-center"></i> 
            <span className="font-medium tracking-wide">Users</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30"
                  : "hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <i className="fas fa-shipping-fast w-5 text-center"></i> 
            <span className="font-medium tracking-wide">Orders</span>
          </NavLink>

          <NavLink
            to="/admin/profile"
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30"
                  : "hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <i className="fas fa-user-cog w-5 text-center"></i> 
            <span className="font-medium tracking-wide">Profile Settings</span>
          </NavLink>
        </nav>

        {/* LOGOUT BUTTON */}
        <div className="p-4 bg-slate-950/50 border-t border-slate-800">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-3 bg-slate-800 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 border border-transparent text-slate-300 px-5 py-3 rounded-xl transition-all duration-300 font-medium"
          >
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        
        {/* GLASSMORPHIC HEADER */}
        <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-slate-200 shadow-sm px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-blue-600 shadow-inner">
               <i className="fas fa-shield-alt text-xl"></i>
             </div>
             <div>
               <h1 className="text-sm font-bold text-slate-800 leading-tight">Admin Portal</h1>
               <p className="text-xs text-slate-500 font-medium">System Management</p>
             </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-800">{user?.name || "Administrator"}</p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white overflow-hidden">
              {user?.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                user?.name?.charAt(0).toUpperCase() || "A"
              )}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="p-8 flex-1">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;
