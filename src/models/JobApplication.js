import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "Job reference is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuthUser",
      required: [true, "User reference is required"],
    },
    coverLetter: {
      type: String,
      required: [true, "Cover letter is required"],
      trim: true,
    },
    resume: {
      type: String, // URL or file path
      required: [true, "Resume is required"],
    },
    status: {
      type: String,
      enum: ["pending", "reviewing", "shortlisted", "rejected", "accepted"],
      default: "pending",
    },
    answers: {
      type: Map,
      of: String,
      default: {},
    },
    notes: {
      type: String,
      trim: true,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Prevent duplicate applications
jobApplicationSchema.index({ job: 1, user: 1 }, { unique: true });
jobApplicationSchema.index({ user: 1, status: 1 });
jobApplicationSchema.index({ job: 1, status: 1 });

const JobApplication =
  mongoose.models.JobApplication ||
  mongoose.model("JobApplication", jobApplicationSchema);

export default JobApplication;
