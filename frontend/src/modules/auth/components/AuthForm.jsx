// modules/auth/components/AuthForm.jsx

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const AuthForm = ({
  fields = [],
  formData,
  handleChange,
  handleSubmit,
  buttonText = "Submit",
  loading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex flex-col gap-5"
    >
      {/* 🔹 Dynamic Fields */}
      {fields.map((field) => {
        const isPassword = field.type === "password";

        return (
          <div key={field.name} className="flex flex-col gap-1">

            {/* Label */}
            <label className="text-sm text-slate-400">
              {field.label || field.name}
            </label>

            {/* Input Wrapper */}
            <div className="relative">

              <input
                type={isPassword && showPassword ? "text" : field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="w-full p-3 pr-10 rounded-lg bg-slate-800 text-white 
                           border border-slate-700 outline-none 
                           focus:ring-2 focus:ring-blue-500 
                           focus:border-blue-500 transition"
              />

              {/* 👁️ Password Toggle */}
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}

            </div>
          </div>
        );
      })}

      {/* 🔹 Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`mt-2 p-3 rounded-lg font-semibold transition-all duration-200 
          ${
            loading
              ? "bg-slate-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.01]"
          }`}
      >
        {loading ? "Please wait..." : buttonText}
      </button>

    </form>
  );
};

export default AuthForm;