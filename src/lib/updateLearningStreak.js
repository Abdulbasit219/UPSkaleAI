import UserProfile from "@/models/UserProfile";
import { updateBadges } from "../utils/badgeUtils";

export async function updateLearningStreak(userId) {
  const user = await UserProfile.findOne({ userId });
  if (!user) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastActive = user.lastActiveDate ? new Date(user.lastActiveDate) : null;

  let shouldSave = true;

  if (!lastActive) {
    user.streak = 1;
  } else {
    lastActive.setHours(0, 0, 0, 0);
    const diff = today.getTime() - lastActive.getTime();

    if (diff === 0) {
      shouldSave = false;
      // return user;
    } else if (diff === 86400000) {
      user.streak += 1;
    } else {
      user.streak = 1;
    }
  }

  if (shouldSave) {
    user.lastActiveDate = today;
    if (user.streak > user.maxStreak) {
      user.maxStreak = user.streak;
    }
  }

  updateBadges(user);

  await user.save();
  return user;
}
