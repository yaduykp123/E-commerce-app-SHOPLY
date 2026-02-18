import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../../public/StoreContext";
import Shimmer from "../../public/Shimmer";

const Brand = () => {
  const { brand } = useParams();
  const [smartphones, setSmartphones] = useState([]);
 const [loading, setLoading] = useState(true)
  const {
    cart,
    wishlist,
    addToWishlist,
    addToCart,
    removeFromCart,
    removeFromWhishList,
  } = useStore();

  useEffect(() => {
    axios
      .get("http://localhost:31234/products")
      .then((res) => {
        let filtered = [];

        if (brand.toLowerCase() === "others") {
          const alreadyBrands = ["apple", "google", "samsung"];
          filtered = res.data.filter(
            (item) => !alreadyBrands.includes(item.brand?.toLowerCase())
          );
        } else {
          filtered = res.data.filter(
            (item) => item.brand?.toLowerCase() === brand.toLowerCase()
          );
        }

       setTimeout(()=>{
         setSmartphones(filtered);
        setLoading(false)
       } ,1000)
      })
      .catch((err) => {
        console.error("Api error occurred", err);
        setSmartphones([]);
      });
  }, [brand]);

  if (loading)  return (

    <Shimmer>
      <div className="g grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {Array(16).fill("").map((_, i) => (
  <div key={i} className="bg-white p-4 rounded-xl">
    <div className="h-40 shimmer mb-4 rounded" />
    <div className="h-4 shimmer w-3/4 mb-2 rounded" />
    <div className="h-4 shimmer w-1/2 rounded" />
  </div>
))}

    </div>
    </Shimmer>
 )

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-gray-100">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold capitalize">{brand} Mobiles</h2>
        <p className="text-gray-500 text-sm mt-1">
          {smartphones.length} products available
        </p>
      </div>

      {/* Empty State */}
      {smartphones.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">No mobiles found</p>
        </div>
      )}

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {smartphones.map((mobile) => {
          const inCart = cart.some((item) => item.id === mobile.id);
          const inWishlist = wishlist.some(
            (item) => item.id === mobile.id
          );

          return (
           <div
  key={mobile.id}
  className="relative bg-white rounded-xl 
             shadow-sm hover:shadow-2xl
             transition-all duration-300
             flex flex-col p-4"
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
  <Link to={`/single-product/${mobile.id}`}>
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
    </div>
  );
};

export default Brand;
