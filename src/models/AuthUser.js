import mongoose from "mongoose";

const authUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+\@.+\..+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    verifyCode: {
      type: String,
      required: true,
    },
    verifyCodeExpiry: {
      type: Date,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordOTP: {
      type: String,
      default: "",
    },
    resetPasswordOTPExpiry: {
      type: Date,
      default: "",
    },
    // Profile Fields
    name: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["Job Seeker", "Company", "Admin"],
      default: "Job Seeker",
    },
    phone: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "disabled", "banned"],
      default: "active",
    },
    bio: {
      type: String,
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    resume: {
      type: String, // URL
    },
    // Company Fields
    companyName: {
      type: String,
      trim: true,
    },
    industry: {
      type: String,
      trim: true,
    },
    employees: {
      type: String,
    },
    website: {
      type: String,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    companyDescription: {
      type: String,
    },
    logo: {
      type: String, // URL or Emoji as per mock
    },
  },
  { timestamps: true }
);

const AuthUser =
  mongoose.models.AuthUser || mongoose.model("AuthUser", authUserSchema);

export default AuthUser;
