import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../utils/axiosInstance";
import UnitModal from "../components/UnitModal";
import { Pencil, ShoppingCart, Cpu, HardDrive, MemoryStick, Package } from "lucide-react";
import toast from "react-hot-toast";

export default function InventoryDetails() {

  const { id } = useParams();

  const [units, setUnits] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedUnit, setSelectedUnit] = useState(null);
  const [mode, setMode] = useState(null);

  const fetchUnits = async () => {
    try {
      const res = await API.get(`/inventory-unit/${id}`);
      setUnits(res.data.data || []);
    } catch {
      toast.error("Failed to load units");
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/inventory/${id}`);
      setProduct(res.data.data);
    } catch {
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnits();
    fetchProduct();
  }, [id]);

  const handleEdit = async (form) => {
    try {
      await API.put(`/inventory-unit/${selectedUnit._id}`, form);
      toast.success("Updated successfully");
      setSelectedUnit(null);
      fetchUnits();
    } catch {
      toast.error("Update failed");
    }
  };

  const handleSell = async (form) => {
    try {
      await API.post(`/inventory-unit/${selectedUnit._id}/sell`, form);
      toast.success("Sold successfully");
      setSelectedUnit(null);
      fetchUnits();
      fetchProduct();
    } catch {
      toast.error("Sell failed");
    }
  };

  return (
    <div className="p-6 text-white space-y-6">

      {/* 🔥 PREMIUM PRODUCT HEADER */}
      {product && (
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0f172a] to-[#020617] border border-white/10 shadow-xl">

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold">
                {product.brand} {product.model}
              </h1>
              <p className="text-xs text-slate-400">{product.category}</p>
            </div>

            <div className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm">
              ₹{product.price}
            </div>
          </div>

          {/* SPECS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm">

            <Spec icon={<MemoryStick size={16} />} label="RAM" value={product.ram} />
            <Spec icon={<HardDrive size={16} />} label="Storage" value={product.storage} />
            <Spec icon={<Cpu size={16} />} label="Processor" value={product.processor} />
            <Spec icon={<Package size={16} />} label="Stock" value={product.stock} />

          </div>

        </div>
      )}

      {/* LOADING */}
      {loading ? (
        <p className="text-slate-400">Loading...</p>
      ) : (

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {units.map((u, i) => (
            <div
              key={u._id}
              className="p-5 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-xl hover:scale-[1.03] transition"
            >

              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-semibold">Unit #{i + 1}</h2>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    u.status === "SOLD"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {u.status}
                </span>
              </div>

              {/* DETAILS */}
              <div className="space-y-2 text-xs">

                <Row label="Serial" value={u.serialNumber || "-"} />
                <Row label="IMEI" value={u.imei || "-"} />

                <Row label="Selling Price" value={u.sellingPrice ? `₹${u.sellingPrice}` : "-"} />
                <Row label="Cost Price" value={u.costPrice ? `₹${u.costPrice}` : "-"} />

                <Row
                  label="Profit / Loss"
                  value={u.profit ? `₹${u.profit}` : "-"}
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
              <div className="flex gap-2 mt-5">

                <button
                  onClick={() => {
                    setSelectedUnit(u);
                    setMode("edit");
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-xs py-2 rounded-xl flex items-center justify-center gap-1"
                >
                  <Pencil size={14} /> Edit
                </button>

                {u.status !== "SOLD" && (
                  <button
                    onClick={() => {
                      setSelectedUnit(u);
                      setMode("sell");
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-xs py-2 rounded-xl flex items-center justify-center gap-1"
                  >
                    <ShoppingCart size={14} /> Sell
                  </button>
                )}

              </div>

            </div>
          ))}

        </div>
      )}

      {/* MODAL */}
      {selectedUnit && (
        <UnitModal
          unit={selectedUnit}
          product={product}
          mode={mode}
          onClose={() => setSelectedUnit(null)}
          onSubmit={mode === "edit" ? handleEdit : handleSell}
        />
      )}
    </div>
  );
}

const Row = ({ label, value, highlight }) => (
  <div className="flex justify-between border-b border-white/5 pb-1">
    <span className="text-slate-400">{label}</span>
    <span className={`${highlight || "text-white"} font-medium`}>
      {value}
    </span>
  </div>
);

const Spec = ({ icon, label, value }) => (
  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2">
    {icon}
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  </div>
);
