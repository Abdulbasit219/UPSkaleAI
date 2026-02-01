"use client";
import React from "react";

export default function AppliedJobsCard({ jobs = [], isDark }) {
  return (
    <div
      className={`p-5 rounded-xl border ${
        isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"
      }`}
    >
      <h3 className="text-lg font-semibold mb-4">
        Applied Jobs ({jobs.length})
      </h3>

      {jobs.length === 0 ? (
        <p className="text-sm opacity-70">No applications yet</p>
      ) : (
        <div className="space-y-3">
          {jobs.slice(0, 5).map((app) => (
            <div
              key={app._id}
              className={`p-3 rounded-lg border ${
                isDark ? "border-slate-800" : "border-gray-200"
              }`}
            >
              <p className="font-medium">{app.job?.title || "Job Title"}</p>

              <p className="text-sm opacity-70">
                {app.job?.company || "Company"}
              </p>

              <div className="flex justify-between mt-2 text-xs">
                <span className="opacity-60">
                  {new Date(app.appliedAt).toLocaleDateString()}
                </span>

                <span className="capitalize px-2 py-1 rounded bg-purple-600/20 text-purple-500">
                  {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
