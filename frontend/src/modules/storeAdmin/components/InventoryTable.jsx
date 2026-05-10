import { useNavigate } from "react-router-dom";

import {
  Package,
  IndianRupee,
  Cpu,
  HardDrive,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MemoryStick,
} from "lucide-react";

import { motion } from "framer-motion";

export default function InventoryTable({
  products,
}) {

  const navigate =
    useNavigate();

  return (

    <div className="overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] shadow-2xl shadow-black/20">

      {/* TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[900px] text-sm text-white">

          {/* HEAD */}
          <thead className="sticky top-0 z-10 bg-[#0f172a]/95 backdrop-blur-xl text-slate-400 border-b border-white/5">

            <tr>

              <Th label="Product" />

              <Th label="Category" />

              <Th label="Processor" />

              <Th label="RAM" />

              <Th label="Storage" />

              <Th label="Price" />

              <Th label="Stock" />

              <Th label="Status" />

              <Th label="" />

            </tr>

          </thead>

          {/* BODY */}
          <tbody>

            {products?.length > 0 ? (

              products.map((p, index) => (

                <motion.tr

                  key={p._id}

                  initial={{
                    opacity: 0,
                    y: 10,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  transition={{
                    delay: index * 0.03,
                  }}

                  whileHover={{
                    backgroundColor:
                      "rgba(255,255,255,0.04)",
                  }}

                  onClick={() =>
                    navigate(
                      `/store/inventory-unit/${p._id}`
                    )
                  }

                  className="group cursor-pointer border-b border-white/5 transition-all duration-300"
                >

                  {/* PRODUCT */}
                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      {/* ICON */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400 font-bold shadow-lg shadow-blue-500/10">

                        {p.brand?.charAt(0)}

                      </div>

                      {/* INFO */}
                      <div>

                        <h3 className="font-semibold text-white group-hover:text-blue-400 transition">

                          {p.brand}{" "}
                          {p.model}

                        </h3>

                        <p className="mt-1 text-xs text-slate-500">

                          #{p._id?.slice(-6)}

                        </p>

                      </div>

                    </div>

                  </td>

                  {/* CATEGORY */}
                  <td className="p-4">

                    <CategoryBadge
                      category={
                        p.category
                      }
                    />

                  </td>

                  {/* PROCESSOR */}
                  <td className="p-4">

                    <SpecCell
                      icon={<Cpu size={14} />}
                      value={
                        p.processor ||
                        "-"
                      }
                    />

                  </td>

                  {/* RAM */}
                  <td className="p-4">

                    <SpecCell
                      icon={
                        <MemoryStick size={14} />
                      }
                      value={
                        p.ram || "-"
                      }
                    />

                  </td>

                  {/* STORAGE */}
                  <td className="p-4">

                    <SpecCell
                      icon={
                        <HardDrive size={14} />
                      }
                      value={
                        p.storage ||
                        "-"
                      }
                    />

                  </td>

                  {/* PRICE */}
                  <td className="p-4">

                    <div className="inline-flex items-center gap-1 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-emerald-400">

                      <IndianRupee
                        size={14}
                      />

                      <span className="font-semibold">

                        {Number(
                          p.price || 0
                        ).toLocaleString()}

                      </span>

                    </div>

                  </td>

                  {/* STOCK */}
                  <td className="p-4">

                    <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">

                      <Package
                        size={14}
                        className="text-blue-400"
                      />

                      <span className="font-medium">

                        {p.stock}

                      </span>

                    </div>

                  </td>

                  {/* STATUS */}
                  <td className="p-4">

                    <StatusBadge
                      stock={p.stock}
                    />

                  </td>

                  {/* ARROW */}
                  <td className="p-4">

                    <div className="flex justify-end">

                      <ChevronRight
                        size={18}
                        className="text-slate-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-400"
                      />

                    </div>

                  </td>

                </motion.tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="9"
                  className="p-16 text-center"
                >

                  <div className="flex flex-col items-center">

                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-blue-500/20 bg-blue-500/10">

                      <Package
                        size={28}
                        className="text-blue-400"
                      />

                    </div>

                    <h3 className="mt-5 text-xl font-semibold">

                      No Products Found

                    </h3>

                    <p className="mt-2 text-sm text-slate-500">

                      Inventory is currently empty.

                    </p>

                  </div>

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

// =========================================
// TH
// =========================================

const Th = ({
  label,
}) => (

  <th className="px-4 py-4 text-left text-xs uppercase tracking-[0.2em] font-medium whitespace-nowrap">

    {label}

  </th>
);

// =========================================
// SPEC CELL
// =========================================

const SpecCell = ({
  icon,
  value,
}) => (

  <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 backdrop-blur-xl">

    <span className="text-blue-400">

      {icon}

    </span>

    <span className="text-sm font-medium text-white">

      {value}

    </span>

  </div>
);

// =========================================
// CATEGORY BADGE
// =========================================

const CategoryBadge = ({
  category,
}) => {

  const styles = {

    Gaming:
      "bg-purple-500/10 text-purple-400 border-purple-500/20",

    Office:
      "bg-blue-500/10 text-blue-400 border-blue-500/20",

    Student:
      "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",

    Premium:
      "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };

  return (

    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${
        styles[category] ||
        "bg-white/5 text-white border-white/10"
      }`}
    >

      {category || "General"}

    </span>
  );
};

// =========================================
// STATUS BADGE
// =========================================

const StatusBadge = ({
  stock,
}) => {

  if (stock === 0) {

    return (

      <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400">

        <XCircle size={12} />

        Out of Stock

      </div>
    );
  }

  if (stock <= 5) {

    return (

      <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1.5 text-xs font-medium text-yellow-400">

        <AlertTriangle size={12} />

        Low Stock

      </div>
    );
  }

  return (

    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">

      <CheckCircle2 size={12} />

      In Stock

    </div>
  );
};