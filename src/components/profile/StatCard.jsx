const StatCard = ({ stat, isDark }) => {
  return (
    <div
      className={`group backdrop-blur-sm border rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 ${
        isDark
          ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/20"
          : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/40 hover:shadow-xl hover:shadow-purple-300/20"
      }`}
    >
      {/* Icon background */}
      <div
        className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
      >
        <div className="text-white">{stat.icon}</div>
      </div>

      {/* Value */}
      <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        {stat.value}
      </div>

      {/* Label */}
      <div
        className={`text-sm font-medium ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {stat.label}
      </div>
    </div>
  );
};

export default StatCard;
