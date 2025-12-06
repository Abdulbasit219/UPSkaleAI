"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
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
  Calendar,
  Plus,
} from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import PageHeader from "@/components/admin/PageHeader";
import SearchFilterBar from "@/components/admin/SearchFilterBar";
import AdminTable from "@/components/admin/AdminTable";
import DetailModal from "@/components/admin/DetailModal";
import PostJobModal from "@/components/company/PostJobModal";

export default function JobManagement() {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    pendingJobs: 0,
    featuredJobs: 0,
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/jobs");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/jobs/stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleJobAction = async (jobId, action) => {
    try {
      const response = await fetch(`/api/admin/jobs/${jobId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        await fetchJobs();
        await fetchStats();
        setShowJobModal(false);
      } else {
        console.error("Failed to update job");
      }
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchStats();
  }, []);

  const filteredJobs = jobs.filter((job) => {
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
      case "draft":
        return isDark
          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
          : "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "closed":
        return isDark
          ? "bg-red-500/20 text-red-400 border-red-500/30"
          : "bg-red-100 text-red-700 border-red-300";
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

  const columns = [
    {
      header: "Job Title",
      accessor: "title",
      render: (job) => (
        <div>
          <div className="flex items-center gap-2">
            <p
              className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}
            >
              {job.title}
            </p>
            {job.featured && (
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            )}
          </div>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            {job.type} • {job.salary}
          </p>
        </div>
      ),
    },
    {
      header: "Company",
      accessor: "company",
      render: (job) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
            {job.companyLogo}
          </div>
          <span className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {job.company}
          </span>
        </div>
      ),
    },
    { header: "Location", accessor: "location" },
    {
      header: "Applications",
      accessor: "applications",
      render: (job) => (
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
            className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            {job.views} views
          </span>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (job) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
            job.status
          )}`}
        >
          {job.status}
        </span>
      ),
    },
  ];

  const actions = (job) => (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleViewJob(job);
        }}
        className={`p-2 rounded-lg transition-all ${
          isDark
            ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
            : "bg-purple-100 text-purple-600 hover:bg-purple-200"
        }`}
      >
        <Eye className="w-4 h-4" />
      </button>
      {job.status === "draft" && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleJobAction(job.id, "approve");
            }}
            className={`p-2 rounded-lg transition-all ${
              isDark
                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                : "bg-green-100 text-green-600 hover:bg-green-200"
            }`}
          >
            <CheckCircle className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleJobAction(job.id, "reject");
            }}
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
        onClick={(e) => {
          e.stopPropagation();
          handleJobAction(job.id, "hide");
        }}
        className={`p-2 rounded-lg transition-all ${
          isDark
            ? "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        <EyeOff className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Job Post Management"
        description="Manage and moderate all job postings"
        actions={
          <div className="flex gap-3">
            <button
              onClick={() => setIsPostJobModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              <Plus className="w-4 h-4" />
              Post Job
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all">
              <Download className="w-4 h-4" />
              Export Jobs
            </button>
          </div>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Jobs",
            value: stats.totalJobs.toString(),
            icon: Briefcase,
            color: "purple",
          },
          {
            label: "Active Jobs",
            value: stats.activeJobs.toString(),
            icon: CheckCircle,
            color: "green",
          },
          {
            label: "Pending Review",
            value: stats.pendingJobs.toString(),
            icon: Clock,
            color: "yellow",
          },
          {
            label: "Featured Jobs",
            value: stats.featuredJobs.toString(),
            icon: Star,
            color: "pink",
          },
        ].map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Filters and Search */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search jobs by title or company..."
        filters={[
          { value: "all", label: "All Status" },
          { value: "active", label: "Active" },
          { value: "draft", label: "Pending" },
          { value: "closed", label: "Closed" },
        ]}
        activeFilter={statusFilter}
        onFilterChange={setStatusFilter}
      />

      {/* Jobs Table */}
      {loading ? (
        <div
          className={`flex items-center justify-center py-12 rounded-lg border ${
            isDark
              ? "bg-slate-800/50 border-purple-500/20"
              : "bg-white border-purple-300/20"
          }`}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>
              Loading jobs...
            </p>
          </div>
        </div>
      ) : (
        <AdminTable
          columns={columns}
          data={filteredJobs}
          actions={actions}
          onRowClick={handleViewJob}
        />
      )}

      {/* Job Detail Modal */}
      <DetailModal
        isOpen={showJobModal}
        onClose={() => setShowJobModal(false)}
        title="Job Details"
        maxWidth="max-w-4xl"
        footer={
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleJobAction(selectedJob?.id, "approve")}
              className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 transition-all"
            >
              <CheckCircle className="w-4 h-4" />
              Approve Job
            </button>
            <button
              onClick={() => handleJobAction(selectedJob?.id, "reject")}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-all"
            >
              <XCircle className="w-4 h-4" />
              Reject Job
            </button>
            <button
              onClick={() => handleJobAction(selectedJob?.id, "feature")}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-500 rounded-lg hover:bg-yellow-500/30 transition-all"
            >
              <Star className="w-4 h-4" />
              {selectedJob?.featured ? "Unfeature" : "Feature"} Job
            </button>
            <button
              onClick={() => handleJobAction(selectedJob?.id, "hide")}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500/20 text-gray-500 rounded-lg hover:bg-gray-500/30 transition-all"
            >
              <EyeOff className="w-4 h-4" />
              Hide Job
            </button>
          </div>
        }
      >
        {selectedJob && (
          <div className="space-y-6">
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
              className={`rounded-lg border overflow-hidden p-4 ${
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
                <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
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
                <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {selectedJob.category}
                </p>
              </div>
            </div>
          </div>
        )}
      </DetailModal>

      {/* Post Job Modal */}
      <PostJobModal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        isDark={isDark}
        onJobPosted={() => {
          fetchJobs();
          fetchStats();
        }}
      />
    </div>
  );
}
