import { NextFunction, Request, Response } from "express"
import { AuthServices } from "./auth.service";
import catchAsync from "../../utils/catchAsync";
import { forgetPasswordValidationSchema, resetPasswordValidationSchema } from "./auth.validation";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await AuthServices.signInUser(req.body);
        const { jwtToken } = result;

        res.status(200).json({
            success: true,
            message: 'Sign in successful.',
            statusCode: 200,
            data: {
                token: jwtToken,
            },
        });
    } catch (err) {
        next(err);
    }
}

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
    const email = req.body;
    const zodPerserEmail = forgetPasswordValidationSchema.parse(email);
    const result = await AuthServices.forgetPassword(zodPerserEmail.email);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "OTP send succesfully.",
        data: result
    })
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
    const { newPassword } = req.body;
    const jwtToken = req.headers.authorization;
    const zodPerser = resetPasswordValidationSchema.parse({ jwtToken, newPassword })
    const result = await AuthServices.resetPassword(zodPerser.jwtToken, zodPerser.newPassword);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password reset succesfully.",
        data: result
    })
});

export const AuthControllers = {
    loginUser,
    forgetPassword,
    resetPassword
}