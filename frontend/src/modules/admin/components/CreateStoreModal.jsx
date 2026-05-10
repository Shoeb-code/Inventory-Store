import { createStoreAPI }
from "../../store/storeAPI.js";

import toast
from "react-hot-toast";

import { useState }
from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  X,
  Eye,
  EyeOff,
  Store,
  ShieldCheck,
  Sparkles,
  LockKeyhole,
} from "lucide-react";

export default function CreateStoreModal({
  isOpen,
  onClose,
}) {

  const [form, setForm] =
    useState({
      storeName: "",
      storeId: "",
      password: "",
      adminEmail: "",
    });

  const [showPassword,
    setShowPassword] =
      useState(false);

  const [loading,
    setLoading] =
      useState(false);

  const isValid =
    form.storeName &&
    form.storeId &&
    form.adminEmail &&
    form.password.length >= 6;

  // SUBMIT
  const handleSubmit =
    async () => {

      if (!isValid) {
        return toast.error(
          "Please fill all fields"
        );
      }

      try {

        setLoading(true);

        const payload = {
          name: form.storeName,
          storeId: form.storeId,
          password: form.password,
        };

        const res =
          await createStoreAPI(
            payload
          );

        toast.success(
          res.message ||
          "Store created 🚀"
        );

        setForm({
          storeName: "",
          storeId: "",
          password: "",
          adminEmail: "",
        });

        onClose();

      } catch (err) {

        toast.error(
          err.message ||
          "Failed to create store"
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <AnimatePresence>

      {isOpen && (

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
        >

          {/* MODAL */}
          <motion.div
            initial={{
              scale: 0.92,
              opacity: 0,
              y: 40,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.92,
              opacity: 0,
              y: 40,
            }}
            transition={{
              duration: 0.25,
            }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0f172a]/95 shadow-[0_0_80px_rgba(59,130,246,0.15)] backdrop-blur-2xl"
          >

            {/* GLOW */}
            <div className="absolute -top-20 -right-20 w-52 h-52 bg-blue-500/20 rounded-full blur-3xl" />

            <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-purple-500/20 rounded-full blur-3xl" />

            {/* HEADER */}
            <div className="relative p-6 border-b border-white/5">

              <button
                onClick={onClose}
                className="absolute top-5 right-5 text-slate-400 hover:text-white transition"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">

                  <Store
                    size={24}
                    className="text-white"
                  />

                </div>

                <div>

                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">

                    Create Store

                    <Sparkles
                      size={16}
                      className="text-yellow-400"
                    />

                  </h2>

                  <p className="text-sm text-slate-400 mt-1">
                    Setup a new store workspace
                  </p>

                </div>

              </div>

            </div>

            {/* FORM */}
            <div className="p-6 space-y-5">

              {/* STORE NAME */}
              <InputGroup
                label="Store Name"
                icon={<Store size={15} />}
              >

                <input
                  placeholder="e.g. Delhi Warehouse"
                  value={form.storeName}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      storeName:
                        e.target.value,
                    })
                  }
                  className="input-style"
                />

              </InputGroup>

              {/* STORE ID */}
              <InputGroup
                label="Store ID"
                icon={<ShieldCheck size={15} />}
              >

                <input
                  placeholder="e.g. STORE_DELHI_01"
                  value={form.storeId}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      storeId:
                        e.target.value,
                    })
                  }
                  className="input-style"
                />

              </InputGroup>

              {/* EMAIL */}
              <InputGroup
                label="Super Admin Email"
                icon={<ShieldCheck size={15} />}
              >

                <input
                  type="email"
                  placeholder="admin@company.com"
                  value={form.adminEmail}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      adminEmail:
                        e.target.value,
                    })
                  }
                  className="input-style"
                />

              </InputGroup>

              {/* PASSWORD */}
              <InputGroup
                label="Password"
                icon={<LockKeyhole size={15} />}
              >

                <div className="relative">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Minimum 6 characters"
                    value={form.password}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password:
                          e.target.value,
                      })
                    }
                    className="input-style pr-10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                  >

                    {showPassword
                      ? (
                        <EyeOff size={16} />
                      )
                      : (
                        <Eye size={16} />
                      )}

                  </button>

                </div>

              </InputGroup>

              {/* PASSWORD STRENGTH */}
              <div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">

                  <span>
                    Password strength
                  </span>

                  <span>
                    {
                      form.password
                        .length
                    }
                    /6
                  </span>

                </div>

                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">

                  <div
                    className={`h-full rounded-full transition-all ${
                      form.password
                        .length >= 6
                        ? "bg-emerald-500 w-full"
                        : form.password
                            .length >= 3
                        ? "bg-yellow-500 w-1/2"
                        : "bg-red-500 w-1/4"
                    }`}
                  />

                </div>

              </div>

            </div>

            {/* FOOTER */}
            <div className="p-6 border-t border-white/5 flex gap-3">

              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition text-sm font-medium text-slate-300"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={
                  !isValid ||
                  loading
                }
                className={`flex-1 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isValid
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white shadow-lg shadow-blue-500/20"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed"
                }`}
              >

                {loading
                  ? "Creating..."
                  : "Create Store"}

              </button>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}

// INPUT GROUP
const InputGroup = ({
  label,
  icon,
  children,
}) => (
  <div>

    <label className="flex items-center gap-2 text-xs text-slate-400 mb-2">

      <span className="text-slate-500">
        {icon}
      </span>

      {label}

    </label>

    {children}

  </div>
);