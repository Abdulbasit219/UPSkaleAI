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
  Edit3,
  Layout,
  Palette,
  Type
} from "lucide-react";
import { useSelector } from "react-redux";

export default function AIResumeBuilder() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const theme = useSelector((state) => state.theme.mode);
  const [activeTab, setActiveTab] = useState("personal");
  const [resumeData, setResumeData] = useState({
    personal: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      portfolio: "",
      summary: ""
    },
    experience: [],
    education: [],
    skills: {
      technical: [],
      soft: [],
      languages: []
    },
    projects: []
  });
  const [currentExperience, setCurrentExperience] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    current: false,
    description: ""
  });
  const [currentSkill, setCurrentSkill] = useState("");
  const [resumeStyle, setResumeStyle] = useState("modern");
  const [aiEnhancing, setAiEnhancing] = useState(false);

  const isDark = theme === 'dark';

  const handleInputChange = (section, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const addExperience = () => {
    if (currentExperience.company && currentExperience.position) {
      setResumeData(prev => ({
        ...prev,
        experience: [...prev.experience, { ...currentExperience, id: Date.now() }]
      }));
      setCurrentExperience({
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        current: false,
        description: ""
      });
    }
  };

  const addSkill = (type) => {
    if (currentSkill.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          [type]: [...prev.skills[type], currentSkill.trim()]
        }
      }));
      setCurrentSkill("");
    }
  };

  const removeSkill = (type, index) => {
    setResumeData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [type]: prev.skills[type].filter((_, i) => i !== index)
      }
    }));
  };

  const aiEnhanceResume = () => {
    setAiEnhancing(true);
    // Simulate AI enhancement
    setTimeout(() => {
      setAiEnhancing(false);
      // In a real app, this would update the resume data with AI suggestions
    }, 2000);
  };

  const downloadResume = () => {
    // In a real app, this would generate and download the resume PDF
    alert("Resume download functionality would be implemented here");
  };

  const resumeStyles = [
    { id: "modern", name: "Modern", description: "Clean and professional" },
    { id: "executive", name: "Executive", description: "Formal and traditional" },
    { id: "creative", name: "Creative", description: "Design-focused" },
    { id: "minimal", name: "Minimal", description: "Simple and elegant" }
  ];

 return (
    <div className={`min-h-screen pt-12 sm:pt-16 transition-colors duration-300 ${isDark ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white" : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 text-gray-900"}`}>
      {/* Enhanced Background Pattern */}
      <div className={`fixed inset-0 ${isDark ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-slate-950" : "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/40 via-gray-50 to-gray-100"}`} />
      <div className={`absolute inset-0 ${isDark ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC4yIiBvcGFjaXR5PSIwLjAyIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10" : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzdlM2I4ZiIgc3Ryb2tlLXdpZHRoPSIwLjIiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5"} pointer-events-none`} />

      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className={`inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl mb-6 sm:mb-8 backdrop-blur-xl border ${isDark ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 text-purple-300" : "bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300 text-purple-700"}`}>
            <div className={`p-1.5 sm:p-2 rounded-lg ${isDark ? "bg-purple-500/20" : "bg-purple-500/10"}`}>
              <Sparkles className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? "text-yellow-400" : "text-yellow-600"}`} />
            </div>
            <span className="font-semibold text-sm sm:text-lg">AI-Powered Resume Builder</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Build Your
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-300% animate-gradient">
              {" "}
              Perfect Resume
            </span>
          </h1>
          <p className={`text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Create a professional, ATS-friendly resume that stands out to employers and gets you more interviews
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Panel - Enhanced Form */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Enhanced Tabs */}
            <div className={`backdrop-blur-xl border-2 rounded-2xl sm:rounded-3xl p-1 sm:p-2 ${isDark ? "bg-slate-900/40 border-purple-500/20" : "bg-white/90 border-purple-300/30 shadow-lg"}`}>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {[
                  { id: "personal", label: "Personal", icon: User },
                  { id: "experience", label: "Experience", icon: Briefcase },
                  { id: "education", label: "Education", icon: GraduationCap },
                  { id: "skills", label: "Skills", icon: Code },
                  { id: "projects", label: "Projects", icon: FileText },
                  { id: "design", label: "Design", icon: Palette },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1 sm:gap-2 xs:gap-3 px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 flex-1 min-w-0 justify-center group text-xs sm:text-sm ${activeTab === tab.id
                      ? isDark
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50"
                      : isDark
                        ? "text-gray-400 hover:text-gray-300 hover:bg-slate-800/50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/80"
                      }`}
                  >
                    <tab.icon className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-transform duration-300 ${activeTab === tab.id ? "scale-110" : "group-hover:scale-105"}`} />
                    <span className="hidden xs:block">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Form Content */}
            <div className={`backdrop-blur-xl border-2 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 ${isDark ? "bg-slate-900/40 border-purple-500/20" : "bg-white/90 border-purple-300/30 shadow-lg"}`}>
              {activeTab === "personal" && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${isDark ? "bg-purple-500/20" : "bg-purple-100"}`}>
                      <User className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
                    </div>
                    <div>
                      <h3 className={`text-lg sm:text-xl md:text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Personal Information</h3>
                      <p className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Tell us about yourself</p>
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-1 sm:space-y-2">
                      <label className={`block text-xs sm:text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        First Name
                      </label>
                      <input
                        type="text"
                        value={resumeData.personal.firstName}
                        onChange={(e) => handleInputChange("personal", "firstName", e.target.value)}
                        className={`w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 text-sm sm:text-base ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"}`}
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <label className={`block text-xs sm:text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={resumeData.personal.lastName}
                        onChange={(e) => handleInputChange("personal", "lastName", e.target.value)}
                        className={`w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 text-sm sm:text-base ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"}`}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-1 sm:space-y-2">
                      <label className={`block text-xs sm:text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Email
                      </label>
                      <div className="relative">
                        <Mail className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                        <input
                          type="email"
                          value={resumeData.personal.email}
                          onChange={(e) => handleInputChange("personal", "email", e.target.value)}
                          className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 text-sm sm:text-base ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"}`}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <label className={`block text-xs sm:text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Phone
                      </label>
                      <div className="relative">
                        <Phone className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                        <input
                          type="tel"
                          value={resumeData.personal.phone}
                          onChange={(e) => handleInputChange("personal", "phone", e.target.value)}
                          className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 text-sm sm:text-base ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"}`}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <label className={`block text-xs sm:text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Professional Summary
                    </label>
                    <div className="relative">
                      <Edit3 className={`absolute left-3 sm:left-4 top-3 sm:top-4 w-4 h-4 sm:w-5 sm:h-5 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                      <textarea
                        rows={3}
                        value={resumeData.personal.summary}
                        onChange={(e) => handleInputChange("personal", "summary", e.target.value)}
                        className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 resize-none text-sm sm:text-base ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"}`}
                        placeholder="Experienced software developer with 5+ years in web development..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "experience" && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${isDark ? "bg-purple-500/20" : "bg-purple-100"}`}>
                        <Briefcase className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
                      </div>
                      <div>
                        <h3 className={`text-lg sm:text-xl md:text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Work Experience</h3>
                        <p className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Add your professional experience</p>
                      </div>
                    </div>
                    <button 
                      onClick={addExperience}
                      className={`flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-3 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 text-xs sm:text-sm ${isDark ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30" : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50"}`}
                    >
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      Add Experience
                    </button>
                  </div>

                  <div className={`p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 ${isDark ? "bg-slate-800/30 border-purple-500/20" : "bg-white/50 border-purple-300/20"}`}>
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                      <div className="space-y-1 sm:space-y-2">
                        <label className={`block text-xs sm:text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          Company
                        </label>
                        <input
                          type="text"
                          value={currentExperience.company}
                          onChange={(e) => setCurrentExperience(prev => ({ ...prev, company: e.target.value }))}
                          className={`w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 text-sm sm:text-base ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"}`}
                          placeholder="Google"
                        />
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <label className={`block text-xs sm:text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          Position
                        </label>
                        <input
                          type="text"
                          value={currentExperience.position}
                          onChange={(e) => setCurrentExperience(prev => ({ ...prev, position: e.target.value }))}
                          className={`w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 text-sm sm:text-base ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"}`}
                          placeholder="Senior Software Engineer"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 sm:space-y-2">
                      <label className={`block text-xs sm:text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={currentExperience.description}
                        onChange={(e) => setCurrentExperience(prev => ({ ...prev, description: e.target.value }))}
                        className={`w-full px-3 py-3 sm:px-4 sm:py-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 text-sm sm:text-base ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"}`}
                        placeholder="Describe your responsibilities and achievements..."
                      />
                    </div>
                  </div>

                  {/* Experience List */}
                  {resumeData.experience.length > 0 && (
                    <div className="space-y-3 sm:space-y-4">
                      <h4 className={`text-base sm:text-lg font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>Added Experience</h4>
                      {resumeData.experience.map((exp, index) => (
                        <div key={exp.id} className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border ${isDark ? "bg-slate-800/30 border-purple-500/20" : "bg-white/50 border-purple-300/20"}`}>
                          <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0">
                              <h5 className="font-semibold text-sm sm:text-lg truncate">{exp.position}</h5>
                              <p className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-600"} truncate`}>{exp.company}</p>
                            </div>
                            <button className={`p-1 sm:p-2 rounded-lg flex-shrink-0 ml-2 ${isDark ? "hover:bg-slate-700/50" : "hover:bg-gray-100"}`}>
                              <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "skills" && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${isDark ? "bg-purple-500/20" : "bg-purple-100"}`}>
                      <Code className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
                    </div>
                    <div>
                      <h3 className={`text-lg sm:text-xl md:text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Skills & Technologies</h3>
                      <p className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Showcase your expertise</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div className="space-y-3 sm:space-y-4">
                      <label className={`block text-xs sm:text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Technical Skills
                      </label>
                      <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
                        {resumeData.skills.technical.map((skill, index) => (
                          <span key={index} className={`inline-flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300 ${isDark ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 hover:border-purple-400" : "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-300 hover:border-purple-400"}`}>
                            {skill}
                            <button 
                              onClick={() => removeSkill("technical", index)}
                              className="hover:opacity-70 transition-opacity"
                            >
                              <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2 sm:gap-3">
                        <input
                          type="text"
                          value={currentSkill}
                          onChange={(e) => setCurrentSkill(e.target.value)}
                          className={`flex-1 px-3 py-3 sm:px-4 sm:py-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 text-sm sm:text-base ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"}`}
                          placeholder="Add a technical skill..."
                          onKeyPress={(e) => e.key === 'Enter' && addSkill("technical")}
                        />
                        <button 
                          onClick={() => addSkill("technical")}
                          className={`px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 text-sm ${isDark ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30" : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50"}`}
                        >
                          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "design" && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${isDark ? "bg-purple-500/20" : "bg-purple-100"}`}>
                      <Palette className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
                    </div>
                    <div>
                      <h3 className={`text-lg sm:text-xl md:text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Resume Design</h3>
                      <p className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Choose your preferred style</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    {resumeStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setResumeStyle(style.id)}
                        className={`p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border-2 text-left transition-all duration-300 ${resumeStyle === style.id
                          ? isDark
                            ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500 shadow-lg shadow-purple-500/20"
                            : "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50"
                          : isDark
                            ? "bg-slate-800/30 border-purple-500/20 hover:border-purple-500/50"
                            : "bg-white border-purple-300/50 hover:border-purple-500"
                          }`}
                      >
                        <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2 sm:mb-3 md:mb-4 ${resumeStyle === style.id
                          ? isDark ? "bg-purple-500/30" : "bg-white/20"
                          : isDark ? "bg-purple-500/20" : "bg-purple-100"
                          }`}>
                          <Layout className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 md:w-6 md:h-6 ${resumeStyle === style.id && !isDark ? "text-white" : isDark ? "text-purple-400" : "text-purple-600"}`} />
                        </div>
                        <h4 className="font-semibold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">{style.name}</h4>
                        <p className={`text-xs sm:text-sm ${resumeStyle === style.id && !isDark ? "text-white/90" : isDark ? "text-gray-400" : "text-gray-600"}`}>
                          {style.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Right Panel - Preview */}
          <div className="lg:col-span-1">
            <div className={`sticky top-4 sm:top-8 backdrop-blur-xl border-2 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 ${isDark ? "bg-slate-900/40 border-purple-500/20" : "bg-white/90 border-purple-300/30 shadow-xl"}`}>
              <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
                <div>
                  <h3 className={`text-lg sm:text-xl md:text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Resume Preview</h3>
                  <p className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Real-time preview</p>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <button className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 ${isDark ? "hover:bg-slate-800/50 text-gray-400 hover:text-white" : "hover:bg-purple-100 text-gray-600 hover:text-purple-700"}`}>
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button 
                    onClick={downloadResume}
                    className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 ${isDark ? "hover:bg-slate-800/50 text-gray-400 hover:text-white" : "hover:bg-purple-100 text-gray-600 hover:text-purple-700"}`}
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Enhanced Resume Preview */}
              <div className={`border-2 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] transition-all duration-500 ${isDark ? "bg-slate-800/30 border-purple-500/20" : "bg-white border-purple-300/20 shadow-inner"}`}>
                <div className="text-center mb-4 sm:mb-6 md:mb-8">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {resumeData.personal.firstName || "John"} {resumeData.personal.lastName || "Doe"}
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-2 sm:mb-3 md:mb-4">Senior Software Engineer</p>
                  <div className="flex flex-col xs:flex-row xs:justify-center gap-1 xs:gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500">
                    <span className="truncate">{resumeData.personal.email || "john@example.com"}</span>
                    <span className="hidden xs:inline">•</span>
                    <span>{resumeData.personal.phone || "+1 (555) 123-4567"}</span>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 border-b-2 pb-1 sm:pb-2 mb-2 sm:mb-3 md:mb-4">Professional Summary</h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {resumeData.personal.summary || "Experienced software developer with 5+ years in web development..."}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 border-b-2 pb-1 sm:pb-2 mb-2 sm:mb-3 md:mb-4">Experience</h3>
                    <div className="space-y-3 sm:space-y-4">
                      {resumeData.experience.length > 0 ? (
                        resumeData.experience.map((exp, index) => (
                          <div key={index} className="space-y-1 sm:space-y-2">
                            <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-1 sm:gap-0">
                              <h4 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg">{exp.position}</h4>
                              <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">2020 - Present</span>
                            </div>
                            <p className="text-gray-600 text-xs sm:text-sm">{exp.company} • Mountain View, CA</p>
                            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{exp.description}</p>
                          </div>
                        ))
                      ) : (
                        <div className="space-y-1 sm:space-y-2">
                          <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-1 sm:gap-0">
                            <h4 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg">Senior Software Engineer</h4>
                            <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">2020 - Present</span>
                          </div>
                          <p className="text-gray-600 text-xs sm:text-sm">Google • Mountain View, CA</p>
                          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                            Led development of web applications using React and Node.js...
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 border-b-2 pb-1 sm:pb-2 mb-2 sm:mb-3 md:mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {(resumeData.skills.technical.length > 0 ? resumeData.skills.technical : ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"]).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6 md:mt-8">
                <button 
                  onClick={aiEnhanceResume}
                  disabled={aiEnhancing}
                  className={`flex-1 px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${aiEnhancing
                    ? "bg-gray-400 cursor-not-allowed"
                    : isDark
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105"
                      : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105"
                    }`}
                >
                  {aiEnhancing ? (
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                  {aiEnhancing ? "Enhancing..." : "AI Enhance"}
                </button>
                <button className={`px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${isDark ? "bg-slate-800/80 border-2 border-purple-500/30 text-white hover:bg-slate-700 hover:border-purple-500/50" : "bg-purple-100 text-purple-700 border-2 border-purple-300 hover:bg-purple-200 hover:border-purple-400"}`}>
                  <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                  Save
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className={isDark ? "text-gray-400" : "text-gray-600"}>Resume Completion</span>
                  <span className="font-semibold text-purple-500">65%</span>
                </div>
                <div className={`w-full rounded-full h-1.5 sm:h-2 ${isDark ? "bg-slate-700" : "bg-gray-200"}`}>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 sm:h-2 rounded-full w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}