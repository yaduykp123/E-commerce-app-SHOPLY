import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const AdminProductContext = createContext();

export const AdminProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [editData, setEditData] = useState();
  const APIURL = "";

  const getProducts = async (search = "", page = 1, limit = 6) => {
    try {
      const res = await axios.get(`${APIURL}/products?search=${search}&page=${page}&limit=${limit}`);
      
      setProducts(res.data.products || []);
        
      return res.data;
    } catch (err) {
      toast.error("Failed to fetch products");
      console.error(err);
    }
  };

  const postProducts = async (products) => {
    try {
      const res = await axios.post(`${APIURL}/products`, products);
      setProducts((data) => [...data, res.data]);
      toast.success("Product created successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create product");
      console.error(err);
    }
  };

  const putProducts = async (id, products) => {
    try {
      const res = await axios.put(`${APIURL}/products/${id}`, products);
      setProducts((prev) =>
        prev.map((data) => (data.id === id ? res.data : data))
      );
      toast.success("Product updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update product");
      console.error(err);
    }
  };

  const patchProducts = async (id, products) => {
    try {
      const res = await axios.patch(`${APIURL}/products/${id}`, products);
      setProducts((prev) =>
        prev.map((data) => (data.id === id ? res.data : data))
      );
      toast.success("Product patched successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to patch product");
      console.error(err);
    }
  };

  const deleteProducts = async (id) => {
    try {
      await axios.delete(`${APIURL}/products/${id}`);
      setProducts((datas) => datas.filter((data) => data.id !== id));
      toast.success("Product deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete product");
      console.error(err);
    }
  };

  return (
    <AdminProductContext.Provider
      value={{
        products,
        setProducts,
        getProducts,
        postProducts,
        putProducts,
        patchProducts,
        deleteProducts,
        editData,
        setEditData,
      }}
    >
      {children}
    </AdminProductContext.Provider>
  );
};

export function useAdminProduct() {
  return useContext(AdminProductContext);
}