import React from "react";
import { ChevronRight, Clock } from "lucide-react";

const RecentActivityCard = ({ isDark, recentActivity }) => {
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
        <Clock className="w-5 h-5 text-purple-400" />
        Recent Activity
      </h3>

      <div className="space-y-3">
        {recentActivity.map((activity, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 p-2 rounded-lg transition-colors ${
              isDark ? "hover:bg-slate-800/50" : "hover:bg-gray-100/50"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isDark ? "bg-slate-800" : "bg-gray-100"
              }`}
            >
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {activity.title}
              </p>
              <p
                className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-semibold flex items-center justify-center gap-1">
        View All
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default RecentActivityCard;
