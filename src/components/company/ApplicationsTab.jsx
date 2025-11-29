import React, { useState } from "react";
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
} from "lucide-react";

const ApplicationsTab = ({ isDark, isMobile }) => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const applications = [
    {
      id: 1,
      candidateName: "John Doe",
      email: "john.doe@email.com",
      jobTitle: "Senior React Developer",
      appliedDate: "2024-11-27",
      status: "pending",
      experience: "5 years",
      skills: ["React", "TypeScript", "Node.js"],
      avatar: "JD",
    },
    {
      id: 2,
      candidateName: "Jane Smith",
      email: "jane.smith@email.com",
      jobTitle: "Product Designer",
      appliedDate: "2024-11-26",
      status: "interview",
      experience: "4 years",
      skills: ["Figma", "UI/UX", "Prototyping"],
      avatar: "JS",
    },
    {
      id: 3,
      candidateName: "Mike Johnson",
      email: "mike.j@email.com",
      jobTitle: "DevOps Engineer",
      appliedDate: "2024-11-25",
      status: "accepted",
      experience: "6 years",
      skills: ["AWS", "Docker", "Kubernetes"],
      avatar: "MJ",
    },
    {
      id: 4,
      candidateName: "Sarah Williams",
      email: "sarah.w@email.com",
      jobTitle: "Senior React Developer",
      appliedDate: "2024-11-24",
      status: "rejected",
      experience: "3 years",
      skills: ["React", "JavaScript", "CSS"],
      avatar: "SW",
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      pending: "text-yellow-500 bg-yellow-500/10",
      interview: "text-blue-500 bg-blue-500/10",
      accepted: "text-green-500 bg-green-500/10",
      rejected: "text-red-500 bg-red-500/10",
    };
    return colors[status] || "text-gray-500 bg-gray-500/10";
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      interview: <Mail className="w-4 h-4" />,
      accepted: <CheckCircle className="w-4 h-4" />,
      rejected: <XCircle className="w-4 h-4" />,
    };
    return icons[status];
  };

  const filteredApplications = applications.filter(
    (app) =>
      (filterStatus === "all" || app.status === filterStatus) &&
      (app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
       app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
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
            className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Applications {!isMobile && "📝"}
          </h2>
          <p className={`mt-1 ${isMobile ? 'text-xs' : 'text-sm'} ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Manage and review candidate applications
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className={`relative flex-1 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
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
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
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
                  <option value="interview">Interview</option>
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
          <div className={`p-3 rounded-xl border ${
            isDark ? "bg-slate-800 border-gray-700" : "bg-white border-gray-300"
          }`}>
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
              <option value="interview">Interview</option>
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
            key={app.id}
            className={`p-4 md:p-6 rounded-xl md:rounded-2xl border transition-all duration-500 hover:scale-[1.02] group ${
              isDark
                ? "bg-slate-800/50 border-gray-700 hover:border-purple-500/50"
                : "bg-white border-gray-200 hover:border-purple-300"
            }`}
          >
            <div className="flex flex-col gap-4 md:gap-6">
              {/* Candidate Info */}
              <div className="flex items-start gap-3 md:gap-4 flex-1">
                <div className={`${isMobile ? 'w-10 h-10' : 'w-14 h-14'} rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold ${isMobile ? 'text-sm' : 'text-lg'}`}>
                  {app.avatar}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 md:mb-3 gap-2">
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`${isMobile ? 'text-base' : 'text-lg'} font-bold mb-1 truncate ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {app.candidateName}
                      </h3>
                      <p
                        className={`${isMobile ? 'text-xs' : 'text-sm'} ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        } mb-2 truncate`}
                      >
                        {app.email}
                      </p>
                      <p
                        className={`font-semibold ${isMobile ? 'text-sm' : 'text-base'} ${
                          isDark ? "text-purple-400" : "text-purple-600"
                        }`}
                      >
                        {app.jobTitle}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 self-start">
                      {getStatusIcon(app.status)}
                      <span
                        className={`px-2 py-1 ${isMobile ? 'text-xs' : 'text-sm'} rounded-full font-semibold ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex items-center gap-1 md:gap-2 flex-wrap mb-2 md:mb-3">
                    {app.skills.slice(0, isMobile ? 2 : 3).map((skill, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded-full ${isMobile ? 'text-xs' : 'text-xs'} font-medium ${
                          isDark
                            ? "bg-blue-500/20 text-blue-300"
                            : "bg-blue-500/10 text-blue-700"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                    {isMobile && app.skills.length > 2 && (
                      <span className={`px-2 py-1 text-xs font-medium ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}>
                        +{app.skills.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-3 md:gap-4 flex-wrap">
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                      {app.experience} experience
                    </span>
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                      Applied {new Date(app.appliedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center sm:justify-end gap-1 md:gap-2 border-t pt-3 md:pt-0 md:border-0">
                <button
                  className={`p-2 md:p-3 rounded-xl transition-all duration-300 ${
                    isDark
                      ? "hover:bg-green-500/20 text-green-400 hover:text-green-300"
                      : "hover:bg-green-100 text-green-600 hover:text-green-700"
                  }`}
                  title="Accept"
                >
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button
                  className={`p-2 md:p-3 rounded-xl transition-all duration-300 ${
                    isDark
                      ? "hover:bg-red-500/20 text-red-400 hover:text-red-300"
                      : "hover:bg-red-100 text-red-600 hover:text-red-700"
                  }`}
                  title="Reject"
                >
                  <XCircle className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button
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
      {filteredApplications.length === 0 && (
        <div className={`text-center py-8 md:py-12 ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}>
          <div className="text-4xl md:text-6xl mb-3 md:mb-4">📭</div>
          <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold mb-1 md:mb-2`}>No applications found</h3>
          <p className={isMobile ? 'text-sm' : ''}>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ApplicationsTab;