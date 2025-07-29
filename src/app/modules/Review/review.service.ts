import { Venue } from "../Venue/venue.model";
import { IReview } from "./review.interface";
import { ReviewModel } from "./review.model";

const createReviewIntoDB = async (data: IReview) => {
    // step 1 create review
    const review = await ReviewModel.create(data);

    // step 2 get all reviews for this venue
    const reviews = await ReviewModel.find({ venueId: data.venueId });

    // setp 3 calculate average rating
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    //  step 4 update venue with average rating
    await Venue.findByIdAndUpdate(data.venueId, { ratings: averageRating });

    return review;
};

export const ReviewService = {
    createReviewIntoDB
};