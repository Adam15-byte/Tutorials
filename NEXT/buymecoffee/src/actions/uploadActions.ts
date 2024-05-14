"use server";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function uploadFileToS3(formData: FormData) {
  const file = formData.get("file") as File;
  const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.AWS_SECRET_KEY as string,
    },
  });
  const extension = file.name.split(".").pop();
  const newFileName = `file-${Date.now()}.${extension}`;

  const chunks = [];
  //@ts-ignore
  for await (const chunk of file.stream()) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: newFileName,
      Body: buffer,
      ContentType: file.type,
    })
  );
  const url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${newFileName}`;
  return {
    newFileName,
    extension,
    url,
  };
}
