import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function ProductModal({ product, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      {/* BACKDROP CLICK */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* MODAL */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-[90%] max-w-lg p-6 
                   bg-white/10 backdrop-blur-xl 
                   border border-white/20 
                   rounded-2xl shadow-2xl text-white"
      >

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {product.brand} {product.model}
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* CONTENT */}
        <div className="space-y-3 text-sm">

          <Row label="Category" value={product.category} />
          <Row label="Processor" value={product.processor} />
          <Row label="RAM" value={product.ram} />
          <Row label="Storage" value={product.storage} />
          <Row label="Price" value={`₹${product.price}`} />
          <Row label="Stock" value={product.stock} />

        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 mt-6">

          <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm">
            Edit Product
          </button>

          <button className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded-lg text-sm">
            View Units
          </button>

        </div>

      </motion.div>
    </div>
  );
}

// 🔹 ROW COMPONENT
const Row = ({ label, value }) => (
  <div className="flex justify-between border-b border-white/10 pb-1">
    <span className="text-slate-400">{label}</span>
    <span>{value}</span>
  </div>
);