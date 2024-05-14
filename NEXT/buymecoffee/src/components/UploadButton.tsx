import { uploadFileToS3 } from "@/actions/uploadActions";
import { faPencil, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
interface UploadButtonProps {
  onUploadComplete: (url: string) => void;
}
const UploadButton: FC<UploadButtonProps> = ({ onUploadComplete }) => {
  async function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      const data = await uploadFileToS3(formData);
      onUploadComplete(data.url);
    }
  }
  return (
    <>
      <button className="bg-white shadow-sm items-center flex gap-1 rounded-lg cursor-pointer py-1 px-2 aspect-square opacity-70 hover:opacity-90 transition-all">
        <FontAwesomeIcon icon={faPencil} className="aspect-square" />
        <input className="hidden" type="file" onChange={upload} />
      </button>
    </>
  );
};

export default UploadButton;
