import React from "react";
import axios from "axios";
import useCustomHook from "../../public/CustomHook";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import bgPic from "../../public/PHOTOS/neon.jpg"
import SideImage from '../../public/PHOTOS/Gemini_1.png'
const Register = () => {
  const { input, error, handleChange, ValidateData } = useCustomHook();
  console.log(input)

  const navigate = useNavigate();


 async function handleSubmit(event) {
  event.preventDefault();

  if (!ValidateData(input)) return;

  const email = input.email.trim().toLowerCase();

  try {
    
    const res = await axios.get(
      `http://localhost:31234/users?email=${email}`
    );

    if (res.data.length > 0) {
      toast.error("Email already existed!");
      return; 
    }

    // if register not found
    const response = await axios.post(
      "http://localhost:31234/users",
      { ...input, email }
    );

    toast.success("Registration Successful", {
      position: "top-center",
      autoClose: 1000,
      onClose: () => navigate("/login"),
    });

    console.log("User Registered:", response.data);

  } catch (err) {
    toast.error("Registration Failed!");
    console.error("Error:", err);
  }
}


  return (
 <div
  className="min-h-screen flex items-center justify-center px-4 
             bg-cover bg-center relative overflow-hidden"
  style={{
    backgroundImage: `url(${bgPic})`
  }}
>
  
  <div
    className="absolute inset-0 
               bg-gradient-to-br 
               from-blue-900/40 
               via-purple-900/30 
               to-blue-900/40"
  ></div>


  <div className="relative w-full max-w-6xl flex 
                  rounded-3xl overflow-hidden 
                  shadow-2xl border border-white/20
                  backdrop-blur-md bg-white/10">

 
    <div className="hidden md:block md:w-1/2 relative">
      <img
        src={SideImage}
        alt="register visual"
        className="w-full h-full object-cover"
      />

      
      <div className="absolute inset-0 bg-black/30"></div>
    </div>

   
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-1/2 p-10 text-white"
    >
      <h2
        className="text-3xl font-extrabold text-center mb-6 
                   bg-gradient-to-r from-blue-400 to-purple-400 
                   bg-clip-text text-transparent"
      >
        Register
      </h2>

    
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={input.name || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg 
                     bg-white/20 border border-white/30 
                     focus:outline-none focus:ring-2 
                     focus:ring-blue-400"
        />
        <p className="text-red-300 text-sm mt-1">{error.name}</p>
      </div>

    
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={input.email || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg 
                     bg-white/20 border border-white/30 
                     focus:outline-none focus:ring-2 
                     focus:ring-purple-400"
        />
        <p className="text-red-300 text-sm mt-1">{error.email}</p>
      </div>

      
      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={input.password || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg 
                     bg-white/20 border border-white/30 
                     focus:outline-none focus:ring-2 
                     focus:ring-blue-400"
        />
        <p className="text-red-300 text-sm mt-1">{error.password}</p>
      </div>

    
      <div className="mb-6">
        <label className="block mb-1">Confirm Password</label>
        <input
          type="password"
          name="repassword"
          value={input.repassword || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg 
                     bg-white/20 border border-white/30 
                     focus:outline-none focus:ring-2 
                     focus:ring-purple-400"
        />
        <p className="text-red-300 text-sm mt-1">{error.repassword}</p>
      </div>

      <button
        type="submit"
        className="w-full py-2 rounded-lg 
                   bg-gradient-to-r from-blue-500 to-purple-600 
                   hover:scale-105 transition duration-300 
                   shadow-lg font-semibold"
      >
        Register
      </button>
    </form>

  </div>
</div>




  );
};

export default Register;
