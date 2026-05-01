import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  const linkClass =
    "block px-4 py-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white";

  return (
    <div className="w-64 bg-[#020617] border-r border-white/10 p-4">

      <h2 className="text-xl font-semibold mb-6">
        Admin Panel
      </h2>

      <nav className="space-y-2">

        <NavLink to="/admin" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/stores" className={linkClass}>
          All Stores
        </NavLink>

        <NavLink to="/admin/create-store" className={linkClass}>
          Create Store
        </NavLink>

      </nav>
    </div>
  );
}