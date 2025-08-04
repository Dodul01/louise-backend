import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { reviewValidation } from "./review.validation";
import { ReviewService } from "./review.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';

const createReview = catchAsync(async (req: Request, res: Response) => {
    const review = req.body;
    const zodParserReview = reviewValidation.reviewValidationSchema.parse(review);
    const result = await ReviewService.createReviewIntoDB(zodParserReview)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review created successfully.",
        data: result
    });
})

export const ReviewController = {
    createReview
}