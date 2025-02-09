import { getUserDetailsFromToken } from "../helper/getUserDetailsFromToken.js";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";
import User from "../model/userModel.js";

// GET USER DETAILS | GET |
export const userDetails = async (req, res) => {
  try {
    //get the user details from the token
    const token = req.cookies.authToken || "";

    const user = await getUserDetailsFromToken(token);

    buildSuccessResponse(res, user, "User details fetched successfully");
  } catch (error) {
    console.error("Error during fetching user details:", error);
    buildErrorResponse(res, "Error fetching user details");
  }
};

// UPDATE USER DETAILS | PUT |
export const updateUserDetails = async (req, res) => {
  try {
    // Get user details from the token
    const token = req.cookies.authToken || "";
    const user = await getUserDetailsFromToken(token);

    if (!user || !user._id) {
      return buildErrorResponse(
        res,
        "Unauthorized: Invalid token or user not found."
      );
    }

    const { name, email, profile_pic } = req.body;

    // Update user details in DB, only if values are provided
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (profile_pic) updateFields.profile_pic = profile_pic;

    await User.updateOne({ _id: user._id }, { $set: updateFields });

    // Fetch updated user details from DB
    const userInfo = await User.findById(user._id).select("-password");

    return buildSuccessResponse(
      res,
      userInfo,
      "User details updated successfully"
    );
  } catch (error) {
    console.error("Error updating user details:", error);
    return buildErrorResponse(res, "Error updating user details");
  }
};
