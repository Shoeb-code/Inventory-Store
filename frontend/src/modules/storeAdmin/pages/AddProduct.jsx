import { createInventoryAPI } from "../api/inventoryAPI";
import { laptopData } from "../data/laptopData.js";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {
  Package,
  Cpu,
  HardDrive,
  MemoryStick,
  IndianRupee,
  Sparkles,
  Boxes,
  ShieldCheck,
} from "lucide-react";

import { motion } from "framer-motion";

export default function AddProduct() {

  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      brand: "",
      model: "",
      category: "",
      processor: "",
      ram: "",
      storage: "",
      price: "",
      stock: "",
      warranty: "",
    });

  const [loading, setLoading] =
    useState(false);

  // =========================================
  // HANDLE CHANGE
  // =========================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    if (name === "brand") {

      setForm({
        ...form,
        brand: value,
        model: "",
        processor: "",
      });

    } else if (name === "model") {

      setForm({
        ...form,
        model: value,
        processor: "",
      });

    } else {

      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  // =========================================
  // VALIDATION
  // =========================================

  const validateForm = () => {

    if (!form.brand)
      return "Select brand";

    if (!form.model)
      return "Select model";

    if (!form.category)
      return "Select category";

    if (!form.processor)
      return "Select processor";

    if (!form.ram)
      return "Select RAM";

    if (!form.storage)
      return "Select storage";

    if (
      !form.price ||
      Number(form.price) <= 0
    ) {
      return "Enter valid price";
    }

    if (
      form.stock === "" ||
      Number(form.stock) < 0
    ) {
      return "Enter valid stock";
    }

    return null;
  };

  // =========================================
  // SUBMIT
  // =========================================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      const error =
        validateForm();

      if (error) {

        return toast.error(error);
      }

      try {

        setLoading(true);

        const res =
          await createInventoryAPI(form);

        toast.success(
          res.message ||
          "Product added 🚀"
        );

        navigate("/store/inventory");

      } catch (err) {

        toast.error(
          err.response?.data?.message ||
          "Failed to add product"
        );

      } finally {

        setLoading(false);
      }
    };

  // =========================================
  // UI
  // =========================================

  return (

    <div className="min-h-screen bg-[#020617] text-white p-6">
  
      {/* BACKGROUND GLOW */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
  
        <div className="absolute top-20 left-[-120px] h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
  
        <div className="absolute bottom-0 right-[-100px] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
  
      </div>
  
      {/* PAGE HEADER */}
      <div className="relative z-10 mb-8">
  
        <div className="flex items-center gap-4">
  
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-blue-500/20 bg-blue-500/10">
  
            <Boxes
              size={26}
              className="text-blue-400"
            />
  
          </div>
  
          <div>
  
            <div className="flex items-center gap-2">
  
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
  
                Add Product
  
              </h1>
  
              <Sparkles
                size={18}
                className="text-blue-400"
              />
  
            </div>
  
            <p className="mt-2 text-sm text-slate-400">
  
              Create premium inventory products with real-time tracking.
  
            </p>
  
          </div>
  
        </div>
  
      </div>
  
      {/* FORM CARD */}
      <motion.form
  
        initial={{
          opacity: 0,
          y: 15,
        }}
  
        animate={{
          opacity: 1,
          y: 0,
        }}
  
        onSubmit={handleSubmit}
  
        className="relative z-10 overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] p-6 md:p-8 shadow-2xl shadow-black/20"
      >
  
        {/* TOP ACCENT */}
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />
  
        {/* SECTION TITLE */}
        <div className="mb-8">
  
          <h2 className="text-2xl font-semibold">
  
            Product Information
  
          </h2>
  
          <p className="mt-2 text-sm text-slate-400">
  
            Fill in all required inventory details.
  
          </p>
  
        </div>
  
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
  
          <Select
            label="Brand"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            options={Object.keys(laptopData)}
            icon={<Package size={15} />}
          />
  
          <Select
            label="Model"
            name="model"
            value={form.model}
            onChange={handleChange}
            options={
              laptopData[form.brand]
                ?.models || []
            }
          />
  
          <Select
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            options={[
              "Gaming",
              "Office",
              "Student",
              "Premium",
            ]}
          />
  
          <Select
            label="Processor"
            name="processor"
            value={form.processor}
            onChange={handleChange}
            options={
              laptopData[form.brand]
                ?.processors || []
            }
            icon={<Cpu size={15} />}
          />
  
          <Select
            label="RAM"
            name="ram"
            value={form.ram}
            onChange={handleChange}
            options={[
              "8GB",
              "16GB",
              "32GB",
            ]}
            icon={
              <MemoryStick size={15} />
            }
          />
  
          <Select
            label="Storage"
            name="storage"
            value={form.storage}
            onChange={handleChange}
            options={[
              "256GB SSD",
              "512GB SSD",
              "1TB SSD",
            ]}
            icon={
              <HardDrive size={15} />
            }
          />
  
          <Input
            label="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            icon={
              <IndianRupee size={15} />
            }
          />
  
          <Input
            label="Stock"
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            icon={<Package size={15} />}
          />
  
          <Input
            label="Warranty (months)"
            name="warranty"
            type="number"
            value={form.warranty}
            onChange={handleChange}
            icon={
              <ShieldCheck size={15} />
            }
          />
  
        </div>
  
        {/* LIVE PREVIEW */}
        <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
  
          <div className="flex items-center justify-between mb-5">
  
            <div>
  
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
  
                Live Preview
  
              </p>
  
              <h3 className="mt-2 text-xl font-semibold">
  
                {form.brand || "Brand"}{" "}
                {form.model || "Model"}
  
              </h3>
  
              <p className="mt-1 text-sm text-slate-400">
  
                {form.category || "Category"}
  
              </p>
  
            </div>
  
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-blue-500/20 bg-blue-500/10">
  
              <Package
                size={22}
                className="text-blue-400"
              />
  
            </div>
  
          </div>
  
          {/* PREVIEW GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  
            <PreviewCard
              label="RAM"
              value={form.ram || "-"}
            />
  
            <PreviewCard
              label="Storage"
              value={form.storage || "-"}
            />
  
            <PreviewCard
              label="Price"
              value={
                form.price
                  ? `₹${form.price}`
                  : "-"
              }
            />
  
            <PreviewCard
              label="Stock"
              value={form.stock || "-"}
            />
  
          </div>
  
        </div>
  
        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
  
          <button
  
            type="button"
  
            onClick={() =>
              navigate(-1)
            }
  
            className="flex-1 rounded-2xl border border-white/10 bg-white/[0.03] py-3 text-sm font-medium hover:bg-white/10 transition-all duration-300"
          >
  
            Cancel
  
          </button>
  
          <button
  
            type="submit"
  
            disabled={loading}
  
            className={`flex-1 rounded-2xl py-3 text-sm font-semibold shadow-lg transition-all duration-300 ${
              loading
                ? "bg-slate-700"
                : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 shadow-blue-500/20"
            }`}
          >
  
            {loading
              ? "Adding Product..."
              : "Add Product"}
  
          </button>
  
        </div>
  
      </motion.form>
  
    </div>
  );
}

// =========================================
// INPUT
// =========================================

const Input = ({
  label,
  icon,
  ...props
}) => (

  <div>

    <label className="mb-2 block text-xs uppercase tracking-wide text-slate-400">

      {label}

    </label>

    <div className="flex items-center rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl px-4 focus-within:border-blue-500 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">

      {icon && (

        <span className="mr-3 text-blue-400">

          {icon}

        </span>

      )}

      <input

        {...props}

        className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-500"
      />

    </div>

  </div>
);

// =========================================
// SELECT
// =========================================

const Select = ({
  label,
  options,
  icon,
  ...props
}) => (

  <div>

    <label className="mb-2 block text-xs uppercase tracking-wide text-slate-400">

      {label}

    </label>

    <div className="flex items-center rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl px-4 focus-within:border-blue-500 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">

      {icon && (

        <span className="mr-3 text-blue-400">

          {icon}

        </span>

      )}

      <select

        {...props}

        className="w-full bg-transparent py-3 text-sm outline-none"
      >

        <option value="">

          Select {label}

        </option>

        {options.map((opt) => (

          <option
            key={opt}
            value={opt}
            className="bg-slate-900"
          >

            {opt}

          </option>

        ))}

      </select>

    </div>

  </div>
);

// =========================================
// PREVIEW CARD
// =========================================

const PreviewCard = ({
  label,
  value,
}) => (

  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">

    <p className="text-[11px] uppercase tracking-wide text-slate-500">

      {label}

    </p>

    <p className="mt-2 text-sm font-semibold text-white">

      {value}

    </p>

  </div>
);