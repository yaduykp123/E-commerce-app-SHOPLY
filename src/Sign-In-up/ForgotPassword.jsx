import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter your email");
    }
    
    setLoading(true);
    try {
      const res = await axios.post("/auth/forgot-password", { email });
      toast.success("Password reset link sent to your email!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
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
            Forgot Password
          </h2>
          <p className="text-center text-blue-100 mb-6 text-sm">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <div className="mb-6">
            <label className="block text-sm mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-2 rounded-lg
                         bg-white/20 border border-white/30
                         focus:outline-none focus:ring-2 
                         focus:ring-blue-400 placeholder:text-blue-200/50"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg 
                       bg-gradient-to-r from-blue-500 to-purple-600 
                       hover:scale-105 transition duration-300 
                       shadow-lg font-semibold disabled:opacity-50 disabled:scale-100"
          >
            {loading ? "Sending..." : "Reset Password"}
          </button>

          <div className="mt-6 text-center text-sm">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-200 hover:text-white transition-colors underline underline-offset-4"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
