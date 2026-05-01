import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../authAPI";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid = email && email.includes("@");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      return toast.error("Enter a valid email");
    }

    try {
      setLoading(true);

      const res = await forgotPassword({ email });

      toast.success(
        res?.data?.message || "OTP sent to your email 📩"
      );

      localStorage.setItem("verifyEmail", email);

      setTimeout(() => {
        navigate("/verify-otp", {
          state: { email, type: "forgot" }
        });
      }, 800);

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
      px-8 py-10 min-h-[500px] flex flex-col justify-center
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
          Forgot Password
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-sm"
        >
          Enter your email to receive a verification code
        </motion.p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="text-sm text-gray-400 mb-1 block">
            Email Address
          </label>

          <input
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg 
            bg-[#020617] border border-white/10 text-white 
            placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 
            focus:scale-[1.02]
            transition-all duration-200"
          />

          {/* Inline Validation */}
          {email && !email.includes("@") && (
            <p className="text-red-400 text-xs mt-1">
              Enter a valid email
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
          {loading ? "Sending..." : "Send OTP"}
        </motion.button>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-center text-gray-400 pt-2"
        >
          Remember your password?{" "}
          <span
            onClick={() => navigate("/admin/login")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Back to Login
          </span>
        </motion.p>

      </form>
    </motion.div>
  );
};

export default ForgotPassword;