import AchievementItem from "./AchievementItem";

const AchievementsGrid = ({ badges, badgeStyles, isDark }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {badges?.map((badgeName, index) => {
        const badge = badgeStyles[badgeName];
        if (!badge) return null;

        return (
          <AchievementItem
            key={index}
            badgeName={badgeName}
            badge={badge}
            isDark={isDark}
          />
        );
      })}
    </div>
  );
};

export default AchievementsGrid;
