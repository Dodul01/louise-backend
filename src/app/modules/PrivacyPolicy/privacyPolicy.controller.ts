import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { PrivacyService } from "./privacyPolicy.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';

const createPrivacyPolicy = catchAsync(async (req: Request, res: Response) => {
    const privacyPolicy = req.body;
    const result = await PrivacyService.createPrivacyPolicyIntoDB(privacyPolicy);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Privacy policy added succesfully.",
        data: result
    })
});

const updatePrivacyPolicy = catchAsync(async (req: Request, res: Response) => {
    const privacyPolicy = req.body.privacy_policy_content;
    const privacyId = req.params.policyId;
    const result = await PrivacyService.updatePrivacyPolicyFormDB(privacyId, privacyPolicy);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Privacy policy updated successfully.",
        data: result,
    });
})

export const policyController = {
    createPrivacyPolicy,
    updatePrivacyPolicy
}