import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../authAPI";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STORE_ADMIN"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
        setLoading(true);
        await registerUser(form);
      
        toast.success("OTP sent to your email 📩");
      
        navigate("/verify", { state: { email: form.email } });
      
      } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong");
      }


  };

  return (
    <div className="w-full max-w-md mx-auto">

      <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-8 shadow-2xl transition-all">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-white">
            Create your account
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Start managing your inventory smarter
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-500/10 text-red-400 border border-red-500/20 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-[#020617] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={handleChange}
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full p-3 rounded-lg bg-[#020617] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={handleChange}
            required
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-[#020617] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={handleChange}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-xs text-gray-400 hover:text-white transition"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* ROLE */}
          <select
            name="role"
            className="w-full p-3 rounded-lg bg-[#020617] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={handleChange}
          >
            <option value="STORE_ADMIN" className="text-black">
              Store Admin
            </option>
            <option value="SUPER_ADMIN" className="text-black">
              Super Admin
            </option>
          </select>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium p-3 rounded-lg hover:bg-gray-200 active:scale-[0.98] transition-all"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Creating..." : "Create account"}
          </button>

        </form>

        {/* FOOTER */}
        <p className="text-sm text-center mt-6 text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-white hover:underline cursor-pointer"
          >
            Sign in
          </span>
        </p>

      </div>
    </div>
  );
}