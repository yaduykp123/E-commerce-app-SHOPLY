import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../CONTEXT/StoreContext";
import LOGO from '../PHOTOS/LOgo.png'

const Header = React.memo(() => {
  const navigate = useNavigate();
  const { cart, wishlist, orders, isLoggedIn, logout, user } = useStore();
  const [open, setOpen] = useState(false);



  return (
    <>       
     <header className="w-full sticky top-0 z-50 bg-gradient-to-r from-blue-200 via-indigo-100 to-purple-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3">

          {/* MAIN BAR */}
          <div className="flex items-center justify-between rounded-full bg-white/80 backdrop-blur-md shadow-lg px-6 h-16">

            {/* LOGO */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-500/40 hover:ring-purple-500 transition">
                <img
                  src={LOGO}
                  alt="Shoply"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="hidden sm:block text-lg font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SHOPLY
              </span>
            </div>

            {/* NAV LINKS */}
           <ul className="hidden md:flex items-center gap-10 text-sm font-semibold relative">

  <NavLink
    to="/"
    end
    className={({ isActive }) =>
      `relative px-1 transition-colors duration-300
       ${isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"}
       after:content-[''] after:absolute after:left-0 after:-bottom-1
       after:h-[2px] after:w-full after:scale-x-0 after:origin-left
       after:bg-gradient-to-r after:from-blue-500 after:to-purple-500
       after:transition-transform after:duration-300
       ${isActive ? "after:scale-x-100" : "hover:after:scale-x-100"}`
    }
  >
    Home
  </NavLink>

  <NavLink
    to="/productsAll"
    className={({ isActive }) =>
      `relative px-1 transition-colors duration-300
       ${isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"}
       after:content-[''] after:absolute after:left-0 after:-bottom-1
       after:h-[2px] after:w-full after:scale-x-0 after:origin-left
       after:bg-gradient-to-r after:from-purple-500 after:to-pink-500
       after:transition-transform after:duration-300
       ${isActive ? "after:scale-x-100" : "hover:after:scale-x-100"}`
    }
  >
    Products
  </NavLink>

</ul>


            
            <div className="flex items-center gap-5">
              {/* DESKTOP ICONS */}
              <div className="hidden md:flex items-center gap-5">
                <Link
                  to="/wishlist"
                  className="relative text-lg text-gray-600 hover:text-red-500 transition transform hover:scale-110"
                >
                  <i className="fa-solid fa-heart-circle-check"></i>
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
                      {wishlist.length}
                    </span>
                  )}
                </Link>

                <Link
                  to="/cart"
                  className="relative text-lg text-gray-600 hover:text-blue-600 transition transform hover:scale-110"
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full shadow">
                      {cart.length}
                    </span>
                  )}
                </Link>

                {isLoggedIn && (
                  <Link
                    to="/orders"
                    className="relative text-lg text-gray-600 hover:text-indigo-600 transition transform hover:scale-110"
                    title="My Orders"
                  >
                    <i className="fa-solid fa-box-open"></i>
                    {orders && orders.length > 0 && (
                      <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full shadow">
                        {orders.length}
                      </span>
                    )}
                  </Link>
                )}
              </div>

              {/* AUTH */}
              <div className="hidden md:flex items-center">
                {!isLoggedIn ? (
                  <div className="flex gap-3">
                    {/* LOGIN */}
                    <button
                      onClick={() => navigate("/login")}
                      className="px-5 py-2 rounded-full text-sm font-semibold
                                 bg-blue-100 text-blue-700
                                 hover:bg-blue-600 hover:text-white
                                 active:bg-blue-700 active:text-white
                                 hover:shadow-md active:scale-95
                                 focus-visible:ring-2 focus-visible:ring-blue-400
                                 transition-all duration-200"
                    >
                      Login
                    </button>

                    {/* REGISTER */}
                    <button
                      onClick={() => navigate("/register")}
                      className="px-5 py-2 rounded-full text-sm font-semibold
                                 bg-purple-100 text-purple-700
                                 hover:bg-purple-600 hover:text-white
                                 active:bg-purple-700 active:text-white
                                 hover:shadow-md active:scale-95
                                 focus-visible:ring-2 focus-visible:ring-purple-400
                                 transition-all duration-200"
                    >
                      Register
                    </button>
                  </div>
                ) : (
                    
                  <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-gray-100 shadow-inner">
                    <Link 
                      to="/profile" 
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center transition transform hover:scale-110 overflow-hidden ring-2 ring-transparent hover:ring-purple-300"
                    >
                      {user?.profileImage ? (
                        <img src={user.profileImage} alt="User" className="w-full h-full object-cover" />
                      ) : (
                        <i className="fa-regular fa-user"></i>
                      )}
                    </Link>

                    {/* LOGOUT */}
                    <button onClick={logout}
                      className="px-4 py-2 rounded-full text-sm font-semibold
                                 bg-red-100 text-red-700
                                 hover:bg-red-600 hover:text-white
                                 active:bg-red-700 active:text-white
                                 hover:shadow-md active:scale-95
                                 focus-visible:ring-2 focus-visible:ring-red-400
                                 transition-all duration-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* MOBILE MENU */}
              <button
                className="md:hidden text-xl text-gray-700 hover:text-blue-600 transition"
                onClick={() => setOpen(true)}
              >
                <i className="fa-solid fa-bars"></i>
              </button>

            </div>
          </div>
        </div>
      </header> 

      {/* MOBILE MENU OVERLAY */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} 
        onClick={() => setOpen(false)}
      ></div>

      {/* MOBILE MENU DRAWER */}
      <div 
        className={`fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-white to-blue-50 z-50 transform transition-transform duration-300 ease-out md:hidden shadow-2xl flex flex-col ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-5 flex justify-between items-center border-b border-gray-100">
          <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Menu
          </span>
          <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-red-500 text-xl transition">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* NAV LINKS */}
          <div className="flex flex-col gap-4">
            <NavLink to="/" end onClick={() => setOpen(false)} className={({ isActive }) => `font-semibold ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}>Home</NavLink>
            <NavLink to="/productsAll" onClick={() => setOpen(false)} className={({ isActive }) => `font-semibold ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}>Products</NavLink>
          </div>

          <hr className="border-gray-200" />

          {/* ICONS */}
          <div className="flex flex-col gap-4">
            <Link to="/wishlist" onClick={() => setOpen(false)} className="flex items-center gap-3 text-gray-700 hover:text-red-500 font-medium transition">
              <div className="relative">
                <i className="fa-solid fa-heart-circle-check text-xl"></i>
                {wishlist.length > 0 && <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{wishlist.length}</span>}
              </div>
              Wishlist
            </Link>

            <Link to="/cart" onClick={() => setOpen(false)} className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium transition">
              <div className="relative">
                <i className="fa-solid fa-cart-shopping text-xl"></i>
                {cart.length > 0 && <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">{cart.length}</span>}
              </div>
              Cart
            </Link>

            {isLoggedIn && (
              <Link to="/orders" onClick={() => setOpen(false)} className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 font-medium transition">
                <div className="relative">
                  <i className="fa-solid fa-box-open text-xl"></i>
                  {orders && orders.length > 0 && <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">{orders.length}</span>}
                </div>
                My Orders
              </Link>
            )}
          </div>

          <hr className="border-gray-200" />

          {/* AUTH */}
          <div className="flex flex-col gap-3">
            {!isLoggedIn ? (
              <>
                <button onClick={() => { setOpen(false); navigate("/login"); }} className="w-full py-2.5 rounded-xl text-sm font-semibold bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white transition-all">
                  Login
                </button>
                <button onClick={() => { setOpen(false); navigate("/register"); }} className="w-full py-2.5 rounded-xl text-sm font-semibold bg-purple-100 text-purple-700 hover:bg-purple-600 hover:text-white transition-all">
                  Register
                </button>
              </>
            ) : (
              <>
                <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm border border-gray-100 hover:border-blue-300 transition">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center overflow-hidden shrink-0">
                    {user?.profileImage ? <img src={user.profileImage} alt="User" className="w-full h-full object-cover" /> : <i className="fa-regular fa-user"></i>}
                  </div>
                  <div className="flex-1 truncate">
                    <p className="font-bold text-sm text-gray-800 truncate">{user?.name || "User"}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                </Link>
                <button onClick={() => { setOpen(false); logout(); }} className="w-full py-2.5 rounded-xl text-sm font-semibold bg-red-100 text-red-700 hover:bg-red-600 hover:text-white transition-all mt-2">
                  Logout
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </>
  );
});

export default Header;
