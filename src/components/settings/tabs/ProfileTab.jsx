import React, { useEffect, useRef, useState } from "react";
import { User, Camera, Upload, MapPin, Globe } from "lucide-react";
import SettingsCard from "../SettingsCard";
import InputField from "../InputField";
import Button from "../Button";
import ImageUploadModal from "@/components/profile/headerSection/ImageUploadModal";
import { deleteAvatar, updateAvatar, updateProfile } from "@/store/slices/profileSlice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";

export default function ProfileTab({ isDark, userData }) {
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

  const { data } = useSession();
  const dispatch = useDispatch();
  const avatarInputRef = useRef(null);

  // Sync state with userData when it changes
  useEffect(() => {
    if (userData) {
      setProfileForm({
        name: userData.name || "",
        bio: userData.bio || "",
        location: userData.location || "",
      });
      setSocialLinks({
        website: userData.socialLinks?.website || "",
        github: userData.socialLinks?.github || "",
        linkedin: userData.socialLinks?.linkedin || "",
        twitter: userData.socialLinks?.twitter || "",
      });
    }
  }, [userData]);

  const handleAvatarDelete = async () => {
    try {
      await dispatch(deleteAvatar()).unwrap();
      toast.success("Avatar deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete avatar");
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      await dispatch(updateAvatar(file)).unwrap();
      toast.success("Avatar updated successfully!");
    } catch (error) {
      toast.error("Failed to update avatar");
    }
  };

  const handleUploadClick = () => {
    setIsAvatarModalOpen(true);
    avatarInputRef.current?.click();
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAll = async () => {
    try {
      await dispatch(updateProfile({ ...profileForm, socialLinks })).unwrap();
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <>
      {/* Profile Picture */}
      <SettingsCard title="Profile Picture" isDark={isDark}>
        <div className="flex items-center gap-6">
          <div className="relative group">
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

            {!userData?.avatar && (
              <button
                className={`absolute inset-0 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${
                  isDark ? "bg-slate-900/80" : "bg-white/90"
                }`}
              >
                <Camera
                  className={`w-6 h-6 ${isDark ? "text-white" : "text-gray-700"}`}
                />
              </button>
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap gap-3 ">
              <Button
                variant="primary"
                className="cursor-pointer"
                icon={Upload}
                onClick={handleUploadClick}
              >
                Upload New
              </Button>
              <Button
                variant="secondary"
                className="cursor-pointer"
                isDark={isDark}
                onClick={handleAvatarDelete}
              >
                Remove
              </Button>
            </div>
            <p className={`text-sm mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Recommended: Square image, at least 400x400px
            </p>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={avatarInputRef}
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
      </SettingsCard>

      {/* Personal Information */}
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
            defaultValue={data?.user?.username}
            isDark={isDark}
            disabled
          />
          <div className="md:col-span-2">
            <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Bio
            </label>
            <textarea
              name="bio"
              value={profileForm.bio}
              onChange={handleProfileChange}
              rows={4}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-purple-500 transition-colors resize-none ${
                isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
          <div className="md:col-span-2">
            <InputField
              label="Location"
              name="location"
              icon={MapPin}
              value={profileForm.location}
              onChange={handleProfileChange}
              isDark={isDark}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="primary" onClick={handleSaveAll}>
            Save Changes
          </Button>
        </div>
      </SettingsCard>

      {/* Social Links */}
      <SettingsCard title="Social Links" isDark={isDark}>
        <div className="space-y-4">
          <InputField
            label="Website"
            name="website"
            type="url"
            icon={Globe}
            value={socialLinks.website}
            onChange={handleSocialChange}
            isDark={isDark}
          />
          <InputField
            label="GitHub"
            name="github"
            type="url"
            value={socialLinks.github}
            onChange={handleSocialChange}
            isDark={isDark}
          />
          <InputField
            label="LinkedIn"
            name="linkedin"
            type="url"
            value={socialLinks.linkedin}
            onChange={handleSocialChange}
            isDark={isDark}
          />
          <InputField
            label="Twitter"
            name="twitter"
            type="url"
            value={socialLinks.twitter}
            onChange={handleSocialChange}
            isDark={isDark}
          />
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="primary" onClick={handleSaveAll}>
            Save Social Links
          </Button>
        </div>
      </SettingsCard>

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
