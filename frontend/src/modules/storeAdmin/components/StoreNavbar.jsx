// modules/storeAdmin/components/StoreNavbar.jsx

import { User, LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { motion } from "framer-motion";

export default function StoreNavbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.includes("inventory")) return "Inventory";
    if (location.pathname.includes("sales")) return "Sales";
    if (location.pathname.includes("reports")) return "Reports";
    return "Dashboard";
  };

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 px-6 py-4 
                 backdrop-blur-2xl 
                 bg-gradient-to-r from-[#0f172a]/80 via-[#1e293b]/70 to-[#020617]/80
                 border-b border-white/10 shadow-lg"
    >

      <div className="flex justify-between items-center">

        {/* 🔹 LEFT */}
        <div>
          <motion.h1
            key={getTitle()}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-semibold text-white tracking-wide"
          >
            {getTitle()}
          </motion.h1>

          <p className="text-xs text-slate-400 mt-0.5">
            Smart inventory control
          </p>
        </div>

        {/* 🔹 RIGHT */}
        <div className="flex items-center gap-4">

          {/* 🔥 STORE CARD */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative flex items-center gap-3 
                       px-4 py-2 rounded-xl 
                       bg-white/5 border border-white/10 
                       backdrop-blur-lg shadow-md overflow-hidden"
          >

            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 blur-xl opacity-50" />

            <div className="relative flex items-center gap-3">

              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-full shadow-lg">
                <User size={14} className="text-white" />
              </div>

              <div className="text-xs">
                <p className="text-white font-medium tracking-wide">
                  {user?.storeCode || "STORE"}
                </p>
                <p className="text-slate-400 text-[10px]">
                  Store Admin
                </p>
              </div>

            </div>
          </motion.div>

          {/* 🔥 LOGOUT */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg
                       bg-red-500/10 border border-red-500/20
                       text-red-400 hover:text-red-300 hover:bg-red-500/20
                       transition-all duration-300 text-xs"
          >
            <LogOut size={14} />
            Logout
          </motion.button>

        </div>
      </div>
    </motion.div>
  );
}