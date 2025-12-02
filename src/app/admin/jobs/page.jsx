"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  EyeOff,
  Star,
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  Users,
  X,
  Calendar,
  TrendingUp,
} from "lucide-react";

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechVision Solutions",
    companyLogo: "TV",
    location: "San Francisco, USA",
    type: "Full-time",
    salary: "$120k - $180k",
    postedDate: "2024-12-01",
    status: "active",
    featured: true,
    applications: 45,
    views: 1234,
    category: "Technology",
    description: "We are looking for an experienced React developer...",
  },
  {
    id: 2,
    title: "Marketing Manager",
    company: "Digital Innovations Ltd",
    companyLogo: "DI",
    location: "New York, USA",
    type: "Full-time",
    salary: "$90k - $120k",
    postedDate: "2024-11-28",
    status: "pending",
    featured: false,
    applications: 23,
    views: 567,
    category: "Marketing",
    description: "Seeking a creative marketing manager to lead our team...",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "Creative Minds Agency",
    companyLogo: "CM",
    location: "Los Angeles, USA",
    type: "Contract",
    salary: "$80k - $100k",
    postedDate: "2024-11-25",
    status: "active",
    featured: true,
    applications: 67,
    views: 2345,
    category: "Design",
    description: "Join our award-winning design team...",
  },
  {
    id: 4,
    title: "Fake Job Posting",
    company: "Suspicious Corp",
    companyLogo: "SC",
    location: "Unknown",
    type: "Full-time",
    salary: "$200k - $500k",
    postedDate: "2024-11-30",
    status: "hidden",
    featured: false,
    applications: 0,
    views: 12,
    category: "Unknown",
    description: "Too good to be true offer...",
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "Global Enterprises Inc",
    companyLogo: "GE",
    location: "Chicago, USA",
    type: "Full-time",
    salary: "$110k - $150k",
    postedDate: "2024-11-20",
    status: "rejected",
    featured: false,
    applications: 12,
    views: 345,
    category: "Technology",
    description: "Looking for a data scientist with ML experience...",
  },
];

