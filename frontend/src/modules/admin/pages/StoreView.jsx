import { useParams } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";

import { useAuth } from "../../../context/AuthContext";
import { getStoreInventoryAPI, getStoreSalesAPI, getStoreSummaryAPI } from "../../store/storeAPI";

export default function StoreView() {
  const { id } = useParams();
  const { user } = useAuth();
  // STATE
  const [sales, setSales] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [companyFilter, setCompanyFilter] = useState("All");

  // FETCH REAL DATA
  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        setLoading(true);
        // FETCH ALL DATA
        const [ salesData,inventoryData,summaryData,] = await Promise.all([
        getStoreSalesAPI(id),getStoreInventoryAPI(id),getStoreSummaryAPI(id),]);
        setSales(salesData);
        setInventory(inventoryData);
        setSummary(summaryData);
      } catch (err) {
        console.error("FETCH STORE DATA ERROR:",err);
      } finally {
        setLoading(false);
      }
    };
    fetchStoreData();
  }, []);
  
  // FILTER COMPANIES
  const allCompanies = [
    "All",
    ...Array.from(
      new Set(
        sales.map((s) => s.product?.brand)
      )
    ),
  ];
  // FILTER SALES
  const filteredSales = useMemo(() => {
    let data = [...sales];
    if (dateFrom) {
      data = data.filter(
        (s) =>
          new Date(s.sale?.date) >= new Date(dateFrom)
      );
    }
    if (dateTo) {
      data = data.filter(
        (s) =>
          new Date(s.sale?.date) <= new Date(dateTo)
      );
    }
    if (companyFilter !== "All") {
      data = data.filter(
        (s) =>
          s.product?.brand === companyFilter
      );
    }
    return data;
  }, [sales, dateFrom, dateTo, companyFilter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
        Loading Store Dashboard...
      </div>
    );
  }

  // KPIs
  const totalRevenue = summary?.revenue || 0;
  const totalProfit = summary?.profit || 0;
  const totalSales = summary?.sales || 0;
  const totalStock = summary?.stock || 0;
  const margin =
    totalRevenue > 0
      ? ((totalProfit / totalRevenue) * 100).toFixed(1)
      : "0";
  // UI
  return (

    <div className="min-h-screen bg-[#020617] text-white">

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#020617]/80 backdrop-blur border-b border-white/[0.06] px-6 py-4">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-[11px] uppercase tracking-widest text-gray-500">

              {user?.role === "SUPER_ADMIN"
                ? "Store View (Admin)"
                : "Store Dashboard"}

            </p>

            <h1 className="text-2xl font-bold mt-1">

              {user?.storeName || "My Store"}

            </h1>

          </div>

        </div>

      </header>

      {/* MAIN */}
      <main className="p-6 space-y-6">

        {/* FILTERS */}
        <div className="flex gap-4 flex-wrap">

          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="bg-slate-800 p-2 rounded"
          />

          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="bg-slate-800 p-2 rounded"
          />

          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="bg-slate-800 p-2 rounded"
          >

            {allCompanies.map((company) => (

              <option key={company} value={company}>
                {company}
              </option>

            ))}

          </select>

        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="bg-slate-900 p-5 rounded-xl">

            <p className="text-sm text-gray-400">
              Revenue
            </p>

            <h2 className="text-2xl font-bold mt-2">
              ₹{totalRevenue.toLocaleString()}
            </h2>

          </div>

          <div className="bg-slate-900 p-5 rounded-xl">

            <p className="text-sm text-gray-400">
              Profit
            </p>

            <h2 className="text-2xl font-bold mt-2 text-green-400">
              ₹{totalProfit.toLocaleString()}
            </h2>

          </div>

          <div className="bg-slate-900 p-5 rounded-xl">

            <p className="text-sm text-gray-400">
              Sales
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {totalSales}
            </h2>

          </div>

          <div className="bg-slate-900 p-5 rounded-xl">

            <p className="text-sm text-gray-400">
              Profit Margin
            </p>

            <h2 className="text-2xl font-bold mt-2 text-blue-400">
              {margin}%
            </h2>

          </div>

        </div>

        {/* INVENTORY */}
        <div className="bg-slate-900 rounded-xl p-5">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-xl font-semibold">
              Inventory
            </h2>

            <span className="text-sm text-gray-400">
              Total Stock: {totalStock}
            </span>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead>

                <tr className="border-b border-white/10 text-left text-gray-400">

                  <th className="py-3">Brand</th>
                  <th>Model</th>
                  <th>Category</th>
                  <th>Processor</th>
                  <th>RAM</th>
                  <th>Storage</th>
                  <th>Stock</th>
                  <th>Price</th>
                </tr>

              </thead>

              <tbody>

                {inventory.map((item) => (

                  <tr
                    key={item._id}
                    className="border-b border-white/5"
                  >

                    <td className="py-3">
                      {item.brand}
                    </td>

                    <td>
                      {item.model}
                    </td>

                    <td>
                      {item.category}
                    </td>

                    <td>
                      {item.processor}
                    </td>

                    <td>
                      {item.ram}
                    </td>

                    <td>
                      {item.storage}
                    </td>

                    <td>
                      {item.stock}
                    </td>

                    <td>
                      ₹{item.price?.toLocaleString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* SALES */}
        <div className="bg-slate-900 rounded-xl p-5">

          <h2 className="text-xl font-semibold mb-4">
            Recent Sales
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead>

                <tr className="border-b border-white/10 text-left text-gray-400">
                  <th className="py-3">Brand</th>
                  <th>Model</th>
                  <th>Selling Price</th>
                  <th>Profit</th>
                  <th>Date</th>
                </tr>

              </thead>
              <tbody>
                {filteredSales.map((sale) => (
                  <tr
                    key={sale.id}
                    className="border-b border-white/5"
                  >
                    <td className="py-3">
                      {sale.product?.brand}
                    </td>
                    <td>
                      {sale.product?.model}
                    </td>

                    <td>
                      ₹{sale.sale?.sellingPrice?.toLocaleString()}
                    </td>

                    <td className="text-green-400">
                      ₹{sale.sale?.profit?.toLocaleString()}
                    </td>

                    <td>
                      {new Date(
                        sale.sale?.date
                      ).toLocaleDateString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
}