import React from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  Star,
  FileText,
  ArrowRight,
  Lightbulb,
} from "lucide-react";
import {
  extractStrengths,
  extractImprovements,
  extractRecommendations,
} from "./utils";

export default function AnalysisSummary({ results, isDark }) {
  return (
    <div
      className={`backdrop-blur-xl border rounded-2xl p-4 sm:p-6 ${
        isDark
          ? "bg-slate-900/50 border-purple-500/20"
          : "bg-white/80 border-purple-300/20"
      }`}
    >
      <h3
        className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
        AI Analysis Summary
      </h3>

      {/* Match Percentage Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div
          className={`p-4 sm:p-6 rounded-xl border ${
            isDark
              ? "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20"
              : "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${
                isDark ? "bg-green-500/20" : "bg-green-100"
              }`}
            >
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
            </div>
            <span
              className={`text-xs sm:text-sm font-medium ${
                isDark ? "text-green-300" : "text-green-700"
              }`}
            >
              Match Score
            </span>
          </div>
          <div
            className={`text-2xl sm:text-3xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {results?.overall.score}%
          </div>
          <div
            className={`text-xs sm:text-sm ${isDark ? "text-green-400" : "text-green-600"}`}
          >
            {results?.overall.score >= 80
              ? "Excellent match"
              : results?.overall.score >= 60
                ? "Good match"
                : "Needs improvement"}
          </div>
        </div>

        <div
          className={`p-4 sm:p-6 rounded-xl border ${
            isDark
              ? "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20"
              : "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200"
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${
                isDark ? "bg-blue-500/20" : "bg-blue-100"
              }`}
            >
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            </div>
            <span
              className={`text-xs sm:text-sm font-medium ${
                isDark ? "text-blue-300" : "text-blue-700"
              }`}
            >
              Keywords Found
            </span>
          </div>
          <div
            className={`text-2xl sm:text-3xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {results?.keywords.found.length}
          </div>
          <div
            className={`text-xs sm:text-sm ${isDark ? "text-blue-400" : "text-blue-600"}`}
          >
            Strong keyword presence
          </div>
        </div>

        <div
          className={`p-4 sm:p-6 rounded-xl border ${
            isDark
              ? "bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20"
              : "bg-gradient-to-br from-orange-50 to-red-50 border-orange-200"
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${
                isDark ? "bg-orange-500/20" : "bg-orange-100"
              }`}
            >
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
            </div>
            <span
              className={`text-xs sm:text-sm font-medium ${
                isDark ? "text-orange-300" : "text-orange-700"
              }`}
            >
              Keywords Missing
            </span>
          </div>
          <div
            className={`text-2xl sm:text-3xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {results?.keywords.missing.length}
          </div>
          <div
            className={`text-xs sm:text-sm ${isDark ? "text-orange-400" : "text-orange-600"}`}
          >
            Opportunities for improvement
          </div>
        </div>
      </div>

      {/* Final Thoughts Section */}
      <div className="space-y-4 sm:space-y-6">
        {/* Strengths */}
        <div
          className={`p-4 sm:p-6 rounded-xl border ${
            isDark
              ? "bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/20"
              : "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${
                isDark ? "bg-green-500/20" : "bg-green-100"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
            </div>
            <h4
              className={`text-base sm:text-lg font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Key Strengths
            </h4>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {extractStrengths(results?.rawAnalysis).map((strength, idx) => (
              <div key={idx} className="flex items-start gap-2 sm:gap-3">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 flex-shrink-0 mt-0.5 sm:mt-1" />
                <span
                  className={`text-sm sm:text-base ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  {strength}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Areas */}
        <div
          className={`p-4 sm:p-6 rounded-xl border ${
            isDark
              ? "bg-gradient-to-br from-orange-500/5 to-red-500/5 border-orange-500/20"
              : "bg-gradient-to-br from-orange-50 to-red-50 border-orange-200"
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${
                isDark ? "bg-orange-500/20" : "bg-orange-100"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400" />
            </div>
            <h4
              className={`text-base sm:text-lg font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Areas for Improvement
            </h4>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {extractImprovements(results?.rawAnalysis).map(
              (improvement, idx) => (
                <div key={idx} className="flex items-start gap-2 sm:gap-3">
                  <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 flex-shrink-0 mt-0.5 sm:mt-1" />
                  <span
                    className={`text-sm sm:text-base ${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    {improvement}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Final Recommendations */}
        <div
          className={`p-4 sm:p-6 rounded-xl border ${
            isDark
              ? "bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/20"
              : "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200"
          }`}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${
                isDark ? "bg-purple-500/20" : "bg-purple-100"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
            </div>
            <h4
              className={`text-base sm:text-lg font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Final Recommendations
            </h4>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {extractRecommendations(results?.rawAnalysis).map(
              (recommendation, idx) => (
                <div key={idx} className="flex items-start gap-2 sm:gap-3">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0 mt-0.5 sm:mt-1" />
                  <span
                    className={`text-sm sm:text-base ${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    {recommendation}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Raw Analysis (Collapsible) */}
        <div className="mt-4 sm:mt-6">
          <details className="group">
            <summary className="cursor-pointer list-none">
              <div
                className={`flex items-center justify-between p-3 sm:p-4 rounded-lg border ${
                  isDark
                    ? "bg-slate-800/50 border-purple-500/30 hover:bg-slate-700/50"
                    : "bg-gray-50 border-purple-300/30 hover:bg-gray-100"
                } transition-colors`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  <span
                    className={`text-sm sm:text-base font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    View Full AI Analysis
                  </span>
                </div>
                <div className="transform group-open:rotate-180 transition-transform">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                </div>
              </div>
            </summary>
            <div
              className={`mt-2 p-3 sm:p-4 rounded-lg border ${
                isDark
                  ? "bg-slate-800/30 border-purple-500/20"
                  : "bg-gray-50 border-purple-300/20"
              }`}
            >
              <pre
                className={`whitespace-pre-wrap text-xs sm:text-sm font-sans overflow-x-auto ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {results?.rawAnalysis}
              </pre>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
