"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Building,
  Eye,
  Users,
  Target,
  Star,
  Bookmark,
  Share2,
  ArrowRight,
  Briefcase,
  Award,
  Globe,
  Cpu,
  Code,
  CheckCircle,
  Heart,
  Send,
  Play,
  ChevronDown,
  ExternalLink,
  Calendar,
  Shield,
  Zap,
  Sparkles,
  TrendingUp,
  MessageCircle,
  FileText,
  GitBranch,
  Linkedin,
} from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

export default function JobDetailsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSaved, setIsSaved] = useState(false);
  const theme = useSelector((state) => state.theme.mode);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id: jobId } = useParams();
  const isDark = theme === 'dark';

  const getJobDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/jobs/${jobId}`);
      const data = await response.json();
      if (data.success) {
        setJob(data.data || null);
      }
    } catch (error) {
      console.error("Error fetching job details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) {
      getJobDetails();
    }
  }, [jobId]);

  const similarJobs = [
    {
      id: 2,
      title: "Frontend Engineer",
      company: "DigitalDreams",
      location: "Remote",
      salary: "$110K - $150K",
      match: 88,
      urgent: false,
    },
    {
      id: 3,
      title: "React Native Developer",
      company: "MobileFirst",
      location: "New York, NY",
      salary: "$100K - $140K",
      match: 82,
      urgent: true,
    },
    {
      id: 4,
      title: "Full Stack Developer",
      company: "StartUp Ventures",
      location: "Remote",
      salary: "$90K - $130K",
      match: 78,
      urgent: false,
    },
  ];

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: <FileText className="w-4 h-4" />,
    },
    { id: "company", label: "Company", icon: <Building className="w-4 h-4" /> },
    { id: "benefits", label: "Benefits", icon: <Award className="w-4 h-4" /> },
    { id: "process", label: "Process", icon: <Target className="w-4 h-4" /> },
  ];

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Job not found</h2>
          <Link href="/jobsearch" className="text-purple-500 hover:text-purple-400">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white'
          : 'bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 text-gray-900'
      }`}>
        {/* Background Pattern */}
        <div className={`fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none ${
          isDark ? '' : 'invert'
        }`} />

        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pt-16 sm:pt-20">
          {/* Header Navigation */}
          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-4 mb-6 sm:mb-8">
            <Link
              href="/jobsearch"
              className={`flex items-center gap-2 transition-colors group self-start ${
                isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm sm:text-base">Back to Jobs</span>
            </Link>

            <div className="flex items-center gap-2 sm:gap-3 self-start xs:self-auto">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl font-medium transition-all border text-sm sm:text-base ${
                  isSaved
                    ? "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
                    : `${
                        isDark
                          ? "text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 border-slate-700"
                          : "text-gray-600 hover:text-yellow-500 hover:bg-yellow-100 border-gray-300"
                      }`
                }`}
              >
                <Bookmark
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${isSaved ? "fill-yellow-400" : ""}`}
                />
                <span className="hidden xs:inline">{isSaved ? "Saved" : "Save"}</span>
              </button>
              <button className={`flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl font-medium transition-all border text-sm sm:text-base ${
                isDark
                  ? "text-gray-400 hover:text-white hover:bg-slate-800 border-slate-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-gray-300"
              }`}>
                <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Share</span>
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Job Header */}
              <div className={`backdrop-blur-xl border rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 ${
                isDark
                  ? 'bg-slate-900/50 border-purple-500/20'
                  : 'bg-white/80 border-purple-300/30'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl md:text-4xl border flex-shrink-0 ${
                      isDark ? 'border-purple-500/20' : 'border-purple-300/20'
                    }`}>
                      {job.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col xs:flex-row xs:items-start gap-1 xs:gap-2 mb-2 flex-wrap">
                        <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold break-words ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {job.title}
                        </h1>
                        <div className="flex gap-1 flex-wrap">
                          {job.featured && (
                            <div className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 rounded text-xs sm:text-sm border border-yellow-500/30">
                              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400" />
                              <span className="hidden xs:inline">Featured</span>
                            </div>
                          )}
                          {job.urgent && (
                            <div className="px-2 py-1 sm:px-3 sm:py-1 bg-red-500/20 text-red-400 rounded text-xs sm:text-sm border border-red-500/30 animate-pulse">
                              <span className="hidden xs:inline">🔥 </span>
                              Urgent
                            </div>
                          )}
                        </div>
                      </div>

                      <div className={`flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <div className="flex items-center gap-1 sm:gap-2 font-medium text-sm sm:text-base">
                          <Building className="w-3 h-3 sm:w-4 sm:h-4" />
                          {job.company}
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                          {job.location}
                          {job.remote && (
                            <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-green-500/20 text-green-400 rounded text-xs border border-green-500/30">
                              Remote OK
                            </span>
                          )}
                        </div>
                      </div>

                      <div className={`flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 sm:gap-4 text-xs sm:text-sm flex-wrap ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" />
                          {job.type}
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                          {job.experience}
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          {job.posted}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Match Score */}
                  <div className="self-center sm:self-auto">
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" />
                      <div className="relative flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-3 bg-green-500/10 border border-green-500/30 rounded-lg sm:rounded-xl">
                        <Target className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-400" />
                        <span className="text-green-400 font-bold text-lg sm:text-xl md:text-2xl">
                          {job.match}%
                        </span>
                      </div>
                    </div>
                    <div className={`text-xs sm:text-sm mt-1 text-center ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      AI Match Score
                    </div>
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                  {job?.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm border font-medium transition-all ${
                        isDark
                          ? 'bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-500/40'
                          : 'bg-purple-100 text-purple-700 border-purple-300/20 hover:bg-purple-200 hover:border-purple-400/40'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className={`flex items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm border-t pt-3 sm:pt-4 flex-wrap ${
                  isDark 
                    ? 'text-gray-400 border-purple-500/20' 
                    : 'text-gray-600 border-purple-300/20'
                }`}>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                    {job.applicants} applicants
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    {job.views} views
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 text-green-400">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">High application rate</span>
                    <span className="xs:hidden">Popular</span>
                  </div>
                </div>
              </div>

              {/* Tabs Navigation */}
              <div className={`flex items-center gap-1 mb-4 sm:mb-6 backdrop-blur-xl border rounded-xl sm:rounded-2xl p-1 sm:p-2 overflow-x-auto ${
                isDark
                  ? 'bg-slate-900/50 border-purple-500/20'
                  : 'bg-white/80 border-purple-300/30'
              }`}>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all flex-1 justify-center min-w-max text-xs sm:text-sm ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30"
                        : `${
                            isDark
                              ? "text-gray-400 hover:text-white hover:bg-white/5"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          }`
                    }`}
                  >
                    <span className="hidden xs:inline">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className={`backdrop-blur-xl border rounded-xl sm:rounded-2xl p-4 sm:p-6 ${
                isDark
                  ? 'bg-slate-900/50 border-purple-500/20'
                  : 'bg-white/80 border-purple-300/30'
              }`}>
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-6 sm:space-y-8">
                    <div>
                      <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        Job Description
                      </h2>
                      <p className={`leading-relaxed text-sm sm:text-base ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {job.description}
                      </p>
                    </div>

                    <div>
                      <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                        Key Responsibilities
                      </h3>
                      <ul className="space-y-2 sm:space-y-3">
                        {job?.responsibilities?.map((item, index) => (
                          <li
                            key={index}
                            className={`flex items-start gap-2 sm:gap-3 text-sm sm:text-base ${
                              isDark ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mt-2 flex-shrink-0 ${
                              isDark ? 'bg-purple-400' : 'bg-purple-500'
                            }`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                        Requirements
                      </h3>
                      <ul className="space-y-2 sm:space-y-3">
                        {job?.requirements?.map((item, index) => (
                          <li
                            key={index}
                            className={`flex items-start gap-2 sm:gap-3 text-sm sm:text-base ${
                              isDark ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mt-2 flex-shrink-0 ${
                              isDark ? 'bg-blue-400' : 'bg-blue-500'
                            }`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Company Tab */}
                {activeTab === "company" && (
                  <div className="space-y-6 sm:space-y-8">
                    <div>
                      <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        About {job.companyInfo.name}
                      </h2>
                      <p className={`leading-relaxed text-sm sm:text-base ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {job.companyInfo.description}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-3 sm:space-y-4">
                        <h3 className={`text-base sm:text-lg font-semibold ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          Company Details
                        </h3>
                        <div className="space-y-2 sm:space-y-3">
                          <div className={`flex justify-between py-2 border-b ${
                            isDark ? 'border-purple-500/20' : 'border-gray-200'
                          }`}>
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Company Size</span>
                            <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {job.companyInfo.size}
                            </span>
                          </div>
                          <div className={`flex justify-between py-2 border-b ${
                            isDark ? 'border-purple-500/20' : 'border-gray-200'
                          }`}>
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Founded</span>
                            <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {job.companyInfo.founded}
                            </span>
                          </div>
                          <div className={`flex justify-between py-2 border-b ${
                            isDark ? 'border-purple-500/20' : 'border-gray-200'
                          }`}>
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Industry</span>
                            <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {job.companyInfo.industry}
                            </span>
                          </div>
                          <div className={`flex justify-between py-2 border-b ${
                            isDark ? 'border-purple-500/20' : 'border-gray-200'
                          }`}>
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Culture</span>
                            <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {job.companyInfo.culture}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 sm:space-y-4">
                        <h3 className={`text-base sm:text-lg font-semibold ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          Company Links
                        </h3>
                        <div className="space-y-2 sm:space-y-3">
                          <a
                            href={job.companyInfo.website}
                            className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl border transition-all group ${
                              isDark
                                ? 'bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40'
                                : 'bg-gray-50 border-purple-300/20 hover:border-purple-400/40'
                            }`}
                          >
                            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                            <span className={`group-hover:text-purple-300 transition-colors text-sm sm:text-base ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              Company Website
                            </span>
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 ml-auto" />
                          </a>
                          <button className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl border transition-all group w-full ${
                            isDark
                              ? 'bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40'
                              : 'bg-gray-50 border-purple-300/20 hover:border-purple-400/40'
                          }`}>
                            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                            <span className={`group-hover:text-blue-300 transition-colors text-sm sm:text-base ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              LinkedIn Page
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Benefits Tab */}
                {activeTab === "benefits" && (
                  <div className="space-y-4 sm:space-y-6">
                    <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      Compensation & Benefits
                    </h2>

                    <div className="grid md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                      {job?.benefits?.map((benefit, index) => (
                        <div
                          key={index}
                          className={`flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl border ${
                            isDark
                              ? 'bg-slate-800/50 border-purple-500/20'
                              : 'bg-gray-50 border-purple-300/20'
                          }`}
                        >
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className={`text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <div className={`p-4 sm:p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg sm:rounded-xl border ${
                      isDark ? 'border-purple-500/20' : 'border-purple-300/20'
                    }`}>
                      <h3 className={`text-base sm:text-lg font-semibold mb-2 flex items-center gap-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                        Why You'll Love Working Here
                      </h3>
                      <p className={`text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Join a team that values innovation, collaboration, and
                        work-life balance. We're committed to your professional
                        growth and provide ample opportunities for learning and
                        advancement.
                      </p>
                    </div>
                  </div>
                )}

                {/* Process Tab */}
                {activeTab === "process" && (
                  <div className="space-y-6 sm:space-y-8">
                    <div>
                      <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        Hiring Process
                      </h2>
                      <div className="space-y-3 sm:space-y-4">
                        {job?.hiringProcess?.map((step, index) => (
                          <div key={index} className="flex items-start gap-3 sm:gap-4">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className={`font-medium mb-1 text-sm sm:text-base ${
                                isDark ? 'text-white' : 'text-gray-900'
                              }`}>
                                {step}
                              </div>
                              <div className={`text-xs sm:text-sm ${
                                isDark ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                Typically takes{" "}
                                {index === 0
                                  ? "1-2"
                                  : index === 1
                                    ? "3-5"
                                    : "5-7"}{" "}
                                business days
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`p-4 sm:p-6 rounded-lg sm:rounded-xl border ${
                      isDark
                        ? 'bg-slate-800/50 border-purple-500/20'
                        : 'bg-gray-50 border-purple-300/20'
                    }`}>
                      <h3 className={`text-base sm:text-lg font-semibold mb-2 sm:mb-3 flex items-center gap-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                        What to Expect
                      </h3>
                      <ul className={`space-y-1 sm:space-y-2 text-sm sm:text-base ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <li>• Transparent communication throughout the process</li>
                        <li>• Feedback provided after each stage</li>
                        <li>• Flexible scheduling for interviews</li>
                        <li>• Quick decision-making timeline</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4 sm:space-y-6">
              {/* Apply Card */}
              <div className={`backdrop-blur-xl border rounded-xl sm:rounded-2xl p-4 sm:p-6 sticky top-20 sm:top-24 ${
                isDark
                  ? 'bg-slate-900/50 border-purple-500/20'
                  : 'bg-white/80 border-purple-300/30'
              }`}>
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl mx-auto mb-3 sm:mb-4">
                    🚀
                  </div>
                  <h3 className={`text-lg sm:text-xl font-bold mb-1 sm:mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Ready to Apply?
                  </h3>
                  <p className={`text-xs sm:text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Your profile matches {job.match}% of requirements
                  </p>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <Link
                    href={`/jobsearch/apply/${jobId}`}
                    className="w-full py-2.5 sm:py-3 md:py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-1 sm:gap-2 hover:scale-105 text-sm sm:text-base"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    Quick Apply
                  </Link>
                  <Link 
                     href={`/chat`}
                  className={`w-full py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl font-semibold transition-all border flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base ${
                    isDark
                      ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'
                      : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-100'
                  }`}>
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    Contact Recruiter
                  </Link>
                </div>

                <div className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg sm:rounded-xl border ${
                  isDark
                    ? 'bg-green-500/10 border-green-500/20'
                    : 'bg-green-50 border-green-300/20'
                }`}>
                  <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                    <span className="text-green-400 font-semibold text-xs sm:text-sm">
                      Good Match
                    </span>
                  </div>
                  <p className={`text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Based on your skills and experience, you're a strong candidate
                    for this position.
                  </p>
                </div>
              </div>

              {/* Similar Jobs */}
              <div className={`backdrop-blur-xl border rounded-xl sm:rounded-2xl p-4 sm:p-6 ${
                isDark
                  ? 'bg-slate-900/50 border-purple-500/20'
                  : 'bg-white/80 border-purple-300/30'
              }`}>
                <h3 className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Similar Jobs
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {similarJobs.map((similarJob) => (
                    <div
                      key={similarJob.id}
                      className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all cursor-pointer ${
                        isDark
                          ? 'bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30'
                          : 'bg-gray-50 border-purple-300/10 hover:border-purple-400/30'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1 sm:mb-2">
                        <div className="min-w-0">
                          <div className={`font-semibold text-xs sm:text-sm mb-1 truncate ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {similarJob.title}
                          </div>
                          <div className={`text-xs ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {similarJob.company}
                          </div>
                        </div>
                        {similarJob.urgent && (
                          <div className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-red-500/20 text-red-400 rounded text-xs border border-red-500/30 flex-shrink-0 ml-2">
                            Urgent
                          </div>
                        )}
                      </div>
                      <div className={`flex items-center justify-between text-xs ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <span className="truncate">{similarJob.location}</span>
                        <span className="text-green-400 font-semibold flex-shrink-0 ml-2">
                          {similarJob.match}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className={`w-full mt-3 sm:mt-4 py-2 sm:py-2.5 border rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isDark
                    ? 'bg-slate-800/50 border-purple-500/20 text-white hover:bg-slate-800 hover:border-purple-500/40'
                    : 'bg-gray-50 border-purple-300/20 text-gray-900 hover:bg-gray-100 hover:border-purple-400/40'
                }`}>
                  View All Similar Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}