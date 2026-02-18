import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function UserData() {
  const [userdata, setUserData] = useState()
  const { id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:31234/users/${id}`)
      .then((res) => setUserData(res.data))
      .catch((err) => console.error("Fetch user error:", err))
  }, [id])

  if (!userdata) return <span className="inline-block text-blue-500 text-3xl animate-spin">
  <i className="fas fa-circle-notch"></i>
</span>

  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 p-4 md:p-12">
      

      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white mb-10 transition-all hover:shadow-blue-200/50">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <i className="fas fa-user-shield"></i> User Profile Details
          </h2>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 transition-colors hover:bg-blue-50">
              <i className="fas fa-id-card text-blue-500 text-xl w-8"></i>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Full Name</p>
                <p className="font-semibold text-gray-800">{userdata.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 transition-colors hover:bg-blue-50">
              <i className="fas fa-envelope text-blue-500 text-xl w-8"></i>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Email Address</p>
                <p className="font-semibold text-gray-800">{userdata.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 transition-colors hover:bg-blue-50">
              <i className="fas fa-user-tag text-blue-500 text-xl w-8"></i>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Account Role</p>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 uppercase">
                  {userdata.role}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 transition-colors hover:bg-blue-50">
              <i className="fas fa-fingerprint text-blue-500 text-xl w-8"></i>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">User ID</p>
                <p className="font-mono text-sm text-gray-600">{userdata.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6 px-2">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <i className="fas fa-shopping-bag text-indigo-600"></i> Order History
          </h3>
          <span className="bg-white px-4 py-1 rounded-full shadow-sm text-sm font-medium text-gray-500 border">
            Total Orders: {userdata.orders.length}
          </span>
        </div>

        {userdata.orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 shadow-xl text-center border-2 border-dashed border-gray-200">
            <i className="fas fa-box-open text-5xl text-gray-200 mb-4"></i>
            <p className="text-gray-500 text-lg">No orders found in your history.</p>
          </div>
        ) : (
          userdata.orders.map((order) => (
            <div
              key={order.id}
              className="group bg-white rounded-3xl shadow-lg p-6 mb-8 border border-transparent hover:border-blue-300 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-50">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Order ID</p>
                  <p className="font-mono text-gray-700">#{String(order.id).substring(0, 8)}...</p>
                </div>
                <div className="mt-4 sm:mt-0 px-4 py-2 rounded-xl bg-green-50 text-green-600 flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="font-bold text-sm uppercase">{order.status}</span>
                </div>
              </div>

              
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 group-hover:bg-white border border-gray-100 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                        <i className="fas fa-mobile-alt"></i>
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{item.brand} {item.model}</p>
                        <p className="text-sm text-gray-500">Unit Price: ₹{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-gray-400">QTY</p>
                      <p className="font-bold text-gray-800">x{item.quantity || 1}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 flex justify-between items-center border-t border-gray-50">
                <p className="text-gray-500 font-medium">Grand Total</p>
                <p className="text-2xl font-black text-blue-600">₹{order.total.toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default UserData
