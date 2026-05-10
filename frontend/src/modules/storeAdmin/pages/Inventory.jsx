import { useEffect, useState, useMemo } from "react";

import InventoryTable from "../components/InventoryTable";
import ProductCard from "../components/ProductCard";

import {
  Grid,
  List,
  Package,
  AlertTriangle,
  XCircle,
  IndianRupee,
  Search,
  Boxes,
  TrendingUp,
  Sparkles,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { getInventoryAPI } from "../api/inventoryAPI";

export default function Inventory() {

  const [view, setView] = useState("grid");

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // =========================================
  // FETCH INVENTORY
  // =========================================

  const fetchInventory = async () => {

    try {

      const res =
        await getInventoryAPI();

      console.log(
        "Inventory data:",
        res.data
      );

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

  // =========================================
  // FILTER PRODUCTS
  // =========================================

  const filteredProducts = useMemo(() => {

    return products.filter((p) => {

      const query =
        search.toLowerCase();

      return (
        p.brand?.toLowerCase().includes(query) ||
        p.model?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query)
      );
    });

  }, [products, search]);

  // =========================================
  // STATS
  // =========================================

  const totalValue =
    products.reduce(
      (acc, p) =>
        acc + ((p.price || 0) * (p.stock || 0)),
      0
    );

  const lowStock =
    products.filter(
      (p) =>
        p.stock <= 5 &&
        p.stock > 0
    ).length;

  const outOfStock =
    products.filter(
      (p) => p.stock === 0
    ).length;

  // =========================================
  // LOADING UI
  // =========================================

  if (loading) {

    return (

      <div className="min-h-screen bg-[#020617] p-6 text-white">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">

          {[...Array(4)].map((_, i) => (

            <div
              key={i}
              className="h-28 rounded-3xl bg-white/5"
            />

          ))}

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">

          {[...Array(6)].map((_, i) => (

            <div
              key={i}
              className="h-64 rounded-3xl bg-white/5 animate-pulse"
            />

          ))}

        </div>

      </div>
    );
  }

  // =========================================
  // UI
  // =========================================

  return (

    <div className="min-h-screen bg-[#020617] text-white p-6">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        {/* LEFT */}
        <div>

          <div className="flex items-center gap-2 mb-2">

            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">

              <Boxes
                size={18}
                className="text-blue-400"
              />

            </div>

            <div>

              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">

                Inventory Analytics

              </p>

              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">

                Inventory Dashboard

              </h1>

            </div>

          </div>

          <p className="text-sm text-slate-400 max-w-xl">

            Track inventory, monitor stock levels,
            and analyze your products in real time.

          </p>

        </div>

        {/* RIGHT */}
        <div className="flex flex-col sm:flex-row gap-3">

          {/* SEARCH */}
          <div className="relative">

            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input

              type="text"

              placeholder="Search products..."

              value={search}

              onChange={(e) =>
                setSearch(e.target.value)
              }

              className="w-full sm:w-72 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl py-3 pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:border-blue-500 focus:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
            />

          </div>

          {/* VIEW SWITCH */}
          <div className="flex items-center rounded-2xl border border-white/10 bg-white/[0.03] p-1 backdrop-blur-xl">

            <button

              onClick={() =>
                setView("table")
              }

              className={`p-3 rounded-xl transition-all duration-300 ${
                view === "table"
                  ? "bg-blue-600 shadow-lg shadow-blue-500/20"
                  : "hover:bg-white/10"
              }`}
            >

              <List size={16} />

            </button>

            <button

              onClick={() =>
                setView("grid")
              }

              className={`p-3 rounded-xl transition-all duration-300 ${
                view === "grid"
                  ? "bg-blue-600 shadow-lg shadow-blue-500/20"
                  : "hover:bg-white/10"
              }`}
            >

              <Grid size={16} />

            </button>

          </div>

        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <StatCard
          title="Total Products"
          value={products.length}
          icon={<Package size={18} />}
          subtitle="Products in inventory"
        />

        <StatCard
          title="Low Stock"
          value={lowStock}
          icon={<AlertTriangle size={18} />}
          subtitle="Requires attention"
        />

        <StatCard
          title="Out of Stock"
          value={outOfStock}
          icon={<XCircle size={18} />}
          subtitle="Unavailable products"
        />

        <StatCard
          title="Inventory Value"
          value={`₹${totalValue.toLocaleString()}`}
          icon={<IndianRupee size={18} />}
          subtitle="Total inventory worth"
        />

      </div>

      {/* RESULTS */}
      <div className="flex items-center justify-between mb-5">

        <div>

          <h2 className="text-xl font-semibold">

            Products

          </h2>

          <p className="text-sm text-slate-400 mt-1">

            Showing {filteredProducts.length} products

          </p>

        </div>

        <div className="hidden md:flex items-center gap-2 text-sm text-slate-400">

          <TrendingUp size={16} />

          Live Inventory Data

        </div>

      </div>

      {/* VIEW */}
      <AnimatePresence mode="wait">

        {view === "table" ? (

          <motion.div

            key="table"

            initial={{
              opacity: 0,
              y: 10,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            exit={{
              opacity: 0,
              y: -10,
            }}

            className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] shadow-xl"
          >

            <InventoryTable
              products={filteredProducts}
            />

          </motion.div>

        ) : (

          <motion.div

            key="grid"

            initial={{
              opacity: 0,
              y: 10,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            exit={{
              opacity: 0,
              y: -10,
            }}

            className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5"
          >

            {filteredProducts.length > 0 ? (

              filteredProducts.map((product) => (

                <ProductCard
                  key={product._id}
                  product={product}
                />

              ))

            ) : (

              <div className="col-span-full">

                <EmptyState />

              </div>

            )}

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}

// =========================================
// STAT CARD
// =========================================

const StatCard = ({
  title,
  value,
  icon,
  subtitle,
}) => (

  <motion.div

    whileHover={{
      y: -4,
      scale: 1.01,
    }}

    transition={{
      duration: 0.2,
    }}

    className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] p-5 shadow-xl shadow-black/20 hover:border-blue-500/20 hover:shadow-[0_0_50px_rgba(59,130,246,0.12)]"
  >

    {/* TOP ACCENT */}
    <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />

    {/* GLOW */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.12),transparent_35%)]" />

    {/* CONTENT */}
    <div className="relative z-10">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">

            {title}

          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">

            {value}

          </h2>

        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">

          {icon}

        </div>

      </div>

      <div className="mt-4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mt-3 flex items-center justify-between">

        <p className="text-xs text-slate-500">

          {subtitle}

        </p>

        <div className="flex items-center gap-1 text-[11px] text-emerald-400">

          <Sparkles size={11} />

          Live

        </div>

      </div>

    </div>

  </motion.div>
);

// =========================================
// EMPTY STATE
// =========================================

const EmptyState = () => (

  <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] py-20 text-center">

    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-500/10 border border-blue-500/20">

      <Package
        size={28}
        className="text-blue-400"
      />

    </div>

    <h3 className="mt-5 text-xl font-semibold">

      No Products Found

    </h3>

    <p className="mt-2 max-w-md text-sm text-slate-400">

      No inventory products match your current search.

    </p>

  </div>
);