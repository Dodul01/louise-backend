import { z } from "zod";

// Menu item schema
export const menuItemSchema = z.object({
    item_name: z.string({
        required_error: "Item Name is required.",
        invalid_type_error: "Item name must be a string."
    }),
    item_description: z.string({
        required_error: "Item description is required.",
        invalid_type_error: "Item description must be a string."
    }),
    item_price: z.number({
        required_error: "Item price is required.",
        invalid_type_error: "Item price should be number"
    }).nonnegative(),
})

// Opening Hours Schema
export const openingHoursSchema = z.object({
    sunday: z.object({
        isClosed: z.boolean(),
        openTime: z.string(),
        closeTime: z.string(),
    }),
    monday: z.object({
        isClosed: z.boolean(),
        openTime: z.string(),
        closeTime: z.string(),
    }),
    tuesday: z.object({
        isClosed: z.boolean(),
        openTime: z.string(),
        closeTime: z.string(),
    }),
    wednesday: z.object({
        isClosed: z.boolean(),
        openTime: z.string(),
        closeTime: z.string(),
    }),
    thursday: z.object({
        isClosed: z.boolean(),
        openTime: z.string(),
        closeTime: z.string(),
    }),
    friday: z.object({
        isClosed: z.boolean(),
        openTime: z.string(),
        closeTime: z.string(),
    }),
    saturday: z.object({
        isClosed: z.boolean(),
        openTime: z.string(),
        closeTime: z.string(),
    }),
});

const venueValidationSchema = z.object({
    serialId: z.string(),
    name: z.string({
        required_error: "Name is required.",
        invalid_type_error: "Name must be a string.",
    }),
    venue_type: z.enum(['cafe', 'bakery', 'restaurant'], {
        required_error: "Venue type is required.",
        invalid_type_error: "Venue must be 'cafe', 'bakery' or 'restaurant'"
    }),
    location: z.string({
        required_error: "Location is required.",
        invalid_type_error: "Location must be string.",
    }),
    menu: z.array(menuItemSchema),
    isBlocked: z.boolean(),
    ratings: z.number().min(0).max(5),
    popular_Item: z.string(),
    venue_image: z.string(),
    opening_hours: openingHoursSchema,
});

export const venueValidation = {
    venueValidationSchema
}