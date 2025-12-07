import React from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function KeywordAnalysis({ keywords, isDark }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <div
        className={`backdrop-blur-xl border rounded-2xl p-4 sm:p-6 ${
          isDark
            ? "bg-slate-900/50 border-purple-500/20"
            : "bg-white/80 border-purple-300/20"
        }`}
      >
        <h3
          className={`text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
          <span className="truncate">
            Keywords Found ({keywords.found.length || 0})
          </span>
        </h3>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {keywords.found.map((keyword, idx) => (
            <span
              key={idx}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm border font-medium ${
                isDark
                  ? "bg-green-500/10 text-green-400 border-green-500/20"
                  : "bg-green-100 text-green-700 border-green-200"
              }`}
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      <div
        className={`backdrop-blur-xl border rounded-2xl p-4 sm:p-6 ${
          isDark
            ? "bg-slate-900/50 border-purple-500/20"
            : "bg-white/80 border-purple-300/20"
        }`}
      >
        <h3
          className={`text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0" />
          <span className="truncate">
            Missing Keywords ({keywords.missing.length || 0})
          </span>
        </h3>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {keywords.missing.map((keyword, idx) => (
            <span
              key={idx}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm border font-medium ${
                isDark
                  ? "bg-red-500/10 text-red-400 border-red-500/20"
                  : "bg-red-100 text-red-700 border-red-200"
              }`}
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
