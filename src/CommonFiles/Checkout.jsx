import React, { useEffect, useState } from 'react';
import { useStore, API_URL } from '../CONTEXT/StoreContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Checkout = () => {
  const {singleTotal,singleDelivery,singleSubTotal,placeOrder,cart,single,subtotal,delivery, total, shippingAddress, saveAddressToDB, loadUserData} = useStore();
  
 
  
  const RAZORPAY_KEY_ID = "rzp_test_SkOVIjj189rQvu"; 


  const navigate = useNavigate();
  const { register,handleSubmit,reset,formState: { errors },} = useForm();

  const isSingleCheckout = single.length > 0;
  const finalSubtotal = isSingleCheckout ? singleSubTotal : subtotal;
  const finalDelivery = isSingleCheckout ? singleDelivery : delivery;
  const finalTotal = isSingleCheckout ? singleTotal : total;

  useEffect(()=>{
    if(shippingAddress){
      reset(shippingAddress);
    }
  },[shippingAddress, reset])

  const handleOrder = async (data) => {
    try {
      // 1. Save address to database
      await saveAddressToDB(data);

      // 2. Create Order on Backend
      const res = await axios.post(`${API_URL}/api/payment/create-order`, {
        amount: finalTotal,
      });

      const { id: order_id, currency, amount } = res.data;

      // 3. Razorpay Options
      const options = {
        key: RAZORPAY_KEY_ID, // Using the variable from above
        amount: amount,
        currency: currency,
        name: "E-Commerce Store",
        description: "Payment for your order",
        order_id: order_id,
        handler: async (response) => {
          try {
            // 4. Verify Payment on Backend
            const verifyRes = await axios.post(`${API_URL}/api/payment/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              items: isSingleCheckout ? single : cart,
              total: finalTotal,
              isCartPurchase: !isSingleCheckout
            });

            if (verifyRes.data.message) {
              toast.success("Payment Successful & Order Placed!");
              // Wait a tiny bit for DB to catch up before refreshing and navigating
              setTimeout(async () => {
                await loadUserData(); 
                navigate('/orders');
              }, 500);
            }
          } catch (error) {
            console.error("Verification Error:", error);
            // Only show error if we haven't already succeeded
            toast.error("Verification error, but check your orders page.");
          }
        },
        prefill: {
          name: data.name,
          email: data.email,
        },
        theme: {
          color: "#3395FF",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (err) {
      console.error("Payment Initiation Error:", err);
      toast.error("Failed to start payment. Check your Key ID.");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleOrder)}>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* LEFT */}
            <div className="space-y-8">
              {/* Shipping */}
              <section>
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                  Shipping Information
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  <input
                    {...register('name', { required: 'Full name is required' })}
                    type="text"
                    placeholder="Full Name"
                    className="p-3 border rounded-lg w-full"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                  )}

                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    type="email"
                    placeholder="Email Address"
                    className="p-3 border rounded-lg w-full"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                  )}

                  <input
                    {...register('address', { required: 'Address is required' })}
                    type="text"
                    placeholder="Street Address"
                    className="p-3 border rounded-lg w-full"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">
                      {errors.address.message}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      {...register('city', { required: 'City is required' })}
                      type="text"
                      placeholder="City"
                      className="p-3 border rounded-lg"
                    />
                    <input
                      {...register('zip', {
                        required: 'ZIP is required',
                        minLength: {
                          value: 5,
                          message: 'Invalid ZIP',
                        },
                      })}
                      type="text"
                      placeholder="ZIP Code"
                      className="p-3 border rounded-lg"
                    />
                  </div>
                </div>
              </section>

              {/* Payment Info */}
              <section>
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                  Payment Method
                </h2>
                <div className="p-6 border border-gray-200 bg-white rounded-lg flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" className="h-10" />
                    <div>
                      <p className="font-bold text-gray-800">Razorpay Secure</p>
                      <p className="text-xs text-gray-500">Test Mode Active</p>
                    </div>
                  </div>
                  <span className="text-blue-600 font-bold text-sm">SECURE</span>
                </div>
              </section>
            </div>

            {/* RIGHT */}
            <div className="bg-white p-6 rounded-xl shadow-md h-fit sticky top-6 border border-gray-100">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${finalSubtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{finalDelivery}</span>
                </div>

                <hr className="border-gray-100" />

                <div className="flex justify-between font-bold text-2xl text-gray-900">
                  <span>Total</span>
                  <span>{finalTotal || 0}</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#3395FF] text-white py-4 rounded-lg font-bold hover:bg-[#2879d1] transition-all transform active:scale-[0.98] mt-4 flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
                >
                  <i className="fa-solid fa-lock text-sm"></i>
                  Pay & Place Order
                </button>

                <div className="flex items-center justify-center gap-4 mt-6 grayscale opacity-40">
                  <i className="fa-brands fa-cc-visa text-2xl"></i>
                  <i className="fa-brands fa-cc-mastercard text-2xl"></i>
                  <i className="fa-solid fa-building-columns text-xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Checkout;
