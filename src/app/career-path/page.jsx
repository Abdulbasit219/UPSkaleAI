"use client";
import React, { useState } from "react";
import {
  Target,
  Brain,
  Award,
  Rocket,
  TrendingUp,
  BookOpen,
  Clock,
  Users,
  Zap,
  Sparkles,
  CheckCircle,
  Play,
  ArrowRight,
  Star,
  Shield,
  Briefcase,
  Code,
  Palette,
  BarChart3,
  Cpu,
  GitBranch,
  Database,
  Cloud,
  Smartphone,
  Globe,
  Heart,
  MessageCircle,
  Share2,
  Download,
  Calendar,
  DollarSign,
} from "lucide-react";
import { useSelector } from "react-redux";
import BackgroundPattern from "@/components/ui/BackgroundPattern";
import SharedCTABanner from "@/components/ui/CTABanner";

export default function CareerPathPage() {
  const [activePath, setActivePath] = useState("frontend");
  const [selectedMilestone, setSelectedMilestone] = useState(0);
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const careerPaths = [
    {
      id: "frontend",
      name: "Frontend Developer",
      icon: <Code className="w-6 h-6" />,
      description: "Build interactive user interfaces and web applications",
      demand: "High",
      salary: "$85K - $150K",
      growth: "22%",
      popularity: 95,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "backend",
      name: "Backend Developer",
      icon: <Database className="w-6 h-6" />,
      description: "Develop server-side logic and database architecture",
      demand: "Very High",
      salary: "$90K - $160K",
      growth: "25%",
      popularity: 92,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "fullstack",
      name: "Full Stack Developer",
      icon: <Cpu className="w-6 h-6" />,
      description: "Master both frontend and backend technologies",
      demand: "Extreme",
      salary: "$95K - $170K",
      growth: "28%",
      popularity: 98,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "mobile",
      name: "Mobile Developer",
      icon: <Smartphone className="w-6 h-6" />,
      description: "Create native and cross-platform mobile apps",
      demand: "High",
      salary: "$80K - $140K",
      growth: "20%",
      popularity: 88,
      color: "from-orange-500 to-red-500",
    },
    {
      id: "devops",
      name: "DevOps Engineer",
      icon: <Cloud className="w-6 h-6" />,
      description: "Manage infrastructure and deployment pipelines",
      demand: "Very High",
      salary: "$100K - $180K",
      growth: "30%",
      popularity: 90,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "ai-ml",
      name: "AI/ML Engineer",
      icon: <Brain className="w-6 h-6" />,
      description: "Build intelligent systems and machine learning models",
      demand: "Extreme",
      salary: "$120K - $200K",
      growth: "35%",
      popularity: 96,
      color: "from-purple-500 to-blue-500",
    },
  ];

  const pathDetails = {
    frontend: {
      overview:
        "Frontend developers are responsible for creating the visual and interactive elements of websites and web applications that users see and interact with directly.",
      timeline: "6-12 months to job-ready",
      difficulty: "Intermediate",
      skills: [
        "HTML/CSS",
        "JavaScript",
        "React",
        "TypeScript",
        "Responsive Design",
        "UI/UX Principles",
      ],
      milestones: [
        {
          title: "Web Fundamentals",
          duration: "1-2 months",
          progress: 100,
          skills: ["HTML5", "CSS3", "Git", "Basic JavaScript"],
          resources: 12,
          completed: true,
        },
        {
          title: "JavaScript Mastery",
          duration: "2-3 months",
          progress: 85,
          skills: ["ES6+", "DOM Manipulation", "Async Programming", "APIs"],
          resources: 18,
          completed: false,
        },
        {
          title: "React & Modern Frameworks",
          duration: "3-4 months",
          progress: 60,
          skills: ["React", "State Management", "React Router", "Testing"],
          resources: 24,
          completed: false,
        },
        {
          title: "Advanced Concepts",
          duration: "2-3 months",
          progress: 20,
          skills: ["TypeScript", "Performance", "Accessibility", "PWA"],
          resources: 16,
          completed: false,
        },
        {
          title: "Portfolio & Job Ready",
          duration: "1-2 months",
          progress: 10,
          skills: ["Projects", "Interview Prep", "Resume Building"],
          resources: 8,
          completed: false,
        },
      ],
      jobOpportunities: [
        {
          role: "Junior Frontend Developer",
          companies: 234,
          avgSalary: "$85,000",
        },
        { role: "Frontend Developer", companies: 567, avgSalary: "$110,000" },
        {
          role: "Senior Frontend Developer",
          companies: 189,
          avgSalary: "$145,000",
        },
        { role: "Frontend Architect", companies: 45, avgSalary: "$180,000" },
      ],
    },
    backend: {
      overview:
        "Backend developers focus on server-side development, working with databases, APIs, and application logic that power web applications behind the scenes.",
      timeline: "8-14 months to job-ready",
      difficulty: "Intermediate",
      skills: [
        "Node.js",
        "Python",
        "Databases",
        "APIs",
        "Authentication",
        "Deployment",
      ],
      milestones: [
        {
          title: "Programming Fundamentals",
          duration: "2-3 months",
          progress: 100,
          skills: ["Python/JavaScript", "Data Structures", "Algorithms"],
          resources: 15,
          completed: true,
        },
        {
          title: "Backend Basics",
          duration: "3-4 months",
          progress: 75,
          skills: ["Node.js/Express", "REST APIs", "Database Design"],
          resources: 20,
          completed: false,
        },
        {
          title: "Advanced Backend",
          duration: "3-4 months",
          progress: 40,
          skills: ["Authentication", "Caching", "Microservices"],
          resources: 18,
          completed: false,
        },
        {
          title: "DevOps & Deployment",
          duration: "2-3 months",
          progress: 15,
          skills: ["Docker", "AWS", "CI/CD", "Monitoring"],
          resources: 14,
          completed: false,
        },
      ],
      jobOpportunities: [
        {
          role: "Junior Backend Developer",
          companies: 198,
          avgSalary: "$90,000",
        },
        { role: "Backend Developer", companies: 432, avgSalary: "$120,000" },
        {
          role: "Senior Backend Developer",
          companies: 234,
          avgSalary: "$155,000",
        },
        { role: "Backend Architect", companies: 67, avgSalary: "$190,000" },
      ],
    },
  };

  const currentPath = careerPaths.find((path) => path.id === activePath);
  const currentDetails = pathDetails[activePath] || pathDetails.frontend;

  const stats = [
    {
      value: "95%",
      label: "Success Rate",
      icon: <Target className="w-5 h-5" />,
    },
    {
      value: "6-12mo",
      label: "Avg. Timeline",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      value: "2.3K+",
      label: "Career Switchers",
      icon: <Users className="w-5 h-5" />,
    },
    {
      value: "$85K+",
      label: "Starting Salary",
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
          : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50"
      } pt-16 sm:pt-20`}
    >
      {/* Background Pattern */}
      <BackgroundPattern />

      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 border rounded-full mb-4 sm:mb-6 backdrop-blur-sm ${
              isDark
                ? "bg-purple-500/20 border-purple-500/30"
                : "bg-purple-100 border-purple-300/30"
            }`}
          >
            <Rocket
              className={`w-3 h-3 sm:w-4 sm:h-4 ${isDark ? "text-purple-400" : "text-purple-600"}`}
            />
            <span
              className={`text-xs sm:text-sm font-medium ${isDark ? "text-purple-300" : "text-purple-700"}`}
            >
              AI-Powered Career Guidance
            </span>
          </div>

          <h1
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Your
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              Career Path
            </span>
          </h1>
          <p
            className={`text-base sm:text-lg lg:text-xl max-w-3xl mx-auto mb-6 sm:mb-8 px-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Discover personalized learning journeys and master the skills needed
            for your dream tech career
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center p-3 sm:p-4 backdrop-blur-sm border rounded-lg sm:rounded-xl ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20"
                    : "bg-white/80 border-purple-300/20"
                }`}
              >
                <div className="flex justify-center mb-2 sm:mb-3">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center ${
                      isDark
                        ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                        : "bg-gradient-to-br from-purple-100 to-pink-100"
                    }`}
                  >
                    <div
                      className={isDark ? "text-purple-400" : "text-purple-600"}
                    >
                      {stat.icon}
                    </div>
                  </div>
                </div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div
                  className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Career Paths Sidebar */}
          <div className="lg:col-span-1">
            <div
              className={`backdrop-blur-xl border rounded-xl sm:rounded-2xl p-4 sm:p-6 ${
                isDark
                  ? "bg-slate-900/50 border-purple-500/20"
                  : "bg-white/80 border-purple-300/20"
              }`}
            >
              <h3
                className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                <Target
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? "text-purple-400" : "text-purple-600"}`}
                />
                Career Paths
              </h3>
              <div className="space-y-2">
                {careerPaths.map((path) => (
                  <button
                    key={path.id}
                    onClick={() => setActivePath(path.id)}
                    className={`w-full flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl text-left transition-all border ${
                      activePath === path.id
                        ? isDark
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border-purple-500/30"
                          : "bg-gradient-to-r from-purple-100 to-pink-100 text-gray-900 border-purple-300/30"
                        : isDark
                          ? "text-gray-400 hover:text-white hover:bg-white/5 border-transparent"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-transparent"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br ${path.color} rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <div className="text-white text-sm sm:text-base">
                        {path.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-xs sm:text-sm truncate">
                        {path.name}
                      </div>
                      <div
                        className={`text-xs mt-0.5 ${isDark ? "text-gray-400" : "text-gray-600"} hidden xs:block`}
                      >
                        {path.description}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs flex-shrink-0">
                      <Star className="w-2 h-2 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400" />
                      {path.popularity}%
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Recommendation */}
            <div
              className={`backdrop-blur-xl border rounded-xl sm:rounded-2xl p-4 sm:p-6 mt-4 sm:mt-6 ${
                isDark
                  ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30"
                  : "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300/30"
              }`}
            >
              <h3
                className={`text-base sm:text-lg font-bold mb-2 sm:mb-3 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                AI Recommendation
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Best Match
                  </span>
                  <span
                    className={`font-semibold text-xs sm:text-sm ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Full Stack
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Based on
                  </span>
                  <span
                    className={`font-semibold text-xs sm:text-sm ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Your Skills
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Confidence
                  </span>
                  <span className="text-green-400 font-semibold text-xs sm:text-sm">
                    92%
                  </span>
                </div>
              </div>
              <button className="w-full mt-3 sm:mt-4 py-2 sm:py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-1 sm:gap-2 text-sm">
                <Brain className="w-3 h-3 sm:w-4 sm:h-4" />
                Get Personalized Path
              </button>
            </div>
          </div>

          {/* Path Details */}
          <div className="lg:col-span-3">
            {/* Path Header */}
            <div
              className={`backdrop-blur-xl border rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 ${
                isDark
                  ? "bg-slate-900/50 border-purple-500/20"
                  : "bg-white/80 border-purple-300/20"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${currentPath.color} rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0`}
                  >
                    <div className="text-white text-xl sm:text-2xl">
                      {currentPath.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2
                      className={`text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      {currentPath.name}
                    </h2>
                    <p
                      className={`text-sm sm:text-base lg:text-lg mb-2 sm:mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                    >
                      {currentPath.description}
                    </p>
                    <div className="flex flex-col xs:flex-row xs:items-center gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                        <span
                          className={isDark ? "text-white" : "text-gray-900"}
                        >
                          {currentPath.demand} Demand
                        </span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                        <span
                          className={isDark ? "text-white" : "text-gray-900"}
                        >
                          {currentPath.salary}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                        <span
                          className={isDark ? "text-white" : "text-gray-900"}
                        >
                          {currentPath.growth} Growth
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center sm:text-right self-center sm:self-auto">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {currentPath.popularity}%
                  </div>
                  <div
                    className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Popularity Score
                  </div>
                </div>
              </div>

              {/* Progress Overview */}
              <div
                className={`grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 pt-4 sm:pt-6 border-t ${
                  isDark ? "border-purple-500/20" : "border-purple-300/20"
                }`}
              >
                <div className="text-center">
                  <div
                    className={`text-lg sm:text-xl md:text-2xl font-bold mb-0.5 sm:mb-1 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    {currentDetails.timeline}
                  </div>
                  <div
                    className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Timeline
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`text-lg sm:text-xl md:text-2xl font-bold mb-0.5 sm:mb-1 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    {currentDetails.difficulty}
                  </div>
                  <div
                    className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Difficulty
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`text-lg sm:text-xl md:text-2xl font-bold mb-0.5 sm:mb-1 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    {currentDetails.skills.length}
                  </div>
                  <div
                    className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Key Skills
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Path */}
            <div
              className={`backdrop-blur-xl border rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 ${
                isDark
                  ? "bg-slate-900/50 border-purple-500/20"
                  : "bg-white/80 border-purple-300/20"
              }`}
            >
              <h3
                className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                <BookOpen
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${isDark ? "text-purple-400" : "text-purple-600"}`}
                />
                Learning Path
              </h3>

              <div className="space-y-4 sm:space-y-6">
                {currentDetails.milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all cursor-pointer ${
                      selectedMilestone === index
                        ? isDark
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50"
                          : "bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300/50"
                        : isDark
                          ? "bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40"
                          : "bg-gray-50 border-purple-300/20 hover:border-purple-300/40"
                    }`}
                    onClick={() => setSelectedMilestone(index)}
                  >
                    {/* Step Number */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-sm sm:text-base border ${
                          milestone.completed
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : milestone.progress > 0
                              ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                              : isDark
                                ? "bg-slate-700 text-gray-400 border-slate-600"
                                : "bg-gray-200 text-gray-400 border-gray-300"
                        }`}
                      >
                        {milestone.completed ? (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      {index < currentDetails.milestones.length - 1 && (
                        <div
                          className={`w-0.5 h-4 sm:h-6 md:h-8 mt-1 sm:mt-2 ${
                            isDark ? "bg-purple-500/20" : "bg-purple-300/20"
                          }`}
                        ></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 sm:mb-3 gap-1 sm:gap-0">
                        <div className="flex-1 min-w-0">
                          <h4
                            className={`text-base sm:text-lg font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}
                          >
                            {milestone.title}
                          </h4>
                          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm">
                            <div
                              className={`flex items-center gap-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                            >
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                              {milestone.duration}
                            </div>
                            <div
                              className={`flex items-center gap-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                            >
                              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                              {milestone.resources} resources
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div
                            className={`text-base sm:text-lg font-bold mb-0.5 ${isDark ? "text-white" : "text-gray-900"}`}
                          >
                            {milestone.progress}%
                          </div>
                          <div
                            className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}
                          >
                            Complete
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div
                        className={`w-full rounded-full h-1.5 sm:h-2 mb-2 sm:mb-3 ${
                          isDark ? "bg-slate-700" : "bg-gray-200"
                        }`}
                      >
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 sm:h-2 rounded-full transition-all duration-500"
                          style={{ width: `${milestone.progress}%` }}
                        ></div>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                        {milestone.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded text-xs border ${
                              isDark
                                ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                                : "bg-purple-100 text-purple-700 border-purple-300/20"
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                          <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                          Start Learning
                        </button>
                        <button
                          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold transition-all flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                            isDark
                              ? "bg-slate-700 text-white hover:bg-slate-600"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                          Resources
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Opportunities */}
            <div
              className={`backdrop-blur-xl border rounded-xl sm:rounded-2xl p-4 sm:p-6 ${
                isDark
                  ? "bg-slate-900/50 border-purple-500/20"
                  : "bg-white/80 border-purple-300/20"
              }`}
            >
              <h3
                className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                <Briefcase
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${isDark ? "text-purple-400" : "text-purple-600"}`}
                />
                Career Opportunities
              </h3>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {currentDetails.jobOpportunities.map((job, index) => (
                  <div
                    key={index}
                    className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all ${
                      isDark
                        ? "bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40"
                        : "bg-gray-50 border-purple-300/20 hover:border-purple-300/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <h4
                        className={`text-base sm:text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                      >
                        {job.role}
                      </h4>
                      <div className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-green-500/20 text-green-400 rounded text-xs border border-green-500/30">
                        {job.companies}+
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span
                        className={isDark ? "text-gray-400" : "text-gray-600"}
                      >
                        Avg Salary
                      </span>
                      <span className="text-yellow-400 font-semibold">
                        {job.avgSalary}
                      </span>
                    </div>
                    <button
                      className={`w-full mt-2 sm:mt-3 py-1.5 sm:py-2 rounded-lg font-semibold transition-all text-xs sm:text-sm ${
                        isDark
                          ? "bg-slate-700 text-white hover:bg-slate-600"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Explore Jobs
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <SharedCTABanner
            isDark={isDark}
            className="rounded-[2rem] shadow-2xl"
            title="Ready to Start Your Journey?"
            subtitle="Take our AI-powered assessment to get a personalized career path tailored to your skills and goals."
            primaryBtn={{
              text: "Start Career Assessment",
              icon: (
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              ),
              onClick: () => {},
            }}
            secondaryBtn={{
              text: " Download Roadmap",
              onClick: () => {},
            }}
          />
        </div>
      </div>
    </div>
  );
}
