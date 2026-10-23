// import User from "../model/user.model.js";
// export const getCurrentUser = async (req, res) => {
//   try {
//     const userId = req.userId; // Get the user ID from the request object
//     const user = await User.findById(userId).select("-password"); // Exclude password from the response
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user);
//   } catch (error) {
//     console.error("Error fetching current user:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
import User from "../model/user.model.js";
import UploadCloudinary from "../config/Cloudinary.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching current user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const UpdateAssistant = async (req, res) => {
  try {
    const userId = req.userId;
    const { assistantName, ImgUrl } = req.body;

    let assistantImage;

    if (req.file) {
      assistantImage = await UploadCloudinary(req.file.path);
    } else {
      assistantImage = ImgUrl;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        assistantName,
        assistantImage,
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Assistant updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating assistant:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
