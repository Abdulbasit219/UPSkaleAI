"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  User,
  Camera,
  Upload,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import SettingsCard from "../SettingsCard";
import InputField from "../InputField";
import Button from "../Button";
import ImageUploadModal from "@/components/profile/headerSection/ImageUploadModal";
import {
  deleteAvatar,
  updateAvatar,
  updateProfile,
} from "@/store/slices/profileSlice";

export default function ProfileTab({ isDark, userData }) {
  const dispatch = useDispatch();
  const { data } = useSession();
  const avatarInputRef = useRef(null);

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: "",
    bio: "",
    location: "",
  });

  const [socialLinks, setSocialLinks] = useState({
    website: "",
    github: "",
    linkedin: "",
    twitter: "",
  });

  /* ---------- SYNC USER DATA ---------- */
  useEffect(() => {
    if (!userData) return;

    setProfileForm({
      name: userData.name ?? "",
      bio: userData.bio ?? "",
      location: userData.location ?? "",
    });

    setSocialLinks({
      website: userData.socialLinks?.website ?? "",
      github: userData.socialLinks?.github ?? "",
      linkedin: userData.socialLinks?.linkedin ?? "",
      twitter: userData.socialLinks?.twitter ?? "",
    });
  }, [userData]);

  /* ---------- AVATAR ---------- */
  const handleAvatarChange = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        await dispatch(updateAvatar(file)).unwrap();
        toast.success("Avatar updated successfully");
      } catch {
        toast.error("Failed to update avatar");
      }
    },
    [dispatch]
  );

  const handleAvatarDelete = useCallback(async () => {
    try {
      await dispatch(deleteAvatar()).unwrap();
      toast.success("Avatar removed");
    } catch {
      toast.error("Failed to delete avatar");
    }
  }, [dispatch]);

  /* ---------- FORM HANDLERS ---------- */
  const handleProfileChange = useCallback((e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSocialChange = useCallback((e) => {
    const { name, value } = e.target;
    setSocialLinks((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSaveAll = useCallback(async () => {
    try {
      await dispatch(
        updateProfile({
          ...profileForm,
          socialLinks,
        })
      ).unwrap();

      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    }
  }, [dispatch, profileForm, socialLinks]);

  const SOCIAL_FIELDS = [
    {
      label: "Website",
      name: "website",
      icon: Globe,
      placeholder: "https://yourwebsite.com",
    },
    {
      label: "GitHub",
      name: "github",
      icon: Github,
      placeholder: "https://github.com/username",
    },
    {
      label: "LinkedIn",
      name: "linkedin",
      icon: Linkedin,
      placeholder: "https://linkedin.com/in/username",
    },
    {
      label: "Twitter / X",
      name: "twitter",
      icon: Twitter,
      placeholder: "https://x.com/username",
    },
  ];

  return (
    <>
      {/* PROFILE PICTURE */}
      <SettingsCard title="Profile Picture" isDark={isDark}>
        <div className="flex items-center gap-6">
          <div
            className="relative group cursor-pointer"
            onClick={() => setIsAvatarModalOpen(true)}
          >
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              {userData?.avatar ? (
                <img
                  src={userData.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-white" />
              )}
            </div>

            <div
              className={`absolute inset-0 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition ${
                isDark ? "bg-slate-900/70" : "bg-white/80"
              }`}
            >
              <Camera className="w-6 h-6 text-purple-500" />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex gap-3 flex-wrap">
              <Button
                icon={Upload}
                variant="primary"
                className="cursor-pointer"
                onClick={() => setIsAvatarModalOpen(true)}
              >
                Upload New
              </Button>
              <Button
                variant="secondary"
                isDark={isDark}
                className="cursor-pointer"
                onClick={handleAvatarDelete}
              >
                Remove
              </Button>
            </div>

            <p
              className={`text-sm mt-2 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Recommended: Square image, at least 400×400px
            </p>
          </div>

          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
      </SettingsCard>

      {/* PERSONAL INFO */}
      <SettingsCard title="Personal Information" isDark={isDark}>
        <div className="grid md:grid-cols-2 gap-6">
          <InputField
            label="Full Name"
            name="name"
            value={profileForm.name}
            onChange={handleProfileChange}
            isDark={isDark}
          />

          <InputField
            label="Username"
            value={data?.user?.username}
            disabled
            isDark={isDark}
          />

          <div className="md:col-span-2">
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Bio
            </label>
            <textarea
              name="bio"
              rows={4}
              value={profileForm.bio}
              onChange={handleProfileChange}
              className={`w-full px-4 py-2.5 rounded-lg border resize-none focus:outline-none focus:border-purple-500 ${
                isDark
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          <InputField
            label="Location"
            name="location"
            icon={MapPin}
            value={profileForm.location}
            onChange={handleProfileChange}
            isDark={isDark}
          />
        </div>

        <div className="flex justify-end mt-6">
          <Button
            variant="primary"
            onClick={handleSaveAll}
            className="cursor-pointer"
          >
            Save Changes
          </Button>
        </div>
      </SettingsCard>

      {/* SOCIAL LINKS */}
      <SettingsCard title="Social Links" isDark={isDark}>
        <div className="space-y-4">
          {SOCIAL_FIELDS.map(({ label, name, icon: Icon, placeholder }) => (
            <InputField
              key={name}
              label={label}
              name={name}
              type="url"
              icon={Icon}
              placeholder={placeholder}
              value={socialLinks[name]}
              onChange={handleSocialChange}
              isDark={isDark}
            />
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="primary" className="cursor-pointer" onClick={handleSaveAll}>
            Save Social Links
          </Button>
        </div>
      </SettingsCard>

      {/* AVATAR MODAL */}
      {isAvatarModalOpen && (
        <ImageUploadModal
          open={isAvatarModalOpen}
          onClose={() => setIsAvatarModalOpen(false)}
          onUpload={handleAvatarChange}
          onDelete={handleAvatarDelete}
          currentImage={userData?.avatar}
          fileInputRef={avatarInputRef}
          isDark={isDark}
          type="avatar"
        />
      )}
    </>
  );
}
