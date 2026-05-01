import { NavLink } from "react-router-dom";
import { LayoutDashboard, PlusCircle, Store, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const menu = [
  { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Create Store", path: "/admin/create-store", icon: PlusCircle },
  { name: "All Stores", path: "/admin/stores", icon: Store },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar");
    if (saved) setCollapsed(JSON.parse(saved));
  }, []);

  const toggleSidebar = () => {
    localStorage.setItem("sidebar", JSON.stringify(!collapsed));
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`h-screen relative transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Background (reduce blur for performance) */}
      <div className="absolute inset-0 bg-[#020617]/90 border-r border-white/10" />

      <div className="relative z-10 flex flex-col h-full p-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <div>
              <h1 className="text-lg font-semibold text-white">
                InventoryPro
              </h1>
              <p className="text-xs text-slate-400">Admin Panel</p>
            </div>
          )}

          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-2">

          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink key={item.name} to={item.path}>
                {({ isActive }) => (
                  <div
                    className={`group relative flex items-center gap-3 px-3 py-3 rounded-xl transition
                      ${
                        isActive
                          ? "bg-blue-600/20 text-white"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                  >

                    {/* Active Indicator (keep motion only here) */}
                    {isActive && (
                      <motion.div
                        layoutId="active-bar"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r"
                      />
                    )}

                    {/* Icon */}
                    <Icon size={18} />

                    {/* Text */}
                    {!collapsed && (
                      <span className="text-sm font-medium">
                        {item.name}
                      </span>
                    )}

                    {/* Tooltip */}
                    {collapsed && (
                      <div className="absolute left-12 opacity-0 group-hover:opacity-100 
                                      bg-black text-white text-xs px-2 py-1 rounded transition">
                        {item.name}
                      </div>
                    )}

                  </div>
                )}
              </NavLink>
            );
          })}

        </div>

        {/* Footer */}
        {!collapsed && (
          <div className="mt-auto pt-6 border-t border-white/10">
            <p className="text-xs text-slate-500">
              © 2026 InventoryPro
            </p>
          </div>
        )}

      </div>
    </div>
  );
}