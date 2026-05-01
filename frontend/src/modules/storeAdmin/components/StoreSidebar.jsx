// modules/storeAdmin/components/StoreSidebar.jsx

import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";

const menu = [
  { name: "Dashboard", path: "/store/dashboard", icon: LayoutDashboard },
  { name: "Add Product", path: "/store/add-product", icon: Plus },
  { name: "Inventory", path: "/store/inventory", icon: Package },
  { name: "Sales", path: "/store/sales", icon: ShoppingCart },
  { name: "Reports", path: "/store/reports", icon: BarChart3 },
];

export default function StoreSidebar() {
  return (
    <div className="w-64 h-screen p-5 
                    bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617]
                    backdrop-blur-xl border-r border-white/10 relative">

      {/* 🔥 GLOW BACKGROUND */}
      <div className="absolute top-20 left-[-80px] w-60 h-60 bg-blue-500/10 blur-3xl rounded-full" />

      {/* LOGO */}
      <div className="mb-10 relative z-10">
        <h1 className="text-xl font-semibold text-white tracking-wide">
          InventoryPro
        </h1>
        <p className="text-xs text-slate-400">
          Store Panel
        </p>
      </div>

      {/* NAV */}
      <div className="flex flex-col gap-2 relative z-10">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.name} to={item.path}>
              {({ isActive }) => (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-300 relative overflow-hidden
                    ${
                      isActive
                        ? "bg-blue-600/20 text-white border border-blue-500/20 shadow-md"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                >

                  {/* 🔥 ACTIVE LEFT BAR */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r"
                    />
                  )}

                  {/* ICON */}
                  <Icon
                    size={18}
                    className={`transition-all duration-300 ${
                      isActive
                        ? "text-blue-400"
                        : "text-slate-500 group-hover:text-white"
                    }`}
                  />

                  {/* TEXT */}
                  <span className="font-medium tracking-wide">
                    {item.name}
                  </span>

                </motion.div>
              )}
            </NavLink>
          );
        })}

      </div>

      {/* 🔥 FOOTER */}
      <div className="absolute bottom-5 left-5 right-5 text-xs text-slate-500">
        © 2026 InventoryPro
      </div>

    </div>
  );
}