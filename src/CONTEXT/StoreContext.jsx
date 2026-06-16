import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const StoreContext = createContext();
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const StoreProvider = ({ children }) => {
  // ================= AUTH =================
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("USER")));

  const getToken = () => {
    return null; // Token is now in cookies
  };

  // ================= UI =================
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);

  // ================= DATA =================
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [single, setSingle] = useState([]);
  const [shippingAddress, setShippingAddress] = useState(user?.address || null);

  // ================= LOGOUT =================
  const logout = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`, { userId });
    } catch (err) {
      console.log("Logout error:", err);
    }
    localStorage.clear();
    setUserId(null);
    setIsLoggedIn(false);
    setUser(null);
    setCart([]);
    setWishlist([]);
    setOrders([]);
    setSingle([]);
    setShippingAddress(null);
  };

  // ================= AXIOS INTERCEPTOR =================
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/api/auth/refresh')) {
          originalRequest._retry = true;

          try {
            await axios.post(`${API_URL}/api/auth/refresh`);
            return axios(originalRequest);
          } catch (refreshError) {
            console.log("Refresh token expired or invalid");
            logout();
            toast.error("Session expired. Please login again.");
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, [userId]);

  // ================= LOGIN =================
  const login = (id, user) => {
    localStorage.setItem("userId", id);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("USER", JSON.stringify(user));

    setUserId(id);
    setIsLoggedIn(true);
    setUser(user);
  };

  // ================= LOAD USER DATA =================
  const loadUserData = async () => {
    if (!userId || !isLoggedIn) return;

    try {
      const res = await axios.get(`${API_URL}/api/user/profile`);

      setCart(res.data.cart || []);
      setWishlist(res.data.wishlist || []);
      setOrders(res.data.orders || []);
      setShippingAddress(res.data.address || null);
      setUser(res.data);
      localStorage.setItem("USER", JSON.stringify(res.data));
    } catch (err) {
      console.log("Load user error:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadUserData();
    }
  }, [isLoggedIn]);

  // ================= CROSS-TAB SYNCHRONIZATION =================
  useEffect(() => {
    const handleStorageChange = (e) => {
      // e.key is null when localStorage.clear() is called
      if (e.key === "isLoggedIn" || e.key === "userId" || e.key === "USER" || e.key === null) {
        const newIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        const newUserId = localStorage.getItem("userId");
        const newUserRaw = localStorage.getItem("USER");
        
        setIsLoggedIn(newIsLoggedIn);
        setUserId(newUserId);
        
        if (newUserRaw) {
          try {
            setUser(JSON.parse(newUserRaw));
          } catch (err) {
            console.error("Failed to parse USER from storage", err);
          }
        } else {
          setUser(null);
        }

        // If the other tab logged out, clear local session data immediately
        if (!newIsLoggedIn) {
          setCart([]);
          setWishlist([]);
          setOrders([]);
          setSingle([]);
          setShippingAddress(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ================= CART =================
  const addToCart = async (product) => {
    if (!isLoggedIn) return toast.error("Please login first");

    try {
      const res = await axios.post(
        `${API_URL}/api/users/cart/add`,
        { product }
      );

      setCart(res.data);
      toast.success("Added to cart");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Add to cart failed");
    }
  };

  const increaseQuantity = async (id) => {
    try {
      const res = await axios.patch(
        `${API_URL}/api/users/cart/increase/${id}`,
        {}
      );

      setCart(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Increase failed");
    }
  };

  const decreaseQuantity = async (id) => {
    try {
      const res = await axios.patch(
        `${API_URL}/api/users/cart/decrease/${id}`,
        {}
      );

      setCart(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Decrease failed");
    }
  };

  const removeFromCart = async (id) => {
    try {
      const res = await axios.delete(
        `${API_URL}/api/users/cart/remove/${id}`
      );

      setCart(res.data);
      toast.error("Removed from cart");
    } catch (err) {
      console.log(err);
      toast.error("Remove failed");
    }
  };

  // ================= WISHLIST =================
  const addToWishlist = async (product) => {
    if (!isLoggedIn) return toast.error("Please login first");

    try {
      const res = await axios.post(
        `${API_URL}/api/users/wishlist/add`,
        { product }
      );

      setWishlist(res.data);
      toast.success("Added to wishlist");
    } catch (err) {
      console.log(err);
      toast.error("Wishlist add failed");
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      const res = await axios.delete(
        `${API_URL}/api/users/wishlist/remove/${id}`
      );

      setWishlist(res.data);
      toast.error("Removed from wishlist");
    } catch (err) {
      console.log(err);
      toast.error("Wishlist remove failed");
    }
  };



  // ================= ADDRESS =================
  const saveAddressToDB = async (address) => {
    try {
      const res = await axios.patch(`${API_URL}/api/user/update-profile`, { address });
      setShippingAddress(res.data.address);
      // console.log("setShippingAddress: ",shippingAddress) 
      setUser(res.data);
        // console.log("setUser:",user)
     
      localStorage.setItem("USER", JSON.stringify(res.data));
    } catch (err) {
      console.log("Save address error:", err);
      toast.error("Failed to save address");
    }
  };

  // ================= ORDER =================
  const placeOrder = async () => {
    try {
      const isSingle = single.length > 0;
      const orderData = isSingle ? { items: single, total: singleTotal } : {};
      
      const res = await axios.post(
        `${API_URL}/api/users/order`,
        orderData
      );

      setOrders(res.data.orders);
      if (isSingle) {
        setSingle([]);
      } else {
        setCart([]);
      }
      toast.success("Order placed!");
    } catch (err) {
      console.log(err);
      toast.error("Order failed");
    }
  };

  const cancelOrder = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/api/users/order/${id}`);
      setOrders(res.data.orders);
      toast.success("Order cancelled");
    } catch (err) {
      console.log(err);
      toast.error("Cancel failed");
    }
  };

    // ================= BUY NOW =================
  const singleproduct = (product) => {
    setSingle([product]);
  };  

  // ================= CALCULATIONS =================
  const subtotal = cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  const delivery = subtotal > 100000 || subtotal === 0 ? 0 : 50;
  const total = subtotal + delivery;

  const singleSubTotal = single.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  const singleDelivery = singleSubTotal > 100000 || singleSubTotal === 0 ? 0 : 50;
  const singleTotal = singleSubTotal + singleDelivery;

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        orders,
        single,
        shippingAddress,

        subtotal,
        delivery,
        total,

        singleSubTotal,
        singleDelivery,
        singleTotal,

        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,

        addToWishlist,
        removeFromWishlist,

        placeOrder,
        singleproduct,
        saveAddressToDB,
        cancelOrder,

        login,
        logout,

        userId,
        isLoggedIn,

        open,
        setOpen,
        opens,
        setOpens,

        user,
        setUser,
        loadUserData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};





export const useStore = () => useContext(StoreContext);
