const StatsGrid = ({ stats, isDark }) => (
  <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 max-w-5xl mx-auto px-2 mb-8">
    {stats.map((stat, index) => (
      <div
        key={index}
        className={`group relative overflow-hidden p-3 sm:p-4 md:p-6 backdrop-blur-xl border rounded-lg sm:rounded-xl md:rounded-2xl hover:scale-105 transition-all ${
          isDark
            ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/40"
            : "bg-white/80 border-purple-300/20 hover:border-purple-300/40"
        }`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`}
        />
        <div className="relative">
          <div className="flex justify-center mb-2 sm:mb-3">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br ${stat.color} rounded-lg sm:rounded-xl flex items-center justify-center opacity-80`}
            >
              <div className="text-white scale-75 sm:scale-100">{stat.icon}</div>
            </div>
          </div>
          <div
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
          >
            {stat.value}
          </div>
          <div
            className={`text-xs sm:text-sm font-medium ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {stat.label}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default StatsGrid;