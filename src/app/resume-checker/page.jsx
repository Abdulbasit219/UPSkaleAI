"use client";
import React, { useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  TrendingUp,
  Award,
  Target,
  Zap,
  Eye,
  Download,
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
} from "lucide-react";
import { useSelector } from "react-redux";
export default function ATSResumeChecker() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

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
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
          : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50"
      } pt-20 pb-12`}
    >
      {/* Background Pattern */}
      <div
        className={`fixed inset-0 pointer-events-none ${
          isDark
            ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"
            : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iZ3JheSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMDMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full mb-6 backdrop-blur-sm ${
              isDark
                ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30"
                : "bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300/30"
            }`}
          >
            <Brain
              className={`w-4 h-4 ${isDark ? "text-purple-400" : "text-purple-600"}`}
            />
            <span
              className={`text-sm font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent`}
            >
              AI-Powered ATS Analysis
            </span>
          </div>

          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            ATS Resume
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              Checker
            </span>
          </h1>
          <p
            className={`text-xl max-w-3xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Get your resume past the bots. Optimize for Applicant Tracking
            Systems and increase your chances of landing interviews.
          </p>
        </div>

        {!analyzed ? (
          /* Upload Section */
          <div className="max-w-4xl mx-auto">
            {/* Upload Box */}
            <div
              className={`relative backdrop-blur-xl border-2 border-dashed rounded-3xl p-12 transition-all ${
                isDark
                  ? "bg-slate-900/50 border-purple-500/30 hover:border-purple-500/50"
                  : "bg-white/80 border-purple-300/30 hover:border-purple-300/50"
              } ${dragActive ? (isDark ? "border-purple-500 bg-purple-500/10" : "border-purple-400 bg-purple-50") : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center border ${
                      isDark
                        ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30"
                        : "bg-gradient-to-br from-purple-100 to-pink-100 border-purple-300/30"
                    }`}
                  >
                    {file ? (
                      <FileText
                        className={`w-10 h-10 ${isDark ? "text-purple-400" : "text-purple-600"}`}
                      />
                    ) : (
                      <Upload
                        className={`w-10 h-10 ${isDark ? "text-purple-400" : "text-purple-600"}`}
                      />
                    )}
                  </div>
                </div>

                {file ? (
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <FileText
                        className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-purple-600"}`}
                      />
                      <span
                        className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                      >
                        {file.name}
                      </span>
                    </div>
                    <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                ) : (
                  <>
                    <h3
                      className={`text-2xl font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      Drop your resume here
                    </h3>
                    <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                      or click to browse files
                    </p>
                  </>
                )}

                <input
                  type="file"
                  id="resume-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {!file ? (
                    <label
                      htmlFor="resume-upload"
                      className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Upload className="w-5 h-5" />
                      Choose File
                    </label>
                  ) : (
                    <>
                      <button
                        onClick={analyzeResume}
                        disabled={analyzing}
                        className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {analyzing ? (
                          <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            Analyze Resume
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setFile(null)}
                        className={`px-8 py-4 border rounded-xl font-semibold transition-all ${
                          isDark
                            ? "bg-slate-800/80 border-purple-500/30 text-white hover:bg-slate-700"
                            : "bg-white border-purple-300/30 text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        Remove File
                      </button>
                    </>
                  )}
                </div>

                <p
                  className={`text-sm mt-6 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                >
                  Supported formats: PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: <Brain className="w-6 h-6" />,
                  title: "AI-Powered Analysis",
                  description:
                    "Advanced algorithms scan your resume like real ATS systems",
                },
                {
                  icon: <ShieldCheck className="w-6 h-6" />,
                  title: "Secure & Private",
                  description:
                    "Your resume is never stored or shared with third parties",
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: "Instant Results",
                  description:
                    "Get detailed feedback in seconds with actionable insights",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className={`backdrop-blur-xl border rounded-2xl p-6 transition-all ${
                    isDark
                      ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/40"
                      : "bg-white/80 border-purple-300/20 hover:border-purple-300/40"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      isDark
                        ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                        : "bg-gradient-to-br from-purple-100 to-pink-100"
                    }`}
                  >
                    <div
                      className={isDark ? "text-purple-400" : "text-purple-600"}
                    >
                      {feature.icon}
                    </div>
                  </div>
                  <h3
                    className={`text-lg font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    {feature.title}
                  </h3>
                  <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Results Section */
          <div className="space-y-8">
            {/* Overall Score */}
            <div
              className={`backdrop-blur-xl border rounded-3xl p-8 md:p-12 ${
                isDark
                  ? "bg-slate-900/50 border-purple-500/30"
                  : "bg-white/80 border-purple-300/30"
              }`}
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full mb-6 ${
                      isDark
                        ? "bg-purple-500/20 border-purple-500/30"
                        : "bg-purple-100 border-purple-300/30"
                    }`}
                  >
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span
                      className={`text-sm font-medium ${isDark ? "text-purple-300" : "text-purple-700"}`}
                    >
                      ATS Score
                    </span>
                  </div>

                  <h2
                    className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Your resume scores
                    <span
                      className={`block bg-gradient-to-r ${getScoreColor(atsScore)} bg-clip-text text-transparent`}
                    >
                      {atsScore}/100
                    </span>
                  </h2>

                  <p
                    className={`text-xl mb-8 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {results.overall.message}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Download Report
                    </button>
                    <button
                      className={`px-6 py-3 border rounded-xl font-semibold transition-all flex items-center gap-2 ${
                        isDark
                          ? "bg-slate-800/80 border-purple-500/30 text-white hover:bg-slate-700"
                          : "bg-white border-purple-300/30 text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <RefreshCw className="w-5 h-5" />
                      Analyze Another
                    </button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="relative">
                    <svg
                      className="w-64 h-64 transform -rotate-90"
                      viewBox="0 0 200 200"
                    >
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        stroke={isDark ? "#1e293b" : "#e2e8f0"}
                        strokeWidth="20"
                        fill="none"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        stroke="url(#scoreGradient)"
                        strokeWidth="20"
                        fill="none"
                        strokeDasharray="502.4"
                        strokeDashoffset={502.4 - (502.4 * atsScore) / 100}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient
                          id="scoreGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div
                          className={`text-6xl font-bold bg-gradient-to-r ${getScoreColor(atsScore)} bg-clip-text text-transparent`}
                        >
                          {atsScore}
                        </div>
                        <div
                          className={isDark ? "text-gray-400" : "text-gray-600"}
                        >
                          out of 100
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Sections */}
            <div className="grid lg:grid-cols-2 gap-6">
              {results.sections.map((section, idx) => (
                <div
                  key={idx}
                  className={`backdrop-blur-xl border rounded-2xl p-6 transition-all ${
                    isDark
                      ? "bg-slate-900/50 border-purple-500/20 hover:border-purple-500/40"
                      : "bg-white/80 border-purple-300/20 hover:border-purple-300/40"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isDark
                            ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                            : "bg-gradient-to-br from-purple-100 to-pink-100"
                        }`}
                      >
                        <div
                          className={
                            isDark ? "text-purple-400" : "text-purple-600"
                          }
                        >
                          {section.icon}
                        </div>
                      </div>
                      <div>
                        <h3
                          className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                        >
                          {section.name}
                        </h3>
                        <p
                          className={isDark ? "text-gray-400" : "text-gray-600"}
                        >
                          {section.details}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div
                        className={`text-2xl font-bold bg-gradient-to-r ${getScoreColor(section.score)} bg-clip-text text-transparent`}
                      >
                        {section.score}%
                      </div>
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${
                          getStatusBadge(section.status, isDark).color
                        }`}
                      >
                        {getStatusBadge(section.status, isDark).icon}
                        <span className="capitalize">
                          {section.status.replace("-", " ")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    {section.suggestions.map((suggestion, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <Lightbulb className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <span
                          className={isDark ? "text-gray-400" : "text-gray-600"}
                        >
                          {suggestion}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Keywords Analysis */}
            <div className="grid md:grid-cols-2 gap-6">
              <div
                className={`backdrop-blur-xl border rounded-2xl p-6 ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20"
                    : "bg-white/80 border-purple-300/20"
                }`}
              >
                <h3
                  className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                  Keywords Found ({results.keywords.found.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {results.keywords.found.map((keyword, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1.5 rounded-lg text-sm border font-medium ${
                        isDark
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-green-100 text-green-700 border-green-200"
                      }`}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className={`backdrop-blur-xl border rounded-2xl p-6 ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20"
                    : "bg-white/80 border-purple-300/20"
                }`}
              >
                <h3
                  className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  <AlertCircle className="w-6 h-6 text-red-400" />
                  Missing Keywords ({results.keywords.missing.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {results.keywords.missing.map((keyword, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1.5 rounded-lg text-sm border font-medium ${
                        isDark
                          ? "bg-red-500/10 text-red-400 border-red-500/20"
                          : "bg-red-100 text-red-700 border-red-200"
                      }`}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div
              className={`backdrop-blur-xl border rounded-2xl p-6 ${
                isDark
                  ? "bg-slate-900/50 border-purple-500/20"
                  : "bg-white/80 border-purple-300/20"
              }`}
            >
              <h3
                className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                <BarChart3 className="w-6 h-6 text-purple-400" />
                Resume Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {[
                  {
                    label: "Total Words",
                    value: results.statistics.totalWords,
                    icon: <FileText className="w-5 h-5" />,
                  },
                  {
                    label: "Bullet Points",
                    value: results.statistics.bulletPoints,
                    icon: <CheckCircle2 className="w-5 h-5" />,
                  },
                  {
                    label: "Sections",
                    value: results.statistics.sections,
                    icon: <BarChart3 className="w-5 h-5" />,
                  },
                  {
                    label: "Pages",
                    value: results.statistics.pages,
                    icon: <FileCheck className="w-5 h-5" />,
                  },
                  {
                    label: "Reading Time",
                    value: results.statistics.readingTime,
                    icon: <Clock className="w-5 h-5" />,
                  },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="flex justify-center mb-2">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isDark
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {stat.icon}
                      </div>
                    </div>
                    <div
                      className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      {stat.value}
                    </div>
                    <div className={isDark ? "text-gray-400" : "text-gray-600"}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Banner */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
              <div className="relative z-10 text-center">
                <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to optimize your resume?
                </h2>
                <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                  Let our AI rewrite your resume to maximize ATS compatibility
                  and get more interviews
                </p>
                <button className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 mx-auto">
                  <Sparkles className="w-5 h-5" />
                  Optimize with AI
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
