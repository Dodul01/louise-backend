import { Venue } from "./venue.model"

export const findLastVenueId = async () => {
    // Todo: find last venue id;
    const lastVenue = await Venue.findOne({}, { serialId: 1, _id: 0 })
        .sort({ serialId: -1 })
        .lean();

    return lastVenue?.serialId ? lastVenue.serialId : undefined;
}

export const generateVenueSerialId = async () => {
    // Todo: generate venueid and return it
    const lastVenueId = await findLastVenueId();
    let currentId = '000000';

    if (lastVenueId) {
        const numericId = parseInt(lastVenueId, 10) + 1;
        currentId = numericId.toString().padStart(6, '0');
    } else {
        currentId = '000001'
    }

    return currentId;
}