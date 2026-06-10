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
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (editData) {
      setForm(editData);
      setPreview(editData.image);
    } else {
      setForm(emptyForm);
      setPreview("");
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    // Append all form fields to FormData
    Object.keys(form).forEach(key => {
      if (key !== 'image' && key !== 'id' && key !== '_id') {
        formData.append(key, key === 'price' ? Number(form[key]) : form[key]);
      }
    });

    // Append the file if selected
    if (file) {
      formData.append('image', file);
    } else if (editData && editData.image) {
      // If no new file, but we are editing, keep the old image URL
      formData.append('image', editData.image);
    }

    if (editData) {
      putProducts(editData.id, formData);
    } else {
      postProducts(formData);
    }
    closeModal();
  };

  const handlePatch = () => {
    if (!editData) return;
    
    const formData = new FormData();
    let hasChanges = false;

    // Check for field changes
    for (const key in form) {
      if (key !== 'image' && key !== 'id' && key !== '_id' && form[key] !== editData[key]) {
        formData.append(key, key === "price" ? Number(form[key]) : form[key]);
        hasChanges = true;
      }
    }

    // Check for file change
    if (file) {
      formData.append('image', file);
      hasChanges = true;
    }

    if (!hasChanges) {
      closeModal();
      return;
    }

    patchProducts(editData.id, formData);
    closeModal();
  };

  const handleReset = () => {
    setForm(emptyForm);
    setFile(null);
    setPreview("");
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col transform transition-all">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              {editData ? "Edit Product" : "Create New Product"}
            </h3>
            <p className="text-sm text-slate-500 mt-1">Fill in the details below to update the inventory catalog.</p>
          </div>
          <button 
            onClick={closeModal}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors"
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-8 py-6">
          <form id="productForm" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Input Group */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Brand *</label>
              <input className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all' name="brand" value={form.brand} onChange={handleChange} placeholder="" required />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Model *</label>
              <input className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all' name="model" value={form.model} onChange={handleChange} placeholder="" required />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Price (₹) *</label>
              <input className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all' name="price" type="number" value={form.price} onChange={handleChange} placeholder="" required />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Color</label>
              <input className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all' name="color" value={form.color} onChange={handleChange} placeholder="" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Storage</label>
              <input className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all' name="storage" value={form.storage} onChange={handleChange} placeholder="" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">RAM</label>
              <input className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all' name="ram" value={form.ram} onChange={handleChange} placeholder="" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Battery</label>
              <input className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all' name="battery" value={form.battery} onChange={handleChange} placeholder="" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Camera</label>
              <input className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all' name="camera" value={form.camera} onChange={handleChange} placeholder="" />
            </div>

            {/* Image Upload Section */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-6">
                {preview && (
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-sm bg-slate-50 flex items-center justify-center p-2">
                    <img src={preview} alt="Preview" className="max-w-full max-h-full object-contain" />
                  </div>
                )}
                <div className="flex-1 space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Product Image</label>
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange}
                      className="hidden" 
                      id="imageUpload"
                    />
                    <label 
                      htmlFor="imageUpload" 
                      className="flex items-center justify-center gap-3 w-full px-4 py-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer group-hover:border-blue-400 group-hover:bg-blue-50/30 transition-all"
                    >
                      <i className="fas fa-cloud-upload-alt text-2xl text-slate-400 group-hover:text-blue-500"></i>
                      <div className="text-left">
                        <p className="font-bold text-slate-700 group-hover:text-blue-600">Click to upload image</p>
                        <p className="text-xs text-slate-500">PNG, JPG, WEBP up to 5MB</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 pt-2">
              <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} className="peer sr-only" />
                  <div className="w-12 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </div>
                <div>
                  <p className="font-bold text-slate-700">Product is In Stock</p>
                
                </div>
              </label>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-slate-100 bg-slate-50/50 flex flex-wrap justify-end gap-3 items-center">
          <button type="button" onClick={handleReset} className="px-5 py-2.5 rounded-xl text-slate-600 font-bold hover:bg-slate-200 transition-colors">
            Reset
          </button>

          {editData && (
            <button
              type="button"
              onClick={handlePatch}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-lg shadow-amber-500/30 hover:-translate-y-0.5 transition-all"
            >
              Quick Update (Patch)
            </button>
          )}

          <button 
            type="submit" 
            form="productForm"
            className={`px-8 py-2.5 rounded-xl font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 ${
              editData 
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/30" 
                : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-emerald-500/30"
            }`}
          >
            {editData ? "Save Full Changes (Put)" : "Create Product"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductsModel;