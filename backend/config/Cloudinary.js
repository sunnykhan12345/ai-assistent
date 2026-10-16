import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
const UplaodOnCloudinary = async (filePath) => {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY, // Click 'View API Keys' above to copy your API secret
  });
  try {
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(filePath);
    fs.unlinkSync(filePath);
    return uploadResult.secure_url;
  } catch (err) {
    fs.unlinkSync(filePath);
    return res.status(400).json({ message: "Cloudinary erorr", err });
  }
};

export default UplaodOnCloudinary;
