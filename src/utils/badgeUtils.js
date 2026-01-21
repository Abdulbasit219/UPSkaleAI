export const updateBadges = (profile, options = {}) => {
  let badges = [...profile.badges];

  const { courseCompletedBadge } = options;
  console.log(options)

  const projectCounts = profile.projects.length;

  if (projectCounts === 1) {
    badges.push("First Project Badge");
  } else if (projectCounts === 2) {
    badges.push("Growing Builder Badge");
  } else if (projectCounts >= 3) {
    badges.push("Project Master Badge");
  }

  if (profile.streak >= 7 && !badges.includes("7 Day Streak Hero")) {
    badges.push("7 Day Streak Hero");
  }

  if (courseCompletedBadge) {
    badges.push(courseCompletedBadge);
  }

  profile.badges = [...new Set(badges)];

  return profile;
};
