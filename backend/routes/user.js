import express from "express";
import {
  storeUser,
  verifyUserEmail,
  resendVerification,
} from "../controllers/User.js";

const router = express.Router();

// register user
router.post("/register", storeUser);

// verify email
router.post("/verify-email", verifyUserEmail);

// resend verification code
router.post("/resend-verification", resendVerification);

export default router;
