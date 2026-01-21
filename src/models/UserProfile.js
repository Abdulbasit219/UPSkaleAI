import mongoose from "mongoose";
import AuthUser from "./AuthUser";

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
  lastPracticed: { type: String, default: null },
});

const SocialLinksSchema = new mongoose.Schema({
  website: { type: String, default: "" },
  github: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  twitter: { type: String, default: "" },
});

const RecentActivitySchema = new mongoose.Schema({
  action: { type: String },
  icon: { type: String },
  color: { type: String },
  timestamp: { type: Date, default: Date.now },
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

    socialLinks: {
      type: SocialLinksSchema,
      default: {},
    },

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

    // recentActivity
    recentActivity: { type: [RecentActivitySchema], default: [] },

    // recommendation
    areasOfInterest: { type: [String], default: [] },

    isPublic: {
      type: Boolean,
      default: true,
    },

    profileViewLogs: [
      {
        viewerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "AuthUser",
        },
        date: {
          type: String, 
        },
      },
    ],
  },
  { timestamps: true }
);

const UserProfile =
  mongoose.models.UserProfile ||
  mongoose.model("UserProfile", UserProfileSchema);

export default UserProfile;
