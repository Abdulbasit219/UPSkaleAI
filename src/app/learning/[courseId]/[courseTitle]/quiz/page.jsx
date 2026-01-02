"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const QuizPage = () => {
  const { courseId, courseTitle } = useParams();
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [displayedQuizzes, setDisplayedQuizzes] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600);
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isReviewMode, setIsReviewMode] = useState(false);

  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/learning/quizzes?course=${courseTitle}`)
      .then((res) => {
        const fetchedQuizzes = res.data.data;
        setAllQuizzes(fetchedQuizzes);

        const selectedQuizzes = getRandomQuestions(fetchedQuizzes, 10);
        setDisplayedQuizzes(selectedQuizzes);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [courseTitle]);

  useEffect(() => {
    if (!quizStarted || submitted || timeLeft <= 0 || isReviewMode) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, submitted, timeLeft, isReviewMode]);

  const getRandomQuestions = (questions, count) => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, questions.length));
  };

  const handleSelect = (option) => {
    if (submitted || isReviewMode) return;
    setAnswers({ ...answers, [currentQuestionIndex]: option });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    let correctCount = 0;
    displayedQuizzes.forEach((q, i) => {
      if (answers[i] === q.Correct) {
        correctCount++;
      }
    });
    setScore(correctCount);
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < displayedQuizzes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  const bgClass = isDark
    ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
    : "bg-gradient-to-br from-slate-100 via-purple-100 to-slate-100";

  const cardBg = isDark ? "bg-slate-800/50" : "bg-white/80";
  const borderColor = isDark ? "border-purple-500/20" : "border-purple-300";
  const textColor = isDark ? "text-white" : "text-slate-900";
  const subTextColor = isDark ? "text-gray-300" : "text-gray-700";

  const currentQuestion = displayedQuizzes[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === displayedQuizzes.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  return (
    <div
      className={`min-h-screen pt-24 px-4 ${bgClass} transition-colors duration-300`}
    >
      <div
        className={`max-w-4xl mx-auto ${cardBg} border ${borderColor} rounded-xl p-8 shadow-2xl`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-3xl font-bold ${textColor}`}>
            Quiz - {decodeURIComponent(courseTitle)}
          </h1>
          <div className="flex items-center gap-4">
            <Link
              href={`/learning/${courseId}`}
              className="cursor-pointer px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 hover:scale-105"
            >
              ← Back to Course
            </Link>
          </div>
        </div>

        {/* Timer and Score */}
        {quizStarted && !isReviewMode && (
          <div className="flex justify-between items-center mb-6 p-4 bg-purple-500/10 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock
                className={`w-5 h-5 ${timeLeft < 60 ? "text-red-400" : "text-purple-400"}`}
              />
              <span
                className={`text-xl font-bold ${timeLeft < 60 ? "text-red-400" : textColor}`}
              >
                {formatTime(timeLeft)}
              </span>
            </div>
            <div className={`text-lg ${subTextColor}`}>
              Question {currentQuestionIndex + 1} of {displayedQuizzes.length}
            </div>
            {submitted && (
              <div className={`text-xl font-bold ${textColor}`}>
                Score: {score}/{displayedQuizzes.length}
              </div>
            )}
          </div>
        )}

        {/* Review Mode Header */}
        {isReviewMode && (
          <div className="flex justify-between items-center mb-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
            <div className={`text-lg font-semibold ${textColor}`}>
              📝 Reviewing Answers
            </div>
            <div className={`text-lg ${subTextColor}`}>
              Question {currentQuestionIndex + 1} of {displayedQuizzes.length}
            </div>
            <div className={`text-xl font-bold ${textColor}`}>
              Score: {score}/{displayedQuizzes.length} ({Math.round((score / displayedQuizzes.length) * 100)}%)
            </div>
          </div>
        )}

        {/* Start Screen */}
        {!quizStarted ? (
          <div className="text-center py-12">
            <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>
              Ready to Start?
            </h2>
            <p className={`mb-6 ${subTextColor}`}>
              You have 10 minutes to complete {displayedQuizzes.length}
              questions
            </p>
            <button
              onClick={handleStartQuiz}
              className="cursor-pointer px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 hover:scale-105 mx-auto"
            >
              Start Quiz
            </button>
          </div>
        ) : (
          <>
            {/* Question Progress Indicator */}
            <div className="mb-6">
              <div className="flex gap-1 flex-wrap">
                {displayedQuizzes.map((q, i) => {
                  const isAnswered = answers[i];
                  const isCorrectAnswer = isReviewMode && answers[i] === q.Correct;
                  const isWrongAnswer = isReviewMode && answers[i] && answers[i] !== q.Correct;
                  
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentQuestionIndex(i)}
                      className={`w-8 h-8 rounded-lg font-semibold text-xs transition-all ${
                        i === currentQuestionIndex
                          ? "bg-purple-600 text-white scale-110"
                          : isCorrectAnswer
                          ? "bg-green-500 text-white"
                          : isWrongAnswer
                          ? "bg-red-500 text-white"
                          : isAnswered
                          ? "bg-green-500/30 text-green-400 border border-green-500"
                          : isDark
                          ? "bg-slate-700 text-gray-400"
                          : "bg-slate-200 text-gray-600"
                      } hover:scale-105 cursor-pointer`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Question */}
            {currentQuestion && (
              <div
                className={`p-6 rounded-lg border ${borderColor} ${isDark ? "bg-slate-700/30" : "bg-slate-50"} mb-6`}
              >
                <p className={`${textColor} font-semibold mb-4 text-lg`}>
                  {currentQuestionIndex + 1}. {currentQuestion.Question}
                </p>

                <div className="space-y-3">
                  {["A", "B", "C", "D"].map((opt) => {
                    const isSelected = answers[currentQuestionIndex] === opt;
                    const isCorrect = currentQuestion.Correct === opt;
                    const showResult = submitted || isReviewMode;

                    let optionClass = `p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      isDark ? "border-slate-600" : "border-slate-300"
                    }`;

                    if (showResult) {
                      if (isCorrect) {
                        optionClass += " bg-green-500/20 border-green-500";
                      } else if (isSelected && !isCorrect) {
                        optionClass += " bg-red-500/20 border-red-500";
                      }
                      if (isReviewMode) {
                        optionClass += " cursor-not-allowed";
                      }
                    } else if (isSelected) {
                      optionClass += " bg-purple-500/20 border-purple-500";
                    } else {
                      optionClass += ` hover:border-purple-400 ${isDark ? "hover:bg-slate-600/30" : "hover:bg-slate-100"}`;
                    }

                    return (
                      <label key={opt} className={optionClass}>
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name={`question-${currentQuestionIndex}`}
                            checked={isSelected}
                            onChange={() => handleSelect(opt)}
                            disabled={submitted || isReviewMode}
                            className="w-5 h-5 accent-purple-500"
                          />
                          <span className={`${subTextColor} text-base`}>
                            {currentQuestion[`Option ${opt}`]}
                          </span>
                          {showResult && isCorrect && (
                            <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                          )}
                          {showResult && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>

                {(submitted || isReviewMode) && answers[currentQuestionIndex] !== currentQuestion.Correct && (
                  <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <p className="text-sm text-blue-400">
                      <strong>Explanation:</strong> {currentQuestion.Explanation}
                    </p>
                  </div>
                )}

                {isReviewMode && answers[currentQuestionIndex] === currentQuestion.Correct && (
                  <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-sm text-green-400">
                      <strong>✓ Correct!</strong> {currentQuestion.Explanation}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center gap-4 mb-6">
              <button
                onClick={handlePrevious}
                disabled={isFirstQuestion}
                className="cursor-pointer px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <div className={`text-center ${subTextColor}`}>
                <p className="text-sm">Answered: {Object.keys(answers).length} / {displayedQuizzes.length}</p>
              </div>

              <button
                onClick={handleNext}
                disabled={isLastQuestion}
                className="cursor-pointer px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Submit Button */}
            {!submitted && !isReviewMode && (
              <button
                onClick={handleSubmit}
                disabled={
                  Object.keys(answers).length !== displayedQuizzes.length
                }
                className="w-full cursor-pointer px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {Object.keys(answers).length === displayedQuizzes.length
                  ? "Submit Quiz"
                  : `Answer All Questions (${Object.keys(answers).length}/${displayedQuizzes.length})`}
              </button>
            )}

            {/* Results */}
            {submitted && !isReviewMode && (
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg text-center">
                <h3 className={`text-2xl font-bold mb-2 ${textColor}`}>
                  Quiz Completed!
                </h3>
                <p className={`text-xl ${subTextColor} mb-4`}>
                  You scored {score} out of {displayedQuizzes.length} (
                  {Math.round((score / displayedQuizzes.length) * 100)}%)
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => {
                      setIsReviewMode(true);
                      setCurrentQuestionIndex(0);
                      window.scrollTo(0, 0);
                    }}
                    className="cursor-pointer px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
                  >
                    Review Answers
                  </button>
                  <Link
                    href={`/learning/${courseId}`}
                    className="cursor-pointer px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
                  >
                    Back to Course
                  </Link>
                </div>
              </div>
            )}

            {/* Review Mode Message */}
            {isReviewMode && (
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg text-center border border-blue-500/30">
                <h3 className={`text-xl font-bold mb-2 ${textColor}`}>
                  📝 Review Mode
                </h3>
                <p className={`${subTextColor} mb-4`}>
                  You are reviewing your answers. Changes are disabled.
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => {
                      setIsReviewMode(false);
                      setCurrentQuestionIndex(0);
                      window.scrollTo(0, 0);
                    }}
                    className="cursor-pointer px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
                  >
                    Exit Review
                  </button>
                  <Link
                    href={`/learning/${courseId}`}
                    className="cursor-pointer px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
                  >
                    Back to Course
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuizPage;