"use client";

import ActivityItem from "@/components/profile/recentActivity/ActivityItem";
import axios from "axios";
import { ArrowLeft, Clock, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const AllActivitiesPage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const sorted = [...activities].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const fetchActivities = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`/api/user/profile/${id}/activities`);
      setActivities(res?.data?.recentActivity);
    } catch (error) {
      console.error("Axios Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
      return false;
    }finally{
      setLoading(false)      
    }
    };

  const deleteActivity = async (activityId) => {
    try {
      setLoading(true)
      await axios.delete(`/api/user/profile/${id}/activities/${activityId}`);

      setActivities((prev) => prev.filter((item) => item._id !== activityId));

      toast.success("Activity deleted");
    } catch (error) {
      toast.error("Failed to delete activity");
    }finally{
      setLoading(false)
    }
  };

  const deleteAllActivities = async () => {
    if (!confirm("Are you sure you want to delete all activities?")) return;
    try {
      setLoading(true);
      await axios.delete(`/api/user/profile/${id}/activities`);
      setActivities([]);
      toast.success("All activities deleted");
    } catch (error) {
      toast.error("Failed to delete all activities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [id]);

  if(loading){
    return "Loading"
  }

  return (
    <div
      className={`min-h-screen pt-24 px-6 pb-6 transition-colors ${
        isDark ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <div className="mb-6">
          <Link
            href="/profile"
            className={`flex items-center gap-2 text-sm font-medium hover:underline ${
              isDark ? "text-purple-300" : "text-purple-600"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Profile
          </Link>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="w-6 h-6 text-purple-400" />
            All Activities
          </h1>

          {activities.length > 0 && (
            <button
              onClick={deleteAllActivities}
              disabled={loading}
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Delete All
            </button>
          )}
        </div>

        <p className="text-sm text-gray-400 mb-6">
          Your complete activity history, sorted by most recent.
        </p>
      </div>

      {/* Activities */}
      <div className="max-w-2xl mx-auto space-y-3">
        {sorted.length === 0 ? (
          <p className="text-center mt-12 text-gray-500">No activity found.</p>
        ) : (
          sorted.map((activity) => (
            <ActivityItem
              key={activity._id}
              activity={activity}
              isDark={isDark}
              onDelete={() => deleteActivity(activity._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AllActivitiesPage;
