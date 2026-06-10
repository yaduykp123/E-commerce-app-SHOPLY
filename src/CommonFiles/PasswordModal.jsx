import { useState } from "react";
import { useStore } from "../CONTEXT/StoreContext";
import axios from "axios";
import toast from "react-hot-toast";








function PasswordModal() {

    const { opens, setOpens} = useStore()

const [password, setPassword] = useState({
    password : "",
    repassword : ""
})

function  HandleChange (e){

    const {name , value} = e.target
     setPassword((prev) =>({...prev, [name]:value}));
}



async function handleUpdate() {
    const User = JSON.parse(localStorage.getItem("USER"));

    if (password.password !== password.repassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.patch(
        `/users/${User.id}`,
        {
          password: password.password,
          repassword: password.repassword
        }
      );

      localStorage.setItem("USER", JSON.stringify(res.data));
      toast.success("Password updated successfully");
      setOpens(false);

    } catch (err) {
      console.error(err);
      toast.error("Password update failed");
    }
  }


 const User = JSON.parse(localStorage.getItem("USER"));


    if(!opens) return null

    if(!User) {
      toast.error('please login first')
    }
    

     return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setOpens(false)}
      />

      {/* MODAL */}
      <div className="relative bg-black text-white rounded-xl shadow-xl w-[90%] max-w-md p-6 z-10">
        <h2 className="text-xl font-semibold mb-4">Edit Password</h2>

        <div className="flex flex-col gap-4">
          <input
            type="password"
            name="password"
            value={password.password}
            onChange={HandleChange}
            placeholder="New password"
            className="px-4 py-2 rounded-md border border-gray-700 bg-gray-900 text-white"
          />

          <input
            type="password"
            name="repassword"
            value={password.repassword}
            onChange={HandleChange}
            placeholder="Confirm password"
            className="px-4 py-2 rounded-md border border-gray-700 bg-gray-900 text-white"
          />

          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded-md font-semibold"
          >
            Patch Password
          </button>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={() => setOpens(false)}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordModal