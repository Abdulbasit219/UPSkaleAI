"use client";

import React from "react";
import { BookOpen, Flame, Target, Trophy } from "lucide-react";

export default function QuickStatsGrid({isDark, enrolledCourses, profile}) {

  const quickStats = [
    {
      icon: <Flame className="w-5 h-5" />,
      value: profile?.maxStreak,
      label: "Day Streak",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Target className="w-5 h-5" />,
      value: `${Math.round(
        ((profile?.projects?.length || 0) * 20 +
          (profile?.streak || 0) * 5 +
          (profile?.badges?.length || 0) * 10) /
          3
      )}%`,
      label: "Career Progress",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      value: enrolledCourses.length,
      label: "Enrolled Courses",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      value: profile?.badges?.length,
      label: "Achievements",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {quickStats.map((stat, index) => (
        <div
          key={index}
          className={`group backdrop-blur-sm border rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 ${
            isDark
              ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/20"
              : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/40 hover:shadow-xl hover:shadow-purple-300/20"
          }`}
        >
          {/* ICON BOX */}
          <div
            className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
          >
            <div className="text-white">{stat.icon}</div>
          </div>

          {/* VALUE */}
          <div
            className={`text-3xl font-bold mb-1 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {stat.value}
          </div>

          {/* LABEL */}
          <div
            className={`text-sm font-medium mb-2 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
