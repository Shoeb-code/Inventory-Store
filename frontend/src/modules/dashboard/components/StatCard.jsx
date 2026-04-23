export default function StatCard({ title, value, icon, trend, change }) {
    return (
      <div className="relative bg-[#0f172a] border border-white/10 rounded-xl p-5 transition-all hover:bg-white/5 hover:shadow-lg">
  
        {/* Top Row */}
        <div className="flex items-center justify-between">
  
          {/* Title */}
          <p className="text-sm text-gray-400">{title}</p>
  
          {/* Icon */}
          <div className="text-blue-400 bg-blue-500/10 p-2 rounded-lg">
            {icon}
          </div>
  
        </div>
  
        {/* Value */}
        <h3 className="text-2xl font-semibold mt-3 text-white">
          {value}
        </h3>
  
        {/* Trend */}
        {trend && (
          <p
            className={`text-xs mt-2 flex items-center gap-1 ${
              trend === "up" ? "text-green-400" : "text-red-400"
            }`}
          >
            {trend === "up" ? "↑" : "↓"} {change}
          </p>
        )}
  
      </div>
    );
  }