"use client";
import React from "react";
import {
  TrendingUp,
  BookOpen,
  Target,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

const CodeTwinSidebar = ({ isDark, codingTopics, recentChallenges }) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      {/* Quick Stats */}
      <div
        className={`backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl ${
          isDark
            ? "bg-slate-900/40 border-purple-500/20 shadow-purple-500/5 hover:border-purple-500/40"
            : "bg-white/60 border-purple-200/50 shadow-gray-200/50 hover:border-purple-300"
        }`}
      >
        <h3
          className={`text-lg font-bold mb-6 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          <TrendingUp
            className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-purple-600"}`}
          />
          Performance Metrics
        </h3>
        <div className="space-y-4">
          {[
            { label: "Coding Streak", value: "7 days", trend: "+2" },
            { label: "Problems Solved", value: "24", trend: "+5" },
            { label: "AI Sessions", value: "18", trend: "+3" },
          ].map((stat, i) => (
            <div key={i} className="flex justify-between items-center group">
              <span
                className={`text-sm font-medium ${isDark ? "text-gray-400 group-hover:text-gray-300" : "text-gray-500 group-hover:text-gray-700"}`}
              >
                {stat.label}
              </span>
              <div className="text-right">
                <div
                  className={`font-bold text-base ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {stat.value}
                </div>
                <div className="text-[10px] text-green-500 font-medium">
                  {stat.trend} this week
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Path Progress */}
      <div
        className={`backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl ${
          isDark
            ? "bg-slate-900/40 border-purple-500/20 shadow-purple-500/5 hover:border-purple-500/40"
            : "bg-white/60 border-purple-200/50 shadow-gray-200/50 hover:border-purple-300"
        }`}
      >
        <h3
          className={`text-lg font-bold mb-6 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          <BookOpen
            className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-purple-600"}`}
          />
          Active Tracks
        </h3>
        <div className="space-y-5">
          {codingTopics.map((topic, index) => (
            <div key={index} className="space-y-2 group cursor-pointer">
              <div className="flex justify-between items-center">
                <span
                  className={`text-sm font-semibold ${isDark ? "text-white group-hover:text-purple-300" : "text-gray-900 group-hover:text-purple-700"} transition-colors`}
                >
                  {topic.name}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider ${
                    topic.level === "Advanced"
                      ? "bg-red-500/10 text-red-500 border border-red-500/20"
                      : topic.level === "Intermediate"
                        ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                        : "bg-green-500/10 text-green-500 border border-green-500/20"
                  }`}
                >
                  {topic.level}
                </span>
              </div>
              <div
                className={`w-full rounded-full h-1.5 ${isDark ? "bg-slate-800" : "bg-gray-100"}`}
              >
                <div
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${topic.progress}%` }}
                ></div>
              </div>
              <div
                className={`flex justify-between text-[10px] font-medium ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                <span>In Progress</span>
                <span>{topic.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div
        className={`backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl ${
          isDark
            ? "bg-slate-900/40 border-purple-500/20 shadow-purple-500/5 hover:border-purple-500/40"
            : "bg-white/60 border-purple-200/50 shadow-gray-200/50 hover:border-purple-300"
        }`}
      >
        <h3
          className={`text-lg font-bold mb-6 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          <Target
            className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-purple-600"}`}
          />
          Recent Challenges
        </h3>
        <div className="space-y-3">
          {recentChallenges.map((challenge, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 group ${
                isDark
                  ? "bg-slate-800/30 border-purple-500/10 hover:border-purple-500/30 hover:bg-slate-800/50"
                  : "bg-gray-50 border-purple-200/50 hover:border-purple-300 hover:bg-white"
              }`}
            >
              <div className="flex flex-col">
                <span
                  className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {challenge.title}
                </span>
                <span
                  className={`text-xs font-medium ${
                    challenge.difficulty === "Easy"
                      ? "text-emerald-500"
                      : challenge.difficulty === "Medium"
                        ? "text-amber-500"
                        : "text-rose-500"
                  }`}
                >
                  {challenge.difficulty}
                </span>
              </div>
              {challenge.completed ? (
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                </div>
              ) : (
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${
                    isDark
                      ? "hover:bg-purple-500/20 text-purple-400"
                      : "hover:bg-purple-100 text-purple-600"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeTwinSidebar;
