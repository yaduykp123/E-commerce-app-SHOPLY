import React, { useEffect, useState } from 'react'
import { useAdminProduct } from '../../context/ProductContext';



const emptyForm = {
  brand: "",
  model: "",
  price: "",
  storage: "",
  ram: "",
  color: "",
  battery: "",
  camera: "",
  image: "",
  inStock: true,
};



function ProductsModel({ closeModal }) {
  const { postProducts, putProducts, patchProducts, editData } = useAdminProduct();

  const [form, setForm] = useState(emptyForm);

   // Autofill when editing
  useEffect(() => {
    if (editData) setForm(editData);
    else setForm(emptyForm);
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert number fields
    const payload = {
      ...form,
      price: Number(form.price),
    };

    if (editData) {
    // UPDATE (PUT)
      putProducts(editData.id, payload);
    } else {
      // CREATE (POST)
      postProducts(payload);
    }

    closeModal();
  };

  // PATCH  (only changed fields)
  const handlePatch = () => {
    if (!editData) return;

    const changes = {
      price: Number(form.price),
      inStock: form.inStock,
      storage: form.storage
    };
    patchProducts(editData.id, changes);
    closeModal();
  };

  const handleReset = () => setForm(emptyForm);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-black p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        <h3 className="text-xl font-bold mb-4">
          {editData ? "Edit Product" : "Create Product"}
        </h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 text-white bg-black">

          <input className='px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none'  name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" required />
          <input className='px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none' name="model" value={form.model} onChange={handleChange} placeholder="Model" required />
          <input className='px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none' name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" required />
          <input className='px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none' name="storage" value={form.storage} onChange={handleChange} placeholder="Storage" />
          <input className='px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none' name="ram" value={form.ram} onChange={handleChange} placeholder="RAM " />
          <input className='px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none' name="color" value={form.color} onChange={handleChange} placeholder="Color" />
          <input className='px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none' name="battery" value={form.battery} onChange={handleChange} placeholder="Battery" />
          <input className='px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none' name="camera" value={form.camera} onChange={handleChange} placeholder="Camera" />
          <input className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none col-span-2" name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />

          <label className="flex items-center gap-2 col-span-2">
            <input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} />
            In Stock
          </label>

          <div className="col-span-2 flex justify-end gap-3 pt-4">
            <button type="button" onClick={handleReset} className="border px-4 py-2">
              Reset
            </button>

            {editData && (
              <button
                type="button"
                onClick={handlePatch}
                className="bg-yellow-500 text-white px-4 py-2"
              >
                Patch
              </button>
            )}

            <button type="submit" className="bg-green-600 text-white px-4 py-2">
              {editData ? "Update" : "Create"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};


export default ProductsModel