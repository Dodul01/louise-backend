import { TVenue } from "./venue.interface";
import { Venue } from "./venue.model";

const createVenueIntoDB = async (payload: TVenue) => {
    const isExists = await Venue.findOne({ serialId: payload.serialId });
    if (isExists) throw new Error("Venue with this serialId already exists");

    const newVenue = await Venue.create(payload);
    return newVenue;
};

export const VenueServices = {
    createVenueIntoDB,
};
