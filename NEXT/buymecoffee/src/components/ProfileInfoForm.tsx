"use client";

import { saveProfile } from "@/actions/ProfileInfoActions";
import UploadButton from "./UploadButton";
import { useState, FC } from "react";
import { ProfileInfo } from "@/models/ProfileInfo";
import Image from "next/image";
import toast from "react-hot-toast";
interface Props {
  ProfileInfo: ProfileInfo | null;
}

const ProfileInfoForm: FC<Props> = ({ ProfileInfo }) => {
  async function saveAction(formData: FormData) {
    await toast.promise(saveProfile(formData), {
      loading: "Saving...",
      success: <b>Profile saved!</b>,
      error: <b>Could not save.</b>,
    });
  }
  const [coverUrl, setCoverUrl] = useState<string | undefined>(
    ProfileInfo?.coverUrl || ""
  );
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    ProfileInfo?.avatarUrl
  );
  const handleNewCoverUrl = (url: string) => {
    setCoverUrl(url);
  };
  const handleNewAvatarUrl = (url: string) => {
    setAvatarUrl(url);
  };

  return (
    <form action={saveAction}>
      <div className="relative border bg-gray-100 min-h-[200px] rounded-lg">
        <div className="z-20 absolute right-2 bottom-2">
          <UploadButton onUploadComplete={handleNewCoverUrl} />
          <input type="hidden" name="coverUrl" value={coverUrl} />
        </div>
        <Image
          src={coverUrl || ""}
          alt="cover image"
          width={1024}
          height={1024}
          className="absolute top-0 left-0 object-cover w-full h-full rounded-lg"
        />
        <div className="ml-5 mt-5 relative size-24">
          <div className="relative rounded-lg size-24 overflow-hidden">
            <Image
              src={avatarUrl || ""}
              alt="avatar"
              width={300}
              height={300}
              className="absolute top-0 left-0 object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="absolute -bottom-2 -right-2">
            <UploadButton onUploadComplete={handleNewAvatarUrl} />
          </div>
          <input type="hidden" name="avatarUrl" value={avatarUrl} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="input-label" htmlFor="usernameIn">
            username
          </label>
          <input
            defaultValue={ProfileInfo?.username}
            name="username"
            id="username"
            type="text"
            placeholder="username"
          />
        </div>
        <div>
          <label className="input-label" htmlFor="displayName">
            display name
          </label>
          <input
            defaultValue={ProfileInfo?.displayName}
            name="displayName"
            id="displayName"
            type="text"
            placeholder="display name"
          />
        </div>
      </div>

      <div>
        <label className="input-label" htmlFor="bio">
          bio
        </label>
        <textarea
          defaultValue={ProfileInfo?.bio}
          id="bio"
          name="bio"
          placeholder="bio"
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-yellow-300 px-4 py-2 rounded-full mt-4"
        >
          Save profile
        </button>
      </div>
    </form>
  );
};

export default ProfileInfoForm;
