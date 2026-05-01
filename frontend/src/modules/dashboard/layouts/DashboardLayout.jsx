import { Outlet } from "react-router-dom";

export default function DashboardLayout({
  Sidebar,
  Navbar,
  title,
  user,
}) {
  return (
    <div className="flex min-h-screen bg-[#020617] text-white">

      {/* Sidebar */}
      {Sidebar && <Sidebar />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        {Navbar && <Navbar title={title} user={user} />}

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
}