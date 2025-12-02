"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Flag,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  User,
  Building2,
  Briefcase,
  Search,
  Filter,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";

// Mock reported items data
const reportedItems = [
  {
    id: 1,
    type: "user",
    reportedBy: "John Doe",
    reportedItem: "Spam Account",
    itemId: "user_123",
    reason: "Spam/Scam",
    description: "This user is posting spam messages and fake job offers.",
    date: "2024-12-01",
    status: "pending",
    severity: "high",
    details: {
      name: "Spam User",
      email: "spam@example.com",
      phone: "+1 000 000 0000",
      location: "Unknown",
    },
  },
  {
    id: 2,
    type: "company",
    reportedBy: "Sarah Johnson",
    reportedItem: "Fake Company Inc",
    itemId: "company_456",
    reason: "Fraudulent Company",
    description: "This company is not legitimate and posting fake job offers.",
    date: "2024-11-30",
    status: "pending",
    severity: "critical",
    details: {
      name: "Fake Company Inc",
      email: "fake@company.com",
      phone: "+1 111 111 1111",
      location: "Unknown",
    },
  },
  {
    id: 3,
    type: "job",
    reportedBy: "Mike Chen",
    reportedItem: "Suspicious Job Posting",
    itemId: "job_789",
    reason: "Misleading Information",
    description:
      "Job posting contains misleading salary information and requirements.",
    date: "2024-11-29",
    status: "resolved",
    severity: "medium",
    details: {
      title: "Senior Developer - Fake Salary",
      company: "Suspicious Corp",
      location: "Remote",
      salary: "$500k - $1M",
    },
  },
  {
    id: 4,
    type: "user",
    reportedBy: "Emily Davis",
    reportedItem: "Inappropriate Profile",
    itemId: "user_234",
    reason: "Inappropriate Content",
    description: "User profile contains inappropriate content and images.",
    date: "2024-11-28",
    status: "investigating",
    severity: "high",
    details: {
      name: "Inappropriate User",
      email: "bad@example.com",
      phone: "+1 222 222 2222",
      location: "Unknown",
    },
  },
  {
    id: 5,
    type: "company",
    reportedBy: "Alex Rodriguez",
    reportedItem: "Discriminatory Practices",
    itemId: "company_567",
    reason: "Discrimination",
    description: "Company job postings contain discriminatory language.",
    date: "2024-11-27",
    status: "dismissed",
    severity: "low",
    details: {
      name: "Biased Company Ltd",
      email: "hr@biased.com",
      phone: "+1 333 333 3333",
      location: "New York, USA",
    },
  },
];

const disputes = [
  {
    id: 1,
    title: "Application Rejection Dispute",
    complainant: "John Doe",
    respondent: "TechVision Solutions",
    type: "Application",
    date: "2024-12-01",
    status: "open",
    description: "Applicant claims unfair rejection without proper review.",
  },
  {
    id: 2,
    title: "Payment Dispute",
    complainant: "Creative Agency",
    respondent: "Global Corp",
    type: "Payment",
    date: "2024-11-30",
    status: "in_progress",
    description: "Company claims non-payment for services rendered.",
  },
  {
    id: 3,
    title: "Contract Violation",
    complainant: "Sarah Johnson",
    respondent: "Digital Innovations",
    type: "Contract",
    date: "2024-11-28",
    status: "resolved",
    description: "Employee claims contract terms were violated.",
  },
];

