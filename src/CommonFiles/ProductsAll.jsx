import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useStore } from '../CONTEXT/StoreContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductsAll() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { wishlist, addToWishlist, removeFromWishlist, addToCart } = useStore();

  // search
  const [searchProd, setSearchPro] = useState("");
  
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

  // Reset when search changes
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [searchProd]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/products?search=${searchProd}&page=${page}&limit=6`);
        
        setProducts(prev => {
          // If it's page 1 (due to search reset), replace. Otherwise, append.
          if (page === 1) return res.data.products;
          return [...prev, ...res.data.products];
        });
        
        setHasMore(res.data.hasMore);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // For the first page, we use a debounce to handle search typing
    // For subsequent pages, we load immediately
    if (page === 1) {
      const timer = setTimeout(() => fetchProducts(), 300);
      return () => clearTimeout(timer);
    } else {
      fetchProducts();
    }
  }, [searchProd, page]);

  return (
    <div className="bg-[#f5f5f7] min-h-screen">

      {/* SEARCH BAR */}
      <div className="py-8 flex justify-center sticky top-0 z-20 bg-[#f5f5f7]/80 backdrop-blur-md">
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

        {products.map((pro) => {
            const isFavorite = wishlist.find((item) => item.id === pro.id);

            return (
              <div
                key={pro.id}
                className="group relative bg-white rounded-2xl
                           shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                           hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]
                           transition-all duration-300 overflow-hidden"
              >

                <span
                  onClick={() =>
                    isFavorite ? removeFromWishlist(pro.id || pro._id) : addToWishlist(pro)
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

                  <button
                    onClick={() => addToCart(pro)}
                    disabled={!pro.inStock}
                    className={`mt-4 w-full py-2.5 rounded-full text-sm font-medium transition-all duration-300
                               ${pro.inStock 
                                 ? "bg-black text-white hover:bg-gray-900 hover:scale-[1.02] active:scale-95" 
                                 : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
                  >
                    {pro.inStock ? "Add to Bag" : "Out of Stock"}
                  </button>
                </div>

              </div>
            );
          })}
      </div>

      {/* SENTINEL ELEMENT FOR INFINITE SCROLL */}
      <div ref={sentinelRef} className="h-10 w-full"></div>

      {/* LOADING SPINNER */}
      {loading && (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-black/10 border-t-black rounded-full animate-spin"></div>
        </div>
      )}

      
    </div>
  );
}

export default ProductsAll;
