"use client";
import React, { useState } from "react";
import {
  Copy,
  Play,
  RotateCcw,
  Terminal,
  Trash2,
  Maximize2,
  Minimize2,
} from "lucide-react";

const CodeEditor = ({
  isDark,
  code,
  setCode,
  language = "javascript",
  onToggleFullscreen,
  isFullscreen,
}) => {
  const [lineCount, setLineCount] = useState(code.split("\n").length || 1);
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleCodeChange = (e) => {
    const val = e.target.value;
    setCode(val);
    setLineCount(val.split("\n").length);
  };

  const handleRun = () => {
    setIsRunning(true);
    const logs = [];
    const originalLog = console.log;

    console.log = (...args) => {
      logs.push(
        args
          .map((arg) =>
            typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
          )
          .join(" ")
      );
    };

    try {
      const runCode = new Function(code);
      runCode();
      setOutput(
        logs.length > 0 ? logs : ["Code executed successfully (no output)."]
      );
    } catch (err) {
      setOutput([`Error: ${err.message}`]);
    } finally {
      console.log = originalLog;
      setIsRunning(false);
    }
  };

  return (
    <div
      className={`flex flex-col h-full rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-500 ${
        isDark
          ? "bg-[#0d1117] border-white/5 shadow-2xl shadow-purple-500/5"
          : "bg-white border-slate-200 shadow-xl shadow-purple-500/5"
      }`}
    >
      {/* Editor Header */}
      <div
        className={`flex items-center justify-between px-3 sm:px-6 py-2 sm:py-4 border-b transition-colors ${
          isDark
            ? "bg-slate-900/50 border-white/5 backdrop-blur-md"
            : "bg-slate-50 border-slate-200"
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden xs:flex gap-1.5 sm:gap-2">
            <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-red-500/80 shadow-sm" />
            <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-amber-500/80 shadow-sm" />
            <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-emerald-500/80 shadow-sm" />
          </div>
          <div
            className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-lg border transition-colors ${
              isDark
                ? "bg-white/5 border-white/10 text-gray-300"
                : "bg-white border-slate-200 text-slate-600 shadow-sm"
            }`}
          >
            <Terminal className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-500" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-tight">
              main.js
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          {onToggleFullscreen && (
            <button
              title={isFullscreen ? "Minimize" : "Maximize"}
              onClick={onToggleFullscreen}
              className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all ${
                isDark
                  ? "hover:bg-white/10 text-gray-400 hover:text-white"
                  : "hover:bg-slate-200 text-slate-500 hover:text-slate-900"
              }`}
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              )}
            </button>
          )}

          <div
            className={`w-px h-4 sm:h-5 mx-0.5 sm:mx-1 ${isDark ? "bg-white/10" : "bg-slate-200"}`}
          />

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-5 py-1.5 sm:py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg sm:rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-purple-500/20"
          >
            <Play
              className={`w-3 h-3 sm:w-4 sm:h-4 ${isRunning ? "animate-spin" : "fill-current"}`}
            />
            <span className="hidden xs:inline">
              {isRunning ? "Wait" : "Run"}
            </span>
          </button>

          <div className="group relative">
            <button
              title="Quick Actions"
              className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all ${
                isDark
                  ? "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
                  : "bg-white border border-slate-200 text-slate-500 hover:text-slate-900 shadow-sm"
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <div className="absolute right-0 top-full mt-2 hidden group-hover:block z-50 animate-in fade-in zoom-in-95 duration-200">
              <div
                className={`flex flex-col gap-1 p-1 rounded-lg sm:rounded-xl border border-white/10 shadow-2xl backdrop-blur-xl ${isDark ? "bg-slate-900/95" : "bg-white/95"}`}
              >
                <button
                  onClick={() => navigator.clipboard.writeText(code)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] sm:text-xs font-bold transition-all ${isDark ? "hover:bg-white/5 text-gray-300" : "hover:bg-slate-100 text-slate-600"}`}
                >
                  <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Copy
                </button>
                <button
                  onClick={() => setCode("")}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] sm:text-xs font-bold text-red-400 hover:bg-red-500/10 transition-all font-bold"
                >
                  <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container for Editor and Console */}
      <div className="flex flex-col flex-1 overflow-hidden min-h-0 bg-transparent">
        {/* Editor Body */}
        <div className="relative flex-1 overflow-hidden flex transition-colors duration-500">
          {/* Line Numbers - Hidden on mobile, narrow on tablets */}
          <div
            className={`flex flex-col shrink-0 pt-3 sm:pt-6 px-1.5 sm:px-4 select-none border-r transition-all hidden xs:flex ${
              isDark
                ? "bg-[#0d1117] border-white/5 text-slate-700 font-bold"
                : "bg-slate-50/50 border-slate-200 text-slate-300"
            }`}
          >
            {Array.from({
              length: Math.min(Math.max(lineCount, 30), 1000),
            }).map((_, i) => (
              <div
                key={i}
                className={`leading-6 sm:leading-8 text-[8px] sm:text-xs font-mono text-center transition-colors ${
                  i < lineCount
                    ? isDark
                      ? "text-slate-600"
                      : "text-slate-400"
                    : "text-transparent"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Text Area */}
          <textarea
            value={code}
            onChange={handleCodeChange}
            className={`flex-1 p-3 sm:p-6 leading-6 sm:leading-8 resize-none outline-none font-mono tracking-tight text-[11px] sm:text-sm custom-scrollbar transition-colors ${
              isDark
                ? "bg-[#0d1117] text-indigo-100 placeholder-slate-700 caret-purple-400"
                : "bg-white text-slate-800 placeholder-slate-300 caret-purple-600"
            }`}
            spellCheck="false"
            style={{
              fontFamily:
                "'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace",
            }}
            placeholder="// CodeTwin: Happy coding!"
          />
        </div>

        {/* Console / Output Area */}
        <div
          className={`h-36 sm:h-48 lg:h-56 flex flex-col shrink-0 border-t transition-all duration-500 ${
            isDark
              ? "bg-slate-900/80 border-white/5"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <div
            className={`flex items-center justify-between px-4 sm:px-6 py-1.5 sm:py-3 border-b text-[8px] sm:text-[10px] font-black tracking-widest uppercase transition-colors ${
              isDark
                ? "bg-slate-950/50 text-slate-500 border-white/5"
                : "bg-white text-slate-400 border-slate-100 shadow-sm"
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
              Terminal
            </div>
            <button
              onClick={() => setOutput([])}
              className={`p-1 sm:p-1.5 rounded-lg transition-all ${isDark ? "hover:bg-red-500/10 text-slate-600 hover:text-red-400" : "hover:bg-red-50 text-slate-300 hover:text-red-500"}`}
              title="Clear Console"
            >
              <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
          <div
            className={`flex-1 overflow-y-auto p-3 sm:p-6 font-mono text-[9px] sm:text-xs custom-scrollbar leading-relaxed ${isDark ? "bg-slate-950/50" : "bg-white"}`}
          >
            {output.length === 0 ? (
              <div className="flex items-center gap-2 opacity-20 italic font-medium">
                <span className="text-purple-500 animate-pulse text-[14px]">
                  ●
                </span>
                Waiting for input...
              </div>
            ) : (
              <div className="space-y-1 sm:space-y-1.5">
                {output.map((line, i) => (
                  <div
                    key={i}
                    className={`flex gap-2 sm:gap-4 group animate-in slide-in-from-left-2 duration-300 font-bold ${line.startsWith("Error:") ? "text-red-400" : isDark ? "text-emerald-400" : "text-emerald-600"}`}
                  >
                    <span className="opacity-30 select-none shrink-0 group-hover:opacity-100 transition-opacity">
                      λ
                    </span>
                    <span className="whitespace-pre-wrap">{line}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Editor Footer */}
      <div
        className={`px-4 sm:px-6 py-1 sm:py-2 border-t text-[8px] sm:text-[10px] font-black tracking-tight uppercase flex justify-between items-center shrink-0 transition-all duration-700 ${
          isDark
            ? "bg-gradient-to-r from-purple-900/40 to-indigo-900/40 text-purple-200 border-white/5"
            : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-transparent"
        }`}
      >
        <div className="flex items-center gap-3 sm:gap-6">
          <span className="flex items-center gap-1.5">
            <div
              className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${isDark ? "bg-purple-400" : "bg-white"} animate-pulse`}
            />
            JS (ES6+)
          </span>
          <span className="hidden sm:inline-flex items-center gap-2 opacity-60">
            <RotateCcw className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            Sync Active
          </span>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="opacity-80">Line {code.split("\n").length}</span>
            <div
              className={`w-px h-2 sm:h-3 ${isDark ? "bg-white/10" : "bg-white/30"}`}
            />
            <span className="opacity-80">Chars {code.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
