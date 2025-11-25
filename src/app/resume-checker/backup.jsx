"use client";
import React, { useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  RefreshCw,
  Lightbulb,
  Download,
  Trophy,
  Brain,
  ShieldCheck,
  Zap,
  BarChart3,
  AlertCircle,
} from "lucide-react";
import { useSelector } from "react-redux";

export default function ATSResumeChecker() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

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

  const analyzeResume = async () => {
    if (!file) {
      setError("Please upload a resume file");
      return;
    }

    setAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);
      formData.append("analysisType", "percentage");

      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze resume");
      }

      // Set the results
      setResults({
        score: data.parsed.score,
        status: data.parsed.status,
        message: data.parsed.message,
        analysis: data.analysis,
      });
      
      setAnalyzed(true);
    } catch (err) {
      setError(err.message);
      console.error("Analysis error:", err);
    } finally {
      setAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setFile(null);
    setJobDescription("");
    setAnalyzed(false);
    setResults(null);
    setError(null);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "from-green-500 to-emerald-500";
    if (score >= 60) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
          : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50"
      } pt-20 pb-12`}
    >
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
            <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
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
          <div className="max-w-4xl mx-auto">
            {/* Job Description Input */}
            <div
              className={`backdrop-blur-xl border rounded-3xl p-8 mb-6 ${
                isDark
                  ? "bg-slate-900/50 border-purple-500/30"
                  : "bg-white/80 border-purple-300/30"
              }`}
            >
              <label
                className={`block text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Job Description
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                rows={6}
                className={`w-full px-4 py-3 rounded-xl border resize-none transition-colors ${
                  isDark
                    ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500/50"
                    : "bg-white border-purple-300/30 text-gray-900 placeholder-gray-400 focus:border-purple-300/50"
                } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
              />
            </div>

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

                {error && (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

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
                      className={`block bg-gradient-to-r ${getScoreColor(results?.score || 0)} bg-clip-text text-transparent`}
                    >
                      {results?.score || 0}/100
                    </span>
                  </h2>

                  <p
                    className={`text-xl mb-8 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {results?.message}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={resetAnalysis}
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
                        strokeDashoffset={
                          502.4 - (502.4 * (results?.score || 0)) / 100
                        }
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
                          className={`text-6xl font-bold bg-gradient-to-r ${getScoreColor(results?.score || 0)} bg-clip-text text-transparent`}
                        >
                          {results?.score || 0}
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

            {/* Full Analysis */}
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
                <BarChart3 className="w-6 h-6 text-purple-400" />
                Detailed Analysis
              </h3>
              <div
                className={`whitespace-pre-wrap ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                {results?.analysis}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}