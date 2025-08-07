import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { NotificationService } from "./notification.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';

const createNotification = catchAsync(async (req: Request, res: Response) => {
    const notification = req.body;
    const result = await NotificationService.createNotificationIntoDB(notification);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Notification added succesfully.",
        data: result
    })
});

export const NotificationController = {
    createNotification
}