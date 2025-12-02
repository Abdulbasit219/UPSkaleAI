"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Search,
  Filter,
  Download,
  UserCheck,
  UserX,
  Ban,
  Eye,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  FileText,
  X,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    location: "New York, USA",
    joinDate: "2024-01-15",
    status: "active",
    role: "Job Seeker",
    applications: 12,
    resumeUploaded: true,
    lastActive: "2 hours ago",
    profileComplete: 95,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 234 567 8901",
    location: "San Francisco, USA",
    joinDate: "2024-02-20",
    status: "active",
    role: "Job Seeker",
    applications: 8,
    resumeUploaded: true,
    lastActive: "1 day ago",
    profileComplete: 88,
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike.chen@example.com",
    phone: "+1 234 567 8902",
    location: "Seattle, USA",
    joinDate: "2024-03-10",
    status: "disabled",
    role: "Job Seeker",
    applications: 5,
    resumeUploaded: false,
    lastActive: "1 week ago",
    profileComplete: 60,
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "+1 234 567 8903",
    location: "Austin, USA",
    joinDate: "2024-04-05",
    status: "banned",
    role: "Job Seeker",
    applications: 3,
    resumeUploaded: true,
    lastActive: "2 weeks ago",
    profileComplete: 45,
  },
  {
    id: 5,
    name: "Alex Rodriguez",
    email: "alex.r@example.com",
    phone: "+1 234 567 8904",
    location: "Miami, USA",
    joinDate: "2024-05-12",
    status: "active",
    role: "Job Seeker",
    applications: 15,
    resumeUploaded: true,
    lastActive: "30 minutes ago",
    profileComplete: 100,
  },
];

const activityLogs = [
  { id: 1, action: "Profile updated", timestamp: "2024-12-02 10:30 AM" },
  {
    id: 2,
    action: "Applied to Senior Developer position",
    timestamp: "2024-12-02 09:15 AM",
  },
  { id: 3, action: "Resume uploaded", timestamp: "2024-12-01 04:20 PM" },
  { id: 4, action: "Login from New York", timestamp: "2024-12-01 08:00 AM" },
  { id: 5, action: "Profile created", timestamp: "2024-01-15 02:30 PM" },
];

export default function UserManagement() {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return isDark
          ? "bg-green-500/20 text-green-400 border-green-500/30"
          : "bg-green-100 text-green-700 border-green-300";
      case "disabled":
        return isDark
          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
          : "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "banned":
        return isDark
          ? "bg-red-500/20 text-red-400 border-red-500/30"
          : "bg-red-100 text-red-700 border-red-300";
      default:
        return isDark
          ? "bg-gray-500/20 text-gray-400 border-gray-500/30"
          : "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
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
            User Management
          </h1>
          <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Manage and monitor all platform users
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all">
          <Download className="w-4 h-4" />
          Export Users
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Users",
            value: "12,543",
            icon: UserCheck,
            color: "purple",
          },
          {
            label: "Active Users",
            value: "11,234",
            icon: UserCheck,
            color: "green",
          },
          { label: "Disabled", value: "1,234", icon: UserX, color: "yellow" },
          { label: "Banned", value: "75", icon: Ban, color: "red" },
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
                        : "text-red-500"
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
              placeholder="Search users by name or email..."
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
            <option value="disabled">Disabled</option>
            <option value="banned">Banned</option>
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

      {/* Users Table */}
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
                  User
                </th>
                <th
                  className={`text-left py-4 px-6 text-sm font-semibold ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Contact
                </th>
                <th
                  className={`text-left py-4 px-6 text-sm font-semibold ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Join Date
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
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className={`border-t ${
                    isDark
                      ? "border-purple-500/10 hover:bg-slate-800/30"
                      : "border-purple-300/10 hover:bg-purple-50/30"
                  } transition-colors`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p
                          className={`font-medium ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {user.name}
                        </p>
                        <p
                          className={`text-sm ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {user.role}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <p
                        className={`text-sm ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {user.email}
                      </p>
                      <p
                        className={`text-sm ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {user.phone}
                      </p>
                    </div>
                  </td>
                  <td
                    className={`py-4 px-6 text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {user.joinDate}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        isDark
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.applications} applications
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewUser(user)}
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
                            ? "bg-slate-700 text-gray-400 hover:bg-slate-600"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
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
                User Profile
              </h2>
              <button
                onClick={() => setShowUserModal(false)}
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
              {/* User Info */}
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold">
                  {selectedUser.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-2xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {selectedUser.name}
                  </h3>
                  <p
                    className={`text-sm mt-1 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {selectedUser.role}
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                        selectedUser.status
                      )}`}
                    >
                      {selectedUser.status}
                    </span>
                    <span
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Last active: {selectedUser.lastActive}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div
                className={`rounded-lg border p-4 ${
                  isDark
                    ? "bg-slate-800/50 border-purple-500/20"
                    : "bg-purple-50/50 border-purple-300/20"
                }`}
              >
                <h4
                  className={`text-lg font-semibold mb-4 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-purple-500" />
                    <div>
                      <p
                        className={`text-xs ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Email
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {selectedUser.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-purple-500" />
                    <div>
                      <p
                        className={`text-xs ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Phone
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {selectedUser.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-purple-500" />
                    <div>
                      <p
                        className={`text-xs ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Location
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {selectedUser.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-purple-500" />
                    <div>
                      <p
                        className={`text-xs ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Join Date
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {selectedUser.joinDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className={`rounded-lg border p-4 ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/20"
                      : "bg-purple-50/50 border-purple-300/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-8 h-8 text-purple-500" />
                    <div>
                      <p
                        className={`text-2xl font-bold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {selectedUser.applications}
                      </p>
                      <p
                        className={`text-sm ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Applications
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`rounded-lg border p-4 ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/20"
                      : "bg-purple-50/50 border-purple-300/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-pink-500" />
                    <div>
                      <p
                        className={`text-2xl font-bold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {selectedUser.profileComplete}%
                      </p>
                      <p
                        className={`text-sm ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Profile Complete
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`rounded-lg border p-4 ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/20"
                      : "bg-purple-50/50 border-purple-300/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {selectedUser.resumeUploaded ? (
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    ) : (
                      <XCircle className="w-8 h-8 text-red-500" />
                    )}
                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {selectedUser.resumeUploaded
                          ? "Uploaded"
                          : "Not Uploaded"}
                      </p>
                      <p
                        className={`text-sm ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Resume Status
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Logs */}
              <div>
                <h4
                  className={`text-lg font-semibold mb-4 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Recent Activity
                </h4>
                <div className="space-y-3">
                  {activityLogs.map((log) => (
                    <div
                      key={log.id}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        isDark
                          ? "bg-slate-800/50 border-purple-500/10"
                          : "bg-purple-50/50 border-purple-300/10"
                      }`}
                    >
                      <p
                        className={`text-sm ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {log.action}
                      </p>
                      <p
                        className={`text-xs ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {log.timestamp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t ${isDark ? 'border-purple-500/20' : 'border-purple-300/20'}">
                <button className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 transition-all">
                  <UserCheck className="w-4 h-4" />
                  Enable Account
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-500 rounded-lg hover:bg-yellow-500/30 transition-all">
                  <UserX className="w-4 h-4" />
                  Disable Account
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-all">
                  <Ban className="w-4 h-4" />
                  Ban User
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-500 rounded-lg hover:bg-purple-500/30 transition-all">
                  <FileText className="w-4 h-4" />
                  View Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
