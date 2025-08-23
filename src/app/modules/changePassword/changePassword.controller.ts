import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { changePasswordService } from "./changePassword.service";
import httpStatus from 'http-status';

const changePassword = async (req: Request, res: Response) => {
    const result = await changePasswordService.changePasswordFromDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password changed successfully",
        data: result,
    });
};

export const changePasswordController = {
    changePassword
}