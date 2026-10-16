import User from "../model/user.model.js";
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId; // Get the user ID from the request object
    const user = await User.findById(userId).select("-password"); // Exclude password from the response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
