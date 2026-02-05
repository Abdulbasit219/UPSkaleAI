import React from "react";

const ReviewForm = ({ formData, isDark }) => {
  return (
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
              <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                Name:
              </span>{" "}
              <span className={isDark ? "text-white" : "text-gray-900"}>
                {formData.fullName}
              </span>
            </div>
            <div>
              <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                Email:
              </span>{" "}
              <span className={isDark ? "text-white" : "text-gray-900"}>
                {formData.email}
              </span>
            </div>
            <div>
              <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                Phone:
              </span>{" "}
              <span className={isDark ? "text-white" : "text-gray-900"}>
                {formData.phone}
              </span>
            </div>
            <div>
              <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                Location:
              </span>{" "}
              <span className={isDark ? "text-white" : "text-gray-900"}>
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
              <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                Salary Expectation:
              </span>{" "}
              <span className={isDark ? "text-white" : "text-gray-900"}>
                {formData.salaryExpectation}
              </span>
            </div>
            <div>
              <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                Availability:
              </span>{" "}
              <span className={isDark ? "text-white" : "text-gray-900"}>
                {formData.availability}
              </span>
            </div>
            <div>
              <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                Remote Work:
              </span>{" "}
              <span className={isDark ? "text-white" : "text-gray-900"}>
                {formData.remoteOk ? "Yes" : "No"}
              </span>
            </div>
            <div>
              <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                Relocation:
              </span>{" "}
              <span className={isDark ? "text-white" : "text-gray-900"}>
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
              <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                Resume:
              </span>{" "}
              <span className={isDark ? "text-white" : "text-gray-900"}>
                {formData.resume
                  ? formData.resumeName || "Uploaded"
                  : "Not uploaded"}
              </span>
            </div>
            <div>
              <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                GitHub:
              </span>{" "}
              <span className={isDark ? "text-white" : "text-gray-900"}>
                {formData.github || "Not provided"}
              </span>
            </div>
            <div>
              <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                LinkedIn:
              </span>{" "}
              <span className={isDark ? "text-white" : "text-gray-900"}>
                {formData.linkedin || "Not provided"}
              </span>
            </div>
            <div>
              <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                Portfolio:
              </span>{" "}
              <span className={isDark ? "text-white" : "text-gray-900"}>
                {formData.portfolio || "Not provided"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
