import { Schema, model, models } from "mongoose";

export type ProfileInfo = {
  email: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
};

const ProfileInfoSchema = new Schema<ProfileInfo>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    displayName: { type: String, required: false },
    bio: { type: String, required: false },
    avatarUrl: { type: String, required: false },
    coverUrl: { type: String, required: false },
  },
  { timestamps: true }
);

export const ProfileInfoModel =
  models?.ProfileInfo || model<ProfileInfo>("ProfileInfo", ProfileInfoSchema);
