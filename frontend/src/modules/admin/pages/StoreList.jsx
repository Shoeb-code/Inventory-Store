// modules/admin/pages/StoreList.jsx

import { useState, useEffect } from "react";
import StoreCard from "../components/StoreCard.jsx";
import CreateStoreModal from "../components/CreateStoreModal.jsx";
import { getAllStoresAPI } from "../../store/storeAPI.js";
import toast from "react-hot-toast";

export default function StoreList() {

  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH STORES
  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      setLoading(true);

      const res = await getAllStoresAPI();

      // backend should return { data: [...] }
      setStores(res.data || res);

    } catch (err) {
      toast.error(err.message || "Failed to fetch stores");
    } finally {
      setLoading(false);
    }
  };

  // 🔍 FILTER
  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 text-white">

      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-center gap-4">

        <div>
          <h1 className="text-2xl font-semibold">Stores</h1>
          <p className="text-sm text-gray-400">
            Manage all your stores
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3">

          {/* Search */}
          <input
            type="text"
            placeholder="Search store..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-800 px-3 py-2 rounded-lg text-sm outline-none border border-white/10"
          />

          {/* Create */}
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
          >
            + Create Store
          </button>

        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <StatCard title="Total Stores" value={stores.length} />
        <StatCard title="Active Stores" value={stores.filter(s => s.isActive).length} />
        <StatCard title="Inactive" value={stores.filter(s => !s.isActive).length} />
        <StatCard title="New This Month" value={stores.length} />

      </div>

      {/* LOADING */}
      {loading ? (
        <p className="text-gray-400">Loading stores...</p>
      ) : filteredStores.length === 0 ? (
        <p className="text-gray-400 text-sm">
          No stores found
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredStores.map((store) => (
            <StoreCard key={store._id} store={store} />
          ))}
        </div>
      )}

      {/* MODAL */}
      <CreateStoreModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          fetchStores(); // 🔥 AUTO REFRESH AFTER CREATE
        }}
      />

    </div>
  );
}

// 🔹 STAT CARD
const StatCard = ({ title, value }) => (
  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
    <p className="text-xs text-gray-400">{title}</p>
    <h2 className="text-lg font-semibold">{value}</h2>
  </div>
);