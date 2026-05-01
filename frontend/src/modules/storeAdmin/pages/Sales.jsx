// modules/storeAdmin/pages/Sales.jsx

import { useState } from "react";
import SalesTable from "../components/SalesTable";

const dummySales = [
  { id: 1, product: "Dell G15", total: 150000 },
  { id: 2, product: "HP Pavilion", total: 55000 },
  { id: 3, product: "MacBook Air M2", total: 120000 },
];

export default function Sales() {
  const [range, setRange] = useState("today");

  // 🔥 calculations
  const totalRevenue = dummySales.reduce((acc, s) => acc + s.total, 0);
  const totalSales = dummySales.length;

  return (
    <div className="p-6 space-y-6 text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-semibold">
            Sales
          </h1>
          <p className="text-sm text-slate-400">
            Track all sales transactions
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

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        <StatCard
          title="Total Revenue"
          value={`₹${totalRevenue}`}
          color="green"
        />

        <StatCard
          title="Transactions"
          value={totalSales}
          color="blue"
        />

        <StatCard
          title="Avg Order Value"
          value={`₹${Math.floor(totalRevenue / totalSales || 0)}`}
          color="purple"
        />

      </div>

      {/* TABLE */}
      <SalesTable />

    </div>
  );
}


// 🔹 STAT CARD
const StatCard = ({ title, value, color }) => {
  const colors = {
    green: "text-green-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
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