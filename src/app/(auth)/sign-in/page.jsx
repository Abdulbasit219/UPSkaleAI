"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signInSchema } from "@/schemas/signinSchema";
import { signIn } from "next-auth/react";

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      toast.error("Incorrect Username or Password");
      setIsSubmitting(false);
    }

    if (result?.url) {
      toast.success("Welcome back!");
      router.replace("/");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 pt-24 transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
          : "bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50"
      }`}
    >
      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div
          className={`backdrop-blur-xl border rounded-2xl p-8 md:p-10 shadow-2xl ${
            isDark
              ? "bg-slate-900/80 border-purple-500/30 shadow-purple-500/10"
              : "bg-white/90 border-purple-300/30 shadow-purple-300/10"
          }`}
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                SkillBridge
              </span>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1
              className={`text-3xl md:text-4xl font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Welcome Back
            </h1>
            <p
              className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Continue your journey to bridge learning and earning
            </p>
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <Controller
              name="identifier"
              control={form.control}
              render={({ field, fieldState }) => (
                <div>
                  <label
                    htmlFor="identifier"
                    className={`font-medium mb-2 block text-sm ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email or Username
                  </label>

                  <Input
                    {...field}
                    id="identifier"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email or username"
                    className={`w-full px-4 py-3 border rounded-xl placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none ${
                      isDark
                        ? "bg-slate-800/50 border-purple-500/30 text-white"
                        : "bg-white border-purple-300/30 text-gray-900"
                    }`}
                  />

                  {fieldState.invalid && fieldState.error && (
                    <p className="text-pink-400 text-sm mt-1.5">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="relative">
                  <label
                    htmlFor="password"
                    className={`font-medium mb-2 block text-sm ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Password
                  </label>

                  <Input
                    {...field}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-3 border rounded-xl placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none ${
                      isDark
                        ? "bg-slate-800/50 border-purple-500/30 text-white"
                        : "bg-white border-purple-300/30 text-gray-900"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>

                  {fieldState.invalid && fieldState.error && (
                    <p className="text-pink-400 text-sm mt-1.5">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="cursor-pointer w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div
                className={`w-full border-t ${isDark ? "border-purple-500/20" : "border-purple-300/20"}`}
              ></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span
                className={`px-3 ${isDark ? "bg-slate-900/80 text-gray-400" : "bg-white/90 text-gray-500"}`}
              >
                or continue with
              </span>
            </div>
          </div>

          {/* Social Login Button */}
          <Button
            type="button"
            variant="outline"
            className={`w-full flex items-center justify-center gap-3 ${isDark ? "text-white" : "text-gray-700"} cursor-pointer`}
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            {/* Google Icon */}
            <svg className="w-5 h-5" viewBox="0 0 533.5 544.3">
              <path
                fill="#4285F4"
                d="M533.5 278.4c0-18.7-1.5-37-4.3-54.7H272v103.7h146.9c-6.4 34.7-25 64.2-53.2 84l86 66c50-46 78.8-114 78.8-199z"
              />
              <path
                fill="#34A853"
                d="M272 544.3c72.9 0 134-24 178.6-65.2l-86-66c-24 16.1-54.6 25.5-92.6 25.5-71.2 0-131.5-48-153.1-112.2H31.3v70.7C75.9 481.1 167.8 544.3 272 544.3z"
              />
              <path
                fill="#FBBC05"
                d="M118.9 321.3c-5.4-16-8.5-33-8.5-50.3s3.1-34.3 8.5-50.3v-70.7H31.3C11.3 193.2 0 231.6 0 270.9s11.3 77.7 31.3 109.6l87.6-59.2z"
              />
              <path
                fill="#EA4335"
                d="M272 107.6c38.4 0 72.8 13.2 100 39.3l75-75C404.8 24 343.7 0 272 0 167.8 0 75.9 63.2 31.3 159.3l87.6 70.7C140.5 155.6 200.8 107.6 272 107.6z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p
              className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Text */}
        <p
          className={`text-center text-xs mt-6 px-4 ${isDark ? "text-gray-500" : "text-gray-400"}`}
        >
          By signing in, you agree to our
          <Link
            href="/terms"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Terms of Service
          </Link>
          and
          <Link
            href="/privacy"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
