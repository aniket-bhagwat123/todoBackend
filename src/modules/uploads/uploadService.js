import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../../config/s3Config.js";
import path from "path";
import files from "./files.model.js";

export const getAllFilesService = async (request) => {
  const { page, limit, search } = request || {};
  let filter = {};
  
  if (search) {
      filter.$or = [
          { originalName: { $regex: search, $options: 'i' } },
      ];
  }

  if(page && limit) {
      const pageNumber = parseInt(page, 10) || 1;
      const limitNumber = parseInt(limit, 10) || 10;
      const skip = (pageNumber - 1) * limitNumber;
      const files = await files.find(filter).skip(skip).limit(limitNumber);
      return files;
  }

  const allFiles = await files.find(filter);
  return allFiles;
}

export const uploadToS3 = async (file) => {
  const fileName = file.originalname;
  const ext = path.extname(file.originalname);
  const fileKey = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  await s3.send(new PutObjectCommand(params));

  const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

  const images = await files.create({
    fileKey,
    url: fileUrl,
    originalName: fileName,
    size: file.size,
  });

  return images;
};

export const getImageDetailsById = async (id) => {
  if (!id) {
    throw new Error("Image ID is required");
  };
  const image = await files.findById(id);
  return image;
};