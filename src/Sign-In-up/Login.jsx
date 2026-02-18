import useCustomHook from "../../public/CustomHook";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../public/StoreContext";
import { useAuth } from "../Admin/context/AuthContext";

const Login = () => {
  const { login } = useStore();
  const { loginAdmin } = useAuth();
  const { ValidateData, loginInput, handleChangeLogin, error } = useCustomHook();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!ValidateData(loginInput)) return;

    axios
      .get(
        `http://localhost:31234/users?email=${loginInput.email}&password=${loginInput.password}`
      )
      .then((res) => {
        if (res.data.length === 0) {
          toast.error("Invalid email or password");
          return;
        }

        const user = res.data[0];

        if (user.role === "user" && user.isBlock) {
          toast.error("Your account is blocked by admin");
          return;
        }

        if (user.role === "admin") {
          loginAdmin(user);
          navigate("/admin");
        } else {
          login(user.id, user);
          navigate("/");
        }

        toast.success("Login successful");
      })
      .catch(() => toast.error("Login failed"));
  };


  return (
  <div
  className="min-h-screen flex items-center justify-center px-4 
             bg-cover bg-center relative"
  style={{
    backgroundImage:
      "url('https://www.cnet.com/a/img/resize/4a7df9d426dcfc7b548643c64bcae2d4b0730517/hub/2026/02/03/71e5e01d-c346-416a-b7f3-5b6922b19ccb/best-phone-battery-cnet-1.png?auto=webp&fit=crop&height=675&width=1200')",
  }}
>

  <div className="absolute inset-0 
                  bg-gradient-to-br 
                  from-blue-900/70 
                  via-purple-900/60 
                  to-blue-800/70">
  </div>


  <div
    className="relative w-full max-w-md 
               bg-white/15 
               backdrop-blur-md 
               border border-white/30 
               rounded-2xl 
               shadow-2xl"
  >
    <form className="p-6 sm:p-8 text-white" onSubmit={handleSubmit}>
      
      <h2 className="text-3xl font-bold text-center mb-6">
        Login{" "}
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 
                         bg-clip-text text-transparent font-extrabold">
          SHOPLY
        </span>
      </h2>

  
      <div className="mb-4">
        <label className="block text-sm mb-1">Email</label>
        <input
          type="text"
          name="email"
          value={loginInput.email || ""}
          onChange={handleChangeLogin}
          className="w-full px-4 py-2 rounded-lg
                     bg-white/20 border border-white/30
                     focus:outline-none focus:ring-2 
                     focus:ring-blue-400"
        />
        <p className="text-red-300 text-sm mt-1">{error?.email}</p>
      </div>

    
      <div className="mb-6">
        <label className="block text-sm mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={loginInput.password || ""}
          onChange={handleChangeLogin}
          className="w-full px-4 py-2 rounded-lg
                     bg-white/20 border border-white/30
                     focus:outline-none focus:ring-2 
                     focus:ring-purple-400"
        />
        <p className="text-red-300 text-sm mt-1">{error?.password}</p>
      </div>

      <button
        type="submit"
        className="w-full py-2 rounded-lg 
                   bg-gradient-to-r from-blue-500 to-purple-600 
                   hover:scale-105 transition duration-300 
                   shadow-lg font-semibold"
      >
        Login
      </button>
    </form>
  </div>
</div>


  );
};

export default Login;
