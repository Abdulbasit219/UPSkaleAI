"use client";
import React, { useState, useEffect } from "react";
import {
  X,
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Building2,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  addExperience,
  updateExperience,
  addEducation,
  updateEducation,
} from "@/store/slices/profileSlice";

const FormModal = ({
  type = "experience",
  open,
  setOpen,
  editData = null,
  isDark,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const isExperience = type === "experience";

  // Get initial form state based on type
  const getInitialState = () => {
    if (isExperience) {
      return {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      };
    }
    return {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      current: false,
      grade: "",
      description: "",
    };
  };

  const [formData, setFormData] = useState(getInitialState());

  // Reset form when modal opens/closes or editData changes
  useEffect(() => {
    if (editData) {
      setFormData({ ...editData });
    } else {
      setFormData(getInitialState());
    }
  }, [editData, open, type]);

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: inputType === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (isExperience) {
      if (!formData.title?.trim()) {
        toast.error("Job title is required");
        return false;
      }
      if (!formData.company?.trim()) {
        toast.error("Company name is required");
        return false;
      }
    } else {
      if (!formData.institution?.trim()) {
        toast.error("Institution is required");
        return false;
      }
      if (!formData.degree?.trim()) {
        toast.error("Degree is required");
        return false;
      }
    }

    if (!formData.startDate) {
      toast.error("Start date is required");
      return false;
    }

    if (!formData.current && !formData.endDate) {
      toast.error("End date is required or mark as current");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      if (isExperience) {
        if (editData) {
          await dispatch(
            updateExperience({ experienceId: editData._id, data: formData })
          ).unwrap();
          toast.success("Experience updated successfully!");
        } else {
          await dispatch(addExperience(formData)).unwrap();
          toast.success("Experience added successfully!");
        }
      } else {
        if (editData) {
          await dispatch(
            updateEducation({ educationId: editData._id, data: formData })
          ).unwrap();
          toast.success("Education updated successfully!");
        } else {
          await dispatch(addEducation(formData)).unwrap();
          toast.success("Education added successfully!");
        }
      }
      setOpen(false);
    } catch (error) {
      toast.error(error?.message || `Failed to save ${type}`);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  const config = {
    experience: {
      icon: Briefcase,
      title: editData ? "Edit Experience" : "Add Experience",
      submitText: editData ? "Update" : "Add Experience",
    },
    education: {
      icon: GraduationCap,
      title: editData ? "Edit Education" : "Add Education",
      submitText: editData ? "Update" : "Add Education",
    },
  };

  const Icon = config[type].icon;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className={`w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl flex flex-col ${
          isDark ? "bg-gradient-to-br from-slate-900 to-slate-800" : "bg-white"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-4 sm:p-6 border-b ${isDark ? "border-slate-700" : "border-gray-200"}`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${isDark ? "bg-purple-500/10" : "bg-purple-100"}`}
            >
              <Icon
                className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-purple-600"}`}
              />
            </div>
            <h2
              className={`text-xl sm:text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              {config[type].title}
            </h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className={`cursor-pointer p-2 rounded-lg transition-colors ${isDark ? "hover:bg-slate-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1"
        >
          {/* Experience-specific fields */}
          {isExperience && (
            <>
              <div>
                <label
                  className={`block text-sm font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior Software Engineer"
                  className={`w-full px-3 py-2 rounded-lg border transition-colors ${isDark ? "bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-purple-500" : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-purple-500"} focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  Company <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                  />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Google"
                    className={`w-full pl-10 pr-3 py-2 rounded-lg border transition-colors ${isDark ? "bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-purple-500" : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-purple-500"} focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                  />
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  Location
                </label>
                <div className="relative">
                  <MapPin
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                  />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. San Francisco, CA"
                    className={`w-full pl-10 pr-3 py-2 rounded-lg border transition-colors ${isDark ? "bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-purple-500" : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-purple-500"} focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                  />
                </div>
              </div>
            </>
          )}

          {/* Education-specific fields */}
          {!isExperience && (
            <>
              <div>
                <label
                  className={`block text-sm font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  Institution <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="e.g., Harvard University"
                  className={`w-full px-3 py-2 rounded-lg border transition-colors ${isDark ? "bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-purple-500" : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-purple-500"} focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  Degree <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  placeholder="e.g., Bachelor of Science"
                  className={`w-full px-3 py-2 rounded-lg border transition-colors ${isDark ? "bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-purple-500" : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-purple-500"} focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  Field of Study
                </label>
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleChange}
                  placeholder="e.g., Computer Science"
                  className={`w-full px-3 py-2 rounded-lg border transition-colors ${isDark ? "bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-purple-500" : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-purple-500"} focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  Grade/GPA
                </label>
                <input
                  type="text"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  placeholder="e.g., 3.8/4.0 or First Class"
                  className={`w-full px-3 py-2 rounded-lg border transition-colors ${isDark ? "bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-purple-500" : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-purple-500"} focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                />
              </div>
            </>
          )}

          {/* Common fields - Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                className={`block text-sm font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Start Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                />
                <input
                  type="month"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 rounded-lg border transition-colors ${isDark ? "bg-slate-800 border-slate-700 text-white focus:border-purple-500" : "bg-white border-gray-300 text-gray-900 focus:border-purple-500"} focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                />
              </div>
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                End Date{" "}
                {!formData.current && <span className="text-red-500">*</span>}
              </label>
              <div className="relative">
                <Calendar
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                />
                <input
                  type="month"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  disabled={formData.current}
                  className={`w-full pl-10 pr-3 py-2 rounded-lg border transition-colors ${isDark ? "bg-slate-800 border-slate-700 text-white focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed" : "bg-white border-gray-300 text-gray-900 focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"} focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                />
              </div>
            </div>
          </div>

          {/* Current checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="current"
              id="current"
              checked={formData.current}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <label
              htmlFor="current"
              className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              {isExperience
                ? "I currently work here"
                : "I currently study here"}
            </label>
          </div>

          {/* Description */}
          <div>
            <label
              className={`block text-sm font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={
                isExperience
                  ? "Describe your role, responsibilities, and achievements..."
                  : "Describe your achievements, activities, or relevant coursework..."
              }
              rows={3}
              className={`w-full px-3 py-2 rounded-lg border transition-colors resize-none ${isDark ? "bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-purple-500" : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-purple-500"} focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className={`cursor-pointer flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors ${isDark ? "bg-slate-700 hover:bg-slate-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-900"}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`cursor-pointer flex-1 px-4 py-2.5 rounded-lg font-medium text-white ${loading ? "bg-purple-400 cursor-not-allowed" : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"}`}
            >
              {loading ? "Saving..." : config[type].submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
