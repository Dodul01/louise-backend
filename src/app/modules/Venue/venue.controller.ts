import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { venueValidation } from "./venue.validation";
import { VenueServices } from "./venue.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';
import { getLocalImageURL } from "../../utils/uploadImage";

const createVenue = catchAsync(async (req: Request, res: Response) => {
    const image = req.file;
    if (!image) throw new Error("Image upload failed");

    // Parse complex fields if they come as strings from multipart/form-data
    const parsedBody = {
        ...req.body,
        menu: JSON.parse(req.body.menu),
        opening_hours: JSON.parse(req.body.opening_hours),
        item_price: parseFloat(req.body.item_price),
        isBlocked: req.body.isBlocked === "true",
        ratings: parseFloat(req.body.ratings),
        venue_image: getLocalImageURL(image.filename),
    };

    const validated = venueValidation.venueValidationSchema.parse(parsedBody);

    const venueToCreate = {
        ...validated,
        isDeleted: false,
    };

    const result = await VenueServices.createVenueIntoDB(venueToCreate);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Venue created successfully.",
        data: result,
    });
});

const getAllVenues = catchAsync(async (req: Request, res: Response) => {
    const result = await VenueServices.getAllVenuesFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Venues fetched successfully.",
        data: result.data,
        meta: result.meta
    })
})

export const VenueController = {
    createVenue,
    getAllVenues
};
