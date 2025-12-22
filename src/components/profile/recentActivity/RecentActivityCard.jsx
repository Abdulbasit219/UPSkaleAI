import React, { act, useState } from "react";
import { Clock } from "lucide-react";
import ActivityItem from "./ActivityItem";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";

const RecentActivityCard = ({ recentActivity, isDark, userId }) => {
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState(recentActivity);

  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const topFiveActivities = sortedActivities.slice(0, 5);

  const deleteActivity = async (activityId) => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/user/profile/${userId}/activities/${activityId}`
      );

      setActivities((prev) => prev.filter((item) => item._id !== activityId));

      toast.success("Activity deleted");
    } catch (error) {
      toast.error("Failed to delete activity");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return "Loading";
  }

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
        {topFiveActivities.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">No activity found.</p>
        ) : (
          topFiveActivities.map((activity, index) => (
            <ActivityItem
              key={index}
              activity={activity}
              isDark={isDark}
              onDelete={() => deleteActivity(activity._id)}
            />
          ))
        )}
      </div>

      {sortedActivities.length > 5 && (
        <div className="text-center mt-4">
          <Link
            href={`/all-activity/${userId}`}
            className={`text-sm font-semibold underline ${
              isDark ? "text-purple-300" : "text-purple-600"
            }`}
          >
            View All Activity →
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentActivityCard;
