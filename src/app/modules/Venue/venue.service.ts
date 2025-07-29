import QueryBuilder from "../../builder/QueryBuilder";
import { RequestQuery } from "../../types/common";
import { TVenue } from "./venue.interface";
import { Venue } from "./venue.model";

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



export const VenueServices = {
    createVenueIntoDB,
    getAllVenuesFromDB
};