"use client";
import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Target,
  Briefcase,
  CheckCircle,
  Users,
  Code,
  Flame,
  Trophy,
  Video,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import WelcomeHeader from "@/components/dashboard/user/WelcomeHeader";
import QuickStatsGrid from "@/components/dashboard/user/QuickStatsGrid";
import ContinueLearningSection from "@/components/dashboard/user/ContinueLearningSection";
import RecommendedSection from "@/components/dashboard/user/RecommendedSection";
import LearningInsights from "@/components/dashboard/user/LearningInsights";
import TodayGoals from "@/components/dashboard/user/TodayGoals";
import UpcomingEventsCard from "@/components/dashboard/user/UpcomingEventsCard";
import RecentActivityCard from "@/components/dashboard/user/RecentActivityCard";

export default function Dashboard() {
  
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";
  const { data: session, status } = useSession();
  const router = useRouter();

  // User data
  const userData = {
    name: session?.user?.username || session?.user?.name || "User",
    streak: 47,
    todayGoal: 2,
    completedToday: 1,
  };

  // Quick stats
  const quickStats = [
    {
      icon: <Flame className="w-5 h-5" />,
      value: "47",
      label: "Day Streak",
      change: "+2 days",
      color: "from-orange-500 to-red-500",
      trend: "up",
    },
    {
      icon: <Target className="w-5 h-5" />,
      value: "65%",
      label: "Career Progress",
      change: "+5% this week",
      color: "from-green-500 to-emerald-500",
      trend: "up",
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      value: "12",
      label: "Active Courses",
      change: "3 in progress",
      color: "from-blue-500 to-cyan-500",
      trend: "neutral",
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      value: "24",
      label: "Achievements",
      change: "2 new badges",
      color: "from-purple-500 to-pink-500",
      trend: "up",
    },
  ];

  // Continue learning
  const continueLearning = [
    {
      title: "Advanced React Patterns",
      category: "Web Development",
      progress: 75,
      timeLeft: "2h 30m left",
      nextLesson: "Higher Order Components",
      thumbnail: "⚛️",
      difficulty: "Advanced",
    },
    {
      title: "Node.js Backend Mastery",
      category: "Backend Development",
      progress: 45,
      timeLeft: "5h 15m left",
      nextLesson: "RESTful API Design",
      thumbnail: "🟢",
      difficulty: "Intermediate",
    },
    {
      title: "Database Design Fundamentals",
      category: "Database",
      progress: 30,
      timeLeft: "8h 45m left",
      nextLesson: "Normalization Techniques",
      thumbnail: "💾",
      difficulty: "Beginner",
    },
  ];

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

  // Recent activity
  // const recentActivity = [
  //   {
  //     type: "course",
  //     title: "Completed 'State Management' lesson",
  //     time: "2 hours ago",
  //     icon: <CheckCircle className="w-4 h-4 text-green-400" />,
  //   },
  //   {
  //     type: "achievement",
  //     title: "Earned 'Quick Learner' badge",
  //     time: "5 hours ago",
  //     icon: <Trophy className="w-4 h-4 text-yellow-400" />,
  //   },
  //   {
  //     type: "project",
  //     title: "Updated E-Commerce project",
  //     time: "1 day ago",
  //     icon: <Code className="w-4 h-4 text-blue-400" />,
  //   },
  // ];

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
  const learningInsights = {
    weeklyHours: 12.5,
    completionRate: 85,
    focusArea: "Frontend Development",
    strongestSkill: "React",
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


  // Show loading while checking authentication
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
        <QuickStatsGrid quickStats={quickStats} isDark={isDark} />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning */}
            <ContinueLearningSection
              continueLearning={continueLearning}
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
              userData={userData}
              todayTasks={todayTasks}
            />

            {/* Upcoming Events */}
            <UpcomingEventsCard
              isDark={isDark}
              upcomingEvents={upcomingEvents}
            />

            {/* Recent Activity */}
            <RecentActivityCard
              isDark={isDark}
              recentActivity={recentActivity}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
