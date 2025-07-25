import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt"
import { createToken } from "./auth.utils";
import config from "../../config";
import { sendEmail } from "../../utils/sendEmail";
import generateOTP from "../../utils/generateOTP";
import { VerifyEmail } from "../VerifyEmail/verifyEmail.model";

const signInUser = async (payload: TLoginUser) => {
    const { email, password } = payload;

    // check if the email password are available
    if (!email || !password) {
        throw new AppError(400, "Email and password are required.")
    }

    // check if the user exsist
    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError(404, "User not found.")
    }

    // check if the user is validated 
    if (user.isVerified === false) {
        throw new AppError(403, "Please verify you email first.")
    }

    // check if the password matched
    if (!user.password) {
        throw new AppError(500, "User password is missing.")
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if (!isPasswordMatched) {
        throw new AppError(401, "Incorrect Password.");
    }

    // prepare the payload for jwt
    const jwtPayload = {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        isVerified: user.isVerified ?? false
    }

    const jwtToken = createToken(jwtPayload, config.Jwt_Token as string, config.jwt_access_expiry as string);

    return { jwtToken }
}

const forgetPassword = async (email: string) => {
    // Step 1: Check if the user exist 
    const record = await User.findOne({ email });

    if (record) {
        const otp = generateOTP(4);
        await VerifyEmail.create({ userId: record._id, otp, email });
        const html = `
        <h2>Email Verification</h2>
        <p>Your verification code is:</p>
        <h1>${otp}</h1>
        <p>This code will expire in 5 minutes.</p>
    `;
        // Step 2: if exsist then send the otp 

        await sendEmail(email, "Reset Password - OTP", html);
    }
}

const resetPassword = async () => {

}

export const AuthServices = {
    signInUser,
    forgetPassword,
    resetPassword
}