import { useParams } from "react-router-dom";
import { useState, useMemo, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts";
import { useAuth } from "../../../context/AuthContext";

// ─── Constants ───────────────────────────────────────────────────────────────

const BRAND_COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#a855f7", "#ec4899"];

const INITIAL_INVENTORY = [
  { id: 1, company: "HP",   model: "Pavilion",  ram: "16GB", storage: "512GB", processor: "i7", stock: 10, buyingPrice: 50000 },
  { id: 2, company: "Dell", model: "Inspiron",  ram: "8GB",  storage: "256GB", processor: "i5", stock: 8,  buyingPrice: 35000 },
  { id: 3, company: "Asus", model: "VivoBook",  ram: "16GB", storage: "1TB",   processor: "i5", stock: 5,  buyingPrice: 42000 },
  { id: 4, company: "Lenovo", model: "IdeaPad", ram: "8GB",  storage: "512GB", processor: "Ryzen 5", stock: 12, buyingPrice: 38000 },
];

const INITIAL_SALES = [
  { id: 1, date: "2026-04-20", company: "HP",     model: "Pavilion",  ram: "16GB", storage: "512GB", processor: "i7",      buyingPrice: 50000, sellingPrice: 60000 },
  { id: 2, date: "2026-04-20", company: "Dell",   model: "Inspiron",  ram: "8GB",  storage: "256GB", processor: "i5",      buyingPrice: 35000, sellingPrice: 42000 },
  { id: 3, date: "2026-04-21", company: "Asus",   model: "VivoBook",  ram: "16GB", storage: "1TB",   processor: "i5",      buyingPrice: 42000, sellingPrice: 50000 },
  { id: 4, date: "2026-04-21", company: "Lenovo", model: "IdeaPad",   ram: "8GB",  storage: "512GB", processor: "Ryzen 5", buyingPrice: 38000, sellingPrice: 46000 },
  { id: 5, date: "2026-04-22", company: "HP",     model: "Pavilion",  ram: "16GB", storage: "512GB", processor: "i7",      buyingPrice: 50000, sellingPrice: 61000 },
  { id: 6, date: "2026-04-23", company: "Dell",   model: "Inspiron",  ram: "8GB",  storage: "256GB", processor: "i5",      buyingPrice: 35000, sellingPrice: 43500 },
  { id: 7, date: "2026-04-24", company: "Lenovo", model: "IdeaPad",   ram: "8GB",  storage: "512GB", processor: "Ryzen 5", buyingPrice: 38000, sellingPrice: 46500 },
  { id: 8, date: "2026-04-25", company: "HP",     model: "Pavilion",  ram: "16GB", storage: "512GB", processor: "i7",      buyingPrice: 50000, sellingPrice: 60000 },
  { id: 9, date: "2026-04-25", company: "Asus",   model: "VivoBook",  ram: "16GB", storage: "1TB",   processor: "i5",      buyingPrice: 42000, sellingPrice: 51000 },
];

const SALE_FIELDS = ["date", "company", "model", "ram", "storage", "processor", "buyingPrice", "sellingPrice"];
const INVENTORY_FIELDS = ["company", "model", "ram", "storage", "processor", "stock", "buyingPrice"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const fmtShort = (n) => {
  if (n >= 1_00_000) return `₹${(n / 1_00_000).toFixed(1)}L`;
  if (n >= 1_000)   return `₹${(n / 1_000).toFixed(1)}K`;
  return `₹${n}`;
};

const pct = (part, total) => (total === 0 ? "0%" : `${((part / total) * 100).toFixed(1)}%`);

// ─── Sub-components ──────────────────────────────────────────────────────────

function MetricCard({ label, value, sub, accent }) {
  return (
    <div className="p-5 rounded-xl bg-white/5 border border-white/[0.07] flex flex-col gap-1">
      <p className="text-xs font-medium uppercase tracking-widest text-gray-500">{label}</p>
      <p className={`text-2xl font-semibold ${accent ?? "text-white"}`}>{value}</p>
      {sub && <p className="text-xs text-gray-500">{sub}</p>}
    </div>
  );
}

function Badge({ children, color = "blue" }) {
  const map = {
    blue:   "bg-blue-500/10 text-blue-400 border-blue-500/20",
    green:  "bg-green-500/10 text-green-400 border-green-500/20",
    yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    red:    "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${map[color]}`}>
      {children}
    </span>
  );
}

function SortIcon({ dir }) {
  if (!dir) return <span className="ml-1 opacity-30">↕</span>;
  return <span className="ml-1 opacity-80">{dir === "asc" ? "↑" : "↓"}</span>;
}

function EmptyRow({ cols, message = "No records found" }) {
  return (
    <tr>
      <td colSpan={cols} className="py-10 text-center text-gray-500 text-sm">
        {message}
      </td>
    </tr>
  );
}

// ─── Add Sale Modal ───────────────────────────────────────────────────────────

function AddSaleModal({ onClose, onAdd, nextId }) {
  const empty = { date: "", company: "", model: "", ram: "", storage: "", processor: "", buyingPrice: "", sellingPrice: "" };
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.date) e.date = "Required";
    if (!form.company.trim()) e.company = "Required";
    if (!form.model.trim()) e.model = "Required";
    if (!form.ram.trim()) e.ram = "Required";
    if (!form.storage.trim()) e.storage = "Required";
    if (!form.processor.trim()) e.processor = "Required";
    if (!form.buyingPrice || isNaN(form.buyingPrice) || Number(form.buyingPrice) <= 0) e.buyingPrice = "Must be > 0";
    if (!form.sellingPrice || isNaN(form.sellingPrice) || Number(form.sellingPrice) <= 0) e.sellingPrice = "Must be > 0";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onAdd({ ...form, id: nextId, buyingPrice: Number(form.buyingPrice), sellingPrice: Number(form.sellingPrice) });
    onClose();
  };

  const field = (key, label, type = "text", placeholder = "") => (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-400">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className={`px-3 py-2 rounded-lg bg-white/5 border text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
          errors[key] ? "border-red-500/60" : "border-white/10"
        }`}
      />
      {errors[key] && <p className="text-[11px] text-red-400">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#0d1117] border border-white/10 rounded-2xl p-6 shadow-2xl mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Add Sale Record</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors text-xl leading-none">&times;</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {field("date", "Sale Date", "date")}
          {field("company", "Brand", "text", "e.g. HP")}
          {field("model", "Model", "text", "e.g. Pavilion")}
          {field("ram", "RAM", "text", "e.g. 16GB")}
          {field("storage", "Storage", "text", "e.g. 512GB")}
          {field("processor", "Processor", "text", "e.g. i7")}
          {field("buyingPrice", "Buying Price (₹)", "number", "e.g. 50000")}
          {field("sellingPrice", "Selling Price (₹)", "number", "e.g. 60000")}
        </div>

        {form.buyingPrice && form.sellingPrice && Number(form.sellingPrice) > Number(form.buyingPrice) && (
          <p className="mt-4 text-xs text-green-400">
            Margin: {fmt(Number(form.sellingPrice) - Number(form.buyingPrice))} ({pct(Number(form.sellingPrice) - Number(form.buyingPrice), Number(form.sellingPrice))})
          </p>
        )}
        {form.buyingPrice && form.sellingPrice && Number(form.sellingPrice) <= Number(form.buyingPrice) && (
          <p className="mt-4 text-xs text-red-400">⚠ Selling price is at or below buying price.</p>
        )}

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2 rounded-lg border border-white/10 text-sm text-gray-400 hover:bg-white/5 transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors">
            Add Sale
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Add Inventory Modal ──────────────────────────────────────────────────────

function AddInventoryModal({ onClose, onAdd, nextId }) {
  const empty = { company: "", model: "", ram: "", storage: "", processor: "", stock: "", buyingPrice: "" };
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.company.trim()) e.company = "Required";
    if (!form.model.trim()) e.model = "Required";
    if (!form.ram.trim()) e.ram = "Required";
    if (!form.storage.trim()) e.storage = "Required";
    if (!form.processor.trim()) e.processor = "Required";
    if (!form.stock || isNaN(form.stock) || Number(form.stock) < 0) e.stock = "Must be ≥ 0";
    if (!form.buyingPrice || isNaN(form.buyingPrice) || Number(form.buyingPrice) <= 0) e.buyingPrice = "Must be > 0";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onAdd({ ...form, id: nextId, stock: Number(form.stock), buyingPrice: Number(form.buyingPrice) });
    onClose();
  };

  const field = (key, label, type = "text", placeholder = "") => (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-400">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className={`px-3 py-2 rounded-lg bg-white/5 border text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
          errors[key] ? "border-red-500/60" : "border-white/10"
        }`}
      />
      {errors[key] && <p className="text-[11px] text-red-400">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#0d1117] border border-white/10 rounded-2xl p-6 shadow-2xl mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Add Inventory Item</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors text-xl leading-none">&times;</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {field("company", "Brand", "text", "e.g. HP")}
          {field("model", "Model", "text", "e.g. Pavilion")}
          {field("ram", "RAM", "text", "e.g. 16GB")}
          {field("storage", "Storage", "text", "e.g. 512GB")}
          {field("processor", "Processor", "text", "e.g. i7")}
          {field("stock", "Stock Qty", "number", "e.g. 10")}
          <div className="col-span-2">
            {field("buyingPrice", "Buying Price (₹)", "number", "e.g. 50000")}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2 rounded-lg border border-white/10 text-sm text-gray-400 hover:bg-white/5 transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors">
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0d1117] border border-white/10 rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="text-gray-400 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: {fmtShort(p.value)}
        </p>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function StoreView() {
  const { id } = useParams();
  const { user } = useAuth();

  // 🔥 Safety check
  if (!user) return null;

  const isSuperAdmin = user.role === "SUPER_ADMIN";

  // ── State ──
  const [sales, setSales] = useState(INITIAL_SALES);
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [companyFilter, setCompanyFilter] = useState("All");

  const [saleSort, setSaleSort] = useState({ key: "date", dir: "desc" });
  const [invSort, setInvSort] = useState({ key: "company", dir: "asc" });

  const [showAddSale, setShowAddSale] = useState(false);
  const [showAddInv, setShowAddInv] = useState(false);

  const [activeTab, setActiveTab] = useState("overview");

  const [deletedSaleIds, setDeletedSaleIds] = useState(new Set());
  const [deletedInvIds, setDeletedInvIds] = useState(new Set());

  // ── Derived: unique companies ──
  const allCompanies = useMemo(
    () => ["All", ...Array.from(new Set(sales.map((s) => s.company))).sort()],
    [sales]
  );

  // ── Filtered Sales ──
  const filteredSales = useMemo(() => {
    let data = sales.filter((s) => !deletedSaleIds.has(s.id));

    if (dateFrom) data = data.filter((s) => s.date >= dateFrom);
    if (dateTo) data = data.filter((s) => s.date <= dateTo);
    if (companyFilter !== "All") data = data.filter((s) => s.company === companyFilter);

    return [...data].sort((a, b) => {
      const aVal = a[saleSort.key];
      const bVal = b[saleSort.key];
      const cmp =
        typeof aVal === "number"
          ? aVal - bVal
          : String(aVal).localeCompare(String(bVal));

      return saleSort.dir === "asc" ? cmp : -cmp;
    });
  }, [sales, deletedSaleIds, dateFrom, dateTo, companyFilter, saleSort]);

  // ── Filtered Inventory ──
  const filteredInventory = useMemo(() => {
    const data = inventory.filter((i) => !deletedInvIds.has(i.id));

    return [...data].sort((a, b) => {
      const aVal = a[invSort.key];
      const bVal = b[invSort.key];

      const cmp =
        typeof aVal === "number"
          ? aVal - bVal
          : String(aVal).localeCompare(String(bVal));

      return invSort.dir === "asc" ? cmp : -cmp;
    });
  }, [inventory, deletedInvIds, invSort]);

  // ── KPIs ──
  const totalRevenue = useMemo(
    () => filteredSales.reduce((a, s) => a + s.sellingPrice, 0),
    [filteredSales]
  );

  const totalCost = useMemo(
    () => filteredSales.reduce((a, s) => a + s.buyingPrice, 0),
    [filteredSales]
  );

  const totalProfit = totalRevenue - totalCost;

  const margin =
    totalRevenue > 0
      ? ((totalProfit / totalRevenue) * 100).toFixed(1)
      : "0.0";

  // ── Handlers ──
  const handleDeleteSale = useCallback((id) => {
    setDeletedSaleIds((prev) => new Set([...prev, id]));
  }, []);

  const handleDeleteInv = useCallback((id) => {
    setDeletedInvIds((prev) => new Set([...prev, id]));
  }, []);

  const clearFilters = () => {
    setDateFrom("");
    setDateTo("");
    setCompanyFilter("All");
  };

  // ─────────────────────────────────────────────
  // 🔥 UI START
  // ─────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#020617]/80 backdrop-blur border-b border-white/[0.06] px-6 py-4">

        <div className="flex justify-between items-center">

          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-500">
              {isSuperAdmin ? "Store View (Admin)" : "Your Store Dashboard"}
            </p>

            <h1 className="text-lg font-semibold">
              {isSuperAdmin
                ? `Store ID: ${id || "N/A"}`
                : user?.storeName || "My Store"}
            </h1>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowAddSale(true)}
              className="px-4 py-2 bg-blue-600 rounded"
            >
              + Add Sale
            </button>

            <button
              onClick={() => setShowAddInv(true)}
              className="px-4 py-2 border border-white/10 rounded"
            >
              + Add Inventory
            </button>
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
            {allCompanies.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <button
            onClick={clearFilters}
            className="text-sm text-gray-400"
          >
            Clear
          </button>

        </div>

        {/* KPI */}
        <div className="grid grid-cols-3 gap-4">

          <div className="bg-slate-900 p-4 rounded">
            Revenue: ₹{totalRevenue}
          </div>

          <div className="bg-slate-900 p-4 rounded">
            Profit: ₹{totalProfit}
          </div>

          <div className="bg-slate-900 p-4 rounded">
            Margin: {margin}%
          </div>

        </div>

      </main>
    </div>
  );
}