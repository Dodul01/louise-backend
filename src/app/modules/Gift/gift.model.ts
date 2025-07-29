import mongoose from "mongoose";

const giftSchema = new mongoose.Schema({
    sender_name: String,
    recipient_name: String,
    phone_number: String,
    email: String,
    personal_message: String,
    venue_name: String,
    gift_type: { type: String, enum: ["coffee", "latte", "pastry", "cookies", "custom"] },
    amount: Number,
    payment_method: { type: String, enum: ["apple_pay", "google_pay", "card"] },
    status: { type: String, enum: ["pending", "paid", "redeemed"], default: "pending" },
    transaction_id: String,
    qr_code: String,
    redeemed_at: Date,
    created_at: { type: Date, default: Date.now },
});

export const GiftModel = mongoose.model("Gift", giftSchema);