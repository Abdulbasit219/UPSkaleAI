"use client";

import {
  Target,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function TodayGoals({ isDark, userData, todayTasks }) {
  const progress =
    (userData.completedToday / userData.todayGoal) * 100;

  return (
    <div
      className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
        isDark
          ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20"
          : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20"
      }`}
    >
      {/* Title */}
      <h3
        className={`text-xl font-bold mb-4 flex items-center gap-2 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        <Target className="w-5 h-5 text-purple-400" />
        Today's Goals
      </h3>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className={isDark ? "text-gray-400" : "text-gray-600"}>
            Daily Progress
          </span>
          <span className="text-purple-400 font-semibold">
            {userData.completedToday}/{userData.todayGoal}
          </span>
        </div>

        <div
          className={`w-full rounded-full h-2 ${
            isDark ? "bg-slate-800" : "bg-gray-200"
          }`}
        >
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {todayTasks.map((task, index) => {
          const priorityStyles = {
            high: isDark
              ? "bg-red-500/10 text-red-400"
              : "bg-red-100 text-red-700",
            medium: isDark
              ? "bg-yellow-500/10 text-yellow-400"
              : "bg-yellow-100 text-yellow-700",
            low: isDark
              ? "bg-gray-500/10 text-gray-400"
              : "bg-gray-100 text-gray-600",
          };

          return (
            <div
              key={index}
              className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                task.completed
                  ? isDark
                    ? "bg-green-500/5 border-green-500/20"
                    : "bg-green-100 border-green-200"
                  : isDark
                    ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30"
                    : "bg-white/50 border-purple-300/10 hover:border-purple-300/30"
              }`}
            >
              {/* Checkbox */}
              <button
                className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                  task.completed
                    ? "bg-green-500 border-green-500"
                    : isDark
                      ? "border-gray-600 hover:border-purple-400"
                      : "border-gray-400 hover:border-purple-400"
                }`}
              >
                {task.completed && (
                  <CheckCircle className="w-4 h-4 text-white" />
                )}
              </button>

              {/* Task Text */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium ${
                    task.completed
                      ? isDark
                        ? "text-gray-500 line-through"
                        : "text-gray-400 line-through"
                      : isDark
                        ? "text-white"
                        : "text-gray-900"
                  }`}
                >
                  {task.title}
                </p>

                {/* Time + Priority */}
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-xs flex items-center gap-1 ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    {task.time}
                  </span>

                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      priorityStyles[task.priority]
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
