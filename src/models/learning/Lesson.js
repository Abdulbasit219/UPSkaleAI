import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema({
  title: String,
  url: String,
  type: String
}, { _id: false });

const CodeExampleSchema = new mongoose.Schema({
  language: String,
  code: String,
  description: String
}, { _id: false });

const LessonSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
    },
    codeExamples: [CodeExampleSchema],
    resources: [ResourceSchema],

    // quiz: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Quiz",
    // },
  },
  { timestamps: true }
);

// Indexes
LessonSchema.index({ courseId: 1, order: 1 });

const Lesson = mongoose.models.Lesson || mongoose.model("Lesson", LessonSchema);

export default Lesson;
