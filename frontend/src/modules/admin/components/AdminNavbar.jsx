// modules/admin/components/AdminNavbar.jsx

import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, ChevronDown } from "lucide-react";

export default function AdminNavbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const username = user?.name || user?.email?.split("@")[0] || "Admin";

  return (
    <div className="sticky top-0 z-40 px-6 py-4">

      {/* 🌌 Glass Container */}
      <div className="flex justify-between items-center 
                      bg-white/5 backdrop-blur-xl 
                      border border-white/10 
                      rounded-xl px-6 py-3 shadow-lg">

        {/* 🔹 Left */}
        <div>
          <h1 className="text-lg font-semibold text-white">
            Admin Panel
          </h1>
          <p className="text-xs text-slate-400">
            Manage stores & analytics
          </p>
        </div>

        {/* 🔹 Right (User Section) */}
        <div className="relative">

          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg 
                       hover:bg-white/5 transition"
          >

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <User size={16} />
            </div>

            {/* User Info */}
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-white">
                {username}
              </p>
              <p className="text-xs text-slate-400">
                {user?.email}
              </p>
            </div>

            <ChevronDown size={16} className="text-slate-400" />

          </button>

          {/* 🔽 Dropdown */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-3 w-48 
                           bg-[#0f172a] border border-white/10 
                           rounded-xl shadow-xl overflow-hidden"
              >

                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-sm text-white">{username}</p>
                  <p className="text-xs text-slate-400">{user?.email}</p>
                </div>

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-4 py-3 
                             text-sm text-red-400 hover:bg-white/5 transition"
                >
                  <LogOut size={16} />
                  Logout
                </button>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}