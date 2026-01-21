"use client";

import React from "react";
import {
  Share2,
  MapPin,
  Calendar,
  Link2,
  Briefcase,
  Github,
  Linkedin,
  Globe,
} from "lucide-react";
import { useSelector } from "react-redux";

export default function PublicProfileUI({ profile, user }) {
  const isDark = useSelector((state) => state.theme.mode);

  return (
    <div
      className={`min-h-screen w-full px-4 sm:px-6 lg:px-20 xl:px-32 py-8 pt-24 transition-colors duration-300 ${
        isDark ? "bg-[#0f0520] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header / Cover */}
      <div
        className={`relative w-full rounded-2xl overflow-hidden ${
          isDark
            ? "bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-transparent border border-purple-500/20"
            : "bg-white shadow-lg"
        }`}
      >
        <div className="h-56 w-full relative">
          <img
            src={profile.coverPhoto}
            alt="cover"
            className="h-full w-full object-cover"
          />
          <div
            className={`absolute inset-0 ${isDark ? "bg-gradient-to-b from-purple-900/40 to-[#0f0520]/60" : ""}`}
          />
        </div>

        {/* Avatar + Basic Info */}
        <div className="flex flex-col md:flex-row md:items-end gap-6 px-6 pb-6 -mt-16 relative">
          <div className="relative">
            <img
              src={profile.avatar}
              alt="avatar"
              className={`w-32 h-32 rounded-2xl object-cover shadow-xl ${
                isDark
                  ? "border-4 border-purple-500/50 ring-4 ring-purple-900/30"
                  : "border-4 border-white"
              }`}
            />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
            <p
              className={`font-medium mt-1 flex items-center gap-2 ${isDark ? "text-purple-300" : "text-purple-600"}`}
            >
              <Briefcase className="w-4 h-4" />
              {profile.role}
            </p>

            <div
              className={`flex flex-wrap items-center gap-4 mt-3 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> {profile.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> Joined 2026-01-16
              </span>
              <span className="flex items-center gap-1.5">
                <Link2 className="w-4 h-4" /> @{user.username}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              className={`px-5 py-2.5 rounded-xl flex items-center gap-2 font-medium transition-all ${
                isDark
                  ? "bg-purple-600/20 border border-purple-500/30 hover:bg-purple-600/30 hover:border-purple-400/50 text-purple-300"
                  : "bg-white border border-gray-300 hover:bg-gray-50"
              }`}
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 gap-6 mt-8">
        {/* About */}
        <Card title="About" isDark={isDark}>
          <p
            className={`leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            {profile.bio}
          </p>
        </Card>

        {/* Social Links */}
        {(profile?.socialLinks?.github ||
          profile?.socialLinks?.linkedin ||
          profile?.socialLinks?.website) && (
          <Card title="Social Links" isDark={isDark}>
            <div className="flex flex-col gap-3">
              {profile.socialLinks?.github && (
                <a
                  href={profile.socialLinks.github}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    isDark
                      ? "bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 text-purple-300"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
              )}
              {profile.socialLinks?.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    isDark
                      ? "bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 text-purple-300"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
              )}
              {profile.socialLinks?.website && (
                <a
                  href={profile.socialLinks.website}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    isDark
                      ? "bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 text-purple-300"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <Globe className="w-5 h-5" />
                  <span>Website</span>
                </a>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Projects */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6 text-white">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.projects.map((p, i) => (
            <a
              key={i}
              href={p.projectLink || p.githubLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-6 rounded-xl transition-all hover:scale-[1.02] cursor-pointer ${
                isDark
                  ? "bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-transparent border border-purple-500/20 hover:border-purple-400/40"
                  : "bg-white border border-gray-200 shadow-md hover:shadow-lg"
              }`}
            >
              <h3
                className={`font-semibold text-lg ${isDark ? "text-white" : "text-gray-900"}`}
              >
                {p.title || "Project"}
              </h3>
              <p
                className={`text-sm mt-3 leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                {p.description || "No description provided"}
              </p>
              {p.techStack && p.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {p.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isDark
                          ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Reusable Components */
function Card({ title, children, isDark }) {
  return (
    <div
      className={`p-6 rounded-xl transition-all ${
        isDark
          ? "bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-transparent border border-purple-500/20"
          : "bg-white shadow-md"
      }`}
    >
      <h3 className="font-semibold text-lg mb-4 text-white">{title}</h3>
      {children}
    </div>
  );
}
