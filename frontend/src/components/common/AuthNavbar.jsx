// components/common/AuthNavbar.jsx

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Box } from "lucide-react";

const AuthNavbar = () => {
  const location = useLocation();

  const isAdmin = location.pathname.includes("/admin");
  const isStoreLogin = location.pathname === "/login";
  const isAdminLogin = location.pathname === "/admin/login";

  return (
    <div className="absolute top-0 left-0 w-full z-50 px-6 py-4">

      {/* Glass Container */}
      <div className="flex justify-between items-center max-w-7xl mx-auto 
                      bg-white/5 backdrop-blur-md border border-white/10 
                      rounded-xl px-6 py-3 shadow-lg">

        {/* 🔹 Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Box size={18} className="text-white" />
          </div>
          <span className="text-lg font-semibold text-white tracking-wide">
            InventoryPro
          </span>
        </Link>

        {/* 🔹 Navigation */}
        <div className="flex items-center gap-4 text-sm">

          {/* Store Login */}
          <Link
            to="/login"
            className={`px-4 py-1.5 rounded-lg transition ${
              isStoreLogin
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Store Login
          </Link>

         

          {/* Register Button */}
          <Link
            to="/admin/register"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg transition"
          >
           Super-Admin Register
          </Link>

        </div>
      </div>
    </div>
  );
};

export default AuthNavbar;