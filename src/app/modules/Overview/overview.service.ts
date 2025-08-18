import { User } from "../User/user.model"
import { Venue, VenueWallet } from "../Venue/venue.model";

const getOverviewFromDB = async (): Promise<{
    totalUsers: number;
    totalVenues: number;
    totalEarnings: number;
}> => {
    const [totalUsers, totalVenues] = await Promise.all([
        User.countDocuments(),
        Venue.countDocuments(),
    ]);

    const totalEarnings = await VenueWallet.aggregate([
        { $group: { _id: null, totalEarnings: { $sum: "$totalAmount" } } },
    ]).then(([result]) => result.totalEarnings);

    return { totalUsers, totalVenues, totalEarnings };
};

export const OverviewService = {
    getOverviewFromDB
};