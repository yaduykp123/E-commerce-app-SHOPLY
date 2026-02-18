import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../../public/StoreContext";

const Header = React.memo(() => {
  const navigate = useNavigate();
  const { cart, wishlist,  isLoggedIn, logout } = useStore();
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
                  src="/PHOTOS/LOgo.png"
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
                    
                  <div  className="flex items-center gap-3 px-4 py-2 rounded-full bg-gray-100 shadow-inner">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center transition transform hover:scale-115">
                   <Link to={'/profile'}><i className="fa-regular fa-user"></i></Link>
                    </div>

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
    </>
  );
});

export default Header;
