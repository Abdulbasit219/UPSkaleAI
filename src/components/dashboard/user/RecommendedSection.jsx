"use client";

import React from "react";
import { Sparkles, ChevronRight, Star, Users, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RecommendedSection({ recommended, isDark }) {
  const router = useRouter();

  const handleViewCourse = (courseId) => {
    router.push(`/learning/${courseId}`);
  };

  if (!recommended.length) return null;

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
          <Sparkles className="w-6 h-6 text-purple-400" />
          Recommended For You
        </h2>

        <button className="text-purple-400 hover:text-purple-300 text-sm font-semibold flex items-center gap-1">
          Explore
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {recommended.map((course, index) => (
          <div
            key={index}
            className={`group border rounded-lg overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg ${
              isDark
                ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30 hover:shadow-purple-500/20"
                : "bg-white/50 border-purple-300/10 hover:border-purple-300/30 hover:shadow-purple-300/20"
            }`}
          >
            {/* Content */}
            <div className="p-4">
              <h3
                className={`font-bold mb-1 group-hover:text-purple-400 transition-colors ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {course.title}
              </h3>

              <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                {course.author.name}
              </p>

              {/* Meta Info */}
              <div
                className={`flex items-center gap-4 text-sm mb-3 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.enrolledCount}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.estimatedTime}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {course.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`px-2 py-1 text-xs rounded border ${
                      isDark
                        ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                        : "bg-purple-100 text-purple-700 border-purple-200"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Button */}
              <button
                onClick={() => handleViewCourse(course._id)}
                className={`w-full py-2 rounded-lg text-sm font-semibold border transition-all cursor-pointer ${
                  isDark
                    ? "bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20"
                    : "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200"
                }`}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
