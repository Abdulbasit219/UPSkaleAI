"use client";

import React from "react";
import { Play, ChevronRight, Clock } from "lucide-react";

export default function ContinueLearningSection({ continueLearning, isDark }) {
  return (
    <div
      className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
        isDark
          ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/30"
          : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/30"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2
          className={`text-2xl font-bold flex items-center gap-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          <Play className="w-6 h-6 text-purple-400" />
          Continue Learning
        </h2>
        <button className="text-purple-400 hover:text-purple-300 text-sm font-semibold flex items-center gap-1">
          View All
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Course Items */}
      <div className="space-y-4">
        {continueLearning.map((course, index) => (
          <div
            key={index}
            className={`group border rounded-lg overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg ${
              isDark
                ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30 hover:shadow-purple-500/20"
                : "bg-white/50 border-purple-300/10 hover:border-purple-300/30 hover:shadow-purple-300/20"
            }`}
          >
            <div className="flex flex-col sm:flex-row gap-4 p-4">
              
              {/* Thumbnail */}
              <div
                className={`w-full sm:w-24 h-24 rounded-lg flex items-center justify-center text-4xl flex-shrink-0 relative ${
                  isDark
                    ? "bg-gradient-to-br from-slate-800 to-slate-700"
                    : "bg-gradient-to-br from-gray-100 to-gray-200"
                }`}
              >
                <div
                  className={`absolute inset-0 rounded-lg ${
                    isDark
                      ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                      : "bg-gradient-to-br from-purple-100 to-pink-100"
                  }`}
                ></div>
                <span className="relative z-10">{course.thumbnail}</span>
              </div>

              {/* Course Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3
                      className={`font-bold group-hover:text-purple-400 transition-colors ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {course.title}
                    </h3>
                    <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                      {course.category}
                    </p>
                  </div>

                  <span
                    className={`px-2 py-1 text-xs rounded border flex-shrink-0 ${
                      isDark
                        ? "bg-blue-500/10 text-blue-300 border-blue-500/20"
                        : "bg-blue-100 text-blue-700 border-blue-200"
                    }`}
                  >
                    {course.difficulty}
                  </span>
                </div>

                {/* Progress Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span
                      className={isDark ? "text-gray-400" : "text-gray-600"}
                    >
                      Next: {course.nextLesson}
                    </span>

                    <span className="text-purple-400 font-semibold">
                      {course.progress}%
                    </span>
                  </div>

                  <div
                    className={`w-full rounded-full h-2 ${
                      isDark ? "bg-slate-700" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs flex items-center gap-1 ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      {course.timeLeft}
                    </span>

                    <button
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        isDark
                          ? "bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20"
                          : "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200"
                      }`}
                    >
                      Continue
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
