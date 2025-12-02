import React from "react";

/**
 * Toggle switch component
 */
export default function ToggleSwitch({ enabled, onChange, isDark }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        enabled
          ? "bg-gradient-to-r from-purple-500 to-pink-500"
          : isDark
            ? "bg-slate-700"
            : "bg-gray-300"
      }`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
          enabled ? "translate-x-6" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
