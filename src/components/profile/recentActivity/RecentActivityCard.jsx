import React from "react";
import { Clock } from "lucide-react";
import ActivityItem from "./ActivityItem";

const RecentActivityCard = ({ recentActivity, isDark }) => {
  return (
    <div
      className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
        isDark
          ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/30"
          : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/30"
      }`}
    >
      {/* Header */}
      <h3
        className={`text-xl font-bold mb-4 flex items-center gap-2 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        <Clock className="w-5 h-5 text-purple-400" />
        Recent Activity
      </h3>

      {/* Activity List */}
      <div className="space-y-3">
        {recentActivity?.map((activity, index) => (
          <ActivityItem
            key={index}
            activity={activity}
            isDark={isDark}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentActivityCard;
