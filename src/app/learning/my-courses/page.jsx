"use client";
import EnrolledCourseCard from "@/components/learning/EnrolledCourseCard";
import StatCard from "@/components/learning/StatCard";
import { fetchEnrolledCourses } from "@/store/slices/enrolledCoursesSlice";
import axios from "axios";
import { Award, BookOpen, GraduationCap, TrendingUp } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MyCoursesPage = () => {
  const dispatch = useDispatch();
  const { data: enrolledCourses, loading } = useSelector(
    (state) => state.enrolledCourses
  );

  useEffect(() => {
    if (enrolledCourses.length === 0) {
      dispatch(fetchEnrolledCourses());
    }
  }, [dispatch, enrolledCourses.length]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            My Learning Journey
          </h1>
          <p className="text-gray-400">
            Track your progress and continue learning
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<BookOpen className="w-6 h-6" />}
          label="Enrolled Courses"
          value={enrolledCourses.length}
          color="purple"
        />
        <StatCard
          icon={<Award className="w-6 h-6" />}
          label="Completed"
          value={enrolledCourses.filter((c) => c.isCompleted).length}
          color="green"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          label="In Progress"
          value={enrolledCourses.filter((c) => !c.isCompleted).length}
          color="yellow"
        />
        <StatCard
          icon={<GraduationCap className="w-6 h-6" />}
          label="Certificates"
          value={enrolledCourses.filter((c) => c.certificateIssued).length}
          color="pink"
        />
      </div>

      {enrolledCourses.length === 0 ? (
        <div className="text-center py-16">
          <GraduationCap className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            No courses enrolled yet
          </h3>
          <p className="text-gray-500 mb-6">
            Start your learning journey today!
          </p>
          <Link
            href="/learning"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            <BookOpen className="w-5 h-5" />
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((progress) => (
            <EnrolledCourseCard key={progress._id} progress={progress} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCoursesPage;
