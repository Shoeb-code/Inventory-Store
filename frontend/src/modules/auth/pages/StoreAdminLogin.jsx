// modules/auth/pages/StoreAdminLogin.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import AuthForm from "../components/AuthForm";
import { loginStoreAdmin } from "../authAPI";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";

const StoreAdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    storeId: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isValid =
    formData.storeId && formData.password.length >= 6;

    const handleSubmit = async () => {
      if (!isValid) {
        return toast.error("Please fill all fields correctly");
      }
    
      try {
        setLoading(true);
    
        const res = await loginStoreAdmin(formData);
    
        // 🔥 FIX (IMPORTANT)
        login({
          accessToken: res.accessToken,
          user: res.user,
        });
    
        toast.success("Login successful 🚀");
    
        navigate("/store/dashboard");
    
      } catch (err) {
        console.log(err);
        toast.error(
          err.response?.data?.message || "Login failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="space-y-6">

      {/* 🔹 Heading */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-white">
          Store Admin Login
        </h1>
        <p className="text-sm text-slate-400 max-w-sm mx-auto">
          Access your store dashboard, manage inventory, and track sales performance in real-time.
        </p>
      </div>

      {/* 🔹 Card */}
      <AuthCard title="Sign in to your store">
        <AuthForm
          fields={[
            {
              name: "storeId",
              type: "text",
              placeholder: "Enter Store ID",
            },
            {
              name: "password",
              type: "password",
              placeholder: "Enter Password",
            },
          ]}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          buttonText={loading ? "Logging in..." : "Login"}
          loading={loading}
        />

        {/* 🔹 Extra Links */}
        <div className="flex justify-between text-xs mt-3 text-slate-400">
          <span className="hover:text-white cursor-pointer">
            Forgot Password?
          </span>
          <span className="hover:text-white cursor-pointer">
            Need Help?
          </span>
        </div>

      </AuthCard>

    </div>
  );
};

export default StoreAdminLogin;