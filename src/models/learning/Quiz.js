import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    questions: [
      {
        question: String,
        options: [String],
        correctAnswer: Number,
        explanation: String,
      },
    ],
    passingScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);

export default Quiz;
