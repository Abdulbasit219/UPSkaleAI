import { Share2, Download, Edit } from "lucide-react";
import { toast } from "sonner";

const ActionButtons = ({
  isDark,
  profile,
  user,
  setIsEditOpen,
  generateResume,
}) => {
  const handleShare = async () => {
    if (!profile?.isPublic) {
      toast.error("Your profile is private. Make it public first.");
      return;
    }

    const shareUrl = `${window.location.origin}/u/${user.username}`;

    if (navigator.share) {
      await navigator.share({
        title: profile.name,
        text: "Check out my profile",
        url: shareUrl,
      });
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Profile link copied!");
    }
  };
  return (
    <div className="flex flex-wrap gap-3 lg:flex-shrink-0">
      <button
        onClick={handleShare}
        className={`px-5 py-2.5 backdrop-blur-sm rounded-lg font-semibold transition-all border flex items-center gap-2 hover:scale-105 cursor-pointer ${
          isDark
            ? "bg-slate-800/50 text-white border-slate-700 hover:bg-slate-700"
            : "bg-white/50 text-gray-700 border-gray-300 hover:bg-white"
        }`}
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>

      <button
        className={`px-5 py-2.5 backdrop-blur-sm rounded-lg font-semibold transition-all border flex items-center gap-2 hover:scale-105 cursor-pointer ${
          isDark
            ? "bg-slate-800/50 text-white border-slate-700 hover:bg-slate-700"
            : "bg-white/50 text-gray-700 border-gray-300 hover:bg-white"
        }`}
        onClick={() => generateResume(profile, user?.email)}
      >
        <Download className="w-4 h-4" />
        Resume
      </button>

      <button
        onClick={() => setIsEditOpen(true)}
        className="cursor-pointer px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 hover:scale-105"
      >
        <Edit className="w-4 h-4" />
        Edit Profile
      </button>
    </div>
  );
};

export default ActionButtons;
