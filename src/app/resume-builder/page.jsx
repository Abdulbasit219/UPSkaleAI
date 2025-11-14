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
    <div className={`min-h-screen pt-12 transition-colors duration-300 ${isDark ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white" : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 text-gray-900"}`}>
      {/* Enhanced Background Pattern */}
      <div className={`fixed inset-0 ${isDark ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-slate-950" : "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/40 via-gray-50 to-gray-100"}`} />
      <div className={`absolute inset-0 ${isDark ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC4yIiBvcGFjaXR5PSIwLjAyIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10" : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzdlM2I4ZiIgc3Ryb2tlLXdpZHRoPSIwLjIiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5"} pointer-events-none`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl mb-8 backdrop-blur-xl border ${isDark ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 text-purple-300" : "bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300 text-purple-700"}`}>
            <div className={`p-2 rounded-lg ${isDark ? "bg-purple-500/20" : "bg-purple-500/10"}`}>
              <Sparkles className={`w-5 h-5 ${isDark ? "text-yellow-400" : "text-yellow-600"}`} />
            </div>
            <span className="font-semibold text-lg">AI-Powered Resume Builder</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Build Your
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-300% animate-gradient">
              {" "}
              Perfect Resume
            </span>
          </h1>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Create a professional, ATS-friendly resume that stands out to employers and gets you more interviews
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Enhanced Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Tabs */}
            <div className={`backdrop-blur-xl border-2 rounded-3xl p-2 ${isDark ? "bg-slate-900/40 border-purple-500/20" : "bg-white/90 border-purple-300/30 shadow-lg"}`}>
              <div className="flex flex-wrap gap-2">
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
                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 flex-1 min-w-0 justify-center group ${activeTab === tab.id
                      ? isDark
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50"
                      : isDark
                        ? "text-gray-400 hover:text-gray-300 hover:bg-slate-800/50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/80"
                      }`}
                  >
                    <tab.icon className={`w-5 h-5 transition-transform duration-300 ${activeTab === tab.id ? "scale-110" : "group-hover:scale-105"}`} />
                    <span className="hidden sm:block">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Form Content */}
            <div className={`backdrop-blur-xl border-2 rounded-3xl p-8 ${isDark ? "bg-slate-900/40 border-purple-500/20" : "bg-white/90 border-purple-300/30 shadow-lg"}`}>
              {activeTab === "personal" && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-2xl ${isDark ? "bg-purple-500/20" : "bg-purple-100"}`}>
                      <User className={`w-6 h-6 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Personal Information</h3>
                      <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>Tell us about yourself</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`block text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        First Name
                      </label>
                      <input
                        type="text"
                        value={resumeData.personal.firstName}
                        onChange={(e) => handleInputChange("personal", "firstName", e.target.value)}
                        className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"}`}
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={`block text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={resumeData.personal.lastName}
                        onChange={(e) => handleInputChange("personal", "lastName", e.target.value)}
                        className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"}`}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`block text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Email
                      </label>
                      <div className="relative">
                        <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                        <input
                          type="email"
                          value={resumeData.personal.email}
                          onChange={(e) => handleInputChange("personal", "email", e.target.value)}
                          className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-300 ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"}`}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className={`block text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Phone
                      </label>
                      <div className="relative">
                        <Phone className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                        <input
                          type="tel"
                          value={resumeData.personal.phone}
                          onChange={(e) => handleInputChange("personal", "phone", e.target.value)}
                          className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-300 ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"}`}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Professional Summary
                    </label>
                    <div className="relative">
                      <Edit3 className={`absolute left-4 top-4 w-5 h-5 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                      <textarea
                        rows={4}
                        value={resumeData.personal.summary}
                        onChange={(e) => handleInputChange("personal", "summary", e.target.value)}
                        className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-300 resize-none ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"}`}
                        placeholder="Experienced software developer with 5+ years in web development..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "experience" && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-2xl ${isDark ? "bg-purple-500/20" : "bg-purple-100"}`}>
                        <Briefcase className={`w-6 h-6 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
                      </div>
                      <div>
                        <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Work Experience</h3>
                        <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>Add your professional experience</p>
                      </div>
                    </div>
                    <button 
                      onClick={addExperience}
                      className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${isDark ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30" : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50"}`}
                    >
                      <Plus className="w-5 h-5" />
                      Add Experience
                    </button>
                  </div>

                  <div className={`p-8 rounded-2xl border-2 ${isDark ? "bg-slate-800/30 border-purple-500/20" : "bg-white/50 border-purple-300/20"}`}>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className={`block text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          Company
                        </label>
                        <input
                          type="text"
                          value={currentExperience.company}
                          onChange={(e) => setCurrentExperience(prev => ({ ...prev, company: e.target.value }))}
                          className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"}`}
                          placeholder="Google"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className={`block text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          Position
                        </label>
                        <input
                          type="text"
                          value={currentExperience.position}
                          onChange={(e) => setCurrentExperience(prev => ({ ...prev, position: e.target.value }))}
                          className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"}`}
                          placeholder="Senior Software Engineer"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className={`block text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Description
                      </label>
                      <textarea
                        rows={4}
                        value={currentExperience.description}
                        onChange={(e) => setCurrentExperience(prev => ({ ...prev, description: e.target.value }))}
                        className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"}`}
                        placeholder="Describe your responsibilities and achievements..."
                      />
                    </div>
                  </div>

                  {/* Experience List */}
                  {resumeData.experience.length > 0 && (
                    <div className="space-y-4">
                      <h4 className={`text-lg font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>Added Experience</h4>
                      {resumeData.experience.map((exp, index) => (
                        <div key={exp.id} className={`p-4 rounded-2xl border ${isDark ? "bg-slate-800/30 border-purple-500/20" : "bg-white/50 border-purple-300/20"}`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-semibold text-lg">{exp.position}</h5>
                              <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>{exp.company}</p>
                            </div>
                            <button className={`p-2 rounded-lg ${isDark ? "hover:bg-slate-700/50" : "hover:bg-gray-100"}`}>
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "skills" && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-2xl ${isDark ? "bg-purple-500/20" : "bg-purple-100"}`}>
                      <Code className={`w-6 h-6 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Skills & Technologies</h3>
                      <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>Showcase your expertise</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <label className={`block text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Technical Skills
                      </label>
                      <div className="flex flex-wrap gap-3 mb-4">
                        {resumeData.skills.technical.map((skill, index) => (
                          <span key={index} className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 ${isDark ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 hover:border-purple-400" : "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-300 hover:border-purple-400"}`}>
                            {skill}
                            <button 
                              onClick={() => removeSkill("technical", index)}
                              className="hover:opacity-70 transition-opacity"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={currentSkill}
                          onChange={(e) => setCurrentSkill(e.target.value)}
                          className={`flex-1 px-4 py-4 rounded-2xl border-2 transition-all duration-300 ${isDark ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20" : "bg-white border-purple-300/50 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"}`}
                          placeholder="Add a technical skill..."
                          onKeyPress={(e) => e.key === 'Enter' && addSkill("technical")}
                        />
                        <button 
                          onClick={() => addSkill("technical")}
                          className={`px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${isDark ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30" : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50"}`}
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "design" && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-2xl ${isDark ? "bg-purple-500/20" : "bg-purple-100"}`}>
                      <Palette className={`w-6 h-6 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Resume Design</h3>
                      <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>Choose your preferred style</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {resumeStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setResumeStyle(style.id)}
                        className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 ${resumeStyle === style.id
                          ? isDark
                            ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500 shadow-lg shadow-purple-500/20"
                            : "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50"
                          : isDark
                            ? "bg-slate-800/30 border-purple-500/20 hover:border-purple-500/50"
                            : "bg-white border-purple-300/50 hover:border-purple-500"
                          }`}
                      >
                        <div className={`p-3 rounded-xl w-12 h-12 mb-4 ${resumeStyle === style.id
                          ? isDark ? "bg-purple-500/30" : "bg-white/20"
                          : isDark ? "bg-purple-500/20" : "bg-purple-100"
                          }`}>
                          <Layout className={`w-6 h-6 ${resumeStyle === style.id && !isDark ? "text-white" : isDark ? "text-purple-400" : "text-purple-600"}`} />
                        </div>
                        <h4 className="font-semibold text-lg mb-2">{style.name}</h4>
                        <p className={`text-sm ${resumeStyle === style.id && !isDark ? "text-white/90" : isDark ? "text-gray-400" : "text-gray-600"}`}>
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
            <div className={`sticky top-8 backdrop-blur-xl border-2 rounded-3xl p-8 ${isDark ? "bg-slate-900/40 border-purple-500/20" : "bg-white/90 border-purple-300/30 shadow-xl"}`}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Resume Preview</h3>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Real-time preview</p>
                </div>
                <div className="flex gap-3">
                  <button className={`p-3 rounded-2xl transition-all duration-300 ${isDark ? "hover:bg-slate-800/50 text-gray-400 hover:text-white" : "hover:bg-purple-100 text-gray-600 hover:text-purple-700"}`}>
                    <Eye className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={downloadResume}
                    className={`p-3 rounded-2xl transition-all duration-300 ${isDark ? "hover:bg-slate-800/50 text-gray-400 hover:text-white" : "hover:bg-purple-100 text-gray-600 hover:text-purple-700"}`}
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Enhanced Resume Preview */}
              <div className={`border-2 rounded-2xl p-8 min-h-[600px] transition-all duration-500 ${isDark ? "bg-slate-800/30 border-purple-500/20" : "bg-white border-purple-300/20 shadow-inner"}`}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {resumeData.personal.firstName || "John"} {resumeData.personal.lastName || "Doe"}
                  </h2>
                  <p className="text-gray-600 text-lg mb-4">Senior Software Engineer</p>
                  <div className="flex justify-center gap-6 text-sm text-gray-500">
                    <span>{resumeData.personal.email || "john@example.com"}</span>
                    <span>•</span>
                    <span>{resumeData.personal.phone || "+1 (555) 123-4567"}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 border-b-2 pb-2 mb-4">Professional Summary</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {resumeData.personal.summary || "Experienced software developer with 5+ years in web development..."}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 border-b-2 pb-2 mb-4">Experience</h3>
                    <div className="space-y-4">
                      {resumeData.experience.length > 0 ? (
                        resumeData.experience.map((exp, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-start">
                              <h4 className="font-semibold text-gray-900 text-lg">{exp.position}</h4>
                              <span className="text-sm text-gray-500 whitespace-nowrap">2020 - Present</span>
                            </div>
                            <p className="text-gray-600 text-sm">{exp.company} • Mountain View, CA</p>
                            <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                          </div>
                        ))
                      ) : (
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-gray-900 text-lg">Senior Software Engineer</h4>
                            <span className="text-sm text-gray-500">2020 - Present</span>
                          </div>
                          <p className="text-gray-600 text-sm">Google • Mountain View, CA</p>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            Led development of web applications using React and Node.js...
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 border-b-2 pb-2 mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {(resumeData.skills.technical.length > 0 ? resumeData.skills.technical : ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"]).map((skill, index) => (
                        <span key={index} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button 
                  onClick={aiEnhanceResume}
                  disabled={aiEnhancing}
                  className={`flex-1 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${aiEnhancing
                    ? "bg-gray-400 cursor-not-allowed"
                    : isDark
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105"
                      : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105"
                    }`}
                >
                  {aiEnhancing ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <Sparkles className="w-5 h-5" />
                  )}
                  {aiEnhancing ? "Enhancing..." : "AI Enhance"}
                </button>
                <button className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${isDark ? "bg-slate-800/80 border-2 border-purple-500/30 text-white hover:bg-slate-700 hover:border-purple-500/50" : "bg-purple-100 text-purple-700 border-2 border-purple-300 hover:bg-purple-200 hover:border-purple-400"}`}>
                  <Save className="w-5 h-5" />
                  Save
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className={isDark ? "text-gray-400" : "text-gray-600"}>Resume Completion</span>
                  <span className="font-semibold text-purple-500">65%</span>
                </div>
                <div className={`w-full rounded-full h-2 ${isDark ? "bg-slate-700" : "bg-gray-200"}`}>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}