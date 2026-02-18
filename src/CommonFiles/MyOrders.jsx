import React from 'react'
import { useStore } from '../../public/StoreContext';

const MyOrders = () => {
  const { orders } = useStore();

  if (orders.length === 0)
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        No orders yet
      </p>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        My Orders
      </h2>

      {orders.map(order => (
        <div
          key={order.id}
          className="border rounded-xl p-5 mb-6 shadow-sm bg-white"
        >
          
          <div className="flex flex-wrap justify-between mb-4 text-sm text-gray-600">
            <p>
              <span className="font-semibold text-gray-800">Order ID:</span>{" "}
              {order.id}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Date:</span>{" "}
              {new Date(order.date).toLocaleString()}
            </p>
            <p className="text-green-600 font-semibold">
              Total: ₹{order.total}
            </p>
          </div>

         
          <div className="space-y-4">
            {order.items.map(item => (
              <div
                key={item.id}
                className="flex items-center gap-4 border rounded-lg p-3"
              >
               
                <img
                  src={item.image}
                  alt={item.brand}
                  className="w-20 h-20 object-cover rounded-md border"
                />

                
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">
                    {item.brand}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Model: {item.model}
                  </p>
                </div>

               
                <p className="font-semibold text-gray-800">
                  ₹{item.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyOrders
