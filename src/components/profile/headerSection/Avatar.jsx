import Image from "next/image";
import { Camera, User } from "lucide-react";
import ImageUploadModal from "./ImageUploadModal";
import { useState } from "react";

const Avatar = ({ profile, isDark, avatarInputRef, handleAvatarChange }) => {
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const handleAvatarDelete = () => {
    console.log("delete avatar");
  };

  return (
    <div
      className="relative group -mt-28 cursor-pointer"
    >
      <div
        className={`w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center ring-4 shadow-xl ${
          isDark ? "ring-slate-950" : "ring-white"
        }`}
      >
        {profile?.avatar ? (
          <Image
            src={profile.avatar}
            alt="Profile Avatar"
            width={160}
            height={100}
            className="rounded-xl object-cover"
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
        onChange={handleAvatarChange}
        className="hidden"
      />

      <button
        className={`absolute bottom-2 right-2 p-2 backdrop-blur-sm rounded-lg border text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-105 ${
          isDark
            ? "bg-slate-900/90 border-purple-500/30"
            : "bg-white/90 border-purple-300/30 text-gray-700"
        }`}
        onClick={() => avatarInputRef.current.click()}
      >
        <Camera className="w-4 h-4" />
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
