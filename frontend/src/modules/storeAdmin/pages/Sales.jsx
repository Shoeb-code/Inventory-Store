import { useEffect, useState } from "react";
import API from "../../../utils/axiosInstance";
import SalesTable from "../components/SalesTable";
import StatCard from "../components/StatCard";

export default function Sales() {
  const [range, setRange] = useState("today");
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH DATA
  const fetchSales = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/inventory/sales?range=${range}`);

      setSales(res.data?.data || res.data || []);
    } catch (err) {
      console.error("Sales error:", err);
      setSales([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [range]);

  // 🔥 CALCULATIONS (CORRECT)
  const totalRevenue = sales.reduce(
    (acc, s) => acc + (s.sale?.sellingPrice || 0),
    0
  );

  const totalProfit = sales.reduce(
    (acc, s) => acc + (s.sale?.profit || 0),
    0
  );

  const totalSales = sales.length;

  const avgOrder = totalSales
    ? Math.floor(totalRevenue / totalSales)
    : 0;

  // 🔹 FORMAT
  const format = (num) =>
    new Intl.NumberFormat("en-IN").format(num || 0);

  return (
    <div className="p-6 space-y-6 text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Sales Analytics
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Monitor revenue, profit and transactions in real time
          </p>
        </div>

        {/* FILTER */}
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="bg-slate-900 border border-white/10 px-3 py-2 rounded-xl text-sm"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-white/5 rounded-2xl" />
          ))}
        </div>
      ) : (
        <>
          {/* KPI CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <StatCard
              title="Revenue"
              value={`₹${format(totalRevenue)}`}
              trend="+12%"
            />

            <StatCard
              title="Profit"
              value={`₹${format(totalProfit)}`}
              trend="+8%"
            />

            <StatCard
              title="Transactions"
              value={totalSales}
            />

            <StatCard
              title="Avg Order"
              value={`₹${format(avgOrder)}`}
            />

          </div>

          {/* TABLE */}
          <div className="bg-gradient-to-br from-[#0f172a] to-[#020617] border border-white/10 rounded-2xl p-4">
            <SalesTable sales={sales} loading={loading} />
          </div>
        </>
      )}
    </div>
  );
}