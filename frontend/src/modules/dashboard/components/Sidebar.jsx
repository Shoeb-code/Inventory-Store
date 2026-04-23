import { useAuth } from "../../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Boxes,
  ArrowLeftRight,
  Store,
  LogOut
} from "lucide-react";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: user?.role === "SUPER_ADMIN" ? "/admin" : "/store"
    },
    {
      name: "Inventory",
      icon: <Boxes size={18} />,
      path: "/inventory"
    },
    {
      name: "Transfers",
      icon: <ArrowLeftRight size={18} />,
      path: "/transfers"
    }
  ];

  if (user?.role === "SUPER_ADMIN") {
    menu.push({
      name: "Manage Stores",
      icon: <Store size={18} />,
      path: "/stores"
    });
  }

  return (
    <div className="w-64 bg-[#0b1120] border-r border-white/10 flex flex-col p-5">

      {/* LOGO */}
      <div className="mb-10">
        <h1 className="text-xl font-bold text-white tracking-wide">
          Inventory 🚀
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Admin Panel
        </p>
      </div>

      {/* MENU */}
      <div className="flex flex-col gap-2 text-sm">

        {menu.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <div
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all
              ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          );
        })}

      </div>

      {/* USER + LOGOUT */}
      <div className="mt-auto pt-6 border-t border-white/10">

        {/* User Info */}
        <div className="flex items-center gap-3 mb-4">

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center font-semibold">
            {user?.email?.[0]?.toUpperCase()}
          </div>

          <div className="text-xs">
            <p className="text-white">{user?.email}</p>
            <p className="text-gray-400">
              {user?.role === "SUPER_ADMIN" ? "Super Admin" : "Store Admin"}
            </p>
          </div>

        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-400 py-2 rounded-lg hover:bg-red-500/20 transition"
        >
          <LogOut size={16} />
          Logout
        </button>

      </div>

    </div>
  );
}