import express from "express";
import { registerUser } from "../controller/userController.js";

const router = express.Router();

// CREATE USER  |POST | SIGNUP  | PUBLIC Route
router.post("/register", registerUser);

export default router;
