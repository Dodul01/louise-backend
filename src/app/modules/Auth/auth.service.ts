import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt"
import { createToken } from "./auth.utils";
import config from "../../config";

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

export const AuthServices = {
    signInUser
}