"use client";
import React, { useState, useEffect } from "react";
import {
  X,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Link as LinkIcon,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { updateProfile } from "@/store/slices/profileSlice";

const SocialLinksModal = ({ open, setOpen, currentLinks = {}, isDark }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [socialLinks, setSocialLinks] = useState({
    website: "",
    github: "",
    linkedin: "",
    twitter: "",
  });

  useEffect(() => {
    if (open && currentLinks) {
      setSocialLinks({
        website: currentLinks.website || "",
        github: currentLinks.github || "",
        linkedin: currentLinks.linkedin || "",
        twitter: currentLinks.twitter || "",
      });
    }
  }, [open, currentLinks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateUrl = (url) => {
    if (!url) return true; 
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all URLs
    for (const [key, value] of Object.entries(socialLinks)) {
      if (value && !validateUrl(value)) {
        toast.error(
          `Invalid ${key} URL. Please enter a valid URL starting with http:// or https://`
        );
        return;
      }
    }

    setLoading(true);

    try {
      await dispatch(
        updateProfile({
          socialLinks: socialLinks,
        })
      ).unwrap();
      toast.success("Social links updated successfully!");
      setOpen(false);
    } catch (error) {
      toast.error(error?.message || "Failed to update social links");
    } finally {
      setLoading(false);
    }
  };

  const socialFields = [
    {
      label: "Website",
      name: "website",
      icon: Globe,
      placeholder: "https://yourwebsite.com",
      color: "text-blue-500",
    },
    {
      label: "GitHub",
      name: "github",
      icon: Github,
      placeholder: "https://github.com/username",
      color: "text-gray-600",
    },
    {
      label: "LinkedIn",
      name: "linkedin",
      icon: Linkedin,
      placeholder: "https://linkedin.com/in/username",
      color: "text-blue-600",
    },
    {
      label: "Twitter / X",
      name: "twitter",
      icon: Twitter,
      placeholder: "https://x.com/username",
      color: "text-sky-500",
    },
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        className={`w-full max-w-2xl my-8 rounded-2xl shadow-2xl transition-colors ${
          isDark ? "bg-gradient-to-br from-slate-900 to-slate-800" : "bg-white"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-4 sm:p-6 border-b ${
            isDark ? "border-slate-700" : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                isDark ? "bg-purple-500/10" : "bg-purple-100"
              }`}
            >
              <LinkIcon
                className={`w-5 h-5 ${
                  isDark ? "text-purple-400" : "text-purple-600"
                }`}
              />
            </div>
            <h2
              className={`text-xl sm:text-2xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Social Links
            </h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className={`p-2 rounded-lg transition-colors ${
              isDark
                ? "hover:bg-slate-700 text-gray-400"
                : "hover:bg-gray-100 text-gray-500"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto"
        >
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Add your social media profiles to let others connect with you. All
            fields are optional.
          </p>

          {socialFields.map(
            ({ label, name, icon: Icon, placeholder, color }) => (
              <div key={name}>
                <label
                  className={`block text-sm font-medium mb-1.5 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {label}
                </label>
                <div className="relative">
                  <Icon
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    } ${color}`}
                  />
                  <input
                    type="url"
                    name={name}
                    value={socialLinks[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={`w-full pl-10 pr-3 py-2 rounded-lg border transition-colors ${
                      isDark
                        ? "bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-purple-500"
                    } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                  />
                </div>
              </div>
            )
          )}

          {/* Helper Text */}
          <div
            className={`p-3 rounded-lg ${
              isDark ? "bg-slate-800/50" : "bg-gray-50"
            }`}
          >
            <p
              className={`text-xs ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              💡 <strong>Tip:</strong> Make sure to include the full URL
              (starting with https://)
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className={`cursor-pointer flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                isDark
                  ? "bg-slate-700 hover:bg-slate-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-900"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`cursor-pointer flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                loading
                  ? "bg-purple-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              } text-white`}
            >
              {loading ? "Saving..." : "Save Links"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SocialLinksModal;
