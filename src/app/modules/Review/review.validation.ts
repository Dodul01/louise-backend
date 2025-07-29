import { z } from "zod";

const reviewValidationSchema = z.object({
    userId: z.string({
        required_error: "User ID is required.",
        invalid_type_error: "User ID must be a string",
    }),
    venueId: z.string({
        required_error: "Venue ID is required.",
        invalid_type_error: "Venue ID must be a string",
    }),
    rating: z.number({
        required_error: "Rating is required.",
        invalid_type_error: "Rating must be a number",
    }).min(0).max(5),
    comment: z.string({
        required_error: "Comment is required.",
        invalid_type_error: "Comment must be a string",
    })
});

export const reviewValidation = {
    reviewValidationSchema
}