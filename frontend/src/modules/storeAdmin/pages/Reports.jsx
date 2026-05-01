// modules/storeAdmin/pages/Reports.jsx

import { useState } from "react";

const dummyData = {
  revenue: 245000,
  sales: 18,
  profit: 54000,
  topProduct: "Dell G15",
};

export default function Reports() {
  const [range, setRange] = useState("today");

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

        <StatCard title="Revenue" value={`₹${dummyData.revenue}`} color="green" />
        <StatCard title="Profit" value={`₹${dummyData.profit}`} color="blue" />
        <StatCard title="Sales" value={dummyData.sales} color="purple" />
        <StatCard title="Top Product" value={dummyData.topProduct} color="yellow" />

      </div>

      {/* CHART PLACEHOLDER */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">

        <h2 className="text-sm text-slate-400 mb-4">
          Revenue Trend
        </h2>

        <div className="h-40 flex items-center justify-center text-slate-500 text-sm">
          📊 Chart will be here (Recharts / Chart.js)
        </div>

      </div>

      {/* INSIGHTS */}
      <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">

        <h3 className="text-sm font-semibold text-blue-400 mb-1">
          Insights
        </h3>

        <p className="text-xs text-slate-300">
          🔥 {dummyData.topProduct} is your best selling product.  
          💰 Revenue increased compared to last period.  
          📦 Keep stock updated to avoid shortages.
        </p>

      </div>

    </div>
  );
}


// 🔹 STAT CARD
const StatCard = ({ title, value, color }) => {
  const colors = {
    green: "text-green-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
    yellow: "text-yellow-400",
  };

  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
      <p className="text-xs text-gray-400">{title}</p>
      <h2 className={`text-lg font-semibold ${colors[color]}`}>
        {value}
      </h2>
    </div>
  );
};