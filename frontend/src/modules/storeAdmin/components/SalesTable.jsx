import { useState, useMemo } from "react";
import { Search, ArrowUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";


export default function SalesTable({ sales = [], loading }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const ITEMS_PER_PAGE = 5;

  // 🔍 FILTER + SORT
  const processedSales = useMemo(() => {
    let filtered = sales.filter((s) => {
      const text = `${s.product?.brand} ${s.product?.model} ${s.product?.ram} ${s.unit?.serialNumber}`;
      return text.toLowerCase().includes(search.toLowerCase());
    });

    filtered.sort((a, b) => {
      const aVal = getValue(a, sortKey);
      const bVal = getValue(b, sortKey);

      if (sortOrder === "asc") return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });

    return filtered;
  }, [sales, search, sortKey, sortOrder]);

  // 📄 PAGINATION
  const totalPages = Math.ceil(processedSales.length / ITEMS_PER_PAGE);
  const paginated = processedSales.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  return (
    <div className="space-y-5 text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Sales Transactions</h2>

        <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-xl border border-white/10 w-64">
          <Search size={14} className="text-slate-400" />
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#020617]">

        <table className="w-full text-sm">

          <thead className="bg-white/5 text-slate-400 text-xs uppercase">
            <tr>
              <Th label="Product" onClick={() => handleSort("product")} />
              <Th label="RAM" onClick={() => handleSort("ram")} />
              <Th label="Price" onClick={() => handleSort("price")} />
              <Th label="Total" onClick={() => handleSort("total")} />
              <Th label="Date" onClick={() => handleSort("date")} />
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-slate-400">
                  Loading...
                </td>
              </tr>
            ) : paginated.length > 0 ? (
              paginated.map((sale, i) => (
                <tr
                  key={sale.id || i}
                  onClick={() => setSelected(sale)}
                  className="border-t border-white/5 hover:bg-white/5 cursor-pointer"
                >
                  <td className="p-3 font-medium">
                    {sale.product?.brand} {sale.product?.model}
                  </td>
                  <td className="p-3">{sale.product?.ram}</td>
                  <td className="p-3">₹{format(sale.sale?.sellingPrice)}</td>
                  <td className="p-3 text-green-400">
                    ₹{format(sale.sale?.sellingPrice)}
                  </td>
                  <td className="p-3 text-slate-400 text-xs">
                    {formatDate(sale.sale?.date)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-6 text-center text-slate-400">
                  No results found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center text-xs text-slate-400">
        <span>Page {page} of {totalPages || 1}</span>

        <div className="flex gap-2">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            className="px-3 py-1 bg-slate-800 rounded"
          >
            Prev
          </button>
          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            className="px-3 py-1 bg-slate-800 rounded"
          >
            Next
          </button>
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <SaleModal sale={selected} onClose={() => setSelected(null)} />
      )}

    </div>
  );
}
 
const getValue = (sale, key) => {
  switch (key) {
    case "product":
      return `${sale.product?.brand} ${sale.product?.model}`;
    case "ram":
      return sale.product?.ram || "";
    case "price":
      return sale.sale?.sellingPrice || 0;
    case "total":
      return sale.sale?.sellingPrice || 0;
    case "date":
      return new Date(sale.sale?.date).getTime();
    default:
      return "";
  }
};

const format = (num) =>
  new Intl.NumberFormat("en-IN").format(num || 0);

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN");


const Th = ({ label, onClick }) => (
  <th
    onClick={onClick}
    className="p-3 cursor-pointer hover:text-white transition"
  >
    <div className="flex items-center gap-1">
      {label}
      <ArrowUpDown size={12} />
    </div>
  </th>
);


const SaleModal = ({ sale, onClose }) => (
  <AnimatePresence>
    {sale && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">

        {/* 🔥 BACKDROP */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* 🔥 MODAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-[420px] p-6 rounded-3xl 
                     bg-gradient-to-br from-[#0f172a] to-[#020617]
                     border border-white/10 shadow-2xl text-white"
        >

          {/* HEADER */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold">
              Sale Details
            </h2>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition"
            >
              <X size={16} />
            </button>
          </div>

          {/* PRODUCT INFO */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-4">
            <p className="text-xs text-slate-400 mb-1">Product</p>
            <h3 className="font-medium text-sm">
              {sale.product.brand} {sale.product.model}
            </h3>

            <div className="flex gap-3 mt-2 text-xs text-slate-400">
              <span>{sale.product.ram}</span>
              <span>{sale.product.storage}</span>
            </div>
          </div>

          {/* DETAILS GRID */}
          <div className="grid grid-cols-2 gap-3 text-sm">

            <Detail label="Selling Price" value={`₹${format(sale.sale.sellingPrice)}`} highlight />

            <Detail label="Cost Price" value={`₹${format(sale.sale.costPrice)}`} />

            <Detail label="Profit" value={`₹${format(sale.sale.profit)}`} 
              highlightColor={sale.sale.profit >= 0 ? "green" : "red"} />

            <Detail label="Serial" value={sale.unit.serialNumber || "-"} />

            <Detail label="IMEI" value={sale.unit.imei || "-"} />

            <Detail label="Date" value={formatDate(sale.sale.date)} />

          </div>

          {/* FOOTER */}
          <button
            onClick={onClose}
            className="mt-5 w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-sm font-medium"
          >
            Close
          </button>

        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const Detail = ({ label, value, highlight, highlightColor = "blue" }) => {
  const colors = {
    blue: "text-blue-400",
    green: "text-green-400",
    red: "text-red-400",
  };

  return (
    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
      <p className="text-xs text-slate-400">{label}</p>
      <p className={`text-sm font-medium ${highlight ? colors[highlightColor] : ""}`}>
        {value}
      </p>
    </div>
  );
};