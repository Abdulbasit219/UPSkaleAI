// components/tabs/OverviewTab.jsx
import React, { useState, useEffect } from "react";
import {
  Plus,
  FileText,
  BarChart3,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react";

const OverviewTab = ({ isDark, onPostJob, onViewApplications }) => {
  const [recentApplications, setRecentApplications] = useState([]);
  
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("/api/company/applications");
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setRecentApplications(data.data.slice(0, 3)); // Only take first 3
        } else {
          setRecentApplications([]);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      pending: "text-yellow-500 bg-yellow-500/10",
      reviewing: "text-blue-500 bg-blue-500/10",
      shortlisted: "text-purple-500 bg-purple-500/10",
      accepted: "text-green-500 bg-green-500/10",
      rejected: "text-red-500 bg-red-500/10",
    };
    return colors[status] || "text-gray-500 bg-gray-500/10";
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div
        className={`p-6 rounded-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-[1.02] ${
          isDark
            ? "bg-slate-900/80 border-purple-500/20"
            : "bg-white/80 border-purple-200/30"
        }`}
      >
        <h2
          className={`text-xl font-bold mb-6 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Quick Actions 🚀
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={onPostJob}
            className="group p-6 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 text-left"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Plus className="w-5 h-5" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-1">Post New Job</h3>
            <p className="text-purple-100 text-sm">Create a new job listing</p>
          </button>
          
          <button
            onClick={onViewApplications}
            className={`group p-6 rounded-xl border text-left transition-all duration-300 hover:scale-105 ${
              isDark
                ? "bg-slate-800/50 border-purple-500/30 text-white hover:bg-slate-700/50"
                : "bg-white border-purple-300/30 text-gray-900 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${
                isDark ? "bg-blue-500/20" : "bg-blue-500/10"
              }`}>
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-1">Review Applications</h3>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              View all applications
            </p>
          </button>
          
          <button
            className={`group p-6 rounded-xl border text-left transition-all duration-300 hover:scale-105 ${
              isDark
                ? "bg-slate-800/50 border-purple-500/30 text-white hover:bg-slate-700/50"
                : "bg-white border-purple-300/30 text-gray-900 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${
                isDark ? "bg-green-500/20" : "bg-green-500/10"
              }`}>
                <BarChart3 className="w-5 h-5 text-green-500" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-1">View Analytics</h3>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Performance insights
            </p>
          </button>
        </div>
      </div>

      {/* Recent Applications */}
      <div
        className={`p-6 rounded-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-[1.02] ${
          isDark
            ? "bg-slate-900/80 border-purple-500/20"
            : "bg-white/80 border-purple-200/30"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2
            className={`text-xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Recent Applications
          </h2>
          <button
            onClick={onViewApplications}
            className={`text-sm font-semibold ${
              isDark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"
            } transition-colors`}
          >
            View All →
          </button>
        </div>
        
        <div className="space-y-4">
          {recentApplications.length > 0 ? (
            recentApplications.map((app) => (
              <div
                key={app._id}
                className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] group ${
                  isDark
                    ? "bg-slate-800/50 border-gray-700 hover:border-purple-500/50"
                    : "bg-gray-50 border-gray-200 hover:border-purple-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                      {app.user?.name ? app.user.name.substring(0, 2).toUpperCase() : (app.user?.username ? app.user.username.substring(0, 2).toUpperCase() : "??")}
                    </div>
                    <div>
                      <h3
                        className={`font-semibold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {app.user?.username || "Unknown Candidate"}
                      </h3>
                      <p
                        className={`text-sm ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {app.job?.title || "Unknown Position"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                    <div className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                      {new Date(app.createdAt || app.appliedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={`text-center py-8 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              <div className="text-4xl mb-3">📭</div>
              <p>No recent applications found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;