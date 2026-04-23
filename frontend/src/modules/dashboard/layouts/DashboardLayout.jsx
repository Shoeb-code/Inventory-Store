import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#020617] text-white">

      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6">
          {children}
        </main>
      </div>

    </div>
  );
}