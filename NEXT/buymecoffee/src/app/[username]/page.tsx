"use server";

import { ProfileInfo, ProfileInfoModel } from "@/models/ProfileInfo";
import mongoose, { mongo } from "mongoose";
import React, { FC } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import DonationsForm from "@/components/DonationsForm";

interface Props {
  params: {
    username: string;
  };
}

const page: FC<Props> = async ({ params: { username } }) => {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const profileInfoDoc: ProfileInfo | null = await ProfileInfoModel.findOne({
    username,
  });
  if (!profileInfoDoc) {
    return <div>404 - User not found</div>;
  }
  return (
    <div>
      <div className="w-full h-48">
        <Image
          src={profileInfoDoc.coverUrl}
          alt="cover image"
          width={2048}
          height={2048}
          className="object-cover w-full h-48"
        />
      </div>
      <div className="max-w-4xl mx-auto -mt-16 relative">
        <div className="flex items-end gap-4">
          <div className="size-36 rounded-lg border-2 border-white">
            <Image
              src={profileInfoDoc.avatarUrl}
              alt="avatar image"
              width={256}
              height={256}
              className="object-fit w-full rounded-lg"
            />
          </div>
          <div className="mb-2">
            <h1 className="text-2xl mb-1">{profileInfoDoc.displayName}</h1>
            <h2 className="flex gap-1 items-center">
              <FontAwesomeIcon icon={faCoffee} /> <span>/</span>
              <span>{profileInfoDoc.username}</span>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold">About {profileInfoDoc.username}</h3>
            {profileInfoDoc.bio}
            <hr className="my-4" />
            <h3 className="font-semibold">Recent supporters</h3>
            <p>No recent donations</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <DonationsForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
