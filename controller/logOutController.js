import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";

// LOGOUT | GET | PRIVATE Route
export const LogOut = async (req, res) => {
  try {
    // Clear the cookie
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return buildSuccessResponse(res, null, "Logged out successfully");
  } catch (error) {
    console.error("Error during logout:", error);
    return buildErrorResponse(res, "Error during logout");
  }
};
