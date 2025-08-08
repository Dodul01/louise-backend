import { Request, Response } from "express";
import { userValidation } from "./user.validation";
import { UserService } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';

const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = req.body;
    const zodPerserUser = userValidation.userValidationSchema.parse(user);
    const userToCreate = {
        ...zodPerserUser,
        giftSent: 0,
        giftReceived: 0,
        isBlocked: false,
        isDeleted: false,
        role: "user" as "user",
        serialId: "",
    };

    const result = await UserService.createUserIntoDB(userToCreate);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User created succesfully.",
        data: result,
    })
})

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.getAllUsers();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users fetched successfully.",
        data: result,
    })
});

const blockUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.body.userId;
    const result = await UserService.blockUserFormDB(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User block succesfully.",
        data: result,
    })
})

const unblockUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.body.userId;
    const result = await UserService.unblockUserFormDB(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User unblock succesfully.",
        data: result,
    })
})

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const result = await UserService.getSingleUserForDB(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User feched succesfully.",
        data: result,
    })
})


export const UserControllers = {
    createUser,
    getAllUsers,
    blockUser,
    unblockUser,
    getSingleUser
}