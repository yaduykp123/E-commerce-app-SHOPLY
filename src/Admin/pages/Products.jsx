import axios from "axios";
import { useEffect, useState } from "react";
import { useAdminProduct } from "../context/ProductContext";
import ProductsModel from "./Model/ProductsModel";
import { act } from "react";

const Products = () => {
 const {getProducts, products, setProducts, deleteProducts, setEditData } = useAdminProduct()
  const [open, setOpen] = useState(false);



     
  


 




  useEffect(() => {
     getProducts()
  }, []);




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
  <>
 

    <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products</h2>

        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          <i class="fa-solid fa-plus fa-flip text-red-800 fa-2xl"></i> <i class="fa-solid  fa-fade"> Create Product </i>
        </button>
      </div>

  {open && <ProductsModel closeModal={() => setOpen(false)} />}
  
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {products.map((product) => (
      <div
        key={product.id}
        className="bg-white rounded-xl shadow-md overflow-hidden
                   hover:shadow-xl hover:-translate-y-1
                   transition-all duration-300"
      >
      
        <div className="h-48 bg-gray-100 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.model}
            className="h-full object-contain p-4"
          />
        </div>

   
        <div className="p-5 space-y-3">
         
          <h3 className="text-lg font-semibold text-gray-800">
            {product.brand} {product.model}
          </h3>

        
          <p className="text-xs text-gray-400">
            Product ID: #{product.id}
          </p>

          <p className="text-xl font-bold text-green-600">
            ₹{product.price}
          </p>

        
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <p><strong>RAM:</strong> {product.ram}</p>
            <p><strong>Storage:</strong> {product.storage}</p>
            <p><strong>Camera:</strong> {product.camera}</p>
            <p><strong>Battery:</strong> {product.battery}</p>
            <p><strong>Color:</strong> {product.color}</p>
            <p><strong>Qty:</strong> {product.quantity}</p>
          </div>

      
          <span
            className={`inline-block text-xs font-semibold px-3 py-1 rounded-full
              ${
                product.inStock
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>

           <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleEdit(product, product.id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProducts(product.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>
          </div>
        </div>
    ))}
  </div>
</>

  );
};

export default Products;
