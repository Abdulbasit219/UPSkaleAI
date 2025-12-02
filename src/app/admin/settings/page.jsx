"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Shield,
  Users,
  Tag,
  Briefcase,
  Settings as SettingsIcon,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  CheckCircle,
} from "lucide-react";

// Mock data
const adminRoles = [
  {
    id: 1,
    name: "Super Admin",
    permissions: ["all"],
    userCount: 2,
    color: "purple",
  },
  {
    id: 2,
    name: "Moderator",
    permissions: ["view", "moderate", "edit"],
    userCount: 5,
    color: "blue",
  },
  {
    id: 3,
    name: "Support",
    permissions: ["view", "respond"],
    userCount: 8,
    color: "green",
  },
  {
    id: 4,
    name: "Analyst",
    permissions: ["view", "reports"],
    userCount: 3,
    color: "pink",
  },
];

const skillCategories = [
  { id: 1, name: "Programming Languages", count: 45, color: "purple" },
  { id: 2, name: "Frameworks & Libraries", count: 67, color: "blue" },
  { id: 3, name: "Design Tools", count: 23, color: "pink" },
  { id: 4, name: "Soft Skills", count: 34, color: "green" },
  { id: 5, name: "Certifications", count: 56, color: "yellow" },
];

const jobSectors = [
  { id: 1, name: "Technology", jobCount: 1234, color: "purple" },
  { id: 2, name: "Marketing", jobCount: 856, color: "pink" },
  { id: 3, name: "Design", jobCount: 634, color: "blue" },
  { id: 4, name: "Sales", jobCount: 432, color: "green" },
  { id: 5, name: "Finance", jobCount: 300, color: "yellow" },
];

const platformTags = [
  { id: 1, name: "Remote", usageCount: 2345 },
  { id: 2, name: "Full-time", usageCount: 3456 },
  { id: 3, name: "Part-time", usageCount: 1234 },
  { id: 4, name: "Contract", usageCount: 987 },
  { id: 5, name: "Internship", usageCount: 654 },
  { id: 6, name: "Entry Level", usageCount: 1567 },
  { id: 7, name: "Senior", usageCount: 2134 },
  { id: 8, name: "Lead", usageCount: 876 },
];

