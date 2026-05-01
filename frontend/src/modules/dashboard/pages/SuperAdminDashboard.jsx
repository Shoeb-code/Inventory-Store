import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";
import {
  Store,
  IndianRupee,
  TrendingUp,
  ArrowLeftRight
} from "lucide-react";

export default function SuperAdminDashboard() {
  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">
          Super Admin Dashboard
        </h1>
        <p className="text-gray-400 text-sm">
          Overview of all stores and system performance
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4 mb-8">

        <StatCard
          title="Total Stores"
          value="6"
          icon={<Store size={18} />}
          trend="up"
          change="+1 new"
        />

        <StatCard
          title="Total Sales"
          value="₹12,00,000"
          icon={<IndianRupee size={18} />}
          trend="up"
          change="+15%"
        />

        <StatCard
          title="Total Profit"
          value="₹3,20,000"
          icon={<TrendingUp size={18} />}
          trend="up"
          change="+10%"
        />

        <StatCard
          title="Transfers"
          value="45"
          icon={<ArrowLeftRight size={18} />}
          trend="down"
          change="-3%"
        />

      </div>

      {/* SECOND ROW */}
      <div className="grid grid-cols-2 gap-6">

        {/* STORE PERFORMANCE */}
        <div className="bg-[#0f172a] border border-white/10 rounded-xl p-5">

          <h2 className="text-lg font-semibold mb-4">
            Top Performing Stores 🏆
          </h2>

          <div className="space-y-3 text-sm">

            <div className="flex justify-between text-gray-400">
              <span>Store A</span>
              <span>₹4,50,000</span>
            </div>

            <div className="flex justify-between text-gray-400">
              <span>Store B</span>
              <span>₹3,20,000</span>
            </div>

            <div className="flex justify-between text-gray-400">
              <span>Store C</span>
              <span>₹2,10,000</span>
            </div>

          </div>
        </div>

        {/* RECENT TRANSFERS */}
        <div className="bg-[#0f172a] border border-white/10 rounded-xl p-5">

          <h2 className="text-lg font-semibold mb-4">
            Recent Transfers 🔄
          </h2>

          <div className="space-y-3 text-sm">

            <div className="flex justify-between text-gray-400">
              <span>Store A → Store B</span>
              <span>5 Laptops</span>
            </div>

            <div className="flex justify-between text-gray-400">
              <span>Store C → Store A</span>
              <span>3 Phones</span>
            </div>

            <div className="flex justify-between text-gray-400">
              <span>Store B → Store D</span>
              <span>2 Tablets</span>
            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}