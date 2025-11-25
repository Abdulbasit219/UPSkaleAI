"use client";
import React from "react";
import { useSelector } from "react-redux";
import GradientText from "./GradientText";

/**
 * StatCard component for displaying statistics
 * 
 * @param {Object} props
 * @param {string} props.value - Stat value (e.g., "95%", "10K+")
 * @param {string} props.label - Stat label
 * @param {React.ReactNode} props.icon - Icon element
 */
export default function StatCard({
  value,
  label,
  icon,
  className = "",
  ...props
}) {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  return (
    <div
      className={`text-center p-6 backdrop-blur-sm border rounded-xl transition-all duration-300 hover:scale-105 ${
        isDark
          ? "bg-slate-900/50 border-primary-500/20 hover:border-primary-500/40"
          : "bg-white/80 border-primary-300/20 hover:border-primary-300/40"
      } ${className}`}
      {...props}
    >
      {icon && (
        <div className="flex justify-center mb-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isDark
                ? "bg-gradient-to-br from-primary-500/20 to-secondary-500/20"
                : "bg-gradient-to-br from-primary-100 to-secondary-100"
            }`}
          >
            <div className={isDark ? "text-primary-400" : "text-primary-600"}>
              {icon}
            </div>
          </div>
        </div>
      )}
      <div className="text-4xl font-bold mb-2">
        <GradientText>{value}</GradientText>
      </div>
      <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        {label}
      </div>
    </div>
  );
}
