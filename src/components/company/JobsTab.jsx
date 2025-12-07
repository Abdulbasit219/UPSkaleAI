// components/tabs/JobsTab.jsx
import React, { useEffect, useState } from "react";
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  MapPin,
  DollarSign,
  Users,
  TrendingUp,
} from "lucide-react";

const JobsTab = ({ isDark, onPostJob }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [postedJobs, setPostedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/company/jobs");
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setPostedJobs(data.data);
        } else {
          setPostedJobs([]);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setPostedJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const getStatusColor = (status) => {
    return status === "active" 
      ? "text-green-500 bg-green-500/10" 
      : "text-gray-500 bg-gray-500/10";
  };

  return (
    <div
      className={`p-6 rounded-2xl backdrop-blur-xl border transition-all duration-500 ${
        isDark
          ? "bg-slate-900/80 border-purple-500/20"
          : "bg-white/80 border-purple-200/30"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <h2
            className={`text-2xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Posted Jobs 💼
          </h2>
          <p className={`mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Manage your job postings and track performance
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className={`relative flex-1 lg:flex-none ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 pr-4 py-2 rounded-xl border transition-all ${
                isDark
                  ? "bg-slate-800 border-gray-700 text-white placeholder-gray-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
              } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              🔍
            </div>
          </div>
          
          <button
            onClick={onPostJob}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
          >
            <Plus className="w-4 h-4" />
            Post Job
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">⏳</div>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>Loading jobs...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && postedJobs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📭</div>
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            No jobs posted yet
          </h3>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Click "Post Job" to create your first job posting
          </p>
        </div>
      )}

      {/* Jobs Grid */}
      {!loading && postedJobs.length > 0 && (
        <div className="grid gap-6">
          {postedJobs.map((job) => (
            <div
              key={job.id}
              className={`p-6 rounded-2xl border transition-all duration-500 hover:scale-[1.02] group ${
                isDark
                  ? "bg-slate-800/50 border-gray-700 hover:border-purple-500/50"
                  : "bg-white border-gray-200 hover:border-purple-300"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Job Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3
                        className={`text-xl font-bold mb-2 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                            {job.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <DollarSign className="w-4 h-4 text-gray-500" />
                          <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                            {job.salary}
                          </span>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            job.status
                          )}`}
                        >
                          {job.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Skills/Tags */}
                  {job.skills && job.skills.length > 0 && (
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            isDark
                              ? "bg-purple-500/20 text-purple-300"
                              : "bg-purple-500/10 text-purple-700"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className={`text-sm font-semibold ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}>
                        {job.applicants || 0} applicants
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-500" />
                      <span className={`text-sm font-semibold ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}>
                        {job.status === 'active' ? 'Active' : 'Closed'}
                      </span>
                    </div>
                    <div className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                      Posted {job.posted}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      isDark
                        ? "hover:bg-slate-700 text-gray-400 hover:text-white"
                        : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                    }`}
                    title="View Details"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      isDark
                        ? "hover:bg-slate-700 text-gray-400 hover:text-white"
                        : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                    }`}
                    title="Edit Job"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      isDark
                        ? "hover:bg-red-500/20 text-red-400 hover:text-red-300"
                        : "hover:bg-red-100 text-red-600 hover:text-red-700"
                    }`}
                    title="Delete Job"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsTab;