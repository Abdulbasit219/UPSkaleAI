"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signupSchema";
import { Input } from "@/components/ui/input";
import {
  Loader2,
  Sparkles,
  Briefcase,
  Building2,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "Job Seeker",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/user/signup", data);
      toast.success(response.data.message);
      router.replace(`/verify/${response.data.username}`);
    } catch (error) {
      console.error("Sign-up error:", error);
      toast.error("There was a problem. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
          : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50"
      }`}
    >
      <div className="w-full max-w-md relative z-10">
        <div
          className={`backdrop-blur-xl border rounded-2xl p-8 md:p-10 shadow-2xl ${
            isDark
              ? "bg-slate-900/80 border-purple-500/30"
              : "bg-white/90 border-purple-300/30"
          }`}
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                UpSkaleAI
              </span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1
              className={`text-3xl md:text-4xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Create Account
            </h1>
            <p
              className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm`}
            >
              Start your journey to upscale your skills and career
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Field */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <div>
                  <label
                    className={`font-medium mb-2 block text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Full Name
                  </label>
                  <Input
                    {...field}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 border rounded-xl placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none ${
                      isDark
                        ? "bg-slate-800/50 border-purple-500/30 text-white"
                        : "bg-white border-purple-300/30 text-gray-900"
                    }`}
                  />
                  {fieldState.error && (
                    <p className="text-pink-400 text-sm mt-1.5">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Email Field */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <div>
                  <label
                    className={`font-medium mb-2 block text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Email
                  </label>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full px-4 py-3 border rounded-xl ${
                      isDark
                        ? "bg-slate-800/50 border-purple-500/30 text-white"
                        : "bg-white border-purple-300/30 text-gray-900"
                    }`}
                  />
                  {fieldState.error && (
                    <p className="text-pink-400 text-sm mt-1.5">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Password Field with Eye Toggle */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="relative">
                  <label
                    className={`font-medium mb-2 block text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Password
                  </label>
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className={`w-full px-4 py-3 border rounded-xl ${
                      isDark
                        ? "bg-slate-800/50 border-purple-500/30 text-white"
                        : "bg-white border-purple-300/30 text-gray-900"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-11.5 cursor-pointer -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {fieldState.error && (
                    <p className="text-pink-400 text-sm mt-1.5">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Role Selection */}
            <Controller
              name="role"
              control={form.control}
              defaultValue="Job Seeker"
              render={({ field }) => (
                <div>
                  <label
                    className={`font-medium mb-3 block text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    I am a...
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => field.onChange("Job Seeker")}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        field.value === "Job Seeker"
                          ? "border-purple-500 bg-purple-500/10 text-purple-500"
                          : isDark
                            ? "border-slate-700 bg-slate-800/50 text-gray-400 hover:border-purple-500/50"
                            : "border-gray-200 bg-white text-gray-600 hover:border-purple-200"
                      }`}
                    >
                      <Briefcase className="w-6 h-6" />
                      <span className="font-semibold">Job Seeker</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => field.onChange("Company")}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        field.value === "Company"
                          ? "border-purple-500 bg-purple-500/10 text-purple-500"
                          : isDark
                            ? "border-slate-700 bg-slate-800/50 text-gray-400 hover:border-purple-500/50"
                            : "border-gray-200 bg-white text-gray-600 hover:border-purple-200"
                      }`}
                    >
                      <Building2 className="w-6 h-6" />
                      <span className="font-semibold">Company</span>
                    </button>
                  </div>
                </div>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full cursor-pointer py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white hover:shadow-lg transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating account...
                </span>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          {/* Sign-in Link */}
          <div className="text-center mt-6">
            <p
              className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm`}
            >
              Already have an account?
              <Link
                href="/sign-in"
                className="text-purple-400 hover:text-purple-300 font-semibold ml-1"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
