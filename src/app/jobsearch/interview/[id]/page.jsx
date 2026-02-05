"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Send,
  User,
  Sparkles,
  Shield,
  Clock,
  Target,
  ChevronRight,
  StopCircle,
  Zap,
  Award,
  TrendingUp,
  CheckCircle,
  Brain,
} from "lucide-react";
import { useSelector } from "react-redux";
import BackgroundPattern from "@/components/ui/BackgroundPattern";
import axios from "axios";

export default function MockInterviewPage() {
  const { id } = useParams();
  const router = useRouter();
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [interviewEnded, setInterviewEnded] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [report, setReport] = useState(null);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Fetch job details for context
  useEffect(() => {
    const fetchJobContext = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/jobs/interview/${id}`);
        if (response.data.success) {
          setJob(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch job context:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchJobContext();
  }, [id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isAiTyping]);

  useEffect(() => {
    if (interviewStarted && inputRef.current && !interviewEnded) {
      inputRef.current.focus();
    }
  }, [interviewStarted, isAiTyping, interviewEnded]);

  const startInterview = async () => {
    setInterviewStarted(true);
    setIsAiTyping(true);

    try {
      // Fetch initial greeting from Gemini
      const response = await axios.post("/api/interview/chat", {
        jobId: id,
        jobTitle: job.title,
        company: job.company,
        requirements: job.requirements?.join(", "),
        history: [],
        message: "HI, I am ready to start the interview.",
      });

      if (response.data.success) {
        setMessages([
          {
            role: "ai",
            content: response.data.content,
          },
        ]);
        setQuestionCount(1);
      }
    } catch (error) {
      console.error("Failed to start AI interview:", error);
      setMessages([
        {
          role: "ai",
          content:
            "I apologize, but I'm having trouble connecting to the interview server right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isAiTyping || interviewEnded) return;

    const userMessage = userInput.trim();
    const newMsg = { role: "user", content: userMessage };

    setMessages((prev) => [...prev, newMsg]);
    setUserInput("");
    setIsAiTyping(true);

    try {
      const response = await axios.post("/api/interview/chat", {
        jobId: id,
        jobTitle: job.title,
        company: job.company,
        requirements: job.requirements?.join(", "),
        history: messages,
        message: userMessage,
      });

      if (response.data.success) {
        const aiMessage = response.data.content;
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: aiMessage,
          },
        ]);

        // Check if Gemini said this is the end
        if (aiMessage.toLowerCase().includes("concludes our mock interview")) {
          setInterviewEnded(true);
        } else {
          setQuestionCount((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.error("AI Response Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "I'm sorry, I missed that. Could you please repeat your answer?",
        },
      ]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const generateReport = async () => {
    console.log("Generating report for messages:", messages);
    try {
      setIsGeneratingReport(true);
      const response = await axios.post("/api/interview/report", {
        messages,
        jobTitle: job?.title || "Position",
        company: job?.company || "Company",
      });

      console.log("Report response:", response.data);

      if (response.data.success) {
        setReport(response.data.data);
      } else {
        alert(
          "Server failed to generate report: " +
            (response.data.error || "Unknown Error"),
        );
      }
    } catch (error) {
      console.error("Failed to generate report:", error);
      alert(
        "AI was unable to finalize your report. Please check your internet connection and try again.",
      );
    } finally {
      setIsGeneratingReport(false);
    }
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${isDark ? "bg-slate-950" : "bg-gray-50"}`}
      >
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
          <div
            className="absolute inset-0 rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500 animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-12 sm:py-20 px-4 transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <BackgroundPattern />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <button
            onClick={() => router.back()}
            className={`group flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all font-medium ${
              isDark
                ? "hover:bg-white/5 text-gray-400 hover:text-white"
                : "hover:bg-gray-200 text-gray-600 hover:text-gray-900"
            }`}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="text-center flex-1 mx-4">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {job?.title}
            </h1>
            <p
              className={`text-xs sm:text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              {job?.company} • AI-Powered Mock Interview
            </p>
          </div>

          {interviewStarted && !report && (
            <div
              className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl ${
                isDark ? "bg-white/5" : "bg-gray-100"
              }`}
            >
              <Brain className="w-4 h-4 text-purple-500" />
              <span className="text-xs font-medium">Q{questionCount}</span>
            </div>
          )}
          {!interviewStarted && <div className="w-20" />}
        </div>

        {report ? (
          /* Report View */
          <div className="animate-fadeIn">
            <div
              className={`backdrop-blur-xl border rounded-[2.5rem] overflow-hidden ${
                isDark
                  ? "bg-slate-900/60 border-white/10"
                  : "bg-white border-gray-200 shadow-2xl"
              }`}
            >
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 sm:p-12 text-center text-white">
                <h2 className="text-3xl sm:text-4xl font-black mb-2">
                  Evaluation Report
                </h2>
                <p className="opacity-90">
                  Based on your conversation with our AI Recruiter
                </p>

                <div className="mt-8 relative inline-block">
                  <div className="w-32 h-32 rounded-full border-4 border-white/20 flex items-center justify-center">
                    <span className="text-5xl font-black">{report.score}%</span>
                  </div>
                </div>
              </div>

              <div className="p-8 sm:p-12 space-y-10">
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Target className="text-purple-500" />
                    Executive Summary
                  </h3>
                  <p
                    className={`leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}
                  >
                    {report.summary}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div
                    className={`p-6 rounded-2xl ${isDark ? "bg-emerald-500/5 border border-emerald-500/20" : "bg-emerald-50 border border-emerald-100"}`}
                  >
                    <h4 className="text-emerald-500 font-bold mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Strengths
                    </h4>
                    <ul className="space-y-2 text-sm">
                      {report.strengths.map((s, i) => (
                        <li key={i} className="flex gap-2">
                          • {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={`p-6 rounded-2xl ${isDark ? "bg-purple-500/5 border border-purple-500/20" : "bg-purple-50 border border-purple-100"}`}
                  >
                    <h4 className="text-purple-500 font-bold mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Key Tips
                    </h4>
                    <ul className="space-y-2 text-sm">
                      {report.tips.map((t, i) => (
                        <li key={i} className="flex gap-2">
                          • {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-dashed border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <button
                    onClick={() => window.location.reload()}
                    className={`px-8 py-3 rounded-xl font-bold transition-all ${isDark ? "bg-white/5 hover:bg-white/10" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    Try Another Session
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : !interviewStarted ? (
          /* Premium Landing State */
          <div
            className={`backdrop-blur-xl border rounded-[2.5rem] p-8 sm:p-16 text-center relative overflow-hidden ${
              isDark
                ? "bg-slate-900/60 border-white/10 shadow-2xl"
                : "bg-white border-gray-200 shadow-2xl"
            }`}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-purple-500/30 animate-float">
                <Sparkles className="w-12 h-12 text-white" />
              </div>

              <h2 className="text-4xl sm:text-5xl font-black mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Ready to Excel?
              </h2>
              <p
                className={`max-w-2xl mx-auto mb-12 text-base sm:text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}
              >
                I'll be your{" "}
                <span className="font-bold text-purple-500">
                  Senior Technical Recruiter
                </span>{" "}
                from{" "}
                <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {job?.company}
                </span>
                . This isn't just practice—it's your competitive advantage.
              </p>

              {/* Enhanced Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 text-left">
                {[
                  {
                    icon: <Target className="w-6 h-6" />,
                    color: "from-blue-500 to-cyan-500",
                    title: "Tailored Questions",
                    desc: "Based on actual job requirements",
                  },
                  {
                    icon: <Zap className="w-6 h-6" />,
                    color: "from-purple-500 to-pink-500",
                    title: "Real-time Adaptive",
                    desc: "Responds to your answers naturally",
                  },
                  {
                    icon: <Award className="w-6 h-6" />,
                    color: "from-emerald-500 to-teal-500",
                    title: "Detailed Feedback",
                    desc: "Comprehensive scoring & tips",
                  },
                  {
                    icon: <TrendingUp className="w-6 h-6" />,
                    color: "from-orange-500 to-red-500",
                    title: "Track Progress",
                    desc: "See your improvement over time",
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className={`group p-6 rounded-2xl border transition-all hover:scale-105 hover:shadow-xl ${
                      isDark
                        ? "bg-white/5 border-white/10 hover:bg-white/10"
                        : "bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:border-purple-200"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                    >
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    <h4 className="text-sm font-bold mb-2">{feature.title}</h4>
                    <p
                      className={`text-xs leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={startInterview}
                className="group px-12 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-3 mx-auto relative overflow-hidden"
              >
                <span className="relative z-10">Start My Interview</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <p
                className={`mt-6 text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                ⚡ Powered by Advanced AI • 🔒 Your responses are private
              </p>
            </div>
          </div>
        ) : (
          /* Premium Chat Interface */
          <div
            className={`flex flex-col h-[75vh] backdrop-blur-xl border rounded-[2rem] overflow-hidden shadow-2xl ${
              isDark
                ? "bg-slate-900/80 border-white/10"
                : "bg-white border-gray-200"
            }`}
          >
            {/* Messages Area with Enhanced Styling */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 scroll-smooth"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
                >
                  <div
                    className={`max-w-[90%] sm:max-w-[80%] flex gap-3 sm:gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                        msg.role === "ai"
                          ? "bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 text-white"
                          : isDark
                            ? "bg-slate-800 text-gray-300 border border-white/10"
                            : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600"
                      }`}
                    >
                      {msg.role === "ai" ? (
                        <Sparkles className="w-5 h-5" />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </div>
                    <div
                      className={`p-5 rounded-2xl text-sm sm:text-base leading-relaxed shadow-lg ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-tr-md"
                          : isDark
                            ? "bg-white/5 text-gray-100 rounded-tl-md border border-white/10"
                            : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 rounded-tl-md border border-gray-200"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}

              {isAiTyping && (
                <div className="flex justify-start animate-fadeIn">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center animate-pulse shadow-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div
              className={`p-4 sm:p-6 border-t backdrop-blur-xl ${
                isDark
                  ? "border-white/10 bg-slate-950/60"
                  : "border-gray-200 bg-gray-50/80"
              }`}
            >
              {!interviewEnded ? (
                <>
                  <form onSubmit={handleSendMessage} className="flex gap-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Type your response here..."
                      disabled={isAiTyping}
                      className={`flex-1 px-5 py-4 rounded-2xl focus:outline-none transition-all text-sm sm:text-base ${
                        isDark
                          ? "bg-slate-900 border border-white/10 focus:border-purple-500/50 text-white placeholder-gray-500"
                          : "bg-white border border-gray-300 focus:border-purple-500 text-gray-900 placeholder-gray-400 shadow-sm"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    />
                    <button
                      type="submit"
                      disabled={!userInput.trim() || isAiTyping}
                      className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>

                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => setInterviewEnded(true)}
                      className={`group flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                        isDark
                          ? "text-red-400/70 hover:text-red-400 hover:bg-red-500/10"
                          : "text-red-500/70 hover:text-red-500 hover:bg-red-50"
                      }`}
                    >
                      <StopCircle className="w-4 h-4 group-hover:animate-pulse" />
                      End Interview Early
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center animate-fadeIn">
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-4 text-center">
                    Interview Successfully Completed
                  </h3>
                  <button
                    onClick={generateReport}
                    disabled={isGeneratingReport}
                    className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isGeneratingReport ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                        Analysing Performance...
                      </>
                    ) : (
                      <>
                        View My AI Performance Report
                        <Award className="w-6 h-6" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
