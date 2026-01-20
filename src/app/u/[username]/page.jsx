import PublicProfileUI from "@/components/profile/PublicProfileUI";
import React from "react";

async function getPublicProfile(username) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/user/profile/public/${username}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function PublicProfile({ params }) {
  const { username } = await params;

  if (!username) {
    return <div className="p-10 text-center">Invalid profile URL</div>;
  }

  const data = await getPublicProfile(username);

  if (!data) {
    return <div className="p-10 text-center">Profile not available</div>;
  }

  const { user, profile } = data;

  if (!profile.isPublic) {
    return (
      <div className="p-10 text-center text-lg font-semibold">
        This profile is private
      </div>
    );
  }

  return <PublicProfileUI user={user} profile={profile} />;
}