export default function JobManagement() {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return isDark
          ? "bg-green-500/20 text-green-400 border-green-500/30"
          : "bg-green-100 text-green-700 border-green-300";
      case "pending":
        return isDark
          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
          : "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "rejected":
        return isDark
          ? "bg-red-500/20 text-red-400 border-red-500/30"
          : "bg-red-100 text-red-700 border-red-300";
      case "hidden":
        return isDark
          ? "bg-gray-500/20 text-gray-400 border-gray-500/30"
          : "bg-gray-100 text-gray-700 border-gray-300";
      default:
        return isDark
          ? "bg-gray-500/20 text-gray-400 border-gray-500/30"
          : "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className={`text-3xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Job Post Management
          </h1>
          <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Manage and moderate all job postings
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all">
          <Download className="w-4 h-4" />
          Export Jobs
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Jobs",
            value: "3,456",
            icon: Briefcase,
            color: "purple",
          },
          {
            label: "Active Jobs",
            value: "2,987",
            icon: CheckCircle,
            color: "green",
          },
          {
            label: "Pending Review",
            value: "234",
            icon: Clock,
            color: "yellow",
          },
          { label: "Featured Jobs", value: "156", icon: Star, color: "pink" },
        ].map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl border backdrop-blur-xl p-6 ${
              isDark
                ? "bg-slate-900/50 border-purple-500/20"
                : "bg-white/80 border-purple-300/20"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </p>
                <p
                  className={`mt-2 text-2xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {stat.value}
                </p>
              </div>
              <stat.icon
                className={`w-8 h-8 ${
                  stat.color === "purple"
                    ? "text-purple-500"
                    : stat.color === "green"
                      ? "text-green-500"
                      : stat.color === "yellow"
                        ? "text-yellow-500"
                        : "text-pink-500"
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div
        className={`rounded-xl border backdrop-blur-xl p-6 ${
          isDark
            ? "bg-slate-900/50 border-purple-500/20"
            : "bg-white/80 border-purple-300/20"
        }`}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder="Search jobs by title or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all outline-none ${
                isDark
                  ? "bg-slate-800 border-purple-500/30 text-white placeholder:text-gray-400"
                  : "bg-white border-purple-300/30 text-gray-900 placeholder:text-gray-500"
              }`}
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-4 py-3 border rounded-lg transition-all outline-none ${
              isDark
                ? "bg-slate-800 border-purple-500/30 text-white"
                : "bg-white border-purple-300/30 text-gray-900"
            }`}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="hidden">Hidden</option>
          </select>

          {/* Filter Button */}
          <button
            className={`flex items-center gap-2 px-4 py-3 border rounded-lg transition-all ${
              isDark
                ? "bg-slate-800 border-purple-500/30 text-white hover:bg-slate-700"
                : "bg-white border-purple-300/30 text-gray-900 hover:bg-gray-50"
            }`}
          >
            <Filter className="w-5 h-5" />
            More Filters
          </button>
        </div>
      </div>

      {/* Jobs Table */}
      <div
        className={`rounded-xl border backdrop-blur-xl overflow-hidden ${
          isDark
            ? "bg-slate-900/50 border-purple-500/20"
            : "bg-white/80 border-purple-300/20"
        }`}
      >
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full">
            <thead
              className={`${isDark ? "bg-slate-800/50" : "bg-purple-50/50"}`}
            >
              <tr>
                <th
                  className={`text-left py-4 px-6 text-sm font-semibold ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Job Title
                </th>
                <th
                  className={`text-left py-4 px-6 text-sm font-semibold ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Company
                </th>
                <th
                  className={`text-left py-4 px-6 text-sm font-semibold ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Location
                </th>
                <th
                  className={`text-left py-4 px-6 text-sm font-semibold ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Applications
                </th>
                <th
                  className={`text-left py-4 px-6 text-sm font-semibold ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Status
                </th>
                <th
                  className={`text-left py-4 px-6 text-sm font-semibold ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr
                  key={job.id}
                  className={`border-t ${
                    isDark
                      ? "border-purple-500/10 hover:bg-slate-800/30"
                      : "border-purple-300/10 hover:bg-purple-50/30"
                  } transition-colors`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <p
                        className={`font-medium ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {job.title}
                      </p>
                      {job.featured && (
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {job.type} • {job.salary}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                        {job.companyLogo}
                      </div>
                      <span
                        className={`${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {job.company}
                      </span>
                    </div>
                  </td>
                  <td
                    className={`py-4 px-6 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {job.location}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          isDark
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {job.applications} apps
                      </span>
                      <span
                        className={`text-xs ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {job.views} views
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                        job.status
                      )}`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewJob(job)}
                        className={`p-2 rounded-lg transition-all ${
                          isDark
                            ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
                            : "bg-purple-100 text-purple-600 hover:bg-purple-200"
                        }`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {job.status === "pending" && (
                        <>
                          <button
                            className={`p-2 rounded-lg transition-all ${
                              isDark
                                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                : "bg-green-100 text-green-600 hover:bg-green-200"
                            }`}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            className={`p-2 rounded-lg transition-all ${
                              isDark
                                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                : "bg-red-100 text-red-600 hover:bg-red-200"
                            }`}
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button
                        className={`p-2 rounded-lg transition-all ${
                          isDark
                            ? "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <EyeOff className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Job Detail Modal */}
      {showJobModal && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border backdrop-blur-xl ${
              isDark
                ? "bg-slate-900 border-purple-500/20"
                : "bg-white border-purple-300/20"
            } custom-scrollbar`}
          >
            {/* Modal Header */}
            <div
              className={`sticky top-0 flex items-center justify-between p-6 border-b ${
                isDark
                  ? "bg-slate-900 border-purple-500/20"
                  : "bg-white border-purple-300/20"
              }`}
            >
              <h2
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Job Details
              </h2>
              <button
                onClick={() => setShowJobModal(false)}
                className={`p-2 rounded-lg transition-all ${
                  isDark
                    ? "hover:bg-slate-800 text-gray-400"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Job Header */}
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`text-2xl font-bold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {selectedJob.title}
                      </h3>
                      {selectedJob.featured && (
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-purple-500" />
                        <span
                          className={`text-sm ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {selectedJob.company}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-purple-500" />
                        <span
                          className={`text-sm ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {selectedJob.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                      selectedJob.status
                    )}`}
                  >
                    {selectedJob.status}
                  </span>
                </div>
              </div>

              {/* Job Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div
                  className={`rounded-lg border p-4 ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/20"
                      : "bg-purple-50/50 border-purple-300/20"
                  }`}
                >
                  <DollarSign className="w-6 h-6 text-purple-500 mb-2" />
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Salary
                  </p>
                  <p
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {selectedJob.salary}
                  </p>
                </div>
                <div
                  className={`rounded-lg border p-4 ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/20"
                      : "bg-purple-50/50 border-purple-300/20"
                  }`}
                >
                  <Clock className="w-6 h-6 text-purple-500 mb-2" />
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Type
                  </p>
                  <p
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {selectedJob.type}
                  </p>
                </div>
                <div
                  className={`rounded-lg border p-4 ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/20"
                      : "bg-purple-50/50 border-purple-300/20"
                  }`}
                >
                  <Users className="w-6 h-6 text-purple-500 mb-2" />
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Applications
                  </p>
                  <p
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {selectedJob.applications}
                  </p>
                </div>
                <div
                  className={`rounded-lg border p-4 ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/20"
                      : "bg-purple-50/50 border-purple-300/20"
                  }`}
                >
                  <Eye className="w-6 h-6 text-purple-500 mb-2" />
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Views
                  </p>
                  <p
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {selectedJob.views}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div
                className={`rounded-lg border p-4 ${
                  isDark
                    ? "bg-slate-800/50 border-purple-500/20"
                    : "bg-purple-50/50 border-purple-300/20"
                }`}
              >
                <h4
                  className={`text-lg font-semibold mb-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Job Description
                </h4>
                <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {selectedJob.description}
                </p>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`rounded-lg border p-4 ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/20"
                      : "bg-purple-50/50 border-purple-300/20"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-purple-500" />
                    <h4
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Posted Date
                    </h4>
                  </div>
                  <p
                    className={`${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {selectedJob.postedDate}
                  </p>
                </div>
                <div
                  className={`rounded-lg border p-4 ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/20"
                      : "bg-purple-50/50 border-purple-300/20"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-5 h-5 text-purple-500" />
                    <h4
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Category
                    </h4>
                  </div>
                  <p
                    className={`${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {selectedJob.category}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                className={`flex flex-wrap gap-3 pt-4 border-t ${isDark ? "border-purple-500/20" : "border-purple-300/20"}`}
              >
                <button className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 transition-all">
                  <CheckCircle className="w-4 h-4" />
                  Approve Job
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-all">
                  <XCircle className="w-4 h-4" />
                  Reject Job
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-500 rounded-lg hover:bg-yellow-500/30 transition-all">
                  <Star className="w-4 h-4" />
                  Feature Job
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-500/20 text-gray-500 rounded-lg hover:bg-gray-500/30 transition-all">
                  <EyeOff className="w-4 h-4" />
                  Hide Job
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
