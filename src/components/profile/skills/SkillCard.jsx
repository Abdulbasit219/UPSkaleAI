import React from "react";
import { Trash2, Edit } from "lucide-react";

const SkillCard = ({ skill, isDark, onDelete, onEdit }) => {
  const progressColor = skill?.colorClass || "from-gray-500 to-gray-600";
  const progress = skill?.progress || 0;

  const getBadgeColor = (level) => {
    const levelLower = level?.toLowerCase() || "";
    if (levelLower === "beginner")
      return isDark
        ? "bg-red-900/30 text-red-400 border-red-500/30"
        : "bg-red-100 text-red-700 border-red-300";
    if (levelLower === "intermediate")
      return isDark
        ? "bg-yellow-900/30 text-yellow-400 border-yellow-500/30"
        : "bg-yellow-100 text-yellow-700 border-yellow-300";
    if (levelLower === "advanced")
      return isDark
        ? "bg-blue-900/30 text-blue-400 border-blue-500/30"
        : "bg-blue-100 text-blue-700 border-blue-300";
    if (levelLower === "expert")
      return isDark
        ? "bg-green-900/30 text-green-400 border-green-500/30"
        : "bg-green-100 text-green-700 border-green-300";
    return isDark ? "bg-slate-700 text-gray-300" : "bg-gray-200 text-gray-600";
  };

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border transition-all hover:shadow-lg ${
        isDark
          ? "bg-slate-900/60 border-purple-500/20 hover:border-purple-500/40"
          : "bg-white border-gray-200 hover:border-purple-300"
      }`}
    >
      {/* Left Content */}
      <div className="flex items-center gap-3 flex-1">
        {/* Icon Box */}
        <div
          className={`w-11 h-11 rounded-lg flex items-center justify-center border ${
            isDark
              ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/20"
              : "bg-gradient-to-br from-purple-100 to-pink-100 border-purple-300/20"
          }`}
        >
          <span className="text-purple-400 text-lg">{"</>"}</span>
        </div>

        {/* Skill Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2
              className={`font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {skill?.skillName}
            </h2>

            <span
              className={`px-2 py-0.5 text-xs rounded-full border ${getBadgeColor(skill?.level)}`}
            >
              {skill?.level}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <div
              className={`flex-1 max-w-xs rounded-full h-1.5 ${
                isDark ? "bg-slate-700" : "bg-gray-300"
              }`}
            >
              <div
                className={`h-1.5 rounded-full bg-gradient-to-r ${progressColor} transition-all duration-500`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span
              className={`text-sm font-medium min-w-[45px] ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {progress}%
            </span>
          </div>

          <p
            className={`text-xs mt-1 ${
              isDark ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Last practiced: {skill?.lastPracticed}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 ml-3">
        {onEdit && (
          <button
            onClick={() => onEdit(skill)}
            className={`cursor-pointer p-2 rounded-lg transition-colors ${
              isDark
                ? "hover:bg-slate-600 text-purple-400"
                : "bg-white hover:bg-gray-100 text-purple-600"
            }`}
            aria-label="Edit skill"
          >
            <Edit size={18} />
          </button>
        )}

        {onDelete && (
          <button
            onClick={() => onDelete(skill)}
            className={`cursor-pointer p-2 rounded-lg transition-colors ${
              isDark
                ? "hover:bg-red-500/10 text-red-400"
                : "hover:bg-red-50 text-red-500"
            }`}
            aria-label="Delete skill"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SkillCard;
