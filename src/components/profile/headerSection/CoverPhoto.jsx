import axios from "axios";
import { Camera } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
import ImageUploadModal from "./ImageUploadModal";

const CoverPhoto = ({
  profile,
  setProfile,
  isDark,
  coverInputRef,
  handleCoverChange,
}) => {
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleCoverDelete = async () => {
    try {
      const { data } = await axios.delete("/api/user/profile", {
        data: {
          type: "cover",
        },
      });

      if (data.success) {
        toast.success("Cover Photo deleted");
        setProfile((prev) => ({
          ...prev,
          coverPhoto: null,
        }));
      }
    } catch (error) {
      console.error(
        "coverPhoto delete error",
        error.response?.data || error.message
      );
    }
  };

  const handleChangeImage = async (e) => {
    setIsUploading(true);
    try {
      await handleCoverChange(e);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const AvatarLoader = () => (
    <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin flex justify-center items-center" />
  );

  return (
    <div className="h-48 lg:h-64 rounded-xl relative overflow-hidden group cursor-pointer">
      {isUploading ? (
        <AvatarLoader />
      ) : profile?.coverPhoto ? (
        <Image
          src={profile.coverPhoto}
          alt="Cover Photo"
          fill
          className="object-cover rounded"
          priority
          onClick={() => setIsCoverModalOpen(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"></div>
      )}

      <div
        className={`absolute inset-0 pointer-events-none ${
          isDark ? "bg-black/20" : "bg-white/20"
        }`}
      />

      <input
        type="file"
        accept="image/*"
        ref={coverInputRef}
        onChange={handleChangeImage}
        className="hidden"
      />

      <button
        className={`absolute top-4 right-4 p-2.5 backdrop-blur-sm rounded-lg border text-white hover:scale-105 transition-all opacity-0 group-hover:opacity-100 z-10 ${
          isDark
            ? "bg-slate-900/80 border-purple-500/30 hover:bg-slate-800"
            : "bg-white/80 border-purple-300/30 hover:bg-white text-gray-700"
        }`}
        onClick={() => coverInputRef.current.click()}
        disabled={isUploading}
      >
        <Camera className="w-4 h-4 cursor-pointer" />
      </button>

      {/* Avatar Modal */}
      {isCoverModalOpen && (
        <ImageUploadModal
          open={isCoverModalOpen}
          onClose={() => setIsCoverModalOpen(false)}
          onUpload={handleCoverChange}
          onDelete={handleCoverDelete}
          currentImage={profile?.coverPhoto}
          fileInputRef={coverInputRef}
          isDark={isDark}
          type="cover"
        />
      )}
    </div>
  );
};

export default CoverPhoto;
