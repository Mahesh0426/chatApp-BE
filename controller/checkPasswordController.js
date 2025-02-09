import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// CHECK USER PASSWORD | POST | LOGIN | PRIVATE Route
export const checkPassword = async (req, res) => {
  try {
    const { password, userId } = req.body;

    // Check if password exists in the database
    const user = await User.findById(userId);

    // Compare hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return buildErrorResponse(res, "Password does not match.");
    }
    //   token data to be stored in JWT
    const tokenData = { id: user._id, email: user.email };

    //Generate JWT Token
    const JWT = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Cookie Options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      // sameSite: "Lax",
      //   http: true,
      //   secure: true,
    };

    // Set JWT Token in Cookies
    res.cookie("authToken", JWT, cookieOptions);

    return buildSuccessResponse(res, JWT, "Login successful.");
  } catch (error) {
    buildErrorResponse(res, error.message);
  }
};
