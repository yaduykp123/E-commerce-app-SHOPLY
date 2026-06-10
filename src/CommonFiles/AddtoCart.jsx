import { Link } from "react-router-dom";
import { useStore } from "../CONTEXT/StoreContext";

function AddtoCart() {
  const { cart, removeFromCart ,total,delivery,subtotal, increaseQuantity, decreaseQuantity} = useStore();



  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h2>

      <div className="flex flex-col lg:flex-row gap-8">
      
<div className="lg:w-2/3">
  {cart.length === 0 ? (
    <div className="bg-white p-10 rounded-xl border border-dashed border-gray-300 text-center">
      <p className="text-gray-500 text-lg">Your cart is currently empty.</p>
    </div>
  ) : (
    <div className="space-y-4">
      {cart.map((item) => (
        <div 
          key={item.id} 
          className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-center transition-hover hover:shadow-md gap-6"
        >
    
          <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
            <img 
              src={item.image} 
              alt={item.model} 
              className="w-full h-full object-contain p-2" 
            />
          </div>

          <div className="flex-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
              {item.brand}
            </span>
            <h4 className="text-xl font-semibold text-gray-800 leading-tight">
              {item.model}
            </h4> 
            <p className="text-gray-600 font-medium mt-1">₹{item.price*item.quantity}</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center border rounded-lg bg-gray-50">
              <button onClick={()=>decreaseQuantity(item.id)} className="px-3 py-1 hover:bg-gray-200 rounded-l-lg border-r font-bold">-</button>
              <span className="px-4 py-1 font-semibold">{item.quantity}</span>
              <button onClick={()=>increaseQuantity(item.id)} className="px-3 py-1 hover:bg-gray-200 rounded-r-lg border-l font-bold">+</button>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 font-medium transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

    

            <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 sticky top-6">
            <h3 className="text-xl font-bold mb-6 text-gray-800 border-b pb-4">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cart.length} items)</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Charges</span>
                <span className="text-green-600">{delivery > 0 ? `₹${delivery}` : 'Free'}</span>
              </div>
              <div className="flex justify-between text-gray-600 italic text-sm">
                <span>Taxes (Included)</span>
                <span>₹0</span>
              </div>
              <hr className="border-gray-100" />
              <div className="flex justify-between text-2xl font-bold text-gray-900">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>


           <Link to={'/checkout'}>
            <button
            disabled={cart?.length === 0}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-transform active:scale-95 shadow-lg  ${cart.length === 0
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 text-white"}`}>
             CheckOut
            </button>
           </Link>
           
          

            <p className="text-center text-xs text-gray-400 mt-4">
              Secure Checkout - 7 Day Returns
            </p>
          </div>
        </div>
    
      </div>
    </div>
  );
}

export default AddtoCart;




