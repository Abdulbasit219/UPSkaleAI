import React from "react";
import { DollarSign, Clock } from "lucide-react";

const ApplicationDetailsForm = ({ formData, handleInputChange, isDark }) => {
  return (
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
          onChange={(e) => handleInputChange("coverLetter", e.target.value)}
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
                handleInputChange("salaryExpectation", e.target.value)
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
  );
};

export default ApplicationDetailsForm;
