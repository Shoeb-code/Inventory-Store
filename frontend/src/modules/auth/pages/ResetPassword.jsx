import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../authAPI";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("verifyEmail");

    if (location.state?.email) {
      setEmail(location.state.email);
    } else if (storedEmail) {
      setEmail(storedEmail);
    } else {
      toast.error("Session expired. Please try again.");
      navigate("/forgot-password");
    }
  }, [location, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const isValid =
    form.newPassword &&
    form.confirmPassword &&
    form.newPassword.length >= 6 &&
    form.newPassword === form.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      return toast.error("Please fix the errors");
    }

    try {
      setLoading(true);

      await resetPassword({
        email,
        newPassword: form.newPassword
      });

      toast.success("Password reset successful 🎉");

      localStorage.removeItem("verifyEmail");
      navigate("/admin/login");

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#0b1220] border border-white/10 rounded-2xl 
      px-8 py-10 min-h-[520px] flex flex-col justify-center
      shadow-[0_25px_70px_rgba(0,0,0,0.6)]"
    >

      {/* Header */}
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-semibold text-white mb-2"
        >
          Set New Password
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-sm"
        >
          Create a secure password for your account
        </motion.p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* New Password */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="text-sm text-gray-400 mb-1 block">
            New Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              placeholder="Minimum 6 characters"
              value={form.newPassword}
              onChange={handleChange}
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

          {/* Password Hint */}
          {form.newPassword && form.newPassword.length < 6 && (
            <p className="text-red-400 text-xs mt-1">
              Must be at least 6 characters
            </p>
          )}
        </motion.div>

        {/* Confirm Password */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="text-sm text-gray-400 mb-1 block">
            Confirm Password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Re-enter password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg 
            bg-[#020617] border border-white/10 text-white 
            placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 
            focus:scale-[1.02]
            transition-all duration-200"
          />

          {form.confirmPassword &&
            form.newPassword !== form.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">
                Passwords do not match
              </p>
            )}
        </motion.div>

        {/* Button */}
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
          {loading ? "Resetting..." : "Reset Password"}
        </motion.button>

      </form>
    </motion.div>
  );
};

export default ResetPassword;