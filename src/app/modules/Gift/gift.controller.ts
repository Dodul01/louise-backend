import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { GiftService } from "./gift.service";

export const GiftController = {
    createGiftPayment: catchAsync(async (req: Request, res: Response) => {
        const result = await GiftService.createGiftPayment(req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Payment intent created successfully.",
            data: result,
        });
    }),

    confirmPayment: catchAsync(async (req: Request, res: Response) => {
        const { transaction_id } = req.body;
        const result = await GiftService.confirmPayment(transaction_id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Payment confirmed and QR code generated.",
            data: result,
        });
    }),

    redeemGift: catchAsync(async (req: Request, res: Response) => {
        const { gift_id } = req.params;
        const result = await GiftService.redeemGift(gift_id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Gift redeemed successfully.",
            data: result,
        });
    }),
};
