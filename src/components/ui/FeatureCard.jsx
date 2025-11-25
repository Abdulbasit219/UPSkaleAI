"use client";
import React from "react";
import { useSelector } from "react-redux";

/**
 * FeatureCard component for showcasing features
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Feature icon
 * @param {string} props.title - Feature title
 * @param {string} props.description - Feature description
 */
export default function FeatureCard({
  icon,
  title,
  description,
  className = "",
  ...props
}) {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  return (
    <div
      className={`group p-8 backdrop-blur-sm border rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
        isDark
          ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-primary-500/20 hover:border-primary-500/50 hover:shadow-xl hover:shadow-primary-500/20"
          : "bg-gradient-to-br from-white/80 to-white/40 border-primary-300/20 hover:border-primary-300/50 hover:shadow-xl hover:shadow-primary-300/20"
      } ${className}`}
      {...props}
    >
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
          isDark
            ? "bg-gradient-to-br from-primary-500/20 to-secondary-500/20"
            : "bg-gradient-to-br from-primary-100 to-secondary-100"
        }`}
      >
        <div className="text-primary-400">{icon}</div>
      </div>
      <h3
        className={`text-xl font-bold mb-3 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h3>
      <p className={isDark ? "text-gray-400" : "text-gray-600"}>
        {description}
      </p>
    </div>
  );
}
