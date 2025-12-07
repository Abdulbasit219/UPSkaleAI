"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Briefcase,
  MapPin,
  DollarSign,
  Building,
  Clock,
  Globe,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

export default function PostJobModal({ isOpen, onClose, isDark, onJobPosted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    logo: "💼",
    location: "",
    remote: false,
    type: "Full-time",
    experience: "",
    salary: "",
    description: "",
    requirements: [""],
    responsibilities: [""],
    skills: [""],
    featured: false,
    urgent: false,
    category: "tech",
    companyWebsite: "",
    applicationDeadline: "",
    benefits: [""],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Filter out empty strings from arrays
      const cleanedData = {
        ...formData,
        requirements: formData.requirements.filter((r) => r.trim() !== ""),
        responsibilities: formData.responsibilities.filter(
          (r) => r.trim() !== ""
        ),
        skills: formData.skills.filter((s) => s.trim() !== ""),
        benefits: formData.benefits.filter((b) => b.trim() !== ""),
        applicationDeadline: formData.applicationDeadline
          ? new Date(formData.applicationDeadline).toISOString()
          : "",
      };

      const response = await fetch("/api/jobs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to create job");
      }

      setSuccess(true);
      setTimeout(() => {
        onJobPosted && onJobPosted(data.data);
        onClose();
        // Reset form
        setFormData({
          title: "",
          company: "",
          logo: "💼",
          location: "",
          remote: false,
          type: "Full-time",
          experience: "",
          salary: "",
          description: "",
          requirements: [""],
          responsibilities: [""],
          skills: [""],
          featured: false,
          urgent: false,
          category: "tech",
          companyWebsite: "",
          applicationDeadline: "",
          benefits: [""],
        });
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border ${
          isDark
            ? "bg-slate-900 border-purple-500/30"
            : "bg-white border-purple-300/30"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`sticky top-0 z-10 flex items-center justify-between p-6 border-b backdrop-blur-xl ${
            isDark
              ? "bg-slate-900/95 border-purple-500/30"
              : "bg-white/95 border-purple-300/30"
          }`}
        >
          <div>
            <h2
              className={`text-2xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Post a New Job
            </h2>
            <p
              className={`text-sm mt-1 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Fill in the details to create a job posting
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-all ${
              isDark
                ? "hover:bg-slate-800 text-gray-400 hover:text-white"
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Success Message */}
          {success && (
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
              ✅ Job posted successfully! Redirecting...
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              ❌ {error}
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h3
              className={`text-lg font-semibold flex items-center gap-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              <Briefcase className="w-5 h-5 text-purple-400" />
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Job Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                    isDark
                      ? "bg-slate-800 border-purple-500/30 text-white focus:border-purple-500"
                      : "bg-white border-purple-300/30 text-gray-900 focus:border-purple-500"
                  }`}
                  placeholder="e.g., Senior React Developer"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Company Name *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                    isDark
                      ? "bg-slate-800 border-purple-500/30 text-white focus:border-purple-500"
                      : "bg-white border-purple-300/30 text-gray-900 focus:border-purple-500"
                  }`}
                  placeholder="e.g., TechCorp Inc."
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Logo Emoji
                </label>
                <input
                  type="text"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                    isDark
                      ? "bg-slate-800 border-purple-500/30 text-white focus:border-purple-500"
                      : "bg-white border-purple-300/30 text-gray-900 focus:border-purple-500"
                  }`}
                  placeholder="💼"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                    isDark
                      ? "bg-slate-800 border-purple-500/30 text-white focus:border-purple-500"
                      : "bg-white border-purple-300/30 text-gray-900 focus:border-purple-500"
                  }`}
                  placeholder="e.g., San Francisco, CA"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Job Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                    isDark
                      ? "bg-slate-800 border-purple-500/30 text-white focus:border-purple-500"
                      : "bg-white border-purple-300/30 text-gray-900 focus:border-purple-500"
                  }`}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                    isDark
                      ? "bg-slate-800 border-purple-500/30 text-white focus:border-purple-500"
                      : "bg-white border-purple-300/30 text-gray-900 focus:border-purple-500"
                  }`}
                >
                  <option value="tech">Tech</option>
                  <option value="intern">Internship</option>
                  <option value="remote">Remote</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Experience Level *
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                    isDark
                      ? "bg-slate-800 border-purple-500/30 text-white focus:border-purple-500"
                      : "bg-white border-purple-300/30 text-gray-900 focus:border-purple-500"
                  }`}
                  placeholder="e.g., 3-5 years"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Salary Range *
                </label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                    isDark
                      ? "bg-slate-800 border-purple-500/30 text-white focus:border-purple-500"
                      : "bg-white border-purple-300/30 text-gray-900 focus:border-purple-500"
                  }`}
                  placeholder="e.g., $80K - $120K"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Company Website
                </label>
                <input
                  type="url"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                    isDark
                      ? "bg-slate-800 border-purple-500/30 text-white focus:border-purple-500"
                      : "bg-white border-purple-300/30 text-gray-900 focus:border-purple-500"
                  }`}
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Application Deadline
                </label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                    isDark
                      ? "bg-slate-800 border-purple-500/30 text-white focus:border-purple-500"
                      : "bg-white border-purple-300/30 text-gray-900 focus:border-purple-500"
                  }`}
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="remote"
                  checked={formData.remote}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-purple-500/30 text-purple-500 focus:ring-purple-500"
                />
                <span
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Remote Position
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-purple-500/30 text-purple-500 focus:ring-purple-500"
                />
                <span
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Featured Job
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="urgent"
                  checked={formData.urgent}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-purple-500/30 text-purple-500 focus:ring-purple-500"
                />
                <span
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Urgent Hiring
                </span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Job Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className={`w-full px-4 py-3 rounded-lg border outline-none transition-all resize-none ${
                isDark
                  ? "bg-slate-800 border-purple-500/30 text-white focus:border-purple-500"
                  : "bg-white border-purple-300/30 text-gray-900 focus:border-purple-500"
              }`}
              placeholder="Describe the role, responsibilities, and what makes this opportunity great..."
            />
          </div>

          {/* Skills */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Required Skills *
            </label>
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) =>
                    handleArrayChange("skills", index, e.target.value)
                  }
                  className={`flex-1 px-4 py-3 rounded-lg border outline-none transition-all ${
                    isDark
                      ? "bg-slate-800 border-purple-500/30 text-white focus:border-purple-500"
                      : "bg-white border-purple-300/30 text-gray-900 focus:border-purple-500"
                  }`}
                  placeholder="e.g., React, TypeScript"
                />
                {formData.skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("skills", index)}
                    className={`px-3 py-3 rounded-lg border transition-all ${
                      isDark
                        ? "bg-slate-800 border-red-500/30 text-red-400 hover:bg-red-500/10"
                        : "bg-white border-red-300/30 text-red-600 hover:bg-red-50"
                    }`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("skills")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                isDark
                  ? "bg-slate-800 border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                  : "bg-white border-purple-300/30 text-purple-600 hover:bg-purple-50"
              }`}
            >
              <Plus className="w-4 h-4" />
              Add Skill
            </button>
          </div>

          {/* Requirements */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Requirements
            </label>
            {formData.requirements.map((req, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={req}
                  onChange={(e) =>
                    handleArrayChange("requirements", index, e.target.value)
                  }
                  className={`flex-1 px-4 py-3 rounded-lg border outline-none transition-all ${
                    isDark
                      ? "bg-slate-800 border-purple-500/30 text-white focus:border-purple-500"
                      : "bg-white border-purple-300/30 text-gray-900 focus:border-purple-500"
                  }`}
                  placeholder="e.g., Bachelor's degree in Computer Science"
                />
                {formData.requirements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("requirements", index)}
                    className={`px-3 py-3 rounded-lg border transition-all ${
                      isDark
                        ? "bg-slate-800 border-red-500/30 text-red-400 hover:bg-red-500/10"
                        : "bg-white border-red-300/30 text-red-600 hover:bg-red-50"
                    }`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("requirements")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                isDark
                  ? "bg-slate-800 border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                  : "bg-white border-purple-300/30 text-purple-600 hover:bg-purple-50"
              }`}
            >
              <Plus className="w-4 h-4" />
              Add Requirement
            </button>
          </div>

          {/* Responsibilities */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Responsibilities
            </label>
            {formData.responsibilities.map((resp, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={resp}
                  onChange={(e) =>
                    handleArrayChange("responsibilities", index, e.target.value)
                  }
                  className={`flex-1 px-4 py-3 rounded-lg border outline-none transition-all ${
                    isDark
                      ? "bg-slate-800 border-purple-500/30 text-white focus:border-purple-500"
                      : "bg-white border-purple-300/30 text-gray-900 focus:border-purple-500"
                  }`}
                  placeholder="e.g., Design and implement new features"
                />
                {formData.responsibilities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("responsibilities", index)}
                    className={`px-3 py-3 rounded-lg border transition-all ${
                      isDark
                        ? "bg-slate-800 border-red-500/30 text-red-400 hover:bg-red-500/10"
                        : "bg-white border-red-300/30 text-red-600 hover:bg-red-50"
                    }`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("responsibilities")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                isDark
                  ? "bg-slate-800 border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                  : "bg-white border-purple-300/30 text-purple-600 hover:bg-purple-50"
              }`}
            >
              <Plus className="w-4 h-4" />
              Add Responsibility
            </button>
          </div>

          {/* Benefits */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Benefits
            </label>
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) =>
                    handleArrayChange("benefits", index, e.target.value)
                  }
                  className={`flex-1 px-4 py-3 rounded-lg border outline-none transition-all ${
                    isDark
                      ? "bg-slate-800 border-purple-500/30 text-white focus:border-purple-500"
                      : "bg-white border-purple-300/30 text-gray-900 focus:border-purple-500"
                  }`}
                  placeholder="e.g., Health insurance, 401k matching"
                />
                {formData.benefits.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("benefits", index)}
                    className={`px-3 py-3 rounded-lg border transition-all ${
                      isDark
                        ? "bg-slate-800 border-red-500/30 text-red-400 hover:bg-red-500/10"
                        : "bg-white border-red-300/30 text-red-600 hover:bg-red-50"
                    }`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("benefits")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                isDark
                  ? "bg-slate-800 border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                  : "bg-white border-purple-300/30 text-purple-600 hover:bg-purple-50"
              }`}
            >
              <Plus className="w-4 h-4" />
              Add Benefit
            </button>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Briefcase className="w-5 h-5" />
                  Post Job
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-semibold transition-all border ${
                isDark
                  ? "bg-slate-800 border-purple-500/30 text-white hover:bg-slate-700"
                  : "bg-white border-purple-300/30 text-gray-900 hover:bg-gray-100"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
