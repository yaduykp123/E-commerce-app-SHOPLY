import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../public/StoreContext";

function ProductSingle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const { addToCart, addToWishlist, singleproduct } = useStore();

    const userId = localStorage.getItem("userId");
const  isLoggin = localStorage.getItem("isLoggedIn") === "true";

  function handleBuy() {
    if(!userId|| !isLoggin){
         alert("pliease login")
    }  
    else{
       singleproduct(product);
         navigate("/checkout");
    }
    
  }

  useEffect(() => {
    axios
      .get(`http://localhost:31234/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50">
      <div className="flex flex-col md:flex-row gap-12 bg-white rounded-xl shadow-md p-6">

       
        <div className="flex justify-center md:w-1/2">
       <div className="w-90 h-[520px] rounded-lg flex items-center justify-center
                bg-gray-200 overflow-hidden
                transition-shadow duration-300
                hover:shadow-lg
                group">
  <img
    src={product.image}
    alt={product.brand}
    className="max-w-full max-h-full object-contain
               transition-transform duration-300
               group-hover:scale-105"
  />
</div>
        </div>

       
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-900">
            {product.brand}
          </h2>

          <p className="text-xl text-gray-600 mt-1">
            {product.model}
          </p>

          <p
            className={`mt-4 inline-block px-3 py-1 rounded-full text-sm font-medium
            ${product.inStock
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"}`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>

          <p className="text-3xl font-bold mt-6 text-gray-900">
            ₹{product.price}
          </p>

          <ul className="mt-5 space-y-1 text-gray-700">
            <li><b>RAM:</b> {product.ram}</li>
            <li><b>Storage:</b> {product.storage}</li>
            <li><b>Battery:</b> {product.battery}</li>
            <li><b>Camera:</b> {product.camera}</li>
            <li><b>Color:</b> {product.color}</li>
          </ul>

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => addToCart(product)}
              disabled={!product.inStock}
              className={`flex-1 py-3 rounded-lg font-semibold text-white
                ${product.inStock
                  ? "bg-blue-600 hover:bg-blue-700 transition"
                  : "bg-gray-400 cursor-not-allowed"}`}
            >
              Add to Cart <i className="fa-solid fa-cart-flatbed"></i>
            </button>

            <button
              onClick={() => addToWishlist(product)}
              className="flex-1 py-3 rounded-lg font-semibold border border-gray-300
                         hover:bg-gray-100 transition"
            >
              <Link to="/wishlist"><i className="fa-solid text-red-500 fa-heart"></i> Wishlist</Link>
            </button>

            <button
              onClick={handleBuy}
              className="flex-1 py-3 rounded-lg font-semibold border border-gray-300
                         hover:bg-gray-100 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSingle;
