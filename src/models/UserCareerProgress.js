import mongoose from "mongoose";

const UserCareerProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuthUser",
      required: true,
      index: true,
    },
    role_key: {
      type: String,
      required: true,
    },
    milestonesProgress: [
      {
        milestoneIndex: Number,
        progress: { type: Number, default: 0 },
        completed: { type: Boolean, default: false },
        lastAccessed: { type: Date, default: Date.now },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

UserCareerProgressSchema.index({ userId: 1, role_key: 1 }, { unique: true });

export default mongoose.models.UserCareerProgress ||
  mongoose.model("UserCareerProgress", UserCareerProgressSchema);
