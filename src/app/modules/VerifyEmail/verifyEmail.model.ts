import mongoose from "mongoose";

const verifyEmailSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    otp: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 300 }
});

export const VerifyEmail = mongoose.model("VerifyEmail", verifyEmailSchema); 