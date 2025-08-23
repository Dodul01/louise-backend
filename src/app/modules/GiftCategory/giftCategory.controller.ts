import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from 'http-status';
import { GiftCategoryServices } from "./giftCategory.service";
import sendResponse from "../../utils/sendResponse";

const getGiftCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await GiftCategoryServices.getGiftCategoryFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Gift category fetched successfully.",
        data: result
    });
});

export const GiftCategoryController = {
    getGiftCategory
}