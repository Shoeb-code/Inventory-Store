// modules/storeAdmin/pages/Reports.jsx

import { useEffect, useState } from "react";
import API from "../../../utils/axiosInstance";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { DollarSign, Package, Star, TrendingUp } from "lucide-react";

export default function Reports() {
  const [range, setRange] = useState("today");

  // ✅ Safe default state (prevents crash)
  const [data, setData] = useState({
    revenue: 0,
    profit: 0,
    sales: 0,
    topProduct: "",
  });

  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  ///////////////////////////////////////////////////////
  // 🔥 FETCH REPORT DATA
  ///////////////////////////////////////////////////////
  const fetchReports = async () => {
    try {
      setLoading(true);
      setError("");

      const [summaryRes, trendRes] = await Promise.all([
        API.get(`/inventory/summary?range=${range}`),
        API.get(`/inventory/trend?range=${range}`),
      ]);

      // ✅ Defensive handling
      const summary = summaryRes?.data?.data || summaryRes?.data || {};
      const trendData = trendRes?.data?.data || trendRes?.data || [];

      setData({
        revenue: summary.revenue || 0,
        profit: summary.profit || 0,
        sales: summary.sales || 0,
        topProduct: summary.topProduct || "",
      });

      setTrend(trendData);

    } catch (err) {
      console.error(err);
      setError("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [range]);

  ///////////////////////////////////////////////////////
  // 🧱 UI STATES
  ///////////////////////////////////////////////////////
  if (loading) {
    return (
      <div className="p-6 text-white animate-pulse">
        Loading reports...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-400">
        {error}
      </div>
    );
  }

  ///////////////////////////////////////////////////////
  // 🎯 MAIN UI
  ///////////////////////////////////////////////////////
  return (
    <div className="p-6 space-y-6 text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Reports</h1>
          <p className="text-sm text-slate-400">
            Analyze your store performance
          </p>
        </div>

        {/* FILTER */}
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="bg-slate-800 border border-white/10 px-3 py-2 rounded-lg text-sm"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Revenue" value={`₹${data.revenue}`} color="green" />
        <StatCard title="Profit" value={`₹${data.profit}`} color="blue" />
        <StatCard title="Sales" value={data.sales} color="purple" />
        <StatCard title="Top Product" value={data.topProduct || "N/A"} color="yellow" />
      </div>

      {/* CHART */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h2 className="text-sm text-slate-400 mb-4">
          Revenue Trend
        </h2>

        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#22c55e"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* INSIGHTS */}
      <Insights data={data} />

    </div>
  );
}

///////////////////////////////////////////////////////
// 🔹 STAT CARD
///////////////////////////////////////////////////////
const StatCard = ({ title, value, color }) => {
  const colors = {
    green: "text-green-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
    yellow: "text-yellow-400",
  };

  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:scale-[1.03] transition duration-200">
      <p className="text-xs text-gray-400">{title}</p>
      <h2 className={`text-lg font-semibold ${colors[color]}`}>
        {value}
      </h2>
    </div>
  );
};

///////////////////////////////////////////////////////
// 🔹 INSIGHTS COMPONENT
///////////////////////////////////////////////////////


const Insights = ({ data = {}, previous = {} }) => {
  const revenue = data.revenue || 0;
  const profit = data.profit || 0;
  const sales = data.sales || 0;
  const topProduct = data.topProduct || "No product";

  // ✅ Calculations
  const margin = revenue > 0 ? Math.round((profit / revenue) * 100) : 0;
  const avgOrderValue = sales > 0 ? Math.round(revenue / sales) : 0;

  // Optional previous period (for growth)
  const prevRevenue = previous.revenue || 0;
  const growth =
    prevRevenue > 0
      ? Math.round(((revenue - prevRevenue) / prevRevenue) * 100)
      : 0;

  const isGrowthPositive = growth >= 0;

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 p-5 rounded-2xl shadow-lg">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white tracking-wide">
          Insights & Analytics
        </h3>

        <span className="text-[10px] bg-white/10 px-2 py-1 rounded-full text-slate-300">
          Live
        </span>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {/* Revenue */}
        <MetricCard
          icon={<DollarSign size={16} />}
          label="Revenue"
          value={`₹${revenue}`}
          color="green"
        />

        {/* Profit Margin */}
        <MetricCard
          icon={<TrendingUp size={16} />}
          label="Margin"
          value={`${margin}%`}
          color="blue"
        />

        {/* Avg Order Value */}
        <MetricCard
          icon={<Package size={16} />}
          label="Avg Order"
          value={`₹${avgOrderValue}`}
          color="purple"
        />

        {/* Sales */}
        <MetricCard
          icon={<Package size={16} />}
          label="Sales"
          value={sales}
          color="yellow"
        />

      </div>

      {/* DIVIDER */}
      <div className="my-5 border-t border-white/10" />

      {/* SMART INSIGHTS */}
      <div className="space-y-2 text-xs text-slate-300">

        <InsightLine
          icon={<Star size={14} />}
          text={`${topProduct} is your top performing product`}
        />

        <InsightLine
          icon={
            isGrowthPositive ? (
              <TrendingUp size={14} className="text-green-400" />
            ) : (
              <TrendingDown size={14} className="text-red-400" />
            )
          }
          text={`Revenue ${
            isGrowthPositive ? "increased" : "decreased"
          } by ${Math.abs(growth)}% compared to last period`}
        />

        <InsightLine
          icon={<DollarSign size={14} />}
          text={`Each order generates approx ₹${avgOrderValue}`}
        />

        <InsightLine
          icon={<Package size={14} />}
          text={`You processed ${sales} orders in this period`}
        />

        {/* Smart warning */}
        {margin < 10 && (
          <p className="text-red-400 text-[11px] mt-2">
            ⚠ Low profit margin detected. Consider optimizing pricing or cost.
          </p>
        )}

      </div>
    </div>
  );
};

///////////////////////////////////////////////////////
// 🔹 METRIC CARD
///////////////////////////////////////////////////////
const MetricCard = ({ icon, label, value, color }) => {
  const colors = {
    green: "text-green-400 bg-green-500/10",
    blue: "text-blue-400 bg-blue-500/10",
    purple: "text-purple-400 bg-purple-500/10",
    yellow: "text-yellow-400 bg-yellow-500/10",
  };

  return (
    <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
      <div className="flex items-center justify-between mb-1">
        <span className={`p-1 rounded ${colors[color]}`}>
          {icon}
        </span>
      </div>
      <p className="text-[10px] text-slate-400">{label}</p>
      <h4 className="text-sm font-semibold text-white">{value}</h4>
    </div>
  );
};

///////////////////////////////////////////////////////
// 🔹 INSIGHT LINE
///////////////////////////////////////////////////////
const InsightLine = ({ icon, text }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-slate-400">{icon}</span>
      <p>{text}</p>
    </div>
  );
};

