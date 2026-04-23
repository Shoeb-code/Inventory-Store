import { useState } from "react";

export default function FloatingInput({
  label,
  type = "text",
  name,
  value,
  onChange
}) {
  const [focused, setFocused] = useState(false);

  const isActive = focused || value;

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 pt-5 pb-2 rounded-lg 
        bg-[#020617] border border-white/10 text-white 
        focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label
        className={`absolute left-4 transition-all duration-200 
        ${
          isActive
            ? "top-1 text-xs text-blue-400"
            : "top-3 text-sm text-gray-400"
        }`}
      >
        {label}
      </label>
    </div>
  );
}