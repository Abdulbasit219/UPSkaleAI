"use client";
import React, { useState } from 'react';
import {
  User, Settings, Edit, Camera, MapPin, Calendar,
  Trophy, Target, Briefcase, Book, Code, Award,
  Star, Share2, Download, Lock, Eye, TrendingUp,
  Zap, CheckCircle, Plus, Clock, Users, Sparkles,
  ChevronRight, ArrowRight, BookOpen, BarChart3,
  Flame, MessageCircle, Heart, ExternalLink
} from 'lucide-react';
import { useSelector } from 'react-redux';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('mastered');
  const [isEditing, setIsEditing] = useState(false);
    const theme = useSelector((state) => state.theme.mode);
    const isDark = theme === "dark";

  // Mock user data
  const userData = {
    name: "Ali",
    username: "@ali",
    role: "Aspiring Full-Stack Developer",
    location: "Karachi, Pakistan",
    memberSince: "January 2024",
    bio: "Passionate about building scalable web applications and learning new technologies. Currently focused on mastering React and Node.js while building real-world projects.",
    email: "ali@example.com",
    avatar: null,
    coverPhoto: null,
  };

  const stats = [
    { icon: <Trophy className="w-5 h-5" />, value: "12", label: "Skills Mastered", color: "from-yellow-500 to-orange-500" },
    { icon: <Flame className="w-5 h-5" />, value: "47", label: "Day Streak", color: "from-purple-500 to-pink-500" },
    { icon: <Briefcase className="w-5 h-5" />, value: "8", label: "Projects", color: "from-blue-500 to-cyan-500" },
    { icon: <Target className="w-5 h-5" />, value: "65%", label: "Career Ready", color: "from-green-500 to-emerald-500" },
  ];

  const skills = {
    mastered: [
      { name: "HTML/CSS", level: "Expert", progress: 100, icon: <Code className="w-4 h-4" />, lastPracticed: "Today" },
      { name: "JavaScript", level: "Advanced", progress: 100, icon: <Code className="w-4 h-4" />, lastPracticed: "Yesterday" },
      { name: "React", level: "Advanced", progress: 100, icon: <Code className="w-4 h-4" />, lastPracticed: "2 days ago" },
      { name: "Git & GitHub", level: "Advanced", progress: 100, icon: <Code className="w-4 h-4" />, lastPracticed: "Today" },
    ],
    inProgress: [
      { name: "Node.js", level: "Intermediate", progress: 75, icon: <Code className="w-4 h-4" />, lastPracticed: "Today" },
      { name: "TypeScript", level: "Intermediate", progress: 60, icon: <Code className="w-4 h-4" />, lastPracticed: "1 day ago" },
      { name: "MongoDB", level: "Beginner", progress: 40, icon: <Code className="w-4 h-4" />, lastPracticed: "3 days ago" },
      { name: "REST APIs", level: "Intermediate", progress: 55, icon: <Code className="w-4 h-4" />, lastPracticed: "Today" },
    ],
    recommended: [
      { name: "AWS", level: "Beginner", progress: 0, icon: <Code className="w-4 h-4" /> },
      { name: "Docker", level: "Beginner", progress: 0, icon: <Code className="w-4 h-4" /> },
      { name: "GraphQL", level: "Beginner", progress: 0, icon: <Code className="w-4 h-4" /> },
    ]
  };

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration and admin dashboard",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      likes: 24,
      views: 156,
      status: "Completed",
      image: "🛒"
    },
    {
      title: "Task Management App",
      description: "Real-time collaborative task management with team features",
      tech: ["React", "Firebase", "Tailwind"],
      likes: 18,
      views: 98,
      status: "In Progress",
      image: "📋"
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio showcasing projects and skills",
      tech: ["Next.js", "Tailwind", "Framer Motion"],
      likes: 32,
      views: 203,
      status: "Completed",
      image: "💼"
    },
    {
      title: "Weather Dashboard",
      description: "Interactive weather dashboard with location-based forecasts",
      tech: ["React", "OpenWeather API", "Chart.js"],
      likes: 15,
      views: 87,
      status: "Completed",
      image: "🌤️"
    },
  ];

  const achievements = [
    { name: "Fast Learner", icon: <Zap className="w-6 h-6" />, earned: "Feb 2024", color: "from-yellow-500 to-orange-500" },
    { name: "Project Master", icon: <Briefcase className="w-6 h-6" />, earned: "Jan 2024", color: "from-purple-500 to-pink-500" },
    { name: "Skill Champion", icon: <Trophy className="w-6 h-6" />, earned: "Mar 2024", color: "from-blue-500 to-cyan-500" },
    { name: "Code Warrior", icon: <Code className="w-6 h-6" />, earned: "Feb 2024", color: "from-green-500 to-emerald-500" },
    { name: "Team Player", icon: <Users className="w-6 h-6" />, earned: "Mar 2024", color: "from-pink-500 to-rose-500" },
    { name: "Night Owl", icon: <Star className="w-6 h-6" />, earned: "Jan 2024", color: "from-indigo-500 to-purple-500" },
  ];

  const recentActivity = [
    { action: "Completed React Advanced course", time: "2 hours ago", icon: <Book className="w-4 h-4" />, color: "text-green-400" },
    { action: "Leveled up JavaScript to Advanced", time: "1 day ago", icon: <TrendingUp className="w-4 h-4" />, color: "text-blue-400" },
    { action: "Published E-Commerce Project", time: "2 days ago", icon: <Code className="w-4 h-4" />, color: "text-purple-400" },
    { action: "Earned Fast Learner badge", time: "3 days ago", icon: <Award className="w-4 h-4" />, color: "text-yellow-400" },
    { action: "Started Node.js Backend course", time: "5 days ago", icon: <BookOpen className="w-4 h-4" />, color: "text-pink-400" },
  ];

  const learningStreak = [
    { day: "Mon", active: true },
    { day: "Tue", active: true },
    { day: "Wed", active: true },
    { day: "Thu", active: true },
    { day: "Fri", active: true },
    { day: "Sat", active: false },
    { day: "Sun", active: true },
  ];

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
        {/* Header Section */}
        <div className="relative mb-8">
          {/* Cover Photo/Banner */}
          <div className="h-48 lg:h-64 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl relative overflow-hidden group">
            <div className={`absolute inset-0 ${
              isDark 
                ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"
                : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjIpIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"
            }`}></div>
            
            {/* Edit Cover Button */}
            <button className={`absolute top-4 right-4 p-2.5 backdrop-blur-sm rounded-lg border text-white hover:scale-105 transition-all opacity-0 group-hover:opacity-100 z-10 ${
              isDark
                ? "bg-slate-900/80 border-purple-500/30 hover:bg-slate-800"
                : "bg-white/80 border-purple-300/30 hover:bg-white text-gray-700"
            }`}>
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* Profile Picture & Info */}
          <div className={`relative backdrop-blur-sm border-x border-b rounded-b-xl -mt-20 pt-24 pb-6 px-6 ${
            isDark
              ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20"
              : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20"
          }`}>
            <div className="flex flex-col lg:flex-row items-start lg:items-start gap-6">
              {/* Avatar */}
              <div className="relative group -mt-28">
                <div className={`w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center ring-4 shadow-xl ${
                  isDark ? "ring-slate-950" : "ring-white"
                }`}>
                  <User className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
                </div>
                <button className={`absolute bottom-2 right-2 p-2 backdrop-blur-sm rounded-lg border text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-105 ${
                  isDark
                    ? "bg-slate-900/90 border-purple-500/30"
                    : "bg-white/90 border-purple-300/30 text-gray-700"
                }`}>
                  <Camera className="w-4 h-4" />
                </button>
                {/* Online Status */}
                <div className={`absolute top-2 right-2 w-4 h-4 bg-green-500 rounded-full ${
                  isDark ? "border-2 border-slate-950" : "border-2 border-white"
                }`}></div>
              </div>

              {/* User Info */}
              <div className="flex-1 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pt-2">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className={`text-3xl lg:text-4xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>{userData.name}</h1>
                    <div className={`px-3 py-1 rounded-full border ${
                      isDark
                        ? "bg-purple-500/10 border-purple-500/30"
                        : "bg-purple-100 border-purple-300"
                    }`}>
                      <span className={`text-sm font-semibold ${
                        isDark ? "text-purple-300" : "text-purple-700"
                      }`}>Pro</span>
                    </div>
                  </div>
                  <p className={isDark ? "text-gray-400 text-lg" : "text-gray-600 text-lg"}>{userData.username}</p>
                  <div className={`flex flex-wrap items-center gap-4 text-sm pt-1 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4" />
                      <span>{userData.role}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span>{userData.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {userData.memberSince}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 lg:flex-shrink-0">
                  <button className={`px-5 py-2.5 backdrop-blur-sm rounded-lg font-semibold transition-all border flex items-center gap-2 hover:scale-105 ${
                    isDark
                      ? "bg-slate-800/50 text-white border-slate-700 hover:bg-slate-700"
                      : "bg-white/50 text-gray-700 border-gray-300 hover:bg-white"
                  }`}>
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button className={`px-5 py-2.5 backdrop-blur-sm rounded-lg font-semibold transition-all border flex items-center gap-2 hover:scale-105 ${
                    isDark
                      ? "bg-slate-800/50 text-white border-slate-700 hover:bg-slate-700"
                      : "bg-white/50 text-gray-700 border-gray-300 hover:bg-white"
                  }`}>
                    <Download className="w-4 h-4" />
                    Resume
                  </button>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 hover:scale-105"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
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
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className={`text-sm font-medium ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Me */}
            <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
              isDark
                ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/30"
                : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/30"
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold flex items-center gap-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  <User className="w-5 h-5 text-purple-400" />
                  About Me
                </h3>
                <button className={`p-2 transition-colors hover:scale-105 rounded-lg ${
                  isDark
                    ? "text-gray-400 hover:text-white hover:bg-slate-800"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}>
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <p className={`leading-relaxed mb-4 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}>{userData.bio}</p>
              
              <div className="flex flex-wrap gap-2">
                {["Web Development", "React", "Node.js", "TypeScript", "UI/UX"].map((tag) => (
                  <span key={tag} className={`px-3 py-1.5 rounded-lg text-sm border transition-colors cursor-pointer ${
                    isDark
                      ? "bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20"
                      : "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200"
                  }`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Current Learning Path */}
            <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
              isDark
                ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/30"
                : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/30"
            }`}>
              <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                <BookOpen className="w-5 h-5 text-purple-400" />
                Current Learning Path
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-semibold ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}>Full-Stack Development</span>
                    <span className="text-purple-400 font-bold">65%</span>
                  </div>
                  <div className={`relative w-full rounded-full h-3 overflow-hidden ${
                    isDark ? "bg-slate-800" : "bg-gray-200"
                  }`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500" style={{ width: '65%' }}>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-pulse"></div>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-3 mt-6">
                  {[
                    { name: "Advanced React Patterns", progress: 80, status: "In Progress" },
                    { name: "Node.js Backend Development", progress: 65, status: "In Progress" },
                    { name: "Database Design", progress: 40, status: "Started" },
                  ].map((item, index) => (
                    <div key={index} className={`flex items-center justify-between p-4 rounded-lg border transition-colors group ${
                      isDark
                        ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30"
                        : "bg-gray-50/50 border-purple-300/10 hover:border-purple-300/30"
                    }`}>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`font-medium ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}>{item.name}</span>
                          <span className={`px-2 py-0.5 text-xs rounded-full border ${
                            isDark
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : "bg-green-100 text-green-700 border-green-200"
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`flex-1 rounded-full h-2 ${
                            isDark ? "bg-slate-700" : "bg-gray-300"
                          }`}>
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500" 
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-medium w-12 ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}>{item.progress}%</span>
                        </div>
                      </div>
                      <button className={`ml-4 px-4 py-2 rounded-lg text-sm border transition-all opacity-0 group-hover:opacity-100 ${
                        isDark
                          ? "bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20"
                          : "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200"
                      }`}>
                        Continue
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills & Expertise */}
            <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
              isDark
                ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/30"
                : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/30"
            }`}>
              <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                <BarChart3 className="w-5 h-5 text-purple-400" />
                Skills & Expertise
              </h3>
              
              {/* Skill Tabs */}
              <div className={`flex gap-2 mb-6 border-b ${
                isDark ? "border-purple-500/20" : "border-purple-300/20"
              }`}>
                {['mastered', 'inProgress', 'recommended'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 font-semibold text-sm transition-all relative ${
                      activeTab === tab
                        ? 'text-purple-400'
                        : isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab === 'mastered' && 'Mastered'}
                    {tab === 'inProgress' && 'In Progress'}
                    {tab === 'recommended' && 'Recommended'}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    )}
                  </button>
                ))}
              </div>
              
              <div className="space-y-3">
                {skills[activeTab].map((skill, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 rounded-lg border transition-all group ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30"
                      : "bg-gray-50/50 border-purple-300/10 hover:border-purple-300/30"
                  }`}>
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                        isDark
                          ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/20"
                          : "bg-gradient-to-br from-purple-100 to-pink-100 border-purple-300/20"
                      }`}>
                        <div className="text-purple-400">{skill.icon}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`font-semibold ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}>{skill.name}</div>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            isDark
                              ? "bg-slate-700 text-gray-300"
                              : "bg-gray-200 text-gray-600"
                          }`}>
                            {skill.level}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`flex-1 max-w-xs rounded-full h-1.5 ${
                            isDark ? "bg-slate-700" : "bg-gray-300"
                          }`}>
                            <div 
                              className={`h-1.5 rounded-full transition-all duration-500 ${
                                skill.progress === 100 
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                                  : 'bg-gradient-to-r from-purple-500 to-pink-500'
                              }`}
                              style={{ width: `${skill.progress}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-medium ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}>{skill.progress}%</span>
                        </div>
                        {skill.lastPracticed && (
                          <div className={`text-xs mt-1 ${
                            isDark ? "text-gray-500" : "text-gray-400"
                          }`}>Last practiced: {skill.lastPracticed}</div>
                        )}
                      </div>
                    </div>
                    <button className={`ml-4 px-4 py-2 rounded-lg text-sm font-semibold border transition-all hover:scale-105 ${
                      isDark
                        ? "bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20"
                        : "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200"
                    }`}>
                      {skill.progress === 0 ? 'Start' : skill.progress === 100 ? 'Review' : 'Practice'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects Portfolio */}
            <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
              isDark
                ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/30"
                : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/30"
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold flex items-center gap-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  <Briefcase className="w-5 h-5 text-purple-400" />
                  Project Portfolio
                </h3>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 hover:scale-105">
                  <Plus className="w-4 h-4" />
                  Add Project
                </button>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                  <div key={index} className={`group border rounded-lg overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg ${
                    isDark
                      ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30 hover:shadow-purple-500/20"
                      : "bg-white/50 border-purple-300/10 hover:border-purple-300/30 hover:shadow-purple-300/20"
                  }`}>
                    {/* Project Preview */}
                    <div className={`h-32 flex items-center justify-center text-5xl relative overflow-hidden ${
                      isDark 
                        ? "bg-gradient-to-br from-slate-800 to-slate-700" 
                        : "bg-gradient-to-br from-gray-100 to-gray-200"
                    }`}>
                      <div className={`absolute inset-0 ${
                        isDark 
                          ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10" 
                          : "bg-gradient-to-br from-purple-100 to-pink-100"
                      }`}></div>
                      <span className="relative z-10">{project.image}</span>
                      <div className={`absolute top-2 right-2 px-2 py-1 backdrop-blur-sm rounded-full text-xs font-semibold ${
                        isDark
                          ? "bg-slate-900/80 text-white"
                          : "bg-white/80 text-gray-700"
                      }`}>
                        {project.status}
                      </div>
                    </div>
                    
                    {/* Project Info */}
                    <div className="p-4">
                      <h4 className={`font-bold mb-1 group-hover:text-purple-400 transition-colors ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}>{project.title}</h4>
                      <p className={`text-sm mb-3 line-clamp-2 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}>{project.description}</p>
                      
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.tech.map((tech, i) => (
                          <span key={i} className={`px-2 py-1 text-xs rounded border ${
                            isDark
                              ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                              : "bg-purple-100 text-purple-700 border-purple-200"
                          }`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {/* Stats & Actions */}
                      <div className="flex items-center justify-between">
                        <div className={`flex items-center gap-3 text-sm ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{project.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{project.views}</span>
                          </div>
                        </div>
                        <button className={`p-1.5 transition-colors hover:scale-105 rounded ${
                          isDark
                            ? "text-gray-400 hover:text-white hover:bg-slate-700"
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                        }`}>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Career Goal Card */}
            <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
              isDark
                ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/30"
                : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/30"
            }`}>
              <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                <Target className="w-5 h-5 text-purple-400" />
                Career Goal
              </h3>
              <div className="text-center mb-6">
                <div className="relative w-28 h-28 mx-auto mb-4">
                  <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke={isDark ? "#1e293b" : "#e2e8f0"} strokeWidth="8" fill="none" />
                    <circle cx="50" cy="50" r="40" stroke="url(#gradient)" strokeWidth="8" fill="none" 
                      strokeDasharray="251.2" strokeDashoffset="87.92" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-3xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>65%</span>
                  </div>
                </div>
                <div className={`font-bold text-lg ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>Full-Stack Developer</div>
                <div className={isDark ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>Target Role</div>
              </div>
              
              {/* Requirements Checklist */}
              <div className="space-y-2 mb-4">
                {[
                  { label: "Frontend Skills", completed: true },
                  { label: "Backend Skills", completed: false },
                  { label: "Portfolio Projects", completed: true },
                  { label: "Interview Prep", completed: false },
                ].map((req, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className={`w-4 h-4 ${req.completed ? 'text-green-400' : isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                    <span className={req.completed ? (isDark ? 'text-gray-300' : 'text-gray-700') : (isDark ? 'text-gray-500' : 'text-gray-500')}>{req.label}</span>
                  </div>
                ))}
              </div>
              
              <button className={`w-full py-2.5 backdrop-blur-sm rounded-lg font-semibold transition-all border hover:scale-105 ${
                isDark
                  ? "bg-slate-800/50 text-white border-slate-700 hover:bg-slate-700"
                  : "bg-white/50 text-gray-700 border-gray-300 hover:bg-white"
              }`}>
                Update Goal
              </button>
            </div>

            {/* Learning Streak */}
            <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
              isDark
                ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/30"
                : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/30"
            }`}>
              <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                <Flame className="w-5 h-5 text-orange-400" />
                Learning Streak
              </h3>
              
              <div className="text-center mb-4">
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-1">
                  47 Days
                </div>
                <div className={isDark ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>Keep it going! 🔥</div>
              </div>
              
              <div className="flex justify-between gap-2">
                {learningStreak.map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-all ${
                      day.active 
                        ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white' 
                        : isDark ? 'bg-slate-800 text-gray-500' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {day.day.charAt(0)}
                    </div>
                  </div>
                ))}
              </div>
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
                  <div key={index} className={`flex items-start gap-3 p-3 rounded-lg transition-colors group cursor-pointer ${
                    isDark ? "hover:bg-slate-800/50" : "hover:bg-gray-100/50"
                  }`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform ${
                      isDark ? "bg-slate-800" : "bg-gray-100"
                    } ${activity.color}`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}>{activity.action}</p>
                      <p className={`text-xs mt-0.5 ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}>{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-semibold flex items-center justify-center gap-1 hover:gap-2">
                View All Activity
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Achievements */}
            <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
              isDark
                ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/30"
                : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/30"
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold flex items-center gap-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  <Award className="w-5 h-5 text-purple-400" />
                  Achievements
                </h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${
                  isDark
                    ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                    : "bg-purple-100 text-purple-700 border-purple-200"
                }`}>
                  {achievements.length}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center group cursor-pointer">
                    <div className={`w-16 h-16 bg-gradient-to-br ${achievement.color} rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform shadow-lg`}>
                      <div className="text-white">
                        {achievement.icon}
                      </div>
                    </div>
                    <div className={`text-xs font-semibold mb-0.5 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>{achievement.name}</div>
                    <div className={isDark ? "text-gray-500 text-xs" : "text-gray-500 text-xs"}>{achievement.earned}</div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-semibold flex items-center justify-center gap-1">
                View All Badges
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Stats */}
            <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
              isDark
                ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/30"
                : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/30"
            }`}>
              <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                <BarChart3 className="w-5 h-5 text-purple-400" />
                Quick Stats
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Total Learning Hours", value: "247", icon: <Clock className="w-4 h-4" /> },
                  { label: "Certificates Earned", value: "8", icon: <Award className="w-4 h-4" /> },
                  { label: "Forum Contributions", value: "34", icon: <MessageCircle className="w-4 h-4" /> },
                  { label: "Peer Reviews", value: "12", icon: <Users className="w-4 h-4" /> },
                ].map((stat, i) => (
                  <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${
                    isDark ? "bg-slate-800/50" : "bg-gray-100/50"
                  }`}>
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isDark ? "bg-purple-500/10 text-purple-400" : "bg-purple-100 text-purple-600"
                      }`}>
                        {stat.icon}
                      </div>
                      <span className={`text-sm ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}>{stat.label}</span>
                    </div>
                    <span className={`font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended for You */}
            <div className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
              isDark
                ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/30"
                : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/30"
            }`}>
              <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                <Sparkles className="w-5 h-5 text-purple-400" />
                Recommended
              </h3>
              <div className="space-y-3">
                {[
                  { title: "Advanced TypeScript", type: "Course", icon: <Book className="w-4 h-4" /> },
                  { title: "AWS Fundamentals", type: "Course", icon: <Book className="w-4 h-4" /> },
                  { title: "Senior Developer @ Tech Co", type: "Job", icon: <Briefcase className="w-4 h-4" /> },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center justify-between p-3 rounded-lg transition-colors group cursor-pointer ${
                    isDark ? "bg-slate-800/50 hover:bg-slate-700/50" : "bg-gray-100/50 hover:bg-gray-200/50"
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform ${
                        isDark ? "bg-purple-500/10 text-purple-400" : "bg-purple-100 text-purple-600"
                      }`}>
                        {item.icon}
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}>{item.title}</div>
                        <div className={isDark ? "text-gray-500 text-xs" : "text-gray-500 text-xs"}>{item.type}</div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-colors ${
                      isDark ? "text-gray-400 group-hover:text-white" : "text-gray-400 group-hover:text-gray-600"
                    }`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}