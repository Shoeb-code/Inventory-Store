import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Admin
import AdminSidebar from "../modules/admin/components/AdminSidebar";
import AdminNavbar from "../modules/admin/components/AdminNavbar";

// Store Admin
import StoreSidebar from "../modules/storeAdmin/components/StoreSidebar";
import StoreNavbar from "../modules/storeAdmin/components/StoreNavbar";

export default function RoleBasedLayout() {
  const { user } = useAuth();

  if (!user) return null;

  const isAdmin = user.role === "SUPER_ADMIN";

  const Sidebar = isAdmin ? AdminSidebar : StoreSidebar;
  const Navbar = isAdmin ? AdminNavbar : StoreNavbar;

  return (
    <div className="flex min-h-screen bg-[#020617] text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}