"use client";

import { Calendar, Users, ChevronRight } from "lucide-react";
import React from "react";

export default function UpcomingEventsCard({ isDark, upcomingEvents = [] }) {
  return (
    <div
      className={`backdrop-blur-sm border rounded-xl p-6 transition-colors ${
        isDark
          ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20 hover:border-purple-500/30"
          : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20 hover:border-purple-300/30"
      }`}
    >
      <h3
        className={`text-xl font-bold mb-4 flex items-center gap-2 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        <Calendar className="w-5 h-5 text-purple-400" />
        Upcoming Events
      </h3>

      <div className="space-y-3">
        {upcomingEvents.map((event, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer group ${
              isDark
                ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30"
                : "bg-white/50 border-purple-300/10 hover:border-purple-300/30"
            }`}
          >
            {/* ICON */}
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-purple-400 flex-shrink-0 group-hover:scale-110 transition-transform ${
                isDark ? "bg-purple-500/10" : "bg-purple-100"
              }`}
            >
              {event.icon}
            </div>

            {/* DETAILS */}
            <div className="flex-1 min-w-0">
              <h4
                className={`text-sm font-semibold mb-1 group-hover:text-purple-400 transition-colors ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {event.title}
              </h4>

              <p
                className={`text-xs mb-2 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {event.date}
              </p>

              <div className="flex items-center justify-between">
                <span
                  className={`px-2 py-0.5 text-xs rounded border ${
                    isDark
                      ? "bg-blue-500/10 text-blue-300 border-blue-500/20"
                      : "bg-blue-100 text-blue-700 border-blue-200"
                  }`}
                >
                  {event.type}
                </span>

                <span
                  className={`text-xs flex items-center gap-1 ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  <Users className="w-3 h-3" />
                  {event.participants}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW CALENDAR BUTTON */}
      <button className="w-full mt-4 py-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-semibold flex items-center justify-center gap-1">
        View Calendar
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
