import React from "react";

const StatItem = ({ stat, isDark }) => {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg ${
        isDark ? "bg-slate-800/50" : "bg-gray-100/50"
      }`}
    >
      <div className="flex items-center gap-2">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isDark ? "bg-purple-500/10 text-purple-400" : "bg-purple-100 text-purple-600"
          }`}
        >
          {stat.icon}
        </div>
        <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          {stat.label}
        </span>
      </div>
      <span className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
        {stat.value}
      </span>
    </div>
  );
};

export default StatItem;
