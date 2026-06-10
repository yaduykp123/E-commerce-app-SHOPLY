import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../CONTEXT/StoreContext";
import Shimmer from "../../public/Shimmer";

const Brand = () => {
  const { brand } = useParams();
  const [smartphones, setSmartphones] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const {
    cart,
    wishlist,
    addToWishlist,
    addToCart,
    removeFromCart,
    removeFromWishlist,
  } = useStore();

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

  // Reset when brand changes
  useEffect(() => {
    setSmartphones([]);
    setPage(1);
    setHasMore(true);
  }, [brand]);

  useEffect(() => {
    const fetchBrandMobiles = async () => {
      setLoading(true);
      // Artificial delay of 1.5s as requested
      setTimeout(async () => {
        try {
          const res = await axios.get(`/products?brand=${brand}&page=${page}&limit=3`);
          
          setSmartphones(prev => {
            if (page === 1) return res.data.products;
            return [...prev, ...res.data.products];
          });
          
          setHasMore(res.data.hasMore);
          setLoading(false);
        } catch (err) {
          console.error("Api error occurred", err);
          setSmartphones([]);
          setLoading(false);
        }
      }, 1500);
    };

    fetchBrandMobiles();
  }, [brand, page]);

  if (loading && page === 1)  return (
    <Shimmer>
      <div className="g grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {Array(8).fill("").map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-xl">
            <div className="h-40 shimmer mb-4 rounded" />
            <div className="h-4 shimmer w-3/4 mb-2 rounded" />
            <div className="h-4 shimmer w-1/2 rounded" />
          </div>
        ))}
      </div>
    </Shimmer>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold capitalize">{brand} Mobiles</h2>
        <p className="text-gray-500 text-sm mt-1">
          Showing categorized {brand} products
        </p>
      </div>

      {/* Empty State */}
      {smartphones.length === 0 && !loading && (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg font-semibold">No mobiles found for {brand} 📱</p>
          <p className="text-sm">We'll be adding more soon!</p>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {smartphones.map((mobile) => {
          const inCart = cart.some((item) => item.id === mobile.id);
          const inWishlist = wishlist.some((item) => item.id === mobile.id);

          return (
            <div
              key={mobile.id}
              className="relative bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col p-4"
            >
  {/* Wishlist */}
  <button
    onClick={() =>
      inWishlist
        ? removeFromWhishList(mobile)
        : addToWishlist(mobile)
    }
    className="absolute top-3 right-3"
  >
    <i
      className={`fa-heart text-lg transition-colors ${
        inWishlist
          ? "fa-solid text-red-500"
          : "fa-regular text-gray-400 hover:text-red-500"
      }`}
    ></i>
  </button>

  {/* Image */}
  <Link to={`/single-product/${mobile._id}`}>
    <div className="h-40 sm:h-44 md:h-48 flex items-center justify-center mb-3">
      <img
        src={mobile.image}
        alt={mobile.model}
        className="h-full object-contain hover:scale-105 transition-transform"
      />
    </div>
  </Link>

  {/* Title */}
  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[40px]">
    {mobile.brand} {mobile.model}
  </h3>


  {/* Price */}
  <p className="text-lg font-bold text-gray-900 mt-2">
    ₹{mobile.price?.toLocaleString()}
  </p>

  {/* Stock */}
  {mobile.inStock !== undefined && (
    <span
      className={`text-xs font-medium mt-1 ${
        mobile.inStock > 0 ? "text-green-600" : "text-red-600"
      }`}
    >
      {mobile.inStock > 0 ? "In stock" : "Out of stock"}
    </span>
  )}

  {/* Push bottom */}
  <div className="flex-grow"></div>

  {/* Cart Icon Button */}
  <button
    onClick={() =>
      inCart ? removeFromCart(mobile.id) : addToCart(mobile)
    }
    className={`mt-4 w-full py-2 rounded-full
      flex items-center justify-center gap-2
      text-sm font-semibold
      transition-all duration-300
      ${
        inCart
          ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
          : "bg-amber-400 text-black hover:bg-amber-500"
      }`}
  >
    <i className="fa-solid fa-cart-shopping"></i>
    {inCart ? "Remove" : "Add to Cart"}
  </button>
</div>

          );
        })}
      </div>

      {/* Sentinel for Infinite Scroll */}
      <div ref={sentinelRef} className="h-10 w-full"></div>

      {/* Loading More */}
      {loading && page > 1 && (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        </div>
      )}

      {/* End Message */}
      {!hasMore && smartphones.length > 0 && (
        <div className="text-center py-10 text-gray-400 font-medium">
          You've seen all {brand} products ✨
        </div>
      )}
    </div>
  );
};

export default Brand;
