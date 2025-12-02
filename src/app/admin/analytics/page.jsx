"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  TrendingUp,
  Users,
  Building2,
  Briefcase,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data for charts
const userGrowthData = [
  { month: "Jan", users: 8500, activeUsers: 7200, newUsers: 1200 },
  { month: "Feb", users: 9200, activeUsers: 7800, newUsers: 1100 },
  { month: "Mar", users: 9800, activeUsers: 8300, newUsers: 1300 },
  { month: "Apr", users: 10500, activeUsers: 8900, newUsers: 1400 },
  { month: "May", users: 11200, activeUsers: 9500, newUsers: 1500 },
  { month: "Jun", users: 12543, activeUsers: 10600, newUsers: 1600 },
];

const companyGrowthData = [
  { month: "Jan", companies: 850, verified: 720 },
  { month: "Feb", companies: 920, verified: 780 },
  { month: "Mar", companies: 980, verified: 830 },
  { month: "Apr", companies: 1050, verified: 890 },
  { month: "May", companies: 1120, verified: 950 },
  { month: "Jun", companies: 1234, verified: 1045 },
];

const jobPostingTrends = [
  { month: "Jan", jobs: 2100, applications: 15400 },
  { month: "Feb", jobs: 2350, applications: 17200 },
  { month: "Mar", jobs: 2600, applications: 19100 },
  { month: "Apr", jobs: 2900, applications: 21300 },
  { month: "May", jobs: 3200, applications: 23600 },
  { month: "Jun", jobs: 3456, applications: 25800 },
];

const categoryDistribution = [
  { name: "Technology", value: 1234, color: "#a855f7" },
  { name: "Marketing", value: 856, color: "#ec4899" },
  { name: "Design", value: 634, color: "#3b82f6" },
  { name: "Sales", value: 432, color: "#22c55e" },
  { name: "Finance", value: 300, color: "#eab308" },
];

const applicationStatusData = [
  { name: "Pending", value: 4500, color: "#eab308" },
  { name: "Reviewed", value: 8200, color: "#3b82f6" },
  { name: "Accepted", value: 3400, color: "#22c55e" },
  { name: "Rejected", value: 2100, color: "#ef4444" },
];

const topCompanies = [
  { name: "TechVision Solutions", jobs: 145, applications: 2340, hires: 45 },
  { name: "Digital Innovations", jobs: 98, applications: 1560, hires: 32 },
  { name: "Creative Minds Agency", jobs: 76, applications: 1230, hires: 28 },
  { name: "Global Enterprises", jobs: 65, applications: 980, hires: 22 },
  { name: "Innovation Labs", jobs: 54, applications: 870, hires: 18 },
];

