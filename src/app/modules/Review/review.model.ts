import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    venueId: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

export const ReviewModel = mongoose.model("Review", reviewSchema);