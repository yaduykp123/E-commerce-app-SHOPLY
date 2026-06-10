import React, { useState, useEffect } from 'react';
import { useStore } from '../CONTEXT/StoreContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const { orders, cancelOrder, isLoggedIn, loadUserData } = useStore();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !localStorage.getItem("isLoggedIn")) {
      toast.error("Please login to view your orders");
      navigate("/login");
    } else {
      loadUserData(); // Always fetch fresh data on mount
    }
  }, [isLoggedIn, navigate]);

  // Status mapping for progress bar
  const statuses = ["Placed", "Processing", "Shipped", "Delivered"];

  const getStatusIndex = (status) => {
    const s = (status || 'Placed').toLowerCase();
    if (s.includes('deliver')) return 3;
    if (s.includes('ship')) return 2;
    if (s.includes('process')) return 1;
    return 0; // Default Placed
  };

  const handleCancel = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order? This action cannot be undone.")) {
      await cancelOrder(orderId);
      setSelectedOrder(null); // Go back to list after cancelling
    }
  };

  // If viewing a specific order
  if (selectedOrder) {
    const currentStatusIndex = getStatusIndex(selectedOrder.status);
    // Find the latest version of this order from context in case it changed, 
    // or if it was removed (cancelled), we shouldn't render it.
    const activeOrder = orders.find(o => o.id === selectedOrder.id || o._id === selectedOrder._id);

    if (!activeOrder) {
      setSelectedOrder(null);
      return null;
    }

    return (
      <div className="max-w-5xl mx-auto p-4 md:p-8 animate-fade-in">
        <button 
          onClick={() => setSelectedOrder(null)}
          className="mb-6 flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-semibold"
        >
          <i className="fas fa-arrow-left"></i> Back to Orders
        </button>
        <div className="bg-white shadow-2xl shadow-blue-100 rounded-3xl p-6 md:p-10 border border-white">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-gray-100 gap-4">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order Details</p>
              <h2 className="text-2xl md:text-3xl font-black text-gray-800 font-mono">
                #{String(activeOrder._id || activeOrder.id).substring(0, 10).toUpperCase()}
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Placed on {new Date(activeOrder.date || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            
            {currentStatusIndex < 2 && (
              <button 
                onClick={() => handleCancel(activeOrder._id || activeOrder.id)}
                className="px-6 py-3 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-xl font-bold transition-all shadow-sm hover:shadow-red-200 flex items-center gap-2 group"
              >
                <i className="fas fa-times-circle group-hover:rotate-90 transition-transform"></i> Cancel Order
              </button>
            )}
          </div>

          {/* Status Tracker */}
          <div className="mb-12">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Tracking Status</h3>
            <div className="relative flex justify-between items-center w-full max-w-3xl mx-auto px-4 md:px-0">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 -translate-y-1/2"></div>
              <div 
                className="absolute top-1/2 left-0 h-1 bg-blue-500 -z-10 -translate-y-1/2 transition-all duration-1000 ease-in-out"
                style={{ width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%` }}
              ></div>

              {statuses.map((status, index) => (
                <div key={status} className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                    index <= currentStatusIndex 
                      ? 'bg-blue-600 border-blue-200 text-white shadow-lg shadow-blue-200 scale-110' 
                      : 'bg-white border-gray-200 text-gray-300'
                  }`}>
                    {index === 0 && <i className="fas fa-clipboard-list"></i>}
                    {index === 1 && <i className="fas fa-box-open"></i>}
                    {index === 2 && <i className="fas fa-truck-fast"></i>}
                    {index === 3 && <i className="fas fa-home"></i>}
                  </div>
                  <span className={`text-xs md:text-sm font-bold ${
                    index <= currentStatusIndex ? 'text-blue-700' : 'text-gray-400'
                  }`}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Items */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Items inside</h3>
            <div className="space-y-4">
              {activeOrder.items.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                  <div className="w-24 h-24 bg-white rounded-xl p-2 shadow-sm flex-shrink-0 flex items-center justify-center">
                    <img src={item.image} alt={item.model} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="font-bold text-gray-800 text-lg">{item.brand} {item.model}</h4>
                    <p className="text-sm text-gray-500 font-medium">Qty: <span className="text-gray-800">{item.quantity || 1}</span></p>
                  </div>
                  <div className="text-xl font-black text-blue-600">
                    ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 flex flex-col items-end border border-blue-100">
             <div className="w-full md:w-1/2 space-y-3">
               <div className="flex justify-between text-gray-600 font-medium">
                 <span>Subtotal</span>
                 <span>₹{activeOrder.total.toLocaleString()}</span>
               </div>
               <div className="flex justify-between text-gray-600 font-medium pb-4 border-b border-blue-200/50">
                 <span>Delivery Fee</span>
                 <span>{activeOrder.total > 100000 ? 'Free' : '₹50'}</span>
               </div>
               <div className="flex justify-between text-xl md:text-2xl font-black text-gray-800 pt-2">
                 <span>Grand Total</span>
                 <span className="text-blue-600">₹{(activeOrder.total + (activeOrder.total > 100000 ? 0 : 50)).toLocaleString()}</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  // --- LIST VIEW ---

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <i className="fas fa-box-open text-6xl text-gray-300"></i>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
        <p className="text-gray-500">Looks like you haven't made your first purchase.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
          <i className="fas fa-shopping-bag"></i>
        </div>
        <h2 className="text-3xl font-black text-gray-800 tracking-tight">Order History</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {orders.map((order, index) => {
          const statusIndex = getStatusIndex(order.status);
          const firstItem = order.items[0];
          const moreCount = order.items.length - 1;

          return (
            <div 
              key={order.id || order._id || index} 
              className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(59,130,246,0.1)] transition-all duration-300 group flex flex-col h-full cursor-pointer relative overflow-hidden"
              onClick={() => setSelectedOrder(order)}
            >
              {/* Decorative top gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Order ID</span>
                  <span className="font-mono font-bold text-gray-700 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                    #{String(order._id || order.id).substring(0, 8).toUpperCase()}
                  </span>
                </div>
                
                <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 ${
                  statusIndex === 3 ? 'bg-green-100 text-green-700' : 
                  statusIndex === 0 ? 'bg-blue-50 text-blue-600' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  <span className="relative flex h-2 w-2">
                    {statusIndex < 3 && <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current"></span>}
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                  </span>
                  {order.status || 'Placed'}
                </div>
              </div>

              <div className="flex items-center gap-5 bg-slate-50 p-4 rounded-2xl mb-6">
                {firstItem && (
                  <div className="w-16 h-16 bg-white rounded-xl shadow-sm p-1 border border-gray-100 flex items-center justify-center flex-shrink-0">
                    <img src={firstItem.image} alt="product" className="max-w-full max-h-full object-contain" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-bold text-gray-800 line-clamp-1">{firstItem?.brand} {firstItem?.model}</p>
                  {moreCount > 0 && (
                    <p className="text-xs font-semibold text-blue-600 mt-1">
                      + {moreCount} more item{moreCount > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-0.5">Total Amount</p>
                  <p className="text-xl font-black text-gray-800">₹{order.total.toLocaleString()}</p>
                </div>
                <button className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
