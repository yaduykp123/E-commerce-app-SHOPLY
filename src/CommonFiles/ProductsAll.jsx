import React, { useEffect, useState } from 'react';
import { useStore } from '../../public/StoreContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductsAll() {
  const [products, setProducts] = useState([]);
  const { wishlist, addToWishlist, removeFromWhishList, addToCart } = useStore();

  // search
  const [searchProd, setSearchPro] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:31234/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-[#f5f5f7] min-h-screen">

      {/* SEARCH BAR */}
      <div className="py-8 flex justify-center">
        <input
          type="text"
          value={searchProd}
          placeholder="Search products"
          onChange={(e) => setSearchPro(e.target.value)}
          className="w-full max-w-md px-6 py-3 rounded-full
                     bg-white shadow-md border border-gray-200
                     focus:outline-none focus:ring-2 focus:ring-black/20
                     text-sm tracking-wide"
        />
      </div>

      {/* PRODUCTS GRID */}
      <div className="max-w-7xl mx-auto px-4 pb-12
                      grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {products
          .filter((pro) => {
            const text = `${pro.brand} ${pro.model}`.toLowerCase();
            const words = searchProd.toLowerCase().trim().split(" ");
            return words.every(word => text.includes(word));
          })
          .map((pro) => {
            const isFavorite = wishlist.find((item) => item.id === pro.id);

            return (
              <div
                key={pro.id}
                className="group relative bg-white rounded-2xl
                           shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                           hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]
                           transition-all duration-300 overflow-hidden"
              >

                {/* WISHLIST */}
                <span
                  onClick={() =>
                    isFavorite ? removeFromWhishList(pro) : addToWishlist(pro)
                  }
                  className="absolute top-4 right-4 z-10 text-xl cursor-pointer
                             transition-transform duration-200 hover:scale-125"
                >
                  {isFavorite ? (
                    <i className="fa-solid fa-heart text-red-500"></i>
                  ) : (
                    <i className="fa-regular fa-heart text-gray-400"></i>
                  )}
                </span>

                {/* IMAGE */}
                <Link to={`/single-product/${pro.id}`}>
                  <div className="h-56 w-full bg-[#f5f5f7]
                                  flex items-center justify-center
                                  overflow-hidden">
                    <img
                      src={pro.image}
                      alt={pro.brand}
                      className="h-full object-contain p-6
                                 transition-transform duration-500
                                 group-hover:scale-105"
                    />
                  </div>
                </Link>

                {/* CONTENT */}
                <div className="p-5 text-center">
                  <h3 className="text-sm font-medium tracking-wide text-gray-800 truncate">
                    {pro.brand} {pro.model}
                  </h3>

                  <p className="mt-2 text-lg font-semibold text-gray-900">
                    ₹{pro.price}
                  </p>

                  {/* CTA */}
                  <button
                    onClick={() => addToCart(pro)}
                    className="mt-4 w-full py-2.5 rounded-full
                               bg-black text-white text-sm font-medium
                               transition-all duration-300
                               hover:bg-gray-900 hover:scale-[1.02]
                               active:scale-95"
                  >
                    Add to Bag
                  </button>
                </div>

              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ProductsAll;
