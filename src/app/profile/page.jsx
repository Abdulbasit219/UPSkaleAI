"use client";
import React, { useEffect, useRef, useState } from "react";
import { Trophy, Target, Briefcase, Flame } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
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
import {
  addSkill,
  deleteProjectAction,
  fetchLearningPath,
  fetchProfile,
  updateProfile,
} from "@/store/slices/profileSlice";
import CurrentLearningPath from "@/components/profile/CurrentLearningPath";
import ExperienceSection from "@/components/profile/ExperienceSection";
import SocialLinksCard from "@/components/profile/Sociallinkscard";
import EducationSection from "@/components/profile/EducationSection";

export default function ProfilePage() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const theme = useSelector((state) => state.theme.mode);
  const {
    data: profile,
    loading,
    streak,
    learningPath,
    learningPathLoading,
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

  useEffect(() => {
    if (user && !profile) {
      dispatch(fetchProfile());
      dispatch(fetchLearningPath());
    }
  }, [user, dispatch, profile]);

  if (loading && !profile)
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
            <CurrentLearningPath
              learningPath={learningPath}
              learningPathLoading={learningPathLoading}
              isDark={isDark}
            />
            {/* Skills & Expertise */}
            <SkillList
              isDark={isDark}
              handleAddSkill={handleAddSkill}
              skills={profile?.skills}
            />
            <EducationSection education={profile?.education} isDark={isDark} />
            
            <ProjectPortfolio
              profile={profile}
              isDark={isDark}
              setShowProjectModal={setShowProjectModal}
              deleteProject={deleteProject}
              handleEdit={handleEdit}
            />
            <ExperienceSection
              experience={profile?.experience}
              isDark={isDark}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <SocialLinksCard
              socialLinks={profile?.socialLinks}
              isDark={isDark}
            />
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
      )}
    </div>
  );
}
