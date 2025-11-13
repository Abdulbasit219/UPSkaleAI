"use client";
import React, { useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Award,
  Target,
  Zap,
  User,
  Briefcase,
  GraduationCap,
  Eye,
  Code,
  Share2,
  AlertCircle,
  ShieldCheck,
  Brain,
  ArrowRight,
  Star,
  BarChart3,
  RefreshCw,
  Lightbulb,
  FileCheck,
  Clock,
  Users,
  Crown,
  Trophy,
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Plus, 
  XCircle,
  Download,
  Save,

} from "lucide-react";
import { useSelector } from "react-redux";

export default function ATSResumeChecker() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const theme = useSelector((state) => state.theme.mode);
  const [activeTab, setActiveTab] = useState("personal");
  const isDark = theme === 'dark';
  

  // Mock ATS results
  const atsScore = 78;
  const results = {
    overall: {
      score: 78,
      status: "good",
      message: "Your resume is ATS-friendly with room for improvement",
    },
    sections: [
      {
        name: "Keyword Optimization",
        score: 85,
        status: "excellent",
        icon: <Target className="w-5 h-5" />,
        details: "15 of 18 job-relevant keywords found",
        suggestions: [
          'Add "agile methodologies" to match job description',
          'Include "cloud computing" in your skills section',
          'Mention "team leadership" in your experience',
        ],
      },
      {
        name: "Formatting & Structure",
        score: 72,
        status: "good",
        icon: <FileCheck className="w-5 h-5" />,
        details: "Clean structure with minor issues",
        suggestions: [
          "Use standard section headers (Experience, Education, Skills)",
          "Avoid tables and text boxes",
          "Remove special characters from section titles",
        ],
      },
      {
        name: "Contact Information",
        score: 90,
        status: "excellent",
        icon: <ShieldCheck className="w-5 h-5" />,
        details: "All essential information present",
        suggestions: [
          "Add LinkedIn profile URL",
          "Consider adding a professional portfolio link",
        ],
      },
      {
        name: "Experience Details",
        score: 68,
        status: "needs-work",
        icon: <BarChart3 className="w-5 h-5" />,
        details: "Could use more quantifiable achievements",
        suggestions: [
          'Add metrics and numbers to achievements (e.g., "increased sales by 30%")',
          "Use action verbs at the start of bullet points",
          "Include dates in MM/YYYY format",
        ],
      },
      {
        name: "Skills Section",
        score: 82,
        status: "good",
        icon: <Award className="w-5 h-5" />,
        details: "Good variety of technical and soft skills",
        suggestions: [
          "Separate technical and soft skills",
          "Add proficiency levels for key skills",
          "Include 3-4 more industry-specific tools",
        ],
      },
      {
        name: "File Compatibility",
        score: 95,
        status: "excellent",
        icon: <FileText className="w-5 h-5" />,
        details: "PDF format is ATS-compatible",
        suggestions: ["Ensure fonts are embedded", "Keep file size under 2MB"],
      },
    ],
    keywords: {
      found: [
        "React",
        "JavaScript",
        "Node.js",
        "AWS",
        "Git",
        "Agile",
        "TypeScript",
        "MongoDB",
        "REST API",
        "Docker",
        "CI/CD",
        "Testing",
        "UI/UX",
        "Leadership",
        "Team Collaboration",
      ],
      missing: ["Kubernetes", "Microservices", "Cloud Computing"],
    },
    statistics: {
      totalWords: 487,
      bulletPoints: 18,
      sections: 6,
      pages: 2,
      readingTime: "2 min",
    },
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const analyzeResume = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 3000);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "from-green-500 to-emerald-500";
    if (score >= 60) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  const getStatusBadge = (status) => {
    const badges = {
      excellent: {
        color: "bg-green-500/20 text-green-400 border-green-500/30",
        icon: <CheckCircle2 className="w-3 h-3" />,
      },
      good: {
        color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        icon: <AlertTriangle className="w-3 h-3" />,
      },
      "needs-work": {
        color: "bg-red-500/20 text-red-400 border-red-500/30",
        icon: <XCircle className="w-3 h-3" />,
      },
    };
    return badges[status];
  };

 return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white" : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 text-gray-900"}`}>
      {/* Background Pattern */}
      <div className={`fixed inset-0 ${isDark ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzdlM2I4ZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"} pointer-events-none`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full mb-6 backdrop-blur-sm ${isDark ? "bg-purple-500/20 border-purple-500/30" : "bg-purple-100/80 border-purple-300/30"}`}>
            <Sparkles className={`w-4 h-4 ${isDark ? "text-yellow-400" : "text-yellow-500"}`} />
            <span className={`text-sm font-medium ${isDark ? "text-purple-300" : "text-purple-700"}`}>
              AI-Powered Resume Builder
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
            Build Your
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              Perfect Resume
            </span>
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Create a professional, ATS-friendly resume that stands out to employers and gets you more interviews
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className={`backdrop-blur-sm border rounded-2xl p-1 ${isDark ? "bg-slate-900/50 border-purple-500/20" : "bg-white/80 border-purple-300/20"}`}>
              <div className="flex flex-wrap gap-1">
                {[
                  { id: "personal", label: "Personal", icon: User },
                  { id: "experience", label: "Experience", icon: Briefcase },
                  { id: "education", label: "Education", icon: GraduationCap },
                  { id: "skills", label: "Skills", icon: Code },
                  { id: "projects", label: "Projects", icon: FileText },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all flex-1 min-w-0 justify-center ${activeTab === tab.id
                      ? isDark
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                        : "bg-purple-100 text-purple-700 border border-purple-300"
                      : isDark
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-600 hover:text-gray-900"
                      }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden sm:block">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className={`backdrop-blur-sm border rounded-2xl p-6 ${isDark ? "bg-slate-900/50 border-purple-500/20" : "bg-white/80 border-purple-300/20"}`}>
              {activeTab === "personal" && (
                <div className="space-y-6">
                  <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-6`}>Personal Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        First Name
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border transition-colors ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500"}`}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border transition-colors ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500"}`}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Email
                      </label>
                      <div className="relative">
                        <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                        <input
                          type="email"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500"}`}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Phone
                      </label>
                      <div className="relative">
                        <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                        <input
                          type="tel"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500"}`}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                      <input
                        type="text"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500"}`}
                        placeholder="New York, NY"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        LinkedIn
                      </label>
                      <div className="relative">
                        <Linkedin className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                        <input
                          type="url"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500"}`}
                          placeholder="linkedin.com/in/username"
                        />
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        GitHub
                      </label>
                      <div className="relative">
                        <Github className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                        <input
                          type="url"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500"}`}
                          placeholder="github.com/username"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Professional Summary
                    </label>
                    <textarea
                      rows={4}
                      className={`w-full px-4 py-3 rounded-xl border transition-colors ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500"}`}
                      placeholder="Experienced software developer with 5+ years in web development..."
                    />
                  </div>
                </div>
              )}

              {activeTab === "experience" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Work Experience</h3>
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${isDark ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30" : "bg-purple-100 text-purple-700 border border-purple-300 hover:bg-purple-200"}`}>
                      <Plus className="w-4 h-4" />
                      Add Experience
                    </button>
                  </div>

                  <div className={`p-6 rounded-xl border ${isDark ? "bg-slate-800/30 border-purple-500/20" : "bg-white/50 border-purple-300/20"}`}>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          Company
                        </label>
                        <input
                          type="text"
                          className={`w-full px-4 py-3 rounded-xl border transition-colors ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500"}`}
                          placeholder="Google"
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          Position
                        </label>
                        <input
                          type="text"
                          className={`w-full px-4 py-3 rounded-xl border transition-colors ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500"}`}
                          placeholder="Senior Software Engineer"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          Start Date
                        </label>
                        <input
                          type="month"
                          className={`w-full px-4 py-3 rounded-xl border transition-colors ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500"}`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          End Date
                        </label>
                        <input
                          type="month"
                          className={`w-full px-4 py-3 rounded-xl border transition-colors ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500"}`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Description
                      </label>
                      <textarea
                        rows={4}
                        className={`w-full px-4 py-3 rounded-xl border transition-colors ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500"}`}
                        placeholder="Describe your responsibilities and achievements..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "skills" && (
                <div className="space-y-6">
                  <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-6`}>Skills & Technologies</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Technical Skills
                      </label>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {["JavaScript", "React", "Node.js", "Python", "AWS"].map((skill) => (
                          <span key={skill} className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${isDark ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" : "bg-purple-100 text-purple-700 border border-purple-300"}`}>
                            {skill}
                            <button className="hover:opacity-70">
                              <XCircle className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className={`flex-1 px-4 py-3 rounded-xl border transition-colors ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500"}`}
                          placeholder="Add a skill..."
                        />
                        <button className={`px-4 py-3 rounded-xl font-medium transition-all ${isDark ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30" : "bg-purple-100 text-purple-700 border border-purple-300 hover:bg-purple-200"}`}>
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-1">
            <div className={`sticky top-8 backdrop-blur-sm border rounded-2xl p-6 ${isDark ? "bg-slate-900/50 border-purple-500/20" : "bg-white/80 border-purple-300/20"}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Resume Preview</h3>
                <div className="flex gap-2">
                  <button className={`p-2 rounded-lg transition-all ${isDark ? "hover:bg-slate-800/50 text-gray-400 hover:text-white" : "hover:bg-purple-100 text-gray-600 hover:text-purple-700"}`}>
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className={`p-2 rounded-lg transition-all ${isDark ? "hover:bg-slate-800/50 text-gray-400 hover:text-white" : "hover:bg-purple-100 text-gray-600 hover:text-purple-700"}`}>
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Resume Preview Content */}
              <div className={`border rounded-xl p-6 min-h-[500px] ${isDark ? "bg-slate-800/30 border-purple-500/20" : "bg-white border-purple-300/20"}`}>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">John Doe</h2>
                  <p className="text-gray-600">Senior Software Engineer</p>
                  <div className="flex justify-center gap-4 mt-2 text-sm text-gray-500">
                    <span>john@example.com</span>
                    <span>•</span>
                    <span>+1 (555) 123-4567</span>
                    <span>•</span>
                    <span>New York, NY</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-1 mb-2">Professional Summary</h3>
                    <p className="text-gray-600 text-sm">
                      Experienced software developer with 5+ years in web development...
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-1 mb-2">Experience</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-gray-900">Senior Software Engineer</h4>
                          <span className="text-sm text-gray-500">2020 - Present</span>
                        </div>
                        <p className="text-gray-600 text-sm">Google • Mountain View, CA</p>
                        <p className="text-gray-600 text-sm mt-1">
                          Led development of web applications using React and Node.js...
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-1 mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-1">
                      {["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"].map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${isDark ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50" : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50"}`}>
                  <Sparkles className="w-4 h-4" />
                  AI Enhance
                </button>
                <button className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${isDark ? "bg-slate-800/80 border border-purple-500/30 text-white hover:bg-slate-700" : "bg-purple-100 text-purple-700 border border-purple-300 hover:bg-purple-200"}`}>
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
