import { useNavigate } from "react-router-dom";

import {
  IndianRupee,
  Package,
  AlertTriangle,
  Cpu,
  HardDrive,
  ChevronRight,
  MemoryStick,
  Layers3,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

export default function ProductCard({ product }) {

  const navigate = useNavigate();

  return (

    <motion.div

      whileHover={{
        y: -6,
        scale: 1.01,
      }}

      transition={{
        duration: 0.25,
      }}

      onClick={() =>
        navigate(
          `/store/inventory-unit/${product._id}`
        )
      }

      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] p-5 shadow-xl shadow-black/20 transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] cursor-pointer"
    >

      {/* TOP ACCENT */}
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.15),transparent_35%)]" />

      {/* CONTENT */}
      <div className="relative z-10">

        {/* HEADER */}
        <div className="flex items-start justify-between">

          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">

                <Sparkles
                  size={18}
                  className="text-blue-400"
                />

              </div>

              <div className="min-w-0">

                <h2 className="truncate text-lg font-bold tracking-tight text-white">

                  {product.brand} {product.model}

                </h2>

                <p className="mt-1 text-xs text-slate-400">

                  {product.category || "Electronics"}

                </p>

              </div>

            </div>

          </div>

          {/* PRODUCT ID */}
          <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-medium text-slate-300 backdrop-blur-xl">

            #{product._id?.slice(-4)}

          </div>

        </div>

        {/* SPECS */}
        <div className="mt-5 grid grid-cols-2 gap-3">

          <SpecItem
            icon={<IndianRupee size={14} />}
            label="Price"
            value={`₹${product.price?.toLocaleString()}`}
          />

          <SpecItem
            icon={<Package size={14} />}
            label="Stock"
            value={product.stock}
          />

          <SpecItem
            icon={<Cpu size={14} />}
            label="Processor"
            value={product.processor || "N/A"}
          />

          <SpecItem
            icon={<MemoryStick size={14} />}
            label="RAM"
            value={product.ram || "N/A"}
          />

        </div>

        {/* STORAGE */}
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2 text-slate-300">

              <HardDrive
                size={15}
                className="text-cyan-400"
              />

              <span className="text-sm font-medium">

                {product.storage || "N/A"}

              </span>

            </div>

            <div className="flex items-center gap-1 text-xs text-slate-400">

              <Layers3 size={13} />

              Premium Unit

            </div>

          </div>

        </div>

        {/* FOOTER */}
        <div className="mt-5 flex items-center justify-between">

          <StatusBadge
            stock={product.stock}
          />

          <div className="flex items-center gap-1 text-sm font-medium text-slate-400 transition group-hover:text-blue-400">

            <span>
              View Details
            </span>

            <ChevronRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />

          </div>

        </div>

      </div>

    </motion.div>
  );
}

// =========================================
// SPEC ITEM
// =========================================

const SpecItem = ({
  icon,
  label,
  value,
}) => (

  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.06]">

    <div className="flex items-center gap-2 text-slate-400">

      <div className="text-blue-400">

        {icon}

      </div>

      <span className="text-[11px] uppercase tracking-wide">

        {label}

      </span>

    </div>

    <p className="mt-2 truncate text-sm font-semibold text-white">

      {value}

    </p>

  </div>
);

// =========================================
// STATUS BADGE
// =========================================

const StatusBadge = ({
  stock,
}) => {

  if (stock === 0) {

    return (

      <div className="flex items-center gap-1 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400">

        <AlertTriangle size={12} />

        Out of Stock

      </div>
    );
  }

  if (stock <= 5) {

    return (

      <div className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1.5 text-xs font-medium text-yellow-400">

        Low Stock

      </div>
    );
  }

  return (

    <div className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-400">

      Available

    </div>
  );
};