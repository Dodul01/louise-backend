import { NextFunction, Request, Response } from "express"
import { AuthServices } from "./auth.service";

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

const forgetPassword = async () => {

}

export const AuthControllers = {
    loginUser,
    forgetPassword
}