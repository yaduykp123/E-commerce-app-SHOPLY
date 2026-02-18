import axios from "axios";
import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:31234/users")
      .then(res => {
        const allOrders = res.data.flatMap(user =>
          (user.orders || []).map(order => ({
            ...order,
            userEmail: user.email
          }))
        );

        setOrders(allOrders);
      });
  }, []);

  return (
   <>
  
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-800">
      Order Management
    </h2>
    <p className="text-sm text-gray-500">
      Track and manage customer orders
    </p>
  </div>

 
  <div
    className="hidden md:grid grid-cols-4 gap-4
               bg-gray-100 px-4 py-3 rounded-lg
               text-sm font-semibold text-gray-600"
  >
    <span>User</span>
    <span>Order ID</span>
    <span>Total</span>
    <span>Status</span>
  </div>

  
  <div className="space-y-3 mt-3">
    {orders.map((order) => (
      <div
        key={order.id}
        className="grid grid-cols-1 md:grid-cols-4 gap-4
                   bg-white p-4 rounded-xl shadow
                   hover:shadow-lg transition"
      >
        
        <span className="font-medium text-gray-800 break-all">
          {order.userEmail}
        </span>

     
        <span className="text-sm text-gray-500">
          #{order.id}
        </span>

       
        <span className="font-semibold text-green-600">
          ₹{order.total}
        </span>

  
        <span
          className={`inline-block w-fit px-3 py-1 text-xs font-semibold rounded-full
            ${
              
              order.status === "placed"
                ? "bg-blue-100 text-blue-700"
                : order.status === "shipped"
                ? "bg-yellow-100 text-yellow-700"
                : order.status === "delivered"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
        >
          {order.status}
        </span>
      </div>
    ))}
  </div>
</>

  );
};

export default Orders;
