import { Request, Response } from "express";
import { userValidation } from "./user.validation";
import { UserService } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';
import { VenueServices } from "../Venue/venue.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = req.body;
    const zodPerserUser = userValidation.userValidationSchema.parse(user);
    const userToCreate = {
        ...zodPerserUser,
        giftSent: 0,
        giftReceived: 0,
        isBlocked: false,
        isDeleted: false,
        role: "vendor" as "vendor",
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
})

const getAllVenuesWallet = catchAsync(async (req: Request, res: Response) => {
    const { venueId } = req.params;
    const result = await VenueServices.getAllVenuesWalletFromDB(venueId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Venues fetched successfully.",
        data: result
    })
})

export const UserControllers = {
    createUser,
    getAllUsers,
    getAllVenuesWallet
}