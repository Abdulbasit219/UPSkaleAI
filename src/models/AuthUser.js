import mongoose from "mongoose";

const authUserSchema = new mongoose.Schema(
  {
    username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true,
    },
    email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isAdmin: {
      type: Boolean,
      default: 0,
    },
    verifyCode: {
      type: String,
      required: [true, "Verify Code is required"],
    },
    verifyCodeExpiry: {
      type: Date,
      required: [true, "Verify Code Expiry is required"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const AuthUser =
  mongoose.models.AuthUser || mongoose.model("AuthUser", authUserSchema);

export default AuthUser;
