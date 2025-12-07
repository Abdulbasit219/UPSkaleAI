import React from "react";

/**
 * Input field component with icon support
 */
export default function InputField({
  label,
  type = "text",
  icon: Icon,
  isDark,
  className = "",
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label
          className={`block text-sm font-medium mb-2 ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          />
        )}
        <input
          type={type}
          className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors ${
            isDark
              ? "bg-slate-800 border-slate-700 text-white"
              : "bg-white border-gray-300 text-gray-900"
          }`}
          {...props}
        />
      </div>
    </div>
  );
}
