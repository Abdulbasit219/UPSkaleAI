"use client";
import React from "react";
import { useSelector } from "react-redux";
import { Search, Filter } from "lucide-react";

export default function SearchFilterBar({
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters,
  onFilterChange,
  activeFilter,
}) {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  return (
    <div
      className={`rounded-xl border backdrop-blur-xl p-4 mb-6 ${
        isDark
          ? "bg-slate-900/50 border-purple-500/20"
          : "bg-white/80 border-purple-300/20"
      }`}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg transition-all outline-none ${
              isDark
                ? "bg-slate-800 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-500"
                : "bg-white border-purple-300/30 text-gray-900 placeholder:text-gray-500 focus:border-purple-500"
            }`}
          />
        </div>

        {filters && (
          <div className="flex items-center gap-2">
            <div
              className={`p-2.5 rounded-lg border ${
                isDark
                  ? "bg-slate-800 border-purple-500/30"
                  : "bg-white border-purple-300/30"
              }`}
            >
              <Filter
                className={`w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              />
            </div>
            <select
              value={activeFilter}
              onChange={(e) => onFilterChange(e.target.value)}
              className={`px-4 py-2.5 border rounded-lg transition-all outline-none cursor-pointer min-w-[150px] ${
                isDark
                  ? "bg-slate-800 border-purple-500/30 text-white focus:border-purple-500"
                  : "bg-white border-purple-300/30 text-gray-900 focus:border-purple-500"
              }`}
            >
              {filters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
