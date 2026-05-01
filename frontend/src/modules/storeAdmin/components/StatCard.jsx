import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  icon,
  trend,
  trendValue,
}) {
  const isPositive = trend === "up";

  return (
    <div className="relative p-5 rounded-3xl 
                    bg-gradient-to-br from-[#0f172a] to-[#020617] 
                    border border-white/10 
                    shadow-lg hover:shadow-2xl 
                    transition duration-300 group overflow-hidden">

      {/* 🔥 Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition 
                      bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent blur-xl" />

      {/* CONTENT */}
      <div className="relative z-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-3">

          <p className="text-xs text-slate-400 uppercase tracking-wide">
            {title}
          </p>

          {icon && (
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-blue-400">
              {icon}
            </div>
          )}
        </div>

        {/* VALUE */}
        <h2 className="text-2xl font-semibold tracking-tight">
          {value}
        </h2>

        {/* TREND */}
        {trendValue && (
          <div className="flex items-center gap-1 mt-3 text-xs">

            {isPositive ? (
              <ArrowUpRight size={14} className="text-green-400" />
            ) : (
              <ArrowDownRight size={14} className="text-red-400" />
            )}

            <span
              className={
                isPositive ? "text-green-400" : "text-red-400"
              }
            >
              {trendValue}
            </span>

            <span className="text-slate-500">
              vs last period
            </span>
          </div>
        )}

      </div>
    </div>
  );
}