import React from "react";

const SkillCard = ({ skill, isDark }) => {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
        isDark
          ? "bg-slate-900/60 border-purple-500/20"
          : "bg-white border-gray-200"
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
              {skill?.skillName || "Untitled Skill"}
            </h2>

            <span
              className={`px-2 py-0.5 text-xs rounded-full ${
                isDark
                  ? "bg-slate-700 text-gray-300"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {skill?.level || "Beginner"}
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
                className="h-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                style={{ width: "100%" }}
              ></div>
            </div>
            <span
              className={`text-sm font-medium ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              100%
            </span>
          </div>

          <p
            className={`text-xs mt-1 ${
              isDark ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Last practiced: {skill?.lastPracticed || "Never"}
          </p>
        </div>
      </div>

      {/* TAKE QUIZ BUTTON */}
      <button
        className={`ml-4 px-4 py-2 rounded-lg text-sm font-semibold border transition-all hover:scale-105 cursor-pointer ${
          isDark
            ? "bg-purple-500/20 text-purple-300 border-purple-500/20 hover:bg-purple-500/30"
            : "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200"
        }`}
      >
        Take Quiz
      </button>
    </div>
  );
};

export default SkillCard;
