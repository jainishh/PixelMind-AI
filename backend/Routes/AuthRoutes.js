import express from "express";
const router = express.Router();
import { Signup, Login, getuser } from "../Controllers/AuthController.js";
import verifyToken from "../Middleware/AuthMiddleware.js";
import {
  signUpValidation,
  loginValidation,
} from "../Middleware/AuthValidation.js";

router.post("/signup", signUpValidation, Signup);
router.post("/login", loginValidation, Login);
router.get("/getuser", verifyToken, getuser);

export default router;
