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
        isFeatured: false
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
});

const getAllVenuesWallet = catchAsync(async (req: Request, res: Response) => {
    const result = await VenueServices.getAllVenuesWalletFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Venues wallet fetched successfully.",
        data: result
    })
});

const getVenueTransactions = catchAsync(async (req: Request, res: Response) => {
    const venueId = req.params.venueId;
    const result = await VenueServices.getVenueTransactionsFromDB(venueId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Venue transactions fetched successfully.",
        data: result
    })
});

<<<<<<< HEAD
const getFeaturedVenues = catchAsync(async (req: Request, res: Response) => {
    const result = await VenueServices.getFeaturedVenuesFromDB();
=======
const markPaymentAsPaid = catchAsync(async (req: Request, res: Response) => {
    const { walletId } = req.body;
    const result = await VenueServices.markPaymentAsPaidIntoDB(walletId);
>>>>>>> a539ba6e11ddf0a481f29e6ce0af77ba18a30d7d

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
<<<<<<< HEAD
        message: "Featured venues fetched successfully.",
=======
        message: "Mark as paid.",
        data: result
    })
});

const deleteSingleTransaction = catchAsync(async (req: Request, res: Response) => {
    const transactionId = req.params.transactionId;
    const result = await VenueServices.deleteSingleTransactionFromDB(transactionId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Transaction delete succesfully.',
>>>>>>> a539ba6e11ddf0a481f29e6ce0af77ba18a30d7d
        data: result
    });
});

export const VenueController = {
    createVenue,
    getAllVenues,
    getAllVenuesWallet,
    getVenueTransactions,
<<<<<<< HEAD
    getFeaturedVenues
};
=======
    markPaymentAsPaid,
    deleteSingleTransaction
};
>>>>>>> a539ba6e11ddf0a481f29e6ce0af77ba18a30d7d
