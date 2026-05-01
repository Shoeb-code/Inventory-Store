// 🔥 PREMIUM SAAS ADD PRODUCT UI

import { createInventoryAPI } from "../api/inventoryAPI";
import { laptopData } from "../data/laptopData.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Package, Cpu, HardDrive, MemoryStick, IndianRupee } from "lucide-react";

export default function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "brand") {
      setForm({ ...form, brand: value, model: "", processor: "" });
    } else if (name === "model") {
      setForm({ ...form, model: value, processor: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validateForm = () => {
    if (!form.brand) return "Select brand";
    if (!form.model) return "Select model";
    if (!form.category) return "Select category";
    if (!form.processor) return "Select processor";
    if (!form.ram) return "Select RAM";
    if (!form.storage) return "Select storage";
    if (!form.price || Number(form.price) <= 0) return "Enter valid price";
    if (form.stock === "" || Number(form.stock) < 0) return "Enter valid stock";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) return toast.error(error);

    try {
      setLoading(true);
      const res = await createInventoryAPI(form);
      toast.success(res.message || "Product added 🚀");
      navigate("/store/inventory");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-white space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold">Add Product</h1>
        <p className="text-sm text-slate-400">Create a new inventory item</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-5 p-6 rounded-3xl bg-gradient-to-br from-[#0f172a] to-[#020617] border border-white/10 shadow-xl"
      >

        <Select label="Brand" name="brand" value={form.brand} onChange={handleChange} options={Object.keys(laptopData)} icon={<Package size={14} />} />

        <Select label="Model" name="model" value={form.model} onChange={handleChange} options={laptopData[form.brand]?.models || []} />

        <Select label="Category" name="category" value={form.category} onChange={handleChange} options={["Gaming","Office","Student","Premium"]} />

        <Select label="Processor" name="processor" value={form.processor} onChange={handleChange} options={laptopData[form.brand]?.processors || []} icon={<Cpu size={14} />} />

        <Select label="RAM" name="ram" value={form.ram} onChange={handleChange} options={["8GB","16GB","32GB"]} icon={<MemoryStick size={14} />} />

        <Select label="Storage" name="storage" value={form.storage} onChange={handleChange} options={["256GB SSD","512GB SSD","1TB SSD"]} icon={<HardDrive size={14} />} />

        <Input label="Price" name="price" type="number" value={form.price} onChange={handleChange} icon={<IndianRupee size={14} />} />

        <Input label="Stock" name="stock" type="number" value={form.stock} onChange={handleChange} icon={<Package size={14} />} />

        <Input label="Warranty (months)" name="warranty" type="number" value={form.warranty} onChange={handleChange} />

        {/* ACTIONS */}
        <div className="md:col-span-2 flex gap-3 pt-4">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 border border-white/10 rounded-xl py-2 text-sm hover:bg-white/10"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`flex-1 rounded-xl py-2 text-sm font-semibold shadow-lg transition ${
              loading
                ? "bg-slate-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>

        </div>

      </form>
    </div>
  );
}

// 🔹 PREMIUM INPUT
const Input = ({ label, icon, ...props }) => (
  <div>
    <label className="text-xs text-slate-400 mb-1 block">{label}</label>
    <div className="flex items-center bg-slate-900 border border-white/10 rounded-xl px-3 focus-within:border-blue-500">
      {icon && <span className="text-blue-400 mr-2">{icon}</span>}
      <input {...props} className="w-full py-2 bg-transparent outline-none text-sm" />
    </div>
  </div>
);

// 🔹 PREMIUM SELECT
const Select = ({ label, options, icon, ...props }) => (
  <div>
    <label className="text-xs text-slate-400 mb-1 block">{label}</label>
    <div className="flex items-center bg-slate-900 border border-white/10 rounded-xl px-3 focus-within:border-blue-500">
      {icon && <span className="text-blue-400 mr-2">{icon}</span>}
      <select {...props} className="w-full py-2 bg-transparent outline-none text-sm">
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  </div>
);