"use client";
import React, { useEffect, useState } from "react";
import { Briefcase, Users, Video } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import WelcomeHeader from "@/components/dashboard/user/WelcomeHeader";
import QuickStatsGrid from "@/components/dashboard/user/QuickStatsGrid";
import ContinueLearningSection from "@/components/dashboard/user/ContinueLearningSection";
import RecommendedSection from "@/components/dashboard/user/RecommendedSection";
import LearningInsights from "@/components/dashboard/user/LearningInsights";
import TodayGoals from "@/components/dashboard/user/TodayGoals";
import UpcomingEventsCard from "@/components/dashboard/user/UpcomingEventsCard";
import { fetchProfile } from "@/store/slices/profileSlice";
import RecentActivityCard from "@/components/profile/recentActivity/RecentActivityCard";
import { fetchEnrolledCourses } from "@/store/slices/enrolledCoursesSlice";
import axios from "axios";

export default function Dashboard() {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";
  const { data: session, status } = useSession();
  const router = useRouter();

  const dispatch = useDispatch();
  const { data } = useSession();
  const user = data?.user;

  const { data: profile } = useSelector((state) => state.profile);

  const { data: enrolledCourses } = useSelector(
    (state) => state.enrolledCourses
  );

  const [tasks, setTasks] = useState([]);

  const userData = {
    name: user?.username || user?.name || "User",
    streak: 47,
    todayGoal: 2,
    completedToday: 1,
  };

  const fetchTodayTask = async () => {
    try {
      const { data } = await axios.get("/api/daily-goals");
      setTasks(data?.data?.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTask = async (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

    try {
      await axios.patch(`/api/daily-goals/${taskId}`);
    } catch (err) {
      console.log(err);
    }
  };

  // Recommended for you
  const recommended = [
    {
      title: "TypeScript Deep Dive",
      instructor: "Matt Pocock",
      rating: 4.8,
      students: "12.5k",
      duration: "8h",
      thumbnail: "📘",
      tags: ["TypeScript", "JavaScript", "Web Dev"],
    },
    {
      title: "AWS Cloud Practitioner",
      instructor: "Andrew Brown",
      rating: 4.9,
      students: "25k",
      duration: "12h",
      thumbnail: "☁️",
      tags: ["AWS", "Cloud", "DevOps"],
    },
    {
      title: "System Design Interview",
      instructor: "Alex Xu",
      rating: 4.7,
      students: "8.2k",
      duration: "10h",
      thumbnail: "🏗️",
      tags: ["System Design", "Interview"],
    },
  ];

  // Today's tasks
  const todayTasks = [
    {
      title: "Complete React Hooks module",
      time: "30 min",
      completed: true,
      priority: "high",
    },
    {
      title: "Practice LeetCode problems",
      time: "45 min",
      completed: false,
      priority: "high",
    },
    {
      title: "Watch Node.js tutorial",
      time: "1 hour",
      completed: false,
      priority: "medium",
    },
    {
      title: "Review JavaScript concepts",
      time: "20 min",
      completed: false,
      priority: "low",
    },
  ];

  // Upcoming events
  const upcomingEvents = [
    {
      title: "Live Q&A: React Best Practices",
      date: "Today, 3:00 PM",
      type: "Live Session",
      participants: 234,
      icon: <Video className="w-4 h-4" />,
    },
    {
      title: "Web Dev Bootcamp Cohort 5",
      date: "Tomorrow, 10:00 AM",
      type: "Workshop",
      participants: 89,
      icon: <Users className="w-4 h-4" />,
    },
    {
      title: "Career Fair - Tech Companies",
      date: "Nov 15, 2:00 PM",
      type: "Networking",
      participants: 456,
      icon: <Briefcase className="w-4 h-4" />,
    },
  ];

  // Learning insights
  const total = enrolledCourses.length;
  const completed = enrolledCourses.filter((c) => c.isCompleted).length;
  const completionRate = total ? Math.round((completed / total) * 100) : 0;

  // Focus area
  const categoryCount = {};
  enrolledCourses.forEach((c) => {
    const cat = c.courseId?.category;
    if (cat) categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  });

  const focusArea = Object.keys(categoryCount).length
    ? Object.keys(categoryCount).reduce((a, b) =>
        categoryCount[a] > categoryCount[b] ? a : b
      )
    : "N/A";

  // Strongest skill
  const strongestCourse = enrolledCourses.reduce(
    (prev, curr) =>
      curr.progressPercentage > prev.progressPercentage ? curr : prev,
    enrolledCourses[0]
  );

  const formatSkill = (tag) =>
    tag.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  const strongestSkill = strongestCourse?.courseId?.tags?.length
    ? formatSkill(strongestCourse.courseId.tags[0])
    : "N/A";

  const getHoursFromEstimatedTime = (estimatedTime) => {
    if (!estimatedTime) return 0;
    return parseInt(estimatedTime);
  };

  const weeklyHours = enrolledCourses
    .reduce((sum, c) => {
      const totalHours = getHoursFromEstimatedTime(c.courseId?.estimatedTime);

      const completedHours = (c.progressPercentage / 100) * totalHours;

      const weekly = completedHours / 4;

      return sum + weekly;
    }, 0)
    .toFixed(1);

  const learningInsights = {
    weeklyHours: weeklyHours,
    completionRate: completionRate,
    focusArea: focusArea,
    strongestSkill: strongestSkill,
  };

  useEffect(() => {
    // Redirect if not authenticated or not a Job Seeker
    if (status === "unauthenticated") {
      router.push("/sign-in");
    } else if (
      status === "authenticated" &&
      session?.user?.role !== "Job Seeker"
    ) {
      router.push("/unauthorized");
    }
  }, [status, session, router]);

  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profile, user]);

  useEffect(() => {
    if (enrolledCourses.length === 0) {
      dispatch(fetchEnrolledCourses());
    }
  }, [enrolledCourses, dispatch]);

  useEffect(() => {
    fetchTodayTask();
  }, []);

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
        className={`fixed inset-0 pointer-events-none transition-opacity duration-300 ${
          isDark
            ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"
            : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMDIsMTE2LDE0OSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Welcome Header */}
        <WelcomeHeader userData={userData} isDark={isDark} />

        {/* Quick Stats */}
        <QuickStatsGrid
          isDark={isDark}
          enrolledCourses={enrolledCourses}
          profile={profile}
        />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning */}
            <ContinueLearningSection
              enrolledCourses={enrolledCourses}
              isDark={isDark}
            />

            {/* Recommended Courses */}
            <RecommendedSection recommended={recommended} isDark={isDark} />

            {/* Learning Insights */}
            <LearningInsights
              learningInsights={learningInsights}
              isDark={isDark}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Today's Goals */}
            <TodayGoals
              isDark={isDark}
              // userData={userData}
              todayTasks={tasks}
              onToggleTask={toggleTask}
            />

            {/* Upcoming Events */}
            {/* <UpcomingEventsCard
              isDark={isDark}
              upcomingEvents={upcomingEvents}
            /> */}

            <RecentActivityCard
              recentActivity={profile?.recentActivity}
              isDark={isDark}
              userId={profile?.userId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
