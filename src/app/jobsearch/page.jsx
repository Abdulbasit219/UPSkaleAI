"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  ArrowRight,
  TrendingUp,
  SearchIcon,
  Plus,
} from "lucide-react";
import { useSelector } from "react-redux";
import BackgroundPattern from "@/components/ui/BackgroundPattern";
import { jobsApi } from "@/lib/api.config";

// Import Components
import PostJobModal from "@/components/company/PostJobModal";
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
  const [mounted, setMounted] = React.useState(false);
  const themeMode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = mounted ? themeMode : "dark";
  const isDark = theme === "dark";
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getJobs = async (filter = "all") => {
    try {
      setLoading(true);
      let response;

      if (filter === "recommended") {
        response = await jobsApi.getMatches();
      } else {
        response = await jobsApi.getAll();
      }

      if (response.data.success) {
        // Handle potential naming differences between matchScore and match
        const processedJobs = (
          response.data.data.jobs ||
          response.data.data ||
          []
        ).map((j) => ({
          ...j,
          match: j.matchScore || j.match || 0,
        }));
        setJobs(processedJobs);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobs(activeFilter);
  }, [activeFilter]);

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

  const filteredJobs = jobs
    .filter((job) => {
      if (activeFilter === "all") return true;
      if (activeFilter === "recommended") return job.match >= 70;
      if (activeFilter === "featured") return job.featured;
      if (activeFilter === "remote") return job.remote;
      return job.category === activeFilter;
    })
    .sort((a, b) => {
      if (activeFilter === "recommended") return b.match - a.match;
      return 0;
    });

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white"
          : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 text-gray-900"
      }`}
    >
      {/* Background Pattern */}
      <BackgroundPattern />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 pt-28 sm:pt-36">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-4 ${isDark ? "bg-purple-500/20 border-purple-500/30 text-purple-200" : "bg-purple-100 border-purple-200 text-purple-700"}`}
          >
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-semibold">
              AI-Powered Job Matching
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold leading-tight tracking-tight">
            Find your next <br />
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              career bridge
            </span>
          </h1>

          <p
            className={`text-lg max-w-2xl mx-auto leading-relaxed mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Discover opportunities that match your verified skills, powered by
            neural matching intelligence.
          </p>

          <button
            onClick={() => setActiveFilter("recommended")}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 ${
              activeFilter === "recommended"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                : isDark
                  ? "bg-slate-800 text-purple-400 border border-purple-500/30 hover:bg-slate-700"
                  : "bg-white text-purple-600 border border-purple-200 shadow-sm hover:bg-gray-50"
            }`}
          >
            <Sparkles
              className={`w-5 h-5 ${activeFilter === "recommended" ? "animate-pulse" : ""}`}
            />
            Get AI Recommendations
          </button>

          {/* Integrated Search Bar - Now properly positioned and styled */}
          <div className="max-w-4xl mx-auto mt-10">
            <div
              className={`group flex flex-col sm:flex-row gap-2 p-2 rounded-3xl border transition-all duration-300 ${
                isDark
                  ? "bg-slate-900/80 border-white/10 shadow-2xl hover:border-purple-500/50"
                  : "bg-white border-gray-200 shadow-2xl shadow-purple-500/5 hover:border-purple-300"
              }`}
            >
              <div className="flex-1 relative">
                <Search
                  className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                    isDark
                      ? "text-gray-500 group-focus-within:text-purple-400"
                      : "text-gray-400 group-focus-within:text-purple-500"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search titles, skills, or companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-14 pr-4 py-4 bg-transparent border-none focus:ring-0 text-base font-medium outline-none ${
                    isDark
                      ? "text-white placeholder-gray-500"
                      : "text-gray-900 placeholder-gray-400"
                  }`}
                />
              </div>
              <div className="flex items-center gap-2 px-2">
                <button
                  className={`p-3.5 rounded-2xl transition-all duration-300 ${
                    isDark
                      ? "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-900"
                  }`}
                  title="Advanced Filters"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
                <button className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-base hover:shadow-xl hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap">
                  Search Jobs
                </button>
              </div>
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              <span
                className={`text-sm font-semibold ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                Popular:
              </span>
              {["Frontend", "Node.js", "Python", "Remote"].map((tag) => (
                <button
                  key={tag}
                  className={`text-sm font-bold transition-all ${
                    isDark
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-500 hover:text-purple-600"
                  }`}
                  onClick={() => setSearchQuery(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-16">
          <StatsGrid stats={stats} isDark={isDark} />
        </div>

        {/* Filter Navigation */}
        <div className="mb-12">
          <FilterPills
            filters={filters}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            isDark={isDark}
          />
        </div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <Sidebar
              isDark={isDark}
              featuredCompanies={featuredCompanies}
              savedJobs={savedJobs}
            />
          </div>

          {/* Jobs Feed */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">
                {loading
                  ? "Discovering..."
                  : `${filteredJobs.length} Opportunities`}
              </h2>
              <button
                className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-semibold transition-all ${isDark ? "bg-slate-900 border-white/10 hover:bg-slate-800" : "bg-white border-gray-200 hover:bg-gray-50 shadow-sm"}`}
              >
                Sort by
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {loading ? (
                <>
                  {[1, 2, 3, 4].map((i) => (
                    <JobCardSkeleton key={i} isDark={isDark} />
                  ))}
                </>
              ) : filteredJobs.length > 0 ? (
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
                <div
                  className={`p-16 text-center rounded-3xl border ${isDark ? "bg-slate-900/50 border-white/5" : "bg-white border-gray-100 shadow-sm"}`}
                >
                  <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 mx-auto mb-6">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No jobs matched</h3>
                  <p className="text-sm text-gray-500 max-w-xs mx-auto">
                    Try adjusting your filters or search terms.
                  </p>
                </div>
              )}
            </div>

            {/* Load More */}
            {!loading && filteredJobs.length > 0 && (
              <div className="pt-8 text-center">
                <button
                  className={`px-8 py-4 rounded-xl border font-bold text-sm transition-all hover:scale-105 ${isDark ? "bg-slate-900 border-white/10 hover:bg-slate-800 text-white" : "bg-white border-gray-200 hover:bg-gray-50 text-slate-900 shadow-sm"}`}
                >
                  View More Jobs
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24">
          <CTABanner />
        </div>
      </div>

      <PostJobModal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        isDark={isDark}
        onJobPosted={getJobs}
      />

      {/* Floating Action Button */}
      <button
        onClick={() => setIsPostJobModalOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group sm:hidden pointer-events-auto"
      >
        <Plus className="w-7 h-7" />
      </button>
    </div>
  );
}
