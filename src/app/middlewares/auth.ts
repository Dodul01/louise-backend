import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { User, UserRole } from '../modules/User/user.model';
import catchAsync from '../utils/catchAsync';
import { TUser } from '../modules/User/user.interface';

const auth = (...requiredRoles: string[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        
        // checking if the token is missing
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
        }

        // checking if the given token is valid
        const decoded = jwt.verify(
            token,
            config.Jwt_Token as string,
        ) as JwtPayload;

        const { _id } = decoded;

        // checking if the user is exist
        const user = await User.findOne({ _id });

        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
        }

        // checking if the user is valid 
        if (!user?.isVerified) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized.")
        }

        // checking if the user is already deleted
        const isDeleted = user?.isDeleted;

        if (isDeleted) {
            throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
        }

        // checking if the user is blocked
        const userStatus = user?.isBlocked;

        if (userStatus === true) {
            throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
        }

        const userRole = user?.role;

        if (!userRole || !["vendor", "admin"].includes(userRole)) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Invalid role");
        }

        if (requiredRoles.length && !requiredRoles.includes(userRole)) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
        }


        req.user = decoded as JwtPayload & { role: string };
        next();
    });
};

export default auth;