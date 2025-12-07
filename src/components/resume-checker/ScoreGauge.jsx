import React from "react";
import { Trophy, Download, RefreshCw } from "lucide-react";
import { getScoreColor } from "./utils";

export default function ScoreGauge({ score, message, resetAnalysis, isDark }) {
  return (
    <div
      className={`backdrop-blur-xl border rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 ${
        isDark
          ? "bg-slate-900/50 border-purple-500/30"
          : "bg-white/80 border-purple-300/30"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="order-2 md:order-1">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 border rounded-full mb-4 sm:mb-6 ${
              isDark
                ? "bg-purple-500/20 border-purple-500/30"
                : "bg-purple-100 border-purple-300/30"
            }`}
          >
            <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
            <span
              className={`text-xs sm:text-sm font-medium ${
                isDark ? "text-purple-300" : "text-purple-700"
              }`}
            >
              ATS Score
            </span>
          </div>

          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Your resume scores
            <span
              className={`block bg-gradient-to-r ${getScoreColor(
                score
              )} bg-clip-text text-transparent`}
            >
              {score}/100
            </span>
          </h2>

          <p
            className={`text-base sm:text-lg md:text-xl mb-6 sm:mb-8 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {message}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              Download Report
            </button>
            <button
              onClick={resetAnalysis}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 border rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm sm:text-base ${
                isDark
                  ? "bg-slate-800/80 border-purple-500/30 text-white hover:bg-slate-700"
                  : "bg-white border-purple-300/30 text-gray-900 hover:bg-gray-50"
              }`}
            >
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
              Analyze Another
            </button>
          </div>
        </div>

        <div className="flex justify-center order-1 md:order-2">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 200 200"
            >
              <circle
                cx="100"
                cy="100"
                r="80"
                stroke={isDark ? "#1e293b" : "#e2e8f0"}
                strokeWidth="20"
                fill="none"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                stroke="url(#scoreGradient)"
                strokeWidth="20"
                fill="none"
                strokeDasharray="502.4"
                strokeDashoffset={502.4 - (502.4 * score) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient
                  id="scoreGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div
                  className={`text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r ${getScoreColor(
                    score
                  )} bg-clip-text text-transparent`}
                >
                  {score}
                </div>
                <div
                  className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  out of 100
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
