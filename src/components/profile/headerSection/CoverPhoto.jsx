import { updateCoverPhoto } from "@/store/slices/profileSlice";
import { Camera } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const CoverPhoto = ({ profile, isDark, coverInputRef }) => {

  const dispatch = useDispatch()

  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await dispatch(updateCoverPhoto(file)).unwrap();
      toast.success("Cover photo updated!");
    } catch (error) {
      toast.error("Failed to update cover photo");
    }
  };

  return (
    <div className="h-48 lg:h-64 rounded-xl relative overflow-hidden group cursor-pointer">
      {profile?.coverPhoto ? (
        <a href={profile.coverPhoto} target="_blank">
          <Image
            src={profile.coverPhoto}
            alt="Cover Photo"
            fill
            className="object-cover"
            priority
          />
        </a>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"></div>
      )}

      <div
        className={`absolute inset-0 ${isDark ? "bg-black/20" : "bg-white/20"}`}
      ></div>

      <input
        type="file"
        accept="image/*"
        ref={coverInputRef}
        onChange={handleCoverChange}
        className="hidden"
      />

      <button
        className={`absolute top-4 right-4 p-2.5 backdrop-blur-sm rounded-lg border text-white hover:scale-105 transition-all opacity-0 group-hover:opacity-100 z-10 ${
          isDark
            ? "bg-slate-900/80 border-purple-500/30 hover:bg-slate-800"
            : "bg-white/80 border-purple-300/30 hover:bg-white text-gray-700"
        }`}
        onClick={() => coverInputRef.current.click()}
      >
        <Camera className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CoverPhoto;
