import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import { TChangePassword } from "./changePassword.interface";
import bcrypt from "bcrypt";

const changePasswordFromDB = async (payload: TChangePassword) => {
    const { email, password, newPassword, confirmPassword } = payload;

    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError(404, "User not found.");
    }

    if (newPassword !== confirmPassword) {
        throw new AppError(400, "New password and confirm password do not match.");
    }

    if (!user.password) {
        throw new AppError(400, "User password is not set.");
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        throw new AppError(401, "Incorrect Password.");
    }

    user.password = newPassword;
    await user.save();

    return user;
}


export const changePasswordService = {
    changePasswordFromDB
};