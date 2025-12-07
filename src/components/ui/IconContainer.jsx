"use client";
import React from "react";
import { useSelector } from "react-redux";

/**
 * IconContainer component for consistent icon styling
 * 
 * @param {Object} props
 * @param {"default"|"gradient"} props.variant - Container style
 * @param {"sm"|"md"|"lg"} props.size - Container size
 * @param {React.ReactNode} props.icon - Icon element
 * @param {string} props.iconColor - Icon color class (e.g., "text-primary-400")
 */
export default function IconContainer({
  variant = "gradient",
  size = "md",
  icon,
  iconColor = "text-primary-400",
  className = "",
  ...props
}) {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const baseStyles = "rounded-xl flex items-center justify-center border";

  const sizeStyles = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const variantStyles = {
    default: isDark
      ? "bg-slate-800/50 border-primary-500/30"
      : "bg-gray-100 border-primary-300/30",
    gradient: isDark
      ? "bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border-primary-500/30"
      : "bg-gradient-to-br from-primary-100 to-secondary-100 border-primary-300/30",
  };

  return (
    <div className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`} {...props}>
      <div className={iconColor}>{icon}</div>
    </div>
  );
}
