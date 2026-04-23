import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { verifyOtp, forgotPassword } from "../authAPI";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email ||
    localStorage.getItem("verifyEmail") ||
    "";

  const type = location.state?.type || "register";

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  const inputsRef = useRef([]);

  useEffect(() => {
    if (!email) {
      toast.error("Session expired. Please try again.");
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // 🔥 Auto-submit when OTP complete
  useEffect(() => {
    if (otp.every((d) => d !== "")) {
      handleVerify();
    }
  }, [otp]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(paste)) return;

    const newOtp = paste.split("");
    setOtp(newOtp);
  };

  const handleResend = async () => {
    try {
      await forgotPassword({ email });
      toast.success("OTP resent");
      setTimer(30);
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length < 6) return;

    try {
      setLoading(true);

      await verifyOtp({ email, otp: finalOtp });

      localStorage.removeItem("verifyEmail");
      toast.success("OTP verified 🎉");

      setTimeout(() => {
        if (type === "forgot") {
          navigate("/reset-password", { state: { email } });
        } else {
          navigate("/login");
        }
      }, 600);

    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto"
    >

      <div className="bg-[#0b1220] border border-white/10 rounded-2xl 
      px-8 py-10 min-h-[500px] flex flex-col justify-center
      shadow-[0_30px_80px_rgba(0,0,0,0.6)]">

        {/* Header */}
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-semibold text-white mb-2"
          >
            Verify your code
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm"
          >
            We sent a 6-digit code to
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white text-sm font-medium mt-1"
          >
            {email}
          </motion.p>
        </div>

        {/* OTP Inputs */}
        <div
          className="flex justify-between gap-3 mb-8"
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <motion.input
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-14 h-14 text-center text-xl rounded-xl 
              bg-[#020617] border border-white/10 text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:scale-110 transition-all duration-150"
            />
          ))}
        </div>

        {/* Button */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleVerify}
          disabled={loading}
          className="w-full py-3.5 rounded-lg font-medium 
          bg-gradient-to-r from-blue-500 to-blue-600 
          hover:from-blue-600 hover:to-blue-700 
          hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]
          transition-all duration-200 
          text-white disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          {loading ? "Verifying..." : "Verify Code"}
        </motion.button>

        {/* Resend */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-center mt-6 text-gray-400"
        >
          Didn’t receive the code?{" "}
          {timer > 0 ? (
            <span className="text-gray-500">{timer}s</span>
          ) : (
            <span
              onClick={handleResend}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Resend
            </span>
          )}
        </motion.p>

      </div>
    </motion.div>
  );
}