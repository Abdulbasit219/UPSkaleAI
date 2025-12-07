"use client";
import React from "react";
import { useSelector } from "react-redux";

export default function PageHeader({ title, description, actions }) {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1
          className={`text-2xl sm:text-3xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h1>
        {description && (
          <p
            className={`mt-1 sm:mt-2 text-sm sm:text-base ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
