import { userProfile } from "@/app/actions/user.action";
import ProfileForm from "@/components/user/ProfileForm";
import { IApiResponseUserProfile } from "@/types/auth";
import React from "react";

async function Profile() {
  let profile: IApiResponseUserProfile | null;

  try {
    profile = await userProfile();
  } catch (error) {
    profile = null;
    console.error("Error:", error);
  }

  return (
    <>
      <ProfileForm profileDetail={profile} />
    </>
  );
}

export default Profile;
