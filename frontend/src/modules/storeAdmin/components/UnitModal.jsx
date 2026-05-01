import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { X, Package, IndianRupee, Cpu, HardDrive } from "lucide-react";
import toast from "react-hot-toast";

export default function UnitModal({ unit, product, mode, onClose, onSubmit }) {
  const [form, setForm] = useState({
    serialNumber: unit.serialNumber || "",
    imei: unit.imei || "",
    sellingPrice: unit.sellingPrice || "",
    costPrice: unit.costPrice || "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const profit = useMemo(() => {
    const sell = Number(form.sellingPrice);
    const cost = Number(form.costPrice);
    if (!sell || !cost) return 0;
    return sell - cost;
  }, [form.sellingPrice, form.costPrice]);

  const handleSubmit = () => {
    if (mode === "edit" && !form.serialNumber) {
      return toast.error("Serial number required");
    }

    if (mode === "sell" && (!form.sellingPrice || !form.costPrice)) {
      return toast.error("Enter selling & cost price");
    }

    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-[95%] max-w-xl p-6 rounded-3xl bg-gradient-to-br from-[#0f172a] to-[#020617] border border-white/10 shadow-2xl text-white"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">
              {mode === "edit" ? "Edit Unit" : "Sell Unit"}
            </h2>
            <p className="text-xs text-slate-400">Premium Inventory Control</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
            <X size={18} />
          </button>
        </div>

        {/* 🔥 PRODUCT CARD (NEW SAAS STYLE) */}
        {product && (
          <div className="mb-5 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-semibold">
                  {product.brand} {product.model}
                </h3>
                <p className="text-xs text-slate-400">{product.category}</p>
              </div>
              <div className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full">
                ₹{product.price}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Cpu size={14} /> {product.processor}
              </div>
              <div className="flex items-center gap-2">
                💾 {product.ram}
              </div>
              <div className="flex items-center gap-2">
                <HardDrive size={14} /> {product.storage}
              </div>
            </div>
          </div>
        )}

        {/* Unit Info */}
        <div className="mb-4 p-3 rounded-xl bg-black/30 border border-white/10 flex items-center gap-3">
          <Package size={18} className="text-blue-400" />
          <div className="text-xs">
            <p className="text-slate-400">Unit ID</p>
            <p className="font-medium">{unit._id}</p>
          </div>
        </div>

        {/* Form */}
        <div className="grid gap-3">
          {mode === "edit" && (
            <>
              <Input label="Serial Number" name="serialNumber" value={form.serialNumber} onChange={handleChange} />
              <Input label="IMEI" name="imei" value={form.imei} onChange={handleChange} />
              <Input label="Cost Price" name="costPrice" value={form.costPrice} onChange={handleChange} icon />
              <Input label="Selling Price" name="sellingPrice" value={form.sellingPrice} onChange={handleChange} icon />
            </>
          )}

          {mode === "sell" && (
            <>
              <Input label="Selling Price" name="sellingPrice" value={form.sellingPrice} onChange={handleChange} icon />
              <Input label="Cost Price" name="costPrice" value={form.costPrice} onChange={handleChange} icon />

              <div className="mt-3 p-4 rounded-xl bg-gradient-to-r from-black/40 to-black/20 border border-white/10 text-center">
                <p className="text-xs text-slate-400">Profit / Loss</p>
                <p className={`text-2xl font-bold ${profit > 0 ? "text-green-400" : profit < 0 ? "text-red-400" : "text-slate-300"}`}>
                  ₹{profit}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2 rounded-xl border border-white/10 hover:bg-white/10 text-sm">
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-semibold shadow-lg">
            {mode === "edit" ? "Save Changes" : "Confirm Sale"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

const Input = ({ label, icon, ...props }) => (
  <div>
    <label className="text-xs text-slate-400 block mb-1">{label}</label>
    <div className="flex items-center bg-slate-900 border border-white/10 rounded-xl px-3 focus-within:border-blue-500">
      {icon && <IndianRupee size={14} className="text-slate-400 mr-1" />}
      <input
        {...props}
        className="w-full py-2 bg-transparent outline-none text-sm"
      />
    </div>
  </div>
);