// modules/admin/pages/AdminDashboard.jsx

import { useMemo } from "react";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function AdminDashboard() {

  // 🔹 DATA
  const salesData = [
    { date: "Apr 20", store: "A", product: "Dell G15", revenue: 20000, profit: 5000, units: 2 },
    { date: "Apr 21", store: "B", product: "HP Pavilion", revenue: 15000, profit: 4000, units: 2 },
    { date: "Apr 22", store: "C", product: "MacBook Air", revenue: 30000, profit: 9000, units: 1 },
    { date: "Apr 23", store: "D", product: "Lenovo Legion", revenue: 28000, profit: 8000, units: 2 },
    { date: "Apr 24", store: "E", product: "Dell G15", revenue: 22000, profit: 6000, units: 2 },
    { date: "Apr 25", store: "F", product: "HP Pavilion", revenue: 18000, profit: 5000, units: 2 },
  ];

  // 🔹 KPI
  const totalRevenue = salesData.reduce((a, b) => a + b.revenue, 0);
  const totalProfit = salesData.reduce((a, b) => a + b.profit, 0);
  const totalUnits = salesData.reduce((a, b) => a + b.units, 0);

  // 🔹 TOP PRODUCT
  const topProduct = useMemo(() => {
    const map = {};
    salesData.forEach((i) => {
      map[i.product] = (map[i.product] || 0) + i.units;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1])[0];
  }, []);

  // 🔹 STORE STATS
  const storeStats = useMemo(() => {
    const map = {};
    salesData.forEach((i) => {
      if (!map[i.store]) {
        map[i.store] = { revenue: 0, units: 0 };
      }
      map[i.store].revenue += i.revenue;
      map[i.store].units += i.units;
    });
    return Object.entries(map).map(([store, data]) => ({
      store,
      ...data,
    }));
  }, []);

  // 🔹 CHART DATA
  const chartData = salesData.map((i) => ({
    name: i.date,
    revenue: i.revenue,
    profit: i.profit,
  }));

  const barData = useMemo(() => {
    const map = {};
    salesData.forEach((i) => {
      map[i.product] = (map[i.product] || 0) + i.units;
    });
    return Object.entries(map).map(([name, units]) => ({ name, units }));
  }, []);

  // 🔹 EXTRA METRICS
  const avgOrder = (totalRevenue / totalUnits).toFixed(0);
  const bestStore = storeStats.sort((a, b) => b.revenue - a.revenue)[0];

  return (
    <div className="p-6 space-y-6 text-white">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-gray-400">
          Overview of your stores performance
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <Card title="Revenue" value={`₹${totalRevenue}`} sub="Total earnings" />
        <Card title="Profit" value={`₹${totalProfit}`} sub="Net profit" />
        <Card title="Units Sold" value={totalUnits} sub="Total products sold" />
        <Card title="Top Product" value={topProduct?.[0]} sub="Best seller" />

      </div>

      {/* EXTRA STATS */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">

        <Card title="Avg Order Value" value={`₹${avgOrder}`} sub="Revenue / units" />
        <Card title="Best Store" value={`Store ${bestStore?.store}`} sub="Highest revenue" />

      </div>

      {/* CHART */}
      <div className="bg-white/5 p-5 rounded-xl">
        <h2 className="mb-4 text-sm text-gray-400">
          Revenue vs Profit
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Line dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
            <Line dataKey="profit" stroke="#22c55e" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART */}
      <div className="bg-white/5 p-5 rounded-xl">
        <h2 className="mb-4 text-sm text-gray-400">
          Product Performance
        </h2>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData}>
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Bar dataKey="units" fill="#3b82f6" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* STORE PERFORMANCE */}
      <div className="bg-white/5 p-5 rounded-xl">
        <h2 className="mb-4 text-sm text-gray-400">
          Store Performance
        </h2>

        <div className="space-y-3">
          {storeStats.map((s) => (
            <div
              key={s.store}
              className="flex justify-between items-center bg-slate-800 p-3 rounded-lg"
            >
              <div>
                <p className="text-sm">Store {s.store}</p>
                <p className="text-xs text-gray-400">
                  {s.units} units sold
                </p>
              </div>

              <p className="text-sm font-medium">
                ₹{s.revenue}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* INSIGHTS (FIXED UI 🔥) */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-5 rounded-xl border border-white/10">

        <h2 className="text-sm text-gray-400 mb-3">Insights</h2>

        <div className="grid gap-3 text-sm">

          <Insight icon="🔥" text={`${topProduct?.[0]} is top selling product`} />
          <Insight icon="💰" text={`Revenue reached ₹${totalRevenue}`} />
          <Insight icon="📦" text={`${totalUnits} units sold across stores`} />
          <Insight icon="🏪" text={`Best store: ${bestStore?.store}`} />
          <Insight icon="📊" text={`Avg order value: ₹${avgOrder}`} />

        </div>

      </div>

    </div>
  );
}

// 🔹 CARD COMPONENT
const Card = ({ title, value, sub }) => (
  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
    <p className="text-xs text-gray-400">{title}</p>
    <h2 className="text-lg font-semibold">{value}</h2>
    <p className="text-xs text-gray-500">{sub}</p>
  </div>
);

// 🔹 INSIGHT COMPONENT
const Insight = ({ icon, text }) => (
  <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-2 rounded">
    <span>{icon}</span>
    <span>{text}</span>
  </div>
);