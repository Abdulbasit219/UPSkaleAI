import { Clock, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

const CourseCard = ({ course, isDark }) => {
  const difficultyColors = {
    Beginner: "text-green-500 bg-green-500/10",
    Intermediate: "text-amber-500 bg-amber-500/10",
    Advanced: "text-red-500 bg-red-500/10",
  };

  return (
    <Link href={`/learning/${course._id}`}>
      <div
        className={`border rounded-2xl p-6 transition-all hover:scale-[1.02] active:scale-[0.98] group flex flex-col h-full justify-between ${
          isDark
            ? "bg-slate-900/50 border-white/5 hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/10"
            : "bg-white border-gray-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/5"
        }`}
      >
        <div>
          {/* Category Badge */}
          <div className="flex items-center justify-between mb-4">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                isDark
                  ? "bg-purple-500/10 text-purple-300"
                  : "bg-purple-50 text-purple-600"
              }`}
            >
              {course.category}
            </span>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${difficultyColors[course.difficulty]}`}
            >
              {course.difficulty}
            </span>
          </div>

          {/* Title */}
          <h3
            className={`text-lg font-bold mb-2 group-hover:text-purple-500 transition-colors ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {course.title}
          </h3>

          {/* Description */}
          <p
            className={`text-sm mb-6 line-clamp-2 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {course.description}
          </p>
        </div>

        <div>
          {/* Stats */}
          <div
            className={`flex items-center gap-4 text-xs font-medium pt-4 border-t ${
              isDark
                ? "border-white/5 text-gray-500"
                : "border-gray-100 text-gray-400"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{course.estimatedTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>{course.enrolledCount} learners</span>
            </div>
          </div>

          {/* Tags */}
          {course.tags && course.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {course.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className={`text-[10px] px-2 py-1 rounded font-medium ${
                    isDark
                      ? "bg-slate-800 text-gray-400"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
