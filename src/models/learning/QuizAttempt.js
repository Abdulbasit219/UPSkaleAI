import mongoose from "mongoose";

const QuizAttemptSchema = new mongoose.Schema(
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
    source: {
      type: String,
      default: "google-sheet",
    },
    answers: [
      {
        sheetRow: Number,
        selectedOption: String,
        correctOption: String,
        isCorrect: Boolean,
      },
    ],
    totalQuestions: Number,
    correctAnswers: Number,
    percentage: Number,
    isPassed: Boolean,
    attemptedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.QuizAttempt ||
  mongoose.model("QuizAttempt", QuizAttemptSchema);
