// modules/storeAdmin/pages/AddProduct.jsx


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const isValid =
    form.name &&
    form.category &&
    form.price > 0 &&
    form.stock >= 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      return toast.error("Please fill all fields correctly");
    }

    try {
      setLoading(true);

      // 🔥 TODO: Replace with API call
      console.log("Product Data:", form);

      toast.success("Product added successfully 🚀");

      navigate("/store/inventory");

    } catch (err) {
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-white space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">
          Add Product
        </h1>
        <p className="text-sm text-slate-400">
          Add new product to your inventory
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg space-y-4 bg-white/5 border border-white/10 p-6 rounded-xl"
      >

        {/* PRODUCT NAME */}
        <div>
          <label className="text-sm text-slate-400">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full mt-1 p-3 rounded-lg bg-slate-800 border border-white/10 outline-none focus:border-blue-500"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="text-sm text-slate-400">
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-lg bg-slate-800 border border-white/10 outline-none focus:border-blue-500"
          >
            <option value="">Select category</option>
            <option value="Gaming">Gaming</option>
            <option value="Office">Office</option>
            <option value="Student">Student</option>
            <option value="Premium">Premium</option>
          </select>
        </div>

        {/* PRICE */}
        <div>
          <label className="text-sm text-slate-400">
            Price (₹)
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full mt-1 p-3 rounded-lg bg-slate-800 border border-white/10 outline-none focus:border-blue-500"
          />
        </div>

        {/* STOCK */}
        <div>
          <label className="text-sm text-slate-400">
            Stock Quantity
          </label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Enter stock"
            className="w-full mt-1 p-3 rounded-lg bg-slate-800 border border-white/10 outline-none focus:border-blue-500"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 pt-2">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 border border-white/10 rounded-lg py-2 text-sm hover:bg-white/10"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold ${
              loading
                ? "bg-slate-600 cursor-not-allowed"
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