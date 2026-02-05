import React from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

const ApplicationSuccess = ({ isDark, jobDetails }) => {
  return (
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
          <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
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
            <Link href="/dashboard">
              <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                Track Application
              </button>
            </Link>
            <Link href="/jobsearch">
              <button
                className={`w-full py-3 rounded-xl font-semibold transition-all border ${
                  isDark
                    ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
                    : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
                }`}
              >
                Browse More Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSuccess;
