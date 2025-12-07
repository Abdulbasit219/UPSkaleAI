"use client";
import React from "react";

/**
 * GradientText component for brand-colored text
 * 
 * @param {Object} props
 * @param {"primary"|"secondary"|"full"} props.variant - Gradient type
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Text content
 */
export default function GradientText({
  variant = "full",
  className = "",
  children,
  ...props
}) {
  const variantStyles = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent",
    secondary: "bg-gradient-to-r from-secondary-500 to-secondary-600 bg-clip-text text-transparent",
    full: "bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 bg-clip-text text-transparent",
  };

  return (
    <span className={`${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
