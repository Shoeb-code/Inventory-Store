import DashboardLayout from "../layouts/DashboardLayout.jsx";
import StatCard from "../components/StatCard.jsx";
import { useEffect, useState } from "react";
import { getStoreDashboard } from "./../dashboardAPI.js";
import toast from "react-hot-toast";

import {
  Package,
  Laptop,
  Smartphone,
  IndianRupee
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function StoreDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStoreDashboard();
        setData(res.data);
      } catch (err) {
        toast.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Proper loading state
  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-white p-6">Loading dashboard...</div>
      </DashboardLayout>
    );
  }

  // ✅ Safety fallback
  if (!data) {
    return (
      <DashboardLayout>
        <div className="text-red-400 p-6">No data found</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">
          Store Dashboard
        </h1>
        <p className="text-gray-400 text-sm">
          Real-time analytics of your store
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4 mb-8">

        <StatCard
          title="Products in Stock"
          value={data?.totalStock || 0}
          icon={<Package size={18} />}
        />

        <StatCard
          title="Laptops Sold"
          value={data?.laptopsSold || 0}
          icon={<Laptop size={18} />}
        />

        <StatCard
          title="Phones Sold"
          value={data?.phonesSold || 0}
          icon={<Smartphone size={18} />}
        />

        <StatCard
          title="Total Profit"
          value={`₹${data?.totalProfit || 0}`}
          icon={<IndianRupee size={18} />}
        />

      </div>

      {/* CHART */}
      <div className="bg-[#0f172a] p-5 rounded-xl border border-white/10 mb-8">
        <h2 className="text-lg mb-4">Sales Overview 📊</h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data?.salesChart || []}>
            <XAxis dataKey="day" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* SECOND ROW */}
      <div className="grid grid-cols-2 gap-6">

        {/* RECENT SALES */}
        <div className="bg-[#0f172a] p-5 rounded-xl border border-white/10">
          <h2 className="text-lg mb-4">Recent Sales</h2>

          {(data?.recentSales || []).length === 0 ? (
            <p className="text-gray-400 text-sm">No sales yet</p>
          ) : (
            data.recentSales.map((item, i) => (
              <div
                key={i}
                className="flex justify-between text-gray-400 mb-2"
              >
                <span>{item.name}</span>
                <span>₹{item.amount}</span>
              </div>
            ))
          )}
        </div>

        {/* LOW STOCK */}
        <div className="bg-[#0f172a] p-5 rounded-xl border border-white/10">
          <h2 className="text-lg mb-4">Low Stock ⚠️</h2>

          {(data?.lowStock || []).length === 0 ? (
            <p className="text-gray-400 text-sm">All stock healthy ✅</p>
          ) : (
            data.lowStock.map((item, i) => (
              <div
                key={i}
                className="flex justify-between text-red-400 mb-2"
              >
                <span>{item.name}</span>
                <span>{item.qty} left</span>
              </div>
            ))
          )}
        </div>

      </div>

    </DashboardLayout>
  );
}