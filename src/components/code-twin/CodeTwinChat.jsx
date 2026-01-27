"use client";
import React, { useRef, useEffect } from "react";
import {
  Bot,
  User,
  Send,
  Copy,
  Volume2,
  VolumeX,
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
      <p className="mb-3 sm:mb-4 last:mb-0 leading-relaxed text-[11px] sm:text-sm font-medium opacity-90">
        {children}
      </p>
    ),
    h1: ({ children }) => (
      <h1 className="text-sm sm:text-xl font-black mb-2 sm:mb-4 mt-4 sm:mt-6 first:mt-0 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xs sm:text-lg font-bold mb-2 sm:mb-3 mt-3 sm:mt-5 first:mt-0 text-purple-400">
        {children}
      </h2>
    ),
    ul: ({ children }) => (
      <ul className="list-disc ml-4 sm:ml-6 mb-3 sm:mb-4 space-y-1 sm:space-y-2 opacity-90 text-[11px] sm:text-sm">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal ml-4 sm:ml-6 mb-3 sm:mb-4 space-y-1 sm:space-y-2 opacity-90 text-[11px] sm:text-sm">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      const lang = match ? match[1] : "code";

      if (!inline) {
        return (
          <div className="my-3 sm:my-6 rounded-xl sm:rounded-2xl overflow-hidden border border-purple-500/20 bg-slate-950 shadow-2xl group/code">
            <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2.5 bg-slate-900 border-b border-purple-500/10">
              <span className="text-[8px] sm:text-[10px] font-black text-purple-400 uppercase tracking-widest flex items-center gap-1.5 sm:gap-2">
                <Terminal className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                {lang}
              </span>
              <button
                onClick={() =>
                  copyToClipboard(String(children).replace(/\n$/, ""))
                }
                className="p-1 sm:p-1.5 hover:bg-white/10 rounded-lg transition-all text-gray-400 hover:text-white"
              >
                <Copy className="w-3 sm:w-3.5 h-3 sm:w-3.5" />
              </button>
            </div>
            <pre className="p-3 sm:p-5 overflow-x-auto custom-scrollbar">
              <code className="text-[10px] sm:text-[13px] font-mono text-emerald-400 leading-relaxed block">
                {children}
              </code>
            </pre>
          </div>
        );
      }
      return (
        <code
          className="px-1 py-0.5 rounded-md bg-purple-500/10 text-purple-400 font-mono text-[10px] sm:text-[13px] border border-purple-500/10"
          {...props}
        >
          {children}
        </code>
      );
    },
    strong: ({ children }) => (
      <strong
        className={`font-bold ${isDark ? "text-purple-400" : "text-purple-600"}`}
      >
        {children}
      </strong>
    ),
  };

  return (
    <div
      className={`flex flex-col h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] ${className || ""}`}
    >
      <div
        className={`flex-1 backdrop-blur-3xl border rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden flex flex-col transition-all duration-500 ${
          isDark
            ? "bg-slate-950/40 border-white/5 shadow-2xl shadow-purple-500/10"
            : "bg-white/90 border-slate-200 shadow-xl shadow-purple-500/5"
        }`}
      >
        {/* Chat Header */}
        <div
          className={`px-4 sm:px-8 py-3 sm:py-6 border-b flex items-center justify-between transition-colors ${
            isDark
              ? "bg-slate-900/50 border-white/5"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative shrink-0">
              <div className="w-10 h-10 sm:w-14 h-14 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-all duration-300">
                <Bot className="w-5 h-5 sm:w-8 h-8 text-white" />
              </div>
              <div
                className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-emerald-500 border-2 rounded-full animate-pulse shadow-sm ${isDark ? "border-slate-950" : "border-white"}`}
              ></div>
            </div>
            <div>
              <h2
                className={`text-xs sm:text-lg font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}
              >
                CodeTwin AI
              </h2>
              <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest opacity-40">
                  Ready
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {onToggleFullscreen && (
              <button
                onClick={onToggleFullscreen}
                className={`p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl transition-all ${isDark ? "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white" : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 shadow-sm"}`}
                title={isFullscreen ? "Minimize" : "Maximize"}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-3.5 h-3.5 sm:w-4 h-4" />
                ) : (
                  <Maximize2 className="w-3.5 h-3.5 sm:w-4 h-4" />
                )}
              </button>
            )}
            <button
              onClick={() => setIsSpeaking(!isSpeaking)}
              className={`p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl transition-all ${isDark ? "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white" : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 shadow-sm"}`}
            >
              {isSpeaking ? (
                <VolumeX className="w-4 h-4 sm:w-5 h-5" />
              ) : (
                <Volume2 className="w-4 h-4 sm:w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-4 sm:py-8 space-y-4 sm:space-y-8 scroll-smooth custom-scrollbar min-h-0">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 opacity-30">
              <div className="w-14 h-14 sm:w-20 sm:h-20 bg-purple-500/10 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-7 h-7 sm:w-10 sm:h-10 text-purple-500" />
              </div>
              <p
                className={`text-[10px] sm:text-base font-bold tracking-tight px-6 sm:px-12 ${isDark ? "text-gray-400" : "text-slate-600"}`}
              >
                Your AI coding mentor is here. Let's build something.
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 sm:gap-4 group animate-in fade-in slide-in-from-bottom-2 sm:slide-in-from-bottom-4 duration-500 ${
                message.type === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-7 h-7 sm:w-11 h-11 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 shadow-lg transition-all group-hover:scale-110 ${
                  message.type === "user"
                    ? "bg-gradient-to-br from-indigo-500 to-blue-600 shadow-blue-500/20"
                    : "bg-gradient-to-br from-purple-500 to-pink-500 shadow-purple-500/20"
                }`}
              >
                {message.type === "user" ? (
                  <User className="w-4 h-4 sm:w-6 h-6 text-white" />
                ) : (
                  <Bot className="w-4 h-4 sm:w-6 h-6 text-white" />
                )}
              </div>

              <div
                className={`max-w-[88%] sm:max-w-[85%] rounded-[1.2rem] sm:rounded-3xl px-3 sm:px-7 py-2.5 sm:py-6 border transition-all ${
                  message.type === "user"
                    ? isDark
                      ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-50 shadow-sm"
                      : "bg-white border-blue-100 text-slate-800 shadow-xl shadow-blue-500/5 font-semibold"
                    : isDark
                      ? "bg-slate-800/80 border-white/5 text-gray-100 font-medium"
                      : "bg-slate-50 border-slate-200 text-slate-900 shadow-sm font-medium"
                }`}
              >
                <div
                  className={`max-w-none transition-all ${isDark ? "prose prose-invert prose-xs sm:prose-sm" : "prose prose-slate prose-xs sm:prose-sm"}`}
                >
                  <ReactMarkdown components={MarkdownComponents}>
                    {message.content}
                  </ReactMarkdown>
                </div>

                <div
                  className={`mt-2 sm:mt-4 pt-1.5 sm:pt-3 border-t flex items-center gap-2 sm:gap-3 opacity-30 text-[7px] sm:text-[9px] font-black uppercase tracking-widest ${
                    message.type === "user"
                      ? "justify-end border-indigo-500/10"
                      : "justify-start border-slate-500/10"
                  }`}
                >
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {message.type === "user" && (
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500" />
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2 sm:gap-4 animate-pulse">
              <div className="w-7 h-7 sm:w-11 h-11 rounded-lg sm:rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Bot className="w-4 h-4 sm:w-6 h-6 text-purple-400" />
              </div>
              <div
                className={`rounded-[1.2rem] sm:rounded-3xl px-5 sm:px-8 py-3 sm:py-6 border ${isDark ? "bg-slate-800/50 border-white/5" : "bg-slate-50 border-slate-200"}`}
              >
                <div className="flex space-x-1 sm:space-x-2">
                  <div className="w-1.5 h-1.5 sm:w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div
          className={`p-3 sm:p-6 border-t transition-colors ${isDark ? "bg-slate-900/40 border-white/5" : "bg-white border-slate-200"}`}
        >
          <div className="relative group max-w-4xl mx-auto">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Mentor assistance here..."
              className={`w-full pl-4 sm:pl-6 pr-20 sm:pr-32 py-3 sm:py-5 rounded-xl sm:rounded-3xl border-2 transition-all resize-none font-bold text-xs sm:text-sm shadow-inner custom-scrollbar ${
                isDark
                  ? "bg-slate-950/80 border-white/5 text-white focus:border-purple-500/50 placeholder-slate-700"
                  : "bg-slate-50 border-slate-100 text-slate-900 focus:border-purple-500/50 placeholder-slate-400 shadow-sm"
              }`}
              rows="1"
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />

            <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="group/btn relative px-3 sm:px-6 py-1.5 sm:py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg sm:rounded-2xl font-black text-[8px] sm:text-[10px] uppercase tracking-widest hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all disabled:opacity-50 flex items-center gap-1.5 sm:gap-2 active:scale-95 shadow-lg"
              >
                {isLoading ? "..." : "Send"}
                <Send className="w-3 sm:w-3.5 h-3 sm:h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          <div className="hidden sm:flex flex-wrap gap-2 mt-4 justify-center">
            {["Debug", "Refactor", "Explain", "Optimize"].map(
              (suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(`${suggestion} this code...`)}
                  className={`px-3 py-1.5 text-[8px] font-black uppercase tracking-wider rounded-full transition-all border ${
                    isDark
                      ? "bg-white/5 text-gray-400 border-white/5 hover:border-purple-500/50 hover:text-white"
                      : "bg-slate-50 text-slate-500 border-slate-200 hover:border-purple-500/50 hover:text-purple-600 shadow-sm"
                  }`}
                >
                  {suggestion}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeTwinChat;
