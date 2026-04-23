import { useAuth } from "../../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="h-16 border-b border-white/10 bg-[#0b1120]/80 backdrop-blur-xl flex items-center justify-between px-6">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        <h2 className="text-lg font-semibold text-white">
          Dashboard
        </h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* Notification */}
        <div className="relative cursor-pointer">
          <span className="text-gray-400 hover:text-white text-lg">🔔</span>

          {/* Dot */}
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-sm font-semibold">
            {user?.email?.[0]?.toUpperCase()}
          </div>

          {/* Email + Role */}
          <div className="hidden md:flex flex-col text-xs">
            <span className="text-white">{user?.email}</span>
            <span className="text-gray-400">
              {user?.role === "SUPER_ADMIN" ? "Super Admin" : "Store Admin"}
            </span>
          </div>

        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="text-xs bg-red-500/10 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}