import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import {
  getAllStoresAPI,
} from "../../store/storeAPI.js";

import CreateStoreModal
from "../components/CreateStoreModal.jsx";

import toast from "react-hot-toast";
import {Store,Search,Plus,ChevronRight,Activity,CheckCircle2,XCircle,} from"lucide-react";

export default function StoreList() {

  const navigate = useNavigate();
  const [stores, setStores] =useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] =useState(false);
  const [loading, setLoading] =useState(true);

  // FETCH STORES
  useEffect(() => { fetchStores(); }, []);

  const fetchStores = async () => {
      try {
        setLoading(true);
        const res = await getAllStoresAPI();
        setStores( res.data || res);
      } catch (err) {
        toast.error( err.message || "Failed to fetch stores");
      } finally {
        setLoading(false);
      }
    };
  // FILTER
const filteredStores =
  stores.filter((store) => store.name ?.toLowerCase().includes(search.toLowerCase() ));

  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-3 sm:p-5">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
            Store Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage and monitor all stores
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

          {/* SEARCH */}
          <div className="relative">

            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              placeholder="Search store..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full sm:w-64 bg-slate-900 border border-white/10 pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none focus:border-blue-500 transition"
            />

          </div>

          {/* CREATE */}
          <button
            onClick={() =>
              setIsOpen(true)
            }
            className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
          >

            <Plus size={16} />

            Create Store

          </button>

        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-6">

        <StatCard
          title="Total Stores"
          value={stores.length}
          icon={<Store size={18} />}
          color="blue"
        />

        <StatCard
          title="Active Stores"
          value={
            stores.filter(
              (s) => s.isActive
            ).length
          }
          icon={
            <CheckCircle2 size={18} />
          }
          color="emerald"
        />

        <StatCard
          title="Inactive"
          value={
            stores.filter(
              (s) => !s.isActive
            ).length
          }
          icon={<XCircle size={18} />}
          color="red"
        />

        <StatCard
          title="Store Activity"
          value="Live"
          icon={<Activity size={18} />}
          color="purple"
        />

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="text-center py-20 text-slate-400 text-sm">
          Loading stores...
        </div>

      ) : filteredStores.length === 0 ? (

        <div className="text-center py-20 text-slate-400 text-sm">
          No stores found
        </div>

      ) : (

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">

          {filteredStores.map(
            (store) => (
              <button
                key={store._id}
                onClick={() =>
                  navigate(
                    `/admin/stores/${store._id}`
                  )
                }
                className="group text-left bg-slate-900/70 border border-white/10 hover:border-blue-500/40 hover:bg-slate-900 transition-all rounded-3xl p-5 backdrop-blur-xl"
              >

                {/* TOP */}
                <div className="flex items-start justify-between mb-5">

                  <div className="flex items-center gap-3 min-w-0">

                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">

                      <Store
                        size={20}
                      />

                    </div>

                    <div className="min-w-0">

                      <h2 className="font-semibold text-sm sm:text-base truncate">
                        {store.name}
                      </h2>

                      <p className="text-[11px] text-slate-400 mt-1 truncate">
                        {store.city ||
                          "No location"}
                      </p>

                    </div>

                  </div>

                  <ChevronRight
                    size={18}
                    className="text-slate-500 group-hover:text-white transition shrink-0"
                  />

                </div>

                {/* BODY */}
                <div className="space-y-4">

                  {/* STATUS */}
                  <div className="flex items-center justify-between">

                    <p className="text-xs text-slate-400">
                      Status
                    </p>

                    <span
                      className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                        store.isActive
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {store.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </div>

                  {/* OWNER */}
                  <div className="flex items-center justify-between">

                    <p className="text-xs text-slate-400">
                      Owner
                    </p>

                    <p className="text-xs font-medium truncate max-w-[140px]">
                      {store.ownerName ||
                        "N/A"}
                    </p>

                  </div>

                  {/* CONTACT */}
                  <div className="flex items-center justify-between">

                    <p className="text-xs text-slate-400">
                      Contact
                    </p>

                    <p className="text-xs font-medium">
                      {store.phone ||
                        "N/A"}
                    </p>

                  </div>

                </div>

                {/* FOOTER */}
                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">

                  <div>

                    <p className="text-[11px] text-slate-400">
                      Created
                    </p>

                    <p className="text-xs font-medium mt-1">
                      {new Date(
                        store.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-[11px] text-slate-400">
                      Dashboard
                    </p>

                    <p className="text-xs text-blue-400 font-medium mt-1">
                      Open →
                    </p>

                  </div>

                </div>

              </button>

            )
          )}

        </div>

      )}

      {/* MODAL */}
      <CreateStoreModal
        isOpen={isOpen}
        onClose={() => {

          setIsOpen(false);

          fetchStores();

        }}
      />

    </div>
  );
}

// STAT CARD
const StatCard = ({
  title,
  value,
  icon,
  color,
}) => {

  const colors = {
    blue:
      "from-blue-500/10 to-blue-900/10 border-blue-500/10",

    emerald:
      "from-emerald-500/10 to-emerald-900/10 border-emerald-500/10",

    red:
      "from-red-500/10 to-red-900/10 border-red-500/10",

    purple:
      "from-purple-500/10 to-purple-900/10 border-purple-500/10",
  };

  return (
    <div
      className={`bg-gradient-to-br ${colors[color]} border rounded-2xl p-4 backdrop-blur-xl`}
    >

      <div className="flex items-start justify-between">

        <div>

          <p className="text-[11px] text-slate-400">
            {title}
          </p>

          <h2 className="text-lg sm:text-2xl font-semibold mt-2">
            {value}
          </h2>

        </div>

        <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">

          {icon}

        </div>

      </div>

    </div>
  );
};