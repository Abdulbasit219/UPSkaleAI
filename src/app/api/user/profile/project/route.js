import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { updateBadges } from "@/utils/badgeUtils";
import connectDB from "@/lib/connectDB";
import UserProfile from "@/models/UserProfile";
import { getServerSession } from "next-auth";

// add-project
export async function PUT(req) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session || !session.user?._id) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  const userId = session.user._id;
  
  const { title, description, techStack, projectLink, githubLink } =
    await req.json();

  try {
    const profile = await UserProfile.findOne({ userId });
    if (!profile) {
      return Response.json(
        { success: false, message: "Profile not found" },
        { status: 404 }
      );
    }

    const newProject = {
      title,
      description,
      techStack,
      projectLink,
      githubLink,
    };

    profile.projects.push(newProject);

    updateBadges(profile);

    profile.recentActivity.push({
      action: `Added a new project: ${title}`,
      icon: "Briefcase",
      color: "text-blue-500",
      timestamp: new Date(),
    });

    await profile.save();

    return Response.json({
      success: true,
      message: "Project added and badges updated successfully",
      profile,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

//delete project
export async function DELETE(req) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session || !session.user?._id) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  const userId = session.user._id;

  try {
    const { projectId, projectTitle } = await req.json();

    if (!projectId) {
      return Response.json(
        { success: false, message: "Project ID is required" },
        { status: 400 }
      );
    }

    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId },
      {
        $pull: { projects: { _id: projectId } },
        $push: {
          recentActivity: {
            action: `Deleted project: ${projectTitle}`,
            icon: "Trash",
            color: "text-red-500",
            timestamp: new Date(),
          },
        },
      },
      { new: true }
    );

    return Response.json({
      success: true,
      message: "Project deleted successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
