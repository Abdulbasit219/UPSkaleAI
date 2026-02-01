"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

import WelcomeHeader from "@/components/dashboard/user/WelcomeHeader";
import QuickStatsGrid from "@/components/dashboard/user/QuickStatsGrid";
import ContinueLearningSection from "@/components/dashboard/user/ContinueLearningSection";
import RecommendedSection from "@/components/dashboard/user/RecommendedSection";
import LearningInsights from "@/components/dashboard/user/LearningInsights";
import TodayGoals from "@/components/dashboard/user/TodayGoals";
import RecentActivityCard from "@/components/profile/recentActivity/RecentActivityCard";

import { fetchProfile } from "@/store/slices/profileSlice";
import { fetchEnrolledCourses } from "@/store/slices/enrolledCoursesSlice";
import AppliedJobsCard from "@/components/dashboard/user/AppliedJobsCard";

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();

  const isDark = useSelector((state) => state.theme.mode) === "dark";
  const profile = useSelector((state) => state.profile.data);
  const enrolledCourses =
    useSelector((state) => state.enrolledCourses.data) || [];

  const user = session?.user;

  const [tasks, setTasks] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);

  const [recommendedCourses, setRecommendedCourses] = useState([]);

  /* ================= AUTH ================= */
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }

    if (status === "authenticated" && session?.user?.role !== "Job Seeker") {
      router.push("/unauthorized");
    }
  }, [status, session, router]);

  /* ================= INITIAL DATA FETCH ================= */
  useEffect(() => {
    if (status !== "authenticated") return;

    if (!profile) dispatch(fetchProfile());
    if (!enrolledCourses.length) dispatch(fetchEnrolledCourses());

    fetchTodayTasks();
    fetchAppliedJobs();
  }, [status]);

  /* ================= API CALLS ================= */
  const fetchTodayTasks = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/daily-goals");
      setTasks(data?.data?.tasks || []);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchRecommendedCourses = useCallback(async () => {
    if (!user || !enrolledCourses.length) return;

    try {
      const { data } = await axios.get("/api/learning/courses/recommended", {
        params: { limit: 3 },
      });

      if (data?.success) {
        setRecommendedCourses(data.courses);
      }
    } catch (err) {
      console.error("Recommendation error:", err);
    }
  }, [user, enrolledCourses]);

  useEffect(() => {
    fetchRecommendedCourses();
  }, [fetchRecommendedCourses]);

  /* ================= TASK TOGGLE ================= */
  const toggleTask = async (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

    try {
      await axios.patch(`/api/daily-goals/${taskId}`);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAppliedJobs = useCallback(async () => {
    try {
      setApplicationsLoading(true);

      const { data } = await axios.get("/api/jobs/applications");

      if (data?.success) {
        setAppliedJobs(data.data);
      }
    } catch (err) {
      console.error("Applications fetch error:", err);
    } finally {
      setApplicationsLoading(false);
    }
  }, []);

  /* ================= DERIVED DATA ================= */
  const userData = useMemo(
    () => ({
      name: user?.username || user?.name || "User",
      streak: 47,
      todayGoal: 2,
      completedToday: 1,
    }),
    [user]
  );

  const learningInsights = useMemo(() => {
    if (!enrolledCourses.length) {
      return {
        weeklyHours: 0,
        completionRate: 0,
        focusArea: "N/A",
        strongestSkill: "N/A",
      };
    }

    const total = enrolledCourses.length;
    const completed = enrolledCourses.filter((c) => c.isCompleted).length;
    const completionRate = Math.round((completed / total) * 100);

    const categoryCount = {};
    enrolledCourses.forEach((c) => {
      const cat = c.courseId?.category;
      if (cat) categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });

    const focusArea = Object.keys(categoryCount).reduce(
      (a, b) => (categoryCount[a] > categoryCount[b] ? a : b),
      "N/A"
    );

    const strongestCourse = enrolledCourses.reduce(
      (prev, curr) =>
        curr.progressPercentage > prev.progressPercentage ? curr : prev,
      enrolledCourses[0]
    );

    const strongestSkill =
      strongestCourse?.courseId?.tags?.[0]
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase()) || "N/A";

    const weeklyHours = enrolledCourses
      .reduce((sum, c) => {
        const totalHours = parseInt(c.courseId?.estimatedTime || 0);
        return sum + ((c.progressPercentage / 100) * totalHours) / 4;
      }, 0)
      .toFixed(1);

    return {
      weeklyHours,
      completionRate,
      focusArea,
      strongestSkill,
    };
  }, [enrolledCourses]);

  /* ================= LOADING ================= */
  if (status === "loading") {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? "bg-slate-950" : "bg-gray-50"
        }`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div
      className={`min-h-screen pt-20 pb-12 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white"
          : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <WelcomeHeader userData={userData} isDark={isDark} />

        <QuickStatsGrid
          isDark={isDark}
          enrolledCourses={enrolledCourses}
          profile={profile}
        />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ContinueLearningSection
              enrolledCourses={enrolledCourses}
              isDark={isDark}
            />

            <RecommendedSection
              recommended={recommendedCourses}
              isDark={isDark}
            />

            <LearningInsights
              learningInsights={learningInsights}
              isDark={isDark}
            />
          </div>

          <div className="space-y-6">
            {/* <TodayGoals
              todayTasks={tasks} 
              onToggleTask={toggleTask}
              isDark={isDark}
            />
            */}

            <AppliedJobsCard jobs={appliedJobs} isDark={isDark} />

            <RecentActivityCard
              recentActivity={profile?.recentActivity}
              userId={profile?.userId}
              isDark={isDark}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
