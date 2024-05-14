"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function saveProfile(formData: FormData) {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("You must be signed in to save a profile");
  }
  const email = session.user?.email;
  const { username, displayName, bio, coverUrl, avatarUrl } =
    Object.fromEntries(formData);
  const ProfileInfoDoc = await ProfileInfoModel.findOne({ email });
  if (ProfileInfoDoc) {
    ProfileInfoDoc.set({ username, displayName, bio, coverUrl, avatarUrl });
    await ProfileInfoDoc.save();
  } else {
    await ProfileInfoModel.create({
      email,
      username,
      displayName,
      bio,
      coverUrl,
      avatarUrl,
    });
  }
  return true;
}
