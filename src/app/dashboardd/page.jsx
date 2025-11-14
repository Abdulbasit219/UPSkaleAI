"use client";
import React, { useState } from 'react';
import {
  Home, BookOpen, Target, Briefcase, Award, TrendingUp,
  Clock, Zap, CheckCircle, ArrowRight, Play, Calendar,
  Users, MessageCircle, Bell, Search, Filter, Star,
  Code, Flame, Trophy, BarChart3, ChevronRight, Plus,
  Brain, Sparkles, AlertCircle, ExternalLink, Heart,
  BookMarked, Video, FileText, Lightbulb
} from 'lucide-react';
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState('all');
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  // User data
  const userData = {
    name: "Ali",
    streak: 47,
    todayGoal: 2,
    completedToday: 1,
  };

  // Quick stats
  const quickStats = [
    { 
      icon: <Flame className="w-5 h-5" />, 
      value: "47", 
      label: "Day Streak", 
      change: "+2 days",
      color: "from-orange-500 to-red-500",
      trend: "up"
    },
    { 
      icon: <Target className="w-5 h-5" />, 
      value: "65%", 
      label: "Career Progress", 
      change: "+5% this week",
      color: "from-green-500 to-emerald-500",
      trend: "up"
    },
    { 
      icon: <BookOpen className="w-5 h-5" />, 
      value: "12", 
      label: "Active Courses", 
      change: "3 in progress",
      color: "from-blue-500 to-cyan-500",
      trend: "neutral"
    },
    { 
      icon: <Trophy className="w-5 h-5" />, 
      value: "24", 
      label: "Achievements", 
      change: "2 new badges",
      color: "from-purple-500 to-pink-500",
      trend: "up"
    },
  ];

  // Continue learning
  const continueLearning = [
    {
      title: "Advanced React Patterns",
      category: "Web Development",
      progress: 75,
      timeLeft: "2h 30m left",
      nextLesson: "Higher Order Components",
      thumbnail: "⚛️",
      difficulty: "Advanced"
    },
    {
      title: "Node.js Backend Mastery",
      category: "Backend Development",
      progress: 45,
      timeLeft: "5h 15m left",
      nextLesson: "RESTful API Design",
      thumbnail: "🟢",
      difficulty: "Intermediate"
    },
    {
      title: "Database Design Fundamentals",
      category: "Database",
      progress: 30,
      timeLeft: "8h 45m left",
      nextLesson: "Normalization Techniques",
      thumbnail: "💾",
      difficulty: "Beginner"
    },
  ];

  // Recommended for you
  const recommended = [
    {
      title: "TypeScript Deep Dive",
      instructor: "Matt Pocock",
      rating: 4.8,
      students: "12.5k",
      duration: "8h",
      thumbnail: "📘",
      tags: ["TypeScript", "JavaScript", "Web Dev"]
    },
    {
      title: "AWS Cloud Practitioner",
      instructor: "Andrew Brown",
      rating: 4.9,
      students: "25k",
      duration: "12h",
      thumbnail: "☁️",
      tags: ["AWS", "Cloud", "DevOps"]
    },
    {
      title: "System Design Interview",
      instructor: "Alex Xu",
      rating: 4.7,
      students: "8.2k",
      duration: "10h",
      thumbnail: "🏗️",
      tags: ["System Design", "Interview"]
    },
  ];

  // Today's tasks
  const todayTasks = [
    { title: "Complete React Hooks module", time: "30 min", completed: true, priority: "high" },
    { title: "Practice LeetCode problems", time: "45 min", completed: false, priority: "high" },
    { title: "Watch Node.js tutorial", time: "1 hour", completed: false, priority: "medium" },
    { title: "Review JavaScript concepts", time: "20 min", completed: false, priority: "low" },
  ];

  // Recent activity
  const recentActivity = [
    {
      type: "course",
      title: "Completed 'State Management' lesson",
      time: "2 hours ago",
      icon: <CheckCircle className="w-4 h-4 text-green-400" />
    },
    {
      type: "achievement",
      title: "Earned 'Quick Learner' badge",
      time: "5 hours ago",
      icon: <Trophy className="w-4 h-4 text-yellow-400" />
    },
    {
      type: "project",
      title: "Updated E-Commerce project",
      time: "1 day ago",
      icon: <Code className="w-4 h-4 text-blue-400" />
    },
  ];

  // Upcoming events
  const upcomingEvents = [
    {
      title: "Live Q&A: React Best Practices",
      date: "Today, 3:00 PM",
      type: "Live Session",
      participants: 234,
      icon: <Video className="w-4 h-4" />
    },
    {
      title: "Web Dev Bootcamp Cohort 5",
      date: "Tomorrow, 10:00 AM",
      type: "Workshop",
      participants: 89,
      icon: <Users className="w-4 h-4" />
    },
    {
      title: "Career Fair - Tech Companies",
      date: "Nov 15, 2:00 PM",
      type: "Networking",
      participants: 456,
      icon: <Briefcase className="w-4 h-4" />
    },
  ];

  // Learning insights
  const learningInsights = {
    weeklyHours: 12.5,
    completionRate: 85,
    focusArea: "Frontend Development",
    strongestSkill: "React",
  };

  return (
    <div className={`min-h-screen pt-20 pb-12 transition-colors duration-300 ${
      isDark 
        ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white" 
        : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 text-gray-900"
    }`}>
      {/* Background Pattern */}
      <div 
        className={`fixed inset-0 pointer-events-none transition-opacity duration-300 ${
          isDark 
            ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"
            : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMDIsMTE2LDE0OSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className={`text-3xl lg:text-4xl font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                Welcome back, <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{userData.name}</span>! 👋
              </h1>
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                Ready to continue your learning journey?
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className={`p-2.5 backdrop-blur-sm text-white rounded-lg border transition-all hover:scale-105 relative ${
                isDark 
                  ? "bg-slate-800/50 border-slate-700 hover:bg-slate-700" 
                  : "bg-white/80 border-gray-300 hover:bg-white"
              }`}>
                <Bell className={`w-5 h-5 ${isDark ? "text-white" : "text-gray-700"}`} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 hover:scale-105">
                <Plus className="w-4 h-4" />
                New Course
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className={`group backdrop-blur-sm border rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 ${
              isDark
                ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/20"
                : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/40 hover:shadow-xl hover:shadow-purple-300/20"
            }`}>
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <div className={`text-3xl font-bold mb-1 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                {stat.value}
              </div>
              <div className={`text-sm font-medium mb-2 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}>
                {stat.label}
              </div>
              <div className={`text-xs flex items-center gap-1 ${
                stat.trend === 'up' ? 'text-green-400' : 
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {stat.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning */}
            <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
              isDark
                ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/30"
                : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/30"
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold flex items-center gap-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  <Play className="w-6 h-6 text-purple-400" />
                  Continue Learning
                </h2>
                <button className="text-purple-400 hover:text-purple-300 text-sm font-semibold flex items-center gap-1">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {continueLearning.map((course, index) => (
                  <div key={index} className={`group border rounded-lg overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30 hover:shadow-purple-500/20"
                      : "bg-white/50 border-purple-300/10 hover:border-purple-300/30 hover:shadow-purple-300/20"
                  }`}>
                    <div className="flex flex-col sm:flex-row gap-4 p-4">
                      {/* Thumbnail */}
                      <div className={`w-full sm:w-24 h-24 rounded-lg flex items-center justify-center text-4xl flex-shrink-0 relative ${
                        isDark 
                          ? "bg-gradient-to-br from-slate-800 to-slate-700" 
                          : "bg-gradient-to-br from-gray-100 to-gray-200"
                      }`}>
                        <div className={`absolute inset-0 rounded-lg ${
                          isDark 
                            ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10" 
                            : "bg-gradient-to-br from-purple-100 to-pink-100"
                        }`}></div>
                        <span className="relative z-10">{course.thumbnail}</span>
                      </div>

                      {/* Course Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className={`font-bold group-hover:text-purple-400 transition-colors ${
                              isDark ? "text-white" : "text-gray-900"
                            }`}>
                              {course.title}
                            </h3>
                            <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                              {course.category}
                            </p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded border flex-shrink-0 ${
                            isDark 
                              ? "bg-blue-500/10 text-blue-300 border-blue-500/20" 
                              : "bg-blue-100 text-blue-700 border-blue-200"
                          }`}>
                            {course.difficulty}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                              Next: {course.nextLesson}
                            </span>
                            <span className="text-purple-400 font-semibold">{course.progress}%</span>
                          </div>
                          <div className={`w-full rounded-full h-2 ${
                            isDark ? "bg-slate-700" : "bg-gray-200"
                          }`}>
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={`text-xs flex items-center gap-1 ${
                              isDark ? "text-gray-500" : "text-gray-400"
                            }`}>
                              <Clock className="w-3 h-3" />
                              {course.timeLeft}
                            </span>
                            <button className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                              isDark
                                ? "bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20"
                                : "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200"
                            }`}>
                              Continue
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Courses */}
            <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
              isDark
                ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/30"
                : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/30"
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold flex items-center gap-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  <Sparkles className="w-6 h-6 text-purple-400" />
                  Recommended For You
                </h2>
                <button className="text-purple-400 hover:text-purple-300 text-sm font-semibold flex items-center gap-1">
                  Explore
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {recommended.map((course, index) => (
                  <div key={index} className={`group border rounded-lg overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30 hover:shadow-purple-500/20"
                      : "bg-white/50 border-purple-300/10 hover:border-purple-300/30 hover:shadow-purple-300/20"
                  }`}>
                    <div className={`h-32 flex items-center justify-center text-5xl relative ${
                      isDark 
                        ? "bg-gradient-to-br from-slate-800 to-slate-700" 
                        : "bg-gradient-to-br from-gray-100 to-gray-200"
                    }`}>
                      <div className={`absolute inset-0 ${
                        isDark 
                          ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10" 
                          : "bg-gradient-to-br from-purple-100 to-pink-100"
                      }`}></div>
                      <span className="relative z-10">{course.thumbnail}</span>
                    </div>
                    <div className="p-4">
                      <h3 className={`font-bold mb-1 group-hover:text-purple-400 transition-colors ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}>
                        {course.title}
                      </h3>
                      <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                        {course.instructor}
                      </p>
                      
                      <div className={`flex items-center gap-4 text-sm mb-3 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{course.students}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {course.tags.map((tag, i) => (
                          <span key={i} className={`px-2 py-1 text-xs rounded border ${
                            isDark
                              ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                              : "bg-purple-100 text-purple-700 border-purple-200"
                          }`}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button className={`w-full py-2 rounded-lg text-sm font-semibold border transition-all ${
                        isDark
                          ? "bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20"
                          : "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200"
                      }`}>
                        Enroll Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Insights */}
            <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
              isDark
                ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/30"
                : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/30"
            }`}>
              <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                <BarChart3 className="w-6 h-6 text-purple-400" />
                Learning Insights
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    label: "This Week",
                    value: `${learningInsights.weeklyHours}h`,
                    change: "+2.5h from last week",
                    icon: <Clock className="w-4 h-4 text-purple-400" />
                  },
                  {
                    label: "Completion Rate",
                    value: `${learningInsights.completionRate}%`,
                    change: "+8% from last month",
                    icon: <Target className="w-4 h-4 text-purple-400" />
                  },
                  {
                    label: "Focus Area",
                    value: learningInsights.focusArea,
                    icon: <Brain className="w-4 h-4 text-purple-400" />
                  },
                  {
                    label: "Strongest Skill",
                    value: learningInsights.strongestSkill,
                    icon: <Zap className="w-4 h-4 text-purple-400" />
                  }
                ].map((insight, index) => (
                  <div key={index} className={`border rounded-lg p-4 ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/10"
                      : "bg-white/50 border-purple-300/10"
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}>
                        {insight.label}
                      </span>
                      {insight.icon}
                    </div>
                    <div className={`text-3xl font-bold mb-1 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      {insight.value}
                    </div>
                    {insight.change && (
                      <div className="text-green-400 text-xs flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {insight.change}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Today's Goals */}
            <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
              isDark
                ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/30"
                : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/30"
            }`}>
              <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                <Target className="w-5 h-5 text-purple-400" />
                Today's Goals
              </h3>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                    Daily Progress
                  </span>
                  <span className="text-purple-400 font-semibold">
                    {userData.completedToday}/{userData.todayGoal}
                  </span>
                </div>
                <div className={`w-full rounded-full h-2 ${
                  isDark ? "bg-slate-800" : "bg-gray-200"
                }`}>
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                    style={{ width: `${(userData.completedToday / userData.todayGoal) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                {todayTasks.map((task, index) => (
                  <div key={index} className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                    task.completed 
                      ? `${
                          isDark 
                            ? 'bg-green-500/5 border-green-500/20' 
                            : 'bg-green-100 border-green-200'
                        }`
                      : `${
                          isDark
                            ? 'bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30'
                            : 'bg-white/50 border-purple-300/10 hover:border-purple-300/30'
                        }`
                  }`}>
                    <button className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                      task.completed 
                        ? 'bg-green-500 border-green-500' 
                        : `${
                            isDark 
                              ? 'border-gray-600 hover:border-purple-400' 
                              : 'border-gray-400 hover:border-purple-400'
                          }`
                    }`}>
                      {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${
                        task.completed 
                          ? `${
                              isDark ? 'text-gray-500' : 'text-gray-400'
                            } line-through`
                          : isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs flex items-center gap-1 ${
                          isDark ? "text-gray-500" : "text-gray-400"
                        }`}>
                          <Clock className="w-3 h-3" />
                          {task.time}
                        </span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          task.priority === 'high' 
                            ? `${
                                isDark 
                                  ? 'bg-red-500/10 text-red-400' 
                                  : 'bg-red-100 text-red-700'
                              }`
                            : task.priority === 'medium'
                            ? `${
                                isDark 
                                  ? 'bg-yellow-500/10 text-yellow-400' 
                                  : 'bg-yellow-100 text-yellow-700'
                              }`
                            : `${
                                isDark 
                                  ? 'bg-gray-500/10 text-gray-400' 
                                  : 'bg-gray-100 text-gray-600'
                              }`
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
              isDark
                ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/30"
                : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/30"
            }`}>
              <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                <Calendar className="w-5 h-5 text-purple-400" />
                Upcoming Events
              </h3>
              
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer group ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30"
                      : "bg-white/50 border-purple-300/10 hover:border-purple-300/30"
                  }`}>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-purple-400 flex-shrink-0 group-hover:scale-110 transition-transform ${
                      isDark ? "bg-purple-500/10" : "bg-purple-100"
                    }`}>
                      {event.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-sm font-semibold mb-1 group-hover:text-purple-400 transition-colors ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}>
                        {event.title}
                      </h4>
                      <p className={`text-xs mb-2 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}>
                        {event.date}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 text-xs rounded border ${
                          isDark
                            ? "bg-blue-500/10 text-blue-300 border-blue-500/20"
                            : "bg-blue-100 text-blue-700 border-blue-200"
                        }`}>
                          {event.type}
                        </span>
                        <span className={`text-xs flex items-center gap-1 ${
                          isDark ? "text-gray-500" : "text-gray-400"
                        }`}>
                          <Users className="w-3 h-3" />
                          {event.participants}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-semibold flex items-center justify-center gap-1">
                View Calendar
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Recent Activity */}
            <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
              isDark
                ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/30"
                : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/30"
            }`}>
              <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                <Clock className="w-5 h-5 text-purple-400" />
                Recent Activity
              </h3>
              
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className={`flex items-start gap-3 p-2 rounded-lg transition-colors ${
                    isDark ? "hover:bg-slate-800/50" : "hover:bg-gray-100/50"
                  }`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isDark ? "bg-slate-800" : "bg-gray-100"
                    }`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}>
                        {activity.title}
                      </p>
                      <p className={`text-xs ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-semibold flex items-center justify-center gap-1">
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}