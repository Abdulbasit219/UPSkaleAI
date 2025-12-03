export const updateBadges = (profile) => {
  let badges = [...profile.badges];

  const projectCounts = profile.projects.length;

  // badges = badges.filter(
  //   (b) =>
  //     ![
  //       "First Project Badge",
  //       "Growing Builder Badge",
  //       "Project Master Badge",
  //     ].includes(b)
  // );

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

  profile.badges = [...new Set(badges)];

  return profile;
};
