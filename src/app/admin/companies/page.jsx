"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Download,
  CheckCircle,
  XCircle,
  Eye,
  Flag,
  Building2,
  MapPin,
  Users,
  Briefcase,
  FileText,
  Globe,
  Mail,
  Phone,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import PageHeader from "@/components/admin/PageHeader";
import SearchFilterBar from "@/components/admin/SearchFilterBar";
import AdminTable from "@/components/admin/AdminTable";
import DetailModal from "@/components/admin/DetailModal";

// Mock company data
const mockCompanies = [
  {
    id: 1,
    name: "TechVision Solutions",
    logo: "TV",
    industry: "Technology",
    location: "San Francisco, USA",
    website: "www.techvision.com",
    email: "contact@techvision.com",
    phone: "+1 234 567 8900",
    registrationDate: "2024-01-15",
    status: "approved",
    employees: "500-1000",
    jobPosts: 45,
    verified: true,
    description:
      "Leading software development company specializing in AI and cloud solutions.",
  },
  {
    id: 2,
    name: "Digital Innovations Ltd",
    logo: "DI",
    industry: "Marketing",
    location: "New York, USA",
    website: "www.digitalinnovations.com",
    email: "info@digitalinnovations.com",
    phone: "+1 234 567 8901",
    registrationDate: "2024-02-20",
    status: "pending",
    employees: "100-500",
    jobPosts: 12,
    verified: false,
    description:
      "Digital marketing agency helping brands grow their online presence.",
  },
  {
    id: 3,
    name: "Creative Minds Agency",
    logo: "CM",
    industry: "Design",
    location: "Los Angeles, USA",
    website: "www.creativeminds.com",
    email: "hello@creativeminds.com",
    phone: "+1 234 567 8902",
    registrationDate: "2024-03-10",
    status: "approved",
    employees: "50-100",
    jobPosts: 23,
    verified: true,
    description:
      "Award-winning design agency creating stunning visual experiences.",
  },
  {
    id: 4,
    name: "Suspicious Corp",
    logo: "SC",
    industry: "Unknown",
    location: "Unknown",
    website: "www.suspicious.com",
    email: "fake@suspicious.com",
    phone: "+1 000 000 0000",
    registrationDate: "2024-11-28",
    status: "flagged",
    employees: "1-10",
    jobPosts: 0,
    verified: false,
    description: "Potentially fraudulent company.",
  },
  {
    id: 5,
    name: "Global Enterprises Inc",
    logo: "GE",
    industry: "Finance",
    location: "Chicago, USA",
    website: "www.globalenterprises.com",
    email: "contact@globalenterprises.com",
    phone: "+1 234 567 8904",
    registrationDate: "2024-04-05",
    status: "rejected",
    employees: "1000+",
    jobPosts: 0,
    verified: false,
    description: "International financial services company.",
  },
];

const verificationDocuments = [
  {
    id: 1,
    name: "Business License",
    type: "PDF",
    size: "2.4 MB",
    uploadDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Tax Certificate",
    type: "PDF",
    size: "1.8 MB",
    uploadDate: "2024-01-15",
  },
  {
    id: 3,
    name: "Company Registration",
    type: "PDF",
    size: "3.2 MB",
    uploadDate: "2024-01-15",
  },
];

