"use client";
import React from "react";
import { useSelector } from "react-redux";

export default function AdminTable({ columns, data, actions, onRowClick }) {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  if (!data || data.length === 0) {
    return (
      <div
        className={`text-center py-12 rounded-xl border ${
          isDark
            ? "bg-slate-900/50 border-purple-500/20 text-gray-400"
            : "bg-white/80 border-purple-300/20 text-gray-500"
        }`}
      >
        No data available
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border backdrop-blur-xl overflow-hidden ${
        isDark
          ? "bg-slate-900/50 border-purple-500/20"
          : "bg-white/80 border-purple-300/20"
      }`}
    >
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full">
          <thead>
            <tr
              className={`border-b ${
                isDark ? "border-purple-500/20" : "border-purple-300/20"
              }`}
            >
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`text-left py-4 px-6 text-sm font-semibold whitespace-nowrap ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {col.header}
                </th>
              ))}
              {actions && (
                <th
                  className={`text-right py-4 px-6 text-sm font-semibold whitespace-nowrap ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                onClick={() => onRowClick && onRowClick(row)}
                className={`border-b last:border-0 transition-colors ${
                  isDark
                    ? "border-purple-500/10 hover:bg-slate-800/50"
                    : "border-purple-300/10 hover:bg-purple-50/50"
                } ${onRowClick ? "cursor-pointer" : ""}`}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`py-4 px-6 whitespace-nowrap ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
                {actions && (
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
