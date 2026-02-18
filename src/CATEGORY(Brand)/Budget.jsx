import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { useStore } from '../../public/StoreContext';

function Budget() {
 
    const {addToCart} =useStore()
      const { minBudget,maxBudget } = useParams();
      const { state} = useLocation()
  const [budgetPhones, setBudgetPhones] = useState([]);
const [loading, setLoading] = useState(true)

 const colorMap = {
  "aqua green": "#01ff07",
  "awesome lime": "#32cd32",
  "black": "#000000",
  "blue": "#0000ff",
  "charcoal": "#36454f",
  "gold": "#ffd700",
  "green": "#008000",
  "hazel": "#8e7618",
  "ice blue": "#99ffff",
  "mars orange": "#ad3e00",
  "midnight": "#191970",
  "midnight black": "#000000",
  "nitro blaze": "#ff4500",
  "norway blue": "#a0b2c8",
  "obsidian": "#0b0d0f",
  "ocean blue": "#1e90ff",
  "pastel lime": "#e1ffb3",
  "red": "#ff0000",
  "rose gold": "#b76e79",
  "space gray": "#4b5563",
  "white": "#ffffff"
};

useEffect(()=>{

  if(state?.mobiles){
      setTimeout(()=>{
setBudgetPhones(state.mobiles)
      setLoading(false)
      },1000)
  }
},[state])
    
if (loading) 
  return (
    <div className="space-y-6">

      {Array(5).fill("").map((_, i) => (
        <div
          key={i}
          className="flex gap-6 bg-white rounded-2xl shadow-md p-6"
        >
          {/* LEFT SIDE */}
          <div className="w-1/3 flex flex-col items-center">
            <div className="h-52 w-full shimmer rounded-xl mb-4" />
            <div className="h-5 w-3/4 shimmer rounded" />
          </div>

          {/* RIGHT SIDE */}
          <div className="w-2/3 space-y-4">
            <div className="h-8 w-40 shimmer rounded" />

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="h-4 w-32 shimmer rounded" />
              <div className="h-4 w-28 shimmer rounded" />
              <div className="h-4 w-36 shimmer rounded" />
              <div className="h-4 w-32 shimmer rounded" />
              <div className="h-4 w-40 shimmer rounded" />
            </div>

            <div className="h-10 w-36 shimmer rounded-full mt-4" />
          </div>
        </div>
      ))}

    </div>
  );

  return (
 <div className="space-y-6">
  {budgetPhones
    ?.filter(
      (data) =>
        data.price > Number(minBudget) && data.price <= Number(maxBudget)
    )
    .map((mobile) => (
      <div
        key={mobile.id}
        className="flex gap-6 bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
      >
        {/* LEFT SIDE */}
        <div className="w-1/3 flex flex-col items-center">
          <img
            src={mobile.image}
            alt={mobile.model}
            className="h-52 object-contain mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-800">
            {mobile.brand} {mobile.model}
          </h3>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-2/3 space-y-2">
          <h2 className="text-2xl font-bold text-green-600">
            ₹{mobile.price}
          </h2>

        
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mt-4">
            <p><span className="font-medium">Storage:</span> {mobile.storage}</p>
            <p><span className="font-medium">RAM </span> {mobile.ram} </p>
            <p className='flex'><span className="font-medium px-3">Color:</span> <i style={{ color:colorMap[mobile.color?.toLowerCase()] || "#333334"}}>{mobile.color}</i></p>
            <p><span className="font-medium">Battery:</span> {mobile.battery}</p>
            <p><span className="font-medium">Camera:</span> {mobile.camera}</p>
          </div>

          <button onClick={() => addToCart(mobile)} className="mt-4 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
            Add to Cart
          </button>
        </div>
      </div>
    ))}
</div>

  )
}

export default Budget