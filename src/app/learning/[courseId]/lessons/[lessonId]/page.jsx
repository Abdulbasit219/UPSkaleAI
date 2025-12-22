"use client";

import axios from "axios";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Code,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const LessonPage = () => {
  const params = useParams();
  const router = useRouter();
  const { courseId, lessonId } = params;

  const [lesson, setLesson] = useState(null);
  const [allLessons, setAllLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const fetchLessonData = async () => {
    try {
      // get single lesson
      const lessonRes = await axios.get(`/api/learning/lessons/${lessonId}`);
      setLesson(lessonRes?.data?.data);

      // get all lessons
      const lessonsRes = await axios.get(
        `/api/learning/courses/${courseId}/lessons`
      );
      setAllLessons(lessonsRes?.data?.data || []);

      // Check if already completed
      const progressRes = await axios.get(
        `/api/learning/progress?courseId=${courseId}`
      );
      const progress = progressRes?.data?.data?.[0];

      if (progress) {
        const completed = progress.completedLessons.some(
          (cl) => cl.lessonId === lessonId
        );
        setIsCompleted(completed);
      }
    } catch (error) {
      console.error("Error fetching lesson:", error);
    } finally {
      setLoading(false);
    }
  };

  const currentIndex = allLessons.findIndex((l) => l._id === lessonId);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < allLessons.length - 1;

  const goToPreviousLesson = () => {
    const currentIndex = allLessons.findIndex((l) => l._id === lessonId);
    if (currentIndex > 0) {
      const prevLesson = allLessons[currentIndex - 1];
      router.push(`/learning/${courseId}/lessons/${prevLesson._id}`);
    }
  };

  const goToNextLesson = () => {
    const currentIndex = allLessons.findIndex((l) => l._id === lessonId);
    if (currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1];
      router.push(`/learning/${courseId}/lessons/${nextLesson._id}`);
    }
  };

  const markAsComplete = async () => {
    if (isCompleted) {
      toast.success("You've already completed this lesson!");
      return;
    }
    setIsCompleting(true);

    try {
      const response = await axios.post("/api/learning/progress", {
        courseId,
        lessonId,
      });

      if (response.status === 200) {
        setIsCompleted(true);
        toast.success("Lesson completed!");
      }
    } catch (error) {
      console.error("Error marking complete:", error);
      toast.error("Failed to mark complete. Please try again.");
    } finally {
      setIsCompleting(false);
    }
  };

  useEffect(() => {
    fetchLessonData();
  }, [lessonId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading Lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Lesson not found
          </h2>
          <Link
            href={`/learning/${courseId}`}
            className="text-purple-400 hover:text-purple-300"
          >
            ← Back to Course
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href={`/learning/${courseId}`}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Course
        </Link>

        <article className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-8 mb-8">
          {/* Lesson Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <span>
                Lesson {currentIndex + 1} of {allLessons.length}
              </span>
              {lesson.duration && (
                <>
                  <span>•</span>
                  <Clock className="w-4 h-4" />
                  <span>{lesson.duration}</span>
                </>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {lesson.title}
            </h1>
          </div>

          {/* Lesson Content */}
          <div className="prose prose-invert max-w-none">
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {lesson.content}
            </div>
          </div>

          {/* Code Examples */}
          {lesson.codeExamples && lesson.codeExamples.length > 0 && (
            <div className="mt-8 space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                Code Examples
              </h2>
              {lesson.codeExamples.map((example, index) => (
                <div
                  key={index}
                  className="bg-slate-900/50 border border-slate-700 rounded-lg overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700">
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-300">
                        {example.language}
                      </span>
                    </div>
                  </div>
                  {example.description && (
                    <div className="px-4 py-2 text-sm text-gray-400 border-b border-slate-700">
                      {example.description}
                    </div>
                  )}
                  <pre className="p-4 overflow-x-auto">
                    <code className="text-sm text-gray-300">
                      {example.code}
                    </code>
                  </pre>
                </div>
              ))}
            </div>
          )}

          {/* Resources */}
          {lesson.resources && lesson.resources.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Additional Resources
              </h2>
              <div className="space-y-3">
                {lesson.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <ExternalLink className="w-5 h-5 text-purple-400" />
                      <div>
                        <h3 className="text-white font-medium group-hover:text-purple-300 transition-colors">
                          {resource.title}
                        </h3>
                        {resource.type && (
                          <span className="text-xs text-gray-500">
                            {resource.type}
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Previous Button */}
          <button
            onClick={goToPreviousLesson}
            disabled={!hasPrevious}
            className="w-full sm:w-auto px-6 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white font-medium hover:bg-slate-700/50 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous Lesson
          </button>

          {/* Mark as Complete Button */}
          <button
            onClick={markAsComplete}
            disabled={isCompleting || isCompleted}
            className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              isCompleted
                ? "bg-green-500/20 border-2 border-green-500/50 text-green-300 cursor-default"
                : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50 cursor-pointer"
            }`}
          >
            {isCompleting ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                Saving...
              </>
            ) : isCompleted ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Completed
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Mark as Complete
              </>
            )}
          </button>

          {/* Next Button */}
          <button
            onClick={goToNextLesson}
            disabled={!hasNext}
            className="w-full sm:w-auto px-6 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white font-medium hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Next Lesson
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
