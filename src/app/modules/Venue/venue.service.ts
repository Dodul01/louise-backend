import QueryBuilder from "../../builder/QueryBuilder";
import { RequestQuery } from "../../types/common";
import { GiftModel } from "../Gift/gift.model";
import { TVenue } from "./venue.interface";
import { Venue, VenueWallet } from "./venue.model";

const createVenueIntoDB = async (payload: TVenue) => {
    const isExists = await Venue.findOne({ serialId: payload.serialId });
    if (isExists) throw new Error("Venue with this serialId already exists");

    const newVenue = await Venue.create(payload);
    return newVenue;
};


const getAllVenuesFromDB = async (query: RequestQuery) => {
    const venueQuery = Venue.find({ isDeleted: false }).sort({ createdAt: -1 });
    const queryBuilder = new QueryBuilder(venueQuery, query);

    const venues = await queryBuilder.search(['name', 'location']).filter().sort().paginate().fields().modelQuery;

    const meta = await queryBuilder.countTotal();

    return { meta, data: venues };
}

export const getAllVenuesWalletFromDB = async () => {
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




export const VenueServices = {
    createVenueIntoDB,
    getAllVenuesFromDB,
    getAllVenuesWalletFromDB
};