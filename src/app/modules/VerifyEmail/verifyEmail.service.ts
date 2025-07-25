import AppError from "../../errors/AppError";
import generateOTP from "../../utils/generateOTP";
import { sendEmail } from "../../utils/sendEmail";
import { User } from "../User/user.model";
import { VerifyEmail } from "./verifyEmail.model";
import httpstatus from "http-status";

const sendVerifyEmail = async (userId: string, email: string) => {
  // generate otp
  // const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const otp = generateOTP(4);

  await VerifyEmail.create({ userId, otp, email });

  const html = `
        <h2>Email Verification</h2>
        <p>Your verification code is:</p>
        <h1>${otp}</h1>
        <p>This code will expire in 5 minutes.</p>
    `;

  await sendEmail(email, "Verify Your Email", html);
};

const verifyOTP = async (email: string, otp: string) => {
  try {
    // Step 1: Check if an OTP record exists for this email
    const record = await VerifyEmail.findOne({ email });

    if (!record) {
      throw new AppError(httpstatus.NOT_FOUND, "OTP not found or expired.");
    }

    // Step 2: Validate OTP
    if (record.otp !== otp) {
      throw new AppError(httpstatus.BAD_REQUEST, "Invalid OTP.");
    }

    // Step 3: Mark user as verified
    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      throw new AppError(httpstatus.NOT_FOUND, "User not found.");
    }

    // Step 4: Remove OTP record 
    await VerifyEmail.deleteOne({ email });

    return {
      success: true,
      message: "Email verified successfully.",
      user,
    };
  } catch (error) {
    console.error("OTP verification failed:", error);
    throw error;
  }
};

export const VerifyEmailService = {
  sendVerifyEmail,
  verifyOTP
}