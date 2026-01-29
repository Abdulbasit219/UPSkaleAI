import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/connectDB";
import AuthUser from "@/models/AuthUser";
import UserProfile from "@/models/UserProfile";
import NotificationSettings from "@/models/NotificationSettings";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        try {
          const user = await AuthUser.findOne({
            email: credentials.identifier,
          });

          if (!user) {
            throw new Error("No User found!");
          }

          if (!user.isVerified) {
            throw new Error("Please Verify First");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return {
              _id: user._id,
              username: user.username,
              email: user.email,
              isVerified: user.isVerified,
              isAdmin: user.isAdmin,
              role: user.role,
            };
          } else {
            throw new Error("Incorrect Credentials");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        await connectDB();

        let existingUser = await AuthUser.findOne({ email: user.email });

        if (!existingUser) {
          const baseUsername = user.name
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");
          const randomSuffix = Math.floor(
            1000 + Math.random() * 9000
          ).toString();
          const username = `${baseUsername}${randomSuffix}`;

          existingUser = await AuthUser.create({
            email: user.email,
            username,
            name: user.name,
            isVerified: true,
            role: "Job Seeker",
            isOAuth: true,
            password: "",
            verifyCode: "000000",
            verifyCodeExpiry: new Date(),
          });

          await UserProfile.create({
            userId: existingUser._id,
            name: user.name,
          });

          await NotificationSettings.create({
            userId: existingUser._id,
          });
        }

        user._id = existingUser._id;
        user.username = existingUser.username;
        user.role = existingUser.role;
        user.isAdmin = existingUser.isAdmin;
        user.isVerified = true;
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.username = user.username;
        token.role = user.role;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.username = token.username;
        session.user.role = token.role;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
