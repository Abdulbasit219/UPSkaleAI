import React from "react";
import { Upload, CheckCircle, Github, Linkedin, Globe } from "lucide-react";

const AttachmentsForm = ({
  formData,
  handleInputChange,
  handleFileUpload,
  isDark,
  isUploading,
}) => {
  return (
    <div className="space-y-6">
      <h2
        className={`text-2xl font-bold mb-6 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Attachments & Links
      </h2>

      {/* Resume Upload */}
      <div
        className={`border-2 border-dashed rounded-2xl p-6 text-center hover:border-purple-500/50 transition-colors ${
          isDark ? "border-purple-500/30" : "border-purple-300/30"
        }`}
      >
        <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
        <h3
          className={`text-lg font-semibold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Upload Resume
        </h3>
        <p
          className={`text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}
        >
          PDF, DOC, DOCX (Max 5MB)
        </p>
        <input
          type="file"
          onChange={(e) => handleFileUpload(e, "resume")}
          className="hidden"
          id="resume-upload"
          accept=".pdf,.doc,.docx"
        />
        <label
          htmlFor="resume-upload"
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all cursor-pointer inline-block"
        >
          Choose File
        </label>
        {isUploading && (
          <div className="mt-4 text-center text-purple-500">Uploading...</div>
        )}
        {formData.resume && !isUploading && (
          <div className="mt-4 flex items-center justify-center gap-2 text-green-400">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">
              {formData.resumeName || "Resume Uploaded"}
            </span>
          </div>
        )}
      </div>

      {/* Social Links */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            className={`block text-sm font-medium mb-2 flex items-center gap-2 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <Github className="w-4 h-4" />
            GitHub Profile
          </label>
          <input
            type="url"
            value={formData.github}
            onChange={(e) => handleInputChange("github", e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-purple-500 transition-colors ${
              isDark
                ? "bg-slate-800 border-slate-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="github.com/username"
          />
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 flex items-center gap-2 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn Profile
          </label>
          <input
            type="url"
            value={formData.linkedin}
            onChange={(e) => handleInputChange("linkedin", e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-purple-500 transition-colors ${
              isDark
                ? "bg-slate-800 border-slate-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="linkedin.com/in/username"
          />
        </div>
      </div>

      <div>
        <label
          className={`block text-sm font-medium mb-2 flex items-center gap-2 ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <Globe className="w-4 h-4" />
          Portfolio Website
        </label>
        <input
          type="url"
          value={formData.portfolio}
          onChange={(e) => handleInputChange("portfolio", e.target.value)}
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-purple-500 transition-colors ${
            isDark
              ? "bg-slate-800 border-slate-700 text-white"
              : "bg-white border-gray-300 text-gray-900"
          }`}
          placeholder="https://yourportfolio.com"
        />
      </div>
    </div>
  );
};

export default AttachmentsForm;
