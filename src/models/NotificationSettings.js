import mongoose from "mongoose";

const NotificationSettingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuthUser",
      required: true,
      unique: true,
    },

    channels: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },

    learning: {
      courseUpdates: { type: Boolean, default: true },
      newContent: { type: Boolean, default: true }    
    },

    account: {
      securityAlerts: { type: Boolean, default: true },
      loginAttempts: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

export default mongoose.models.NotificationSettings ||
  mongoose.model("NotificationSettings", NotificationSettingsSchema);
