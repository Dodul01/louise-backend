import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';
import { UserService } from "../User/user.service";
import { ProfileService } from "./profile.service";
import AppError from "../../errors/AppError";
import { get } from "node:https";
import { getLocalImageURL } from "../../utils/uploadImage";

const getEditProfile = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const result = await ProfileService.getEditProfileFromDB(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Profile fetched successfully.",
        data: result,
    })
});

const editProfile = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const image = req.file;

    const parsedBody: any = {
        ...req.body,
    };

    if (image) {
        parsedBody.profile_image = getLocalImageURL(image.filename);
    }

    const result = await ProfileService.editProfileFromDB(userId, parsedBody);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Profile updated successfully.",
        data: result,
    });
});

export const ProfileController = {
    getEditProfile,
    editProfile
}