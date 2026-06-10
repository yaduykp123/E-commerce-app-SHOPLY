import axios from 'axios';
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { useStore } from '../CONTEXT/StoreContext';

function Budget() {
  const { addToCart } = useStore();
  const { minBudget, maxBudget } = useParams();
  
  const [budgetPhones, setBudgetPhones] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

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

  // Ref for the intersection observer (sentinel element)
  const observer = useRef();
  const sentinelRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    }, { threshold: 0.1 });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // Reset when budget range changes
  useEffect(() => {
    setBudgetPhones([]);
    setPage(1);
    setHasMore(true);
  }, [minBudget, maxBudget]);

  useEffect(() => {
    const fetchBudgetPhones = async () => {
      setLoading(true);
      // Artificial delay of 1.5s as requested
      setTimeout(async () => {
        try {
          const res = await axios.get(`/products?minPrice=${minBudget}&maxPrice=${maxBudget}&page=${page}&limit=3`);
          
          setBudgetPhones(prev => {
            if (page === 1) return res.data.products;
            return [...prev, ...res.data.products];
          });
          
          setHasMore(res.data.hasMore);
          setLoading(false);
        } catch (err) {
          console.error("Budget fetch error", err);
          setLoading(false);
        }
      }, 1500);
    };

    fetchBudgetPhones();
  }, [minBudget, maxBudget, page]);

  // Initial loading state (shimmer)
  if (loading && page === 1) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto p-4 mt-10">
        {Array(4).fill("").map((_, i) => (
          <div key={i} className="flex gap-6 bg-white rounded-2xl shadow-md p-6">
            <div className="w-1/3 h-48 shimmer rounded-xl" />
            <div className="w-2/3 space-y-4">
              <div className="h-8 w-1/2 shimmer rounded" />
              <div className="h-20 w-full shimmer rounded" />
              <div className="h-10 w-32 shimmer rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4 min-h-screen mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 px-2">
        Mobiles between ₹{Number(minBudget).toLocaleString()} - {maxBudget === "Infinity" ? "Above" : `₹${Number(maxBudget).toLocaleString()}`}
      </h2>

      {budgetPhones.length === 0 && !loading && (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
          <p className="text-xl font-semibold text-gray-400">No mobiles found in this budget 💸</p>
          <p className="text-gray-400">Try exploring other price ranges!</p>
        </div>
      )}

      {budgetPhones.map((mobile) => {
        return (
          <div
            key={mobile.id}
            className="flex gap-6 bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300"
          >
            {/* LEFT SIDE */}
            <div className="w-1/3 flex flex-col items-center">
              <img
                src={mobile.image}
                alt={mobile.model}
                className="h-52 object-contain mb-4 hover:scale-105 transition-transform"
              />
              <h3 className="text-lg font-semibold text-gray-800 text-center">
                {mobile.brand} {mobile.model}
              </h3>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-2/3 space-y-2">
              <h2 className="text-3xl font-black text-green-600">
                ₹{mobile.price?.toLocaleString()}
              </h2>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600 mt-4 border-t pt-4">
                <p><span className="font-bold text-gray-400 uppercase text-[10px] tracking-wider">Storage:</span> {mobile.storage}</p>
                <p><span className="font-bold text-gray-400 uppercase text-[10px] tracking-wider">RAM:</span> {mobile.ram}</p>
                <p className='flex items-center gap-2'>
                  <span className="font-bold text-gray-400 uppercase text-[10px] tracking-wider">Color:</span> 
                  <span className="w-3 h-3 rounded-full border border-gray-200" style={{ backgroundColor: colorMap[mobile.color?.toLowerCase()] || "#333" }}></span>
                  {mobile.color}
                </p>
                <p><span className="font-bold text-gray-400 uppercase text-[10px] tracking-wider">Battery:</span> {mobile.battery}</p>
              </div>

              <button 
                onClick={() => addToCart(mobile)} 
                disabled={!mobile.inStock}
                className={`mt-6 px-8 py-2.5 rounded-full font-bold transition-all
                  ${mobile.inStock 
                    ? "bg-black text-white hover:bg-gray-800 active:scale-95" 
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
              >
                {mobile.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        );
      })}

      {/* Sentinel for Infinite Scroll */}
      <div ref={sentinelRef} className="h-10 w-full"></div>

      {/* Loading indicator */}
      {loading && page > 1 && (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
        </div>
      )}

      {/* End message */}
      {!hasMore && budgetPhones.length > 0 && (
        <div className="text-center py-10 text-gray-400 font-medium">
          You've explored all mobiles in this budget ✨
        </div>
      )}
    </div>
  );
}

export default Budget;