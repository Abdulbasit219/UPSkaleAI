import React from "react";

const StatsGrid = ({ stats, isDark }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`group relative p-6 rounded-3xl border transition-all duration-500 hover:scale-[1.02] ${
            isDark
              ? "bg-slate-900/50 border-white/5 hover:border-purple-500/30 shadow-2xl shadow-purple-500/5"
              : "bg-white border-gray-100 hover:border-purple-200 shadow-2xl shadow-gray-200/50"
          }`}
        >
          {/* Background Glow */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-3xl`}
          />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
              >
                {stat.icon}
              </div>
            </div>
            <div>
              <div className="text-3xl font-black mb-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div
                className={`text-sm font-bold uppercase tracking-widest ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {stat.label}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
