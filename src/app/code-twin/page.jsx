"use client";
import React, { useState, useEffect } from "react";
import { Brain, Bug, Zap, GitBranch, Bot, User } from "lucide-react";
import { useSelector } from "react-redux";
import BackgroundPattern from "@/components/ui/BackgroundPattern";

// New Components
import CodeTwinHeader from "@/components/code-twin/CodeTwinHeader";
import CodeTwinSidebar from "@/components/code-twin/CodeTwinSidebar";
import CodeTwinChat from "@/components/code-twin/CodeTwinChat";
import FeatureGrid from "@/components/code-twin/FeatureGrid";

export default function CodeTwinPage() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  // Initialize conversation
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          type: "ai",
          content:
            "Greetings, Commander. I am **CodeTwin**, your neural-linked coding mentor. I'm synchronized and ready to help you architect, debug, or optimize your next breakthrough. What's on the roadmap today?",
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMsg = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/code-twin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          context: "Advanced coding mentorship and pair programming",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            type: "ai",
            content: data.content,
            timestamp: new Date(),
          },
        ]);
      } else {
        throw new Error(data.error || "Failed to get response");
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "ai",
          content:
            "I encountered a synchronization error. Please try again or check your connection.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <Brain />,
      title: "Neural Mentor",
      description:
        "Get deep architectural insights and learn the 'why' behind the code.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Bug />,
      title: "Logic Auditor",
      description:
        "Automated vulnerability detection and logical flow validation.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Zap />,
      title: "Performance Engine",
      description:
        "Micro-optimizations for runtime efficiency and memory usage.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: <GitBranch />,
      title: "Pair Architect",
      description:
        "Collaborative system design and codebase evolution strategy.",
      gradient: "from-orange-500 to-yellow-500",
    },
  ];

  const codingTopics = [
    { name: "System Design", level: "Advanced", progress: 65 },
    { name: "Compilers & Runtimes", level: "Expert", progress: 40 },
    { name: "Web Infrastructure", level: "Intermediate", progress: 85 },
    { name: "Algorithm mastery", level: "Advanced", progress: 75 },
  ];

  const recentChallenges = [
    { title: "Distributed Consensus", difficulty: "Expert", completed: false },
    { title: "Memory Management", difficulty: "Hard", completed: true },
    { title: "Concurrent Processing", difficulty: "Medium", completed: true },
    { title: "Graph Optimization", difficulty: "Hard", completed: false },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-700 selection:bg-purple-500/30 ${
        isDark ? "bg-[#020617]" : "bg-[#fcfaff]"
      } pt-24 pb-16 overflow-x-hidden`}
    >
      <BackgroundPattern />

      {/* Decorative Blur Blobs */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div
        className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <CodeTwinHeader isDark={isDark} />

        <div className="grid lg:grid-cols-4 gap-8">
          <CodeTwinSidebar
            isDark={isDark}
            codingTopics={codingTopics}
            recentChallenges={recentChallenges}
          />

          <CodeTwinChat
            messages={messages}
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={handleSendMessage}
            isLoading={isLoading}
            isDark={isDark}
            isSpeaking={isSpeaking}
            setIsSpeaking={setIsSpeaking}
          />
        </div>

        <FeatureGrid isDark={isDark} features={features} />
      </div>
    </div>
  );
}
