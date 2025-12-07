"use client";
import React from "react";
import { useSelector } from "react-redux";

/**
 * Badge component for status indicators and tags
 * 
 * @param {Object} props
 * @param {"primary"|"success"|"warning"|"error"|"info"} props.variant - Badge color variant
 * @param {"sm"|"md"} props.size - Badge size
 * @param {React.ReactNode} props.icon - Optional icon
 * @param {React.ReactNode} props.children - Badge content
 */
export default function Badge({
  variant = "primary",
  size = "md",
  icon = null,
  className = "",
  children,
  ...props
}) {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const baseStyles = "inline-flex items-center gap-1.5 font-medium rounded-full border";

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  const variantStyles = {
    primary: isDark
      ? "bg-primary-500/20 text-primary-300 border-primary-500/30"
      : "bg-primary-100 text-primary-700 border-primary-300/30",
    success: "bg-accent-success/20 text-green-400 border-green-500/30",
    warning: "bg-accent-warning/20 text-yellow-400 border-yellow-500/30",
    error: "bg-accent-error/20 text-red-400 border-red-500/30",
    info: "bg-accent-info/20 text-blue-400 border-blue-500/30",
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`} {...props}>
      {icon}
      {children}
    </span>
  );
}
