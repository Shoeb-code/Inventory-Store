import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../../../utils/axiosInstance";
import UnitModal from "../components/UnitModal";

import {
  Pencil,
  ShoppingCart,
  Cpu,
  HardDrive,
  MemoryStick,
  Package,
  IndianRupee,
  TrendingUp,
  Boxes,
  Sparkles,
  Activity,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import toast from "react-hot-toast";

export default function InventoryDetails() {

  const { id } = useParams();

  const [units, setUnits] =
    useState([]);

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [selectedUnit, setSelectedUnit] =
    useState(null);

  const [mode, setMode] =
    useState(null);

  // =========================================
  // FETCH UNITS
  // =========================================

  const fetchUnits = async () => {

    try {

      const res =
        await API.get(
          `/inventory-unit/${id}`
        );

      setUnits(
        res.data.data || []
      );

    } catch {

      toast.error(
        "Failed to load units"
      );
    }
  };

  // =========================================
  // FETCH PRODUCT
  // =========================================

  const fetchProduct =
    async () => {

      try {

        const res =
          await API.get(
            `/inventory/${id}`
          );

        setProduct(
          res.data.data
        );

      } catch {

        toast.error(
          "Failed to load product"
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchUnits();

    fetchProduct();

  }, [id]);

  // =========================================
  // EDIT
  // =========================================

  const handleEdit =
    async (form) => {

      try {

        await API.put(
          `/inventory-unit/${selectedUnit._id}`,
          form
        );

        toast.success(
          "Updated successfully"
        );

        setSelectedUnit(null);

        fetchUnits();

      } catch {

        toast.error(
          "Update failed"
        );
      }
    };

  // =========================================
  // SELL
  // =========================================

  const handleSell =
    async (form) => {

      try {

        await API.post(
          `/inventory-unit/${selectedUnit._id}/sell`,
          form
        );

        toast.success(
          "Sold successfully"
        );

        setSelectedUnit(null);

        fetchUnits();

        fetchProduct();

      } catch {

        toast.error(
          "Sell failed"
        );
      }
    };

  // =========================================
  // STATS
  // =========================================

  const sold =
    units.filter(
      (u) =>
        u.status === "SOLD"
    ).length;

  const available =
    units.filter(
      (u) =>
        u.status !== "SOLD"
    ).length;

  const revenue =
    units.reduce(
      (acc, u) =>
        acc +
        (u.sellingPrice || 0),
      0
    );

  const totalProfit =
    units.reduce(
      (acc, u) =>
        acc + (u.profit || 0),
      0
    );

  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (

      <div className="min-h-screen bg-[#020617] p-6 text-white">

        <div className="h-56 rounded-[32px] bg-white/5 animate-pulse" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-6">

          {[...Array(4)].map((_, i) => (

            <div
              key={i}
              className="h-32 rounded-[28px] bg-white/5 animate-pulse"
            />

          ))}

        </div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#020617] text-white p-6">

      {/* BACKGROUND GLOW */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-20 left-[-120px] h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="absolute bottom-0 right-[-100px] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      </div>

      {/* HERO */}
      {product && (

        <motion.div

          initial={{
            opacity: 0,
            y: 15,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] p-7 shadow-2xl shadow-black/20"
        >

          {/* TOP ACCENT */}
          <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />

          {/* GLOW */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_35%)]" />

          <div className="relative z-10">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              {/* LEFT */}
              <div className="flex items-start gap-5">

                <div className="flex h-20 w-20 items-center justify-center rounded-[28px] border border-blue-500/20 bg-blue-500/10 shadow-lg shadow-blue-500/10">

                  <Boxes
                    size={34}
                    className="text-blue-400"
                  />

                </div>

                <div>

                  <div className="flex items-center gap-2">

                    <h1 className="text-4xl font-bold tracking-tight">

                      {product.brand}{" "}
                      {product.model}

                    </h1>

                    <Sparkles
                      size={18}
                      className="text-blue-400"
                    />

                  </div>

                  <p className="mt-2 text-sm text-slate-400">

                    {product.category}

                  </p>

                  <div className="flex flex-wrap gap-3 mt-5">

                    <Spec
                      icon={
                        <MemoryStick size={15} />
                      }
                      label="RAM"
                      value={product.ram}
                    />

                    <Spec
                      icon={
                        <HardDrive size={15} />
                      }
                      label="Storage"
                      value={product.storage}
                    />

                    <Spec
                      icon={<Cpu size={15} />}
                      label="Processor"
                      value={product.processor}
                    />

                  </div>

                </div>

              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-start lg:items-end gap-4">

                <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4">

                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">

                    Product Price

                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-white">

                    ₹
                    {product.price?.toLocaleString()}

                  </h2>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      )}

      {/* KPI */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mt-6">

        <StatCard
          title="Available Units"
          value={available}
          icon={<Package size={18} />}
        />

        <StatCard
          title="Sold Units"
          value={sold}
          icon={<ShoppingCart size={18} />}
        />

        <StatCard
          title="Revenue"
          value={`₹${revenue.toLocaleString()}`}
          icon={<IndianRupee size={18} />}
        />

        <StatCard
          title="Profit"
          value={`₹${totalProfit.toLocaleString()}`}
          icon={<TrendingUp size={18} />}
        />

      </div>

      {/* UNITS */}
      <div className="mt-8">

        <div className="flex items-center justify-between mb-5">

          <div>

            <h2 className="text-2xl font-semibold">

              Inventory Units

            </h2>

            <p className="mt-1 text-sm text-slate-400">

              Manage and track individual inventory units.

            </p>

          </div>

          <div className="flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-400">

            <Activity size={12} />

            Live Inventory

          </div>

        </div>

        {units.length === 0 ? (

          <div className="flex flex-col items-center justify-center rounded-[32px] border border-dashed border-white/10 bg-white/[0.02] py-20 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-blue-500/20 bg-blue-500/10">

              <Package
                size={28}
                className="text-blue-400"
              />

            </div>

            <h3 className="mt-5 text-xl font-semibold">

              No Units Found

            </h3>

            <p className="mt-2 text-sm text-slate-500">

              No inventory units available for this product.

            </p>

          </div>

        ) : (

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

            {units.map((u, i) => (

              <motion.div

                key={u._id}

                whileHover={{
                  y: -5,
                  scale: 1.01,
                }}

                transition={{
                  duration: 0.2,
                }}

                className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] p-5 shadow-xl shadow-black/20"
              >

                {/* GLOW */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_35%)]" />

                <div className="relative z-10">

                  {/* HEADER */}
                  <div className="flex items-start justify-between">

                    <div>

                      <h2 className="text-lg font-semibold">

                        Unit #{i + 1}

                      </h2>

                      <p className="mt-1 text-xs text-slate-500">

                        Inventory Unit

                      </p>

                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        u.status === "SOLD"
                          ? "bg-red-500/10 text-red-400 border border-red-500/20"
                          : "bg-green-500/10 text-green-400 border border-green-500/20"
                      }`}
                    >

                      {u.status}

                    </span>

                  </div>

                  {/* DETAILS */}
                  <div className="mt-5 space-y-3">

                    <Row
                      label="Serial"
                      value={
                        u.serialNumber ||
                        "-"
                      }
                    />

                    <Row
                      label="IMEI"
                      value={
                        u.imei || "-"
                      }
                    />

                    <Row
                      label="Selling Price"
                      value={
                        u.sellingPrice
                          ? `₹${u.sellingPrice}`
                          : "-"
                      }
                    />

                    <Row
                      label="Cost Price"
                      value={
                        u.costPrice
                          ? `₹${u.costPrice}`
                          : "-"
                      }
                    />

                    <Row
                      label="Profit / Loss"
                      value={
                        u.profit
                          ? `₹${u.profit}`
                          : "-"
                      }
                      highlight={
                        u.profit > 0
                          ? "text-green-400"
                          : u.profit < 0
                          ? "text-red-400"
                          : ""
                      }
                    />

                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-3 mt-6">

                    <button

                      onClick={() => {

                        setSelectedUnit(u);

                        setMode("edit");
                      }}

                      className="flex-1 rounded-2xl border border-blue-500/20 bg-blue-500/10 py-3 text-sm font-medium text-blue-400 hover:bg-blue-500/20 transition-all duration-300 flex items-center justify-center gap-2"
                    >

                      <Pencil size={15} />

                      Edit

                    </button>

                    {u.status !==
                      "SOLD" && (

                      <button

                        onClick={() => {

                          setSelectedUnit(u);

                          setMode("sell");
                        }}

                        className="flex-1 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 py-3 text-sm font-medium text-emerald-400 hover:bg-emerald-500/20 transition-all duration-300 flex items-center justify-center gap-2"
                      >

                        <ShoppingCart size={15} />

                        Sell

                      </button>

                    )}

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        )}

      </div>

      {/* MODAL */}
      <AnimatePresence>

        {selectedUnit && (

          <UnitModal
            unit={selectedUnit}
            product={product}
            mode={mode}
            onClose={() =>
              setSelectedUnit(null)
            }
            onSubmit={
              mode === "edit"
                ? handleEdit
                : handleSell
            }
          />

        )}

      </AnimatePresence>

    </div>
  );
}

// =========================================
// ROW
// =========================================

const Row = ({
  label,
  value,
  highlight,
}) => (

  <div className="flex items-center justify-between border-b border-white/5 pb-2">

    <span className="text-sm text-slate-400">

      {label}

    </span>

    <span
      className={`text-sm font-medium ${
        highlight || "text-white"
      }`}
    >

      {value}

    </span>

  </div>
);

// =========================================
// SPEC
// =========================================

const Spec = ({
  icon,
  label,
  value,
}) => (

  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-xl">

    <div className="text-blue-400">

      {icon}

    </div>

    <div>

      <p className="text-[11px] uppercase tracking-wide text-slate-500">

        {label}

      </p>

      <p className="mt-1 text-sm font-medium text-white">

        {value}

      </p>

    </div>

  </div>
);

// =========================================
// STAT CARD
// =========================================

const StatCard = ({
  title,
  value,
  icon,
}) => (

  <motion.div

    whileHover={{
      y: -4,
      scale: 1.01,
    }}

    className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] p-5 shadow-xl shadow-black/20"
  >

    <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />

    <div className="flex items-start justify-between">

      <div>

        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">

          {title}

        </p>

        <h2 className="mt-3 text-3xl font-bold">

          {value}

        </h2>

      </div>

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">

        {icon}

      </div>

    </div>

  </motion.div>
);