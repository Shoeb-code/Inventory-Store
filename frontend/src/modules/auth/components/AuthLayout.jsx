import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex bg-[#0B1120] text-white">

      {/* LEFT PANEL */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden">

        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#1E293B]" />

        {/* Glow Effects */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16">

          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Smart Inventory <br /> Management
          </h1>

          <p className="text-gray-300 text-lg mb-8 max-w-md">
            Track stock, manage multiple stores, transfer products,
            and analyze profits — all from a single powerful dashboard.
          </p>

          {/* Features */}
          <div className="space-y-3 text-sm text-gray-400">
            <p>✔ Real-time stock tracking</p>
            <p>✔ Multi-store control</p>
            <p>✔ Smart analytics & reports</p>
            <p>✔ Secure & scalable</p>
          </div>

          {/* Footer */}
          <div className="mt-12 text-xs text-gray-500">
            © 2026 Inventory System
          </div>

        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md">

          {/* Glass Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">

            {/* Header */}
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold text-white">
                Welcome Back 👋
              </h2>
              <p className="text-sm text-gray-400">
                Continue to your dashboard
              </p>
            </div>

            {/* Dynamic Content */}
            <Outlet />

          </div>

        </div>

      </div>

    </div>
  );
}