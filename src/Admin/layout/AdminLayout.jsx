import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const { logoutAdmin, admin } = useAuth();

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden font-sans">

    
      <aside className="group fixed inset-y-0 left-0 z-40 flex h-screen transition-all duration-300 ease-in-out w-2 hover:w-64 bg-gray-900 border-r border-gray-800 shadow-[10px_0_15px_rgba(0,0,0,0.5)]">
        
        <div className="flex flex-col w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 overflow-hidden whitespace-nowrap">
          
          <div className="p-6 mb-4 border-b border-gray-800">
            <h2 className="text-xl font-bold tracking-widest text-blue-500">
              <i className="fas fa-user-cog mr-3"></i>{admin.name}
            </h2>
          </div>

          <nav className="flex flex-col">

            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-4 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <i className="fas fa-home w-5"></i> Dashboard
            </NavLink>

            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-4 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <i className="fas fa-tag w-5"></i> Products
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-4 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <i className="fas fa-users w-5"></i> Users
            </NavLink>

            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-4 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <i className="fas fa-shopping-cart w-5"></i> Orders
            </NavLink>

          </nav>
        </div>

        
        <div className="absolute right-0 top-0 h-full w-[2px] bg-blue-500/30 group-hover:hidden"></div>
      </aside>

 
<div className="fixed inset-y-0 right-0 z-40 pointer-events-none">
  
 
  <div className="group absolute inset-y-0 right-0 w-6 pointer-events-auto">
    
  
    <div
      className="absolute inset-y-0 right-0 w-44 bg-gray-900 border-l border-gray-800
                 shadow-[-10px_0_15px_rgba(0,0,0,0.5)]
                 translate-x-full group-hover:translate-x-0
                 transition-transform duration-300 ease-in-out
                 flex items-center justify-center"
    >
      <button
        onClick={logoutAdmin}
        className="flex items-center gap-3 bg-red-600 hover:bg-red-700
                   text-white px-5 py-3 rounded-full shadow-lg
                   transition-all duration-200 hover:scale-105"
      >
        <i className="fas fa-sign-out-alt"></i>
        Logout
      </button>
    </div>

    <div className="absolute inset-y-0 right-0 w-[2px] bg-blue-500/40"></div>
  </div>
</div>
      <main className="min-h-screen p-8 ml-2">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
