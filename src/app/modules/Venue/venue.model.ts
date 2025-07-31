// import mongoose, { Schema, Document } from "mongoose";

// interface IMenu {
//     item_name: string;
//     item_description: string;
//     item_price: number;
// }

// interface IOpeningHoursDay {
//     isClosed: boolean;
//     openTime: string;
//     closeTime: string;
// }

// interface IOpeningHours {
//     sunday: IOpeningHoursDay;
//     monday: IOpeningHoursDay;
//     tuesday: IOpeningHoursDay;
//     wednesday: IOpeningHoursDay;
//     thursday: IOpeningHoursDay;
//     friday: IOpeningHoursDay;
//     saturday: IOpeningHoursDay;
// }

// const MenuSchema = new Schema<IMenu>({
//     item_name: { type: String, required: true },
//     item_description: { type: String, required: true },
//     item_price: { type: Number, required: true, min: 0 },
// });

// const OpeningHoursDaySchema = new Schema<IOpeningHoursDay>({
//     isClosed: { type: Boolean, required: true },
//     openTime: { type: String, required: true },
//     closeTime: { type: String, required: true },
// }, { _id: false });

// const OpeningHoursSchema = new Schema<IOpeningHours>({
//     sunday: { type: OpeningHoursDaySchema, required: true },
//     monday: { type: OpeningHoursDaySchema, required: true },
//     tuesday: { type: OpeningHoursDaySchema, required: true },
//     wednesday: { type: OpeningHoursDaySchema, required: true },
//     thursday: { type: OpeningHoursDaySchema, required: true },
//     friday: { type: OpeningHoursDaySchema, required: true },
//     saturday: { type: OpeningHoursDaySchema, required: true },
// }, { _id: false });

// export interface IVenue extends Document {
//     serialId: string;
//     name: string;
//     venue_type: "cafe" | "bakery" | "restaurant";
//     location: string;
//     menu: IMenu[];
//     isBlocked: boolean;
//     ratings: number;
//     popular_Item: string;
//     venue_image: string;
//     opening_hours: IOpeningHours;
//     isDeleted?: boolean;
// }

// const VenueSchema = new Schema<IVenue>({
//     serialId: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     venue_type: {
//         type: String,
//         enum: ["cafe", 'bakery', 'restaurant'],
//         required: true
//     },
//     location: {
//         type: String,
//         required: true
//     },
//     menu: {
//         type: [MenuSchema],
//         required: true
//     },
//     isBlocked: {
//         type: Boolean,
//         required: true
//     },
//     ratings: {
//         type: Number,
//         min: 0,
//         max: 5,
//         required: true
//     },
//     popular_Item: {
//         type: String,
//         required: true
//     },
//     venue_image: {
//         type: String,
//         required: true
//     },
//     opening_hours: {
//         type: OpeningHoursSchema,
//         required: true
//     },
//     isDeleted: {
//         type: Boolean,
//         default: false
//     }
// });

// const VenueWalletSchema = new mongoose.Schema({
//     venueId: mongoose.Schema.Types.ObjectId,
//     totalGifts: Number,
//     totalAmount: Number,
//     commission: Number,
//     netEarning: Number
// }, { timestamps: true });

// export const VenueWallet = mongoose.model("VenueWallet", VenueWalletSchema);
// export const Venue = mongoose.model<IVenue>("Venue", VenueSchema);


import mongoose, { Schema, Document } from "mongoose";

/* ========== Interfaces ========== */
interface IMenu {
    item_name: string;
    item_description: string;
    item_price: number;
}

interface IOpeningHoursDay {
    isClosed: boolean;
    openTime: string;
    closeTime: string;
}

interface IOpeningHours {
    sunday: IOpeningHoursDay;
    monday: IOpeningHoursDay;
    tuesday: IOpeningHoursDay;
    wednesday: IOpeningHoursDay;
    thursday: IOpeningHoursDay;
    friday: IOpeningHoursDay;
    saturday: IOpeningHoursDay;
}

export interface IVenue extends Document {
    serialId: string;
    name: string;
    venue_type: "cafe" | "bakery" | "restaurant";
    location: string;
    menu: IMenu[];
    isBlocked: boolean;
    ratings: number;
    popular_Item: string;
    venue_image: string;
    opening_hours: IOpeningHours;
    isDeleted?: boolean;
}

/* ========== Venue Schema ========== */
const MenuSchema = new Schema<IMenu>({
    item_name: { type: String, required: true },
    item_description: { type: String, required: true },
    item_price: { type: Number, required: true, min: 0 },
});

const OpeningHoursDaySchema = new Schema<IOpeningHoursDay>({
    isClosed: { type: Boolean, required: true },
    openTime: { type: String, required: true },
    closeTime: { type: String, required: true },
}, { _id: false });

const OpeningHoursSchema = new Schema<IOpeningHours>({
    sunday: { type: OpeningHoursDaySchema, required: true },
    monday: { type: OpeningHoursDaySchema, required: true },
    tuesday: { type: OpeningHoursDaySchema, required: true },
    wednesday: { type: OpeningHoursDaySchema, required: true },
    thursday: { type: OpeningHoursDaySchema, required: true },
    friday: { type: OpeningHoursDaySchema, required: true },
    saturday: { type: OpeningHoursDaySchema, required: true },
}, { _id: false });

const VenueSchema = new Schema<IVenue>({
    serialId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    venue_type: { type: String, enum: ["cafe", "bakery", "restaurant"], required: true },
    location: { type: String, required: true },
    menu: { type: [MenuSchema], required: true },
    isBlocked: { type: Boolean, required: true },
    ratings: { type: Number, min: 0, max: 5, required: true },
    popular_Item: { type: String, required: true },
    venue_image: { type: String, required: true },
    opening_hours: { type: OpeningHoursSchema, required: true },
    isDeleted: { type: Boolean, default: false }
});

/* ========== VenueWallet Schema ========== */
export interface IVenueWallet extends Document {
    venueId: mongoose.Types.ObjectId;
    totalGifts: number;
    totalAmount: number;
    commission: number;
    netEarning: number;
    walletStatus?: "pending" | "paid";
}

const VenueWalletSchema = new Schema<IVenueWallet>({
    venueId: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
    totalGifts: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    commission: { type: Number, required: true },
    netEarning: { type: Number, required: true },
    walletStatus: { type: String, enum: ["pending", "paid"], default: "pending" }
}, {
    timestamps: true,
    collection: "venue_wallets"
});

VenueWalletSchema.index({ venueId: 1 });

/* ========== Model Exports ========== */
export const Venue = mongoose.model<IVenue>("Venue", VenueSchema);
export const VenueWallet = mongoose.model<IVenueWallet>("VenueWallet", VenueWalletSchema);