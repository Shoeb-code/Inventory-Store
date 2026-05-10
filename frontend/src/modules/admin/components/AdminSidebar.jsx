import { NavLink }
from "react-router-dom";

import {
  LayoutDashboard,
  PlusCircle,
  Store,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Settings,
  LogOut,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useState,
  useEffect,
} from "react";

const menu = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },

  {
    name: "Create Store",
    path: "/admin/create-store",
    icon: PlusCircle,
  },

  {
    name: "All Stores",
    path: "/admin/stores",
    icon: Store,
  },
];

export default function AdminSidebar() {

  const [collapsed,
    setCollapsed] =
      useState(false);

  useEffect(() => {

    const saved =
      localStorage.getItem(
        "sidebar"
      );

    if (saved) {
      setCollapsed(
        JSON.parse(saved)
      );
    }

  }, []);

  const toggleSidebar =
    () => {

      localStorage.setItem(
        "sidebar",
        JSON.stringify(
          !collapsed
        )
      );

      setCollapsed(
        !collapsed
      );
    };

  return (
    <motion.div
      animate={{
        width: collapsed
          ? 88
          : 280,
      }}
      transition={{
        duration: 0.25,
      }}
      className="h-screen sticky top-0 border-r border-white/10 bg-[#020617]/95 backdrop-blur-2xl flex flex-col overflow-hidden"
    >

      {/* GLOW */}
      <div className="absolute top-0 left-0 w-full h-52 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />

      {/* HEADER */}
      <div className="relative z-10 p-4 border-b border-white/5">

        <div className="flex items-center justify-between">

          {/* LOGO */}
          <AnimatePresence mode="wait">

            {!collapsed ? (

              <motion.div
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -10,
                }}
                className="flex items-center gap-3"
              >

                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">

                  <Sparkles
                    size={18}
                    className="text-white"
                  />

                </div>

                <div>

                  <h1 className="text-white font-semibold tracking-tight text-lg">
                    InventoryPro
                  </h1>

                  <p className="text-[11px] text-slate-400 mt-0.5">
                    SaaS Admin Panel
                  </p>

                </div>

              </motion.div>

            ) : (

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20"
              >

                <Sparkles
                  size={18}
                  className="text-white"
                />

              </motion.div>

            )}

          </AnimatePresence>

          {/* TOGGLE */}
          {!collapsed && (

            <button
              onClick={
                toggleSidebar
              }
              className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition flex items-center justify-center text-slate-400 hover:text-white"
            >

              <ChevronLeft
                size={16}
              />

            </button>

          )}

        </div>

        {/* COLLAPSED TOGGLE */}
        {collapsed && (

          <button
            onClick={
              toggleSidebar
            }
            className="mt-4 w-full flex items-center justify-center"
          >

            <div className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition flex items-center justify-center text-slate-400 hover:text-white">

              <ChevronRight
                size={16}
              />

            </div>

          </button>

        )}

      </div>

      {/* MENU */}
      <div className="flex-1 p-3 space-y-1 overflow-y-auto">

        {menu.map((item) => {

          const Icon =
            item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
            >

              {({
                isActive,
              }) => (

                <motion.div
                  whileHover={{
                    x: 3,
                  }}
                  className={`relative flex items-center gap-3 px-3 py-3 rounded-2xl transition-all group overflow-hidden ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/10 border border-blue-500/20 text-white shadow-lg shadow-blue-500/5"
                      : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >

                  {/* ACTIVE GLOW */}
                  {isActive && (

                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-2xl border border-blue-500/20"
                    />

                  )}

                  {/* ACTIVE BAR */}
                  {isActive && (

                    <motion.div
                      layoutId="active-bar"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-blue-500"
                    />

                  )}

                  {/* ICON */}
                  <div
                    className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive
                        ? "bg-blue-500/10 text-blue-400"
                        : "bg-white/[0.03]"
                    }`}
                  >

                    <Icon size={18} />

                  </div>

                  {/* TEXT */}
                  <AnimatePresence>

                    {!collapsed && (

                      <motion.div
                        initial={{
                          opacity: 0,
                          x: -8,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: -8,
                        }}
                        className="relative z-10 min-w-0"
                      >

                        <p className="text-sm font-medium truncate">
                          {item.name}
                        </p>

                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Manage
                          {" "}
                          {item.name}
                        </p>

                      </motion.div>

                    )}

                  </AnimatePresence>

                  {/* TOOLTIP */}
                  {collapsed && (

                    <div className="absolute left-20 opacity-0 group-hover:opacity-100 pointer-events-none bg-black text-white text-xs px-3 py-2 rounded-xl whitespace-nowrap transition-all shadow-2xl border border-white/10">

                      {item.name}

                    </div>

                  )}

                </motion.div>

              )}

            </NavLink>
          );
        })}

      </div>

      {/* FOOTER */}
      <div className="p-3 border-t border-white/5">

        {/* ADMIN CARD */}
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/5 p-3">

          <div className="flex items-center gap-3">

            {/* AVATAR */}
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/10">

              <ShieldCheck
                size={18}
                className="text-white"
              />

            </div>

            {/* INFO */}
            {!collapsed && (

              <div className="min-w-0 flex-1">

                <p className="text-sm font-medium text-white truncate">
                  Super Admin
                </p>

                <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                  admin@inventorypro.com
                </p>

              </div>

            )}

          </div>

          {/* ACTIONS */}
          {!collapsed && (

            <div className="flex items-center gap-2 mt-4">

              <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition text-xs text-slate-300">

                <Settings
                  size={14}
                />

                Settings

              </button>

              <button className="w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition flex items-center justify-center text-red-400">

                <LogOut
                  size={14}
                />

              </button>

            </div>

          )}

        </div>

        {/* COPYRIGHT */}
        {!collapsed && (

          <p className="text-[11px] text-slate-500 text-center mt-4">
            © 2026 InventoryPro SaaS
          </p>

        )}

      </div>

    </motion.div>
  );
}