"use client";
import CourseCard from "@/components/learning/CourseCard";
import axios from "axios";
import { BookOpen, GraduationCap, Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const LearningPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

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
      let url = "http://localhost:3000/api/learning/courses?isPublished=true";
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
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Learn New Skills
          </h1>
          <p className="text-gray-400 text-lg">
            Master in-demand skills with our comprehensive courses
          </p>
        </div>

        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white focus:outline-none focus:border-purple-500/40"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white focus:outline-none focus:border-purple-500/40 cursor-pointer"
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
              className="px-4 py-2 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white focus:outline-none focus:border-purple-500/40 cursor-pointer"
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
                className="px-4 py-2 bg-purple-500/20 border border-purple-500/40 rounded-xl text-purple-300 hover:bg-purple-500/30 transition-colors cursor-pointer"
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
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
                className="bg-slate-800/50 rounded-xl p-6 animate-pulse"
              >
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-16">
            <GraduationCap className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No courses found
            </h3>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningPage;
