import React, { useEffect, useState } from 'react';
import { useStore } from '../../public/StoreContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Checkout = () => {
  const {singleTotal,singleDelivery,singleSubTotal,placeOrder,cart,single,subtotal,delivery, total, shippingAddress, saveAddressToDB} = useStore();

 

  const navigate = useNavigate();

  const { register,handleSubmit,reset,formState: { errors },} = useForm();

  const isSingleCheckout = single.length > 0;

  const finalSubtotal = isSingleCheckout ? singleSubTotal : subtotal;
  const finalDelivery = isSingleCheckout ? singleDelivery : delivery;
  const finalTotal = isSingleCheckout ? singleTotal : total;


  console.log("shippingAddress from context:", shippingAddress);


useEffect(()=>{
if(shippingAddress){
  reset(shippingAddress);
}
},[shippingAddress, reset])



  const handleOrder = async (data) => {

    // save address
   await saveAddressToDB(data)
    await placeOrder();
    navigate('/orders');
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

                  {(errors.city || errors.zip) && (
                    <p className="text-red-500 text-sm">
                      {errors.city?.message || errors.zip?.message}
                    </p>
                  )}
                </div>
              </section>

              {/* Payment */}
              <section>
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                  Payment Details
                </h2>

                <div className="p-4 border-2 border-blue-100 bg-blue-50 rounded-lg">
                  <input
                    {...register('cardNumber', {
                      required: 'Card number required',
                      minLength: {
                        value: 16,
                        message: 'Invalid card number',
                      },
                    })}
                    type="text"
                    placeholder="Card Number"
                    className="p-3 border rounded-lg w-full mb-3"
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm mb-2">
                      {errors.cardNumber.message}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      {...register('expiry', {
                        required: 'Expiry required',
                      })}
                      type="text"
                      placeholder="MM/YY"
                      className="p-3 border rounded-lg"
                    />
                    <input
                      {...register('cvc', {
                        required: 'CVC required',
                        minLength: {
                          value: 3,
                          message: 'Invalid CVC',
                        },
                      })}
                      type="text"
                      placeholder="CVC"
                      className="p-3 border rounded-lg"
                    />
                  </div>

                  {(errors.expiry || errors.cvc) && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.expiry?.message || errors.cvc?.message}
                    </p>
                  )}
                </div>
              </section>
            </div>

            {/* RIGHT */}
            <div className="bg-white p-6 rounded-xl shadow-sm h-fit sticky top-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${finalSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{finalDelivery}</span>
                </div>

                <hr />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{finalTotal || 0}</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 mt-4"
                >
                  Complete Purchase
                </button>

                <p className="text-xs text-center text-gray-400 mt-4">
                  Secure SSL Encrypted Payment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Checkout;
