import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../../config/s3Config.js";

export const uploadToS3 = async (file) => {
  const fileName = Date.now() + "-" + file.originalname;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype
  };

  await s3.send(new PutObjectCommand(params));

  const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

  return {
    url: fileUrl,
    originalname: fileName,
    size: file.size,
  };
};