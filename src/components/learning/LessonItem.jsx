import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const LessonItem = ({ lesson, index, isCompleted, isEnrolled, courseId }) => {
  return (
    <Link
      href={isEnrolled ? `/learning/${courseId}/lessons/${lesson._id}` : "#"}
      className={`block p-4 rounded-lg transition-all ${
        isEnrolled
          ? "hover:bg-slate-700/50 cursor-pointer"
          : "opacity-50 cursor-not-allowed"
      } ${isCompleted ? "bg-purple-500/10 border border-purple-500/30" : "bg-slate-700/30"}`}
      onClick={(e) => !isEnrolled && e.preventDefault()}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {isCompleted ? (
            <CheckCircle className="w-5 h-5 text-green-400" />
          ) : isEnrolled ? (
            <PlayCircle className="w-5 h-5 text-purple-400" />
          ) : (
            <Lock className="w-5 h-5 text-gray-600" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-500">Lesson {index + 1}</span>
            {lesson.duration && (
              <span className="text-xs text-gray-500">• {lesson.duration}</span>
            )}
          </div>
          <h4 className="text-sm font-medium text-white truncate">{lesson.title}</h4>
        </div>
      </div>
    </Link>
  );;
};

export default LessonItem;
