import React from "react";
import { Upload, FileText, RefreshCw, Sparkles, Briefcase } from "lucide-react";

export default function ResumeUpload({
  file,
  dragActive,
  analyzing,
  handleDrag,
  handleDrop,
  handleFileChange,
  setFile,
  analyzeResume,
  jobDescription,
  setJobDescription,
  isDark,
}) {
  return (
    <div className="space-y-6">
      {/* Job Description Input */}
      <div
        className={`backdrop-blur-xl border rounded-3xl p-6 transition-all ${
          isDark
            ? "bg-slate-900/50 border-purple-500/30"
            : "bg-white/80 border-purple-300/30"
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDark
                ? "bg-purple-500/20 text-purple-400"
                : "bg-purple-100 text-purple-600"
            }`}
          >
            <Briefcase className="w-5 h-5" />
          </div>
          <h3
            className={`text-lg font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Job Description (Optional)
          </h3>
        </div>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here to get tailored keywords and insights..."
          className={`w-full h-32 p-4 rounded-xl border resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
            isDark
              ? "bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-500"
              : "bg-white border-purple-200 text-gray-900 placeholder-gray-400"
          }`}
        />
      </div>

      {/* File Upload Area */}
      <div
        className={`backdrop-blur-xl border-2 border-dashed rounded-3xl p-8 md:p-12 text-center transition-all ${
          dragActive
            ? "border-purple-500 bg-purple-500/10 scale-[1.02]"
            : isDark
              ? "border-purple-500/30 bg-slate-900/50 hover:border-purple-500/50"
              : "border-purple-300/50 bg-white/80 hover:border-purple-400/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
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
                className={`w-10 h-10 ${
                  isDark ? "text-purple-400" : "text-purple-600"
                }`}
              />
            ) : (
              <Upload
                className={`w-10 h-10 ${
                  isDark ? "text-purple-400" : "text-purple-600"
                }`}
              />
            )}
          </div>
        </div>

        {file ? (
          <div className="mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <FileText
                className={`w-5 h-5 ${
                  isDark ? "text-purple-400" : "text-purple-600"
                }`}
              />
              <span
                className={`font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
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
              className={`text-2xl font-bold mb-3 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
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
          className={`text-sm mt-6 ${
            isDark ? "text-gray-500" : "text-gray-400"
          }`}
        >
          Supported formats: PDF, DOC, DOCX (Max 5MB)
        </p>
      </div>
    </div>
  );
}
