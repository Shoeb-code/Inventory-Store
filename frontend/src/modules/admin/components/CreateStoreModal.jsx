import {createStoreAPI} from '../../store/storeAPI.js'
import toast from "react-hot-toast"; // ✅ ADD THIS

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff } from "lucide-react";


export default function CreateStoreModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    storeName: "",
    storeId: "",
    password: "",
    adminEmail: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const isValid =
    form.storeName &&
    form.storeId &&
    form.adminEmail &&
    form.password.length >= 6;

    const handleSubmit = async () => {
        if (!isValid) {
          return toast.error("Please fill all fields");
        }
      
        try {
          const payload = {
            name: form.storeName,
            storeId: form.storeId,
            password: form.password,
      
            // 👉 optional (only if backend supports)
            // adminEmail: form.adminEmail
          };
      
          const res = await createStoreAPI(payload);
      
          toast.success(res.message || "Store created 🚀");
      
          // 🔥 reset form
          setForm({
            storeName: "",
            storeId: "",
            password: "",
            adminEmail: "",
          });
      
          onClose();
      
        } catch (err) {
          toast.error(err.message || "Failed to create store");
        }
      };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            className="w-full max-w-md rounded-2xl 
                       bg-white/5 backdrop-blur-xl 
                       border border-white/10 
                       shadow-2xl p-6 relative"
          >

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white">
                Create Store
              </h2>
              <p className="text-sm text-slate-400">
                Setup store with admin verification
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">

              {/* Store Name */}
              <div>
                <label className="text-xs text-slate-400 mb-1 block">
                  Store Name
                </label>
                <input
                  placeholder="e.g. Delhi Warehouse"
                  value={form.storeName}
                  onChange={(e) =>
                    setForm({ ...form, storeName: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg 
                             bg-slate-800/60 border border-white/10 
                             text-white focus:border-blue-500"
                />
              </div>

              {/* Store ID (MANUAL) */}
              <div>
                <label className="text-xs text-slate-400 mb-1 block">
                  Store ID
                </label>
                <input
                  placeholder="e.g. STORE_DELHI_01"
                  value={form.storeId}
                  onChange={(e) =>
                    setForm({ ...form, storeId: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg 
                             bg-slate-800/60 border border-white/10 
                             text-white focus:border-blue-500"
                />
              </div>

              {/* Super Admin Email */}
              <div>
                <label className="text-xs text-slate-400 mb-1 block">
                  Super Admin Email (Verification)
                </label>
                <input
                  type="email"
                  placeholder="admin@company.com"
                  value={form.adminEmail}
                  onChange={(e) =>
                    setForm({ ...form, adminEmail: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg 
                             bg-slate-800/60 border border-white/10 
                             text-white focus:border-blue-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-xs text-slate-400 mb-1 block">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimum 6 characters"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg 
                               bg-slate-800/60 border border-white/10 
                               text-white pr-10 focus:border-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="flex gap-3 mt-6">

              <button
                onClick={onClose}
                className="flex-1 py-2 rounded-lg border border-white/10 
                           text-slate-300 hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={!isValid}
                className={`flex-1 py-2 rounded-lg font-medium transition
                  ${
                    isValid
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-slate-700 text-slate-400 cursor-not-allowed"
                  }`}
              >
                Create Store
              </button>

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}