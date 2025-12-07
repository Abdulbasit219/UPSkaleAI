"use client";
import React from "react";
import { useSelector } from "react-redux";

/**
 * Reusable Card component with glass-morphism and theme support
 * 
 * @param {Object} props
 * @param {"default"|"gradient"|"bordered"} props.variant - Card style variant
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Card content
 */
export default function Card({
  variant = "default",
  className = "",
  children,
  ...props
}) {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const baseStyles = "backdrop-blur-xl rounded-2xl p-6 transition-all duration-300";

  const variantStyles = {
    default: isDark
      ? "bg-slate-900/50 border border-primary-500/20"
      : "bg-white/80 border border-primary-300/20",
    gradient: isDark
      ? "bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/30"
      : "bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-300/30",
    bordered: isDark
      ? "bg-slate-900/50 border border-primary-500/30 hover:border-primary-500/50"
      : "bg-white/80 border border-primary-300/30 hover:border-primary-300/50",
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}