export default function CompanyManagement() {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showCompanyModal, setShowCompanyModal] = useState(false);

  const filteredCompanies = mockCompanies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || company.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
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
      case "flagged":
        return isDark
          ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
          : "bg-orange-100 text-orange-700 border-orange-300";
      default:
        return isDark
          ? "bg-gray-500/20 text-gray-400 border-gray-500/30"
          : "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const handleViewCompany = (company) => {
    setSelectedCompany(company);
    setShowCompanyModal(true);
  };

  const columns = [
    {
      header: "Company",
      accessor: "name",
      render: (company) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
            {company.logo}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p
                className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}
              >
                {company.name}
              </p>
              {company.verified && (
                <CheckCircle className="w-4 h-4 text-blue-500" />
              )}
            </div>
            <p
              className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              {company.employees} employees
            </p>
          </div>
        </div>
      ),
    },
    { header: "Industry", accessor: "industry" },
    { header: "Location", accessor: "location" },
    {
      header: "Job Posts",
      accessor: "jobPosts",
      render: (company) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            isDark
              ? "bg-blue-500/20 text-blue-400"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {company.jobPosts} jobs
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (company) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
            company.status
          )}`}
        >
          {company.status}
        </span>
      ),
    },
  ];

  const actions = (company) => (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleViewCompany(company);
        }}
        className={`p-2 rounded-lg transition-all ${
          isDark
            ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
            : "bg-purple-100 text-purple-600 hover:bg-purple-200"
        }`}
      >
        <Eye className="w-4 h-4" />
      </button>
      {company.status === "pending" && (
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
            ? "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
            : "bg-orange-100 text-orange-600 hover:bg-orange-200"
        }`}
      >
        <Flag className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Company Management"
        description="Manage and verify company registrations"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all">
            <Download className="w-4 h-4" />
            Export Companies
          </button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Companies",
            value: "1,234",
            icon: Building2,
            color: "purple",
          },
          {
            label: "Approved",
            value: "1,089",
            icon: CheckCircle,
            color: "green",
          },
          {
            label: "Pending Approval",
            value: "123",
            icon: AlertTriangle,
            color: "yellow",
          },
          { label: "Flagged", value: "22", icon: Flag, color: "red" },
        ].map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Filters and Search */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search companies by name or industry..."
        filters={[
          { value: "all", label: "All Status" },
          { value: "approved", label: "Approved" },
          { value: "pending", label: "Pending" },
          { value: "rejected", label: "Rejected" },
          { value: "flagged", label: "Flagged" },
        ]}
        activeFilter={statusFilter}
        onFilterChange={setStatusFilter}
      />

      {/* Companies Table */}
      <AdminTable
        columns={columns}
        data={filteredCompanies}
        actions={actions}
        onRowClick={handleViewCompany}
      />

      {/* Company Detail Modal */}
      <DetailModal
        isOpen={showCompanyModal}
        onClose={() => setShowCompanyModal(false)}
        title="Company Profile"
        maxWidth="max-w-4xl"
        footer={
          <div className="flex flex-wrap gap-3">
            {selectedCompany?.status === "pending" ? (
              <>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 transition-all">
                  <CheckCircle className="w-4 h-4" />
                  Approve Company
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-all">
                  <XCircle className="w-4 h-4" />
                  Reject Application
                </button>
              </>
            ) : (
              <>
                <button className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 text-orange-500 rounded-lg hover:bg-orange-500/30 transition-all">
                  <Flag className="w-4 h-4" />
                  Flag Company
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-all">
                  <XCircle className="w-4 h-4" />
                  Suspend Account
                </button>
              </>
            )}
          </div>
        }
      >
        {selectedCompany && (
          <div className="space-y-6">
            {/* Company Header */}
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold">
                {selectedCompany.logo}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3
                    className={`text-2xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {selectedCompany.name}
                  </h3>
                  {selectedCompany.verified && (
                    <CheckCircle className="w-6 h-6 text-blue-500" />
                  )}
                </div>
                <p
                  className={`text-sm mt-1 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {selectedCompany.industry} • {selectedCompany.employees}{" "}
                  employees
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                      selectedCompany.status
                    )}`}
                  >
                    {selectedCompany.status}
                  </span>
                  <span
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Registered: {selectedCompany.registrationDate}
                  </span>
                </div>
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
                About
              </h4>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {selectedCompany.description}
              </p>
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
                  <Globe className="w-5 h-5 text-purple-500" />
                  <div>
                    <p
                      className={`text-xs ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Website
                    </p>
                    <a
                      href={`https://${selectedCompany.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-purple-500 hover:text-purple-600 flex items-center gap-1"
                    >
                      {selectedCompany.website}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
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
                      {selectedCompany.email}
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
                      {selectedCompany.phone}
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
                      {selectedCompany.location}
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
                      {selectedCompany.jobPosts}
                    </p>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Job Posts
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
                  <Users className="w-8 h-8 text-pink-500" />
                  <div>
                    <p
                      className={`text-2xl font-bold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {selectedCompany.employees}
                    </p>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Employees
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
                  {selectedCompany.verified ? (
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
                      {selectedCompany.verified ? "Verified" : "Not Verified"}
                    </p>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Verification Status
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Documents */}
            <div>
              <h4
                className={`text-lg font-semibold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Verification Documents
              </h4>
              <div className="space-y-3">
                {verificationDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      isDark
                        ? "bg-slate-800/50 border-purple-500/10"
                        : "bg-purple-50/50 border-purple-300/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-purple-500" />
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {doc.name}
                        </p>
                        <p
                          className={`text-xs ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {doc.type} • {doc.size}
                        </p>
                      </div>
                    </div>
                    <button className="text-sm font-medium text-purple-500 hover:text-purple-600">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </DetailModal>
    </div>
  );
}