export default function Analytics() {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";
  const [timeRange, setTimeRange] = useState("6months");

  const stats = [
    {
      label: "Total Revenue",
      value: "$124,500",
      change: "+18.2%",
      trend: "up",
      icon: TrendingUp,
      color: "purple",
    },
    {
      label: "User Growth Rate",
      value: "+12.5%",
      change: "+2.3%",
      trend: "up",
      icon: Users,
      color: "green",
    },
    {
      label: "Company Signups",
      value: "234",
      change: "+8.1%",
      trend: "up",
      icon: Building2,
      color: "pink",
    },
    {
      label: "Job Success Rate",
      value: "68.5%",
      change: "-1.2%",
      trend: "down",
      icon: Briefcase,
      color: "blue",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      purple: "text-purple-500",
      green: "text-green-500",
      pink: "text-pink-500",
      blue: "text-blue-500",
    };
    return colors[color] || colors.purple;
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
            Analytics & Reports
          </h1>
          <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Track platform performance and user engagement
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className={`px-4 py-2 border rounded-lg transition-all outline-none ${
              isDark
                ? "bg-slate-800 border-purple-500/30 text-white"
                : "bg-white border-purple-300/30 text-gray-900"
            }`}
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl border backdrop-blur-xl p-6 ${
              isDark
                ? "bg-slate-900/50 border-purple-500/20"
                : "bg-white/80 border-purple-300/20"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${getColorClasses(stat.color)}`} />
              <div className="flex items-center gap-1">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span
                  className={`text-sm font-medium ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {stat.label}
            </p>
            <p
              className={`text-3xl font-bold mt-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* User Growth Chart */}
      <div
        className={`rounded-xl border backdrop-blur-xl p-6 ${
          isDark
            ? "bg-slate-900/50 border-purple-500/20"
            : "bg-white/80 border-purple-300/20"
        }`}
      >
        <h3
          className={`text-lg font-semibold mb-4 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          User Growth Trends
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={userGrowthData}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#374151" : "#e5e7eb"}
            />
            <XAxis dataKey="month" stroke={isDark ? "#9ca3af" : "#6b7280"} />
            <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1e293b" : "#ffffff",
                border: `1px solid ${isDark ? "#a855f7" : "#d8b4fe"}`,
                borderRadius: "8px",
                color: isDark ? "#ffffff" : "#000000",
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#a855f7"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUsers)"
              name="Total Users"
            />
            <Area
              type="monotone"
              dataKey="activeUsers"
              stroke="#ec4899"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorActive)"
              name="Active Users"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Job Posting & Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className={`rounded-xl border backdrop-blur-xl p-6 ${
            isDark
              ? "bg-slate-900/50 border-purple-500/20"
              : "bg-white/80 border-purple-300/20"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Job Posts & Applications
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={jobPostingTrends}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#374151" : "#e5e7eb"}
              />
              <XAxis dataKey="month" stroke={isDark ? "#9ca3af" : "#6b7280"} />
              <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1e293b" : "#ffffff",
                  border: `1px solid ${isDark ? "#a855f7" : "#d8b4fe"}`,
                  borderRadius: "8px",
                  color: isDark ? "#ffffff" : "#000000",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="jobs"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Job Posts"
              />
              <Line
                type="monotone"
                dataKey="applications"
                stroke="#22c55e"
                strokeWidth={2}
                name="Applications"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div
          className={`rounded-xl border backdrop-blur-xl p-6 ${
            isDark
              ? "bg-slate-900/50 border-purple-500/20"
              : "bg-white/80 border-purple-300/20"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Company Growth
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={companyGrowthData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#374151" : "#e5e7eb"}
              />
              <XAxis dataKey="month" stroke={isDark ? "#9ca3af" : "#6b7280"} />
              <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1e293b" : "#ffffff",
                  border: `1px solid ${isDark ? "#a855f7" : "#d8b4fe"}`,
                  borderRadius: "8px",
                  color: isDark ? "#ffffff" : "#000000",
                }}
              />
              <Legend />
              <Bar dataKey="companies" fill="#a855f7" name="Total Companies" />
              <Bar dataKey="verified" fill="#ec4899" name="Verified" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className={`rounded-xl border backdrop-blur-xl p-6 ${
            isDark
              ? "bg-slate-900/50 border-purple-500/20"
              : "bg-white/80 border-purple-300/20"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Jobs by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1e293b" : "#ffffff",
                  border: `1px solid ${isDark ? "#a855f7" : "#d8b4fe"}`,
                  borderRadius: "8px",
                  color: isDark ? "#ffffff" : "#000000",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div
          className={`rounded-xl border backdrop-blur-xl p-6 ${
            isDark
              ? "bg-slate-900/50 border-purple-500/20"
              : "bg-white/80 border-purple-300/20"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Application Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={applicationStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {applicationStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1e293b" : "#ffffff",
                  border: `1px solid ${isDark ? "#a855f7" : "#d8b4fe"}`,
                  borderRadius: "8px",
                  color: isDark ? "#ffffff" : "#000000",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Companies Table */}
      <div
        className={`rounded-xl border backdrop-blur-xl p-6 ${
          isDark
            ? "bg-slate-900/50 border-purple-500/20"
            : "bg-white/80 border-purple-300/20"
        }`}
      >
        <h3
          className={`text-lg font-semibold mb-4 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Top Performing Companies
        </h3>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full">
            <thead>
              <tr
                className={`border-b ${
                  isDark ? "border-purple-500/20" : "border-purple-300/20"
                }`}
              >
                <th
                  className={`text-left py-3 px-4 text-sm font-semibold ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Company
                </th>
                <th
                  className={`text-left py-3 px-4 text-sm font-semibold ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Job Posts
                </th>
                <th
                  className={`text-left py-3 px-4 text-sm font-semibold ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Applications
                </th>
                <th
                  className={`text-left py-3 px-4 text-sm font-semibold ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Hires
                </th>
                <th
                  className={`text-left py-3 px-4 text-sm font-semibold ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Success Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {topCompanies.map((company, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    isDark ? "border-purple-500/10" : "border-purple-300/10"
                  }`}
                >
                  <td
                    className={`py-4 px-4 font-medium ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {company.name}
                  </td>
                  <td
                    className={`py-4 px-4 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {company.jobs}
                  </td>
                  <td
                    className={`py-4 px-4 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {company.applications}
                  </td>
                  <td
                    className={`py-4 px-4 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {company.hires}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        isDark
                          ? "bg-green-500/20 text-green-400"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {((company.hires / company.applications) * 100).toFixed(
                        1
                      )}
                      %
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
