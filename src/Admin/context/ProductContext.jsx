import axios from "axios";
import {  createContext, useContext, useState } from "react";



const AdminPrductContext = createContext();


export const AdminProductProvider  = ({children}) => {

 const [products, setProducts] = useState([]);
 const [editData, setEditData]  = useState()
   const APIURL = "http://localhost:31234"

   
   const getProducts = async() => {
      await axios.get(`${APIURL}/products`)
       .then(res =>setProducts(res.data))
    }
   
    const postProducts = async(products) =>{
     const res = await axios.post(`${APIURL}/products`,products)
      setProducts((data) => [...data, res.data])
    }

    const putProducts = async(id, products) => {
      const  res =   await axios.put(`${APIURL}/products/${id}`,products)
         setProducts(prev => prev.map((data) => (data.id === id? res.data: data)))
    }

    const patchProducts = async(id, products) => { 
       const  res =  await axios.patch (`${APIURL}/products/${id}`,products)
         setProducts((prev) => prev.map((data) => (data.id === id? res.data: data)))
    }


    const deleteProducts = async(id) => {
      await  axios.delete(`${APIURL}/products/${id}`)
    setProducts((datas) => datas.filter((data) => (data.id !== id)))
    }



 

    return (

<AdminPrductContext.Provider value={{products, setProducts, getProducts, postProducts, putProducts, patchProducts, deleteProducts, editData, setEditData}} >
      {children}
</AdminPrductContext.Provider>
    )

}


export function useAdminProduct (){
    return useContext(AdminPrductContext)
}