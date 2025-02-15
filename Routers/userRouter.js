import express from "express";
import { registerUser } from "../controller/userController.js";
import { checkEmail } from "../controller/checkEmailController.js";
import { checkPassword } from "../controller/checkPasswordController.js";
import {
  updateUserDetails,
  userDetails,
} from "../controller/userDetailsController.js";
import { LogOut } from "../controller/logOutController.js";
import { searchUser } from "../controller/searchUser.js";

const router = express.Router();

// CREATE USER  |POST | SIGNUP  | PUBLIC Route
router.post("/register", registerUser);

// CHECK USER EMAIL | POST | PUBLIC Route
router.post("/checkemail", checkEmail);

// CHECK USER PASSWORD | POST | LOGIN | PRIVATE Route
router.post("/checkpassword", checkPassword);

// GET USER DETAILS | GET |
router.get("/userdetails", userDetails);

//LOGOUT | GET | LOGOUT | PRIVATE Route
router.get("/logout", LogOut);

//UPDATE USER DETAILS | PUT |
router.put("/update-user", updateUserDetails);

// SEARCH USER | POST |
router.post("/search-user", searchUser);

export default router;
