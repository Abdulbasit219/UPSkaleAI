import React from "react";
import { Lightbulb } from "lucide-react";
import { getScoreColor, getStatusBadge } from "./utils";

export default function SectionScores({ sections, isDark }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      {sections.map((section, idx) => (
        <div
          key={idx}
          className={`backdrop-blur-xl border rounded-2xl p-4 sm:p-6 transition-all ${
            isDark
              ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/40"
              : "bg-white/80 border-purple-300/20 hover:border-purple-300/40"
          }`}
        >
          <div className="flex items-start justify-between mb-4 gap-3">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isDark
                    ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                    : "bg-gradient-to-br from-purple-100 to-pink-100"
                }`}
              >
                <div className={isDark ? "text-purple-400" : "text-purple-600"}>
                  {section.icon}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-base sm:text-lg font-bold truncate ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {section.name}
                </h3>
                <p
                  className={`text-xs sm:text-sm line-clamp-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  {section.details}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5 sm:gap-2 flex-shrink-0">
              <div
                className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${getScoreColor(
                  section.score
                )} bg-clip-text text-transparent`}
              >
                {section.score.toFixed(0)}%
              </div>
              <div
                className={`flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs border ${
                  getStatusBadge(section.status).color
                }`}
              >
                {getStatusBadge(section.status).icon}
                <span className="capitalize whitespace-nowrap">
                  {section.status.replace("-", " ")}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2 mt-3 sm:mt-4">
            {section.suggestions.map((suggestion, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-xs sm:text-sm"
              >
                <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                  {suggestion}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
