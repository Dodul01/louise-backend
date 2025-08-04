import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import httpStatus from 'http-status';

const getEditProfileFromDB = async (userId: string) => {
    const user = await User.findOne({ _id: userId });
    return user;
};

const editProfileFromDB = async (userId: string, payload: any) => {
    const user = await User.findByIdAndUpdate(userId, payload, {
        new: true,
        runValidators: true,
    });

    if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

    return user;
};


export const ProfileService = {
    getEditProfileFromDB,
    editProfileFromDB
};