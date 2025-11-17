import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.Email,
    pass: process.env.APP_PASSWORD,
  },
});

export const sendVerificationEmail = async (to, code) => {
  try {
    const info = await transporter.sendMail({
      from: `"Football Scores" <${process.env.EMAIL}>`,
      to,
      subject: "Email Verification",
      html: `<p>Hello 👋</p><p>Your verification code is <b>${code}</b>.</p>`,
    });

    console.log("✅ Message sent:", info.messageId);
  } catch (err) {
    console.error("❌ Email failed:", err);
  }
};
