import React from "react";

/**
 * Button component with variants
 */
export default function Button({
  children,
  variant = "primary", // 'primary' | 'secondary' | 'danger'
  icon: Icon,
  isDark,
  className = "",
  ...props
}) {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all";
      case "secondary":
        return `px-6 py-2.5 rounded-lg font-semibold transition-all border ${
          isDark
            ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
            : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
        }`;
      case "danger":
        return "px-4 py-2 bg-red-500/10 text-red-400 rounded-lg font-semibold border border-red-500/20 hover:bg-red-500/20 transition-all";
      default:
        return "";
    }
  };

  return (
    <button
      className={`${getVariantClasses()} ${className} flex items-center gap-2`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}
