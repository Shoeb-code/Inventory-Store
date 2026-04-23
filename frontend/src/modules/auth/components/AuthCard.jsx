export default function AuthCard({ title, subtitle, children }) {
    return (
      <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-8 shadow-xl w-full max-w-md">
  
        <h2 className="text-2xl font-semibold text-white text-center mb-2">
          {title}
        </h2>
  
        <p className="text-gray-400 text-sm text-center mb-6">
          {subtitle}
        </p>
  
        {children}
  
      </div>
    );
  }