import { useEffect, useState } from "react";
import API from "../../../utils/axiosInstance";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StoreDashboard() {
  const [range, setRange] = useState("today");
  const [stats, setStats] = useState({});
  const [trend, setTrend] = useState([]);
  const [sales, setSales] = useState([]);

  // 🔥 FETCH DASHBOARD DATA
  const fetchDashboard = async () => {
    try {
      const [summaryRes, trendRes, salesRes] = await Promise.all([
        API.get(`/inventory/summary?range=${range}`),
        API.get(`/inventory/trend?range=${range}`),
        API.get(`/inventory/recent-sales`),
      ]);

      // ✅ SAFE DATA EXTRACTION
      setStats(summaryRes.data?.data || summaryRes.data || {});
      setTrend(trendRes.data?.data || trendRes.data || []);
      setSales(salesRes.data?.data || salesRes.data || []);

    } catch (err) {
      console.error("Dashboard error:", err);
      setStats({});
      setTrend([]);
      setSales([]);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [range]);

  return (
    <div className="p-6 text-white space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-sm text-slate-400">
            Store analytics overview
          </p>
        </div>

        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="bg-slate-800 border border-white/10 px-3 py-2 rounded-lg"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Revenue" value={`₹${stats.revenue || 0}`} />
        <Card title="Profit" value={`₹${stats.profit || 0}`} />
        <Card title="Sales" value={stats.sales || 0} />
        <Card title="Stock" value={stats.stock || 0} />
      </div>

      {/* CHART */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <h2 className="text-sm text-slate-400 mb-3">
          Revenue & Profit Trend
        </h2>

        <div className="h-60">
          {trend.length === 0 ? (
            <p className="text-center text-slate-400 text-sm">
              No data available
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend}>
                <XAxis dataKey="date" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />

                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#22c55e"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* RECENT SALES */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <h2 className="text-sm text-slate-400 mb-3">
          Recent Sales
        </h2>

        {sales.length === 0 ? (
          <p className="text-slate-400 text-sm">
            No recent sales
          </p>
        ) : (
          <div className="space-y-2 text-sm">
            {sales.map((s, i) => (
              <div key={i} className="flex justify-between">
                <span>{s.productName || "Product"}</span>
                <span className="text-green-400">
                  ₹{s.amount || 0}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// 🔹 KPI CARD
const Card = ({ title, value }) => (
  <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#020617] border border-white/10">
    <p className="text-xs text-slate-400">{title}</p>
    <h2 className="text-xl font-semibold mt-2">{value}</h2>
  </div>
);