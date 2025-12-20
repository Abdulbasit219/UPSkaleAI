import { Award, BookOpen } from "lucide-react";
import Link from "next/link";
import React from "react";

const EnrolledCourseCard = ({ progress }) => {
  const course = progress.courseId;

  return (
    <Link href={`/learning/${course._id}`}>
      <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer">
        {/* Status Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">
            {course.category}
          </span>
          {progress.isCompleted && <Award className="w-5 h-5 text-green-400" />}
        </div>

        {/* Course Title */}
        <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-400">Progress</span>
            <span className="font-semibold text-purple-300">
              {progress.progressPercentage}%
            </span>
          </div>

          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${progress.progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{progress.completedLessons.length} lessons done</span>
          </div>
        </div>

        <button className="mt-4 w-full py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-purple-300 font-medium transition-colors cursor-pointer">
          {progress.isCompleted ? "View Course" : "Continue Learning"}
        </button>
      </div>
    </Link>
  );
};

export default EnrolledCourseCard;
