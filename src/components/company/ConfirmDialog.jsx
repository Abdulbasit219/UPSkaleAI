import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, X } from "lucide-react";

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDark = false,
  variant = "danger",
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  const getVariantColors = () => {
    switch (variant) {
      case "danger":
        return {
          icon: "text-red-500",
          iconBg: isDark ? "bg-red-500/20" : "bg-red-100",
          confirmBtn: isDark
            ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
            : "bg-red-600 text-white hover:bg-red-700",
        };
      case "warning":
        return {
          icon: "text-yellow-500",
          iconBg: isDark ? "bg-yellow-500/20" : "bg-yellow-100",
          confirmBtn: isDark
            ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
            : "bg-yellow-600 text-white hover:bg-yellow-700",
        };
      case "info":
        return {
          icon: "text-blue-500",
          iconBg: isDark ? "bg-blue-500/20" : "bg-blue-100",
          confirmBtn: isDark
            ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
            : "bg-blue-600 text-white hover:bg-blue-700",
        };
      default:
        return {
          icon: "text-red-500",
          iconBg: isDark ? "bg-red-500/20" : "bg-red-100",
          confirmBtn: isDark
            ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
            : "bg-red-600 text-white hover:bg-red-700",
        };
    }
  };

  const colors = getVariantColors();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const dialogContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-md rounded-2xl border shadow-2xl transform transition-all animate-scaleIn ${
          isDark
            ? "bg-slate-900 border-purple-500/20"
            : "bg-white border-purple-200/30"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Icon */}
        <div className="p-6 pb-4">
          <div className="flex items-start gap-4">
            <div
              className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${colors.iconBg}`}
            >
              <AlertTriangle className={`w-6 h-6 ${colors.icon}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className={`text-xl font-bold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {title}
              </h3>
              <button
                onClick={onClose}
                className={`absolute top-4 right-4 p-2 rounded-xl transition-all ${
                  isDark
                    ? "hover:bg-slate-800 text-gray-400 hover:text-white"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="px-6 pb-6">
          <p
            className={`text-sm leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {message}
          </p>
        </div>

        {/* Actions */}
        <div
          className={`flex items-center justify-end gap-3 px-6 py-4 border-t ${
            isDark
              ? "border-gray-700 bg-slate-800/50"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          <button
            onClick={onClose}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
              isDark
                ? "bg-slate-700 text-white hover:bg-slate-600"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all ${colors.confirmBtn}`}
          >
            {confirmText}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );

  return createPortal(dialogContent, document.body);
};

export default ConfirmDialog;
