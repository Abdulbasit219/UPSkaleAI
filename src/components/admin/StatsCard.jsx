"use client";
import React from "react";
import { useSelector } from "react-redux";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatsCard({
  label,
  value,
  change,
  trend = "up",
  icon: Icon,
  color = "purple",
  loading = false,
}) {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const getColorClasses = (c) => {
    const colors = {
      purple: "text-purple-500",
      green: "text-green-500",
      pink: "text-pink-500",
      blue: "text-blue-500",
      yellow: "text-yellow-500",
      red: "text-red-500",
      orange: "text-orange-500",
    };
    return colors[c] || colors.purple;
  };

  if (loading) {
    return (
      <div
        className={`rounded-xl border p-6 animate-pulse ${
          isDark
            ? "bg-slate-900/50 border-purple-500/20"
            : "bg-white/80 border-purple-300/20"
        }`}
      >
        <div className="h-8 w-8 bg-gray-300/20 rounded-lg mb-4"></div>
        <div className="h-4 w-24 bg-gray-300/20 rounded mb-2"></div>
        <div className="h-8 w-16 bg-gray-300/20 rounded"></div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border backdrop-blur-xl p-6 transition-all hover:scale-[1.02] ${
        isDark
          ? "bg-slate-900/50 border-purple-500/20"
          : "bg-white/80 border-purple-300/20"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-2 rounded-lg ${isDark ? "bg-white/5" : "bg-gray-100"}`}
        >
          <Icon className={`w-6 h-6 ${getColorClasses(color)}`} />
        </div>
        {change && (
          <div className="flex items-center gap-1">
            {trend === "up" ? (
              <ArrowUpRight className="w-4 h-4 text-green-500" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-500" />
            )}
            <span
              className={`text-sm font-medium ${
                trend === "up" ? "text-green-500" : "text-red-500"
              }`}
            >
              {change}
            </span>
          </div>
        )}
      </div>
      <p
        className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}
      >
        {label}
      </p>
      <p
        className={`text-3xl font-bold mt-1 ${isDark ? "text-white" : "text-gray-900"}`}
      >
        {value}
      </p>
    </div>
  );
}
