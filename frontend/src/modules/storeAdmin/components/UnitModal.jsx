import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  X,
  Package,
  IndianRupee,
  Cpu,
  HardDrive,
  MemoryStick,
  Sparkles,
} from "lucide-react";

import toast from "react-hot-toast";

export default function UnitModal({
  unit,
  product,
  mode,
  onClose,
  onSubmit,
}) {

  const [form, setForm] = useState({
    serialNumber: unit?.serialNumber || "",
    imei: unit?.imei || "",
    sellingPrice: unit?.sellingPrice || "",
    costPrice: unit?.costPrice || "",
  });

  // =========================================
  // HANDLE INPUT CHANGE
  // =========================================

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================================
  // PROFIT CALCULATION
  // =========================================

  const profit = useMemo(() => {

    const sell =
      Number(form.sellingPrice);

    const cost =
      Number(form.costPrice);

    if (!sell || !cost) return 0;

    return sell - cost;

  }, [
    form.sellingPrice,
    form.costPrice,
  ]);

  // =========================================
  // SUBMIT
  // =========================================

  const handleSubmit = () => {

    if (
      mode === "edit" &&
      !form.serialNumber
    ) {

      return toast.error(
        "Serial number required"
      );
    }

    if (
      mode === "sell" &&
      (
        !form.sellingPrice ||
        !form.costPrice
      )
    ) {

      return toast.error(
        "Enter selling & cost price"
      );
    }

    onSubmit(form);
  };

  // =========================================
  // UI
  // =========================================

  return (

    <AnimatePresence>

      <motion.div

        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}

        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
      >

        <motion.div

          initial={{
            opacity: 0,
            scale: 0.92,
            y: 20,
          }}

          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}

          exit={{
            opacity: 0,
            scale: 0.92,
            y: 20,
          }}

          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}

          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] shadow-2xl shadow-[0_0_80px_rgba(59,130,246,0.15)] text-white"
        >

          {/* TOP ACCENT */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-t-3xl" />

          {/* HEADER */}
          <div className="flex items-start justify-between p-6 border-b border-white/10">

            <div>

              <div className="flex items-center gap-2">

                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">

                  <Sparkles
                    size={18}
                    className="text-blue-400"
                  />

                </div>

                <div>

                  <h2 className="text-2xl font-bold tracking-tight">

                    {mode === "edit"
                      ? "Edit Unit"
                      : "Sell Unit"}

                  </h2>

                  <p className="text-xs text-slate-400 mt-1">

                    Premium Inventory Control

                  </p>

                </div>

              </div>

            </div>

            {/* CLOSE */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 transition"
            >

              <X size={18} />

            </button>

          </div>

          {/* BODY */}
          <div className="p-6">

            {/* PRODUCT CARD */}
            {product && (

              <motion.div

                initial={{
                  opacity: 0,
                  y: 10,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                className="mb-6 p-5 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.03] border border-white/10 hover:border-blue-500/30 transition-all duration-300"
              >

                {/* TOP */}
                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="text-lg font-semibold">

                      {product.brand} {product.model}

                    </h3>

                    <p className="text-sm text-slate-400 mt-1">

                      {product.category}

                    </p>

                  </div>

                  <div className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold">

                    ₹{product.price?.toLocaleString()}

                  </div>

                </div>

                {/* SPECS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">

                  <SpecCard
                    icon={<Cpu size={15} />}
                    label="Processor"
                    value={product.processor}
                  />

                  <SpecCard
                    icon={<MemoryStick size={15} />}
                    label="RAM"
                    value={product.ram}
                  />

                  <SpecCard
                    icon={<HardDrive size={15} />}
                    label="Storage"
                    value={product.storage}
                  />

                </div>

              </motion.div>

            )}

            {/* UNIT INFO */}
            <div className="mb-6 p-4 rounded-2xl bg-black/30 border border-white/10 flex items-center gap-4">

              <div className="w-11 h-11 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">

                <Package
                  size={18}
                  className="text-blue-400"
                />

              </div>

              <div>

                <p className="text-xs text-slate-400">

                  Unit ID

                </p>

                <p className="text-sm font-medium mt-1 break-all">

                  {unit?._id}

                </p>

              </div>

            </div>

            {/* FORM */}
            <div className="grid gap-4">

              {mode === "edit" && (

                <>

                  <Input
                    label="Serial Number"
                    name="serialNumber"
                    value={form.serialNumber}
                    onChange={handleChange}
                  />

                  <Input
                    label="IMEI"
                    name="imei"
                    value={form.imei}
                    onChange={handleChange}
                  />

                  <Input
                    label="Cost Price"
                    name="costPrice"
                    value={form.costPrice}
                    onChange={handleChange}
                    icon
                  />

                  <Input
                    label="Selling Price"
                    name="sellingPrice"
                    value={form.sellingPrice}
                    onChange={handleChange}
                    icon
                  />

                </>

              )}

              {mode === "sell" && (

                <>

                  <Input
                    label="Selling Price"
                    name="sellingPrice"
                    value={form.sellingPrice}
                    onChange={handleChange}
                    icon
                  />

                  <Input
                    label="Cost Price"
                    name="costPrice"
                    value={form.costPrice}
                    onChange={handleChange}
                    icon
                  />

                  {/* PROFIT CARD */}
                  <motion.div

                    initial={{
                      opacity: 0,
                    }}

                    animate={{
                      opacity: 1,
                    }}

                    className="mt-2 p-5 rounded-2xl bg-gradient-to-r from-black/40 to-black/20 border border-white/10 text-center"
                  >

                    <p className="text-xs text-slate-400">

                      Profit / Loss

                    </p>

                    <p
                      className={`text-3xl font-bold mt-2 ${
                        profit > 0
                          ? "text-green-400"
                          : profit < 0
                          ? "text-red-400"
                          : "text-slate-300"
                      }`}
                    >

                      ₹{profit.toLocaleString()}

                    </p>

                    <p className="text-xs mt-2 text-slate-500">

                      {profit > 0
                        ? "Profitable Sale"
                        : profit < 0
                        ? "Loss Sale"
                        : "Break Even"}

                    </p>

                  </motion.div>

                </>

              )}

            </div>

            {/* FOOTER */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">

              <button

                onClick={onClose}

                className="flex-1 py-3 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium"
              >

                Cancel

              </button>

              <button

                onClick={handleSubmit}

                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-sm font-semibold shadow-lg shadow-blue-500/20 transition-all duration-300"
              >

                {mode === "edit"
                  ? "Save Changes"
                  : "Confirm Sale"}

              </button>

            </div>

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>
  );
}

// =========================================
// INPUT COMPONENT
// =========================================

const Input = ({
  label,
  icon,
  ...props
}) => (

  <div>

    <label className="text-xs text-slate-400 block mb-2">

      {label}

    </label>

    <div className="flex items-center bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl px-4 focus-within:border-blue-500 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">

      {icon && (

        <IndianRupee
          size={15}
          className="text-slate-400 mr-2"
        />

      )}

      <input

        {...props}

        className="w-full py-3 bg-transparent outline-none text-sm placeholder:text-slate-500"
      />

    </div>

  </div>
);

// =========================================
// SPEC CARD
// =========================================

const SpecCard = ({
  icon,
  label,
  value,
}) => (

  <div className="p-3 rounded-2xl bg-black/20 border border-white/5">

    <div className="flex items-center gap-2 text-slate-400 text-xs">

      {icon}

      <span>{label}</span>

    </div>

    <p className="mt-2 text-sm font-medium">

      {value || "-"}

    </p>

  </div>
);