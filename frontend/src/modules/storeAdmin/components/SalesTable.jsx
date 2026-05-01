// modules/storeAdmin/components/SalesTable.jsx

import { useState } from "react";
import { Search } from "lucide-react";

const dummySales = [
  {
    id: 1,
    product: "Dell G15",
    quantity: 2,
    price: 75000,
    total: 150000,
    date: "2026-04-28",
  },
  {
    id: 2,
    product: "HP Pavilion",
    quantity: 1,
    price: 55000,
    total: 55000,
    date: "2026-04-27",
  },
  {
    id: 3,
    product: "MacBook Air M2",
    quantity: 1,
    price: 120000,
    total: 120000,
    date: "2026-04-26",
  },
];

export default function SalesTable() {
  const [search, setSearch] = useState("");

  const filteredSales = dummySales.filter((sale) =>
    sale.product.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 text-white">

      {/* HEADER */}
      <div>
        <h2 className="text-xl font-semibold">Sales</h2>
        <p className="text-sm text-gray-400">
          Track all sales transactions
        </p>
      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-lg border border-white/10">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border border-white/10 rounded-xl">

        <table className="w-full text-sm">

          <thead className="bg-slate-900">
            <tr className="text-left text-gray-400">
              <th className="p-3">Product</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Price</th>
              <th className="p-3">Total</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredSales.map((sale) => (
              <tr
                key={sale.id}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="p-3 font-medium">{sale.product}</td>
                <td className="p-3">{sale.quantity}</td>
                <td className="p-3">₹{sale.price}</td>
                <td className="p-3 text-green-400 font-medium">
                  ₹{sale.total}
                </td>
                <td className="p-3 text-gray-400">
                  {sale.date}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

        {/* EMPTY */}
        {filteredSales.length === 0 && (
          <div className="p-6 text-center text-gray-400">
            No sales found
          </div>
        )}

      </div>

    </div>
  );
}