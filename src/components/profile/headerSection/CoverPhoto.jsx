import axios from "axios";
import {
  deleteCoverPhoto,
  updateCoverPhoto,
} from "@/store/slices/profileSlice";
import { Camera } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import ImageUploadModal from "./ImageUploadModal";

const CoverPhoto = ({ profile, isDark, coverInputRef }) => {
  const dispatch = useDispatch();

  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // 🔹 Upload / Change cover
  const handleCoverChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await dispatch(updateCoverPhoto(file)).unwrap();
      toast.success("Cover photo updated!");
    } catch (error) {
      toast.error("Failed to update cover photo");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  // Delete cover
  const handleCoverDelete = async () => {
    try {
      await dispatch(deleteCoverPhoto()).unwrap();
      toast.success("Cover photo deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete cover photo");
    }
  };

  const CoverLoader = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
      <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="h-48 lg:h-64 rounded-xl relative overflow-hidden group cursor-pointer">
      {profile?.coverPhoto ? (
        <Image
          src={profile.coverPhoto}
          alt="Cover Photo"
          fill
          className="object-cover rounded"
          priority
          onClick={() => setIsCoverModalOpen(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500" />
      )}

      {isUploading && <CoverLoader />}

      <div
        className={`absolute inset-0 pointer-events-none ${
          isDark ? "bg-black/20" : "bg-white/20"
        }`}
      />

      <input
        type="file"
        accept="image/*"
        ref={coverInputRef}
        onChange={handleCoverChange}
        className="hidden"
      />

      <button
        className={`absolute top-4 right-4 p-2.5 backdrop-blur-sm rounded-lg border hover:scale-105 transition-all opacity-0 group-hover:opacity-100 z-10 ${
          isDark
            ? "bg-slate-900/80 border-purple-500/30 hover:bg-slate-800 text-white"
            : "bg-white/80 border-purple-300/30 hover:bg-white text-gray-700"
        }`}
        onClick={() => coverInputRef.current.click()}
        disabled={isUploading}
      >
        <Camera className="w-4 h-4" />
      </button>

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
