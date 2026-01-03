"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Send,
  Upload,
  FileText,
  Github,
  Linkedin,
  Globe,
  User,
  Mail,
  Phone,
  MapPin,
  Award,
  Briefcase,
  BookOpen,
  Sparkles,
  Zap,
  CheckCircle,
  X,
  Clock,
  Building,
  DollarSign,
  Users,
  Target,
  Star,
  Shield,
  IdCardLanyard,
} from "lucide-react";
import { useSelector } from "react-redux";
import BackgroundPattern from "@/components/ui/BackgroundPattern";
import Link from "next/link";
import { jobsApi } from "@/lib/api.config";

export default function QuickApplyPage({ params }) {
  const { id } = React.use(params);
  const [currentStep, setCurrentStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    coverLetter: "",
    salaryExpectation: "",
    availability: "",
    resume: null,
    portfolio: "",
    github: "",
    linkedin: "",
    remoteOk: false,
    relocationOk: false,
  });
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";
  const [jobDetails, setJobDetails] = useState(null);

  const getJobDetails = async () => {
    if (!id) return;
    try {
      const response = await jobsApi.getById(id);
      if (response.data.success) {
        setJobDetails(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  useEffect(() => {
    getJobDetails();
  }, [id]);

  const steps = [
    { number: 1, title: "Personal Info", icon: <User className="w-4 h-4" /> },
    { number: 2, title: "Application", icon: <FileText className="w-4 h-4" /> },
    { number: 3, title: "Attachments", icon: <Upload className="w-4 h-4" /> },
    { number: 4, title: "Review", icon: <CheckCircle className="w-4 h-4" /> },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = async (event, field) => {
    const file = event.target.files[0];
    if (file) {
      if (field === "resume") {
        setIsUploading(true);
        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
          const response = await jobsApi.uploadResume(uploadData);

          setFormData((prev) => ({
            ...prev,
            resume: response.data.url,
            resumeName: file.name,
          }));
        } catch (error) {
          console.error("Error uploading file:", error);
          alert("Failed to upload resume. Please try again.");
        } finally {
          setIsUploading(false);
        }
      }
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (
          !formData.fullName ||
          !formData.email ||
          !formData.phone ||
          !formData.location
        ) {
          alert("Please fill in all required personal information fields.");
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          alert("Please enter a valid email address.");
          return false;
        }
        return true;
      case 2:
        if (!formData.coverLetter || formData.coverLetter.length < 50) {
          alert("Cover letter must be at least 50 characters long.");
          return false;
        }
        return true;
      case 3:
        if (!formData.resume) {
          alert("Please upload your resume.");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    try {
      const response = await jobsApi.apply({
        jobId: id,
        coverLetter: formData.coverLetter,
        resume: formData.resume,
        notes: `Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nLocation: ${formData.location}\nSalary Expectation: ${formData.salaryExpectation}\nAvailability: ${formData.availability}\nGitHub: ${formData.github}\nLinkedIn: ${formData.linkedin}\nPortfolio: ${formData.portfolio}\nRemote OK: ${formData.remoteOk}\nRelocation OK: ${formData.relocationOk}`,
      });

      if (response.data.success) {
        setCurrentStep(5); // Success step
      } else {
        alert(response.data.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert(
        error.response?.data?.message ||
          "Failed to submit application. Please try again."
      );
    }
  };

  const progress = (currentStep / steps.length) * 100;

  if (currentStep === 5) {
    return (
      <>
        <div
          className={`min-h-screen transition-colors duration-300 flex items-center justify-center px-4 ${
            isDark
              ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white"
              : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 text-gray-900"
          }`}
        >
          <div className="max-w-md w-full text-center pt-20">
            <div
              className={`backdrop-blur-sm border rounded-2xl p-8 ${
                isDark
                  ? "bg-slate-900/50 border-green-500/30"
                  : "bg-white/80 border-green-400/30"
              }`}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2
                className={`text-3xl font-bold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Application Sent!
              </h2>
              <p
                className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Your application for{" "}
                <span
                  className={`font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {jobDetails?.title}
                </span>{" "}
                at{" "}
                <span
                  className={`font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {jobDetails?.company}
                </span>{" "}
                has been submitted successfully.
              </p>
              <div className="space-y-3">
                <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                  Track Application
                </button>
                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-all border ${
                    isDark
                      ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
                      : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  Browse More Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          isDark
            ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white"
            : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 text-gray-900"
        }`}
      >
        {/* Background Pattern */}
        <BackgroundPattern />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href={`/jobsearch`}
              className={`flex items-center gap-2 transition-colors ${
                isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Jobs
            </Link>
            <div className="text-center">
              <h1
                className={`text-3xl font-bold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Quick Apply
              </h1>
              <div
                className={`flex items-center gap-4 text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <div className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  {jobDetails?.company || "Loading..."}
                </div>
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4 text-green-400" />
                  {jobDetails?.match || 0}% Match
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {jobDetails?.posted || "Recently"}
                </div>
              </div>
            </div>
            <div className="w-24"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Application Form */}
            <div className="lg:col-span-2">
              <div
                className={`backdrop-blur-sm border rounded-2xl p-6 ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20"
                    : "bg-white/80 border-purple-300/30"
                }`}
              >
                {/* Progress Steps */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    {steps.map((step, index) => (
                      <div
                        key={step.number}
                        className="flex items-center gap-3"
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            currentStep >= step.number
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                              : `${
                                  isDark
                                    ? "bg-slate-800 text-gray-400 border border-slate-700"
                                    : "bg-white text-gray-400 border border-gray-300"
                                }`
                          }`}
                        >
                          {currentStep > step.number ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            step.icon
                          )}
                        </div>
                        <span
                          className={`font-medium hidden sm:block ${
                            currentStep >= step.number
                              ? "text-white"
                              : isDark
                                ? "text-gray-400"
                                : "text-gray-600"
                          }`}
                        >
                          {step.title}
                        </span>
                        {index < steps.length - 1 && (
                          <div
                            className={`w-8 h-0.5 mx-2 hidden sm:block ${
                              isDark ? "bg-slate-700" : "bg-gray-300"
                            }`}
                          ></div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div
                    className={`w-full rounded-full h-2 ${
                      isDark ? "bg-slate-800" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Step 1: Personal Info */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2
                      className={`text-2xl font-bold mb-6 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Personal Information
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Full Name
                        </label>
                        <div className="relative">
                          <User
                            className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          />
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) =>
                              handleInputChange("fullName", e.target.value)
                            }
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:border-purple-500 transition-colors ${
                              isDark
                                ? "bg-slate-800 border-slate-700 text-white"
                                : "bg-white border-gray-300 text-gray-900"
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Email
                        </label>
                        <div className="relative">
                          <Mail
                            className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:border-purple-500 transition-colors ${
                              isDark
                                ? "bg-slate-800 border-slate-700 text-white"
                                : "bg-white border-gray-300 text-gray-900"
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Phone
                        </label>
                        <div className="relative">
                          <Phone
                            className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:border-purple-500 transition-colors ${
                              isDark
                                ? "bg-slate-800 border-slate-700 text-white"
                                : "bg-white border-gray-300 text-gray-900"
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Location
                        </label>
                        <div className="relative">
                          <MapPin
                            className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          />
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) =>
                              handleInputChange("location", e.target.value)
                            }
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:border-purple-500 transition-colors ${
                              isDark
                                ? "bg-slate-800 border-slate-700 text-white"
                                : "bg-white border-gray-300 text-gray-900"
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.remoteOk}
                          onChange={(e) =>
                            handleInputChange("remoteOk", e.target.checked)
                          }
                          className={`w-4 h-4 text-purple-500 border rounded focus:ring-purple-500 ${
                            isDark
                              ? "bg-slate-800 border-slate-700"
                              : "bg-white border-gray-300"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Open to remote work
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.relocationOk}
                          onChange={(e) =>
                            handleInputChange("relocationOk", e.target.checked)
                          }
                          className={`w-4 h-4 text-purple-500 border rounded focus:ring-purple-500 ${
                            isDark
                              ? "bg-slate-800 border-slate-700"
                              : "bg-white border-gray-300"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Willing to relocate
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Application Details */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2
                      className={`text-2xl font-bold mb-6 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Application Details
                    </h2>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Cover Letter
                      </label>
                      <textarea
                        value={formData.coverLetter}
                        onChange={(e) =>
                          handleInputChange("coverLetter", e.target.value)
                        }
                        rows={8}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-purple-500 transition-colors resize-none ${
                          isDark
                            ? "bg-slate-800 border-slate-700 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                        placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Salary Expectation
                        </label>
                        <div className="relative">
                          <DollarSign
                            className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          />
                          <input
                            type="text"
                            value={formData.salaryExpectation}
                            onChange={(e) =>
                              handleInputChange(
                                "salaryExpectation",
                                e.target.value
                              )
                            }
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:border-purple-500 transition-colors ${
                              isDark
                                ? "bg-slate-800 border-slate-700 text-white"
                                : "bg-white border-gray-300 text-gray-900"
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Availability
                        </label>
                        <div className="relative">
                          <Clock
                            className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          />
                          <input
                            type="text"
                            value={formData.availability}
                            onChange={(e) =>
                              handleInputChange("availability", e.target.value)
                            }
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:border-purple-500 transition-colors ${
                              isDark
                                ? "bg-slate-800 border-slate-700 text-white"
                                : "bg-white border-gray-300 text-gray-900"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Attachments */}
                {currentStep === 3 && (
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
                        className={`text-sm mb-4 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
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
                        <div className="mt-4 text-center text-purple-500">
                          Uploading...
                        </div>
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
                          onChange={(e) =>
                            handleInputChange("github", e.target.value)
                          }
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
                          onChange={(e) =>
                            handleInputChange("linkedin", e.target.value)
                          }
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
                        onChange={(e) =>
                          handleInputChange("portfolio", e.target.value)
                        }
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-purple-500 transition-colors ${
                          isDark
                            ? "bg-slate-800 border-slate-700 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Review */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h2
                      className={`text-2xl font-bold mb-6 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Review Your Application
                    </h2>

                    <div className="space-y-4">
                      <div
                        className={`rounded-xl p-4 border ${
                          isDark
                            ? "bg-slate-800/50 border-purple-500/20"
                            : "bg-gray-50 border-purple-300/20"
                        }`}
                      >
                        <h3
                          className={`text-lg font-semibold mb-3 ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Personal Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span
                              className={
                                isDark ? "text-gray-400" : "text-gray-600"
                              }
                            >
                              Name:
                            </span>{" "}
                            <span
                              className={
                                isDark ? "text-white" : "text-gray-900"
                              }
                            >
                              {formData.fullName}
                            </span>
                          </div>
                          <div>
                            <span
                              className={
                                isDark ? "text-gray-400" : "text-gray-600"
                              }
                            >
                              Email:
                            </span>{" "}
                            <span
                              className={
                                isDark ? "text-white" : "text-gray-900"
                              }
                            >
                              {formData.email}
                            </span>
                          </div>
                          <div>
                            <span
                              className={
                                isDark ? "text-gray-400" : "text-gray-600"
                              }
                            >
                              Phone:
                            </span>{" "}
                            <span
                              className={
                                isDark ? "text-white" : "text-gray-900"
                              }
                            >
                              {formData.phone}
                            </span>
                          </div>
                          <div>
                            <span
                              className={
                                isDark ? "text-gray-400" : "text-gray-600"
                              }
                            >
                              Location:
                            </span>{" "}
                            <span
                              className={
                                isDark ? "text-white" : "text-gray-900"
                              }
                            >
                              {formData.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`rounded-xl p-4 border ${
                          isDark
                            ? "bg-slate-800/50 border-purple-500/20"
                            : "bg-gray-50 border-purple-300/20"
                        }`}
                      >
                        <h3
                          className={`text-lg font-semibold mb-3 ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Application Details
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span
                              className={
                                isDark ? "text-gray-400" : "text-gray-600"
                              }
                            >
                              Salary Expectation:
                            </span>{" "}
                            <span
                              className={
                                isDark ? "text-white" : "text-gray-900"
                              }
                            >
                              {formData.salaryExpectation}
                            </span>
                          </div>
                          <div>
                            <span
                              className={
                                isDark ? "text-gray-400" : "text-gray-600"
                              }
                            >
                              Availability:
                            </span>{" "}
                            <span
                              className={
                                isDark ? "text-white" : "text-gray-900"
                              }
                            >
                              {formData.availability}
                            </span>
                          </div>
                          <div>
                            <span
                              className={
                                isDark ? "text-gray-400" : "text-gray-600"
                              }
                            >
                              Remote Work:
                            </span>{" "}
                            <span
                              className={
                                isDark ? "text-white" : "text-gray-900"
                              }
                            >
                              {formData.remoteOk ? "Yes" : "No"}
                            </span>
                          </div>
                          <div>
                            <span
                              className={
                                isDark ? "text-gray-400" : "text-gray-600"
                              }
                            >
                              Relocation:
                            </span>{" "}
                            <span
                              className={
                                isDark ? "text-white" : "text-gray-900"
                              }
                            >
                              {formData.relocationOk ? "Yes" : "No"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`rounded-xl p-4 border ${
                          isDark
                            ? "bg-slate-800/50 border-purple-500/20"
                            : "bg-gray-50 border-purple-300/20"
                        }`}
                      >
                        <h3
                          className={`text-lg font-semibold mb-3 ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Attachments
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span
                              className={
                                isDark ? "text-gray-400" : "text-gray-600"
                              }
                            >
                              Resume:
                            </span>{" "}
                            <span
                              className={
                                isDark ? "text-white" : "text-gray-900"
                              }
                            >
                              {formData.resume
                                ? formData.resume.name
                                : "Not uploaded"}
                            </span>
                          </div>
                          <div>
                            <span
                              className={
                                isDark ? "text-gray-400" : "text-gray-600"
                              }
                            >
                              GitHub:
                            </span>{" "}
                            <span
                              className={
                                isDark ? "text-white" : "text-gray-900"
                              }
                            >
                              {formData.github || "Not provided"}
                            </span>
                          </div>
                          <div>
                            <span
                              className={
                                isDark ? "text-gray-400" : "text-gray-600"
                              }
                            >
                              LinkedIn:
                            </span>{" "}
                            <span
                              className={
                                isDark ? "text-white" : "text-gray-900"
                              }
                            >
                              {formData.linkedin || "Not provided"}
                            </span>
                          </div>
                          <div>
                            <span
                              className={
                                isDark ? "text-gray-400" : "text-gray-600"
                              }
                            >
                              Portfolio:
                            </span>{" "}
                            <span
                              className={
                                isDark ? "text-white" : "text-gray-900"
                              }
                            >
                              {formData.portfolio || "Not provided"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div
                  className={`flex justify-between pt-6 border-t ${
                    isDark ? "border-purple-500/20" : "border-purple-300/20"
                  }`}
                >
                  {currentStep > 1 ? (
                    <button
                      onClick={handlePrevious}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all border ${
                        isDark
                          ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
                          : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      Previous
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < steps.length ? (
                    <button
                      onClick={handleNext}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
                    >
                      Continue
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Submit Application
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Job Summary Sidebar */}
            <div className="lg:col-span-1">
              <div
                className={`backdrop-blur-sm border rounded-2xl p-6 sticky top-24 ${
                  isDark
                    ? "bg-slate-900/50 border-purple-500/20"
                    : "bg-white/80 border-purple-300/30"
                }`}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                    🚀
                  </div>
                  <h2
                    className={`text-xl font-bold mb-2 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {jobDetails?.title || "Loading..."}
                  </h2>
                  <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                    {jobDetails?.company || "Loading..."}
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      isDark ? "bg-slate-800/50" : "bg-gray-50"
                    }`}
                  >
                    <span
                      className={isDark ? "text-gray-400" : "text-gray-600"}
                    >
                      Match Score
                    </span>
                    <span className="text-green-400 font-bold">
                      {jobDetails?.match || 0}%
                    </span>
                  </div>
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      isDark ? "bg-slate-800/50" : "bg-gray-50"
                    }`}
                  >
                    <span
                      className={isDark ? "text-gray-400" : "text-gray-600"}
                    >
                      Location
                    </span>
                    <span className={isDark ? "text-white" : "text-gray-900"}>
                      {jobDetails?.location || "N/A"}
                    </span>
                  </div>
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      isDark ? "bg-slate-800/50" : "bg-gray-50"
                    }`}
                  >
                    <span
                      className={isDark ? "text-gray-400" : "text-gray-600"}
                    >
                      Type
                    </span>
                    <span className={isDark ? "text-white" : "text-gray-900"}>
                      {jobDetails?.type || "N/A"}
                    </span>
                  </div>
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      isDark ? "bg-slate-800/50" : "bg-gray-50"
                    }`}
                  >
                    <span
                      className={isDark ? "text-gray-400" : "text-gray-600"}
                    >
                      Salary
                    </span>
                    <span className={isDark ? "text-white" : "text-gray-900"}>
                      {jobDetails?.salary || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3
                    className={`text-lg font-semibold mb-3 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {jobDetails?.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm border ${
                          isDark
                            ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                            : "bg-purple-100 text-purple-700 border-purple-300/20"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className={`p-4 rounded-xl border ${
                    isDark
                      ? "bg-purple-500/10 border-purple-500/20"
                      : "bg-purple-50 border-purple-300/20"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span
                      className={
                        isDark
                          ? "text-white font-semibold"
                          : "text-gray-900 font-semibold"
                      }
                    >
                      Quick Apply Active
                    </span>
                  </div>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Your application will be prioritized and reviewed within 24
                    hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
