"use client";

import { BarChart3, Clock, Target, Brain, Zap, TrendingUp } from "lucide-react";

export default function LearningInsights({ learningInsights, isDark }) {
  const insights = [
    {
      label: "This Week",
      value: `${learningInsights.weeklyHours}h`,
      icon: <Clock className="w-4 h-4 text-purple-400" />,
    },
    {
      label: "Completion Rate",
      value: `${learningInsights.completionRate}%`,
      icon: <Target className="w-4 h-4 text-purple-400" />,
    },
    {
      label: "Focus Area",
      value: learningInsights.focusArea,
      icon: <Brain className="w-4 h-4 text-purple-400" />,
    },
    {
      label: "Strongest Skill",
      value: learningInsights.strongestSkill,
      icon: <Zap className="w-4 h-4 text-purple-400" />,
    },
  ];

  return (
    <div
      className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
        isDark
          ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20"
          : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20"
      }`}
    >
      {/* Header */}
      <h2
        className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        <BarChart3 className="w-6 h-6 text-purple-400" />
        Learning Insights
      </h2>

      {/* Insights Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 ${
              isDark
                ? "bg-slate-800/50 border-purple-500/10"
                : "bg-white/50 border-purple-300/10"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {insight.label}
              </span>
              {insight.icon}
            </div>

            <div
              className={`text-3xl font-bold mb-1 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {insight.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