export default function Settings() {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState("roles");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const getColorClasses = (color) => {
    const colors = {
      purple: {
        bg: isDark ? "bg-purple-500/20" : "bg-purple-100",
        text: "text-purple-500",
        border: isDark ? "border-purple-500/30" : "border-purple-300",
      },
      blue: {
        bg: isDark ? "bg-blue-500/20" : "bg-blue-100",
        text: "text-blue-500",
        border: isDark ? "border-blue-500/30" : "border-blue-300",
      },
      pink: {
        bg: isDark ? "bg-pink-500/20" : "bg-pink-100",
        text: "text-pink-500",
        border: isDark ? "border-pink-500/30" : "border-pink-300",
      },
      green: {
        bg: isDark ? "bg-green-500/20" : "bg-green-100",
        text: "text-green-500",
        border: isDark ? "border-green-500/30" : "border-green-300",
      },
      yellow: {
        bg: isDark ? "bg-yellow-500/20" : "bg-yellow-100",
        text: "text-yellow-500",
        border: isDark ? "border-yellow-500/30" : "border-yellow-300",
      },
    };
    return colors[color] || colors.purple;
  };

  const tabs = [
    { id: "roles", name: "Admin Roles", icon: Shield },
    { id: "skills", name: "Skills", icon: Tag },
    { id: "sectors", name: "Sectors", icon: Briefcase },
    { id: "tags", name: "Tags", icon: Tag },
  ];

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
            System Settings
          </h1>
          <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Manage platform configuration and categories
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>

      {/* Tabs */}
      <div
        className={`rounded-xl border backdrop-blur-xl ${
          isDark
            ? "bg-slate-900/50 border-purple-500/20"
            : "bg-white/80 border-purple-300/20"
        }`}
      >
        <div
          className={`flex overflow-x-auto border-b ${isDark ? "border-purple-500/20" : "border-purple-300/20"}`}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-b-2 border-purple-500 text-purple-500"
                  : isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Admin Roles */}
          {activeTab === "roles" && (
            <div className="space-y-4">
              {adminRoles.map((role) => {
                const colors = getColorClasses(role.color);
                return (
                  <div
                    key={role.id}
                    className={`p-4 rounded-lg border transition-all hover:scale-[1.01] ${
                      isDark
                        ? "bg-slate-800/50 border-purple-500/10"
                        : "bg-purple-50/50 border-purple-300/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-lg ${colors.bg} border ${colors.border}`}
                        >
                          <Shield className={`w-6 h-6 ${colors.text}`} />
                        </div>
                        <div>
                          <h4
                            className={`font-semibold ${
                              isDark ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {role.name}
                          </h4>
                          <p
                            className={`text-sm ${
                              isDark ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {role.userCount} users • Permissions:{" "}
                            {role.permissions.join(", ")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingItem(role)}
                          className={`p-2 rounded-lg transition-all ${
                            isDark
                              ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                              : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                          }`}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          className={`p-2 rounded-lg transition-all ${
                            isDark
                              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                              : "bg-red-100 text-red-600 hover:bg-red-200"
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Skills */}
          {activeTab === "skills" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skillCategories.map((category) => {
                const colors = getColorClasses(category.color);
                return (
                  <div
                    key={category.id}
                    className={`p-4 rounded-lg border transition-all hover:scale-[1.02] ${
                      isDark
                        ? "bg-slate-800/50 border-purple-500/10"
                        : "bg-purple-50/50 border-purple-300/10"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${colors.bg} border ${colors.border}`}
                        >
                          <Tag className={`w-5 h-5 ${colors.text}`} />
                        </div>
                        <div>
                          <h4
                            className={`font-semibold ${
                              isDark ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {category.name}
                          </h4>
                          <p
                            className={`text-sm ${
                              isDark ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {category.count} skills
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className={`p-2 rounded-lg transition-all ${
                            isDark
                              ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                              : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                          }`}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          className={`p-2 rounded-lg transition-all ${
                            isDark
                              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                              : "bg-red-100 text-red-600 hover:bg-red-200"
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Sectors */}
          {activeTab === "sectors" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobSectors.map((sector) => {
                const colors = getColorClasses(sector.color);
                return (
                  <div
                    key={sector.id}
                    className={`p-4 rounded-lg border transition-all hover:scale-[1.02] ${
                      isDark
                        ? "bg-slate-800/50 border-purple-500/10"
                        : "bg-purple-50/50 border-purple-300/10"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${colors.bg} border ${colors.border}`}
                        >
                          <Briefcase className={`w-5 h-5 ${colors.text}`} />
                        </div>
                        <div>
                          <h4
                            className={`font-semibold ${
                              isDark ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {sector.name}
                          </h4>
                          <p
                            className={`text-sm ${
                              isDark ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {sector.jobCount} jobs
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className={`p-2 rounded-lg transition-all ${
                            isDark
                              ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                              : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                          }`}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          className={`p-2 rounded-lg transition-all ${
                            isDark
                              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                              : "bg-red-100 text-red-600 hover:bg-red-200"
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tags */}
          {activeTab === "tags" && (
            <div className="flex flex-wrap gap-3">
              {platformTags.map((tag) => (
                <div
                  key={tag.id}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-lg border transition-all hover:scale-105 ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/20"
                      : "bg-purple-50/50 border-purple-300/20"
                  }`}
                >
                  <Tag className="w-4 h-4 text-purple-500" />
                  <span
                    className={`font-medium ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {tag.name}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isDark
                        ? "bg-purple-500/20 text-purple-400"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {tag.usageCount}
                  </span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className={`p-1 rounded transition-all ${
                        isDark
                          ? "hover:bg-blue-500/20 text-blue-400"
                          : "hover:bg-blue-100 text-blue-600"
                      }`}
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button
                      className={`p-1 rounded transition-all ${
                        isDark
                          ? "hover:bg-red-500/20 text-red-400"
                          : "hover:bg-red-100 text-red-600"
                      }`}
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className={`w-full max-w-md rounded-xl border backdrop-blur-xl ${
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
                className={`text-xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {editingItem ? "Edit Item" : "Add New Item"}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingItem(null);
                }}
                className={`p-2 rounded-lg transition-all ${
                  isDark
                    ? "hover:bg-slate-800 text-gray-400"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter name..."
                  className={`w-full px-4 py-3 border rounded-lg transition-all outline-none ${
                    isDark
                      ? "bg-slate-800 border-purple-500/30 text-white placeholder:text-gray-400"
                      : "bg-white border-purple-300/30 text-gray-900 placeholder:text-gray-500"
                  }`}
                />
              </div>
              {activeTab === "roles" && (
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Permissions
                  </label>
                  <div className="space-y-2">
                    {["view", "edit", "delete", "moderate", "reports"].map(
                      (perm) => (
                        <label
                          key={perm}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-purple-500 text-purple-500 focus:ring-purple-500"
                          />
                          <span
                            className={`text-sm capitalize ${
                              isDark ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {perm}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingItem(null);
                  }}
                  className={`flex-1 px-4 py-2 border rounded-lg transition-all ${
                    isDark
                      ? "bg-slate-800 border-purple-500/30 text-white hover:bg-slate-700"
                      : "bg-white border-purple-300/30 text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  Cancel
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
