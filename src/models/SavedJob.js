import mongoose from "mongoose";

const savedJobSchema = new mongoose.Schema(
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
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate saved jobs
savedJobSchema.index({ job: 1, user: 1 }, { unique: true });
savedJobSchema.index({ user: 1 });

const SavedJob =
  mongoose.models.SavedJob || mongoose.model("SavedJob", savedJobSchema);

export default SavedJob;
