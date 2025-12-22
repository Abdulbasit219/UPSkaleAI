import Image from "next/image";
import { Camera, User } from "lucide-react";
import ImageUploadModal from "./ImageUploadModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAvatar } from "@/store/slices/profileSlice";
import { toast } from "sonner";

const Avatar = ({ profile, isDark, avatarInputRef }) => {
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarDelete = async () => {
    try {
      const { data } = await axios.delete("/api/user/profile", {
        data: {
          type: "avatar",
        },
      });

      if (data.success) {
        toast.success("Avatar deleted");
        setProfile((prev) => ({
          ...prev,
          avatar: null,
        }));
      }
    } catch (error) {
      console.error(
        "Avatar delete error",
        error.response?.data || error.message
      );
    }
  };

  const handleChangeImage = async (e) => {
    setIsUploading(true);
    try {
      await handleAvatarChange(e);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  const dispatch = useDispatch()

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

  const handleAvatarDelete = () => {
    console.log("delete avatar");
  };

  const AvatarLoader = () => (
    <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
  );

  return (
    <div className="relative group -mt-28 cursor-pointer">
      <div
        className={`w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl overflow-hidden ring-4 shadow-xl flex items-center justify-center ${isDark ? "ring-slate-950" : "ring-white"}`}
      >
        {isUploading ? (
          <AvatarLoader />
        ) : profile?.avatar ? (
          <Image
            src={profile.avatar}
            alt="Profile Avatar"
            fill
            className="object-cover rounded"
            onClick={() => setIsAvatarModalOpen(true)}
          />
        ) : (
          <User className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={avatarInputRef}
        onChange={handleChangeImage}
        className="hidden"
      />

      <button
        disabled={isUploading}
        className={`absolute bottom-2 right-2 p-2 backdrop-blur-sm rounded-lg border text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-105 ${
          isDark
            ? "bg-slate-900/90 border-purple-500/30"
            : "bg-white/90 border-purple-300/30 text-gray-700"
        }`}
        onClick={() => avatarInputRef.current.click()}
      >
        <Camera className="w-4 h-4 cursor-pointer" />
      </button>

      {/* Avatar Modal */}
      {isAvatarModalOpen && (
        <ImageUploadModal
          open={isAvatarModalOpen}
          onClose={() => setIsAvatarModalOpen(false)}
          onUpload={handleAvatarChange}
          onDelete={handleAvatarDelete}
          currentImage={profile?.avatar}
          fileInputRef={avatarInputRef}
          isDark={isDark}
          type="avatar"
        />
      )}
    </div>
  );
};

export default Avatar;
