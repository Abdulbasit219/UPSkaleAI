import React from "react";

const JobCardSkeleton = ({ isDark }) => {
  return (
    <div
      className={`relative backdrop-blur-xl border rounded-xl sm:rounded-2xl p-4 sm:p-6 overflow-hidden ${
        isDark
          ? "bg-slate-900/50 border-purple-500/20"
          : "bg-white/80 border-purple-300/20"
      }`}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />

      <div className="relative">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 sm:mb-4 gap-3 sm:gap-4">
          <div className="flex items-start gap-3 sm:gap-4 flex-1">
            {/* Company Logo Skeleton */}
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl animate-pulse ${
                isDark ? "bg-slate-800" : "bg-gray-200"
              }`}
            />

            <div className="flex-1 min-w-0 space-y-3">
              {/* Title Skeleton */}
              <div
                className={`h-6 sm:h-7 rounded-lg animate-pulse ${
                  isDark ? "bg-slate-800" : "bg-gray-200"
                } w-3/4`}
              />

              {/* Company & Location Skeleton */}
              <div className="flex flex-col xs:flex-row gap-2">
                <div
                  className={`h-4 rounded animate-pulse ${
                    isDark ? "bg-slate-800" : "bg-gray-200"
                  } w-32`}
                />
                <div
                  className={`h-4 rounded animate-pulse ${
                    isDark ? "bg-slate-800" : "bg-gray-200"
                  } w-40`}
                />
                <div
                  className={`h-4 rounded animate-pulse ${
                    isDark ? "bg-slate-800" : "bg-gray-200"
                  } w-24`}
                />
              </div>

              {/* Description Skeleton */}
              <div className="space-y-2">
                <div
                  className={`h-3 rounded animate-pulse ${
                    isDark ? "bg-slate-800" : "bg-gray-200"
                  } w-full`}
                />
                <div
                  className={`h-3 rounded animate-pulse ${
                    isDark ? "bg-slate-800" : "bg-gray-200"
                  } w-5/6`}
                />
              </div>

              {/* Skills Tags Skeleton */}
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-7 w-20 rounded animate-pulse ${
                      isDark ? "bg-slate-800" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Match Score Skeleton */}
          <div className="flex flex-row sm:flex-col items-center justify-between sm:items-end gap-2 sm:gap-3">
            <div
              className={`h-12 w-24 rounded-lg animate-pulse ${
                isDark ? "bg-slate-800" : "bg-gray-200"
              }`}
            />
            <div className="flex gap-2">
              <div
                className={`h-10 w-10 rounded-lg animate-pulse ${
                  isDark ? "bg-slate-800" : "bg-gray-200"
                }`}
              />
              <div
                className={`h-10 w-10 rounded-lg animate-pulse ${
                  isDark ? "bg-slate-800" : "bg-gray-200"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Bottom Section Skeleton */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between pt-3 sm:pt-4 border-t gap-2 sm:gap-0 ${
            isDark ? "border-purple-500/20" : "border-purple-300/20"
          }`}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-4 w-20 rounded animate-pulse ${
                  isDark ? "bg-slate-800" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-auto">
            <div
              className={`h-10 w-24 rounded-lg animate-pulse ${
                isDark ? "bg-slate-800" : "bg-gray-200"
              }`}
            />
            <div
              className={`h-10 w-28 rounded-lg animate-pulse ${
                isDark ? "bg-slate-800" : "bg-gray-200"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCardSkeleton;
