import React from "react";
import { CheckCircle } from "lucide-react";

const ApplicationSteps = ({ currentStep, steps, progress, isDark }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center gap-3">
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
  );
};

export default ApplicationSteps;
