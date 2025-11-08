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

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('mastered');
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    username: "@alexj",
    role: "Aspiring Full-Stack Developer",
    location: "San Francisco, CA",
    memberSince: "January 2024",
    bio: "Passionate about building scalable web applications and learning new technologies. Currently focused on mastering React and Node.js while building real-world projects.",
    email: "alex.johnson@example.com",
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
    <div className="min-h-screen bg-slate-950 pt-20 pb-12">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="relative mb-8">
          {/* Cover Photo/Banner */}
          <div className="h-48 lg:h-64 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
            
            {/* Edit Cover Button */}
            <button className="absolute top-4 right-4 p-2.5 bg-slate-900/80 backdrop-blur-sm rounded-lg border border-purple-500/30 text-white hover:bg-slate-800 transition-all hover:scale-105 opacity-0 group-hover:opacity-100 z-10">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* Profile Picture & Info */}
          <div className="relative bg-slate-900/50 backdrop-blur-sm border-x border-b border-purple-500/20 rounded-b-xl -mt-20 pt-24 pb-6 px-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-start gap-6">
              {/* Avatar */}
              <div className="relative group -mt-28">
                <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center ring-4 ring-slate-950 shadow-xl">
                  <User className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
                </div>
                <button className="absolute bottom-2 right-2 p-2 bg-slate-900/90 backdrop-blur-sm rounded-lg border border-purple-500/30 text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-105">
                  <Camera className="w-4 h-4" />
                </button>
                {/* Online Status */}
                <div className="absolute top-2 right-2 w-4 h-4 bg-green-500 border-2 border-slate-950 rounded-full"></div>
              </div>

              {/* User Info */}
              <div className="flex-1 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pt-2">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl lg:text-4xl font-bold text-white">{userData.name}</h1>
                    <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full">
                      <span className="text-purple-300 text-sm font-semibold">Pro</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-lg">{userData.username}</p>
                  <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm pt-1">
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
                  <button className="px-5 py-2.5 bg-slate-800/50 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-slate-700 transition-all border border-slate-700 flex items-center gap-2 hover:scale-105">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button className="px-5 py-2.5 bg-slate-800/50 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-slate-700 transition-all border border-slate-700 flex items-center gap-2 hover:scale-105">
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
            <div key={index} className="group bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-5 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Me */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/30 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-400" />
                  About Me
                </h3>
                <button className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-slate-800 rounded-lg">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">{userData.bio}</p>
              
              <div className="flex flex-wrap gap-2">
                {["Web Development", "React", "Node.js", "TypeScript", "UI/UX"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-purple-500/10 text-purple-300 rounded-lg text-sm border border-purple-500/20 hover:bg-purple-500/20 transition-colors cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Current Learning Path */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/30 transition-colors">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-400" />
                Current Learning Path
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 font-semibold">Full-Stack Development</span>
                    <span className="text-purple-400 font-bold">65%</span>
                  </div>
                  <div className="relative w-full bg-slate-800 rounded-full h-3 overflow-hidden">
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
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-colors group">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-white font-medium">{item.name}</span>
                          <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20">
                            {item.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-slate-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500" 
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-gray-400 text-sm font-medium w-12">{item.progress}%</span>
                        </div>
                      </div>
                      <button className="ml-4 px-4 py-2 bg-purple-500/10 text-purple-300 rounded-lg text-sm border border-purple-500/20 hover:bg-purple-500/20 transition-all opacity-0 group-hover:opacity-100">
                        Continue
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills & Expertise */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/30 transition-colors">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                Skills & Expertise
              </h3>
              
              {/* Skill Tabs */}
              <div className="flex gap-2 mb-6 border-b border-purple-500/20">
                {['mastered', 'inProgress', 'recommended'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 font-semibold text-sm transition-all relative ${
                      activeTab === tab
                        ? 'text-purple-400'
                        : 'text-gray-400 hover:text-gray-300'
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
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-all group">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/20">
                        <div className="text-purple-400">{skill.icon}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="text-white font-semibold">{skill.name}</div>
                          <span className="px-2 py-0.5 bg-slate-700 text-gray-300 text-xs rounded-full">
                            {skill.level}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 max-w-xs bg-slate-700 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full transition-all duration-500 ${
                                skill.progress === 100 
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                                  : 'bg-gradient-to-r from-purple-500 to-pink-500'
                              }`}
                              style={{ width: `${skill.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-gray-400 text-sm font-medium">{skill.progress}%</span>
                        </div>
                        {skill.lastPracticed && (
                          <div className="text-gray-500 text-xs mt-1">Last practiced: {skill.lastPracticed}</div>
                        )}
                      </div>
                    </div>
                    <button className="ml-4 px-4 py-2 bg-purple-500/10 text-purple-300 rounded-lg text-sm font-semibold border border-purple-500/20 hover:bg-purple-500/20 transition-all hover:scale-105">
                      {skill.progress === 0 ? 'Start' : skill.progress === 100 ? 'Review' : 'Practice'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects Portfolio */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/30 transition-colors">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
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
                  <div key={index} className="group bg-slate-800/50 rounded-lg border border-purple-500/10 overflow-hidden hover:border-purple-500/30 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20">
                    {/* Project Preview */}
                    <div className="h-32 bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center text-5xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
                      <span className="relative z-10">{project.image}</span>
                      <div className="absolute top-2 right-2 px-2 py-1 bg-slate-900/80 backdrop-blur-sm rounded-full text-xs text-white font-semibold">
                        {project.status}
                      </div>
                    </div>
                    
                    {/* Project Info */}
                    <div className="p-4">
                      <h4 className="text-white font-bold mb-1 group-hover:text-purple-400 transition-colors">{project.title}</h4>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                      
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-purple-500/10 text-purple-300 text-xs rounded border border-purple-500/20">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {/* Stats & Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-gray-400 text-sm">
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{project.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{project.views}</span>
                          </div>
                        </div>
                        <button className="p-1.5 text-gray-400 hover:text-white transition-colors hover:bg-slate-700 rounded">
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
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/30 transition-colors">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Career Goal
              </h3>
              <div className="text-center mb-6">
                <div className="relative w-28 h-28 mx-auto mb-4">
                  <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#1e293b" strokeWidth="8" fill="none" />
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
                    <span className="text-3xl font-bold text-white">65%</span>
                  </div>
                </div>
                <div className="text-white font-bold text-lg">Full-Stack Developer</div>
                <div className="text-gray-400 text-sm">Target Role</div>
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
                    <CheckCircle className={`w-4 h-4 ${req.completed ? 'text-green-400' : 'text-gray-600'}`} />
                    <span className={req.completed ? 'text-gray-300' : 'text-gray-500'}>{req.label}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full py-2.5 bg-slate-800/50 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-slate-700 transition-all border border-slate-700 hover:scale-105">
                Update Goal
              </button>
            </div>

            {/* Learning Streak */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/30 transition-colors">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-400" />
                Learning Streak
              </h3>
              
              <div className="text-center mb-4">
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-1">
                  47 Days
                </div>
                <div className="text-gray-400 text-sm">Keep it going! 🔥</div>
              </div>
              
              <div className="flex justify-between gap-2">
                {learningStreak.map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-all ${
                      day.active 
                        ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white' 
                        : 'bg-slate-800 text-gray-500'
                    }`}>
                      {day.day.charAt(0)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/30 transition-colors">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors group cursor-pointer">
                    <div className={`w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform ${activity.color}`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium">{activity.action}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{activity.time}</p>
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
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/30 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-400" />
                  Achievements
                </h3>
                <span className="px-2 py-1 bg-purple-500/10 text-purple-300 text-xs font-semibold rounded-full border border-purple-500/20">
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
                    <div className="text-white text-xs font-semibold mb-0.5">{achievement.name}</div>
                    <div className="text-gray-500 text-xs">{achievement.earned}</div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-semibold flex items-center justify-center gap-1">
                View All Badges
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/30 transition-colors">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
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
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400">
                        {stat.icon}
                      </div>
                      <span className="text-gray-300 text-sm">{stat.label}</span>
                    </div>
                    <span className="text-white font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended for You */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/30 transition-colors">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Recommended
              </h3>
              <div className="space-y-3">
                {[
                  { title: "Advanced TypeScript", type: "Course", icon: <Book className="w-4 h-4" /> },
                  { title: "AWS Fundamentals", type: "Course", icon: <Book className="w-4 h-4" /> },
                  { title: "Senior Developer @ Tech Co", type: "Job", icon: <Briefcase className="w-4 h-4" /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">{item.title}</div>
                        <div className="text-gray-500 text-xs">{item.type}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
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