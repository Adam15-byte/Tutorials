import ProfileInfoForm from "@/components/ProfileInfoForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import { ProfileInfoModel } from "@/models/ProfileInfo";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return "Not logged in";
  }
  const email = session?.user?.email;
  await mongoose.connect(process.env.MONGODB_URI as string);
  const profileInfoDoc = await ProfileInfoModel.findOne({ email });
  return (
    <div className="max-w-4xl mx-auto px-4">
      <ProfileInfoForm ProfileInfo={profileInfoDoc} />
    </div>
  );
};

export default page;
