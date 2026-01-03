"use client";
import React, { useState, useEffect } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Building,
  Sparkles,
  Target,
  Users,
  Star,
  Bookmark,
  Share2,
  ArrowRight,
  Eye,
  Rocket,
  Award,
  Globe,
  Cpu,
  Crown,
  Search,
  ChevronDown,
  SlidersHorizontal,
  Send,
} from "lucide-react";
import { useSelector } from "react-redux";
import BackgroundPattern from "@/components/ui/BackgroundPattern";
import Link from "next/link";
import { jobsApi } from "@/lib/api.config";

// Import Components
import PostJobModal from "@/components/company/PostJobModal";
import SearchBar from "@/components/jobs/SearchBar";
import StatsGrid from "@/components/jobs/StatsGrid";
import FilterPills from "@/components/jobs/FilterPills";
import JobCard from "@/components/jobs/JobCard";
import JobCardSkeleton from "@/components/jobs/JobCardSkeleton";
import Sidebar from "@/components/jobs/Sidebar";
import CTABanner from "@/components/jobs/CTABanner";

// Import Mock Data
import {
  stats,
  filters,
  featuredCompanies,
} from "@/components/jobs/data/mockJobsData";

export default function SkillBridgeJobs() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getJobs = async () => {
    try {
      setLoading(true);
      const response = await jobsApi.getAll();
      if (response.data.success) {
        setJobs(response.data.data.jobs || []);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

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

  const filteredJobs = jobs.filter(
    (job) =>
      activeFilter === "all" ||
      job.category === activeFilter ||
      (activeFilter === "featured" && job.featured) ||
      (activeFilter === "remote" && job.remote) ||
      (activeFilter === "recommended" && job.match >= 85)
  );

  return (
    <>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          isDark
            ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white"
            : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 text-gray-900"
        }`}
      >
        {/* Background Pattern */}
        <BackgroundPattern />

        {/* Floating orbs - Hidden on mobile */}
        <div
          className={`fixed top-20 left-10 w-48 h-48 md:w-72 md:h-72 rounded-full blur-3xl animate-pulse ${
            isDark ? "bg-purple-500/20" : "bg-purple-200/40"
          } hidden sm:block`}
        />
        <div
          className={`fixed bottom-20 right-10 w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl animate-pulse ${
            isDark ? "bg-pink-500/20" : "bg-pink-200/40"
          } hidden sm:block`}
          style={{ animationDelay: "1s" }}
        />

        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10 pt-16 sm:pt-20">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 border rounded-full mb-4 sm:mb-6 backdrop-blur-sm ${
                isDark
                  ? "bg-purple-500/20 border-purple-500/30"
                  : "bg-purple-100/80 border-purple-300/30"
              }`}
            >
              <Sparkles
                className={`w-3 h-3 sm:w-4 sm:h-4 ${isDark ? "text-yellow-400" : "text-yellow-500"}`}
              />
              <span
                className={`text-xs sm:text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}
              >
                AI-Powered Job Matching
              </span>
            </div>

            <h1
              className={`text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Find Your
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                Dream Job
              </span>
            </h1>
            <p
              className={`text-base sm:text-lg lg:text-xl max-w-3xl mx-auto mb-6 sm:mb-8 px-2 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Discover opportunities that match your skills, powered by AI
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-4xl mx-auto mb-6 sm:mb-8 px-2">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <div className="flex-1 relative">
                  <Search
                    className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Search jobs, companies, or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border rounded-lg sm:rounded-xl placeholder:text-sm sm:placeholder:text-base placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none backdrop-blur-sm ${
                      isDark
                        ? "bg-slate-900/80 border-purple-500/30 text-white focus:border-purple-500"
                        : "bg-white/80 border-purple-300/30 text-gray-900 focus:border-purple-500"
                    }`}
                  />
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <button className="flex-1 sm:flex-none px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden xs:inline">Search</span>
                  </button>
                  <button
                    className={`px-3 sm:px-4 py-3 sm:py-4 border rounded-lg sm:rounded-xl transition-all backdrop-blur-sm ${
                      isDark
                        ? "bg-slate-800/80 border-purple-500/30 text-white hover:bg-slate-700"
                        : "bg-white/80 border-purple-300/30 text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <StatsGrid stats={stats} isDark={isDark} />
          </div>

          {/* Filter Pills */}
          <FilterPills
            filters={filters}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            isDark={isDark}
          />

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* Sidebar */}
            <Sidebar
              isDark={isDark}
              featuredCompanies={featuredCompanies}
              savedJobs={savedJobs}
            />

            {/* Jobs Grid */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              {/* Jobs Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
                <div>
                  <h2
                    className={`text-xl sm:text-2xl font-bold mb-1 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {loading ? "Loading..." : `${filteredJobs.length}`}{" "}
                    {activeFilter === "all"
                      ? "Opportunities"
                      : filters.find((f) => f.id === activeFilter)?.name}
                  </h2>
                  <p
                    className={`text-xs sm:text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Sorted by best match • Updated 5 min ago
                  </p>
                </div>
                <button
                  className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 border text-xs sm:text-sm font-medium rounded-lg sm:rounded-xl transition-all self-start sm:self-auto ${
                    isDark
                      ? "bg-slate-800/80 border-purple-500/30 text-white hover:bg-slate-700"
                      : "bg-white/80 border-purple-300/30 text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  Sort by
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Jobs List */}
              <div className="space-y-3 sm:space-y-4">
                {loading ? (
                  // Show skeleton loaders while loading
                  <>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <JobCardSkeleton key={i} isDark={isDark} />
                    ))}
                  </>
                ) : filteredJobs.length > 0 ? (
                  // Show actual job cards
                  filteredJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      isDark={isDark}
                      isSaved={savedJobs.has(job.id)}
                      onSave={() => toggleSaveJob(job.id)}
                    />
                  ))
                ) : (
                  // Show empty state
                  <div
                    className={`text-center py-12 px-4 rounded-xl backdrop-blur-xl border ${
                      isDark
                        ? "bg-slate-900/50 border-purple-500/20"
                        : "bg-white/80 border-purple-300/20"
                    }`}
                  >
                    <div className="text-6xl mb-4">🔍</div>
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      No jobs found
                    </h3>
                    <p
                      className={`${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Try adjusting your filters or search query
                    </p>
                  </div>
                )}
              </div>

              {/* Load More */}
              {!loading && filteredJobs.length > 0 && (
                <div className="text-center mt-6 sm:mt-8">
                  <button
                    className={`px-6 py-3 sm:px-8 sm:py-4 backdrop-blur-xl border rounded-lg sm:rounded-xl font-semibold transition-all flex items-center gap-2 mx-auto hover:scale-105 text-sm sm:text-base ${
                      isDark
                        ? "bg-slate-900/80 border-purple-500/30 text-white hover:bg-slate-800 hover:border-purple-500/50"
                        : "bg-white/80 border-purple-300/30 text-gray-900 hover:bg-gray-100 hover:border-purple-400/50"
                    }`}
                  >
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                    Load More Opportunities
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <CTABanner />
        </div>

        {/* Post Job Modal */}
        <PostJobModal
          isOpen={isPostJobModalOpen}
          onClose={() => setIsPostJobModalOpen(false)}
          isDark={isDark}
          onJobPosted={getJobs}
        />
      </div>
    </>
  );
}
