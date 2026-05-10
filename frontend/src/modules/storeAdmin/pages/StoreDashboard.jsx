import { useEffect, useState } from "react";

import API from "../../../utils/axiosInstance";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  IndianRupee,
  Package,
  ShoppingCart,
  TrendingUp,
  Sparkles,
  Activity,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

export default function StoreDashboard() {

  const [range, setRange] =
    useState("today");

  const [stats, setStats] =
    useState({});

  const [trend, setTrend] =
    useState([]);

  const [sales, setSales] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =========================================
  // FETCH DASHBOARD
  // =========================================

  const fetchDashboard =
    async () => {

      try {

        setLoading(true);

        const [
          summaryRes,
          trendRes,
          salesRes,
        ] = await Promise.all([

          API.get(
            `/inventory/summary?range=${range}`
          ),

          API.get(
            `/inventory/trend?range=${range}`
          ),

          API.get(
            `/inventory/recent-sales`
          ),
        ]);

        setStats(
          summaryRes.data?.data ||
          summaryRes.data ||
          {}
        );

        setTrend(
          trendRes.data?.data ||
          trendRes.data ||
          []
        );

        setSales(
          salesRes.data?.data ||
          salesRes.data ||
          []
        );

      } catch (err) {

        console.error(
          "Dashboard error:",
          err
        );

        setStats({});

        setTrend([]);

        setSales([]);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchDashboard();

  }, [range]);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (

      <div className="min-h-screen bg-[#020617] p-6 text-white">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

          {[...Array(4)].map((_, i) => (

            <div
              key={i}
              className="h-32 rounded-[28px] bg-white/5 animate-pulse"
            />

          ))}

        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-6">

          <div className="lg:col-span-2 h-96 rounded-[32px] bg-white/5 animate-pulse" />

          <div className="h-96 rounded-[32px] bg-white/5 animate-pulse" />

        </div>

      </div>
    );
  }

  // =========================================
  // UI
  // =========================================

  return (

    <div className="min-h-screen bg-[#020617] text-white p-6">

      {/* BACKGROUND GLOW */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-20 left-[-120px] h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="absolute bottom-0 right-[-100px] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      </div>

      {/* HEADER */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        {/* LEFT */}
        <div>

          <div className="flex items-center gap-3">

            <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-blue-500/20 bg-blue-500/10">

              <Activity
                size={26}
                className="text-blue-400"
              />

            </div>

            <div>

              <div className="flex items-center gap-2">

                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">

                  Store Dashboard

                </h1>

                <Sparkles
                  size={18}
                  className="text-blue-400"
                />

              </div>

              <p className="mt-2 text-sm text-slate-400">

                Real-time analytics and inventory insights.

              </p>

            </div>

          </div>

        </div>

        {/* RANGE SELECT */}
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

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <StatCard
          title="Revenue"
          value={`₹${(
            stats.revenue || 0
          ).toLocaleString()}`}
          icon={<IndianRupee size={18} />}
          color="blue"
        />

        <StatCard
          title="Profit"
          value={`₹${(
            stats.profit || 0
          ).toLocaleString()}`}
          icon={<TrendingUp size={18} />}
          color="green"
        />

        <StatCard
          title="Sales"
          value={stats.sales || 0}
          icon={<ShoppingCart size={18} />}
          color="purple"
        />

        <StatCard
          title="Stock"
          value={stats.stock || 0}
          icon={<Package size={18} />}
          color="orange"
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

          className="lg:col-span-2 overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] shadow-xl shadow-black/20"
        >

          {/* HEADER */}
          <div className="flex items-center justify-between p-6 border-b border-white/5">

            <div>

              <h2 className="text-xl font-semibold">

                Revenue Analytics

              </h2>

              <p className="mt-1 text-sm text-slate-400">

                Revenue and profit trends over time.

              </p>

            </div>

            <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">

              <ArrowUpRight size={12} />

              Live Data

            </div>

          </div>

          {/* CHART */}
          <div className="h-[380px] p-4">

            {trend.length === 0 ? (

              <div className="flex h-full items-center justify-center text-slate-500">

                No analytics data available

              </div>

            ) : (

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <LineChart
                  data={trend}
                >

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
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={false}
                  />

                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={false}
                  />

                </LineChart>

              </ResponsiveContainer>

            )}

          </div>

        </motion.div>

        {/* RECENT SALES */}
        <motion.div

          initial={{
            opacity: 0,
            y: 10,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] shadow-xl shadow-black/20"
        >

          {/* HEADER */}
          <div className="p-6 border-b border-white/5">

            <h2 className="text-xl font-semibold">

              Recent Sales

            </h2>

            <p className="mt-1 text-sm text-slate-400">

              Latest transactions and activity.

            </p>

          </div>

          {/* SALES LIST */}
          <div className="p-4 space-y-3 max-h-[380px] overflow-y-auto">

            <AnimatePresence>

              {sales.length === 0 ? (

                <div className="flex h-60 items-center justify-center text-sm text-slate-500">

                  No recent sales

                </div>

              ) : (

                sales.map((s, i) => (

                  <motion.div

                    key={i}

                    initial={{
                      opacity: 0,
                      y: 10,
                    }}

                    animate={{
                      opacity: 1,
                      y: 0,
                    }}

                    transition={{
                      delay: i * 0.05,
                    }}

                    whileHover={{
                      y: -2,
                    }}

                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl hover:border-blue-500/20 transition-all duration-300"
                  >

                    <div className="flex items-start justify-between">

                      {/* LEFT */}
                      <div className="flex items-start gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400 font-bold">

                          {s.brand?.charAt(0) ||
                            "P"}

                        </div>

                        <div>

                          <h3 className="font-medium text-white group-hover:text-blue-400 transition">

                            {s.productName ||
                              "Product"}

                          </h3>

                          <p className="mt-1 text-xs text-slate-500">

                            {s.brand} •{" "}
                            {s.model}

                          </p>

                        </div>

                      </div>

                      {/* RIGHT */}
                      <div className="text-right">

                        <p className="font-semibold text-emerald-400">

                          ₹
                          {(
                            s.amount || 0
                          ).toLocaleString()}

                        </p>

                        <p className="mt-1 text-xs text-slate-500">

                          Sale

                        </p>

                      </div>

                    </div>

                  </motion.div>

                ))

              )}

            </AnimatePresence>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

// =========================================
// KPI CARD
// =========================================

const StatCard = ({
  title,
  value,
  icon,
  color,
}) => {

  const colors = {

    blue:
      "from-blue-500/10 to-cyan-500/10 border-blue-500/20 text-blue-400",

    green:
      "from-emerald-500/10 to-green-500/10 border-emerald-500/20 text-emerald-400",

    purple:
      "from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-400",

    orange:
      "from-orange-500/10 to-yellow-500/10 border-orange-500/20 text-orange-400",
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