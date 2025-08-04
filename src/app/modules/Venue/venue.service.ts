import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { RequestQuery } from "../../types/common";
import { GiftModel } from "../Gift/gift.model";
import { TVenue } from "./venue.interface";
import { Venue, VenueTransaction, VenueWallet } from "./venue.model";
import AppError from "../../errors/AppError";
import httpStatus from 'http-status';

const createVenueIntoDB = async (payload: TVenue) => {
    const isExists = await Venue.findOne({ serialId: payload.serialId });
    if (isExists) throw new Error("Venue with this serialId already exists");

    const newVenue = await Venue.create(payload);
    return newVenue;
};

const getAllVenuesFromDB = async (query: RequestQuery) => {
    const venueQuery = Venue.find({ isDeleted: false }).sort({ createdAt: -1 });
    const queryBuilder = new QueryBuilder(venueQuery, query);

    const venues = await queryBuilder.search(['name', 'location', 'venue_type']).filter().sort().paginate().fields().modelQuery;

    const meta = await queryBuilder.countTotal();

    return { meta, data: venues };
}

const getAllVenuesWalletFromDB = async () => {
    /* 
        STEP 1: get all venues 
        STEP 2: get all gifts
        STEP 3: calculate total amount by finding which gift belongs to which venue
        STEP 4: calculate total commission (20%) earning.
        STEP 5: save the full data in db.
    */
    const aggregated = await GiftModel.aggregate([
        {
            $lookup: {
                from: "venues",
                let: { giftMenuId: "$gift_id" },
                pipeline: [
                    { $match: { isDeleted: false } },
                    { $unwind: "$menu" },
                    { $match: { $expr: { $eq: ["$menu._id", "$$giftMenuId"] } } },
                ],
                as: "matchedVenue",
            },
        },
        { $unwind: "$matchedVenue" },
        {
            $group: {
                _id: "$matchedVenue._id",
                totalAmount: { $sum: "$amount" },
                totalGifts: { $sum: 1 },
            },
        },
        {
            $project: {
                venueId: "$_id",
                _id: 0,
                totalGifts: 1,
                totalAmount: 1,
                commission: { $multiply: ["$totalAmount", 0.2] },
                netEarning: { $subtract: ["$totalAmount", { $multiply: ["$totalAmount", 0.2] }] },
                walletStatus: { $literal: "pending" },
            },
        },
    ]);

    // overwrite existing wallet for each venue (upsert logic)
    for (const entry of aggregated) {
        await VenueWallet.findOneAndUpdate(
            { venueId: entry.venueId },
            entry,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
    }

    const wallets = await VenueWallet.find().populate("venueId", "name venue_type location");
    return wallets;
};

const getVenueTransactionsFromDB = async (venueId: string) => {
    if (!mongoose.Types.ObjectId.isValid(venueId)) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Invalid venueId');
    }

    const venue = await Venue.findById(venueId).lean();
    if (!venue) throw new AppError(httpStatus.NOT_FOUND, 'Venue not found');

    const menuMap = venue.menu.reduce((acc: Record<string, string>, item: any) => {
        acc[item.item_name] = item._id.toString();
        return acc;
    }, {});

    const itemIds = Object.values(menuMap);

    const gifts = await GiftModel.find({
        gift_id: { $in: itemIds }
    }).lean();

    const transactions = gifts.map(gift => {
        const item = gift.gift_id
            ? venue.menu.find((item: any) => item._id.toString() === String(gift.gift_id))
            : null;

        return {
            serialId: venue.serialId,
            venueName: venue.name,
            paymentFrom: gift.sender_name,
            broughtItem: item?.item_name || null,
            paymentAmount: gift.amount,
            date: gift.created_at,
            transactionId: gift.transaction_id,
        };
    });


    if (transactions.length > 0) {
        await VenueTransaction.insertMany(transactions, { ordered: false }).catch(err => {
            console.error("Some transactions may already exist or failed to insert:", err.message);
        });
    }

    return transactions;
};


const markPaymentAsPaidIntoDB = async (walletId: string) => {
    const result = await VenueWallet.findByIdAndUpdate(
        walletId,
        { $set: { walletStatus: 'paid' } },
        { new: true }
    );

    return result;
}

const deleteSingleTransactionFromDB = async (transactionId: string) => {
    // console.log(transactionId);
    const deleteTransaction = await VenueTransaction.findOneAndDelete({ transactionId })
    console.log(deleteTransaction);

    return deleteTransaction;
};

const getFeaturedVenuesFromDB = async () => {
    const venues = await Venue.find({ isFeatured: true }).sort({ createdAt: -1 });
    return venues;
}

export const VenueServices = {
    createVenueIntoDB,
    getAllVenuesFromDB,
    getAllVenuesWalletFromDB,
    getVenueTransactionsFromDB,
    getFeaturedVenuesFromDB,
    markPaymentAsPaidIntoDB,
    deleteSingleTransactionFromDB
};