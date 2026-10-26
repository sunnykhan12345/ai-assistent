import { v2 as cloudinary } from "cloudinary";
import { unlink } from "fs/promises";

const UploadOnCloudinary = async (filePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
  });

  try {
    const uploadResult = await cloudinary.uploader.upload(filePath);
    return uploadResult.secure_url;
  } finally {
    try {
      await unlink(filePath);
    } catch (error) {
      if (error.code !== "ENOENT") {
        console.error("Error removing temporary assistant image:", error);
      }
    }
  }
};

export default UploadOnCloudinary;
