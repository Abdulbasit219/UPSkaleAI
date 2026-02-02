"use client";
import CourseCard from "@/components/learning/CourseCard";
import axios from "axios";
import { BookOpen, GraduationCap, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spotlight from "@/components/ui/Spotlight";
import BackgroundPattern from "@/components/ui/BackgroundPattern";

const LearningPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const [mounted, setMounted] = useState(false);
  const themeMode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = mounted ? themeMode : "dark";
  const isDark = theme === "dark";

  const categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "DevOps",
    "AI/ML",
    "Other",
  ];

  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  const fetchCourses = async () => {
    setLoading(true);
    try {
      let url = "/api/learning/courses?isPublished=true";
      if (selectedCategory) url += `&category=${selectedCategory}`;
      if (selectedDifficulty) url += `&difficulty=${selectedDifficulty}`;
      if (searchQuery) url += `&search=${searchQuery}`;

      const response = await axios.get(url);
      setCourses(response.data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  return (
    <div
      className={`min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-gray-900"
      }`}
    >
      <BackgroundPattern />
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill={isDark ? "white" : "#a855f7"}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-4 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-1000 ${
              isDark
                ? "bg-purple-500/10 border-purple-500/20 text-purple-300"
                : "bg-white/80 border-purple-200 text-purple-700 shadow-sm"
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-xs font-bold uppercase tracking-widest">
              AI-Powered Learning
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Master New{" "}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
              Skills
            </span>
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Master in-demand skills with our comprehensive courses tailored to
            your career path.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative group">
            <Search
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                isDark
                  ? "text-gray-500 group-focus-within:text-purple-400"
                  : "text-gray-400 group-focus-within:text-purple-600"
              }`}
            />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all ${
                isDark
                  ? "bg-slate-900/50 border border-purple-500/20 text-white placeholder-gray-500 focus:border-purple-500/40"
                  : "bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-300 shadow-sm"
              }`}
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer transition-all ${
                isDark
                  ? "bg-slate-900/50 border border-purple-500/20 text-white focus:border-purple-500/40"
                  : "bg-white border border-gray-200 text-gray-700 focus:border-purple-300 shadow-sm"
              }`}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className={`px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer transition-all ${
                isDark
                  ? "bg-slate-900/50 border border-purple-500/20 text-white focus:border-purple-500/40"
                  : "bg-white border border-gray-200 text-gray-700 focus:border-purple-300 shadow-sm"
              }`}
            >
              <option value="">All Levels</option>
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>

            {(selectedCategory || selectedDifficulty || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory("");
                  setSelectedDifficulty("");
                  setSearchQuery("");
                }}
                className={`px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                  isDark
                    ? "bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
                    : "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
                }`}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-8">
          <Link
            href="/learning/my-courses"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <BookOpen className="w-5 h-5" />
            My Enrolled Courses
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 animate-pulse border ${
                  isDark
                    ? "bg-slate-900/50 border-white/5"
                    : "bg-white border-gray-100 shadow-sm"
                }`}
              >
                <div
                  className={`h-4 rounded w-3/4 mb-4 ${
                    isDark ? "bg-slate-800" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`h-3 rounded w-full mb-2 ${
                    isDark ? "bg-slate-800" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`h-3 rounded w-5/6 ${
                    isDark ? "bg-slate-800" : "bg-gray-200"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20">
            <div
              className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                isDark ? "bg-slate-900" : "bg-gray-100"
              }`}
            >
              <GraduationCap
                className={`w-10 h-10 ${
                  isDark ? "text-slate-700" : "text-gray-400"
                }`}
              />
            </div>
            <h3
              className={`text-xl font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              No courses found
            </h3>
            <p className={isDark ? "text-gray-500" : "text-gray-500"}>
              Try adjusting your search or filters to find what you're looking
              for.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} isDark={isDark} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningPage;
