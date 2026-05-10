import { useAuth } from "../../../context/AuthContext";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  Settings,
  ShieldCheck,
  Bell,
} from "lucide-react";

export default function AdminNavbar() {

  const {
    user,
    logout,
  } = useAuth();

  const [open, setOpen] =
    useState(false);

  const dropdownRef =
    useRef();

  const username =
    user?.name ||
    user?.email
      ?.split("@")[0] ||
    "Admin";

  // CLOSE DROPDOWN
  useEffect(() => {

    const handleClick =
      (e) => {

        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(
            e.target
          )
        ) {

          setOpen(false);
        }
      };

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClick
      );
    };

  }, []);

  return (

    <div className="sticky top-0 z-40 p-3 sm:p-5 pb-0">

      {/* NAVBAR */}
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1220]/80 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

        {/* GRID */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* TOP ACCENT */}
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />

        {/* GLOW */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.08),transparent_35%)]" />

        {/* CONTENT */}
        <div className="relative flex items-center justify-between px-4 sm:px-6 py-4">

          {/* LEFT */}
          <div className="flex items-center gap-4 min-w-0">

            {/* LOGO */}
            <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl shadow-blue-500/20 shrink-0">

              <Sparkles
                size={20}
                className="text-white"
              />

            </div>

            {/* TITLE */}
            <div className="min-w-0">

              <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-white truncate">

                InventoryPro Admin

              </h1>

              <p className="mt-1 text-xs text-slate-400 truncate">

                Enterprise inventory management platform

              </p>

            </div>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            {/* NOTIFICATION */}
            <button className="relative hidden sm:flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300">

              <Bell
                size={18}
                className="text-slate-300"
              />

              <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />

            </button>

            {/* USER */}
            <div
              className="relative"
              ref={dropdownRef}
            >

              {/* USER BUTTON */}
              <button

                onClick={() =>
                  setOpen(!open)
                }

                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-2 sm:px-3 py-2 hover:bg-white/[0.05] transition-all duration-300"
              >

                {/* AVATAR */}
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 shrink-0">

                  <User
                    size={18}
                    className="text-white"
                  />

                </div>

                {/* USER INFO */}
                <div className="hidden sm:block text-left min-w-0">

                  <p className="text-sm font-medium text-white truncate">

                    {username}

                  </p>

                  <p className="mt-0.5 text-[11px] text-slate-400 truncate">

                    {user?.email}

                  </p>

                </div>

                {/* ICON */}
                <ChevronDown

                  size={16}

                  className={`text-slate-500 transition duration-300 ${
                    open
                      ? "rotate-180 text-blue-400"
                      : ""
                  }`}
                />

              </button>

              {/* DROPDOWN */}
              <AnimatePresence>

                {open && (

                  <motion.div

                    initial={{
                      opacity: 0,
                      y: -10,
                      scale: 0.97,
                    }}

                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}

                    exit={{
                      opacity: 0,
                      y: -10,
                      scale: 0.97,
                    }}

                    transition={{
                      duration: 0.2,
                    }}

                    className="absolute right-0 mt-4 w-[340px] overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1220]/95 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.5)]"
                  >

                    {/* TOP ACCENT */}
                    <div className="h-[2px] w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />

                    {/* HEADER */}
                    <div className="relative overflow-hidden border-b border-white/5 p-6">

                      {/* GLOW */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_35%)]" />

                      <div className="relative flex items-start gap-4">

                        {/* AVATAR */}
                        <div className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl shadow-blue-500/20 shrink-0">

                          <User
                            size={24}
                            className="text-white"
                          />

                        </div>

                        {/* INFO */}
                        <div className="min-w-0 flex-1">

                          <h3 className="text-lg font-semibold text-white truncate">

                            {username}

                          </h3>

                          <p className="mt-1 text-sm text-slate-400 truncate">

                            {user?.email}

                          </p>

                          {/* ROLE */}
                          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">

                            <ShieldCheck
                              size={12}
                              className="text-emerald-400"
                            />

                            <span className="text-xs font-medium text-emerald-400">

                              Super Admin

                            </span>

                          </div>

                        </div>

                      </div>

                    </div>

                    {/* MENU */}
                    <div className="p-3 space-y-2">

                      {/* SETTINGS */}
                      <button className="group flex w-full items-center gap-4 rounded-2xl border border-transparent px-4 py-4 transition-all duration-300 hover:border-white/5 hover:bg-white/[0.04]">

                        {/* ICON */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/5 bg-white/[0.03]">

                          <Settings
                            size={18}
                            className="text-slate-300"
                          />

                        </div>

                        {/* TEXT */}
                        <div className="flex-1 text-left">

                          <p className="text-sm font-medium text-white">

                            Settings

                          </p>

                          <p className="mt-1 text-xs text-slate-500">

                            Manage account preferences

                          </p>

                        </div>

                      </button>

                      {/* DIVIDER */}
                      <div className="mx-2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                      {/* LOGOUT */}
                      <button

                        onClick={logout}

                        className="group flex w-full items-center gap-4 rounded-2xl border border-red-500/10 bg-red-500/[0.03] px-4 py-4 transition-all duration-300 hover:border-red-500/20 hover:bg-red-500/10"
                      >

                        {/* ICON */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/10 bg-red-500/10">

                          <LogOut
                            size={18}
                            className="text-red-400"
                          />

                        </div>

                        {/* TEXT */}
                        <div className="flex-1 text-left">

                          <p className="text-sm font-semibold text-red-400">

                            Logout

                          </p>

                          <p className="mt-1 text-xs text-slate-500">

                            Securely sign out from dashboard

                          </p>

                        </div>

                      </button>

                    </div>

                    {/* FOOTER */}
                    <div className="border-t border-white/5 px-6 py-4">

                      <div className="flex items-center justify-between">

                        <p className="text-[11px] text-slate-600">

                          InventoryPro SaaS

                        </p>

                        <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-1 text-[10px] font-medium text-blue-400">

                          v2.0

                        </div>

                      </div>

                    </div>

                  </motion.div>

                )}

              </AnimatePresence>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}