"use client";

import React from "react";
import {
  Share2,
  MapPin,
  Calendar,
  Briefcase,
  Github,
  Linkedin,
  Globe,
  GraduationCap,
  Award,
  Code,
  ExternalLink,
} from "lucide-react";
import { useSelector } from "react-redux";

export default function PublicProfileUI({ profile, user }) {
  const isDark = useSelector((state) => state.theme.mode) === "dark";

  return (
    <div
      className={`min-h-screen w-full px-4 sm:px-6 lg:px-16 xl:px-24 py-8 pt-24 transition-all duration-300 ${
        isDark ? "bg-[#1a0b2e]" : "bg-[#f5f5f5]"
      }`}
    >
      {/* Header / Cover */}
      <div
        className={`relative w-full rounded-2xl overflow-hidden transition-all duration-300 ${
          isDark
            ? "bg-[#2d1b4e] border border-purple-500/20"
            : "bg-white border border-gray-200"
        }`}
      >
        <div className="h-48 w-full relative">
          <img
            src={profile.coverPhoto}
            alt="cover"
            className="h-full w-full object-cover"
          />
          <div
            className={`absolute inset-0 ${
              isDark
                ? "bg-gradient-to-b from-purple-900/20 to-[#1a0b2e]/80"
                : "bg-gradient-to-b from-transparent to-black/10"
            }`}
          />
        </div>

        {/* Avatar + Basic Info */}
        <div className="flex flex-col md:flex-row md:items-end gap-6 px-6 pb-6 -mt-14 relative">
          <div className="relative">
            <img
              src={profile.avatar}
              alt="avatar"
              className={`w-28 h-28 rounded-2xl object-cover shadow-lg transition-all duration-300 ${
                isDark
                  ? "border-4 border-[#2d1b4e] ring-2 ring-purple-500/30"
                  : "border-4 border-white ring-2 ring-gray-200"
              }`}
            />
          </div>

          <div className="flex-1">
            <h1
              className={`text-2xl md:text-3xl font-bold transition-colors duration-300 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {profile.name}
            </h1>
            <div
              className={`flex flex-wrap items-center gap-4 mt-3 text-sm transition-colors duration-300 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> {profile.location}
              </span>
              <p
                className={`font-medium mt-1 flex items-center gap-2 transition-colors duration-300 ${
                  isDark ? "text-purple-400" : "text-purple-600"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                {profile.role}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* About */}
          <Card title="About Me" isDark={isDark}>
            <p
              className={`leading-relaxed text-sm transition-colors duration-300 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
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
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isDark
                        ? "bg-[#2d1b4e] hover:bg-[#3d2b5e] border border-purple-500/20 text-white"
                        : "bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800"
                    }`}
                  >
                    <Github className="w-5 h-5" />
                    <span className="font-medium">GitHub</span>
                  </a>
                )}
                {profile.socialLinks?.linkedin && (
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isDark
                        ? "bg-[#2d1b4e] hover:bg-[#3d2b5e] border border-purple-500/20 text-white"
                        : "bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800"
                    }`}
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className="font-medium">LinkedIn</span>
                  </a>
                )}
                {profile.socialLinks?.website && (
                  <a
                    href={profile.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isDark
                        ? "bg-[#2d1b4e] hover:bg-[#3d2b5e] border border-purple-500/20 text-white"
                        : "bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800"
                    }`}
                  >
                    <Globe className="w-5 h-5" />
                    <span className="font-medium">Website</span>
                  </a>
                )}
              </div>
            </Card>
          )}

          {/* Skills */}
          {profile.skills && profile.skills.length > 0 && (
            <Card title="Skills & Expertise" isDark={isDark}>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isDark
                        ? "bg-purple-600/30 text-purple-200 border border-purple-500/30"
                        : "bg-purple-100 text-purple-700 border border-purple-200"
                    }`}
                  >
                    {skill.skillName || skill}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Education */}
          {profile.education && profile.education.length > 0 && (
            <Card title="Education" isDark={isDark}>
              <div className="space-y-5">
                {profile.education.map((edu, idx) => (
                  <div
                    key={idx}
                    className={`pb-5 transition-colors duration-300 ${
                      idx !== profile.education.length - 1
                        ? isDark
                          ? "border-b border-purple-500/20"
                          : "border-b border-gray-200"
                        : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4
                          className={`font-semibold text-base transition-colors duration-300 ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {edu.degree}
                        </h4>
                        <p
                          className={`text-sm transition-colors duration-300 ${
                            isDark ? "text-purple-400" : "text-purple-600"
                          }`}
                        >
                          {edu.institution}
                        </p>
                      </div>
                      <span
                        className={`text-sm whitespace-nowrap ml-4 transition-colors duration-300 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {edu.startDate} -{" "}
                        {edu.current ? "Present" : edu.endDate}
                      </span>
                    </div>
                    {edu.description && (
                      <p
                        className={`text-sm mt-2 leading-relaxed transition-colors duration-300 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {edu.description}
                      </p>
                    )}
                    {edu.grade && (
                      <p
                        className={`text-sm mt-2 font-medium transition-colors duration-300 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        GPA: {edu.grade}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Work Experience */}
          {profile.experience && profile.experience.length > 0 && (
            <Card title="Work Experience" isDark={isDark}>
              <div className="space-y-6">
                {profile.experience.map((exp, idx) => (
                  <div
                    key={idx}
                    className={`pb-6 transition-colors duration-300 ${
                      idx !== profile.experience.length - 1
                        ? isDark
                          ? "border-b border-purple-500/20"
                          : "border-b border-gray-200"
                        : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4
                          className={`font-semibold text-base transition-colors duration-300 ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {exp.title}
                        </h4>
                        <p
                          className={`text-sm transition-colors duration-300 ${
                            isDark ? "text-purple-400" : "text-purple-600"
                          }`}
                        >
                          {exp.company}
                        </p>
                        {exp.location && (
                          <p
                            className={`text-sm flex items-center gap-1 mt-1 transition-colors duration-300 ${
                              isDark ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                          </p>
                        )}
                      </div>
                      <span
                        className={`text-sm whitespace-nowrap ml-4 transition-colors duration-300 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {exp.startDate} -{" "}
                        {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    {exp.description && (
                      <p
                        className={`text-sm mt-3 leading-relaxed transition-colors duration-300 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Projects */}
          {profile.projects && profile.projects.length > 0 && (
            <Card title="Project Portfolio" isDark={isDark}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                      isDark
                        ? "bg-[#2d1b4e] border border-purple-500/20 hover:border-purple-400/40"
                        : "bg-gray-50 border border-gray-200 hover:shadow-md"
                    }`}
                  >
                    <h4
                      className={`font-semibold text-base transition-colors duration-300 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {proj.title}
                    </h4>
                    <p
                      className={`text-sm mt-2 leading-relaxed line-clamp-3 transition-colors duration-300 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {proj.description}
                    </p>

                    {proj.techStack && proj.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {proj.techStack.slice(0, 4).map((tech, i) => (
                          <span
                            key={i}
                            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-300 ${
                              isDark
                                ? "bg-purple-600/30 text-purple-200"
                                : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                        {proj.techStack.length > 4 && (
                          <span
                            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-300 ${
                              isDark
                                ? "bg-purple-600/30 text-purple-200"
                                : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            +{proj.techStack.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex gap-3 mt-4">
                      {proj.projectLink && (
                        <a
                          href={proj.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-sm flex items-center gap-1 font-medium hover:underline transition-colors duration-300 ${
                            isDark ? "text-purple-400" : "text-purple-600"
                          }`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live Demo
                        </a>
                      )}
                      {proj.githubLink && (
                        <a
                          href={proj.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-sm flex items-center gap-1 font-medium hover:underline transition-colors duration-300 ${
                            isDark ? "text-purple-400" : "text-purple-600"
                          }`}
                        >
                          <Github className="w-3.5 h-3.5" />
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

/* Reusable Card Component */
function Card({ title, children, isDark }) {
  return (
    <div
      className={`p-6 rounded-xl transition-all duration-300 ${
        isDark
          ? "bg-[#2d1b4e] border border-purple-500/20"
          : "bg-white border border-gray-200 shadow-sm"
      }`}
    >
      <h3
        className={`font-semibold text-lg mb-4 transition-colors duration-300 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}
