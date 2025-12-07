import IconMap from "@/utils/iconsMap";
import React from "react";

const ActivityItem = ({ activity, isDark }) => {
  const IconComponent = IconMap[activity?.icon];

  const getTime = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);

    const timeDifference = Math.abs(now - past);

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 1) {
      return `${days} days ago`;
    }
    if (days === 1) {
      return "Yesterday";
    }
    if (hours > 0) {
      return `${hours} hours ago`;
    }
    if (minutes > 0) {
      return `${minutes} minutes ago`;
    }
    return "Just now";
  };

  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg transition-colors group cursor-pointer ${
        isDark ? "hover:bg-slate-800/50" : "hover:bg-gray-100/50"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform ${
          isDark ? "bg-slate-800" : "bg-gray-100"
        } ${activity.color}`}
      >
        {IconComponent && <IconComponent className="w-5 h-5" />}
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {activity.action}
        </p>

        <p
          className={`text-xs mt-0.5 ${
            isDark ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {getTime(activity.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default ActivityItem;
