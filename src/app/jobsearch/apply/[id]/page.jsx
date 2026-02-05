"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, Send, Building, Target, Clock } from "lucide-react";
import BackgroundPattern from "@/components/ui/BackgroundPattern";

// Custom Hook and Components
import { useJobApplication } from "@/components/jobs/details/useJobApplication";
import ApplicationSuccess from "@/components/jobs/details/ApplicationSuccess";
import ApplicationSteps from "@/components/jobs/details/ApplicationSteps";
import PersonalDetailsForm from "@/components/jobs/details/PersonalDetailsForm";
import ApplicationDetailsForm from "@/components/jobs/details/ApplicationDetailsForm";
import AttachmentsForm from "@/components/jobs/details/AttachmentsForm";
import ReviewForm from "@/components/jobs/details/ReviewForm";
import JobSummarySidebar from "@/components/jobs/details/JobSummarySidebar";

export default function QuickApplyPage({ params }) {
  const { id } = React.use(params);

  const {
    isDark,
    currentStep,
    steps,
    progress,
    formData,
    handleInputChange,
    handleFileUpload,
    handleNext,
    handlePrevious,
    handleSubmit,
    isUploading,
    jobDetails,
    isSubmitted,
    profileData,
    session,
  } = useJobApplication(id);

  if (isSubmitted) {
    return <ApplicationSuccess isDark={isDark} jobDetails={jobDetails} />;
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white"
          : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 text-gray-900"
      }`}
    >
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
              <ApplicationSteps
                currentStep={currentStep}
                steps={steps}
                progress={progress}
                isDark={isDark}
              />

              {/* Form Steps */}
              {currentStep === 1 && (
                <PersonalDetailsForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  isDark={isDark}
                  profileData={profileData}
                  session={session}
                />
              )}

              {currentStep === 2 && (
                <ApplicationDetailsForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  isDark={isDark}
                />
              )}

              {currentStep === 3 && (
                <AttachmentsForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleFileUpload={handleFileUpload}
                  isDark={isDark}
                  isUploading={isUploading}
                />
              )}

              {currentStep === 4 && (
                <ReviewForm formData={formData} isDark={isDark} />
              )}

              {/* Navigation Buttons */}
              <div
                className={`flex justify-between pt-6 border-t mt-8 ${
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
            <JobSummarySidebar jobDetails={jobDetails} isDark={isDark} />
          </div>
        </div>
      </div>
    </div>
  );
}
