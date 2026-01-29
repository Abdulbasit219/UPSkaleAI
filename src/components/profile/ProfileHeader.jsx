import CoverPhoto from "./headerSection/CoverPhoto";
import Avatar from "./headerSection/Avatar";
import UserInfo from "./UserInfo";
import ActionButtons from "./headerSection/ActionButtons";

const ProfileHeader = ({
  profile,
  user,
  isDark,
  coverInputRef,
  avatarInputRef,
  setIsEditOpen,
  generateResume,
}) => {
  return (
    <div className="relative mb-8">
      <CoverPhoto
        profile={profile}
        isDark={isDark}
        coverInputRef={coverInputRef}
      />

      <div
        className={`relative backdrop-blur-sm border-x border-b rounded-b-xl -mt-20 pt-24 pb-6 px-6 transition-colors ${
          isDark
            ? "bg-gradient-to-br from-slate-900/90 to-slate-900/50 border-purple-500/20"
            : "bg-gradient-to-br from-white/90 to-white/50 border-purple-300/20"
        }`}
      >
        <div className="flex flex-col lg:flex-row items-start gap-6">
          <Avatar
            profile={profile}
            isDark={isDark}
            avatarInputRef={avatarInputRef}
          />
          <div className="flex-1 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pt-2 w-full">
            <UserInfo profile={profile} user={user} isDark={isDark} />
            <ActionButtons
              isDark={isDark}
              profile={profile}
              user={user}
              setIsEditOpen={setIsEditOpen}
              generateResume={generateResume}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
