import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Plus,
  ChevronRight,
  Sparkles,
  Store,
  Boxes,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

const menu = [

  {
    name: "Dashboard",
    path: "/store/dashboard",
    icon: LayoutDashboard,
  },

  {
    name: "Add Product",
    path: "/store/add-product",
    icon: Plus,
  },

  {
    name: "Inventory",
    path: "/store/inventory",
    icon: Package,
  },

  {
    name: "Sales",
    path: "/store/sales",
    icon: ShoppingCart,
  },

  {
    name: "Reports",
    path: "/store/reports",
    icon: BarChart3,
  },
];

export default function StoreSidebar() {

  return (

    <aside className="relative flex h-screen w-72 flex-col overflow-hidden border-r border-white/10 bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617] text-white">

      {/* BACKGROUND GLOWS */}
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="absolute right-[-100px] bottom-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* TOP ACCENT */}
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />

      {/* CONTENT */}
      <div className="relative z-10 flex h-full flex-col">

        {/* LOGO */}
        <div className="px-6 pt-7 pb-8 border-b border-white/5">

          <div className="flex items-center gap-4">

            {/* ICON */}
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-blue-500/20 bg-blue-500/10 shadow-lg shadow-blue-500/10">

              <Boxes
                size={26}
                className="text-blue-400"
              />

            </div>

            {/* TEXT */}
            <div>

              <div className="flex items-center gap-2">

                <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">

                  InventoryPro

                </h1>

                <Sparkles
                  size={14}
                  className="text-blue-400"
                />

              </div>

              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">

                Store Panel

              </p>

            </div>

          </div>

        </div>

        {/* STORE CARD */}
        <div className="px-5 mt-6">

          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10">

                <Store
                  size={18}
                  className="text-emerald-400"
                />

              </div>

              <div>

                <p className="text-sm font-semibold">

                  Main Store

                </p>

                <p className="mt-1 text-xs text-slate-500">

                  Premium Inventory Control

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">

          {menu.map((item, index) => {

            const Icon = item.icon;

            return (

              <NavLink
                key={item.name}
                to={item.path}
              >

                {({ isActive }) => (

                  <motion.div

                    initial={{
                      opacity: 0,
                      x: -10,
                    }}

                    animate={{
                      opacity: 1,
                      x: 0,
                    }}

                    transition={{
                      delay: index * 0.05,
                    }}

                    whileHover={{
                      x: 4,
                    }}

                    whileTap={{
                      scale: 0.98,
                    }}

                    className={`group relative flex items-center justify-between overflow-hidden rounded-2xl px-4 py-3 transition-all duration-300 ${
                      isActive
                        ? "border border-blue-500/20 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                        : "hover:bg-white/[0.04]"
                    }`}
                  >

                    {/* ACTIVE GLOW */}
                    {isActive && (

                      <>

                        <motion.div

                          layoutId="activeSidebar"

                          className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-gradient-to-b from-blue-400 to-cyan-400"
                        />

                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(59,130,246,0.15),transparent_35%)]" />

                      </>

                    )}

                    {/* LEFT */}
                    <div className="relative z-10 flex items-center gap-3">

                      {/* ICON */}
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-all duration-300 ${
                          isActive
                            ? "border-blue-500/20 bg-blue-500/10 text-blue-400"
                            : "border-white/5 bg-white/[0.03] text-slate-500 group-hover:text-white"
                        }`}
                      >

                        <Icon size={18} />

                      </div>

                      {/* TEXT */}
                      <div>

                        <p
                          className={`text-sm font-medium transition ${
                            isActive
                              ? "text-white"
                              : "text-slate-300"
                          }`}
                        >

                          {item.name}

                        </p>

                        <p className="text-[11px] text-slate-500 mt-0.5">

                          Manage {item.name.toLowerCase()}

                        </p>

                      </div>

                    </div>

                    {/* RIGHT ICON */}
                    <ChevronRight

                      size={16}

                      className={`relative z-10 transition-all duration-300 ${
                        isActive
                          ? "translate-x-0 text-blue-400"
                          : "translate-x-[-4px] text-slate-600 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
                    />

                  </motion.div>

                )}

              </NavLink>

            );
          })}

        </nav>

        {/* FOOTER */}
        <div className="relative z-10 border-t border-white/5 px-5 py-5">

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-white">

                  InventoryPro

                </p>

                <p className="mt-1 text-xs text-slate-500">

                  SaaS Inventory Suite

                </p>

              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20">

                <Sparkles
                  size={16}
                  className="text-blue-400"
                />

              </div>

            </div>

            {/* VERSION */}
            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">

              <p className="text-[11px] text-slate-600">

                © 2026 InventoryPro

              </p>

              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-400">

                v2.0 Live

              </span>

            </div>

          </div>

        </div>

      </div>

    </aside>
  );
}