"use client";

import React from "react";
import { TrendingUp } from "lucide-react";

export default function QuickStatsGrid({ quickStats, isDark }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {quickStats.map((stat, index) => (
        <div
          key={index}
          className={`group backdrop-blur-sm border rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 ${
            isDark
              ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/20"
              : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/40 hover:shadow-xl hover:shadow-purple-300/20"
          }`}
        >
          {/* ICON BOX */}
          <div
            className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
          >
            <div className="text-white">{stat.icon}</div>
          </div>

          {/* VALUE */}
          <div
            className={`text-3xl font-bold mb-1 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {stat.value}
          </div>

          {/* LABEL */}
          <div
            className={`text-sm font-medium mb-2 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {stat.label}
          </div>

          {/* TREND */}
          <div
            className={`text-xs flex items-center gap-1 ${
              stat.trend === "up"
                ? "text-green-400"
                : isDark
                ? "text-gray-500"
                : "text-gray-400"
            }`}
          >
            {stat.trend === "up" && <TrendingUp className="w-3 h-3" />}
            {stat.change}
          </div>
        </div>
      ))}
    </div>
  );
}
