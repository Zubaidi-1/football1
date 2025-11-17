import User from "../models/User.js";
import { sendVerificationEmail } from "../util/mailer.js";

export const storeUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    //   Generate a verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    // Send verification email
    await sendVerificationEmail(email, verificationCode);

    // Store user with verification code
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      verification_code: verificationCode,
      expires_at: expires,
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error storing user:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// verify user email
export const verifyUserEmail = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.is_verified) {
      return res.status(400).json({ message: "User already verified" });
    }
    if (user.verification_code !== code || new Date() > user.expires_at) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    user.is_verified = true;
    user.verification_code = null;
    user.expires_at = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying user email:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
// resend verification code
export const resendVerification = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ message: "User not found" });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 15 * 60 * 1000);

  user.verification_code = code;
  user.verification_expires_at = expires;
  await user.save();

  await sendVerificationEmail(email, code);
  res.json({ message: "New verification code sent." });
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
