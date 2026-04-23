import { useEffect, useState } from "react";
import API from "../../../utils/axiosInstance";
import toast from "react-hot-toast";

export default function TransferRequest() {
  const [inventory, setInventory] = useState([]);
  const [stores, setStores] = useState([]);

  const [selectedItem, setSelectedItem] = useState("");
  const [toStore, setToStore] = useState("");

  // Fetch inventory
  useEffect(() => {
    const fetchData = async () => {
      const inv = await API.get("/inventory");
      const st = await API.get("/stores");

      setInventory(inv.data);
      setStores(st.data);
    };

    fetchData();
  }, []);

  // Transfer
  const handleTransfer = async () => {
    if (!selectedItem || !toStore) {
      return toast.error("Select item & store");
    }

    try {
      await API.post("/transfer", {
        inventoryId: selectedItem,
        toStoreId: toStore
      });

      toast.success("Transferred successfully 🔄");
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <div className="p-6 text-white">

      <h1 className="text-xl font-semibold mb-6">
        Transfer Stock 🔄
      </h1>

      <div className="bg-[#0f172a] p-6 rounded-xl border border-white/10 space-y-4">

        {/* SELECT ITEM */}
        <div>
          <label className="text-sm text-gray-400">Select Product</label>

          <select
            className="input w-full mt-1"
            onChange={(e) => setSelectedItem(e.target.value)}
          >
            <option value="">Choose product</option>

            {inventory.map((item) => (
              <option key={item._id} value={item._id}>
                {item.productName} - {item.serialNumber}
              </option>
            ))}
          </select>
        </div>

        {/* SELECT STORE */}
        <div>
          <label className="text-sm text-gray-400">
            Transfer To Store
          </label>

          <select
            className="input w-full mt-1"
            onChange={(e) => setToStore(e.target.value)}
          >
            <option value="">Choose store</option>

            {stores.map((store) => (
              <option key={store._id} value={store._id}>
                {store.name}
              </option>
            ))}
          </select>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleTransfer}
          className="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700"
        >
          Transfer Stock
        </button>

      </div>

    </div>
  );
}