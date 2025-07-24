import { Request, Response } from "express";
import { userValidation } from "./user.validation";
import { UserService } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';

const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = req.body;
    const zodPerserUser = userValidation.userValidationSchema.parse(user);
    const result = await UserService.createUserIntoDB(zodPerserUser);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User created succesfully.",
        data: result,
    })
})

export const UserControllers = {
    createUser,
}