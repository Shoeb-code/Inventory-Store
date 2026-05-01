import { useEffect, useState } from "react";
import InventoryTable from "../components/InventoryTable";
import ProductCard from "../components/ProductCard";
import { Grid, List, Package, AlertTriangle, XCircle, IndianRupee } from "lucide-react";
import { getInventoryAPI } from "../api/inventoryAPI";

export default function Inventory() {
  const [view, setView] = useState("table");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInventory = async () => {
    try {
      const res = await getInventoryAPI();
      setProducts(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const totalValue = products.reduce(
    (acc, p) => acc + p.price * p.stock,
    0
  );

  const lowStock = products.filter((p) => p.stock <= 5 && p.stock > 0).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;

  return (
    <div className="p-6 space-y-6 text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Inventory Dashboard</h1>
          <p className="text-sm text-slate-400">
            Track, manage and analyze your products
          </p>
        </div>

        {/* VIEW SWITCH */}
        <div className="flex bg-slate-900 border border-white/10 rounded-xl p-1">
          <button
            onClick={() => setView("table")}
            className={`p-2 rounded-lg transition ${
              view === "table" ? "bg-blue-600" : "hover:bg-white/10"
            }`}
          >
            <List size={16} />
          </button>

          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-lg transition ${
              view === "grid" ? "bg-blue-600" : "hover:bg-white/10"
            }`}
          >
            <Grid size={16} />
          </button>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-white/5 rounded-xl" />
          ))}
        </div>
      ) : (
        <>
          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              title="Total Products"
              value={products.length}
              icon={<Package size={18} />}
            />
            <StatCard
              title="Low Stock"
              value={lowStock}
              icon={<AlertTriangle size={18} />}
            />
            <StatCard
              title="Out of Stock"
              value={outOfStock}
              icon={<XCircle size={18} />}
            />
            <StatCard
              title="Total Value"
              value={`₹${totalValue}`}
              icon={<IndianRupee size={18} />}
            />
          </div>

          {/* VIEW */}
          {view === "table" ? (
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f172a] to-[#020617] p-4">
              <InventoryTable products={products} />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

const StatCard = ({ title, value, icon }) => (
  <div className="relative overflow-hidden p-5 rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#020617] to-black border border-white/10 shadow-lg group transition hover:scale-[1.03] hover:shadow-2xl">
    {/* Glow Effect */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent blur-xl" />

    {/* Content */}
    <div className="relative z-10">
      <div className="flex justify-between items-center mb-3">
        <div className="text-xs text-slate-400 tracking-wide uppercase">
          {title}
        </div>

        <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-blue-400">
          {icon}
        </div>
      </div>

      <h2 className="text-2xl font-semibold tracking-tight">
        {value}
      </h2>

      {/* Subtle divider */}
      <div className="mt-3 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Footer hint */}
      <p className="text-[11px] text-slate-500 mt-2">
        Updated just now
      </p>
    </div>
  </div>
);