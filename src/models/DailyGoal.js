import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  skill: { type: String },
  time: { type: Number }, 
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  completed: { type: Boolean, default: false },
  source: {
    type: String,
    enum: ["system", "user"],
    default: "system",
  },
});

const DailyGoalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuthUser",
      required: true,
    },
    date: {
      type: String, 
      required: true,
    },
    tasks: { type: [TaskSchema], default: [] },
  },
  { timestamps: true }
);

const DailyGoal =
  mongoose.models.DailyGoal ||
  mongoose.model("DailyGoal", DailyGoalSchema);

export default DailyGoal;
