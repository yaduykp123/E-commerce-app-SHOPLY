import { useState } from "react";

function useCustomHook() {
  // register state
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
    address:{},
    role:"user",
    cart:[],
    orders:[],
    whishlist:[],
    isBlock:false
  });

  const [error, setError] = useState({});



// login state
const [loginInput , setLoginInput] = useState({
  email:"",
  password:""
})

// register
  function handleChange(event) {
    const { name, value } = event.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  // login 

  function handleChangeLogin(event){
    setLoginInput((prev) => ({
      ...prev,[event.target.name]: event.target.value
    }))
  }

function ValidateData(data) {
  let err = {};

 
  if ("name" in data) {
    if (!data.name?.trim()) {
      err.name = "Name is required!";
    }
  }

 
  if (!data.email?.trim()) {
    err.email = "Email is required!";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    err.email = "Invalid email format!";
  }

 
  if (!data.password) {
    err.password = "Password is required!";
  } else if (data.password.length < 6) {
    err.password = "Password must be at least 6 characters!";
  }

 
  if ("repassword" in data) {
    if (!data.repassword) {
      err.repassword = "Confirm password is required!";
    } else if (data.repassword !== data.password) {
      err.repassword = "Password does not match!";
    }

  }


  setError(err);
  return Object.keys(err).length === 0;
}


  return { input, error, handleChange, ValidateData,loginInput , setLoginInput, handleChangeLogin};
}

export default useCustomHook;
