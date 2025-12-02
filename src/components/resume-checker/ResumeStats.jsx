import React from "react";
import {
  BarChart3,
  FileText,
  CheckCircle2,
  FileCheck,
  Clock,
} from "lucide-react";

export default function ResumeStats({ statistics, isDark }) {
  const stats = [
    {
      label: "Total Words",
      value: statistics.totalWords,
      icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      label: "Bullet Points",
      value: statistics.bulletPoints,
      icon: <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      label: "Sections",
      value: statistics.sections,
      icon: <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      label: "Pages",
      value: statistics.pages,
      icon: <FileCheck className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      label: "Reading Time",
      value: statistics.readingTime,
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
  ];

  return (
    <div
      className={`backdrop-blur-xl border rounded-2xl p-4 sm:p-6 ${
        isDark
          ? "bg-slate-900/50 border-purple-500/20"
          : "bg-white/80 border-purple-300/20"
      }`}
    >
      <h3
        className={`text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
        Resume Statistics
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center">
            <div className="flex justify-center mb-2">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${
                  isDark
                    ? "bg-purple-500/20 text-purple-400"
                    : "bg-purple-100 text-purple-600"
                }`}
              >
                {stat.icon}
              </div>
            </div>
            <div
              className={`text-xl sm:text-2xl font-bold mb-1 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {stat.value}
            </div>
            <div
              className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
