import React, { useState, useEffect } from "react";
import {
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Download,
  Mail,
  ChevronDown,
  Filter,
  X,
  User,
  Briefcase,
  Calendar,
  FileText,
  Trash2,
} from "lucide-react";
import axios from "axios";
import ConfirmDialog from "./ConfirmDialog";

const ApplicationsTab = ({ isDark, isMobile }) => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    applicationId: null,
    title: "",
    message: "",
  });

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/company/applications");
        if (response.data.success && Array.isArray(response.data.data)) {
          setApplications(response.data.data);
        } else {
          setApplications([]);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        setApplications([]);
      } finally {
        setLoading(false);
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

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      reviewing: <Mail className="w-4 h-4" />,
      shortlisted: <CheckCircle className="w-4 h-4" />,
      accepted: <CheckCircle className="w-4 h-4" />,
      rejected: <XCircle className="w-4 h-4" />,
    };
    return icons[status];
  };

  const getInitials = (name) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      const response = await axios.patch(
        `/api/company/applications/${applicationId}`,
        { status: newStatus }
      );

      if (response.data.success) {
        // Update the applications list with the new status
        setApplications((prevApps) =>
          prevApps.map((app) =>
            app._id === applicationId ? { ...app, status: newStatus } : app
          )
        );

        // Update selected application if it's in the modal
        if (selectedApplication?._id === applicationId) {
          setSelectedApplication((prev) => ({ ...prev, status: newStatus }));
        }

        // Show success message (you can add toast notification here)
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(`Error updating application status:`, error);
      alert(
        error.response?.data?.message ||
          "Failed to update application. Please try again."
      );
    }
  };

  const handleDelete = (applicationId) => {
    setConfirmDialog({
      isOpen: true,
      applicationId,
      title: "Delete Application",
      message:
        "Are you sure you want to delete this application? This action cannot be undone and will permanently remove all application data.",
    });
  };

  const confirmDelete = async () => {
    const applicationId = confirmDialog.applicationId;

    try {
      const response = await axios.delete(
        `/api/company/applications/${applicationId}`
      );

      if (response.data.success) {
        // Remove the application from the list
        setApplications((prevApps) =>
          prevApps.filter((app) => app._id !== applicationId)
        );

        // Close modal if this application was being viewed
        if (selectedApplication?._id === applicationId) {
          setShowModal(false);
          setSelectedApplication(null);
        }

        // Show success message
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting application:", error);
      alert(
        error.response?.data?.message ||
          "Failed to delete application. Please try again."
      );
    }
  };

  const filteredApplications = applications.filter(
    (app) =>
      (filterStatus === "all" || app.status === filterStatus) &&
      ((app.user?.username || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
        (app.job?.title || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div
        className={`p-4 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-xl border transition-all duration-500 ${
          isDark
            ? "bg-slate-900/80 border-purple-500/20"
            : "bg-white/80 border-purple-200/30"
        }`}
      >
        <div className="text-center py-12">
          <div className="text-4xl mb-4">⏳</div>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Loading applications...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`p-4 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-xl border transition-all duration-500 ${
          isDark
            ? "bg-slate-900/80 border-purple-500/20"
            : "bg-white/80 border-purple-200/30"
        }`}
      >
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6 md:mb-8">
          <div>
            <h2
              className={`${isMobile ? "text-xl" : "text-2xl"} font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Applications {!isMobile && "📝"}
            </h2>
            <p
              className={`mt-1 ${isMobile ? "text-xs" : "text-sm"} ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Manage and review candidate applications
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div
              className={`relative flex-1 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <input
                type="text"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 md:py-3 rounded-xl border transition-all ${
                  isDark
                    ? "bg-slate-800 border-gray-700 text-white placeholder-gray-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            <div className="flex gap-2">
              {isMobile ? (
                <>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-3 py-2 md:py-3 rounded-xl border transition-all ${
                      isDark
                        ? "bg-slate-800 border-gray-700 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
                    />
                  </button>
                  <button
                    className={`p-2 rounded-xl border transition-all ${
                      isDark
                        ? "bg-slate-800 border-gray-700 text-white hover:bg-slate-700"
                        : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Download className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </>
              ) : (
                <>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={`px-3 md:px-4 py-2 md:py-3 rounded-xl border transition-all ${
                      isDark
                        ? "bg-slate-800 border-gray-700 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button
                    className={`p-2 md:p-3 rounded-xl border transition-all ${
                      isDark
                        ? "bg-slate-800 border-gray-700 text-white hover:bg-slate-700"
                        : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Download className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Filters Dropdown */}
          {isMobile && showFilters && (
            <div
              className={`p-3 rounded-xl border ${
                isDark
                  ? "bg-slate-800 border-gray-700"
                  : "bg-white border-gray-300"
              }`}
            >
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border transition-all ${
                  isDark
                    ? "bg-slate-700 border-gray-600 text-white"
                    : "bg-gray-50 border-gray-300 text-gray-900"
                }`}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          )}
        </div>

        {/* Applications Grid */}
        <div className="space-y-3 md:space-y-4">
          {filteredApplications.map((app) => (
            <div
              key={app._id}
              className={`p-4 md:p-6 rounded-xl md:rounded-2xl border transition-all duration-500 hover:scale-[1.02] group ${
                isDark
                  ? "bg-slate-800/50 border-gray-700 hover:border-purple-500/50"
                  : "bg-white border-gray-200 hover:border-purple-300"
              }`}
            >
              <div className="flex flex-col gap-4 md:gap-6">
                {/* Candidate Info */}
                <div className="flex items-start gap-3 md:gap-4 flex-1">
                  <div
                    className={`${isMobile ? "w-10 h-10" : "w-14 h-14"} rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold ${isMobile ? "text-sm" : "text-lg"}`}
                  >
                    {getInitials(app.user?.name)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 md:mb-3 gap-2">
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`${isMobile ? "text-base" : "text-lg"} font-bold mb-1 truncate ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {app.user?.username || "Unknown Candidate"}
                        </h3>
                        <p
                          className={`${isMobile ? "text-xs" : "text-sm"} ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          } mb-2 truncate`}
                        >
                          {app.user?.email || "No email"}
                        </p>
                        <p
                          className={`font-semibold ${isMobile ? "text-sm" : "text-base"} ${
                            isDark ? "text-purple-400" : "text-purple-600"
                          }`}
                        >
                          {app.job?.title || "Unknown Position"}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-start">
                        {getStatusIcon(app.status)}
                        <span
                          className={`px-2 py-1 ${isMobile ? "text-xs" : "text-sm"} rounded-full font-semibold ${getStatusColor(
                            app.status
                          )}`}
                        >
                          {app.status}
                        </span>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 md:gap-4 flex-wrap">
                      <span
                        className={`${isMobile ? "text-xs" : "text-sm"} ${isDark ? "text-gray-500" : "text-gray-400"}`}
                      >
                        Applied{" "}
                        {new Date(
                          app.createdAt || app.appliedAt
                        ).toLocaleDateString()}
                      </span>
                      {app.resume && (
                        <a
                          href={app.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${isMobile ? "text-xs" : "text-sm"} ${isDark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"} underline`}
                        >
                          View Resume
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center sm:justify-end gap-1 md:gap-2 border-t pt-3 md:pt-0 md:border-0">
                  <button
                    onClick={() => handleStatusUpdate(app._id, "accepted")}
                    disabled={app.status === "accepted"}
                    className={`p-2 md:p-3 rounded-xl transition-all duration-300 ${
                      app.status === "accepted"
                        ? isDark
                          ? "bg-green-500/20 text-green-300 cursor-not-allowed"
                          : "bg-green-100 text-green-600 cursor-not-allowed"
                        : isDark
                          ? "hover:bg-green-500/20 text-green-400 hover:text-green-300"
                          : "hover:bg-green-100 text-green-600 hover:text-green-700"
                    }`}
                    title="Accept"
                  >
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(app._id, "rejected")}
                    disabled={app.status === "rejected"}
                    className={`p-2 md:p-3 rounded-xl transition-all duration-300 ${
                      app.status === "rejected"
                        ? isDark
                          ? "bg-red-500/20 text-red-300 cursor-not-allowed"
                          : "bg-red-100 text-red-600 cursor-not-allowed"
                        : isDark
                          ? "hover:bg-red-500/20 text-red-400 hover:text-red-300"
                          : "hover:bg-red-100 text-red-600 hover:text-red-700"
                    }`}
                    title="Reject"
                  >
                    <XCircle className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(app._id)}
                    className={`p-2 md:p-3 rounded-xl transition-all duration-300 ${
                      isDark
                        ? "hover:bg-orange-500/20 text-orange-400 hover:text-orange-300"
                        : "hover:bg-orange-100 text-orange-600 hover:text-orange-700"
                    }`}
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedApplication(app);
                      setShowModal(true);
                    }}
                    className={`p-2 md:p-3 rounded-xl transition-all duration-300 ${
                      isDark
                        ? "hover:bg-slate-700 text-gray-400 hover:text-white"
                        : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                    }`}
                    title="View Details"
                  >
                    <Eye className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredApplications.length === 0 && !loading && (
          <div
            className={`text-center py-8 md:py-12 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <div className="text-4xl md:text-6xl mb-3 md:mb-4">📭</div>
            <h3
              className={`${isMobile ? "text-lg" : "text-xl"} font-semibold mb-1 md:mb-2`}
            >
              No applications found
            </h3>
            <p className={isMobile ? "text-sm" : ""}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Application Details Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border ${
              isDark
                ? "bg-slate-900 border-purple-500/20"
                : "bg-white border-purple-200/30"
            }`}
          >
            {/* Modal Header */}
            <div
              className={`sticky top-0 z-10 flex items-center justify-between p-6 border-b ${
                isDark
                  ? "bg-slate-900 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2
                className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Application Details
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedApplication(null);
                }}
                className={`p-2 rounded-xl transition-all ${
                  isDark
                    ? "hover:bg-slate-800 text-gray-400 hover:text-white"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                }`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Candidate Info */}
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-2xl">
                  {getInitials(
                    selectedApplication.user?.name ||
                      selectedApplication.user?.username
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    {selectedApplication.user?.username || "Unknown Candidate"}
                  </h3>
                  <p
                    className={`text-sm mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {selectedApplication.user?.email || "No email"}
                  </p>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedApplication.status)}
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-semibold ${getStatusColor(
                        selectedApplication.status
                      )}`}
                    >
                      {selectedApplication.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Job Info */}
              <div
                className={`p-4 rounded-xl ${isDark ? "bg-slate-800/50" : "bg-gray-50"}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase
                    className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-purple-600"}`}
                  />
                  <h4
                    className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Applied Position
                  </h4>
                </div>
                <p
                  className={`text-lg font-bold ${isDark ? "text-purple-400" : "text-purple-600"}`}
                >
                  {selectedApplication.job?.title || "Unknown Position"}
                </p>
                {selectedApplication.job?.company && (
                  <p
                    className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    at {selectedApplication.job.company}
                  </p>
                )}
              </div>

              {/* Application Date */}
              <div
                className={`p-4 rounded-xl ${isDark ? "bg-slate-800/50" : "bg-gray-50"}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Calendar
                    className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-purple-600"}`}
                  />
                  <h4
                    className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Application Date
                  </h4>
                </div>
                <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                  {new Date(
                    selectedApplication.createdAt ||
                      selectedApplication.appliedAt
                  ).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Cover Letter */}
              {selectedApplication.coverLetter && (
                <div
                  className={`p-4 rounded-xl ${isDark ? "bg-slate-800/50" : "bg-gray-50"}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <FileText
                      className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-purple-600"}`}
                    />
                    <h4
                      className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      Cover Letter
                    </h4>
                  </div>
                  <p
                    className={`whitespace-pre-wrap ${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    {selectedApplication.coverLetter}
                  </p>
                </div>
              )}

              {/* Resume */}
              {selectedApplication.resume && (
                <div
                  className={`p-4 rounded-xl ${isDark ? "bg-slate-800/50" : "bg-gray-50"}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <User
                      className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-purple-600"}`}
                    />
                    <h4
                      className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      Resume
                    </h4>
                  </div>
                  <a
                    href={selectedApplication.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                      isDark
                        ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
                        : "bg-purple-100 text-purple-600 hover:bg-purple-200"
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </a>
                </div>
              )}

              {/* Additional Answers */}
              {selectedApplication.answers &&
                Object.keys(selectedApplication.answers).length > 0 && (
                  <div
                    className={`p-4 rounded-xl ${isDark ? "bg-slate-800/50" : "bg-gray-50"}`}
                  >
                    <h4
                      className={`font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      Additional Questions
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(selectedApplication.answers).map(
                        ([question, answer], index) => (
                          <div key={index}>
                            <p
                              className={`font-medium mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                            >
                              {question}
                            </p>
                            <p
                              className={
                                isDark ? "text-gray-400" : "text-gray-600"
                              }
                            >
                              {answer}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Notes */}
              {selectedApplication.notes && (
                <div
                  className={`p-4 rounded-xl ${isDark ? "bg-slate-800/50" : "bg-gray-50"}`}
                >
                  <h4
                    className={`font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Internal Notes
                  </h4>
                  <p
                    className={`whitespace-pre-wrap ${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    {selectedApplication.notes}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div
              className={`sticky bottom-0 flex items-center justify-end gap-3 p-6 border-t ${
                isDark
                  ? "bg-slate-900 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedApplication(null);
                }}
                className={`px-6 py-2 rounded-xl transition-all ${
                  isDark
                    ? "bg-slate-800 text-white hover:bg-slate-700"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }`}
              >
                Close
              </button>
              <button
                onClick={() => handleDelete(selectedApplication._id)}
                className={`px-6 py-2 rounded-xl transition-all ${
                  isDark
                    ? "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
                    : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                }`}
              >
                Delete Application
              </button>
              <button
                onClick={() =>
                  handleStatusUpdate(selectedApplication._id, "accepted")
                }
                disabled={selectedApplication.status === "accepted"}
                className={`px-6 py-2 rounded-xl transition-all ${
                  selectedApplication.status === "accepted"
                    ? isDark
                      ? "bg-green-500/10 text-green-500/50 cursor-not-allowed"
                      : "bg-green-50 text-green-400 cursor-not-allowed"
                    : isDark
                      ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                      : "bg-green-100 text-green-600 hover:bg-green-200"
                }`}
              >
                {selectedApplication.status === "accepted"
                  ? "✓ Accepted"
                  : "Accept Application"}
              </button>
              <button
                onClick={() =>
                  handleStatusUpdate(selectedApplication._id, "rejected")
                }
                disabled={selectedApplication.status === "rejected"}
                className={`px-6 py-2 rounded-xl transition-all ${
                  selectedApplication.status === "rejected"
                    ? isDark
                      ? "bg-red-500/10 text-red-500/50 cursor-not-allowed"
                      : "bg-red-50 text-red-400 cursor-not-allowed"
                    : isDark
                      ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      : "bg-red-100 text-red-600 hover:bg-red-200"
                }`}
              >
                {selectedApplication.status === "rejected"
                  ? "✗ Rejected"
                  : "Reject Application"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() =>
          setConfirmDialog({
            isOpen: false,
            applicationId: null,
            title: "",
            message: "",
          })
        }
        onConfirm={confirmDelete}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText="Delete"
        cancelText="Cancel"
        isDark={isDark}
        variant="danger"
      />
    </>
  );
};

export default ApplicationsTab;
