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
import { motion } from "framer-motion";
import { DollarSign, Sparkles,
  CalendarDays, Package, Star, TrendingUp } from "lucide-react";

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

    <div className="min-h-screen bg-[#020617] text-white p-6">
  
      {/* BACKGROUND GLOWS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
  
        <div className="absolute top-20 left-[-120px] h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
  
        <div className="absolute bottom-0 right-[-100px] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
  
      </div>
  
      {/* HEADER */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
  
        {/* LEFT */}
        <div>
  
          <div className="flex items-center gap-3">
  
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-blue-500/20 bg-blue-500/10 shadow-lg shadow-blue-500/10">
  
              <TrendingUp
                size={26}
                className="text-blue-400"
              />
  
            </div>
  
            <div>
  
              <div className="flex items-center gap-2">
  
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
  
                  Reports & Analytics
  
                </h1>
  
                <Sparkles
                  size={18}
                  className="text-blue-400"
                />
  
              </div>
  
              <p className="mt-2 text-sm text-slate-400">
  
                Monitor store growth, revenue, and business performance.
  
              </p>
  
            </div>
  
          </div>
  
        </div>
  
        {/* FILTER */}
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl px-4 py-3">
  
          <CalendarDays
            size={16}
            className="text-blue-400"
          />
  
          <select
  
            value={range}
  
            onChange={(e) =>
              setRange(e.target.value)
            }
  
            className="bg-transparent text-sm outline-none"
          >
  
            <option
              value="today"
              className="bg-slate-900"
            >
              Today
            </option>
  
            <option
              value="week"
              className="bg-slate-900"
            >
              This Week
            </option>
  
            <option
              value="month"
              className="bg-slate-900"
            >
              This Month
            </option>
  
          </select>
  
        </div>
  
      </div>
  
      {/* KPI GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
  
        <StatCard
          title="Revenue"
          value={`₹${data.revenue.toLocaleString()}`}
          icon={<DollarSign size={18} />}
          color="green"
        />
  
        <StatCard
          title="Profit"
          value={`₹${data.profit.toLocaleString()}`}
          icon={<TrendingUp size={18} />}
          color="blue"
        />
  
        <StatCard
          title="Sales"
          value={data.sales}
          icon={<Package size={18} />}
          color="purple"
        />
  
        <StatCard
          title="Top Product"
          value={data.topProduct || "N/A"}
          icon={<Star size={18} />}
          color="yellow"
        />
  
      </div>
  
      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-6">
  
        {/* CHART */}
        <motion.div
  
          initial={{
            opacity: 0,
            y: 10,
          }}
  
          animate={{
            opacity: 1,
            y: 0,
          }}
  
          className="lg:col-span-2 overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] shadow-2xl shadow-black/20"
        >
  
          {/* TOP ACCENT */}
          <div className="h-[2px] w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />
  
          {/* HEADER */}
          <div className="flex items-center justify-between p-6 border-b border-white/5">
  
            <div>
  
              <h2 className="text-xl font-semibold">
  
                Revenue Trend
  
              </h2>
  
              <p className="mt-1 text-sm text-slate-400">
  
                Revenue performance over time.
  
              </p>
  
            </div>
  
            <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
  
              Live Analytics
  
            </div>
  
          </div>
  
          {/* CHART */}
          <div className="h-[420px] p-5">
  
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
  
              <LineChart data={trend}>
  
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />
  
                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                  fontSize={12}
                />
  
                <YAxis
                  stroke="#64748b"
                  fontSize={12}
                />
  
                <Tooltip
                  contentStyle={{
                    background:
                      "#0f172a",
                    border:
                      "1px solid rgba(255,255,255,0.1)",
                    borderRadius:
                      "16px",
                  }}
                />
  
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={false}
                />
  
              </LineChart>
  
            </ResponsiveContainer>
  
          </div>
  
        </motion.div>
  
        {/* INSIGHTS */}
        <motion.div
  
          initial={{
            opacity: 0,
            y: 10,
          }}
  
          animate={{
            opacity: 1,
            y: 0,
          }}
  
        >
  
          <Insights
            data={data}
          />
  
        </motion.div>
  
      </div>
  
    </div>
  );
}

///////////////////////////////////////////////////////
// 🔹 STAT CARD
///////////////////////////////////////////////////////
const StatCard = ({
  title,
  value,
  icon,
  color,
}) => {

  const colors = {

    green:
      "from-emerald-500/10 to-green-500/10 border-emerald-500/20 text-emerald-400",

    blue:
      "from-blue-500/10 to-cyan-500/10 border-blue-500/20 text-blue-400",

    purple:
      "from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-400",

    yellow:
      "from-yellow-500/10 to-orange-500/10 border-yellow-500/20 text-yellow-400",
  };

  return (

    <motion.div

      whileHover={{
        y: -4,
        scale: 1.01,
      }}

      transition={{
        duration: 0.2,
      }}

      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] p-5 shadow-xl shadow-black/20"
    >

      {/* TOP ACCENT */}
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />

      {/* GLOW */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.12),transparent_35%)]" />

      <div className="relative z-10">

        <div className="flex items-start justify-between">

          <div>

            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">

              {title}

            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">

              {value}

            </h2>

          </div>

          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border bg-gradient-to-br ${colors[color]}`}
          >

            {icon}

          </div>

        </div>

      </div>

    </motion.div>
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

