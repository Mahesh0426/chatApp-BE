import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const getUserDetailsFromToken = async (token) => {
  // Check if token exists and is valid
  if (!token) {
    return {
      message: "session out",
      logout: true,
    };
  }

  // Decode the token
  const decode = jwt.verify(token, process.env.JWT_SECRET);

  // Find the user by id
  const user = await User.findById(decode.id).select("-password");

  return user;
};
