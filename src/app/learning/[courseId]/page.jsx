"use client";

import LessonItem from "@/components/learning/LessonItem";
import axios from "axios";
import { ArrowLeft, BookOpen, CheckCircle, Clock, Users } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const CoursePage = () => {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(null);

  const params = useParams();
  //   const router = useRouter();

  const { courseId } = params;

  const fetchCourseData = async () => {
    try {
      //get course details
      const courseRes = await axios.get(`/api/learning/courses/${courseId}`);
      setCourse(courseRes?.data?.data);

      //get lesson details
      const lessonsRes = await axios.get(
        `/api/learning/courses/${courseId}/lessons`
      );
      setLessons(lessonsRes?.data?.data);

      // Check enrollment
      const enrollRes = await axios.get(
        `/api/learning/courses/${courseId}/enroll`
      );
      setIsEnrolled(enrollRes?.data?.data);

      if (enrollRes?.enrolled) {
        const progressRes = await axios.get(
          `/api/learning/progress?courseId=${courseId}`
        );
        // const progressData = await progressRes.json();
        setProgress(progressRes?.data?.data[0]);
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    try {
      const response = await axios.post(
        `/api/learning/courses/${courseId}/enroll`
      );

      if (response?.status === 200) {
        setIsEnrolled(true);
        toast.success("Sucessfully Enrolled");
        fetchCourseData();
      } else {
        toast.error("Already Enrolled");
      }
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };

  const isLessonCompleted = (lessonId) => {
    if (!progress) return false;
    return progress.completedLessons.some((cl) => cl.lessonId === lessonId);
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Course not found
          </h2>
          <Link
            href="/learning"
            className="text-purple-400 hover:text-purple-300"
          >
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/learning"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-8 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  {course.category}
                </span>
                <span className="px-3 py-1 bg-slate-700/50 text-gray-300 rounded-full text-sm">
                  {course.difficulty}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {course.title}
              </h1>

              <p className="text-gray-400 mb-6">{course.description}</p>

              {/* Course Stats */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{course.enrolledCount} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{course.lessonCount} lessons</span>
                </div>
              </div>

              {/* Enroll Button */}
              {!isEnrolled && (
                <button
                  onClick={handleEnroll}
                  className="mt-6 w-full md:w-auto cursor-pointer px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  Enroll Now - Free
                </button>
              )}

              {/* Progress */}
              {isEnrolled && progress && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Your Progress</span>
                    <span className="text-sm font-semibold text-purple-300">
                      {progress.progressPercentage}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                      style={{ width: `${progress.progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Prerequisites */}
            {course.prerequisites && course.prerequisites.length > 0 && (
              <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Prerequisites
                </h3>
                <ul className="space-y-2">
                  {course.prerequisites.map((prereq, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-400"
                    >
                      <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>{prereq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar - Lessons */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6 lg:sticky lg:top-24">
              <h3 className="text-xl font-bold text-white mb-4">
                Course Content
              </h3>

              {lessons.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  No lessons available yet
                </p>
              ) : (
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {lessons.map((lesson, index) => (
                    <LessonItem
                      key={lesson._id}
                      lesson={lesson}
                      index={index}
                      isCompleted={isLessonCompleted(lesson._id)}
                      isEnrolled={isEnrolled}
                      courseId={courseId}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
