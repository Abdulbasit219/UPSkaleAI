import React from "react";

/**
 * Settings card component
 */
export default function SettingsCard({
  title,
  children,
  isDark,
  variant = "default",
}) {
  const borderColor =
    variant === "danger"
      ? isDark
        ? "border-red-500/20 hover:border-red-500/30"
        : "border-red-300/20 hover:border-red-300/30"
      : isDark
        ? "border-purple-500/20 hover:border-purple-500/30"
        : "border-purple-300/20 hover:border-purple-300/30";

  return (
    <div
      className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
        isDark ? `bg-slate-900/50 ${borderColor}` : `bg-white/80 ${borderColor}`
      }`}
    >
      {title && (
        <h2
          className={`text-xl font-bold mb-6 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
