import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";
import bcrypt from "bcryptjs";
import User from "../model/userModel.js";

// CREATE USER  |POST | SIGNUP  | PUBLIC Route
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, profile_pic } = req.body;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user object
    const payload = {
      name,
      email,
      profile_pic,
      password: hashedPassword,
    };

    // Save user to database
    const user = new User(payload);
    // ("user", user);

    const userSave = await user.save();

    // Check if user was created
    userSave?._id
      ? buildSuccessResponse(res, userSave, "User created Successfully!!")
      : buildErrorResponse(res, "Couldn't create user!!");
  } catch (error) {
    // console.error("Error during user registration:", error);
    // If it's a duplicate key error (email already in use)
    if (error.code === 11000) {
      error.message = "User with this Email already exists!!";
    }

    buildErrorResponse(res, error.message);
  }
};
