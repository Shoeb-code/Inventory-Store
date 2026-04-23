import { useState } from "react";
import API from "../../../utils/axiosInstance";
import toast from "react-hot-toast";

export default function BulkDuplicate() {
  const [base, setBase] = useState({
    productName: "",
    brand: "",
    model: "",
    price: "",
    costPrice: ""
  });

  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);

  // Generate duplicates
  const handleGenerate = () => {
    const arr = Array.from({ length: quantity }, (_, i) => ({
      ...base,
      serialNumber: ""
    }));
    setItems(arr);
  };

  // Update serial numbers
  const handleChange = (index, value) => {
    const updated = [...items];
    updated[index].serialNumber = value;
    setItems(updated);
  };

  // Submit
  const handleSubmit = async () => {
    try {
      const serialNumbers = items.map((i) => i.serialNumber);

      await API.post("/inventory/bulk", {
        ...base,
        storeId: "STORE_ID_HERE", // dynamic later
        serialNumbers
      });

      toast.success("Stock added successfully 🚀");
      setItems([]);
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <div className="p-6 text-white">

      <h1 className="text-xl font-semibold mb-4">
        Bulk Add Inventory
      </h1>

      {/* BASE FORM */}
      <div className="grid grid-cols-2 gap-4 mb-6">

        <input
          placeholder="Product Name"
          className="input"
          onChange={(e) =>
            setBase({ ...base, productName: e.target.value })
          }
        />

        <input
          placeholder="Brand"
          className="input"
          onChange={(e) =>
            setBase({ ...base, brand: e.target.value })
          }
        />

        <input
          placeholder="Model"
          className="input"
          onChange={(e) =>
            setBase({ ...base, model: e.target.value })
          }
        />

        <input
          placeholder="Price"
          className="input"
          onChange={(e) =>
            setBase({ ...base, price: e.target.value })
          }
        />

        <input
          placeholder="Cost Price"
          className="input"
          onChange={(e) =>
            setBase({ ...base, costPrice: e.target.value })
          }
        />

      </div>

      {/* QUANTITY */}
      <div className="flex gap-4 mb-6">

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="input w-32"
        />

        <button
          onClick={handleGenerate}
          className="bg-blue-600 px-4 py-2 rounded-lg"
        >
          Generate
        </button>

      </div>

      {/* DUPLICATE LIST */}
      {items.length > 0 && (
        <div className="space-y-3 mb-6">

          {items.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 items-center bg-[#0f172a] p-3 rounded-lg"
            >

              <span className="text-gray-400 w-10">
                #{index + 1}
              </span>

              <input
                placeholder="Serial Number"
                value={item.serialNumber}
                onChange={(e) =>
                  handleChange(index, e.target.value)
                }
                className="input flex-1"
              />

            </div>
          ))}

        </div>
      )}

      {/* SUBMIT */}
      {items.length > 0 && (
        <button
          onClick={handleSubmit}
          className="bg-green-600 px-6 py-2 rounded-lg"
        >
          Add Inventory
        </button>
      )}

    </div>
  );
}