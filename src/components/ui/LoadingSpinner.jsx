import React from "react";
import { useSelector } from "react-redux";

const LoadingSpinner = () => {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDark ? "bg-slate-950" : "bg-gray-50"
      }`}
    >
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className={isDark ? "text-gray-400" : "text-gray-600"}>Loading</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
