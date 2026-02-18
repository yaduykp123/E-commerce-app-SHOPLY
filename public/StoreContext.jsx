import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const StoreContext = createContext();
const API_URL = "http://localhost:31234";

export const StoreProvider = ({ children }) => {

// login Logut

const [userId, setUserId] = useState(
    localStorage.getItem("userId")
  );

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"    
  );



    const login = (id, user) => {
    localStorage.setItem("userId", id);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("USER", JSON.stringify(user))
    setUserId(id);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");
    setUserId(null);
    setIsLoggedIn(false);
    setCart([]);
    setWishlist([]);
    setOrders([]);
    setSingle([]);
  };
  



  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);

// single product buy now!
  const [single, setSingle]=useState([])

 
  
  useEffect(() => {
    if (!userId ) return;

    axios
      .get(`${API_URL}/users/${userId}`)
      .then((res) => {
        setCart(res.data.cart || []);
        setWishlist(res.data.whishlist || []);
        setOrders(res.data.orders || [])
      })
      .catch((err) => console.log("Load error:", err));
  }, [userId]);

  //  Add to kart (STATE + DB)
  const addToCart = async (product) => {
    if (!isLoggedIn || !userId) {
      toast.error("Please login first");
      return;
    }

    const exists = cart.find((item) => item.id === product.id);

    let updatedCart;

    if (exists) {

      updatedCart = cart.map((item) => (
        item.id === product.id? {...item, quantity: (item.quantity || 1) + 1} 
        :  item
      ))
    }
    else {
      updatedCart = [...cart, {...product, quantity : 1}];
    }

    await axios.patch(`${API_URL}/users/${userId}`, {
      cart: updatedCart,
    });

    setCart(updatedCart);
    toast.success("added to Cart",{
      duration:900,
    })
  };

  // add Quantity to cart
  const increaseQuantity = async (id) => {
  const updatedCart = cart.map(item =>
    item.id === id
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );

  await axios.patch(`${API_URL}/users/${userId}`, {
    cart: updatedCart,
  });

  setCart(updatedCart);
};


// decrease quantity in addtoKart

const decreaseQuantity = async (id) => {
  const updatedCart = cart
    .map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter(item => item.quantity > 0); 

  await axios.patch(`${API_URL}/users/${userId}`, {
    cart: updatedCart,
  });

  setCart(updatedCart);
};





  // Remove Kart from (STATE + DB)
  const removeFromCart = async (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    await axios.patch(`${API_URL}/users/${userId}`, {
      cart: updatedCart,
    });

    setCart(updatedCart);
      toast.error("Removed From Cart")
  };

  //  Add to wishList (STATE + DB)
  const addToWishlist = async (product) => {
   if (!isLoggedIn || !userId) {
      toast.error("Please login first");
      return;
    }

  const exists = wishlist.find(item => item.id === product.id);
  if (exists) return ;

  const updatedWishlist = [...wishlist, product];

  await axios.patch(`${API_URL}/users/${userId}`, {
    whishlist: updatedWishlist,
  });

  setWishlist(updatedWishlist);
toast.success('Added to WhishList!',{
  duration :800,
})
};


// remove whishlist
 async function  removeFromWhishList(data) {
  const updatedWishlist = wishlist.filter(item => item.id !== data.id );
  
  const res = await axios.patch(`${API_URL}/users/${userId}`,{
    whishlist : updatedWishlist,
  })
  console.log("DB updated:", res.data);

  setWishlist(updatedWishlist)

toast.error('Removed from WhishList!',{
  duration :800,
})

}


// orders
const placeOrder = async () => {
  if (!userId ) return;

//single  OR  cart
  const itemsToOrder = single.length > 0 ? single : cart;

  if (itemsToOrder.length === 0) return;

  const totalAmount = itemsToOrder.reduce( (sum, item) => sum + item.price * (item.quantity || 1),0);

  const newOrder = {
    id: Date.now(),
    items: itemsToOrder,
    total: totalAmount,
    date: new Date().toISOString(),
    status: "Order placed"
  };

  const updatedOrders = [...orders, newOrder];

  await axios.patch(`${API_URL}/users/${userId}`, {
    orders: updatedOrders,
    cart: [],        // clear cart
  });

  setOrders(updatedOrders);
  setCart([]);
  setSingle([]);   
  
    toast.success("Order Placed!")
};





  // Simple calculation logic 
  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const delivery = cart.length > 0 ? 40 : 0;
  const total = subtotal + delivery;



  // single product buy now


 function singleproduct (product) {
    setSingle([product])
}

const singleSubTotal = single.reduce((sum,item) => sum + item.price * (item.quantity || 1),0);
const singleDelivery = single.length>0? 40 : 0;
const singleTotal =  singleSubTotal + singleDelivery
  


// save address for  automatic fill 
 const [shippingAddress, setShippingAddress] = useState(null);
  const [usernId, setUsernId] = useState(null);

  // 🔹 Load logged-in user ID ONCE
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("userId"));
    if (stored) {
      setUsernId(stored);
    }
  }, []);

  // 🔹 Fetch address from DB when userId exists
  useEffect(() => {
    if (!usernId) return;

    const fetchAddress = async () => {
      const res = await axios.get(
        `http://localhost:31234/users/${usernId}`
      );
      setShippingAddress(res.data.address || null);
    };

    fetchAddress();
  }, [usernId]);

  // 🔹 Save address
  const saveAddressToDB = async (addressData) => {
    if (!usernId) return;

    const res = await axios.patch(
      `http://localhost:31234/users/${usernId}`,
      { address: addressData }
    );

    setShippingAddress(res.data.address);
  };
 




// profile model state
  const [open, setOpen] = useState(false);
  const [opens , setOpens] = useState(false)

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
         addToWishlist,
        addToCart,
        increaseQuantity,
    decreaseQuantity,
        removeFromCart,
        removeFromWhishList,
        total,delivery,subtotal,
        placeOrder ,
         orders,
        single, singleTotal, singleDelivery, singleSubTotal,
         singleproduct,
         userId,
        isLoggedIn,
        login,
        logout,
        open,setOpen,opens,setOpens,
        shippingAddress,saveAddressToDB
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
