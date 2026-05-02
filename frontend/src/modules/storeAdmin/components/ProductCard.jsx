

import { useNavigate } from "react-router-dom";
import { IndianRupee, Package, AlertTriangle } from "lucide-react";

export default function ProductCard({product}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/store/inventory-unit/${product._id}`)}
      className="group relative p-5 rounded-3xl bg-gradient-to-br from-[#0f172a] to-[#020617] border border-white/10 shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer overflow-hidden"
    >
      {/* Glow Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent blur-xl" />

      {/* CONTENT */}
      <div className="relative z-10">

        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              {product.brand} {product.model}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {product.category}
            </p>
          </div>

          <div className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full">
            #{product._id.slice(-4)}
          </div>
        </div>

        {/* SPECS */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <SpecItem icon={<IndianRupee size={14} />} label="Price" value={`₹${product.price}`} />
          <SpecItem icon={<Package size={14} />} label="Stock" value={product.stock} />
        </div>

        {/* STATUS */}
        <div className="mt-4 flex justify-between items-center">
          <StatusBadge stock={product.stock} />

          <span className="text-xs text-slate-500 group-hover:text-slate-300 transition">
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
}

const SpecItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2">
    <div className="text-blue-400">{icon}</div>
    <div>
      <p className="text-[10px] text-slate-400">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  </div>
);

const StatusBadge = ({ stock }) => {
  if (stock === 0)
    return (
      <span className="flex items-center gap-1 text-red-400 text-xs bg-red-500/10 px-2 py-1 rounded-full">
        <AlertTriangle size={12} /> Out of Stock
      </span>
    );

  if (stock <= 5)
    return (
      <span className="text-yellow-400 text-xs bg-yellow-500/10 px-2 py-1 rounded-full">
        Low Stock
      </span>
    );

  return (
    <span className="text-green-400 text-xs bg-green-500/10 px-2 py-1 rounded-full">
      Available
    </span>
  );
};