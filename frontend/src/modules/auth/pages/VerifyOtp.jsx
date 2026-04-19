import { useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { verifyOtp } from "../authAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
    
  const navigate = useNavigate();

  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  const inputsRef = useRef([]);

  // ⏱ Timer
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Handle change
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Paste support
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(paste)) return;

    const newOtp = paste.split("");
    setOtp(newOtp);

    newOtp.forEach((val, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = val;
      }
    });
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("");
  
    if (finalOtp.length < 6) {
      toast.error("Enter complete OTP");
      return;
    }
  
    try {
      setLoading(true);
  
      await verifyOtp({ email, otp: finalOtp });
  
      toast.success("Account verified 🎉");
  
      setTimeout(() => {
        navigate("/login");
      }, 1000);
  
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">

      <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-8 shadow-2xl">

        {/* Title */}
        <h2 className="text-2xl font-semibold text-white text-center mb-2">
          Verify OTP
        </h2>

        <p className="text-gray-400 text-sm text-center mb-6">
          Code sent to <span className="text-white">{email}</span>
        </p>

        {/* OTP INPUTS */}
        <div
          className="flex justify-between mb-6"
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg rounded-lg bg-[#020617] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        {/* Button */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-white text-black font-medium p-3 rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
          )}
          {loading ? "Verifying..." : "Verify"}
        </button>

        {/* Resend */}
        <p className="text-sm text-center mt-4 text-gray-400">
          Didn’t receive code?{" "}
          {timer > 0 ? (
            <span>{timer}s</span>
          ) : (
            <span className="text-white cursor-pointer hover:underline">
              Resend
            </span>
          )}
        </p>

      </div>
    </div>
  );
}