export default function Moderation() {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState("reports");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filteredReports = reportedItems.filter((item) => {
    const matchesSearch =
      item.reportedItem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reportedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredDisputes = disputes.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.complainant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
      case "open":
        return isDark
          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
          : "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "investigating":
      case "in_progress":
        return isDark
          ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
          : "bg-blue-100 text-blue-700 border-blue-300";
      case "resolved":
        return isDark
          ? "bg-green-500/20 text-green-400 border-green-500/30"
          : "bg-green-100 text-green-700 border-green-300";
      case "dismissed":
        return isDark
          ? "bg-gray-500/20 text-gray-400 border-gray-500/30"
          : "bg-gray-100 text-gray-700 border-gray-300";
      default:
        return isDark
          ? "bg-gray-500/20 text-gray-400 border-gray-500/30"
          : "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return isDark
          ? "bg-red-500/20 text-red-400 border-red-500/30"
          : "bg-red-100 text-red-700 border-red-300";
      case "high":
        return isDark
          ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
          : "bg-orange-100 text-orange-700 border-orange-300";
      case "medium":
        return isDark
          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
          : "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "low":
        return isDark
          ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
          : "bg-blue-100 text-blue-700 border-blue-300";
      default:
        return isDark
          ? "bg-gray-500/20 text-gray-400 border-gray-500/30"
          : "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "user":
        return User;
      case "company":
        return Building2;
      case "job":
        return Briefcase;
      default:
        return Flag;
    }
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1
          className={`text-3xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Moderation Tools
        </h1>
        <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Manage reports, disputes, and platform moderation
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Pending Reports",
            value: "23",
            icon: Flag,
            color: "yellow",
          },
          {
            label: "Active Disputes",
            value: "12",
            icon: AlertTriangle,
            color: "orange",
          },
          {
            label: "Resolved Today",
            value: "45",
            icon: CheckCircle,
            color: "green",
          },
          { label: "Critical Issues", value: "3", icon: XCircle, color: "red" },
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
                  stat.color === "yellow"
                    ? "text-yellow-500"
                    : stat.color === "orange"
                      ? "text-orange-500"
                      : stat.color === "green"
                        ? "text-green-500"
                        : "text-red-500"
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div
        className={`rounded-xl border backdrop-blur-xl ${
          isDark
            ? "bg-slate-900/50 border-purple-500/20"
            : "bg-white/80 border-purple-300/20"
        }`}
      >
        <div className="flex border-b ${isDark ? 'border-purple-500/20' : 'border-purple-300/20'}">
          <button
            onClick={() => setActiveTab("reports")}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-all ${
              activeTab === "reports"
                ? "border-b-2 border-purple-500 text-purple-500"
                : isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Flag className="w-4 h-4" />
              Reported Items
            </div>
          </button>
          <button
            onClick={() => setActiveTab("disputes")}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-all ${
              activeTab === "disputes"
                ? "border-b-2 border-purple-500 text-purple-500"
                : isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Disputes
            </div>
          </button>
        </div>

        {/* Filters */}
        <div className="p-6 border-b ${isDark ? 'border-purple-500/20' : 'border-purple-300/20'}">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all outline-none ${
                  isDark
                    ? "bg-slate-800 border-purple-500/30 text-white placeholder:text-gray-400"
                    : "bg-white border-purple-300/30 text-gray-900 placeholder:text-gray-500"
                }`}
              />
            </div>
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
              <option value="pending">Pending</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
              <option value="dismissed">Dismissed</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "reports" ? (
            <div className="space-y-4">
              {filteredReports.map((report) => {
                const TypeIcon = getTypeIcon(report.type);
                return (
                  <div
                    key={report.id}
                    className={`p-4 rounded-lg border transition-all hover:scale-[1.01] ${
                      isDark
                        ? "bg-slate-800/50 border-purple-500/10"
                        : "bg-purple-50/50 border-purple-300/10"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div
                          className={`p-3 rounded-lg ${
                            isDark ? "bg-purple-500/20" : "bg-purple-100"
                          }`}
                        >
                          <TypeIcon className="w-6 h-6 text-purple-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4
                              className={`font-semibold ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {report.reportedItem}
                            </h4>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(
                                report.severity
                              )}`}
                            >
                              {report.severity}
                            </span>
                          </div>
                          <p
                            className={`text-sm mb-2 ${
                              isDark ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            <strong>Reason:</strong> {report.reason}
                          </p>
                          <p
                            className={`text-sm mb-2 ${
                              isDark ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {report.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs">
                            <span
                              className={`${
                                isDark ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              Reported by: {report.reportedBy}
                            </span>
                            <span
                              className={`${
                                isDark ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {report.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                            report.status
                          )}`}
                        >
                          {report.status}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewDetails(report)}
                            className={`p-2 rounded-lg transition-all ${
                              isDark
                                ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
                                : "bg-purple-100 text-purple-600 hover:bg-purple-200"
                            }`}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
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
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDisputes.map((dispute) => (
                <div
                  key={dispute.id}
                  className={`p-4 rounded-lg border transition-all hover:scale-[1.01] ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/10"
                      : "bg-purple-50/50 border-purple-300/10"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4
                        className={`font-semibold mb-2 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {dispute.title}
                      </h4>
                      <p
                        className={`text-sm mb-2 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {dispute.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs">
                        <span
                          className={`${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          <strong>Complainant:</strong> {dispute.complainant}
                        </span>
                        <span
                          className={`${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          <strong>Respondent:</strong> {dispute.respondent}
                        </span>
                        <span
                          className={`${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {dispute.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                          dispute.status
                        )}`}
                      >
                        {dispute.status.replace("_", " ")}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          className={`p-2 rounded-lg transition-all ${
                            isDark
                              ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
                              : "bg-purple-100 text-purple-600 hover:bg-purple-200"
                          }`}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className={`p-2 rounded-lg transition-all ${
                            isDark
                              ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                              : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                          }`}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className={`w-full max-w-2xl rounded-xl border backdrop-blur-xl ${
              isDark
                ? "bg-slate-900 border-purple-500/20"
                : "bg-white border-purple-300/20"
            }`}
          >
            <div
              className={`flex items-center justify-between p-6 border-b ${
                isDark ? "border-purple-500/20" : "border-purple-300/20"
              }`}
            >
              <h2
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Report Details
              </h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className={`p-2 rounded-lg transition-all ${
                  isDark
                    ? "hover:bg-slate-800 text-gray-400"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {selectedItem.reportedItem}
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                      selectedItem.status
                    )}`}
                  >
                    {selectedItem.status}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(
                      selectedItem.severity
                    )}`}
                  >
                    {selectedItem.severity} severity
                  </span>
                </div>
              </div>

              <div
                className={`rounded-lg border p-4 ${
                  isDark
                    ? "bg-slate-800/50 border-purple-500/20"
                    : "bg-purple-50/50 border-purple-300/20"
                }`}
              >
                <p
                  className={`text-sm font-semibold mb-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Reason: {selectedItem.reason}
                </p>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {selectedItem.description}
                </p>
              </div>

              {selectedItem.details && (
                <div
                  className={`rounded-lg border p-4 ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/20"
                      : "bg-purple-50/50 border-purple-300/20"
                  }`}
                >
                  <h4
                    className={`font-semibold mb-3 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Item Details
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(selectedItem.details).map(
                      ([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                          <span
                            className={`text-sm font-medium capitalize ${
                              isDark ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {key}:
                          </span>
                          <span
                            className={`text-sm ${
                              isDark ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {value}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 transition-all">
                  <CheckCircle className="w-4 h-4" />
                  Resolve
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-all">
                  <XCircle className="w-4 h-4" />
                  Dismiss
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-500/30 transition-all">
                  <AlertTriangle className="w-4 h-4" />
                  Investigate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
