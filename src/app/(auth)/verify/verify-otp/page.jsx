"use client";
import React, { useState } from "react";
import { Lock, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import Spotlight from "@/components/ui/Spotlight";
import BackgroundPattern from "@/components/ui/BackgroundPattern";

export default function ResetPasswordPage() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) return;

    try {
      setIsLoading(true);
      const res = await axios.patch("/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      if (res.data.success) {
        toast.success("Password reset successfully!");
        router.push("/sign-in");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-gray-900"
      }`}
    >
      <BackgroundPattern />
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill={isDark ? "white" : "#a855f7"}
      />
      <div className="max-w-md w-full relative z-10">
        <div
          className={`backdrop-blur-xl border rounded-3xl p-8 shadow-2xl ${
            isDark
              ? "bg-slate-900/50 border-purple-500/30 shadow-purple-500/10"
              : "bg-white/90 border-purple-300/30 shadow-purple-300/10"
          }`}
        >
          <div className="text-center mb-8">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border ${
                isDark
                  ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30"
                  : "bg-gradient-to-br from-purple-100 to-pink-100 border-purple-300/30"
              }`}
            >
              <Lock
                className={`w-8 h-8 ${isDark ? "text-purple-400" : "text-purple-600"}`}
              />
            </div>
            <h2
              className={`text-3xl font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Reset Password
            </h2>
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>
              Enter the OTP sent to{" "}
              <span className="font-semibold">{email}</span> and set a new
              password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="otp"
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={`block w-full px-4 py-3 border rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                  isDark
                    ? "bg-slate-800/50 border-purple-500/20 text-white"
                    : "bg-white border-purple-300/20 text-gray-900"
                }`}
                placeholder="Enter OTP"
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`block w-full px-4 py-3 border rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                  isDark
                    ? "bg-slate-800/50 border-purple-500/20 text-white"
                    : "bg-white border-purple-300/20 text-gray-900"
                }`}
                placeholder="Enter new password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Reset Password
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
