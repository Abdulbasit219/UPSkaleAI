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

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState('all');

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
    <div className="min-h-screen bg-slate-950 pt-20 pb-12">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                Welcome back, <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{userData.name}</span>! 👋
              </h1>
              <p className="text-gray-400">Ready to continue your learning journey?</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2.5 bg-slate-800/50 backdrop-blur-sm text-white rounded-lg border border-slate-700 hover:bg-slate-700 transition-all hover:scale-105 relative">
                <Bell className="w-5 h-5" />
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
            <div key={index} className="group bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-5 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm font-medium mb-2">{stat.label}</div>
              <div className={`text-xs flex items-center gap-1 ${
                stat.trend === 'up' ? 'text-green-400' : 'text-gray-500'
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
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/30 transition-colors">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
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
                  <div key={index} className="group bg-slate-800/50 rounded-lg border border-purple-500/10 overflow-hidden hover:border-purple-500/30 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20">
                    <div className="flex flex-col sm:flex-row gap-4 p-4">
                      {/* Thumbnail */}
                      <div className="w-full sm:w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg"></div>
                        <span className="relative z-10">{course.thumbnail}</span>
                      </div>

                      {/* Course Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="text-white font-bold group-hover:text-purple-400 transition-colors">{course.title}</h3>
                            <p className="text-gray-400 text-sm">{course.category}</p>
                          </div>
                          <span className="px-2 py-1 bg-blue-500/10 text-blue-300 text-xs rounded border border-blue-500/20 flex-shrink-0">
                            {course.difficulty}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Next: {course.nextLesson}</span>
                            <span className="text-purple-400 font-semibold">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 text-xs flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {course.timeLeft}
                            </span>
                            <button className="px-3 py-1.5 bg-purple-500/10 text-purple-300 rounded-lg text-xs font-semibold border border-purple-500/20 hover:bg-purple-500/20 transition-all">
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
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/30 transition-colors">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
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
                  <div key={index} className="group bg-slate-800/50 rounded-lg border border-purple-500/10 overflow-hidden hover:border-purple-500/30 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20">
                    <div className="h-32 bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center text-5xl relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
                      <span className="relative z-10">{course.thumbnail}</span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-bold mb-1 group-hover:text-purple-400 transition-colors">{course.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">{course.instructor}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
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
                          <span key={i} className="px-2 py-1 bg-purple-500/10 text-purple-300 text-xs rounded border border-purple-500/20">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button className="w-full py-2 bg-purple-500/10 text-purple-300 rounded-lg text-sm font-semibold border border-purple-500/20 hover:bg-purple-500/20 transition-all">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Insights */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/30 transition-colors">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-purple-400" />
                Learning Insights
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-500/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">This Week</span>
                    <Clock className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{learningInsights.weeklyHours}h</div>
                  <div className="text-green-400 text-xs flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +2.5h from last week
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-500/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Completion Rate</span>
                    <Target className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{learningInsights.completionRate}%</div>
                  <div className="text-green-400 text-xs flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +8% from last month
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-500/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Focus Area</span>
                    <Brain className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-xl font-bold text-white">{learningInsights.focusArea}</div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-500/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Strongest Skill</span>
                    <Zap className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-xl font-bold text-white">{learningInsights.strongestSkill}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Today's Goals */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/30 transition-colors">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Today's Goals
              </h3>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Daily Progress</span>
                  <span className="text-purple-400 font-semibold">{userData.completedToday}/{userData.todayGoal}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
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
                      ? 'bg-green-500/5 border-green-500/20' 
                      : 'bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30'
                  }`}>
                    <button className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                      task.completed 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-600 hover:border-purple-400'
                    }`}>
                      {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-white'}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {task.time}
                        </span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          task.priority === 'high' ? 'bg-red-500/10 text-red-400' :
                          task.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                          'bg-gray-500/10 text-gray-400'
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
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/30 transition-colors">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                Upcoming Events
              </h3>
              
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-all cursor-pointer group">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                      {event.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-semibold mb-1 group-hover:text-purple-400 transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-gray-400 text-xs mb-2">{event.date}</p>
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 bg-blue-500/10 text-blue-300 text-xs rounded border border-blue-500/20">
                          {event.type}
                        </span>
                        <span className="text-gray-500 text-xs flex items-center gap-1">
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
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/30 transition-colors">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" />
                Recent Activity
              </h3>
              
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
                    <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium">{activity.title}</p>
                      <p className="text-gray-500 text-xs">{activity.time}</p>
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