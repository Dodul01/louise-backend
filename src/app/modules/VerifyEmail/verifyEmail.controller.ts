import httpStatus from 'http-status';
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { verifyEmailValidation } from "./verifyEmail.validation";
import { VerifyEmailService } from "./verifyEmail.service";
import sendResponse from "../../utils/sendResponse";

const sendOTP = catchAsync(async (req: Request, res: Response) => {
    const { userId, email } = verifyEmailValidation.verifyEmailSchema.parse(req.body);
    const result = await VerifyEmailService.sendVerifyEmail(userId, email);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Verification email sent successfully",
        data: { result },
    });
});

const verifyOTPController = catchAsync(async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    const result = await VerifyEmailService.verifyOTP(email, otp);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Email verified successfully.",
        data: { result }
    })
})


export const VerifyEmailControllers = {
    sendOTP,
    verifyOTPController
}