import axios from "axios";
import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/admin/orders")
      .then(res => {
        setOrders(res.data);
      });
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Order Management</h2>
          <p className="text-slate-500 mt-1">Track and manage customer orders</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 text-sm font-medium text-slate-600">
          <i className="fas fa-shopping-bag mr-2 text-blue-500"></i> {orders.length} Total Orders
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-4 gap-4 bg-slate-50/80 backdrop-blur-md px-6 py-4 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <span>Customer</span>
          <span>Order Details</span>
          <span>Amount</span>
          <span>Status</span>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-slate-100">
          {orders.map((order) => (
            <div
              key={order._id || order.id}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center px-6 py-5 hover:bg-slate-50/50 transition-colors duration-200"
            >
              
              {/* Customer */}
              <div className="flex items-center gap-4 break-all">
                <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 font-bold shadow-inner">
                  {order.userEmail?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{order.userEmail}</p>
                </div>
              </div>

              {/* Order ID & Details */}
              <div>
                <p className="text-sm font-bold text-slate-700">#{String(order._id || order.id || '').slice(-8)}</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {new Date(order.date).toLocaleDateString('en-US', { 
                    month: 'short', day: 'numeric', year: 'numeric' 
                  })}
                </p>
              </div>

              {/* Total */}
              <div>
                <span className="font-black text-slate-800 text-lg">
                  ₹{order.total?.toLocaleString()}
                </span>
                <p className="text-xs font-semibold text-emerald-500">Paid</p>
              </div>

              {/* Status */}
              <div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full shadow-sm ${
                  order.status === "placed"
                    ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                    : order.status === "shipped"
                    ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                    : order.status === "delivered"
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                    : "bg-red-50 text-red-700 ring-1 ring-red-200"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    order.status === "placed" ? "bg-blue-500" 
                    : order.status === "shipped" ? "bg-amber-500"
                    : order.status === "delivered" ? "bg-emerald-500"
                    : "bg-red-500"
                  }`}></span>
                  <span className="capitalize">{order.status}</span>
                </span>
              </div>

            </div>
          ))}

          {orders.length === 0 && (
            <div className="px-6 py-12 text-center text-slate-500">
              <i className="fas fa-box-open text-4xl mb-3 text-slate-300"></i>
              <p>No orders placed yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
