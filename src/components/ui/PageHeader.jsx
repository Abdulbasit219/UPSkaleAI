"use client";
import React from "react";
import { useSelector } from "react-redux";
import Badge from "./Badge";
import GradientText from "./GradientText";

/**
 * PageHeader component for consistent page headers
 * 
 * @param {Object} props
 * @param {string} props.badge - Badge text
 * @param {React.ReactNode} props.badgeIcon - Badge icon
 * @param {string} props.title - Page title
 * @param {string} props.highlightedTitle - Highlighted part of title
 * @param {string} props.description - Page description
 * @param {React.ReactNode} props.actions - Action buttons
 */
export default function PageHeader({
  badge,
  badgeIcon,
  title,
  highlightedTitle,
  description,
  actions,
  className = "",
  ...props
}) {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  return (
    <div className={`text-center mb-12 ${className}`} {...props}>
      {badge && (
        <Badge size="md" variant="primary" icon={badgeIcon} className="mb-6">
          {badge}
        </Badge>
      )}

      <h1
        className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 leading-tight ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
        {highlightedTitle && (
          <>
            {" "}
            <GradientText>{highlightedTitle}</GradientText>
          </>
        )}
      </h1>

      {description && (
        <p
          className={`text-xl mb-8 max-w-3xl mx-auto ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {description}
        </p>
      )}

      {actions && <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">{actions}</div>}
    </div>
  );
}
