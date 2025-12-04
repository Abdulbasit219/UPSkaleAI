import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  techStack: { type: [String], default: [] },
  projectLink: { type: String, default: "" },
  githubLink: { type: String, default: "" },
  image: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const SkillSchema = new mongoose.Schema({
  skillName: { type: String, required: true },
  level: { type: String, default: "Beginner" }, 
  progress: { type: Number, default: 0 },
  lastPracticed: { type: String, default: null }                
});

const UserProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuthUser",
      required: true,
      unique: true,
    },

    // basic info
    name: { type: String, default: "" },
    role: { type: String, default: "" },
    location: { type: String, default: "" },
    memberSince: { type: String, default: "" },
    bio: { type: String, default: "" },
    avatar: { type: String, default: "" },
    coverPhoto: { type: String, default: "" },

    // projects
    projects: { type: [ProjectSchema], default: [] },

    // Learning streak fields
    streak: { type: Number, default: 0 },
    lastActiveDate: { type: Date, default: null },
    maxStreak: { type: Number, default: 0 },

    // Acheivements
    badges: {
      type: [String],
      default: [],
    },

    // skills
    skills: { type: [SkillSchema], default: [] },

  },
  { timestamps: true }
);

const UserProfile =
  mongoose.models.UserProfile ||
  mongoose.model("UserProfile", UserProfileSchema);

export default UserProfile;

// // Stats Section
// // stats: {
// //   skillsMastered: { type: Number, default: 0 },
// //   streak: { type: Number, default: 0 },
// //   projects: { type: Number, default: 0 },
// //   careerReady: { type: Number, default: 0 },
// // },

// // Skills Section
// skills: {
//   mastered: { type: Array, default: [] },
//   inProgress: { type: Array, default: [] },
//   recommended: { type: Array, default: [] },
// },

// // Projects Section
// projects: { type: Array, default: [] },

// // Achievements
// achievements: { type: Array, default: [] },

// // Recent Activity
// activity: { type: Array, default: [] },

// // Streak data
// streakData: { type: Array, default: [] },

// // Quick stats
// quickStats: {
//   totalLearningHours: { type: Number, default: 0 },
//   certificates: { type: Number, default: 0 },
//   forumContributions: { type: Number, default: 0 },
//   peerReviews: { type: Number, default: 0 },
// },

// // Recommended Content
// recommended: { type: Array, default: [] },
