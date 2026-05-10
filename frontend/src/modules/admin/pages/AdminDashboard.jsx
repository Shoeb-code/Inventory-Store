import { useEffect, useState } from "react";

import {
  getSuperDashboardAPI,
} from "../../store/storeAPI.js";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

export default function AdminDashboard() {

  const [dashboard, setDashboard] = useState(null);
  const [filter, setFilter] = useState("day");
  const [loading, setLoading] = useState(true);

  // LOAD DASHBOARD
  const loadDashboard = async () => {
    try { setLoading(true);
        const res = await getSuperDashboardAPI(filter );
         setDashboard(res.data);
         console.log("User Data ->",res.data)
       } catch (error){  console.log(error) ; }
        finally {
                  setLoading(false);
      }
    };

  useEffect(() => {
      loadDashboard();
  }, [filter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-sm text-white">
        Loading dashboard...
      </div>
    );
  }

  const totals = dashboard?.totals || {};
  const salesAnalytics = dashboard?.salesAnalytics || [];
  const storeRanking = dashboard?.storeRanking || [];
  const topProducts = dashboard?.topProducts || [];
  const recentSales = dashboard?.recentSales || [];

  // CHART DATA
  const chartData =
    salesAnalytics.map((i) => ({
      name:i._id.day || i._id.week || i._id.month, revenue: i.revenue, profit: i.profit,
    }));

  // STORE STATS
  const storeStats =
    storeRanking.map((s) => ({
      store: s.storeName, 
      revenue: s.revenue,
      units: s.unitsSold,
      profit: s.profit,
    }));

  const bestStore =
    storeStats[0];

  const avgOrder = totals.totalUnits > 0  ?
   ( totals.totalRevenue / totals.totalUnits ).toFixed(0) : 0;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-3 sm:p-5 space-y-5">

      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
            Super Admin Dashboard
          </h1>

          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Real-time analytics across all stores
          </p>

        </div>

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          className="bg-slate-900 border border-white/10 px-3 py-2 rounded-xl outline-none text-sm"
        >
          <option value="day">
            Daily
          </option>

          <option value="week">
            Weekly
          </option>

          <option value="month">
            Monthly
          </option>
        </select>

      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">

        <PremiumCard
          title="Revenue"
          value={`₹${totals.totalRevenue || 0}`}
          icon="💰"
          gradient="from-emerald-500/20 to-emerald-900/20"
        />

        <PremiumCard
          title="Profit"
          value={`₹${totals.totalProfit || 0}`}
          icon="📈"
          gradient="from-blue-500/20 to-blue-900/20"
        />

        <PremiumCard
          title="Units Sold"
          value={totals.totalUnits || 0}
          icon="📦"
          gradient="from-purple-500/20 to-purple-900/20"
        />

        <PremiumCard
          title="Best Store"
          value={bestStore?.store || "-"}
          icon="🏪"
          gradient="from-orange-500/20 to-orange-900/20"
        />

      </div>

      {/* EXTRA INFO */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">

        <GlassCard>

          <p className="text-slate-400 text-xs">
            Avg Order Value
          </p>

          <h2 className="text-lg sm:text-xl font-semibold mt-1">
            ₹{avgOrder}
          </h2>

        </GlassCard>

        <GlassCard>

          <p className="text-slate-400 text-xs">
            Active Stores
          </p>

          <h2 className="text-lg sm:text-xl font-semibold mt-1">
            {storeStats.length}
          </h2>

        </GlassCard>

        <GlassCard className="col-span-2 lg:col-span-1">

          <p className="text-slate-400 text-xs">
            Top Revenue Store
          </p>

          <h2 className="text-lg sm:text-xl font-semibold mt-1 truncate">
            {bestStore?.store || "-"}
          </h2>

        </GlassCard>

      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-3 gap-4">

        {/* MAIN CHART */}
        <div className="lg:col-span-2 bg-slate-900/70 border border-white/10 rounded-2xl p-4">

          <div className="mb-4">

            <h2 className="text-sm sm:text-base font-semibold">
              Revenue Analytics
            </h2>

            <p className="text-xs text-slate-400">
              Revenue vs Profit
            </p>

          </div>

          <ResponsiveContainer
            width="100%"
            height={260}
          >

            <LineChart data={chartData}>

              <XAxis
                dataKey="name"
                stroke="#777"
                fontSize={10}
              />

              <YAxis
                stroke="#777"
                fontSize={10}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#22c55e"
                strokeWidth={2}
              />

              <Line
                type="monotone"
                dataKey="profit"
                stroke="#3b82f6"
                strokeWidth={2}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        {/* TOP PRODUCTS */}
        <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-4">

          <h2 className="text-sm sm:text-base font-semibold mb-4">
            Top Products
          </h2>

          <div className="space-y-3">

            {topProducts.map(
              (p, index) => (

                <div
                  key={index}
                  className="flex items-center justify-between bg-slate-800/50 p-3 rounded-xl"
                >

                  <div className="min-w-0">

                    <p className="font-medium text-sm truncate">
                      {p._id}
                    </p>

                    <p className="text-[11px] text-slate-400">
                      {p.unitsSold} sold
                    </p>

                  </div>

                  <p className="font-medium text-sm text-emerald-400">
                    ₹{p.revenue}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

      </div>

      {/* STORE PERFORMANCE */}
      <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-4">

        <div className="mb-4">

          <h2 className="text-sm sm:text-base font-semibold">
            Store Performance
          </h2>

          <p className="text-xs text-slate-400">
            Ranking based on revenue
          </p>

        </div>

        <div className="space-y-3">

          {storeStats.map((s, index) => (

            <div
              key={index}
              className="flex items-center justify-between bg-slate-800/50 rounded-xl p-3"
            >

              <div className="flex items-center gap-3 min-w-0">

                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-semibold text-sm shrink-0">
                  {index + 1}
                </div>

                <div className="min-w-0">

                  <p className="font-medium text-sm truncate">
                    Store {s.store}
                  </p>

                  <p className="text-[11px] text-slate-400">
                    {s.units} units sold
                  </p>

                </div>

              </div>

              <div className="text-right">

                <p className="font-medium text-sm text-emerald-400">
                  ₹{s.revenue}
                </p>

                <p className="text-[11px] text-slate-400">
                  Profit ₹{s.profit}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* RECENT SALES */}
      <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-4">

        <div className="mb-4">

          <h2 className="text-sm sm:text-base font-semibold">
            Recent Sales
          </h2>

          <p className="text-xs text-slate-400">
            Latest sold products
          </p>

        </div>

        <div className="space-y-3">

          {recentSales.map((sale) => (

            <div
              key={sale._id}
              className="flex items-center justify-between bg-slate-800/50 rounded-xl p-3 gap-3"
            >

              <div className="min-w-0">

                <p className="font-medium text-sm truncate">
                  {
                    sale.inventoryId
                      ?.productName
                  }
                </p>

                <p className="text-[11px] text-slate-400 truncate">
                  IMEI: {sale.imei}
                </p>

              </div>

              <div className="text-right shrink-0">

                <p className="font-medium text-sm text-emerald-400">
                  ₹{sale.sellingPrice}
                </p>

                <p className="text-[11px] text-slate-400">
                  {new Date(
                    sale.soldAt
                  ).toLocaleDateString()}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* PRODUCT BAR CHART */}
      <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-4">

        <div className="mb-4">

          <h2 className="text-sm sm:text-base font-semibold">
            Product Performance
          </h2>

          <p className="text-xs text-slate-400">
            Units sold by products
          </p>

        </div>

        <ResponsiveContainer
          width="100%"
          height={260}
        >

          <BarChart data={topProducts}>

            <XAxis
              dataKey="_id"
              stroke="#777"
              fontSize={10}
            />

            <YAxis
              stroke="#777"
              fontSize={10}
            />

            <Tooltip />

            <Bar
              dataKey="unitsSold"
              fill="#3b82f6"
              radius={[6, 6, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

// PREMIUM CARD
const PremiumCard = ({
  title,
  value,
  icon,
  gradient,
}) => (
  <div
    className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${gradient} backdrop-blur-xl p-4`}
  >

    <div className="flex items-start justify-between gap-2">

      <div className="min-w-0">

        <p className="text-[11px] sm:text-xs text-slate-400">
          {title}
        </p>

        <h2 className="text-lg sm:text-2xl font-semibold mt-1 truncate">
          {value}
        </h2>

      </div>

      <div className="text-2xl sm:text-3xl shrink-0">
        {icon}
      </div>

    </div>

  </div>
);

// GLASS CARD
const GlassCard = ({
  children,
}) => (
  <div className="rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl p-4">
    {children}
  </div>
);