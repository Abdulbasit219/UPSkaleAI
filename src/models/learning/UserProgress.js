import mongoose from "mongoose";

const UserProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuthUser",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    completedLessons: [
      {
        lessonId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Lesson",
        },
        completedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    currentLesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
    progressPercentage: {
      type: Number,
      default: 0,
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    lastAccessedAt: {
      type: Date,
      default: Date.now,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedAt: Date,
    certificateIssued: {
      type: Boolean,
      default: false,
    } 
  },
  { timestamps: true }
);

// Index
UserProgressSchema.index({ userId: 1, courseId: 1 });

const UserProgress =
  mongoose.models.UserProgress ||
  mongoose.model("UserProgress", UserProgressSchema);

export default UserProgress;
