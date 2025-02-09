import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";
import User from "../model//userModel.js";

// CHECK USER EMAIL | POST | PUBLIC Route
export const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email exists in the database
    const checkEmail = await User.findOne({ email }).select("-password");

    // If email exists, send success response else error response
    return checkEmail
      ? buildSuccessResponse(res, checkEmail, " email verify successfull")
      : buildErrorResponse(res, "Email not exist.");
  } catch (error) {
    return buildErrorResponse(res, error.message);
  }
};
