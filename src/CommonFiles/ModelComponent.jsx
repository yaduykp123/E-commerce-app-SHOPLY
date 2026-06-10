import React, { useEffect, useState } from 'react'
import { useStore } from '../CONTEXT/StoreContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ModelComponent() {

    const {open, setOpen} = useStore()


    const [email , setEmail] = useState("")

   useEffect(() => {
  if (open) {
    const User = JSON.parse(localStorage.getItem("USER"));
    if (User?.email) {
      setEmail(User.email);
    }
  }
}, [open]);



    async function handleUpdate(e){
        e.preventDefault();

         const User = JSON.parse(localStorage.getItem("USER"));

        try{

            const res = await axios.patch(` /users/${User?.id}`,{
                email
            })

            localStorage.setItem('USER',JSON.stringify(res.data));

            toast.success("Email Updated Successfully")

            setOpen(false)
        }
        catch (err){
               console.error(err);
               toast.error("Email update failed!")
        }
    }


     if (!open) return null;

    //  if (!User) return toast.error("Please Login")
   return (
     <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={()=> setOpen(false)}
    >
      <div
        className="bg-black text-white rounded-xl shadow-xl w-[90%] max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-2">
         Edit email
        </h2>

      <div className="flex flex-col sm:flex-row items-center gap-4 p-6 bg-black rounded-lg">
  {/* Input Field */}
  <input 
    value={email} 
    onChange={(e) => setEmail(e.target.value)} 
    type="email" 
    placeholder="Enter your email"
    className="w-full sm:w-75 px-4 py-2 rounded-md border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
  />

  {/* Patch Button */}
  <button 
    onClick={handleUpdate} 
    className="w-full sm:w-auto px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-md shadow-lg transform active:scale-95 transition-all"
  >
    Patch
  </button>
</div>

        <div className="flex justify-end">
          <button
            onClick={()=> setOpen(false)}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
   
  );
}

export default ModelComponent