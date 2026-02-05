import React from "react";
import { Zap } from "lucide-react";

const JobSummarySidebar = ({ jobDetails, isDark }) => {
  return (
    <div
      className={`backdrop-blur-sm border rounded-2xl p-6 sticky top-24 ${
        isDark
          ? "bg-slate-900/50 border-purple-500/20"
          : "bg-white/80 border-purple-300/30"
      }`}
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
          🚀
        </div>
        <h2
          className={`text-xl font-bold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {jobDetails?.title || "Loading..."}
        </h2>
        <p className={isDark ? "text-gray-400" : "text-gray-600"}>
          {jobDetails?.company || "Loading..."}
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div
          className={`flex items-center justify-between p-3 rounded-lg ${
            isDark ? "bg-slate-800/50" : "bg-gray-50"
          }`}
        >
          <span className={isDark ? "text-gray-400" : "text-gray-600"}>
            Match Score
          </span>
          <span className="text-green-400 font-bold">
            {jobDetails?.match || 0}%
          </span>
        </div>
        <div
          className={`flex items-center justify-between p-3 rounded-lg ${
            isDark ? "bg-slate-800/50" : "bg-gray-50"
          }`}
        >
          <span className={isDark ? "text-gray-400" : "text-gray-600"}>
            Location
          </span>
          <span className={isDark ? "text-white" : "text-gray-900"}>
            {jobDetails?.location || "N/A"}
          </span>
        </div>
        <div
          className={`flex items-center justify-between p-3 rounded-lg ${
            isDark ? "bg-slate-800/50" : "bg-gray-50"
          }`}
        >
          <span className={isDark ? "text-gray-400" : "text-gray-600"}>
            Type
          </span>
          <span className={isDark ? "text-white" : "text-gray-900"}>
            {jobDetails?.type || "N/A"}
          </span>
        </div>
        <div
          className={`flex items-center justify-between p-3 rounded-lg ${
            isDark ? "bg-slate-800/50" : "bg-gray-50"
          }`}
        >
          <span className={isDark ? "text-gray-400" : "text-gray-600"}>
            Salary
          </span>
          <span className={isDark ? "text-white" : "text-gray-900"}>
            {jobDetails?.salary || "N/A"}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h3
          className={`text-lg font-semibold mb-3 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Required Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {jobDetails?.skills?.map((skill, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-sm border ${
                isDark
                  ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                  : "bg-purple-100 text-purple-700 border-purple-300/20"
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div
        className={`p-4 rounded-xl border ${
          isDark
            ? "bg-purple-500/10 border-purple-500/20"
            : "bg-purple-50 border-purple-300/20"
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span
            className={
              isDark
                ? "text-white font-semibold"
                : "text-gray-900 font-semibold"
            }
          >
            Quick Apply Active
          </span>
        </div>
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Your application will be prioritized and reviewed within 24 hours.
        </p>
      </div>
    </div>
  );
};

export default JobSummarySidebar;
