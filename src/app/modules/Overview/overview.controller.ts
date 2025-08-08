import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { OverviewService } from "./overview.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';

const getOverview = catchAsync(async (req: Request, res: Response) => {
    const result = await OverviewService.getOverviewFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Overview fetched successfully.",
        data: result
    });
});

export const OverviewController = {
    getOverview
};