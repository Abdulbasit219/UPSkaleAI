"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Trophy,
  Target,
  Briefcase,
  Book,
  CheckCircle,
  Sparkles,
  ChevronRight,
  BookOpen,
  Flame,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import axios from "axios";
import EditProfileModal from "@/components/profile/EditProfileModal";
import AddProjectModal from "@/components/profile/ProjectUpsertModal";
import { toast } from "sonner";
import { badgeStyles } from "@/lib/badgeStyles";
import { generateResume } from "@/utils/generateResume";
import ProfileHeader from "@/components/profile/ProfileHeader";
import AboutMe from "@/components/profile/AboutMe";
import ProjectPortfolio from "@/components/profile/ProjectPortfolio";
import StatsGrid from "@/components/profile/StatsGrid";
import LearningStreakCard from "@/components/profile/LearningStreakCard";
import AchievementsCard from "@/components/profile/AchievementsCard";
import SkillList from "@/components/profile/skills/SkillList";
import RecentActivityCard from "@/components/profile/recentActivity/RecentActivityCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { fetchProfile } from "@/store/slices/profileSlice";

export default function ProfilePage() {
  // const [profile, setProfile] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  // const [streak, setStreak] = useState([]);

  const theme = useSelector((state) => state.theme.mode);
  const {
    data: profile,
    loading,
    streak,
  } = useSelector((state) => state.profile);
  const isDark = theme === "dark";

  const dispatch = useDispatch();
  const { data } = useSession();
  const user = data?.user;

  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const handleProfileUpdate = async (updatedData) => {
    try {
      await dispatch(updateProfile(updatedData)).unwrap();
      setIsEditOpen(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const deleteProject = async (projectId, projectTitle) => {
    if (!projectId) return;

    try {
      await dispatch(deleteProjectAction({ projectId, projectTitle })).unwrap();
      toast.success("Project deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };

  const handleAddSkill = async (skillData) => {
    if (!skillData?.skillName || !user?._id) {
      toast.error("Skill name or session missing");
      return;
    }
    try {
      await dispatch(
        addSkill({
          userId: user._id,
          skillName: skillData.skillName,
          level: skillData.level,
          lastPracticed: skillData.lastPracticed,
        })
      ).unwrap();
      toast.success("Skill added successfully!");
      return true;
    } catch (error) {
      toast.error(error?.message || "Failed to add skill");
      return false;
    }
  };

  // Fetch profile on mount

  
  const stats = [
    {
      icon: <Trophy className="w-5 h-5" />,
      value: profile?.skills?.length || 0,
      label: "Skills Mastered",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Flame className="w-5 h-5" />,
      value: profile?.maxStreak || 0,
      label: "Day Max Streak",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      value: profile?.projects?.length || 0,
      label: "Projects",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Target className="w-5 h-5" />,
      value: `${Math.round(
        ((profile?.projects?.length || 0) * 20 +
          (profile?.streak || 0) * 5 +
          (profile?.badges?.length || 0) * 10) /
          3
      )}%`,
      label: "Career Ready",
      color: "from-green-500 to-emerald-500",
    },
  ];

  if (loading && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (loading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

  return (
    <div
      className={`min-h-screen pt-20 pb-12 transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white"
          : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 text-gray-900"
      }`}
    >
      {/* Background Pattern */}
      <div
        className={`fixed inset-0 pointer-events-none transition-opacity duration-300 `}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ProfileHeader
          profile={profile}
          // setProfile={setProfile}
          user={user}
          isDark={isDark}
          coverInputRef={coverInputRef}
          avatarInputRef={avatarInputRef}
          setIsEditOpen={setIsEditOpen}
          generateResume={generateResume}
        />

        {/* Stats Overview */}
        <StatsGrid stats={stats} isDark={isDark} />

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AboutMe
              profile={profile}
              isDark={isDark}
              setIsEditOpen={setIsEditOpen}
            />

            {/* Current Learning Path */}
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
                <BookOpen className="w-5 h-5 text-purple-400" />
                Current Learning Path
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-semibold ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Full-Stack Development
                    </span>
                    <span className="text-purple-400 font-bold">65%</span>
                  </div>
                  <div
                    className={`relative w-full rounded-full h-3 overflow-hidden ${
                      isDark ? "bg-slate-800" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                      style={{ width: "65%" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 mt-6">
                  {[
                    {
                      name: "Advanced React Patterns",
                      progress: 80,
                      status: "In Progress",
                    },
                    {
                      name: "Node.js Backend Development",
                      progress: 65,
                      status: "In Progress",
                    },
                    {
                      name: "Database Design",
                      progress: 40,
                      status: "Started",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-colors group ${
                        isDark
                          ? "bg-slate-800/50 border-purple-500/10 hover:border-purple-500/30"
                          : "bg-gray-50/50 border-purple-300/10 hover:border-purple-300/30"
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`font-medium ${
                              isDark ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {item.name}
                          </span>
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full border ${
                              isDark
                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                : "bg-green-100 text-green-700 border-green-200"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex-1 rounded-full h-2 ${
                              isDark ? "bg-slate-700" : "bg-gray-300"
                            }`}
                          >
                            <div
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                          <span
                            className={`text-sm font-medium w-12 ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {item.progress}%
                          </span>
                        </div>
                      </div>
                      <button
                        className={`ml-4 px-4 py-2 rounded-lg text-sm border transition-all opacity-0 group-hover:opacity-100 ${
                          isDark
                            ? "bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20"
                            : "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200"
                        }`}
                      >
                        Continue
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills & Expertise */}
            <SkillList
              isDark={isDark}
              handleAddSkill={handleAddSkill}
              skills={profile?.skills}
            />

            <ProjectPortfolio
              profile={profile}
              isDark={isDark}
              setShowProjectModal={setShowProjectModal}
              deleteProject={deleteProject}
              handleEdit={handleEdit}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Career Goal Card */}
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
                <Target className="w-5 h-5 text-purple-400" />
                Career Goal
              </h3>
              <div className="text-center mb-6">
                <div className="relative w-28 h-28 mx-auto mb-4">
                  <svg
                    className="w-28 h-28 transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke={isDark ? "#1e293b" : "#e2e8f0"}
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray="251.2"
                      strokeDashoffset="87.92"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className={`text-3xl font-bold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      65%
                    </span>
                  </div>
                </div>
                <div
                  className={`font-bold text-lg ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Full-Stack Developer
                </div>
                <div
                  className={
                    isDark ? "text-gray-400 text-sm" : "text-gray-500 text-sm"
                  }
                >
                  Target Role
                </div>
              </div>

              {/* Requirements Checklist */}
              <div className="space-y-2 mb-4">
                {[
                  { label: "Frontend Skills", completed: true },
                  { label: "Backend Skills", completed: false },
                  { label: "Portfolio Projects", completed: true },
                  { label: "Interview Prep", completed: false },
                ].map((req, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle
                      className={`w-4 h-4 ${req.completed ? "text-green-400" : isDark ? "text-gray-600" : "text-gray-400"}`}
                    />
                    <span
                      className={
                        req.completed
                          ? isDark
                            ? "text-gray-300"
                            : "text-gray-700"
                          : isDark
                            ? "text-gray-500"
                            : "text-gray-500"
                      }
                    >
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-2.5 backdrop-blur-sm rounded-lg font-semibold transition-all border hover:scale-105 ${
                  isDark
                    ? "bg-slate-800/50 text-white border-slate-700 hover:bg-slate-700"
                    : "bg-white/50 text-gray-700 border-gray-300 hover:bg-white"
                }`}
              >
                Update Goal
              </button>
            </div>

            {/* Learning Streak */}
            <LearningStreakCard
              isDark={isDark}
              profile={profile}
              streak={streak}
            />

            {/* Recent Activity */}
            <RecentActivityCard
              recentActivity={profile?.recentActivity}
              isDark={isDark}
              userId={profile?.userId}
            />

            {/* Achievements */}
            <AchievementsCard
              isDark={isDark}
              profile={profile}
              badgeStyles={badgeStyles}
            />

            {/* Recommended for You */}
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
                <Sparkles className="w-5 h-5 text-purple-400" />
                Recommended
              </h3>
              <div className="space-y-3">
                {[
                  {
                    title: "Advanced TypeScript",
                    type: "Course",
                    icon: <Book className="w-4 h-4" />,
                  },
                  {
                    title: "AWS Fundamentals",
                    type: "Course",
                    icon: <Book className="w-4 h-4" />,
                  },
                  {
                    title: "Senior Developer @ Tech Co",
                    type: "Job",
                    icon: <Briefcase className="w-4 h-4" />,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors group cursor-pointer ${
                      isDark
                        ? "bg-slate-800/50 hover:bg-slate-700/50"
                        : "bg-gray-100/50 hover:bg-gray-200/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform ${
                          isDark
                            ? "bg-purple-500/10 text-purple-400"
                            : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div
                          className={`text-sm font-medium ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {item.title}
                        </div>
                        <div
                          className={
                            isDark
                              ? "text-gray-500 text-xs"
                              : "text-gray-500 text-xs"
                          }
                        >
                          {item.type}
                        </div>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-colors ${
                        isDark
                          ? "text-gray-400 group-hover:text-white"
                          : "text-gray-400 group-hover:text-gray-600"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditOpen && (
        <EditProfileModal
          profile={profile}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          isDark={isDark}
          onSave={handleProfileUpdate}
        />
      )}

      {showProjectModal && (
        <AddProjectModal
          open={showProjectModal}
          setOpen={setShowProjectModal}
          editData={selectedProject}
        />
        // onSuccess={refreshProfile} />
      )}
    </div>
  );
}
