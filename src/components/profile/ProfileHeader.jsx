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
        className={`relative backdrop-blur-sm border-x border-b rounded-b-xl -mt-20 pt-24 pb-6 px-6 ${
          isDark
            ? "bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-purple-500/20"
            : "bg-gradient-to-br from-white/80 to-white/40 border-purple-300/20"
        }`}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-start gap-6">
          <Avatar
            profile={profile}
            isDark={isDark}
            avatarInputRef={avatarInputRef}
            // handleAvatarChange={handleAvatarChange}
          />
          <div className="flex-1 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pt-2">
            <UserInfo profile={profile} isDark={isDark} />
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
