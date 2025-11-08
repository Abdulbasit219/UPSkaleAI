"use client";
import React, { useState } from "react";
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
} from "lucide-react";
import Link from "next/link";

export default function QuickApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",

    // Application
    coverLetter:
      "I'm excited to apply for the Senior React Developer position at TechInnovate Inc. With my 3+ years of experience in React and modern web technologies, I believe I would be a great fit for your team...",
    salaryExpectation: "$140,000",
    availability: "2 weeks",

    // Attachments
    resume: null,
    portfolio: "",
    github: "github.com/alexjohnson",
    linkedin: "linkedin.com/in/alexjohnson",

    // Preferences
    remoteOk: true,
    relocationOk: false,
  });

  const jobDetails = {
    title: "Senior React Developer",
    company: "TechInnovate Inc.",
    location: "San Francisco, CA / Remote",
    type: "Full-time",
    salary: "$120K - $160K",
    posted: "2 hours ago",
    match: 95,
    skills: ["React", "TypeScript", "Node.js", "AWS", "GraphQL"],
    description:
      "We're looking for a passionate Senior React Developer to join our growing team. You'll work on building scalable web applications and collaborate with cross-functional teams.",
    requirements: [
      "5+ years of React experience",
      "Strong TypeScript knowledge",
      "Experience with modern frontend tools",
      "Bachelor's in Computer Science or equivalent",
    ],
  };

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

  const handleFileUpload = (event, field) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [field]: file,
      }));
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Application submitted:", formData);
    setCurrentStep(5); // Success step
  };

  const progress = (currentStep / steps.length) * 100;

  if (currentStep === 5) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 pt-20 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Application Sent!
            </h2>
            <p className="text-gray-400 mb-6">
              Your application for{" "}
              <span className="text-white font-semibold">
                {jobDetails.title}
              </span>{" "}
              at{" "}
              <span className="text-white font-semibold">
                {jobDetails.company}
              </span>{" "}
              has been submitted successfully.
            </p>
            <div className="space-y-3">
              <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                Track Application
              </button>
              <button className="w-full py-3 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-all border border-slate-700">
                Browse More Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 pt-20">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href={`/jobsearch`}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Jobs
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Quick Apply</h1>
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <div className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                {jobDetails.company}
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4 text-green-400" />
                {jobDetails.match}% Match
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {jobDetails.posted}
              </div>
            </div>
          </div>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Application Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          currentStep >= step.number
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                            : "bg-slate-800 text-gray-400 border border-slate-700"
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
                            : "text-gray-400"
                        }`}
                      >
                        {step.title}
                      </span>
                      {index < steps.length - 1 && (
                        <div className="w-8 h-0.5 bg-slate-700 mx-2 hidden sm:block"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Personal Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) =>
                            handleInputChange("fullName", e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) =>
                            handleInputChange("location", e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
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
                        className="w-4 h-4 text-purple-500 bg-slate-800 border-slate-700 rounded focus:ring-purple-500"
                      />
                      <span className="text-gray-300 text-sm">
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
                        className="w-4 h-4 text-purple-500 bg-slate-800 border-slate-700 rounded focus:ring-purple-500"
                      />
                      <span className="text-gray-300 text-sm">
                        Willing to relocate
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Application Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Application Details
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Cover Letter
                    </label>
                    <textarea
                      value={formData.coverLetter}
                      onChange={(e) =>
                        handleInputChange("coverLetter", e.target.value)
                      }
                      rows={8}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                      placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Salary Expectation
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={formData.salaryExpectation}
                          onChange={(e) =>
                            handleInputChange(
                              "salaryExpectation",
                              e.target.value
                            )
                          }
                          className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Availability
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={formData.availability}
                          onChange={(e) =>
                            handleInputChange("availability", e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Attachments */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Attachments & Links
                  </h2>

                  {/* Resume Upload */}
                  <div className="border-2 border-dashed border-purple-500/30 rounded-2xl p-6 text-center hover:border-purple-500/50 transition-colors">
                    <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Upload Resume
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
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
                    {formData.resume && (
                      <div className="mt-4 flex items-center justify-center gap-2 text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">{formData.resume.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Social Links */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        GitHub Profile
                      </label>
                      <input
                        type="url"
                        value={formData.github}
                        onChange={(e) =>
                          handleInputChange("github", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="github.com/username"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Linkedin className="w-4 h-4" />
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        value={formData.linkedin}
                        onChange={(e) =>
                          handleInputChange("linkedin", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="linkedin.com/in/username"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Portfolio Website
                    </label>
                    <input
                      type="url"
                      value={formData.portfolio}
                      onChange={(e) =>
                        handleInputChange("portfolio", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Review Your Application
                  </h2>

                  <div className="space-y-4">
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-purple-500/20">
                      <h3 className="text-lg font-semibold text-white mb-3">
                        Personal Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Name:</span>{" "}
                          <span className="text-white">
                            {formData.fullName}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Email:</span>{" "}
                          <span className="text-white">{formData.email}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Phone:</span>{" "}
                          <span className="text-white">{formData.phone}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Location:</span>{" "}
                          <span className="text-white">
                            {formData.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-800/50 rounded-xl p-4 border border-purple-500/20">
                      <h3 className="text-lg font-semibold text-white mb-3">
                        Application Details
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">
                            Salary Expectation:
                          </span>{" "}
                          <span className="text-white">
                            {formData.salaryExpectation}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Availability:</span>{" "}
                          <span className="text-white">
                            {formData.availability}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Remote Work:</span>{" "}
                          <span className="text-white">
                            {formData.remoteOk ? "Yes" : "No"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Relocation:</span>{" "}
                          <span className="text-white">
                            {formData.relocationOk ? "Yes" : "No"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-800/50 rounded-xl p-4 border border-purple-500/20">
                      <h3 className="text-lg font-semibold text-white mb-3">
                        Attachments
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">Resume:</span>{" "}
                          <span className="text-white">
                            {formData.resume
                              ? formData.resume.name
                              : "Not uploaded"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">GitHub:</span>{" "}
                          <span className="text-white">
                            {formData.github || "Not provided"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">LinkedIn:</span>{" "}
                          <span className="text-white">
                            {formData.linkedin || "Not provided"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Portfolio:</span>{" "}
                          <span className="text-white">
                            {formData.portfolio || "Not provided"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-purple-500/20">
                {currentStep > 1 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-3 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-all border border-slate-700"
                  >
                    Previous
                  </button>
                ) : (
                  <div></div>
                )}

                {currentStep < steps.length ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
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
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                  🚀
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  {jobDetails.title}
                </h2>
                <p className="text-gray-400">{jobDetails.company}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-gray-400">Match Score</span>
                  <span className="text-green-400 font-bold">
                    {jobDetails.match}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-gray-400">Location</span>
                  <span className="text-white">{jobDetails.location}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-gray-400">Type</span>
                  <span className="text-white">{jobDetails.type}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-gray-400">Salary</span>
                  <span className="text-white">{jobDetails.salary}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Required Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {jobDetails.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm border border-purple-500/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-white font-semibold">
                    Quick Apply Active
                  </span>
                </div>
                <p className="text-gray-400 text-sm">
                  Your application will be prioritized and reviewed within 24
                  hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
