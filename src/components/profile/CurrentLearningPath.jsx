"use client";
import React from "react";
import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function CurrentLearningPath({
  learningPath = [],
  learningPathLoading = false,
  isDark = false,
}) {
  const router = useRouter();

  const getStatusColor = (status, isDark) => {
    const statusColors = {
      "Almost Done": isDark
        ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
        : "bg-yellow-100 text-yellow-700 border-yellow-200",
      "In Progress": isDark
        ? "bg-green-500/10 text-green-400 border-green-500/20"
        : "bg-green-100 text-green-700 border-green-200",
      Started: isDark
        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
        : "bg-blue-100 text-blue-700 border-blue-200",
    };
    return statusColors[status] || statusColors["In Progress"];
  };

  return (
    <div
      className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
        isDark
          ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/30"
          : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/30"
      }`}
    >
      <h3
        className={`text-xl font-bold mb-4 flex items-center gap-2 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        <BookOpen className="w-5 h-5 text-purple-400" />
        Current Learning Path
      </h3>

      <div className="space-y-4">
        <div className="grid gap-3 mt-6">
          {learningPathLoading ? (
            <div className="text-center py-8">
              <LoadingSpinner />
            </div>
          ) : learningPath.length === 0 ? (
            <div
              className={`text-center py-8 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="mb-2 text-sm">No active courses yet</p>
              <button
                onClick={() => router.push("/learning")}
                className={`mt-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isDark
                    ? "bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20"
                    : "bg-purple-100 text-purple-700 border border-purple-200 hover:bg-purple-200"
                }`}
              >
                Browse Courses
              </button>
            </div>
          ) : (
            learningPath.map((item) => (
              <div
                key={item._id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-colors group cursor-pointer ${
                  isDark
                    ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30"
                    : "bg-gray-50/50 border-purple-300/10 hover:border-purple-300/30"
                }`}
                onClick={() => router.push(`/courses/${item.courseId}`)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`font-medium ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {item.courseName}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full border ${getStatusColor(
                        item.status,
                        isDark
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  {item.currentLesson && (
                    <p
                      className={`text-xs mb-2 ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      Current: {item.currentLesson}
                    </p>
                  )}

                  <div className="flex items-center gap-3">
                    <div
                      className={`flex-1 rounded-full h-2 ${
                        isDark ? "bg-slate-700" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <span
                      className={`text-sm font-medium w-12 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {item.progress}%
                    </span>
                  </div>
                </div>

                <button
                  className={`cursor-pointer ml-4 px-4 py-2 rounded-lg text-sm border transition-all opacity-0 group-hover:opacity-100 ${
                    isDark
                      ? "bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20"
                      : "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/learning/${item.courseId}`);
                  }}
                >
                  Continue
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
