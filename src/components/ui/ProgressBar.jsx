"use client";
import React from "react";
import { useSelector } from "react-redux";

/**
 * ProgressBar component for linear and circular progress indicators
 * 
 * @param {Object} props
 * @param {"linear"|"circular"} props.type - Progress bar type
 * @param {number} props.value - Progress value (0-100)
 * @param {boolean} props.showLabel - Show percentage label
 * @param {string} props.size - Size for circular progress ("sm"|"md"|"lg")
 */
export default function ProgressBar({
  type = "linear",
  value = 0,
  showLabel = false,
  size = "md",
  className = "",
  ...props
}) {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  if (type === "circular") {
    const sizes = {
      sm: { width: 120, strokeWidth: 12, radius: 50 },
      md: { width: 200, strokeWidth: 20, radius: 80 },
      lg: { width: 264, strokeWidth: 20, radius: 80 },
    };

    const { width, strokeWidth, radius } = sizes[size];
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (circumference * value) / 100;

    return (
      <div className={`relative ${className}`} {...props}>
        <svg
          className="transform -rotate-90"
          width={width}
          height={width}
          viewBox={`0 0 ${width} ${width}`}
        >
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            stroke={isDark ? "#1e293b" : "#e2e8f0"}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgb(var(--primary-500))" />
              <stop offset="100%" stopColor="rgb(var(--secondary-500))" />
            </linearGradient>
          </defs>
        </svg>
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                {value}
              </div>
              <div className={isDark ? "text-gray-400" : "text-gray-600"}>
                out of 100
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Linear progress bar
  return (
    <div className={`w-full ${className}`} {...props}>
      {showLabel && (
        <div className="flex justify-between mb-2">
          <span className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
            Progress
          </span>
          <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {value}%
          </span>
        </div>
      )}
      <div
        className={`w-full rounded-full h-2 ${
          isDark ? "bg-slate-700" : "bg-gray-200"
        }`}
      >
        <div
          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
