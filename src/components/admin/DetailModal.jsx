"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { X } from "lucide-react";

export default function DetailModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = "max-w-2xl",
}) {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`w-full ${maxWidth} max-h-[90vh] flex flex-col rounded-xl border backdrop-blur-xl shadow-2xl animate-in zoom-in-95 duration-200 ${
          isDark
            ? "bg-slate-900 border-purple-500/20"
            : "bg-white border-purple-300/20"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-6 border-b shrink-0 ${
            isDark ? "border-purple-500/20" : "border-purple-300/20"
          }`}
        >
          <h2
            className={`text-xl sm:text-2xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-all ${
              isDark
                ? "hover:bg-slate-800 text-gray-400 hover:text-white"
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">{children}</div>

        {/* Footer */}
        {footer && (
          <div
            className={`p-6 border-t shrink-0 ${
              isDark ? "border-purple-500/20" : "border-purple-300/20"
            }`}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
