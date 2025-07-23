import { NextFunction, Request, Response } from "express";
import { userValidation } from "./user.validation";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;
        const zodPerserUser = userValidation.userValidationSchema.parse(user);
        const result = await UserService.createUserIntoDB(zodPerserUser);

        res.status(200).send({
            success: true,
            message: "User created successfully.",
            result
        })
    } catch (error) {
        // res.status(400).json({
        //     success: false,
        //     message: 'Something went wrong',
        //     statusCode: 400,
        //     error: error,
        //     stack: (error as Error).stack,
        // });

        next(error)
    }
}

export const UserControllers = {
    createUser,
}