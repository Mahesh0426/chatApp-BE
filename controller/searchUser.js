import User from "../model/userModel.js";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";

// SEARCH USER | POST |
export const searchUser = async (req, res) => {
  try {
    const { search } = req.body;

    const query = new RegExp(search, "i", "g");

    const user = await User.find({
      $or: [{ name: query }, { email: query }],
    }).select("-password");

    return buildSuccessResponse(res, user, "all user searched successfully!! ");
  } catch (error) {
    console.error("Error during user search:", error);
    return buildErrorResponse(res, null, "Error during user search");
  }
};
