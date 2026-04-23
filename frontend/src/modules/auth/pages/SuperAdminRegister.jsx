import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../authAPI";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function SuperAdminRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const isValid =
    form.name &&
    form.email &&
    form.password &&
    form.password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      return toast.error("Please fill all fields correctly");
    }

    try {
      setLoading(true);

      await registerUser({ ...form, role: "SUPER_ADMIN" });

      toast.success("Account created 🚀");

      localStorage.setItem("verifyEmail", form.email);

      navigate("/verify-otp", {
        state: { email: form.email, type: "register" }
      });

    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-[#0b1220] border border-white/10 rounded-2xl 
      px-8 py-10 min-h-[520px] flex flex-col justify-center
      shadow-[0_25px_70px_rgba(0,0,0,0.6)]"
    >

      {/* Heading */}
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-semibold text-gray-300 mb-2"
        >
          Create Super Admin
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-sm"
        >
          Set up your inventory system in seconds
        </motion.p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* NAME */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="text-sm text-gray-400 mb-1 block">
            Full Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-lg 
            bg-[#020617] border border-white/10 text-white 
            placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 
            focus:scale-[1.02]
            transition-all duration-200"
          />
        </motion.div>

        {/* EMAIL */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="text-sm text-gray-400 mb-1 block">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full px-4 py-3 rounded-lg 
            bg-[#020617] border border-white/10 text-white 
            placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 
            focus:scale-[1.02]
            transition-all duration-200"
          />
        </motion.div>

        {/* PASSWORD */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="text-sm text-gray-400 mb-1 block">
            Password
          </label>

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              className="w-full px-4 py-3 pr-12 rounded-lg 
              bg-[#020617] border border-white/10 text-white 
              placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:scale-[1.02]
              transition-all duration-200"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-sm text-gray-400 
              cursor-pointer hover:text-white transition"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {form.password && form.password.length < 6 && (
            <p className="text-red-400 text-xs mt-1">
              Must be at least 6 characters
            </p>
          )}
        </motion.div>

        {/* BUTTON */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          disabled={!isValid || loading}
          className="w-full py-3.5 rounded-lg font-medium 
          bg-gradient-to-r from-blue-500 to-blue-600 
          hover:from-blue-600 hover:to-blue-700 
          hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]
          transition-all duration-200 
          text-white disabled:opacity-50 
          flex justify-center items-center gap-2"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          {loading ? "Creating..." : "Create Account"}
        </motion.button>

        {/* FOOTER */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-sm text-center text-gray-400 pt-2"
        >
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </motion.p>

      </form>
    </motion.div>
  );
}