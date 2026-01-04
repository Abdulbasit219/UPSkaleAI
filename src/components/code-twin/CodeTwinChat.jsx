"use client";
import React, { useRef, useEffect } from "react";
import {
  Bot,
  User,
  Send,
  Copy,
  Volume2,
  VolumeX,
  Settings,
  Sparkles,
  Terminal,
  Check,
  Maximize2,
  Minimize2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

const CodeTwinChat = ({
  messages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  isLoading,
  isDark,
  isSpeaking,
  setIsSpeaking,
  className,
  onToggleFullscreen,
  isFullscreen,
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const MarkdownComponents = {
    p: ({ children }) => (
      <p className="mb-4 last:mb-0 leading-relaxed text-[14px]">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-xl font-bold mb-4 mt-6 first:mt-0 text-purple-500">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-lg font-bold mb-3 mt-5 first:mt-0 text-purple-400">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-base font-bold mb-2 mt-4 first:mt-0 text-purple-300">
        {children}
      </h3>
    ),
    ul: ({ children }) => (
      <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-[14px] leading-relaxed">{children}</li>
    ),
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      const lang = match ? match[1] : "code";

      if (!inline) {
        return (
          <div className="my-6 rounded-2xl overflow-hidden border border-purple-500/20 bg-[#0d1117] shadow-2xl group/code">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-purple-500/10">
              <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5" />
                {lang}
              </span>
              <button
                onClick={() =>
                  copyToClipboard(String(children).replace(/\n$/, ""))
                }
                className="p-1.5 hover:bg-white/10 rounded-lg transition-all text-gray-400 hover:text-white"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
            <pre className="p-5 overflow-x-auto custom-scrollbar">
              <code className="text-[13px] font-mono text-emerald-400 leading-relaxed block">
                {children}
              </code>
            </pre>
          </div>
        );
      }
      return (
        <code
          className="px-1.5 py-0.5 rounded-md bg-purple-500/10 text-purple-400 font-mono text-[13px] border border-purple-500/10"
          {...props}
        >
          {children}
        </code>
      );
    },
    strong: ({ children }) => (
      <strong className="font-bold text-purple-500 dark:text-purple-400">
        {children}
      </strong>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-purple-500 px-4 py-2 my-4 bg-purple-500/5 rounded-r-xl italic">
        {children}
      </blockquote>
    ),
  };

  return (
    <div className={`flex flex-col h-full min-h-[600px] ${className || ""}`}>
      <div
        className={`flex-1 backdrop-blur-3xl border rounded-[2rem] overflow-hidden flex flex-col transition-all duration-500 ${
          isDark
            ? "bg-slate-900/40 border-purple-500/20 shadow-[0_0_50px_rgba(0,0,0,0.3)]"
            : "bg-white/70 border-purple-200/50 shadow-[0_0_50px_rgba(168,85,247,0.05)]"
        }`}
      >
        {/* Chat Header */}
        <div
          className={`px-8 py-6 border-b flex items-center justify-between bg-gradient-to-r ${
            isDark
              ? "from-slate-900/50 to-purple-900/20 border-purple-500/10"
              : "from-white/50 to-purple-50/50 border-purple-200/50"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse"></div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2
                  className={`text-xl font-black tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  CodeTwin AI
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <p
                  className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  Ready to assist with your code
                </p>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            {onToggleFullscreen && (
              <button
                onClick={onToggleFullscreen}
                className={`p-2.5 rounded-xl transition-all duration-300 ${isDark ? "bg-slate-800/50 text-gray-400 hover:text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                title={isFullscreen ? "Minimize" : "Maximize"}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
            )}
            <button
              onClick={() => setIsSpeaking(!isSpeaking)}
              className={`p-2.5 rounded-xl transition-all duration-300 ${isDark ? "bg-slate-800/50 text-gray-400 hover:text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
            >
              {isSpeaking ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 scroll-smooth custom-scrollbar">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <Sparkles className="w-12 h-12 text-purple-500 animate-bounce" />
              <p
                className={`text-lg font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                "How can I help you build something amazing today?"
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 group animate-in fade-in slide-in-from-bottom-4 duration-500 ${
                message.type === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg transition-transform group-hover:scale-110 ${
                  message.type === "user"
                    ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                    : "bg-gradient-to-br from-purple-500 to-pink-500"
                }`}
              >
                {message.type === "user" ? (
                  <User className="w-6 h-6 text-white" />
                ) : (
                  <Bot className="w-6 h-6 text-white" />
                )}
              </div>

              <div
                className={`max-w-[85%] rounded-[2rem] px-6 py-5 border relative ${
                  message.type === "user"
                    ? isDark
                      ? "bg-blue-600/10 border-blue-500/20 text-blue-50"
                      : "bg-blue-50 border-blue-200 text-blue-900"
                    : isDark
                      ? "bg-slate-800/80 border-purple-500/20 text-gray-100 font-normal"
                      : "bg-gray-50 border-purple-200/50 text-gray-900 font-normal"
                }`}
              >
                <div
                  className={`max-w-none transition-all ${isDark ? "prose prose-invert" : "prose prose-slate"}`}
                >
                  <ReactMarkdown components={MarkdownComponents}>
                    {message.content}
                  </ReactMarkdown>
                </div>

                <div
                  className={`text-[9px] mt-3 font-bold uppercase tracking-widest opacity-30 flex items-center gap-2 ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {message.type === "user" && (
                    <Check className="w-3 h-3 text-blue-400" />
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 animate-pulse">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-purple-400" />
              </div>
              <div
                className={`rounded-[2rem] px-8 py-5 border ${
                  isDark
                    ? "bg-slate-800/50 border-purple-500/20"
                    : "bg-gray-50 border-purple-200/50"
                }`}
              >
                <div className="flex space-x-3">
                  <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce"></div>
                  <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div
          className={`p-6 border-t ${isDark ? "border-purple-500/10" : "border-purple-200/50"}`}
        >
          <div className="relative group">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your question here..."
              className={`w-full pl-6 pr-32 py-5 rounded-[2rem] border-2 placeholder-gray-500 focus:outline-none transition-all resize-none font-medium text-sm shadow-inner ${
                isDark
                  ? "bg-slate-950/80 border-purple-500/10 text-white focus:border-purple-500/50"
                  : "bg-white border-purple-100 text-gray-900 focus:border-purple-500/50"
              }`}
              rows="1"
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />

            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="group/btn relative px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-bold hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all disabled:opacity-50 flex items-center gap-2 active:scale-95 shadow-lg"
              >
                <span className="text-xs uppercase tracking-wider">
                  {isLoading ? "Wait..." : "Send"}
                </span>
                <Send className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          <div className="hidden sm:flex flex-wrap gap-2 mt-4 ml-2">
            {[
              "Explain my code",
              "Find bugs",
              "Optimize performance",
              "Refactor logic",
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(suggestion)}
                className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full transition-all border ${
                  isDark
                    ? "bg-slate-800/50 text-gray-400 border-purple-500/10 hover:border-purple-500/50 hover:text-white"
                    : "bg-gray-50 text-gray-600 border-purple-100 hover:border-purple-300 hover:text-purple-700"
                }`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeTwinChat;
