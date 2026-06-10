import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";
import { useAdminProduct } from "../context/ProductContext";
import ProductsModel from "./Model/ProductsModel";

const Products = () => {
  const { getProducts, products, deleteProducts, setEditData } = useAdminProduct();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  
  useEffect(() => {
    const fetchAdminProducts = async () => {
      setLoading(true);
      const data = await getProducts(search, page, 6);
      if (data) {
        setTotalPages(Math.ceil(data.total / 6));
      }
      setLoading(false);
    };

    const timer = setTimeout(() => fetchAdminProducts(), 300);
    return () => clearTimeout(timer);
  }, [search, page]);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  // CREATE
  const handleCreate = () => {
    setEditData(null);
    setOpen(true);
  };

  // EDIT
  const handleEdit = (product) => {
    setEditData(product);
    setOpen(true);
  };

  return (
    <div className="animate-fade-in relative z-10">
      <div className="mb-8 flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">
        <div className="flex-1">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Product Management</h2>
          <p className="text-slate-500 mt-1">Manage product catalog, pricing, and stock levels</p>
          
          <div className="mt-6 relative max-w-md">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="Search by brand or model..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm"
            />
          </div>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-200 h-fit"
        >
          <i className="fas fa-plus"></i> Create Product
        </button>
      </div>

      {open && <ProductsModel closeModal={() => setOpen(false)} />}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            {/* Image Container */}
            <div className="h-56 bg-slate-50 relative overflow-hidden flex items-center justify-center p-6 border-b border-slate-100">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-100/50 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src={product.image}
                alt={product.model}
                className="h-full object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500 ease-out"
              />
              <div className="absolute top-4 right-4">
                <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-lg shadow-sm backdrop-blur-md ${
                  product.inStock
                    ? "bg-emerald-500/90 text-white"
                    : "bg-red-500/90 text-white"
                }`}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-1">{product.brand}</p>
                  <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
                    {product.model}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-slate-800">₹{product.price?.toLocaleString()}</p>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-x-2 gap-y-3 my-5 py-4 border-t border-b border-slate-100">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">RAM</span>
                  <span className="text-sm font-semibold text-slate-700">{product.ram || 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Storage</span>
                  <span className="text-sm font-semibold text-slate-700">{product.storage || 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Battery</span>
                  <span className="text-sm font-semibold text-slate-700">{product.battery || 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Color</span>
                  <span className="text-sm font-semibold text-slate-700">{product.color || 'N/A'}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-auto grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-bold transition-colors"
                >
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button
                  onClick={() => deleteProducts(product.id)}
                  className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white py-2.5 rounded-xl font-bold transition-colors"
                >
                  <i className="fas fa-trash-alt"></i> Delete
                </button>
              </div>
          </div>
        </div>
      ))}
    </div>

      {/* Simple Pagination UI */}
      {products.length > 0 && (
        <div className="mt-12 flex justify-center items-center gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <i className="fas fa-chevron-left mr-2"></i> Previous
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Page</span>
            <span className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30">
              {page}
            </span>
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">of {totalPages}</span>
          </div>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            Next <i className="fas fa-chevron-right ml-2"></i>
          </button>
        </div>
      )}



      {products.length === 0 && !loading && (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 mt-8">
          <i className="fas fa-box-open text-5xl mb-4 text-slate-300"></i>
          <h3 className="text-xl font-bold text-slate-700 mb-1">No products found</h3>
          <p>Try adjusting your search or create a new product.</p>
        </div>
      )}
    </div>
  );
};

export default Products;
