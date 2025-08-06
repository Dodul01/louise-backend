import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { TermsService } from "./TermsAndConditions.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';

const createTermsAndCondition = catchAsync(async (req: Request, res: Response) => {
    const termsAndCondition = req.body;
    const result = await TermsService.createTermsAndConditionIntoDB(termsAndCondition);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Terms and condition added succesfully.",
        data: result
    })
});

const updateTermsAndCondition = catchAsync(async (req: Request, res: Response) => {
    const termsAndCondition = req.body.terms_and_conditions;
    const termsId = req.params.termsId;
    const result = await TermsService.updateTermsAndConditionIntoDB(termsId, termsAndCondition);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Terms and condition updated succesfully.",
        data: result
    });
});

const getTermsAndCondition = catchAsync(async (req: Request, res: Response) => {
    const termsId = req.params.termsId;
    const result = await TermsService.getTermsAndConditionFromDB(termsId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Terms and condition fetched successfully.",
        data: result
    })
});

export const termsController = {
    createTermsAndCondition,
    updateTermsAndCondition,
    getTermsAndCondition
};