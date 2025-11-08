"use client";
import React, { useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Building,
  Zap,
  Sparkles,
  Target,
  Users,
  Star,
  Filter,
  Bookmark,
  Share2,
  ArrowRight,
  Eye,
  Rocket,
  TrendingUp,
  Award,
  Globe,
  Cpu,
  Code,
  Heart,
  Send,
  CheckCircle,
  Play,
  Crown,
  Search,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
export default function SkillBridgeJobs() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSaveJob = (jobId) => {
    setSavedJobs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const filters = [
    {
      id: "all",
      name: "All Jobs",
      icon: <Globe className="w-4 h-4" />,
      count: 2143,
    },
    {
      id: "recommended",
      name: "For You",
      icon: <Sparkles className="w-4 h-4" />,
      count: 48,
    },
    {
      id: "remote",
      name: "Remote",
      icon: <Cpu className="w-4 h-4" />,
      count: 892,
    },
    {
      id: "intern",
      name: "Internships",
      icon: <Rocket className="w-4 h-4" />,
      count: 234,
    },
    {
      id: "featured",
      name: "Featured",
      icon: <Star className="w-4 h-4" />,
      count: 67,
    },
  ];

  const jobs = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "TechInnovate Inc.",
      logo: "🚀",
      location: "San Francisco, CA",
      remote: true,
      type: "Full-time",
      experience: "5+ years",
      salary: "$120K - $160K",
      posted: "2h ago",
      skills: ["React", "TypeScript", "Node.js", "AWS"],
      match: 95,
      featured: true,
      urgent: true,
      category: "tech",
      applicants: 12,
      description:
        "Join our innovative team building next-gen web applications.",
    },
    {
      id: 2,
      title: "Frontend Engineering Intern",
      company: "DigitalDreams",
      logo: "🎨",
      location: "New York, NY",
      remote: false,
      type: "Internship",
      experience: "0-1 years",
      salary: "$25 - $35/hr",
      posted: "1d ago",
      skills: ["JavaScript", "React", "CSS", "UI/UX"],
      match: 88,
      featured: false,
      urgent: false,
      category: "intern",
      applicants: 45,
      description:
        "Perfect opportunity for students to gain real-world experience.",
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "StartUp Ventures",
      logo: "💼",
      location: "Remote",
      remote: true,
      type: "Full-time",
      experience: "3+ years",
      salary: "$90K - $130K",
      posted: "3d ago",
      skills: ["React", "Python", "MongoDB", "Docker"],
      match: 92,
      featured: true,
      urgent: false,
      category: "remote",
      applicants: 28,
      description:
        "Build scalable applications in a fast-paced startup environment.",
    },
    {
      id: 4,
      title: "Junior DevOps Engineer",
      company: "CloudSystems",
      logo: "☁️",
      location: "Austin, TX",
      remote: false,
      type: "Full-time",
      experience: "2+ years",
      salary: "$80K - $110K",
      posted: "1w ago",
      skills: ["AWS", "Docker", "Kubernetes", "Linux"],
      match: 78,
      featured: false,
      urgent: false,
      category: "tech",
      applicants: 67,
      description: "Help us manage and scale our cloud infrastructure.",
    },
    {
      id: 5,
      title: "AI/ML Research Intern",
      company: "NeuralLabs",
      logo: "🧠",
      location: "Boston, MA",
      remote: false,
      type: "Internship",
      experience: "0-1 years",
      salary: "$30 - $45/hr",
      posted: "2d ago",
      skills: ["Python", "TensorFlow", "PyTorch", "Research"],
      match: 85,
      featured: true,
      urgent: true,
      category: "intern",
      applicants: 89,
      description: "Work on cutting-edge AI research projects with our team.",
    },
    {
      id: 6,
      title: "Mobile App Developer",
      company: "AppCraft Studios",
      logo: "📱",
      location: "Remote",
      remote: true,
      type: "Contract",
      experience: "3+ years",
      salary: "$50 - $70/hr",
      posted: "5h ago",
      skills: ["React Native", "iOS", "Android", "Firebase"],
      match: 90,
      featured: false,
      urgent: false,
      category: "remote",
      applicants: 15,
      description: "Create beautiful mobile experiences for millions of users.",
    },
  ];

  const filteredJobs = jobs.filter(
    (job) =>
      activeFilter === "all" ||
      job.category === activeFilter ||
      (activeFilter === "featured" && job.featured) ||
      (activeFilter === "remote" && job.remote) ||
      (activeFilter === "recommended" && job.match >= 85)
  );

  const stats = [
    {
      value: "2,143",
      label: "Active Jobs",
      icon: <Briefcase className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      value: "500+",
      label: "Companies",
      icon: <Building className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      value: "85%",
      label: "Success Rate",
      icon: <Target className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      value: "48h",
      label: "Avg Response",
      icon: <Clock className="w-5 h-5" />,
      color: "from-orange-500 to-red-500",
    },
  ];

  const featuredCompanies = [
    { name: "Google", logo: "🔍", jobs: 24, hiring: true },
    { name: "Microsoft", logo: "⭕", jobs: 18, hiring: true },
    { name: "Amazon", logo: "📦", jobs: 32, hiring: true },
    { name: "Netflix", logo: "🎬", jobs: 8, hiring: false },
    { name: "Spotify", logo: "🎵", jobs: 12, hiring: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 pt-20 pb-12">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none" />

      {/* Floating orbs */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="fixed bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              AI-Powered Job Matching
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
            Find Your
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              Dream Job
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Discover opportunities that match your skills, powered by AI
          </p>

          {/* Enhanced Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-900/80 border border-purple-500/30 rounded-xl text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none backdrop-blur-sm"
                />
              </div>
              <button className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 whitespace-nowrap">
                <Search className="w-5 h-5" />
                Search
              </button>
              <button className="px-4 py-4 bg-slate-800/80 border border-purple-500/30 rounded-xl text-white hover:bg-slate-700 transition-all backdrop-blur-sm">
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats Grid - Enhanced */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative overflow-hidden p-6 bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl hover:border-purple-500/40 transition-all hover:scale-105"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                />
                <div className="relative">
                  <div className="flex justify-center mb-3">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center opacity-80`}
                    >
                      <div className="text-white">{stat.icon}</div>
                    </div>
                  </div>
                  <div
                    className={`text-3xl font-bold mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Pills - Enhanced */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-3 pb-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                  activeFilter === filter.id
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                    : "bg-slate-900/50 text-gray-400 hover:text-white hover:bg-slate-800 border border-purple-500/20"
                }`}
              >
                {filter.icon}
                {filter.name}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    activeFilter === filter.id
                      ? "bg-white/20"
                      : "bg-purple-500/20"
                  }`}
                >
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Enhanced */}
          <div className="lg:col-span-1 space-y-6">
            {/* AI Match Profile - Enhanced */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 hover:border-purple-500/50 transition-all">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Your AI Match
              </h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg
                      className="w-24 h-24 transform -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#1e293b"
                        strokeWidth="6"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="url(#matchGradient)"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray="251.2"
                        strokeDashoffset="50.24"
                        strokeLinecap="round"
                        className="animate-pulse"
                      />
                      <defs>
                        <linearGradient
                          id="matchGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        80%
                      </span>
                    </div>
                  </div>
                  <div className="text-white font-semibold mb-1">
                    Career Ready
                  </div>
                  <div className="text-gray-400 text-sm">
                    Based on your profile
                  </div>
                </div>
                <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2">
                  <Target className="w-4 h-4" />
                  Boost Score
                </button>
              </div>
            </div>

            {/* Featured Companies - Enhanced */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 hover:border-purple-500/50 transition-all">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                Top Hiring
              </h3>
              <div className="space-y-3">
                {featuredCompanies.map((company, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-purple-500/10 hover:border-purple-500/30 hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl group-hover:scale-110 transition-transform">
                        {company.logo}
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">
                          {company.name}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {company.jobs} open roles
                        </div>
                      </div>
                    </div>
                    {company.hiring && (
                      <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30 font-medium">
                        Hiring
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2.5 bg-slate-800/50 border border-purple-500/20 text-white rounded-xl text-sm font-medium hover:bg-slate-800 hover:border-purple-500/40 transition-all">
                View All Companies
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full py-2.5 bg-slate-800/50 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
                  <Bookmark className="w-4 h-4" />
                  Saved Jobs ({savedJobs.size})
                </button>
                <button className="w-full py-2.5 bg-slate-800/50 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Applications
                </button>
              </div>
            </div>
          </div>

          {/* Jobs Grid - Enhanced */}
          <div className="lg:col-span-3">
            {/* Jobs Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {filteredJobs.length}{" "}
                  {activeFilter === "all"
                    ? "Opportunities"
                    : filters.find((f) => f.id === activeFilter)?.name}
                </h2>
                <p className="text-gray-400 text-sm">
                  Sorted by best match • Updated 5 min ago
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 border border-purple-500/30 text-white rounded-xl text-sm font-medium hover:bg-slate-700 transition-all">
                Sort by
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Jobs List - Enhanced */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="group relative bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        {/* Company Logo */}
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center text-3xl border border-purple-500/20 group-hover:scale-110 transition-transform">
                          {job.logo}
                        </div>

                        <div className="flex-1">
                          {/* Title & Badges */}
                          <div className="flex items-start gap-2 mb-2 flex-wrap">
                            <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                              {job.title}
                            </h3>
                            {job.featured && (
                              <div className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 rounded-lg text-xs border border-yellow-500/30 font-medium">
                                <Star className="w-3 h-3 fill-yellow-400" />
                                Featured
                              </div>
                            )}
                            {job.urgent && (
                              <div className="px-2.5 py-1 bg-red-500/20 text-red-400 rounded-lg text-xs border border-red-500/30 font-medium animate-pulse">
                                🔥 Urgent
                              </div>
                            )}
                          </div>

                          {/* Company & Location */}
                          <div className="flex items-center gap-4 text-gray-400 text-sm mb-3 flex-wrap">
                            <div className="flex items-center gap-1.5 font-medium">
                              <Building className="w-4 h-4" />
                              {job.company}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                              {job.remote && (
                                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs border border-green-500/30">
                                  Remote
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4" />
                              {job.posted}
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-400 text-sm mb-4">
                            {job.description}
                          </p>

                          {/* Skills Tags */}
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-3 py-1.5 bg-purple-500/10 text-purple-300 rounded-lg text-sm border border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-500/40 transition-all font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Match Score & Actions */}
                      <div className="flex flex-col items-end gap-3 ml-4">
                        <div className="text-right">
                          <div className="relative">
                            <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" />
                            <div className="relative flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/30 rounded-xl">
                              <Target className="w-5 h-5 text-green-400" />
                              <span className="text-green-400 font-bold text-xl">
                                {job.match}%
                              </span>
                            </div>
                          </div>
                          <div className="text-gray-400 text-xs mt-1">
                            Match Score
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleSaveJob(job.id)}
                            className={`p-2.5 rounded-xl transition-all ${
                              savedJobs.has(job.id)
                                ? "text-yellow-400 bg-yellow-500/20 border border-yellow-500/30 scale-110"
                                : "text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 border border-slate-700 hover:border-yellow-500/30"
                            }`}
                          >
                            <Bookmark
                              className={`w-4 h-4 ${savedJobs.has(job.id) ? "fill-yellow-400" : ""}`}
                            />
                          </button>
                          <button className="p-2.5 text-gray-400 hover:text-white hover:bg-slate-700 rounded-xl transition-all border border-slate-700 hover:border-purple-500/30">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex items-center justify-between pt-4 border-t border-purple-500/20">
                      <div className="flex items-center gap-6 text-sm flex-wrap">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Briefcase className="w-4 h-4" />
                          <span className="font-medium">{job.type}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Award className="w-4 h-4" />
                          <span className="font-medium">{job.experience}</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-400 font-semibold">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Users className="w-4 h-4" />
                          {job.applicants} applicants
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Link
                          href={`/jobsearch/apply`}
                          className="px-4 py-2.5 bg-slate-800/80 border border-slate-700 text-white rounded-xl font-semibold hover:bg-slate-700 hover:border-purple-500/30 transition-all flex items-center gap-2 text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          Details
                        </Link>
                        <Link
                          href={`/jobsearch/apply`}
                          className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 text-sm hover:scale-105"
                        >
                          Apply Now
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="px-8 py-4 bg-slate-900/80 backdrop-blur-xl border border-purple-500/30 text-white rounded-xl font-semibold hover:bg-slate-800 hover:border-purple-500/50 transition-all flex items-center gap-2 mx-auto hover:scale-105">
                <Sparkles className="w-5 h-5" />
                Load More Opportunities
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <Rocket className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">
                Ready to take the next step?
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Can't find the perfect role?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Let our AI create a personalized career path and recommend new
              opportunities daily
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Get AI Career Path
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <Building className="w-5 h-5" />
                Browse Companies
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
