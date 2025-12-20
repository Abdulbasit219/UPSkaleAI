import { Clock, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

const CourseCard = ({ course }) => {
  const difficultyColors = {
    Beginner: "text-green-400 bg-green-400/10",
    Intermediate: "text-yellow-400 bg-yellow-400/10",
    Advanced: "text-red-400 bg-red-400/10",
  };

  return (
    <Link href={`/learning/${course._id}`}>
      <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer group">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">
            {course.category}
          </span>
          <span
            className={`text-xs px-3 py-1 rounded-full ${difficultyColors[course.difficulty]}`}
          >
            {course.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.enrolledCount} enrolled</span>
          </div>
        </div>

        {/* Tags */}
        {course.tags && course.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {course.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-slate-700/50 text-gray-400 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default CourseCard;
