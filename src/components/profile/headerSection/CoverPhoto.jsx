import { Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  deleteCoverPhoto,
  updateCoverPhoto,
} from "@/store/slices/profileSlice";
import ImageUploadModal from "./ImageUploadModal";

const CoverPhoto = ({ profile, isDark, coverInputRef }) => {
  const dispatch = useDispatch();
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleCoverChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await dispatch(updateCoverPhoto(file)).unwrap();
      toast.success("Cover photo updated!");
    } catch {
      toast.error("Failed to update cover photo");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleCoverDelete = async () => {
    try {
      await dispatch(deleteCoverPhoto()).unwrap();
      toast.success("Cover photo deleted!");
    } catch {
      toast.error("Failed to delete cover photo");
    }
  };

  return (
    <>
      <div className="relative h-48 lg:h-64 rounded-t-xl overflow-hidden group cursor-pointer">
        {profile?.coverPhoto ? (
          <Image
            src={profile.coverPhoto}
            alt="Cover"
            fill
            className="object-cover"
            priority
            onClick={() => setIsCoverModalOpen(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600" />
        )}

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}

        <div
          className={`absolute inset-0 ${isDark ? "bg-black/10" : "bg-white/10"}`}
        />

        <input
          type="file"
          accept="image/*"
          ref={coverInputRef}
          onChange={handleCoverChange}
          className="hidden"
        />

        <button
          onClick={() => coverInputRef.current?.click()}
          disabled={isUploading}
          className={`absolute top-4 right-4 p-2.5 backdrop-blur-md rounded-lg border transition-all opacity-0 group-hover:opacity-100 z-10 ${
            isDark
              ? "bg-slate-900/80 border-purple-500/30 hover:bg-slate-800 text-white"
              : "bg-white/80 border-purple-300/30 hover:bg-white text-gray-700"
          } ${isUploading ? "cursor-not-allowed" : "hover:scale-105"}`}
        >
          <Camera className="w-4 h-4" />
        </button>
      </div>

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
    </>
  );
};

export default CoverPhoto;
