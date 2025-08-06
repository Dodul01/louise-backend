import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { HelpService } from "./HelpAndSupport.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';
import AppError from "../../errors/AppError";
import { getLocalImageURL } from "../../utils/uploadImage";
import { IHelpAndSupport } from "./HelpAndSupport.interface";

const createHelpAndSupport = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const image = req.file;

    if (!image) throw new AppError(httpStatus.BAD_REQUEST, "Image upload failed");

    const parsedBody: IHelpAndSupport = {
        ...payload,
        image: getLocalImageURL(image.filename)
    };


    const result = await HelpService.createHelpAndSupportIntoDB(parsedBody);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Help and support added succesfully.",
        data: result
    })
});

const getHelpAndSupport = catchAsync(async (req: Request, res: Response) => {
    const helpId = req.params.helpId;
    const result = await HelpService.getHelpAndSupportFromDB(helpId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Help and support fetched successfully.",
        data: result
    })
});

const updateHelpAndSupport = catchAsync(async (req: Request, res: Response) => {
    const helpId = req.params.helpId;
    const payload = req.body;
    const image = req.file;

    const parsedBody: IHelpAndSupport = {
        ...payload,
        image: image?.filename ? getLocalImageURL(image.filename) : null
    }

    const result = await HelpService.updateHelpAndSupportIntoDB(helpId, parsedBody);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Help and support updated successfully.",
        data: result
    })
});

export const HelpAndSupportController = {
    createHelpAndSupport,
    getHelpAndSupport,
    updateHelpAndSupport
};