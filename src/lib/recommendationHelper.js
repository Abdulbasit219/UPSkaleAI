import Course from "@/models/learning/Course";

export function extractUserPreferences(enrolledCourses, profile) {
  const categories = {};
  const tags = {};
  const difficulties = {};

  enrolledCourses.forEach((enrollment) => {
    const course = enrollment.courseId;
    if (!course) return;

    const cat = course.category;
    categories[cat] = (categories[cat] || 0) + 1;

    course.tags?.forEach((tag) => {
      tags[tag] = (tags[tag] || 0) + 1;
    });

    const diff = course.difficulty;
    difficulties[diff] = (difficulties[diff] || 0) + 1;
  });

  const skillTags =
    profile?.skills?.map((s) => s.skillName.toLowerCase()) || [];

  return {
    topCategories: Object.keys(categories).sort(
      (a, b) => categories[b] - categories[a]
    ),
    topTags: Object.keys(tags).sort((a, b) => tags[b] - tags[a]),
    preferredDifficulty:
      Object.keys(difficulties).sort(
        (a, b) => difficulties[b] - difficulties[a]
      )[0] || "Beginner",
    skillTags,
    enrolledCourseIds: enrolledCourses.map((e) => e.courseId?._id),
  };
}

export async function calculateRecommendations(userId, preferences, limit) {
  const {
    topCategories,
    topTags,
    preferredDifficulty,
    skillTags,
    enrolledCourseIds,
  } = preferences;

  const query = {
    _id: { $nin: enrolledCourseIds },
    $or: [
      { category: { $in: topCategories } },
      { tags: { $in: [...topTags, ...skillTags] } },
    ],
  };

  const courses = await Course.find(query)
    .select("title slug tags category difficulty enrolledCount estimatedTime author")
    .populate("author", "name username name")
    .limit(limit * 3);

  const scoredCourses = courses.map((course) => ({
    ...course.toObject(),
    score: calculateCourseScore(course, preferences),
  }));

  return scoredCourses.sort((a, b) => b.score - a.score).slice(0, limit);
}

export function calculateCourseScore(course, preferences) {
  let score = 0;

  if (preferences.topCategories.includes(course.category)) {
    const categoryIndex = preferences.topCategories.indexOf(course.category);
    score += 40 - categoryIndex * 5;
  }

  const allUserTags = [...preferences.topTags, ...preferences.skillTags];

  const matchingTags =
    course.tags?.filter((tag) => allUserTags.includes(tag.toLowerCase())) || [];
  score += matchingTags.length * 10;

  const difficultyOrder = ["Beginner", "Intermediate", "Advanced"];
  const userDiffIndex = difficultyOrder.indexOf(
    preferences.preferredDifficulty
  );
  const courseDiffIndex = difficultyOrder.indexOf(course.difficulty);

  if (courseDiffIndex === userDiffIndex) {
    score += 20;
  } else if (courseDiffIndex === userDiffIndex + 1) {
    score += 15;
  } else if (courseDiffIndex === userDiffIndex - 1) {
    score += 10;
  }

  const popularityScore = Math.min(course.enrolledCount / 100, 10);
  score += popularityScore;

  return score;
}
